import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { callUrl, phone, whatsapp } from '@/lib/travel';
import { Reveal } from './reveal';
const links = [{ to: '/', name: 'Home' }, { to: '/destinations', name: 'Destinations' }, { to: '/about', name: 'About Us' }, { to: '/contact', name: 'Contact' }] as const;
export function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => { const update = () => setScrolled(window.scrollY > 32); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
    return <header className={`header-wrap ${scrolled ? 'is-scrolled' : ''}`}><div className="header glass"><Link to="/" className="wordmark" aria-label="Ceylon Emerald Tours home"><img src="/images/logo/Logo.png" alt="Ceylon Emerald Tours" className="wordmark-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(l => <Link key={l.to} to={l.to} activeOptions={{ exact: true }} activeProps={{ className: 'active' }}>{l.name}</Link>)}</nav><Button variant="glass" asChild className="header-book"><a href={whatsapp()} target="_blank" rel="noreferrer">Book Your Journey <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</Button></div>{open && <nav className="mobile-nav glass" aria-label="Mobile navigation">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.name}<ArrowUpRight size={16} /></Link>)}<Button asChild><a href={whatsapp()}>Book Your Journey</a></Button></nav>}</header>;
}
export function Splash() {
    const [show, setShow] = useState(false);
    useEffect(() => { if (sessionStorage.getItem('ceylon-intro')) return; sessionStorage.setItem('ceylon-intro', 'seen'); setShow(true); const timer = window.setTimeout(() => setShow(false), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 2200); return () => window.clearTimeout(timer); }, []);
    return show ? <div className="splash" aria-label="Ceylon Emerald Tours"><p className="eyebrow">SRI LANKA</p><h1>CEYLON EMERALD TOURS</h1><p>Discover the Soul of Sri Lanka</p><span className="loading-line" /></div> : null;
}
export function BookingCTA() {
    return <section className="booking-band"><Reveal className="booking-inner"><div><p className="eyebrow">LET THE JOURNEY BEGIN</p><h2>Your Sri Lankan story<br /><em>starts here.</em></h2><p>Get in touch to enquire about our tours, transportation, and travel experiences.</p></div><div className="booking-actions"><Button variant="glass" asChild><a href={whatsapp()} target="_blank" rel="noreferrer"><MessageCircle /> Chat on WhatsApp <ArrowUpRight /></a></Button><Button variant="lightOutline" asChild><a href={callUrl}><Phone /> Call Us</a></Button></div></Reveal></section>;
}
export function Footer() {
    return <footer><div className="footer-inner"><div><Link to="/" className="wordmark">CEYLON <span>EMERALD</span><small>TOURS · SRI LANKA</small></Link><p>Thoughtful journeys.<br />Extraordinary island experiences.</p></div><nav aria-label="Footer navigation">{links.map(l => <Link key={l.to} to={l.to}>{l.name}</Link>)}</nav><div className="footer-contact"><p className="eyebrow">YOUR NEXT CHAPTER</p><a href={callUrl}>{phone}</a><a href={whatsapp()} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowRight size={15} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ceylon Emerald Tours</span><span>Discover the soul of Sri Lanka.</span></div></footer>;
}