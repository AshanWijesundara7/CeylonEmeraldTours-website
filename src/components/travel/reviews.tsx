import { useEffect, useState, type FormEvent } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from './reveal';

type Review = { id: string; name: string; country: string; rating: number; message: string; date: string };

const API = '/api/reviews.php';
const DEMO_KEY = 'ceylon-demo-reviews';
const isDev = import.meta.env.DEV; // true only when running `bun run dev` locally

// The PHP backend only runs on your cPanel hosting. On localhost the dev server hands back the
// raw PHP file instead of running it, so we treat anything that is not JSON as "backend not available".
async function parse(res: Response) {
  const text = await res.text();
  try { return JSON.parse(text); } catch { return null; }
}
const demoLoad = (): Review[] => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || '[]'); } catch { return []; } };

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="review-stars" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(n => <Star key={n} size={size} strokeWidth={1.4} fill={n <= value ? 'currentColor' : 'none'} />)}
    </span>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch(API)
      .then(parse)
      .then(d => setReviews(d && Array.isArray(d.reviews) ? d.reviews : isDev ? demoLoad() : []))
      .catch(() => setReviews(isDev ? demoLoad() : []))
      .finally(() => setLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget; // capture before the await
    setBusy(true);
    setStatus(null);
    const data = new FormData(form);
    data.set('rating', String(rating));
    try {
      const res = await fetch(API, { method: 'POST', body: data });
      const json = await parse(res);
      if (!json) {
        if (isDev) {
          // Local preview only: keep the review in this browser so you can check the design.
          const demo: Review = { id: String(Date.now()), name: String(data.get('name')), country: String(data.get('country') || ''), rating, message: String(data.get('message')), date: new Date().toISOString() };
          localStorage.setItem(DEMO_KEY, JSON.stringify([demo, ...demoLoad()]));
          setReviews(prev => [demo, ...prev]);
          setStatus({ ok: true, text: 'Preview mode: PHP is not running on localhost, so this review is saved in your browser only. On the live cPanel site it is sent for approval.' });
          form.reset();
          setRating(5);
          return;
        }
        throw new Error('Your review could not be sent right now. Please try again later.');
      }
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setStatus({ ok: true, text: 'Thank you! Your review has been received and will appear once it has been approved.' });
      form.reset();
      setRating(5);
    } catch (err) {
      setStatus({ ok: false, text: err instanceof Error ? err.message : 'Your review could not be sent right now. Please try again later.' });
    } finally {
      setBusy(false);
    }
  }

  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const shown = hover || rating;

  return (
    <section className="section reviews-section" id="reviews">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow">TRAVELLER STORIES</p>
          <h2>Words from<br /><em>our travellers.</em></h2>
        </div>
        {reviews.length > 0 && (
          <div className="review-summary">
            <strong>{average.toFixed(1)}</strong>
            <Stars value={Math.round(average)} />
            <span>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
          </div>
        )}
      </Reveal>

      {!loading && reviews.length === 0 && <p className="review-empty">Be the first to share your experience with Ceylon Emerald Tours.</p>}

      {reviews.length > 0 && (
        <Reveal stagger className="review-grid">
          {reviews.map(r => (
            <article className="review-card glass" key={r.id}>
              <Stars value={r.rating} />
              <p className="review-text">{r.message}</p>
              <div className="review-meta">
                <strong>{r.name}</strong>
                <span>{[r.country, new Date(r.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })].filter(Boolean).join(' · ')}</span>
              </div>
            </article>
          ))}
        </Reveal>
      )}

      <div className="review-form-wrap">
        <h3>Share your experience</h3>
        <form className="enquiry-form glass" onSubmit={submit}>
          <div className="form-grid">
            <label>Your Name<input name="name" autoComplete="name" maxLength={60} required /></label>
            <label>Country (optional)<input name="country" autoComplete="country-name" maxLength={60} /></label>
            <div className="full-field">
              <span className="rating-label">Your Rating</span>
              <div className="rating-input" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button type="button" key={n} aria-label={`${n} star${n > 1 ? 's' : ''}`} aria-pressed={rating === n} onMouseEnter={() => setHover(n)} onClick={() => setRating(n)}>
                    <Star size={26} strokeWidth={1.3} fill={n <= shown ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
            <label className="full-field">Your Review<textarea name="message" minLength={10} maxLength={1000} required /></label>
            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          </div>
          <Button type="submit" variant="glass" disabled={busy}>{busy ? 'Sending…' : 'Submit Review'}<ArrowUpRight /></Button>
          {status && <p className="form-status" role="status" style={{ color: status.ok ? undefined : '#a33' }}>{status.text}</p>}
        </form>
      </div>
    </section>
  );
}