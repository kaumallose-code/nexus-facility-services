import { ArrowRight, ChevronRight, HomeIcon, Sparkles, Building2, Zap, Shield, Droplets } from "lucide-react";
import { useNavigate } from "wouter";

const SERVICES_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/services_bg-VDh6VyAGw4Fo5PpmAv8BJR.webp";

const SERVICES = [
  {
    icon: HomeIcon,
    label: "Domestic Cleaning",
    desc: "Thorough residential cleaning tailored to your home — kitchens, bathrooms, living areas and more.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_domestic_v2-9YM3QtzCXTxaDCjvGcDqPr.webp",
    price: "From $40/hr",
    details: [
      "General house cleaning",
      "Kitchen & bathroom deep clean",
      "Vacuuming & mopping",
      "Dusting & surface wipe-down",
      "Flexible scheduling, 7 days",
      "Free quote included",
    ],
  },
  {
    icon: Sparkles,
    label: "General Cleaning",
    desc: "Regular maintenance cleaning for homes and businesses — flexible scheduling, 7 days a week.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_general_v2-iDwebkcgzUKwjq5vw9cjDb.webp",
    price: "From $40/hr",
    details: [
      "Weekly or bi-weekly service",
      "Customised cleaning plans",
      "Reliable, consistent team",
      "Eco-friendly products available",
      "Flexible scheduling",
      "Priority scheduling for regulars",
    ],
  },
  {
    icon: Building2,
    label: "Commercial Cleaning",
    desc: "Offices, retail spaces, warehouses and corporate facilities — scheduled contracts available.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_commercial_v2-LpEKwd5ocUenUXBG94ayFW.webp",
    price: "From $40/hr",
    details: [
      "Office & workspace cleaning",
      "Floor polishing & buffing",
      "Scheduled maintenance plans",
      "After-hours & weekend available",
      "Dedicated account manager",
      "Free window cleaning every 6 months",
    ],
  },
  {
    icon: Zap,
    label: "Industrial Cleaning",
    desc: "Specialised cleaning for factories, warehouses, logistics hubs and industrial sites across Melbourne.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_commercial_v2-LpEKwd5ocUenUXBG94ayFW.webp",
    price: "From $40/hr",
    details: [
      "Factory & warehouse cleaning",
      "Heavy-duty degreasing",
      "Floor scrubbing & polishing",
      "Safety-compliant procedures",
      "Flexible shift scheduling",
      "Free kitchen floor scrubbing every 6 months",
    ],
  },
  {
    icon: Shield,
    label: "End of Lease Cleaning",
    desc: "Bond-back guaranteed deep cleans for rental properties — we cover every corner so you get your bond back.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_endoflease_v2-RqLXusXXq7ajrgp8J6rtfh.webp",
    price: "From $40/hr",
    details: [
      "Full property deep clean",
      "Bond-back guarantee",
      "Carpet steam cleaning",
      "Window & blind cleaning",
      "Oven & appliance cleaning",
      "Detailed inspection report",
    ],
  },
  {
    icon: Droplets,
    label: "Steam Cleaning",
    desc: "Deep steam cleaning for carpets, upholstery and hard surfaces.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_steam_v2-kfQhfbixzE66ExUjj9PURz.webp",
    price: "From $100",
    details: [
      "Carpet steam cleaning",
      "Upholstery cleaning",
      "Hard surface steam clean",
      "Stain removal",
      "Allergen elimination",
      "Quick drying technology",
    ],
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ─── Page Header ─── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: "oklch(0.22 0.10 245)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SERVICES_BG})`, opacity: 0.1 }}
        />
        <div className="container relative z-10">
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              color: "white",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            Our <span style={{ color: "oklch(0.62 0.22 230)" }}>Services</span>
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "oklch(0.85 0.04 230)" }}>
            Professional cleaning across Melbourne with precision, reliability and zero shortcuts. Fully insured, background-checked, and committed to leaving every space spotless.
          </p>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.03)" }}>
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, label, desc, img, price, details }) => (
              <div
                key={label}
                className="group overflow-hidden flex flex-col"
                style={{
                  border: "1px solid oklch(0.75 0.18 210 / 0.25)",
                  background: "oklch(0.27 0.11 245)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.62 0.22 230)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px oklch(0.75 0.18 210 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.75 0.18 210 / 0.25)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={img}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, oklch(0.27 0.11 245))" }}
                  />
                  <div
                    className="absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: "oklch(0.62 0.22 230)",
                      color: "oklch(0.20 0.10 245)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    {price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.75 0.18 210 / 0.15)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "oklch(0.62 0.22 230)" }} />
                    </div>
                    <div>
                      <h3
                        className="font-bold"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          color: "white",
                          fontSize: "1.1rem",
                          letterSpacing: "0.03em",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm mb-4 flex-1" style={{ color: "oklch(0.82 0.05 230)" }}>
                    {desc}
                  </p>

                  {/* Details */}
                  <div className="mb-6 space-y-2">
                    {details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 text-xs" style={{ color: "oklch(0.75 0.05 230)" }}>
                        <ChevronRight className="w-3 h-3" style={{ color: "oklch(0.62 0.22 230)" }} />
                        {detail}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                    style={{
                      background: "oklch(0.62 0.22 230)",
                      color: "oklch(0.20 0.10 245)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    Get Quote
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16" style={{ background: "oklch(0.62 0.22 230)" }}>
        <div className="container text-center">
          <h2
            className="mb-4 text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              textTransform: "uppercase",
            }}
          >
            Not Sure Which Service You Need?
          </h2>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 px-8 py-3 font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90"
            style={{
              background: "oklch(0.10 0.05 245)",
              color: "oklch(0.62 0.22 230)",
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            Contact Us for a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
