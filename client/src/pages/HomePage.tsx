import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Handshake,
  Mail,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import EnquiryFormDialog from "@/components/EnquiryFormDialog";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/hero_bg-kFiQrM3b2UU5fuEJutxt9C.webp";
const PHONE = "0477 376 440";
const PHONE_HREF = "tel:0477376440";
const EMAIL = "admin.hr@nexusfacility.au";

const SERVICE_HIGHLIGHTS = [
  "Commercial and office cleaning",
  "Childcare and education cleaning",
  "Retail and common-area cleaning",
  "Warehouse and industrial cleaning",
  "Builders and post-construction cleaning",
  "End-of-lease and make-good cleaning",
  "Floor scrubbing, stripping and sealing",
  "Carpet and upholstery steam cleaning",
  "Internal and external window cleaning",
  "Pressure washing",
  "Water damage restoration cleaning support",
];

const INDUSTRIES = [
  { title: "Offices and commercial properties", description: "Well-presented workplaces with dependable ongoing cleaning support." },
  { title: "Childcare and education", description: "Practical cleaning programs for learning environments and shared facilities." },
  { title: "Retail and common areas", description: "Consistent presentation across customer-facing spaces and shared amenities." },
  { title: "Warehouses and industrial sites", description: "Structured cleaning support for operational, staff and high-traffic areas." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      <section
        className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "oklch(0.10 0.05 245 / 0.74)" }} />
        <div className="relative container py-24 text-center">
          <div className="mb-6 inline-block rounded-full border px-4 py-2" style={{ borderColor: "oklch(0.62 0.22 230)" }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Melbourne and Victoria cleaning support
            </p>
          </div>
          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-black leading-tight md:text-7xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Professional Cleaning.
            <br />
            <span style={{ color: "oklch(0.62 0.22 230)" }}>Reliable People.</span>
          </h1>
          <p className="mx-auto mb-9 max-w-3xl text-lg leading-relaxed" style={{ color: "oklch(0.78 0.05 230)" }}>
            Nexus Facility Group delivers commercial and specialist cleaning services across Melbourne and Victoria. We work directly with businesses, property managers and builders, and provide reliable subcontracting support to cleaning and facility management companies.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <EnquiryFormDialog mode="commercial" />
            <EnquiryFormDialog mode="partner" />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm" style={{ color: "oklch(0.72 0.05 230)" }}>
            {[
              "Commercial cleaning",
              "Specialist projects",
              "Subcontracting support",
              "Free quotes",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" style={{ color: "oklch(0.62 0.22 230)" }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Two ways to work with us</p>
            <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Cleaning support built around your operation
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>
              Whether you need a dependable cleaning provider for your own premises or additional capacity for contracts you already manage, Nexus Facility Group offers practical support with clear communication and a defined scope of work.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border p-8 md:p-10" style={{ background: "oklch(0.13 0.05 245 / 0.92)", borderColor: "oklch(0.62 0.22 230 / 0.35)" }}>
              <Building2 className="mb-6 h-10 w-10" style={{ color: "oklch(0.62 0.22 230)" }} />
              <h3 className="mb-4 text-3xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Commercial Cleaning Services
              </h3>
              <p className="mb-7 leading-relaxed" style={{ color: "oklch(0.74 0.05 230)" }}>
                Tailored cleaning solutions for offices, childcare centres, retail spaces, warehouses and commercial properties. From ongoing cleaning to specialist projects, our team keeps your premises clean and well presented.
              </p>
              <EnquiryFormDialog mode="commercial" />
            </article>

            <article className="border p-8 md:p-10" style={{ background: "oklch(0.13 0.05 245 / 0.92)", borderColor: "oklch(0.62 0.22 230 / 0.35)" }}>
              <Handshake className="mb-6 h-10 w-10" style={{ color: "oklch(0.62 0.22 230)" }} />
              <h3 className="mb-4 text-3xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Cleaning Subcontracting Partners
              </h3>
              <p className="mb-7 leading-relaxed" style={{ color: "oklch(0.74 0.05 230)" }}>
                Reliable cleaning teams to support your contracts across Victoria. With experienced cleaners and supervisors, we provide ongoing site coverage, additional staffing and specialist cleaning support while respecting your client relationships and service standards.
              </p>
              <EnquiryFormDialog mode="partner" />
            </article>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "oklch(0.08 0.04 245)" }}>
        <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Service highlights</p>
            <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              One team for routine and specialist cleaning
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>
              From daily presentation cleaning through to project-based floor care, window cleaning and restoration support, we can scope the work around your site, schedule and operational requirements.
            </p>
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Explore Cleaning Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICE_HIGHLIGHTS.map((service) => (
              <div key={service} className="flex items-start gap-3 border p-4" style={{ borderColor: "oklch(0.75 0.18 210 / 0.16)", background: "oklch(0.10 0.05 245 / 0.7)" }}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                <span className="text-sm" style={{ color: "oklch(0.82 0.04 230)" }}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Industries we support</p>
            <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Cleaning that fits your environment
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((industry) => (
              <article key={industry.title} className="border p-6" style={{ borderColor: "oklch(0.75 0.18 210 / 0.16)", background: "oklch(0.13 0.05 245 / 0.8)" }}>
                <h3 className="mb-3 text-xl font-bold uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>{industry.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>{industry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)", background: "oklch(0.08 0.04 245)" }}>
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Insurance and compliance</p>
              <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Professional standards, clearly communicated
              </h2>
              <p className="max-w-2xl leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>
                We provide clear information about our insurance and workplace compliance arrangements so customers and partners can assess our services with confidence. Ask our team for the information relevant to your site and scope.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: ShieldCheck, title: "Business insurance", text: "Insured through RACV Business Insurance." },
                { icon: CheckCircle2, title: "Workplace compliance", text: "WorkSafe Victoria information available for clients and partners." },
                { icon: Users, title: "Reliable communication", text: "Clear scope, site requirements and service expectations." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 border p-5" style={{ borderColor: "oklch(0.62 0.22 230 / 0.24)", background: "oklch(0.10 0.05 245 / 0.78)" }}>
                  <Icon className="mt-1 h-6 w-6 shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                  <div>
                    <h3 className="mb-1 text-lg font-bold uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-16" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>Start a conversation</p>
          <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Tell us what support you need
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed" style={{ color: "oklch(0.72 0.05 230)" }}>
            Contact us for a direct customer quote or a subcontracting partnership discussion. We will help clarify the service, site location, timing and next steps.
          </p>
          <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
            <EnquiryFormDialog mode="commercial" />
            <EnquiryFormDialog mode="partner" />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-8" style={{ color: "oklch(0.74 0.05 230)" }}>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" style={{ color: "oklch(0.62 0.22 230)" }} />{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:underline"><Mail className="h-4 w-4" style={{ color: "oklch(0.62 0.22 230)" }} />{EMAIL}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
