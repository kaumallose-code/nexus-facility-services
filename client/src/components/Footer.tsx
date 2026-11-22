import { Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "/manus-storage/nexus_facility_group_logo_cropped_387d05e3.png";
const RACV_LOGO = "/manus-storage/racv_business_insurance_logo_c1945941.jpg";
const WORKSAFE_LOGO = "/manus-storage/worksafe_victoria_logo_d7f5a528.jpg";
const LABOUR_HIRE_LOGO = "/manus-storage/labour_hire_authority_logo_07661299.png";
const IRCC_LOGO = "/manus-storage/IMG_5771_874147c7.PNG";

const PHONE = "0477 376 440";
const PHONE_HREF = "tel:0477376440";
const SECONDARY_PHONE = "0404 934 544";
const SECONDARY_PHONE_HREF = "tel:0404934544";
const EMAIL = "admin.hr@nexusfacility.au";

const SERVICES = [
  { label: "Domestic Cleaning" },
  { label: "General Cleaning" },
  { label: "Commercial Cleaning" },
  { label: "Industrial Cleaning" },
  { label: "End of Lease Cleaning" },
  { label: "Water Damage Restoration", href: "/water-damage-restoration" },
  { label: "Mould Remediation", href: "/mould-remediation" },
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

function CommitmentMark({ type, label }: { type: "aboriginal" | "torres" | "inclusion"; label: string }) {
  const background = type === "aboriginal" ? "linear-gradient(#111 0 50%, #e64636 50% 100%)" : type === "torres" ? "linear-gradient(#0e8c74 0 22%, #0b5b9a 22% 78%, #0e8c74 78% 100%)" : "linear-gradient(#e53935 0 16.66%, #f5a623 16.66% 33.33%, #f8df3f 33.33% 50%, #39a852 50% 66.66%, #2585c5 66.66% 83.33%, #9254a5 83.33% 100%)";
  return <div className="flex items-center gap-3" aria-label={label} title={label}><span className="relative block h-10 w-16 shrink-0 overflow-hidden rounded-sm border border-white/20" aria-hidden="true" style={{ background }}>{type === "aboriginal" && <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f9d12f]" />}{type === "torres" && <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90" />}</span><span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.78 0.05 230)" }}>{label}</span></div>;
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
              Professional commercial, domestic, specialist cleaning and restoration support across Melbourne and Victoria. Fully insured, carefully coordinated and committed to clear communication.
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
                  <Link href={s.href || "/services"} className="text-sm transition-colors hover:text-white flex items-center gap-1.5" style={{ color: "oklch(0.78 0.05 230)" }}>
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
              <a href={SECONDARY_PHONE_HREF} className="flex items-center gap-3 text-sm transition-colors hover:text-white" style={{ color: "oklch(0.85 0.04 230)" }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                {SECONDARY_PHONE}
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
            <TrustBadge
              logo={IRCC_LOGO}
              alt="IRCC logo"
              caption="IRCC"
              tooltipId="trust-badge-ircc"
              explanation="IRCC logo supplied by Nexus Facility Group for display in its footer."
            />
          </div>
        </div>

        {/* Acknowledgement and inclusion commitments */}
        <div className="mb-8 grid gap-5 border-b pb-8 md:grid-cols-2" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
          <section className="rounded-xl border p-5" style={{ borderColor: "oklch(0.75 0.18 210 / 0.2)", background: "oklch(0.1 0.025 240)" }}>
            <div className="mb-4 flex flex-wrap items-center gap-3"><CommitmentMark type="aboriginal" label="Aboriginal flag" /><CommitmentMark type="torres" label="Torres Strait Islander flag" /></div>
            <h4 className="mb-2 text-xl font-bold uppercase" style={{ color: "oklch(0.9 0.03 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>Acknowledgement of Country</h4>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>Nexus Facility Group acknowledges the Traditional Owners of Country throughout Victoria and recognises their continuing connection to land, waters and community. We pay our respects to Elders past and present, and extend that respect to all Aboriginal and Torres Strait Islander peoples.</p>
          </section>
          <section className="rounded-xl border p-5" style={{ borderColor: "oklch(0.75 0.18 210 / 0.2)", background: "oklch(0.1 0.025 240)" }}>
            <div className="mb-4"><CommitmentMark type="inclusion" label="Inclusion and diversity" /></div>
            <h4 className="mb-2 text-xl font-bold uppercase" style={{ color: "oklch(0.9 0.03 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>Diversity, Equity &amp; Inclusion</h4>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>We welcome people of all backgrounds and are committed to a respectful, safe and inclusive workplace. We value different perspectives and do not tolerate discrimination or harassment based on culture, race, gender, religion, disability, age or sexual orientation.</p>
          </section>
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
