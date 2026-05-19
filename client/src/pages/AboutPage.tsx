import { ArrowRight, CheckCircle, Shield, Award, Users, Clock } from "lucide-react";
import { useNavigate } from "wouter";

export default function AboutPage() {
  const navigate = useNavigate();

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
            About <span style={{ color: "oklch(0.62 0.22 230)" }}>Nexus</span>
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "oklch(0.85 0.04 230)" }}>
            Melbourne's premier facility services provider — delivering excellence in commercial and domestic cleaning since day one.
          </p>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.05)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Who Are We?
              </div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  color: "oklch(0.27 0.11 245)",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                }}
              >
                Melbourne's Premier{" "}
                <span style={{ color: "oklch(0.62 0.22 230)" }}>Facility Services</span>{" "}
                Provider
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "oklch(0.30 0.06 245)" }}>
                Nexus Facility Services is a Melbourne-based cleaning company dedicated to delivering exceptional results for both commercial and domestic clients. From shopping centres and corporate offices to family homes and medical clinics, we bring the same level of professionalism and attention to detail to every job.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.30 0.06 245)" }}>
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
                  <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.25 0.02 240)" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.62 0.22 230)" }} />
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all"
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

            {/* Right side: Why Choose Us */}
            <div className="grid gap-6">
              {[
                {
                  icon: Shield,
                  title: "Fully Insured & Certified",
                  desc: "WorkSafe Victoria registered and RACV business insured. Your peace of mind is guaranteed.",
                },
                {
                  icon: Award,
                  title: "5-Star Rated",
                  desc: "Consistently rated 5 stars by satisfied clients across Melbourne for quality and reliability.",
                },
                {
                  icon: Users,
                  title: "Professional Team",
                  desc: "Background-checked, trained staff committed to delivering excellence on every job.",
                },
                {
                  icon: Clock,
                  title: "Available 7 Days",
                  desc: "Flexible scheduling including after-hours and weekend cleaning to suit your needs.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 flex gap-4"
                  style={{
                    background: "white",
                    border: "1px solid oklch(0.90 0.02 230)",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.62 0.22 230 / 0.1)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "oklch(0.62 0.22 230)" }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold mb-1"
                      style={{
                        color: "oklch(0.27 0.11 245)",
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm" style={{ color: "oklch(0.40 0.05 245)" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Commitment ─── */}
      <section className="py-20" style={{ background: "oklch(0.22 0.10 245)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 3vw, 2.8rem)",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Our <span style={{ color: "oklch(0.62 0.22 230)" }}>Commitment</span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "oklch(0.85 0.04 230)" }}>
              We're committed to delivering cleaning services that exceed expectations — every single time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Zero Shortcuts",
                desc: "We don't cut corners. Every surface is cleaned to perfection, every time.",
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees, no surprises. You know exactly what you're paying for.",
              },
              {
                title: "Customer First",
                desc: "Your satisfaction is our priority. We listen, adapt, and deliver what you need.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="p-8 text-center"
                style={{
                  background: "oklch(0.27 0.11 245)",
                  border: "1px solid oklch(0.75 0.18 210 / 0.25)",
                }}
              >
                <h3
                  className="mb-3 font-bold"
                  style={{
                    color: "oklch(0.62 0.22 230)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "oklch(0.85 0.04 230)" }}>{desc}</p>
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
            Ready to Experience the Nexus Difference?
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
