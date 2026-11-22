import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, Handshake, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";
import EnquiryFormDialog from "@/components/EnquiryFormDialog";

const NAVY = "oklch(0.10 0.05 245)";
const PANEL = "oklch(0.13 0.05 245)";
const CYAN = "oklch(0.62 0.22 230)";
const MUTED = "oklch(0.72 0.05 230)";
const BORDER = "oklch(0.75 0.18 210 / 0.18)";

const BENEFITS = [
  { icon: Users, title: "Supervised cleaning teams", body: "Our supervisors check cleaning standards against the agreed scope, give feedback to cleaners and coordinate follow-up work. We understand that the quality of our work reflects on your business when we represent you on site." },
  { icon: Handshake, title: "Support for ongoing contracts and specialist work", body: "We can support single sites, multi-site contracts and one-off projects. Our services include commercial cleaning, warehouse and industrial cleaning, post-construction cleaning, floor care, carpet steam cleaning, window cleaning and pressure washing." },
  { icon: ShieldCheck, title: "Insurance and site documentation", body: "We hold public liability and WorkCover insurance and can provide site-specific Safe Work Method Statements where required." },
];

export default function CleaningSubcontractingPage() {
  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <section className="relative overflow-hidden border-b py-20 md:py-28" style={{ borderColor: BORDER }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 80% 20%, oklch(0.62 0.22 230 / 0.4), transparent 45%)" }} />
        <div className="relative container max-w-5xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: CYAN }}>Victoria-wide partner support</p>
          <h1 className="mb-6 max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Commercial Cleaning Subcontracting in Victoria</h1>
          <p className="max-w-3xl text-lg leading-relaxed" style={{ color: MUTED }}>Nexus Facility Group provides commercial cleaning subcontracting for facility management companies, cleaning contractors, builders and property managers across Victoria. Our trained cleaners and supervisors support ongoing contracts, multi-site cleaning and project-based work.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row"><EnquiryFormDialog mode="partner" triggerLabel="Discuss a Subcontracting Opportunity" /><Link href="/services" className="inline-flex items-center justify-center gap-2 border px-7 py-4 text-sm font-bold uppercase tracking-wider" style={{ borderColor: CYAN, color: CYAN, fontFamily: "'Barlow Condensed', sans-serif" }}>View All Services <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container">
          <div className="mb-10 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>A clear operational record</p><h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Why Choose Nexus Facility Group as Your Cleaning Subcontractor?</h2><p className="leading-relaxed" style={{ color: MUTED }}>We combine capable people, active supervision and practical documentation to help partner businesses deliver consistent site outcomes.</p></div>
          <article className="mb-6 overflow-hidden border p-6 md:p-10" style={{ borderColor: "oklch(0.62 0.22 230 / 0.5)", background: "linear-gradient(135deg, oklch(0.15 0.07 245), oklch(0.1 0.05 245))" }}>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><div><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "oklch(0.62 0.22 230 / 0.16)", color: CYAN }}><ClipboardCheck className="h-7 w-7" /></div><h3 className="mb-4 text-3xl font-black uppercase md:text-4xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Digital inspections through our portal</h3><p className="leading-relaxed" style={{ color: MUTED }}>Our trained site supervisors conduct digital cleaning inspections through the Nexus Facility Group portal. They use site-specific checklists to record completed checks, document issues and add photos where needed. This gives our team a clear record to follow up on issues and check that corrective work has been completed.</p></div><div className="grid gap-3"><div className="flex items-center gap-3 border p-4" style={{ borderColor: BORDER, background: "oklch(0.1 0.05 245)" }}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black" style={{ background: CYAN, color: NAVY }}>1</span><span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.03 230)" }}>Supervisor inspects the site</span></div><div className="flex items-center gap-3 border p-4" style={{ borderColor: BORDER, background: "oklch(0.1 0.05 245)" }}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black" style={{ background: CYAN, color: NAVY }}>2</span><span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.03 230)" }}>Findings are recorded in the portal</span></div><div className="flex items-center gap-3 border p-4" style={{ borderColor: BORDER, background: "oklch(0.1 0.05 245)" }}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black" style={{ background: CYAN, color: NAVY }}>3</span><span className="text-sm font-semibold" style={{ color: "oklch(0.88 0.03 230)" }}>Issues are followed up</span></div></div></div>
          </article>
          <div className="grid gap-6 md:grid-cols-3">{BENEFITS.map(({ icon: Icon, title, body }) => <article key={title} className="border p-6" style={{ borderColor: BORDER, background: PANEL }}><Icon className="mb-5 h-7 w-7" style={{ color: CYAN }} /><h3 className="mb-3 text-2xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="border-t py-20" style={{ borderColor: BORDER }}><div className="container grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>Built for partner delivery</p><h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Represent your standards on every site</h2><p className="mb-7 leading-relaxed" style={{ color: MUTED }}>We work within your agreed scope, site requirements and communication processes. Whether you need additional capacity for a live contract or reliable support for a project, our team is ready to discuss the practical details.</p><div className="grid gap-3 sm:grid-cols-2">{["Victoria-wide coverage", "Trained cleaners and supervisors", "Single-site or multi-site support", "Commercial and specialist capability"].map(item => <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.82 0.04 230)" }}><CheckCircle2 className="h-4 w-4" style={{ color: CYAN }} />{item}</div>)}</div></div><div className="border p-7" style={{ borderColor: "oklch(0.62 0.22 230 / 0.35)", background: PANEL }}><FileText className="mb-4 h-8 w-8" style={{ color: CYAN }} /><h3 className="mb-4 text-3xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Start the conversation</h3><p className="mb-6 text-sm leading-relaxed" style={{ color: MUTED }}>Tell us about your sites, scope and preferred support model.</p><EnquiryFormDialog mode="partner" triggerLabel="Discuss a Subcontracting Opportunity" /></div></div></section>
    </div>
  );
}
