import { Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "/manus-storage/nexus_logo_v3_fa9cb82a.jpg";
const RACV_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/racv_business_insurance_logo-2024-Jd8cqKLRWEtNqVhRZ4VQKL.jpg";
const WORKSAFE_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/worksafe_victoria_logo-2024-iDwebkcgzUKwjq5vw9cjDb.png";

const PHONE = "0477 376 440";
const PHONE_HREF = "tel:0477376440";
const EMAIL = "admin.hr@nexusfacility.au";

const SERVICES = [
  { label: "Domestic Cleaning" },
  { label: "General Cleaning" },
  { label: "Commercial Cleaning" },
  { label: "Industrial Cleaning" },
  { label: "End of Lease Cleaning" },
];

const PAGE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Areas", href: "/areas" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.05 0.02 240)", borderTop: "1px solid oklch(0.75 0.18 210 / 0.15)" }}>
      <div className="container py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={LOGO_URL} alt="Nexus Facility Services" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.78 0.05 230)" }}>
              Professional domestic, general, commercial, industrial and end of lease cleaning across Melbourne. Fully insured, background-checked, and committed to excellence.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Cleaning Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link href="/services" className="text-sm transition-colors hover:text-white flex items-center gap-1.5" style={{ color: "oklch(0.78 0.05 230)" }}>
                    <ChevronRight className="w-3 h-3" style={{ color: "oklch(0.62 0.22 230)" }} />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Pages
            </h4>
            <ul className="space-y-2">
              {PAGE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white flex items-center gap-1.5" style={{ color: "oklch(0.78 0.05 230)" }}>
                    <ChevronRight className="w-3 h-3" style={{ color: "oklch(0.62 0.22 230)" }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contact Us
            </h4>
            <div className="space-y-3">
              <a href={PHONE_HREF} className="flex items-center gap-3 text-sm transition-colors hover:text-white" style={{ color: "oklch(0.85 0.04 230)" }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm transition-colors hover:text-white" style={{ color: "oklch(0.85 0.04 230)" }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-8 mb-8 border-t border-b" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center">
              <img src={RACV_LOGO} alt="RACV Business Insurance" className="h-12 w-auto object-contain mx-auto mb-2" />
              <p className="text-xs" style={{ color: "oklch(0.72 0.05 230)" }}>
                Insured with RACV
              </p>
            </div>
            <div className="text-center">
              <img src={WORKSAFE_LOGO} alt="WorkSafe Victoria" className="h-12 w-auto object-contain mx-auto mb-2" />
              <p className="text-xs" style={{ color: "oklch(0.72 0.05 230)" }}>
                Regulated by WorkSafe Victoria
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs" style={{ color: "oklch(0.55 0.06 245)" }}>
            © 2025 Nexus Facility Services. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="https://www.google.com/maps/place/Nexus+Facility+Services" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "oklch(0.55 0.06 245)" }}>
              Google Maps
            </a>
            <a href="https://www.google.com/search?q=Nexus+Facility+Services" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "oklch(0.55 0.06 245)" }}>
              Google Reviews
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
