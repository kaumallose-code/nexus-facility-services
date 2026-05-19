import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/nexus_logo_v2-hJBxbsDVWDUjNZvjQaKPs7.webp";

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
  const [location, navigate] = useLocation();

  return (
    <nav style={{ background: "oklch(0.10 0.05 245)", borderBottom: "1px solid oklch(0.75 0.18 210 / 0.15)" }}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src={LOGO_URL} alt="Nexus" className="h-10 w-auto" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => navigate(href)}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              style={{
                color: location === href ? "oklch(0.62 0.22 230)" : "oklch(0.78 0.05 230)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/contact")}
          className="hidden md:inline-flex px-6 py-2 text-xs font-bold uppercase tracking-wider"
          style={{
            background: "oklch(0.62 0.22 230)",
            color: "oklch(0.20 0.10 245)",
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          Free Quote
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          style={{ color: "oklch(0.78 0.05 230)" }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
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
              <button
                key={href}
                onClick={() => {
                  navigate(href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors"
                style={{
                  color: location === href ? "oklch(0.62 0.22 230)" : "oklch(0.78 0.05 230)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                navigate("/contact");
                setIsOpen(false);
              }}
              className="w-full mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider"
              style={{
                background: "oklch(0.62 0.22 230)",
                color: "oklch(0.20 0.10 245)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
