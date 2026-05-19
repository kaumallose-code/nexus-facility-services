import { ArrowRight, Phone, Mail } from "lucide-react";
import { useNavigate } from "wouter";

const LOGO_URL = "/manus-storage/nexus_logo_v3_fa9cb82a.jpg";
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/hero_bg-kFiQrM3b2UU5fuEJutxt9C.webp";

const PHONE = "0477 376 440";
const PHONE_HREF = "tel:0477376440";
const EMAIL = "admin.hr@nexusfacility.au";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Hero Section ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.10 0.05 245 / 0.75)" }}
        />

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2 px-4 py-1.5"
              style={{
                background: "oklch(0.62 0.22 230 / 0.15)",
                border: "1px solid oklch(0.62 0.22 230 / 0.3)",
                color: "oklch(0.62 0.22 230)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              ✨ MELBOURNE'S TRUSTED CLEANING SPECIALISTS
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                color: "white",
                textTransform: "uppercase",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Everything Looks Better{" "}
              <span style={{ color: "oklch(0.62 0.22 230)" }}>When It's Clean.</span>
            </h1>

            <p className="text-lg mb-8 max-w-2xl" style={{ color: "oklch(0.78 0.05 230)" }}>
              Nexus Facility Services delivers professional commercial and domestic cleaning across Melbourne — with precision, reliability, and zero shortcuts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90"
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
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all border"
                style={{
                  borderColor: "oklch(0.62 0.22 230)",
                  color: "oklch(0.62 0.22 230)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col sm:flex-row gap-8 text-sm">
              <div>
                <div className="font-bold" style={{ color: "oklch(0.62 0.22 230)" }}>
                  ✓ Fully Insured
                </div>
                <div style={{ color: "oklch(0.72 0.05 230)" }}>WorkSafe Victoria & RACV</div>
              </div>
              <div>
                <div className="font-bold" style={{ color: "oklch(0.62 0.22 230)" }}>
                  ✓ 50km Coverage
                </div>
                <div style={{ color: "oklch(0.72 0.05 230)" }}>All Melbourne suburbs</div>
              </div>
              <div>
                <div className="font-bold" style={{ color: "oklch(0.62 0.22 230)" }}>
                  ✓ 7 Days a Week
                </div>
                <div style={{ color: "oklch(0.72 0.05 230)" }}>Available anytime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Links Section ─── */}
      <section className="py-16" style={{ background: "oklch(0.13 0.05 245)" }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Our Services", action: () => navigate("/services") },
              { label: "Special Offers", action: () => navigate("/offers") },
              { label: "Service Areas", action: () => navigate("/areas") },
              { label: "Contact Us", action: () => navigate("/contact") },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="p-6 text-center transition-all hover:opacity-80 border"
                style={{
                  borderColor: "oklch(0.62 0.22 230 / 0.3)",
                  background: "oklch(0.08 0.04 245)",
                }}
              >
                <div
                  className="font-bold uppercase tracking-wide"
                  style={{
                    color: "oklch(0.62 0.22 230)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  {label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
