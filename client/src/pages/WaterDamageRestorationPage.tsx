import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Gauge,
  Home,
  Phone,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { Link } from "wouter";

const WATER_IMAGE = "/manus-storage/nexus-water-restoration-branded_0e0646a0.jpg";
const PHONE = "0477 376 440";

const SERVICES = [
  "Water damage inspection and assessment",
  "Water extraction and removal",
  "Structural drying and moisture control",
  "Commercial and residential water damage restoration",
  "Carpet and flooring water damage treatment",
  "Dehumidification and air movement",
  "Moisture monitoring and drying documentation",
  "Post-water-damage cleaning and sanitisation where appropriate",
  "Restoration support for builders, property managers and insurance restoration companies",
];

const PROCESS = [
  { icon: ClipboardCheck, title: "Assess", text: "We help establish the affected areas, visible conditions and practical next steps." },
  { icon: Droplets, title: "Extract", text: "Where appropriate, professional extraction and removal methods are selected for the site." },
  { icon: Wind, title: "Dry", text: "Air movement and dehumidification support controlled drying and moisture management." },
  { icon: Gauge, title: "Monitor", text: "Moisture monitoring and clear documentation help keep stakeholders informed." },
];

export default function WaterDamageRestorationPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${WATER_IMAGE})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, oklch(0.07 0.04 245 / 0.95) 0%, oklch(0.08 0.04 245 / 0.82) 48%, oklch(0.08 0.04 245 / 0.35) 100%)" }} />
        <div className="relative container grid min-h-[620px] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Restoration services · Melbourne and Victoria</p>
            <h1 className="mb-6 max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Water Damage Restoration Melbourne</h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed" style={{ color: "oklch(0.80 0.05 230)" }}>
              Practical water damage assessment, extraction, drying and restoration support for commercial and residential properties across Melbourne and Victoria.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Request a Water Damage Assessment <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:0477376440" className="inline-flex items-center justify-center gap-2 border px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ borderColor: "oklch(0.62 0.22 230)", color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
          <div className="border p-7 backdrop-blur-sm" style={{ background: "oklch(0.08 0.04 245 / 0.82)", borderColor: "oklch(0.62 0.22 230 / 0.38)" }}>
            <ShieldCheck className="mb-5 h-10 w-10" style={{ color: "oklch(0.62 0.22 230)" }} />
            <h2 className="mb-4 text-3xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Professional restoration support</h2>
            <p className="leading-relaxed" style={{ color: "oklch(0.78 0.05 230)" }}>
              Our restoration procedures are guided by applicable ANSI/IICRC S500 principles, with an emphasis on appropriate assessment, drying methods, safety, documentation and clear communication. This is a standards-aligned approach, not a claim of IICRC certification.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>What we can support</p>
            <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>A clear response when water affects your property</h2>
            <p className="leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>From first assessment through drying documentation and post-incident cleaning, we coordinate practical restoration support around the needs of owners, occupants, builders, property managers and restoration partners.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((service) => <div key={service} className="flex items-start gap-3 border p-4" style={{ borderColor: "oklch(0.75 0.18 210 / 0.16)", background: "oklch(0.13 0.05 245 / 0.78)" }}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} /><span className="text-sm leading-relaxed" style={{ color: "oklch(0.82 0.04 230)" }}>{service}</span></div>)}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>A structured approach</p><h2 className="text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Assess. Extract. Dry. Monitor.</h2></div>
          <div className="grid gap-4 md:grid-cols-4">{PROCESS.map(({ icon: Icon, title, text }) => <article key={title} className="border p-6" style={{ background: "oklch(0.11 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.22)" }}><Icon className="mb-5 h-7 w-7" style={{ color: "oklch(0.62 0.22 230)" }} /><h3 className="mb-2 text-2xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="border-t py-16" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="container text-center"><Home className="mx-auto mb-4 h-8 w-8" style={{ color: "oklch(0.62 0.22 230)" }} /><h2 className="mb-4 text-4xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Need water damage support?</h2><p className="mx-auto mb-7 max-w-2xl leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>Tell us what happened, where the affected area is located and what support you need. We will help clarify the next practical step.</p><Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>Request a Water Damage Assessment <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
