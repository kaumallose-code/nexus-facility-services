import { ArrowRight, Sparkles, Clock, Shield, Users, Building2, Award, Layers, HomeIcon } from "lucide-react";
import { useNavigate } from "wouter";

export default function OffersPage() {
  const navigate = useNavigate();

  const offers = [
    {
      icon: Shield,
      industry: "Medical Centres & Hospitals",
      tag: "Healthcare",
      offer: "Antibacterial Fogging",
      offerDetail: "Full-facility antibacterial fogging every 6 months to eliminate pathogens and maintain a sterile environment for patients and staff.",
      accent: "oklch(0.55 0.20 160)",
      accentBg: "oklch(0.55 0.20 160 / 0.08)",
      tagBg: "oklch(0.55 0.20 160 / 0.15)",
    },
    {
      icon: Users,
      industry: "Child Care Centres",
      tag: "Education",
      offer: "Entrance Carpet Steam Clean",
      offerDetail: "Deep steam cleaning of all entrance and play area carpets every 6 months — removing allergens, bacteria and stains for a safe child environment.",
      accent: "oklch(0.70 0.18 50)",
      accentBg: "oklch(0.70 0.18 50 / 0.08)",
      tagBg: "oklch(0.70 0.18 50 / 0.15)",
    },
    {
      icon: Building2,
      industry: "Warehouses & Logistics",
      tag: "Industrial",
      offer: "Kitchen Floor Scrubbing",
      offerDetail: "Heavy-duty machine scrubbing of kitchen and break room floors every 6 months — cutting through grease, grime and industrial residue.",
      accent: "oklch(0.62 0.22 230)",
      accentBg: "oklch(0.62 0.22 230 / 0.08)",
      tagBg: "oklch(0.62 0.22 230 / 0.15)",
    },
    {
      icon: Award,
      industry: "Offices & Corporate Spaces",
      tag: "Commercial",
      offer: "External Window Cleaning",
      offerDetail: "Professional streak-free external window clean every 6 months — keeping your corporate image sharp and your workspace bright.",
      accent: "oklch(0.65 0.20 290)",
      accentBg: "oklch(0.65 0.20 290 / 0.08)",
      tagBg: "oklch(0.65 0.20 290 / 0.15)",
    },
    {
      icon: Layers,
      industry: "Shopping Centres",
      tag: "Retail",
      offer: "Deep Car Park Cleaning",
      offerDetail: "Comprehensive high-pressure car park scrubbing and degreasing every 6 months — improving safety, appearance and first impressions for shoppers.",
      accent: "oklch(0.62 0.22 10)",
      accentBg: "oklch(0.62 0.22 10 / 0.08)",
      tagBg: "oklch(0.62 0.22 10 / 0.15)",
    },
    {
      icon: HomeIcon,
      industry: "Apartment Complexes",
      tag: "Residential",
      offer: "Deep Car Park Cleaning",
      offerDetail: "Full underground or surface car park pressure wash and line marking refresh every 6 months — keeping residents proud of where they live.",
      accent: "oklch(0.60 0.18 120)",
      accentBg: "oklch(0.60 0.18 120 / 0.08)",
      tagBg: "oklch(0.60 0.18 120 / 0.15)",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="py-16" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{
              background: "oklch(0.62 0.22 230 / 0.12)",
              border: "1px solid oklch(0.62 0.22 230 / 0.3)",
              color: "oklch(0.62 0.22 230)",
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            New Commercial Contract Exclusive
          </div>
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              color: "white",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            Every New Contract Gets a{" "}
            <span style={{ color: "oklch(0.62 0.22 230)" }}>Free Service</span>
            <br />Tailored to Your Industry
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "oklch(0.72 0.05 230)" }}>
            Sign a new commercial cleaning contract with Nexus Facility Services and receive a complimentary specialised service every 6 months — matched to your industry's specific needs.
          </p>
        </div>
      </section>

      {/* ─── Offers Grid ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.03)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map(({ icon: Icon, industry, tag, offer, offerDetail, accent, accentBg, tagBg }) => (
              <div
                key={industry}
                className="relative flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
                style={{
                  background: "oklch(0.13 0.05 245)",
                  border: `1px solid ${accent}40`,
                }}
              >
                {/* Accent top bar */}
                <div className="h-1 w-full" style={{ background: accent }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Tag + Icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1"
                      style={{ background: tagBg, color: accent, fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {tag}
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{ background: accentBg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: accent }} />
                    </div>
                  </div>

                  {/* Industry name */}
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "white",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                      lineHeight: 1.2,
                    }}
                  >
                    {industry}
                  </h3>

                  {/* Offer callout */}
                  <div
                    className="flex items-center gap-2 px-3 py-2 mb-3"
                    style={{ background: accentBg, borderLeft: `3px solid ${accent}` }}
                  >
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
                    <span
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{ color: accent, fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      FREE: {offer}
                    </span>
                  </div>

                  {/* Detail */}
                  <p className="text-sm flex-1" style={{ color: "oklch(0.72 0.05 230)", lineHeight: 1.6 }}>
                    {offerDetail}
                  </p>

                  {/* Every 6 months badge */}
                  <div className="mt-4 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" style={{ color: "oklch(0.55 0.06 245)" }} />
                    <span className="text-xs" style={{ color: "oklch(0.55 0.06 245)" }}>Every 6 months — included in contract</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-16" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container">
          <div
            className="text-center px-8 py-12"
            style={{
              background: "oklch(0.62 0.22 230 / 0.08)",
              border: "1px solid oklch(0.62 0.22 230 / 0.25)",
            }}
          >
            <div
              className="mb-2 font-bold uppercase tracking-widest text-xs"
              style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Limited Availability — New Contracts Only
            </div>
            <h2
              className="mb-3"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Ready to Lock In Your Industry Offer?
            </h2>
            <p className="text-sm mb-6 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.05 230)" }}>
              Contact us today to discuss your commercial cleaning contract. All offers are included at no extra cost — valid for new contracts signed in 2025.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-8 py-3.5 font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90"
              style={{
                background: "oklch(0.62 0.22 230)",
                color: "oklch(0.10 0.05 245)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.08em",
              }}
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
