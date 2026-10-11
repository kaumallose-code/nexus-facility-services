import { Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "/manus-storage/nexus_facility_group_logo_cropped_387d05e3.png";
const RACV_LOGO = "/manus-storage/racv_business_insurance_logo_c1945941.jpg";
const WORKSAFE_LOGO = "/manus-storage/worksafe_victoria_logo_d7f5a528.jpg";
const LABOUR_HIRE_LOGO = "/manus-storage/labour_hire_authority_logo_07661299.png";

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

type TrustBadgeProps = {
  logo: string;
  alt: string;
  caption: string;
  explanation: string;
  tooltipId: string;
};

function TrustBadge({ logo, alt, caption, explanation, tooltipId }: TrustBadgeProps) {
  return (
    <div
      className="relative group text-center outline-none"
      tabIndex={0}
      title={explanation}
      aria-describedby={tooltipId}
    >
      <div
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-64 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-md px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: "oklch(0.12 0.03 240)", border: "1px solid oklch(0.62 0.22 230 / 0.45)" }}
      >
        {explanation}
        <span
          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{ background: "oklch(0.12 0.03 240)", borderRight: "1px solid oklch(0.62 0.22 230 / 0.45)", borderBottom: "1px solid oklch(0.62 0.22 230 / 0.45)" }}
          aria-hidden="true"
        />
      </div>
      <div className="bg-white rounded-lg p-3 flex items-center justify-center mx-auto" style={{ width: "150px", height: "75px" }}>
        <img src={logo} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
      <p className="text-xs mt-2" style={{ color: "oklch(0.72 0.05 230)" }}>
        {caption}
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.05 0.02 240)", borderTop: "1px solid oklch(0.75 0.18 210 / 0.15)" }}>
      <div className="container py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={LOGO_URL} alt="Nexus Facility Group" className="h-14 w-auto object-contain" />
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <TrustBadge
              logo={RACV_LOGO}
              alt="RACV Business Insurance"
              caption="Insured with RACV"
              tooltipId="trust-badge-racv"
              explanation="RACV Business Insurance helps protect our business against eligible operational risks, giving clients confidence that our services are professionally insured."
            />
            <TrustBadge
              logo={WORKSAFE_LOGO}
              alt="WorkSafe Victoria"
              caption="Regulated by WorkSafe Victoria"
              tooltipId="trust-badge-worksafe"
              explanation="WorkSafe Victoria oversees workplace health and safety in Victoria. This reflects our commitment to safe working practices for our clients and team."
            />
            <TrustBadge
              logo={LABOUR_HIRE_LOGO}
              alt="Labour Hire Authority"
              caption="Licensed Labour Hire Provider"
              tooltipId="trust-badge-labour-hire"
              explanation="The Labour Hire Authority regulates labour hire providers in Victoria, supporting transparent and compliant workforce practices."
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs" style={{ color: "oklch(0.55 0.06 245)" }}>
            © 2025 Nexus Facility Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="https://www.google.com/maps/place/Nexus+Facility+Group" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "oklch(0.55 0.06 245)" }}>
              Google Maps
            </a>
            <a href="https://www.google.com/search?q=Nexus+Facility+Group" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "oklch(0.55 0.06 245)" }}>
              Google Reviews
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
