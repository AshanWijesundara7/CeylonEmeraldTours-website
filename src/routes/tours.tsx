import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/travel';
import { PageIntro } from '@/components/travel/content';
import { TourGrid } from '@/components/travel/cards';
import { BookingCTA } from '@/components/travel/shell';
export const Route = createFileRoute('/tours')({ head: () => pageHead('Our Tours', 'Discover cultural journeys, tea country, coastal escapes and wildlife experiences in Sri Lanka.'), component: ToursPage });
function ToursPage() { return <><PageIntro eyebrow="CURATED ISLAND EXPERIENCES" title="Journeys worth remembering." text="Explore experiences that bring together the culture, landscapes, wildlife, and coastal beauty of Sri Lanka." /><section className="section"><p className="page-note">These journeys are inspiration for your enquiry. Contact us for available details and pricing.</p><TourGrid /></section><BookingCTA /></>; }
