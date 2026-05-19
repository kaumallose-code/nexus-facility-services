import { MapPin, Building2, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "wouter";

export default function AreasPage() {
  const navigate = useNavigate();

  const zones = [
    {
      zone: "Casey & Cardinia Corridor",
      note: "Our home base — all cleaning services from $40/hr",
      suburbs: [
        { name: "Clyde North", type: "Commercial & Domestic", highlight: true },
        { name: "Berwick", type: "Commercial & Domestic", highlight: true },
        { name: "Cranbourne", type: "Commercial & Domestic", highlight: true },
        { name: "Pakenham", type: "Commercial & Domestic", highlight: true },
        { name: "Officer", type: "Commercial & Domestic", highlight: false },
        { name: "Beaconsfield", type: "Commercial & Domestic", highlight: false },
        { name: "Narre Warren", type: "Commercial & Domestic", highlight: false },
        { name: "Endeavour Hills", type: "Commercial & Domestic", highlight: false },
      ],
    },
    {
      zone: "Dandenong Industrial Belt",
      note: "Warehouses, factories, logistics hubs — industrial & commercial cleaning",
      suburbs: [
        { name: "Dandenong South", type: "Industrial & Commercial", highlight: true },
        { name: "Dandenong", type: "Commercial & Domestic", highlight: true },
        { name: "Hallam", type: "Industrial & Commercial", highlight: false },
        { name: "Lyndhurst", type: "Industrial & Commercial", highlight: false },
        { name: "Keysborough", type: "Industrial & Commercial", highlight: false },
        { name: "Springvale", type: "Commercial & Domestic", highlight: false },
        { name: "Noble Park", type: "Commercial & Domestic", highlight: false },
        { name: "Cheltenham", type: "Commercial & Domestic", highlight: false },
      ],
    },
    {
      zone: "Mornington Peninsula",
      note: "Commercial & domestic cleaning — 7 days a week",
      suburbs: [
        { name: "Baxter", type: "Commercial & Domestic", highlight: true },
        { name: "Somerville", type: "Commercial & Domestic", highlight: true },
        { name: "Hastings", type: "Commercial & Domestic", highlight: true },
        { name: "Dromana", type: "Commercial & Domestic", highlight: true },
        { name: "Langwarrin", type: "Commercial & Domestic", highlight: false },
        { name: "Frankston", type: "Commercial & Domestic", highlight: false },
        { name: "Mornington", type: "Commercial & Domestic", highlight: false },
        { name: "Rosebud", type: "Commercial & Domestic", highlight: false },
      ],
    },
    {
      zone: "Westernport & Regional Areas",
      note: "Commercial & domestic cleaning across the Westernport corridor",
      suburbs: [
        { name: "Koo Wee Rup", type: "Commercial & Domestic", highlight: true },
        { name: "Lang Lang", type: "Commercial & Domestic", highlight: true },
        { name: "Tooradin", type: "Commercial & Domestic", highlight: true },
        { name: "Bunyip", type: "Commercial & Domestic", highlight: false },
        { name: "Garfield", type: "Commercial & Domestic", highlight: false },
        { name: "Nar Nar Goon", type: "Commercial & Domestic", highlight: false },
        { name: "Caldermeade", type: "Commercial & Domestic", highlight: false },
        { name: "Yannathan", type: "Commercial & Domestic", highlight: false },
      ],
    },
    {
      zone: "Melbourne CBD & Inner South-East",
      note: "Office towers, retail and strata — commercial cleaning specialists",
      suburbs: [
        { name: "Melbourne CBD", type: "Commercial & Office", highlight: true },
        { name: "South Yarra", type: "Commercial & Domestic", highlight: false },
        { name: "Prahran", type: "Commercial & Domestic", highlight: false },
        { name: "St Kilda", type: "Commercial & Domestic", highlight: false },
        { name: "Windsor", type: "Commercial & Domestic", highlight: false },
        { name: "Armadale", type: "Commercial & Domestic", highlight: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="py-16" style={{ background: "oklch(0.13 0.03 240)" }}>
        <div className="container">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: "oklch(0.22 0.06 240)", color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <MapPin className="w-3.5 h-3.5" />
            Service Areas
          </div>
          <h1
            className="text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
          >
            Serving Melbourne &amp; Surrounds
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "oklch(0.78 0.05 230)" }}>
            Based in <strong style={{ color: "oklch(0.62 0.22 230)" }}>Clyde North (3978)</strong>, we cover commercial and domestic cleaning across a <strong style={{ color: "#fff" }}>50km radius</strong> — from Melbourne CBD to Koo Wee Rup, Dromana, and Hastings.
          </p>
        </div>
      </section>

      {/* ─── Zone Callout Banners ─── */}
      <section className="py-12" style={{ background: "oklch(0.13 0.03 240)" }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Building2,
                title: "Dandenong South Industrial Precinct",
                desc: "Victoria's largest industrial zone with 3,000+ businesses. We specialise in warehouse, factory and logistics hub cleaning contracts — commercial and domestic cleaning from $40/hr.",
                accent: "oklch(0.62 0.22 230)",
              },
              {
                icon: Zap,
                title: "Mornington Peninsula",
                desc: "Serving Baxter, Somerville, Hastings, Dromana, Langwarrin, Frankston, Mornington and Rosebud with professional commercial and domestic cleaning, 7 days a week.",
                accent: "oklch(0.72 0.18 145)",
              },
              {
                icon: MapPin,
                title: "Westernport & Regional Areas",
                desc: "Covering Koo Wee Rup, Lang Lang, Tooradin, Bunyip, Garfield and surrounding regional towns with reliable commercial and domestic cleaning services.",
                accent: "oklch(0.72 0.18 60)",
              },
            ].map((zone) => (
              <div
                key={zone.title}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: "oklch(0.18 0.06 240)", border: "1px solid oklch(0.28 0.08 240)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "oklch(0.22 0.12 230)" }}>
                    <zone.icon className="w-5 h-5" style={{ color: zone.accent }} />
                  </div>
                  <h3 className="font-bold text-base leading-tight" style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {zone.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.78 0.05 230)" }}>{zone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Suburb Grid ─── */}
      <section className="py-20" style={{ background: "oklch(0.08 0.02 240)" }}>
        <div className="container">
          <div className="space-y-12">
            {zones.map((zone) => (
              <div key={zone.zone}>
                <div className="mb-6">
                  <h2
                    className="text-2xl font-bold uppercase mb-2"
                    style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {zone.zone}
                  </h2>
                  <p className="text-sm" style={{ color: "oklch(0.72 0.05 230)" }}>
                    {zone.note}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {zone.suburbs.map((suburb) => (
                    <div
                      key={suburb.name}
                      className="p-4 rounded-lg transition-all hover:shadow-lg"
                      style={{
                        background: suburb.highlight ? "oklch(0.62 0.22 230 / 0.15)" : "oklch(0.18 0.06 240)",
                        border: suburb.highlight ? "1px solid oklch(0.62 0.22 230 / 0.4)" : "1px solid oklch(0.28 0.08 240)",
                      }}
                    >
                      <div
                        className="font-bold text-sm"
                        style={{ color: suburb.highlight ? "oklch(0.62 0.22 230)" : "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {suburb.name}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "oklch(0.72 0.05 230)" }}>
                        {suburb.type}
                      </div>
                    </div>
                  ))}
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
            Don't See Your Suburb Listed?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: "oklch(0.10 0.05 245)" }}>
            We service all suburbs within 50km of Clyde North. Contact us to confirm coverage for your specific location.
          </p>
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
