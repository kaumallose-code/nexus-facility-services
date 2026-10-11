import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      {/* About Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Who Are We?
              </div>
              <h1
                className="mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  color: "oklch(0.95 0.01 240)",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                }}
              >
                Melbourne's Premier{" "}
                <span style={{ color: "oklch(0.62 0.22 230)" }}>Facility Services</span>{" "}
                Provider
              </h1>
              <p className="text-base leading-relaxed mb-5" style={{ color: "oklch(0.72 0.05 230)" }}>
                Nexus Facility Group is a Melbourne-based cleaning company dedicated to delivering exceptional results for both commercial and domestic clients. From shopping centres and corporate offices to family homes and medical clinics, we bring the same level of professionalism and attention to detail to every job.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.72 0.05 230)" }}>
                Our team is fully insured, background-checked, and trained in the latest cleaning techniques and safety standards. Every job is completed to the highest standard with no shortcuts and no hidden costs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Commercial & Domestic",
                  "Fully Insured",
                  "Background Checked",
                  "5-Star Google Rating",
                  "7 Days a Week",
                  "All Melbourne Suburbs",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.72 0.05 230)" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/about_team-kFiQrM3b2UU5fuEJutxt9C.webp"
                alt="Nexus Team"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Our Values
            </h2>
            <p style={{ color: "oklch(0.72 0.05 230)" }}>
              What drives us to deliver excellence every single day
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Professionalism",
                desc: "Every team member is trained, insured, and background-checked. We show up on time, every time.",
              },
              {
                title: "Quality",
                desc: "We don't cut corners. Every surface is cleaned to the highest standard using proven techniques.",
              },
              {
                title: "Reliability",
                desc: "Your schedule matters. We work 7 days a week and adapt to your needs without excuses.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-lg border"
                style={{
                  background: "oklch(0.13 0.03 240)",
                  borderColor: "oklch(0.75 0.18 210 / 0.15)",
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {value.title}
                </h3>
                <p style={{ color: "oklch(0.72 0.05 230)" }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
