import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/travel';
import { PageIntro } from '@/components/travel/content';
import { DestinationGrid } from '@/components/travel/cards';
import { BookingCTA } from '@/components/travel/shell';
export const Route = createFileRoute('/destinations')({ head: () => pageHead('Sri Lanka Destinations', 'Explore Sigiriya, Ella, Kandy, Galle, Nuwara Eliya, Mirissa, Yala and Dambulla.'), component: DestinationsPage });
function DestinationsPage() { return <><PageIntro eyebrow="EXPLORE SRI LANKA" title="Every corner has a story." text="From sacred cities and misty highlands to sunlit shores, discover the places that make this island extraordinary." /><section className="section"><DestinationGrid /></section><BookingCTA /></>; }
