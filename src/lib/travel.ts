export const phone = '+94 74 191 8325';
export const callUrl = 'tel:+94741918325';
export const whatsapp = (message = 'Hello Ceylon Emerald Tours, I would like to enquire about your Sri Lanka tours.') => `https://wa.me/94741918325?text=${encodeURIComponent(message)}`;
export const tourEnquiry = (name: string) => whatsapp(`Hello Ceylon Emerald Tours, I would like to enquire about ${name} tour. Please share the available details and pricing.`);
export const tours = [
  { name: 'The Cultural Triangle', category: 'Culture & heritage', places: 'Sigiriya · Dambulla', description: 'Ancient kingdoms, extraordinary rock temples, and stories that have stood the test of time.', slot: 'culture' },
  { name: 'The Emerald Highlands', category: 'Hills & tea country', places: 'Kandy · Nuwara Eliya · Ella', description: 'Follow the winding paths of tea country, through misty mountains and peaceful hill towns.', slot: 'highlands' },
  { name: 'Southern Coast Escape', category: 'Coast & relaxation', places: 'Galle · Mirissa', description: 'Discover historic coastal streets, tropical shores, and the unhurried rhythm of the south.', slot: 'coast' },
  { name: 'Wild Sri Lanka', category: 'Wildlife & nature', places: 'Yala · Natural landscapes', description: 'Experience the island’s wild side, from open landscapes to remarkable wildlife encounters.', slot: 'wildlife' },
  { name: 'Island Heritage Journey', category: 'Culture & discovery', places: 'Historic cities · Temples', description: 'Explore sacred places and living traditions that reveal the soul of the island.', slot: 'heritage' },
  { name: 'Sri Lanka Highlights', category: 'Island discovery', places: 'Heritage · Highlands · Coast', description: 'An introduction to the island’s many worlds, bringing culture, nature, and coastal beauty together.', slot: 'island' },
];
export const destinations = [
  { name: 'Sigiriya', label: 'Ancient wonder', description: 'Explore remarkable ancient heritage surrounded by Sri Lanka’s tropical landscape.' },
  { name: 'Ella', label: 'Into the highlands', description: 'Discover mist-covered mountains, lush tea estates, and beautiful highland scenery.' },
  { name: 'Kandy', label: 'The cultural heart', description: 'Discover sacred heritage, cultural traditions, and the beauty of the hill country.' },
  { name: 'Galle', label: 'Coastal heritage', description: 'Experience coastal charm, historic architecture, and the character of the southern shoreline.' },
  { name: 'Nuwara Eliya', label: 'Tea country', description: 'Wander through cool highlands and rolling tea estates in the heart of the island.' },
  { name: 'Mirissa', label: 'By the ocean', description: 'Find golden shores and a relaxed coastal atmosphere on the southern coast.' },
  { name: 'Yala', label: 'Wild at heart', description: 'Discover natural landscapes and the remarkable wildlife of Sri Lanka.' },
  { name: 'Dambulla', label: 'Sacred stories', description: 'Discover ancient cave temples and a rich tapestry of island heritage.' },
];
export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} — Ceylon Emerald Tours` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Ceylon Emerald Tours` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
