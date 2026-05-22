import { ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "/manus-storage/nexus_logo_v3_fa9cb82a.jpg";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/hero_bg-kFiQrM3b2UU5fuEJutxt9C.webp";

const PHONE = "0477 376 440";
const PHONE_HREF = "tel:0477376440";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "oklch(0.10 0.05 245 / 0.7)" }} />
        <div className="relative container text-center py-20">
          <div className="mb-6 inline-block px-4 py-2 rounded-full border" style={{ borderColor: "oklch(0.62 0.22 230)" }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              ✨ MELBOURNE'S TRUSTED CLEANING SPECIALISTS
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            EVERYTHING LOOKS <br />
            <span style={{ color: "oklch(0.62 0.22 230)" }}>BETTER WHEN IT'S</span>
            <br />
            CLEAN.
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "oklch(0.72 0.05 230)" }}>
            Nexus Facility Services delivers professional commercial and domestic cleaning across Melbourne — with precision, reliability, and zero shortcuts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm uppercase tracking-wider border transition-all hover:opacity-90" style={{ borderColor: "oklch(0.62 0.22 230)", color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: "✓", text: "Fully Insured" },
              { icon: "✓", text: "Background Checked" },
              { icon: "✓", text: "5-Star Rated" },
              { icon: "✓", text: "Free Quotes" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2" style={{ color: "oklch(0.72 0.05 230)" }}>
                <span style={{ color: "oklch(0.62 0.22 230)" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick CTA Section */}
      <section className="py-12 border-t" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Ready to Get Started?
          </h2>
          <p className="text-sm mb-6" style={{ color: "oklch(0.72 0.05 230)" }}>
            Explore our services, view our special offers, or request a free quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 font-bold text-sm uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              View Services
            </Link>
            <Link href="/offers" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 font-bold text-sm uppercase tracking-wider border" style={{ borderColor: "oklch(0.62 0.22 230)", color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Special Offers
            </Link>
            <Link href="/areas" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 font-bold text-sm uppercase tracking-wider border" style={{ borderColor: "oklch(0.62 0.22 230)", color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Regulated & Insured Trust Badges */}
      <section className="py-16 border-t" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-3 uppercase tracking-wide" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Regulated & Fully Insured
          </h2>
          <p className="text-sm mb-10 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.05 230)" }}>
            We comply with all Australian rules and regulations. Our operations are licensed, insured, and monitored by official authorities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {/* Labour Hire Authority */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-lg p-4 flex items-center justify-center" style={{ width: "180px", height: "90px" }}>
                <img
                  src="/manus-storage/labour_hire_authority_logo_07661299.png"
                  alt="Labour Hire Authority - Licensed"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.72 0.05 230)" }}>Licensed Provider</span>
            </div>
            {/* WorkSafe Victoria */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-lg p-4 flex items-center justify-center" style={{ width: "180px", height: "90px" }}>
                <img
                  src="/manus-storage/worksafe_victoria_logo_d7f5a528.jpg"
                  alt="WorkSafe Victoria - Regulated"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.72 0.05 230)" }}>WorkSafe Regulated</span>
            </div>
            {/* RACV Business Insurance */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-lg p-4 flex items-center justify-center" style={{ width: "180px", height: "90px" }}>
                <img
                  src="/manus-storage/racv_business_insurance_logo_c1945941.jpg"
                  alt="RACV Business Insurance - Fully Insured"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.72 0.05 230)" }}>Fully Insured</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
