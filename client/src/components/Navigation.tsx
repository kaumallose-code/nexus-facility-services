import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

const LOGO_URL = "/manus-storage/nexus_facility_group_logo_714c02df.png";
const SERVICE_LINKS = [
  { label: "All Services", href: "/services" },
  { label: "Commercial Cleaning Melbourne", href: "/commercial-cleaning-melbourne" },
  { label: "Office Cleaning Melbourne", href: "/office-cleaning-melbourne" },
];
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Cleaning Subcontracting", href: "/cleaning-subcontracting" },
  { label: "Restoration", href: "/water-damage-restoration" },
  { label: "Offers", href: "/offers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Areas", href: "/areas" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];
const STAFF_PORTAL_LINK = { label: "Staff Portal", href: "/staff-inspections" };
const linkStyle = (active: boolean) => ({
  color: active ? "oklch(0.62 0.22 230)" : "oklch(0.78 0.05 230)",
  fontFamily: "'Barlow Condensed', sans-serif",
});

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();
  const serviceActive = SERVICE_LINKS.some(link => location === link.href);
  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="relative z-50" style={{ background: "oklch(0.10 0.05 245)", borderBottom: "1px solid oklch(0.75 0.18 210 / 0.15)" }}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"><img src={LOGO_URL} alt="Nexus Facility Group" className="h-8 w-8 object-contain" /></Link>
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.slice(0, 2).map(({ label, href }) => <Link key={href} href={href} className="px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors" style={linkStyle(location === href)}>{label}</Link>)}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button type="button" aria-haspopup="menu" aria-expanded={servicesOpen} onClick={() => setServicesOpen(value => !value)} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); setServicesOpen(true); } }} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300" style={linkStyle(serviceActive)}>Services <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} /></button>
            {servicesOpen && <div role="menu" className="absolute left-0 top-full min-w-64 border p-2 shadow-2xl" style={{ background: "oklch(0.12 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.36)" }}>{SERVICE_LINKS.map(link => <Link key={link.href} href={link.href} role="menuitem" onClick={() => setServicesOpen(false)} className="block px-3 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-cyan-400/10" style={linkStyle(location === link.href)}>{link.label}</Link>)}</div>}
          </div>
          {NAV_LINKS.slice(2).map(({ label, href }) => <Link key={href} href={href} className="px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors" style={linkStyle(location === href)}>{label}</Link>)}
          <Link href={STAFF_PORTAL_LINK.href} className="ml-1 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: location === STAFF_PORTAL_LINK.href ? "oklch(0.75 0.85 90)" : "oklch(0.70 0.08 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>{STAFF_PORTAL_LINK.label}</Link>
        </div>
        <Link href="/contact" className="hidden px-6 py-2 text-xs font-bold uppercase tracking-wider md:inline-flex" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.20 0.10 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>Free Quote</Link>
        <button aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setIsOpen(!isOpen)} className="p-2 md:hidden" style={{ color: "oklch(0.78 0.05 230)" }}>{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {isOpen && <div className="border-t md:hidden" style={{ background: "oklch(0.13 0.05 245)", borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="container space-y-2 py-4">
        {NAV_LINKS.slice(0, 2).map(({ label, href }) => <Link key={href} href={href} onClick={closeMobile} className="block w-full px-4 py-2 text-sm font-bold uppercase tracking-wider" style={linkStyle(location === href)}>{label}</Link>)}
        <button type="button" aria-haspopup="menu" aria-expanded={servicesOpen} onClick={() => setServicesOpen(value => !value)} className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-300" style={linkStyle(serviceActive)}>Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} /></button>
        {servicesOpen && <div role="menu" className="ml-4 border-l pl-3" style={{ borderColor: "oklch(0.62 0.22 230 / 0.35)" }}>{SERVICE_LINKS.map(link => <Link key={link.href} href={link.href} role="menuitem" onClick={closeMobile} className="block w-full px-4 py-2 text-sm font-bold uppercase tracking-wider" style={linkStyle(location === link.href)}>{link.label}</Link>)}</div>}
        {NAV_LINKS.slice(2).map(({ label, href }) => <Link key={href} href={href} onClick={closeMobile} className="block w-full px-4 py-2 text-sm font-bold uppercase tracking-wider" style={linkStyle(location === href)}>{label}</Link>)}
        <Link href={STAFF_PORTAL_LINK.href} onClick={closeMobile} className="block w-full px-4 py-2 text-sm font-bold uppercase tracking-wider" style={{ color: location === STAFF_PORTAL_LINK.href ? "oklch(0.75 0.85 90)" : "oklch(0.70 0.08 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>{STAFF_PORTAL_LINK.label}</Link>
        <Link href="/contact" onClick={closeMobile} className="mt-4 block w-full px-4 py-2 text-center text-xs font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.20 0.10 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>Free Quote</Link>
      </div></div>}
    </nav>
  );
}
