import { useState } from 'react';
import { ArrowUpRight, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tourEnquiry, tours, destinations } from '@/lib/travel';
import { Reveal } from './reveal';

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function PhotoSlot({
  name,
  className = '',
  src,
}: {
  name: string;
  className?: string;
  src?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div className={`photo-slot has-image ${className}`}>
        <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />
      </div>
    );
  }

  return (
    <div className={`photo-slot ${className}`} role="img" aria-label={`${name} photograph placeholder`}>
      <div className="photo-slot-center">
        <Image size={25} strokeWidth={1} />
        <span>{name}</span>
        <small>PHOTOGRAPH TO COME</small>
      </div>
    </div>
  );
}

export function TourGrid({ limit }: { limit?: number }) {
  return (
    <Reveal className="tour-grid" stagger>
      {tours.slice(0, limit).map((tour, i) => (
        <article className="tour-card" key={tour.name}>
          <div className="tour-photo">
            <PhotoSlot
              name={tour.name}
              className={`tone-${tour.slot}`}
              src={`/images/tours/${slugify(tour.name)}.jpg`}
            />
            <span className="photo-number">0{i + 1}</span>
            <span className="glass-chip">{tour.category}</span>
          </div>
          <div className="tour-copy">
            <p className="eyebrow">{tour.places}</p>
            <h3>{tour.name}</h3>
            <p>{tour.description}</p>
            <Button asChild variant="link" className="enquiry-link">
              <a href={tourEnquiry(tour.name)} target="_blank" rel="noreferrer">
                Enquire About This Tour <ArrowUpRight />
              </a>
            </Button>
          </div>
        </article>
      ))}
    </Reveal>
  );
}

export function DestinationGrid({ limit }: { limit?: number }) {
  return (
    <Reveal className="destination-grid" stagger>
      {destinations.slice(0, limit).map((d, i) => (
        <article className="destination-card" key={d.name}>
          <PhotoSlot
            name={d.name}
            className={`destination-tone-${i % 4}`}
            src={`/images/destinations/${slugify(d.name)}.jpg`}
          />
          <div className="destination-caption glass">
            <p className="eyebrow">{d.label}</p>
            <h3>{d.name}</h3>
            <p>{d.description}</p>
          </div>
        </article>
      ))}
    </Reveal>
  );
}