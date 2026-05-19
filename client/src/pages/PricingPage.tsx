import { ArrowRight, Check, HelpCircle } from "lucide-react";
import { useNavigate } from "wouter";
import { useState } from "react";

export default function PricingPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const services = [
    {
      name: "Domestic Cleaning",
      price: "$40/hr",
      description: "Thorough residential cleaning tailored to your home",
      features: [
        "General house cleaning",
        "Kitchen & bathroom deep clean",
        "Vacuuming & mopping",
        "Dusting & surface wipe-down",
        "Flexible scheduling, 7 days",
        "Free quote included",
      ],
    },
    {
      name: "General Cleaning",
      price: "$40/hr",
      description: "Regular maintenance cleaning for homes and businesses",
      features: [
        "Weekly or bi-weekly service",
        "Customised cleaning plans",
        "Reliable, consistent team",
        "Eco-friendly products available",
        "Flexible scheduling",
        "Priority scheduling for regulars",
      ],
    },
    {
      name: "Commercial Cleaning",
      price: "$40/hr",
      description: "Offices, retail spaces, warehouses and corporate facilities",
      features: [
        "Office & workspace cleaning",
        "Floor polishing & buffing",
        "Scheduled maintenance plans",
        "After-hours & weekend available",
        "Dedicated account manager",
        "Free window cleaning every 6 months",
      ],
    },
    {
      name: "Industrial Cleaning",
      price: "$40/hr",
      description: "Specialised cleaning for factories and warehouses",
      features: [
        "Factory & warehouse cleaning",
        "Heavy-duty degreasing",
        "Floor scrubbing & polishing",
        "Safety-compliant procedures",
        "Flexible shift scheduling",
        "Free kitchen floor scrubbing every 6 months",
      ],
    },
    {
      name: "End of Lease Cleaning",
      price: "$40/hr",
      description: "Bond-back guaranteed deep cleans for rental properties",
      features: [
        "Full property deep clean",
        "Bond-back guarantee",
        "Carpet steam cleaning",
        "Window & blind cleaning",
        "Oven & appliance cleaning",
        "Detailed inspection report",
      ],
    },
    {
      name: "Steam Cleaning",
      price: "From $100",
      description: "Deep steam cleaning for carpets, upholstery and hard surfaces",
      features: [
        "Carpet steam cleaning",
        "Upholstery cleaning",
        "Hard surface steam clean",
        "Stain removal",
        "Allergen elimination",
        "Quick drying technology",
      ],
    },
  ];

  const faqs = [
    {
      q: "How is pricing calculated?",
      a: "Most services are charged at $40/hr. The final cost depends on the size of the space, level of cleaning required, and any specialised services. We provide a free quote after assessing your needs.",
    },
    {
      q: "Do you offer discounts for regular contracts?",
      a: "Yes! We offer discounted rates for ongoing weekly or bi-weekly cleaning contracts. Contact us for a customised quote based on your frequency and service requirements.",
    },
    {
      q: "What's included in your free quote?",
      a: "Our free quote includes a site assessment, detailed scope of work, pricing breakdown, and a discussion of your specific cleaning needs and preferences.",
    },
    {
      q: "Do you charge travel fees?",
      a: "We service all suburbs within 50km of Clyde North at no additional travel charge. For jobs outside this radius, we'll discuss options with you.",
    },
    {
      q: "Can I get a quote for a one-time clean?",
      a: "Absolutely! We offer one-time cleaning services for homes and businesses. Just contact us with details of what you need cleaned, and we'll provide a free quote.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept bank transfer, credit card, and cash. For ongoing contracts, we can arrange weekly, fortnightly, or monthly invoicing.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="py-16" style={{ background: "oklch(0.22 0.10 245)" }}>
        <div className="container">
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
            Simple, Honest <span style={{ color: "oklch(0.62 0.22 230)" }}>Pricing</span>
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "oklch(0.85 0.04 230)" }}>
            No hidden fees, no surprises. All our cleaning services start from $40/hr with transparent pricing and free quotes.
          </p>
        </div>
      </section>

      {/* ─── Services Pricing Grid ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.03)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col overflow-hidden"
                style={{
                  border: "1px solid oklch(0.75 0.18 210 / 0.25)",
                  background: "oklch(0.27 0.11 245)",
                }}
              >
                <div className="p-6 flex-1 flex flex-col">
                  <h3
                    className="mb-2 font-bold"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "white",
                      fontSize: "1.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {service.name}
                  </h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "oklch(0.82 0.05 230)" }}>
                    {service.description}
                  </p>

                  <div
                    className="mb-6 pb-6 border-b"
                    style={{ borderColor: "oklch(0.75 0.18 210 / 0.2)" }}
                  >
                    <div
                      className="text-3xl font-bold"
                      style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {service.price}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.75 0.05 230)" }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.62 0.22 230)" }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="w-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                    style={{
                      background: "oklch(0.62 0.22 230)",
                      color: "oklch(0.20 0.10 245)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="py-20" style={{ background: "oklch(0.13 0.05 245)" }}>
        <div className="container">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            What's Always <span style={{ color: "oklch(0.62 0.22 230)" }}>Included</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Free Quote",
                desc: "No obligation site assessment and detailed pricing breakdown.",
              },
              {
                title: "Fully Insured",
                desc: "WorkSafe Victoria registered and RACV business insured.",
              },
              {
                title: "Professional Team",
                desc: "Background-checked, trained staff committed to excellence.",
              },
              {
                title: "Flexible Scheduling",
                desc: "7 days a week, including after-hours and weekends.",
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees, no surprises — you know exactly what you're paying.",
              },
              {
                title: "Quality Guarantee",
                desc: "If you're not satisfied, we'll make it right.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="p-6 text-center"
                style={{
                  background: "oklch(0.18 0.06 240)",
                  border: "1px solid oklch(0.28 0.08 240)",
                }}
              >
                <h3
                  className="mb-2 font-bold"
                  style={{
                    color: "oklch(0.62 0.22 230)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.78 0.05 230)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container max-w-3xl">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            Pricing <span style={{ color: "oklch(0.62 0.22 230)" }}>FAQs</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden"
                style={{
                  border: "1px solid oklch(0.75 0.18 210 / 0.25)",
                  background: "oklch(0.13 0.05 245)",
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left transition-all hover:opacity-80"
                >
                  <h3
                    className="font-bold flex-1"
                    style={{
                      color: "white",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1.05rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {faq.q}
                  </h3>
                  <HelpCircle
                    className="w-5 h-5 flex-shrink-0 transition-transform"
                    style={{
                      color: "oklch(0.62 0.22 230)",
                      transform: expandedFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {expandedFaq === idx && (
                  <div
                    className="px-6 pb-6 border-t"
                    style={{
                      borderColor: "oklch(0.75 0.18 210 / 0.15)",
                      color: "oklch(0.78 0.05 230)",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
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
            Ready to Get Started?
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
            Get a Free Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
