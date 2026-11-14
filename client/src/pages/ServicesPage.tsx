import { ArrowRight, Building2, Droplets, HardHat, Layers, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Link } from "wouter";

const SERVICES_BG = "/manus-storage/services_bg_escalator_534aa57a.png";
const WATER_IMAGE = "/manus-storage/nexus-water-restoration_61e888ba.jpg";
const MOULD_IMAGE = "/manus-storage/nexus-mould-remediation_291a09b4.jpg";
const VAN_IMAGE = "/manus-storage/nexus_van_warehouse_4e0b9698.jpg";
const CHILDCARE_IMAGE = "/manus-storage/welcome_offer_childcare_48da7dbf.png";
const HOME_IMAGE = "/manus-storage/welcome_offer_home_exterior_6a8f7cc5.png";
const WINDOW_IMAGE = "/manus-storage/welcome_offer_windows_adf867f5.png";

const SERVICES = [
  { icon: Building2, label: "Commercial Cleaning", desc: "Professional cleaning for offices, retail spaces, medical centres, warehouses and corporate facilities.", image: SERVICES_BG, href: "/contact", color: "oklch(0.65 0.20 230)" },
  { icon: Sparkles, label: "Childcare & Educational Facilities", desc: "Hygiene-focused cleaning programs for learning environments, shared facilities and high-touch areas.", image: CHILDCARE_IMAGE, href: "/contact", color: "oklch(0.65 0.15 160)" },
  { icon: Wind, label: "Warehouse & Industrial Cleaning", desc: "Structured cleaning support for operational, staff, warehouse and high-traffic areas.", image: VAN_IMAGE, href: "/contact", color: "oklch(0.65 0.18 50)" },
  { icon: HardHat, label: "Builders & Post-Construction", desc: "Dust, debris and construction-residue removal for renovations, handovers and make-good projects.", image: HOME_IMAGE, href: "/contact", color: "oklch(0.65 0.20 280)" },
  { icon: Droplets, label: "Water Damage Restoration", desc: "Water damage assessment, extraction, structural drying, moisture monitoring and restoration support.", image: WATER_IMAGE, href: "/water-damage-restoration", color: "oklch(0.65 0.20 220)" },
  { icon: ShieldCheck, label: "Mould Remediation", desc: "Assessment, containment and appropriate cleaning methods guided by applicable ANSI/IICRC S520 principles.", image: MOULD_IMAGE, href: "/mould-remediation", color: "oklch(0.65 0.15 150)" },
  { icon: Layers, label: "Floor Stripping, Sealing & Polishing", desc: "Floor care programs that remove old coatings, protect surfaces and restore presentation.", image: SERVICES_BG, href: "/contact", color: "oklch(0.65 0.20 330)" },
  { icon: Droplets, label: "Carpet & Upholstery Steam Cleaning", desc: "Deep extraction for carpets, rugs and upholstery in commercial and residential environments.", image: HOME_IMAGE, href: "/contact", color: "oklch(0.65 0.20 280)" },
  { icon: Sparkles, label: "Window & External Cleaning", desc: "Professional internal, external and high-reach window cleaning with streak-free results.", image: WINDOW_IMAGE, href: "/contact", color: "oklch(0.65 0.18 90)" },
  { icon: Wind, label: "Pressure Washing & Specialist Cleaning", desc: "High-pressure and specialist cleaning for paths, facades, driveways, car parks and shared areas.", image: VAN_IMAGE, href: "/contact", color: "oklch(0.65 0.12 200)" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}><div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${SERVICES_BG})` }} /><div className="relative container py-24 text-center"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Commercial · Specialist · Restoration</p><h1 className="mb-5 text-5xl font-black uppercase md:text-7xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Our Services</h1><p className="mx-auto max-w-3xl text-lg leading-relaxed" style={{ color: "oklch(0.78 0.05 230)" }}>Professional cleaning, facility services, water damage restoration and mould remediation for commercial and residential properties across Melbourne and Victoria.</p></div></section>

      <section className="py-20"><div className="container"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{SERVICES.map((svc) => <article key={svc.label} className="group overflow-hidden border" style={{ background: "oklch(0.12 0.05 245)", borderColor: "oklch(0.75 0.18 210 / 0.16)" }}><div className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(180deg, transparent, oklch(0.08 0.04 245 / 0.72)), url(${svc.image})` }} /><div className="p-7"><svc.icon className="mb-5 h-8 w-8" style={{ color: svc.color }} /><h2 className="mb-3 text-2xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>{svc.label}</h2><p className="mb-6 min-h-14 text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>{svc.desc}</p><Link href={svc.href} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: svc.color, fontFamily: "'Barlow Condensed', sans-serif" }}>Learn More <ArrowRight className="h-4 w-4" /></Link></div></article>)}</div></div></section>

      <section className="py-16" style={{ background: "oklch(0.08 0.04 245)" }}><div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Standards-aligned restoration support</p><h2 className="mb-4 text-4xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Need a restoration response?</h2><p className="max-w-3xl leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>Our restoration approach is guided by applicable ANSI/IICRC principles, with professional assessment, appropriate methods, safety, documentation and clear communication.</p></div><Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>Request an Assessment <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
