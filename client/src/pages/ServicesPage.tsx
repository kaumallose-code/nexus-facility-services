import { Link } from "wouter";
import {
  Building2,
  Home,
  HardHat,
  Droplets,
  CircleDot,
  Layers,
  Wind,
  Sparkles,
} from "lucide-react";

const SERVICES_BG = "/manus-storage/services_bg_escalator_534aa57a.png";

const SERVICES = [
  {
    icon: Building2,
    label: "Commercial Cleaning",
    desc: "Professional cleaning for offices, retail spaces, medical centres, warehouses and corporate facilities. Scheduled maintenance plans available 7 days a week.",
    color: "oklch(0.65 0.20 230)",
  },
  {
    icon: Home,
    label: "Domestic Cleaning",
    desc: "Thorough residential cleaning tailored to your home. Regular or one-off deep cleans for houses, apartments and townhouses across Melbourne.",
    color: "oklch(0.65 0.15 160)",
  },
  {
    icon: HardHat,
    label: "Post Construction Cleaning",
    desc: "Complete builders clean after renovations or new builds. We remove dust, debris and construction residue to leave your property move-in ready.",
    color: "oklch(0.65 0.18 50)",
  },
  {
    icon: Droplets,
    label: "Carpet Steam Cleaning",
    desc: "Deep steam extraction for carpets, rugs and upholstery. Removes stains, allergens and bacteria for a healthier indoor environment.",
    color: "oklch(0.65 0.20 280)",
  },
  {
    icon: CircleDot,
    label: "Floor Scrubbing",
    desc: "Industrial-grade floor scrubbing for commercial and industrial spaces. Restores tile, concrete and vinyl floors to their original condition.",
    color: "oklch(0.65 0.15 30)",
  },
  {
    icon: Layers,
    label: "Floor Stripped & Sealed",
    desc: "Complete floor strip, seal and polish service. We remove old coatings, apply fresh sealant and buff to a high-gloss finish for long-lasting protection.",
    color: "oklch(0.65 0.20 330)",
  },
  {
    icon: Wind,
    label: "Pressure Washing",
    desc: "High-pressure cleaning for driveways, facades, car parks, pathways and outdoor areas. Removes grime, mould and built-up dirt effectively.",
    color: "oklch(0.65 0.12 200)",
  },
  {
    icon: Sparkles,
    label: "Window Cleaning",
    desc: "Interior and exterior window cleaning for residential and commercial properties. Streak-free results using professional equipment and techniques.",
    color: "oklch(0.65 0.18 90)",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      {/* Hero Section with Background Photo */}
      <section
        className="relative py-32 flex items-center justify-center"
        style={{
          backgroundImage: `url(${SERVICES_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 uppercase tracking-wider"
            style={{
              color: "oklch(0.95 0.01 240)",
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            Our Services
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "oklch(0.80 0.03 230)" }}
          >
            Professional cleaning solutions for every space. From homes to
            hospitals, offices to warehouses — we deliver spotless results every
            time.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className="group relative rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "oklch(0.15 0.04 245)",
                  border: `1px solid oklch(0.25 0.04 245)`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: `${svc.color}20` }}
                >
                  <svc.icon size={28} style={{ color: svc.color }} />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3 uppercase tracking-wide"
                  style={{
                    color: "oklch(0.95 0.01 240)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  {svc.label}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.72 0.05 230)" }}
                >
                  {svc.desc}
                </p>

                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: svc.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ background: "oklch(0.13 0.05 245)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-4 uppercase"
            style={{
              color: "oklch(0.95 0.01 240)",
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            Need a Custom Cleaning Solution?
          </h2>
          <p className="mb-8" style={{ color: "oklch(0.72 0.05 230)" }}>
            Every space is different. Contact us for a free, no-obligation quote
            tailored to your specific cleaning requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold uppercase tracking-wider text-white transition-all"
              style={{ background: "oklch(0.55 0.20 230)" }}
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:0477376440"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold uppercase tracking-wider transition-all"
              style={{
                color: "oklch(0.65 0.20 230)",
                border: "2px solid oklch(0.65 0.20 230)",
              }}
            >
              Call 0477 376 440
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
