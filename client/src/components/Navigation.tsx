import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const LOGO_URL = "/manus-storage/nexus_logo_v3_fa9cb82a.jpg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Offers", href: "/offers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Areas", href: "/areas" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav style={{ background: "oklch(0.10 0.05 245)", borderBottom: "1px solid oklch(0.75 0.18 210 / 0.15)" }}>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={LOGO_URL} alt="Nexus" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              style={{
                color: location === href ? "oklch(0.62 0.22 230)" : "oklch(0.78 0.05 230)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden md:inline-flex px-6 py-2 text-xs font-bold uppercase tracking-wider"
          style={{
            background: "oklch(0.62 0.22 230)",
            color: "oklch(0.20 0.10 245)",
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          Free Quote
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          style={{ color: "oklch(0.78 0.05 230)" }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "oklch(0.13 0.05 245)",
            borderColor: "oklch(0.75 0.18 210 / 0.15)",
          }}
        >
          <div className="container py-4 space-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors"
                style={{
                  color: location === href ? "oklch(0.62 0.22 230)" : "oklch(0.78 0.05 230)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-center"
              style={{
                background: "oklch(0.62 0.22 230)",
                color: "oklch(0.20 0.10 245)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Free Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
