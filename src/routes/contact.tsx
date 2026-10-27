import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageHead, whatsapp, callUrl, phone } from '@/lib/travel';
import { PageIntro } from '@/components/travel/content';
import { Reveal } from '@/components/travel/reveal';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact & Booking Enquiries', 'Contact Ceylon Emerald Tours on +94 74 191 8325 or chat with us on WhatsApp.'), component: ContactPage });
function ContactPage() {
    return <><PageIntro eyebrow="LET THE JOURNEY BEGIN" title="Let’s talk about your journey." text="Tell us a little about your travel plans. We look forward to helping you discover Sri Lanka." /><section className="section"><Reveal className="contact-grid contact-single"><div className="contact-details"><h2>Your next chapter<br /><em>begins with a hello.</em></h2><p className="eyebrow">CALL OR WHATSAPP</p><a href={callUrl}>{phone}</a><p>Enquire about our tours, private transportation, and island experiences.</p><Button asChild variant="glass" className="whatsapp-btn"><a href={whatsapp()} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>Chat on WhatsApp</span><ArrowUpRight size={16} /></a></Button></div></Reveal></section></>;
}