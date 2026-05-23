import { Link } from "wouter";
import {
  Baby,
  Stethoscope,
  Building2,
  Warehouse,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Star,
} from "lucide-react";

const BG_IMAGE = "/manus-storage/nexus_van_warehouse_4e0b9698.jpg";

const INDUSTRIES = [
  {
    id: "childcare",
    icon: Baby,
    headline: "Childcare Centre Cleaning",
    subheadline: "Where Hygiene Standards Protect What Matters Most",
    painPoint:
      "Parents entrust you with their children — and they notice everything. From sticky floors to dusty play mats, any lapse in cleanliness directly impacts your reputation, enrolment rates, and regulatory compliance. In an environment where germs spread rapidly among young immune systems, standard cleaning simply isn't enough. You need a partner who understands the heightened hygiene demands of early childhood education.",
    offerTitle: "Exclusive New Contract Offer",
    offerDetails:
      "Sign a 12-month cleaning contract and receive a complimentary deep steam cleaning for up to 7 rugs and the main front reception/lobby area, OR a full-facility antibacterial mist fogging treatment.",
    frequency: "Performed every 6 months for the entire duration of your contract — at no additional cost.",
    valuePoints: [
      "Eliminates 99.9% of bacteria, viruses, and allergens from soft surfaces",
      "Creates a spotless first impression for parents at drop-off and pick-up",
      "Supports your centre's compliance with National Quality Standards",
      "Reduces sick days for children and staff alike",
    ],
  },
  {
    id: "medical",
    icon: Stethoscope,
    headline: "Medical Centre & Healthcare Cleaning",
    subheadline: "Clinical-Grade Cleanliness. Zero Compromise.",
    painPoint:
      "In healthcare, cleanliness isn't cosmetic — it's clinical. Your patients are often immunocompromised, anxious, or recovering. A visibly unclean reception area erodes patient confidence instantly, while inadequate sanitisation protocols can lead to cross-contamination and serious compliance breaches. Your facility demands a cleaning partner with the discipline, training, and attention to detail that healthcare environments require.",
    offerTitle: "Exclusive New Contract Offer",
    offerDetails:
      "Sign a 12-month cleaning contract and receive complimentary premium carpet steam cleaning for your main front reception and waiting area.",
    frequency: "Performed every 6 months for the entire duration of your contract — at no additional cost.",
    valuePoints: [
      "Deep extraction of embedded pathogens, allergens, and bodily fluids from carpet fibres",
      "Maintains a clinical, fresh presentation in your highest-traffic patient area",
      "Supports infection control protocols and accreditation requirements",
      "Extends carpet lifespan, reducing long-term replacement costs",
    ],
  },
  {
    id: "office",
    icon: Building2,
    headline: "Commercial Office Cleaning",
    subheadline: "Your Workspace Is Your Brand. Make It Shine.",
    painPoint:
      "First impressions are formed in seconds. When clients, partners, or prospective employees walk into your office, they're subconsciously evaluating your professionalism, attention to detail, and standards. Grimy windows block natural light, reduce staff productivity, and project an image of neglect. In a competitive market, your physical environment is a direct extension of your brand.",
    offerTitle: "Exclusive New Contract Offer",
    offerDetails:
      "Sign a 12-month cleaning contract and receive complimentary professional external window cleaning for all ground-level exterior windows.",
    frequency: "Performed every 6 months for the entire duration of your contract — at no additional cost.",
    valuePoints: [
      "Maximises natural light penetration, boosting staff mood and productivity",
      "Projects a polished, professional image to every visitor and passerby",
      "Removes built-up grime, hard water stains, and environmental pollutants",
      "Protects glass from long-term etching and degradation",
    ],
  },
  {
    id: "warehouse",
    icon: Warehouse,
    headline: "Industrial & Warehouse Cleaning",
    subheadline: "Safe Floors. Healthy Staff. Full Compliance.",
    painPoint:
      "Industrial environments accumulate grease, oil, dust, and debris at an accelerated rate — particularly in staff amenity areas. A neglected kitchen or breakroom floor isn't just unsightly; it's a slip hazard, a pest attractant, and an OH&S liability. Your workforce deserves a clean, safe space to recharge, and your business needs to demonstrate duty-of-care compliance at every audit.",
    offerTitle: "Exclusive New Contract Offer",
    offerDetails:
      "Sign a 12-month cleaning contract and receive complimentary heavy-duty mechanical floor scrubbing for your main staff kitchen/breakroom floor.",
    frequency: "Performed every 6 months for the entire duration of your contract — at no additional cost.",
    valuePoints: [
      "Industrial-grade scrubbing removes embedded grease, oil, and grime buildup",
      "Eliminates slip hazards and supports OH&S compliance",
      "Improves staff morale with a visibly clean amenity space",
      "Prevents pest attraction from food residue and organic buildup",
    ],
  },
];

export default function Page() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed transparent background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="fixed inset-0 z-0" style={{ background: "oklch(0.08 0.04 245 / 0.88)" }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="container text-center max-w-4xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "oklch(0.62 0.22 230 / 0.15)", border: "1px solid oklch(0.62 0.22 230 / 0.3)" }}
            >
              <Star className="w-4 h-4" style={{ color: "oklch(0.80 0.18 85)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.62 0.22 230)" }}>
                Limited-Time New Client Offer
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              EXCLUSIVE BONUS MAINTENANCE
              <br />
              <span style={{ color: "oklch(0.62 0.22 230)" }}>FOR NEW 12-MONTH CONTRACTS</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ color: "oklch(0.82 0.04 230)" }}>
              Partner with Nexus Facility Services and receive high-value maintenance services — performed every 6 months — completely free of charge for the life of your contract.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "oklch(0.78 0.05 230)" }}>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
                Fully Insured & Licensed
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
                Recurring Every 6 Months
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: "oklch(0.62 0.22 230)" }} />
                No Hidden Costs
              </span>
            </div>
          </div>
        </section>

        {/* Industry Sections */}
        {INDUSTRIES.map((industry, idx) => {
          const Icon = industry.icon;
          return (
            <section key={industry.id} className="py-12 md:py-16">
              <div className="container max-w-5xl">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "oklch(0.12 0.04 245 / 0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid oklch(0.62 0.22 230 / 0.15)",
                  }}
                >
                  {/* Header */}
                  <div
                    className="px-8 py-6 flex items-center gap-4"
                    style={{ borderBottom: "1px solid oklch(0.62 0.22 230 / 0.12)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.62 0.22 230 / 0.15)" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: "oklch(0.62 0.22 230)" }} />
                    </div>
                    <div>
                      <h2
                        className="text-2xl md:text-3xl font-bold"
                        style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {industry.headline}
                      </h2>
                      <p className="text-sm mt-0.5" style={{ color: "oklch(0.62 0.22 230)" }}>
                        {industry.subheadline}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-8 py-8 space-y-6">
                    {/* Pain Point */}
                    <p className="text-base leading-relaxed" style={{ color: "oklch(0.82 0.04 230)" }}>
                      {industry.painPoint}
                    </p>

                    {/* Offer Box */}
                    <div
                      className="rounded-xl p-6"
                      style={{
                        background: "oklch(0.62 0.22 230 / 0.08)",
                        border: "1px solid oklch(0.62 0.22 230 / 0.25)",
                      }}
                    >
                      <h3
                        className="text-lg font-bold uppercase tracking-wide mb-3"
                        style={{ color: "oklch(0.80 0.18 85)", fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {industry.offerTitle}
                      </h3>
                      <p className="text-base font-medium mb-2" style={{ color: "oklch(0.95 0.01 240)" }}>
                        {industry.offerDetails}
                      </p>
                      <p
                        className="text-sm font-semibold inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-md"
                        style={{ background: "oklch(0.62 0.22 230 / 0.15)", color: "oklch(0.62 0.22 230)" }}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {industry.frequency}
                      </p>
                    </div>

                    {/* Value Points */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {industry.valuePoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: "oklch(0.72 0.19 150)" }}
                          />
                          <span className="text-sm" style={{ color: "oklch(0.82 0.04 230)" }}>
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
                        style={{
                          background: "oklch(0.62 0.22 230)",
                          color: "oklch(0.98 0.01 240)",
                          fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                      >
                        Claim This Offer — Get a Free Quote
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom CTA Section */}
        <section className="py-16">
          <div className="container max-w-3xl text-center">
            <div
              className="rounded-2xl p-10"
              style={{
                background: "oklch(0.12 0.04 245 / 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.62 0.22 230 / 0.2)",
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                READY TO SECURE YOUR BONUS?
              </h2>
              <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: "oklch(0.82 0.04 230)" }}>
                These exclusive maintenance bonuses are available to new clients signing a 12-month contract. Spaces are limited — contact our team today to lock in your offer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "oklch(0.62 0.22 230)",
                    color: "oklch(0.98 0.01 240)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  Request a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:0477376440"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
                  style={{
                    background: "transparent",
                    color: "oklch(0.62 0.22 230)",
                    border: "2px solid oklch(0.62 0.22 230)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  Call 0477 376 440
                </a>
              </div>
              <p className="text-xs mt-6" style={{ color: "oklch(0.55 0.05 230)" }}>
                Offer valid for new 12-month contracts only. Bonus services are performed every 6 months at no additional charge for the duration of the agreement. Terms and conditions apply.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
