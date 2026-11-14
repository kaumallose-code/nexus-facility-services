import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Fan,
  Filter,
  Home,
  Phone,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Link } from "wouter";

const MOULD_IMAGE = "/manus-storage/nexus-mould-remediation_291a09b4.jpg";
const PHONE = "0477 376 440";

const SERVICES = [
  "Mould inspection and preliminary assessment",
  "Moisture source identification",
  "Containment and cross-contamination control",
  "HEPA vacuuming and appropriate cleaning methods",
  "Removal of mould-affected materials where required",
  "Cleaning of affected surfaces",
  "Post-remediation cleaning",
  "Moisture management and prevention recommendations",
  "Commercial and residential mould remediation support",
];

const PRINCIPLES = [
  { icon: Eye, title: "Assess the conditions", text: "We look at visible impact, likely moisture sources and the areas requiring attention." },
  { icon: Filter, title: "Control the work area", text: "Where appropriate, containment and cross-contamination controls are considered for the site." },
  { icon: Fan, title: "Clean appropriately", text: "Methods and equipment are selected around the affected materials, access and project conditions." },
  { icon: TriangleAlert, title: "Plan next steps", text: "We communicate practical moisture-management recommendations without promising permanent prevention." },
];

export default function MouldRemediationPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MOULD_IMAGE})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, oklch(0.07 0.04 245 / 0.95) 0%, oklch(0.08 0.04 245 / 0.84) 48%, oklch(0.08 0.04 245 / 0.38) 100%)" }} />
        <div className="relative container grid min-h-[620px] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Specialised cleaning · Melbourne and Victoria</p>
            <h1 className="mb-6 max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Professional Mould Remediation Melbourne</h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed" style={{ color: "oklch(0.80 0.05 230)" }}>
              Practical mould assessment, containment, cleaning and moisture-management support for commercial and residential properties across Melbourne and Victoria.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>Request a Mould Remediation Quote <ArrowRight className="h-4 w-4" /></Link>
              <a href="tel:0477376440" className="inline-flex items-center justify-center gap-2 border px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ borderColor: "oklch(0.62 0.22 230)", color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}><Phone className="h-4 w-4" /> {PHONE}</a>
            </div>
          </div>
          <div className="border p-7 backdrop-blur-sm" style={{ background: "oklch(0.08 0.04 245 / 0.82)", borderColor: "oklch(0.62 0.22 230 / 0.38)" }}>
            <ShieldCheck className="mb-5 h-10 w-10" style={{ color: "oklch(0.62 0.22 230)" }} />
            <h2 className="mb-4 text-3xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Careful, documented remediation support</h2>
            <p className="leading-relaxed" style={{ color: "oklch(0.78 0.05 230)" }}>Our mould remediation procedures are guided by applicable ANSI/IICRC S520 principles, with attention to assessment, containment, appropriate cleaning methods and moisture management. We do not guarantee complete mould elimination or permanent prevention.</p>
          </div>
        </div>
      </section>

      <section className="border-t py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Our support scope</p><h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>A practical response to mould-affected areas</h2><p className="leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>Mould concerns can involve both visible surfaces and the moisture conditions that allowed them to develop. We help property owners, managers, builders and restoration partners scope the cleaning and remediation support required.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{SERVICES.map((service) => <div key={service} className="flex items-start gap-3 border p-4" style={{ borderColor: "oklch(0.75 0.18 210 / 0.16)", background: "oklch(0.13 0.05 245 / 0.78)" }}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} /><span className="text-sm leading-relaxed" style={{ color: "oklch(0.82 0.04 230)" }}>{service}</span></div>)}</div>
        </div>
      </section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}><div className="container"><div className="mx-auto mb-12 max-w-3xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Professional principles</p><h2 className="text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Controlled work. Clear communication.</h2></div><div className="grid gap-4 md:grid-cols-4">{PRINCIPLES.map(({ icon: Icon, title, text }) => <article key={title} className="border p-6" style={{ background: "oklch(0.11 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.22)" }}><Icon className="mb-5 h-7 w-7" style={{ color: "oklch(0.62 0.22 230)" }} /><h3 className="mb-2 text-2xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>{text}</p></article>)}</div></div></section>

      <section className="border-t py-16" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="container text-center"><Home className="mx-auto mb-4 h-8 w-8" style={{ color: "oklch(0.62 0.22 230)" }} /><h2 className="mb-4 text-4xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Need mould remediation support?</h2><p className="mx-auto mb-7 max-w-2xl leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>Share the property type, affected area and any known moisture issue. We will help clarify a practical next step.</p><Link href="/contact" className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>Request a Mould Remediation Quote <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
