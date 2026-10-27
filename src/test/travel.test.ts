import { describe, expect, it } from 'vitest';
import { callUrl, whatsapp, tourEnquiry } from '@/lib/travel';
describe('Booking contact rules', () => {
  it('calls the supplied international booking number', () => {
    expect(callUrl).toBe('tel:+94741918325');
  });
  it('opens the supplied WhatsApp number with the general enquiry', () => {
    const url = new URL(whatsapp());
    expect(url.origin + url.pathname).toBe('https://wa.me/94741918325');
    expect(url.searchParams.get('text')).toBe('Hello Ceylon Emerald Tours, I would like to enquire about your Sri Lanka tours.');
  });
  it('includes the selected package in the tour enquiry', () => {
    expect(new URL(tourEnquiry('The Emerald Highlands')).searchParams.get('text')).toBe('Hello Ceylon Emerald Tours, I would like to enquire about The Emerald Highlands tour. Please share the available details and pricing.');
  });
});