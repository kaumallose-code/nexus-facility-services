/*
 * NEXUS FACILITY SERVICES — Home Page
 * Design: Bold Dark-Mode Industrial (cleaned.au inspired)
 * Colors: Deep navy backgrounds, electric cyan accents, white text
 * Fonts: Barlow Condensed (headings) + DM Sans (body)
 */

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  ArrowRight,
  Star,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Clock,
  Shield,
  Award,
  Droplets,
  Wind,
  Layers,
  Sparkles,
  Building2,
  Home as HomeIcon,
  Wrench,
  Zap,
  Users,
  ThumbsUp,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/nexus_logo_enhanced_8b441841.png";
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/hero_bg-Lu5itz2tcQNhdePJZWAPMQ.png";
const SERVICES_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/services_bg-WNRvytBSwpcV8m8KmoLKNM.png";

const PHONE = "0404 934 544";
const PHONE_HREF = "tel:0404934544";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Partners", href: "#partners" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
];

const SERVICES = [
  { icon: Building2, label: "Commercial Cleaning", desc: "Offices, retail spaces, warehouses and corporate facilities." },
  { icon: HomeIcon, label: "Domestic Cleaning", desc: "Thorough residential cleaning tailored to your home." },
  { icon: Droplets, label: "Steam Cleaning", desc: "Deep steam cleaning for carpets, upholstery and hard surfaces." },
  { icon: Layers, label: "Floor Polishing", desc: "Strip, seal and polish all floor types to a brilliant shine." },
  { icon: Wind, label: "Pressure Washing", desc: "High-pressure cleaning for driveways, facades and outdoor areas." },
  { icon: Sparkles, label: "General Cleaning", desc: "Regular maintenance cleaning for homes and businesses." },
  { icon: Wrench, label: "Window Cleaning", desc: "Streak-free window cleaning for commercial and residential." },
  { icon: Zap, label: "Industrial Cleaning", desc: "Specialised cleaning for factories, warehouses and industrial sites." },
  { icon: Shield, label: "End of Lease Cleaning", desc: "Bond-back guaranteed deep cleans for rental properties." },
];

const STATS = [
  { value: "5.0", label: "Google Rating", suffix: "★" },
  { value: "100", label: "Satisfied Clients", suffix: "+" },
  { value: "10", label: "Years Experience", suffix: "+" },
  { value: "24", label: "Hour Support", suffix: "/7" },
];

const REVIEWS = [
  {
    name: "Grant Keenan",
    badge: "Local Guide · 165 reviews",
    rating: 5,
    text: "I can not recommend and express gratitude enough to Nexus Facility Group and Vinu in particular. Called out to do a very deep clean of my elderly mother's house, Vinu worked constantly with care and compassion to ensure the house has been returned to its original pristine condition. Offering a range of services across both domestic and commercial cleaning, you will not go wrong giving the team here a call.",
    date: "11 months ago",
  },
  {
    name: "Julie West",
    badge: "9 reviews",
    rating: 5,
    text: "We engaged Nexus for the cleaning, stripping and polishing of our clinic floors. They did a wonderful job and were very professional. Would certainly recommend and use again in the future.",
    date: "10 months ago",
  },
];

// ─── Scroll Animation Hook ─────────────────────────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Counter Animation ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const numTarget = parseInt(target);
          if (isNaN(numTarget)) {
            setCount(target);
            return;
          }
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(numTarget / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= numTarget) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(String(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Top Utility Bar ── */}
      <div
        style={{
          background: "oklch(0.06 0.02 240)",
          borderBottom: "1px solid oklch(0.75 0.18 210 / 0.2)",
        }}
        className="hidden md:block"
      >
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-4 text-sm" style={{ color: "oklch(0.7 0.02 240)" }}>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.18 210)" }} />
              Melbourne, VIC — Serving All Suburbs
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.18 210)" }} />
              Available 7 Days a Week
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold transition-all"
              style={{
                border: "1px solid oklch(0.75 0.18 210 / 0.5)",
                color: "oklch(0.75 0.18 210)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              Call Us
            </a>
            <a
              href="mailto:info@nexusfacilityservices.com.au"
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold transition-all"
              style={{
                border: "1px solid oklch(0.75 0.18 210 / 0.5)",
                color: "oklch(0.75 0.18 210)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold transition-all"
              style={{
                background: "oklch(0.75 0.18 210)",
                color: "oklch(0.06 0.02 240)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Book Now
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "oklch(0.08 0.02 240 / 0.97)" : "oklch(0.08 0.02 240)",
          borderBottom: "1px solid oklch(0.75 0.18 210 / 0.15)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Nexus Facility Services Logo" className="w-14 h-14 object-contain" />
            <div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                NEXUS
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: "oklch(0.75 0.18 210)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                FACILITY SERVICES
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{
                  color: "oklch(0.75 0.02 240)",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="hidden lg:flex items-center gap-2 px-5 py-2 text-sm font-bold transition-all"
              style={{
                background: "oklch(0.75 0.18 210)",
                color: "oklch(0.06 0.02 240)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              background: "oklch(0.08 0.02 240)",
              borderColor: "oklch(0.75 0.18 210 / 0.2)",
            }}
          >
            <div className="container py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-sm py-2 border-b"
                  style={{
                    color: "oklch(0.8 0.02 240)",
                    borderColor: "oklch(0.75 0.18 210 / 0.1)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 mt-2 text-sm font-bold"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.06 0.02 240)" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            opacity: 0.35,
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.06 0.02 240 / 0.95) 40%, oklch(0.06 0.02 240 / 0.6) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, oklch(0.06 0.02 240))",
          }}
        />

        <div className="container relative z-10 py-24">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-bold uppercase tracking-widest"
              style={{
                border: "1px solid oklch(0.75 0.18 210 / 0.5)",
                color: "oklch(0.75 0.18 210)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Melbourne's Trusted Cleaning Specialists
            </div>

            <h1
              className="mb-6 leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                color: "white",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              Everything Looks Better{" "}
              <span style={{ color: "oklch(0.75 0.18 210)" }}>When It's Clean.</span>
            </h1>

            <p
              className="mb-8 max-w-xl text-lg leading-relaxed"
              style={{ color: "oklch(0.75 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Nexus Facility Services delivers professional commercial and domestic cleaning across Melbourne — with precision, reliability, and zero shortcuts. Fully insured, background-checked, and committed to leaving every space spotless.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="nexus-btn-solid"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href={PHONE_HREF} className="nexus-btn-cyan">
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5">
              {[
                { icon: Shield, text: "Fully Insured" },
                { icon: CheckCircle, text: "Background Checked" },
                { icon: Award, text: "5-Star Rated" },
                { icon: ThumbsUp, text: "Free Quotes" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.7 0.02 240)" }}>
                  <Icon className="w-4 h-4" style={{ color: "oklch(0.75 0.18 210)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ background: "oklch(0.75 0.18 210)" }}>
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.2rem",
                    color: "oklch(0.06 0.02 240)",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  className="text-xs font-semibold mt-1 uppercase tracking-wider"
                  style={{ color: "oklch(0.15 0.02 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About Section ── */}
      <section id="about" className="py-20 section-light">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Who Are We?
              </div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  color: "oklch(0.1 0.03 240)",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                }}
              >
                Melbourne's Premier{" "}
                <span style={{ color: "oklch(0.75 0.18 210)" }}>Facility Services</span>{" "}
                Provider
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "oklch(0.35 0.02 240)" }}>
                Nexus Facility Services is a Melbourne-based cleaning company dedicated to delivering exceptional results for both commercial and domestic clients. From shopping centres and corporate offices to family homes and medical clinics, we bring the same level of professionalism and attention to detail to every job.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.35 0.02 240)" }}>
                Our team is fully insured, background-checked, and trained in the latest cleaning techniques and safety standards. We believe that a clean environment isn't just about appearances — it's about creating spaces where people feel comfortable, productive, and proud.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Commercial & Domestic",
                  "Fully Insured",
                  "Background Checked",
                  "Free Quotes",
                  "7 Days a Week",
                  "All Melbourne Suburbs",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.25 0.02 240)" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.75 0.18 210)" }} />
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="nexus-btn-solid"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="fade-up grid grid-cols-2 gap-4">
              {[
                {
                  icon: Building2,
                  title: "Commercial Cleaning",
                  desc: "Offices, retail, medical, and corporate facilities.",
                },
                {
                  icon: HomeIcon,
                  title: "Domestic Cleaning",
                  desc: "Homes, apartments, and end-of-lease cleans.",
                },
                {
                  icon: Layers,
                  title: "Floor Polishing",
                  desc: "Strip, seal and polish all floor types.",
                },
                {
                  icon: Wind,
                  title: "Pressure Washing",
                  desc: "Driveways, facades and outdoor areas.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 rounded-sm"
                  style={{
                    background: "oklch(0.97 0.005 240)",
                    border: "1px solid oklch(0.88 0.01 240)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-3"
                    style={{ background: "oklch(0.75 0.18 210 / 0.12)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "oklch(0.75 0.18 210)" }} />
                  </div>
                  <h3
                    className="font-bold text-sm mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.1 0.03 240)", fontSize: "1rem" }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section
        id="services"
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(0.08 0.02 240)" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SERVICES_BG})`, opacity: 0.12 }}
        />
        <div className="container relative z-10">
          <div className="text-center mb-14 fade-up">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What We Do
            </div>
            <h2
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
              Our <span style={{ color: "oklch(0.75 0.18 210)" }}>Services</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base" style={{ color: "oklch(0.65 0.02 240)" }}>
              At Nexus Facility Services, we deliver professional cleaning across Melbourne with precision, reliability and zero shortcuts. We're fully insured, background-checked, and committed to leaving every space spotless.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-up">
            {SERVICES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="service-card group">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.75 0.18 210 / 0.15)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "oklch(0.75 0.18 210)" }} />
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "white",
                        fontSize: "1.05rem",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "oklch(0.6 0.02 240)" }}>
                      {desc}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: "oklch(0.75 0.18 210)" }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="nexus-btn-cyan"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Partners Section ── */}
      <section id="partners" className="py-20 section-light">
        <div className="container">
          <div className="text-center mb-12 fade-up">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Our Partners
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                color: "oklch(0.1 0.03 240)",
                textTransform: "uppercase",
                lineHeight: 1.05,
              }}
            >
              Trusted <span style={{ color: "oklch(0.75 0.18 210)" }}>Partnerships</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base" style={{ color: "oklch(0.45 0.02 240)" }}>
              Nexus Facility Services is proud to partner with leading organisations to deliver exceptional facility management solutions across Melbourne.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto fade-up">
            {/* Alpha Facility Group */}
            <div
              className="p-8 text-center"
              style={{
                border: "2px solid oklch(0.75 0.18 210 / 0.3)",
                background: "oklch(0.97 0.005 240)",
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                style={{ background: "oklch(0.75 0.18 210 / 0.12)" }}
              >
                <Building2 className="w-8 h-8" style={{ color: "oklch(0.75 0.18 210)" }} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "oklch(0.1 0.03 240)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Alpha Facility Group
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
                We are proud to be an active partner with Alpha Facility Group, collaborating to deliver comprehensive facility management and cleaning solutions for commercial clients across Melbourne.
              </p>
              <div
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Active Partner
              </div>
            </div>

            {/* Ability to Ease */}
            <div
              className="p-8 text-center"
              style={{
                border: "2px solid oklch(0.75 0.18 210 / 0.3)",
                background: "oklch(0.97 0.005 240)",
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                style={{ background: "oklch(0.75 0.18 210 / 0.12)" }}
              >
                <Users className="w-8 h-8" style={{ color: "oklch(0.75 0.18 210)" }} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "oklch(0.1 0.03 240)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Ability to Ease
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 240)" }}>
                In partnership with Ability to Ease, we provide tailored cleaning and facility services that support accessibility and ease of living for individuals and organisations with specific needs.
              </p>
              <div
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Active Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews Section ── */}
      <section
        id="reviews"
        className="py-20"
        style={{ background: "oklch(0.08 0.02 240)" }}
      >
        <div className="container">
          <div className="text-center mb-12 fade-up">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What Our Clients Say
            </div>
            <h2
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
              Google <span style={{ color: "oklch(0.75 0.18 210)" }}>Reviews</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <StarRating count={5} />
              <span className="text-white font-bold text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                5.0
              </span>
              <span style={{ color: "oklch(0.6 0.02 240)" }} className="text-sm">
                · 2 Google Reviews
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto fade-up">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="p-7"
                style={{
                  background: "oklch(0.12 0.03 240)",
                  border: "1px solid oklch(0.75 0.18 210 / 0.2)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      className="font-bold text-white"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}
                    >
                      {review.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 240)" }}>
                      {review.badge}
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: "oklch(0.55 0.02 240)" }}>
                    {review.date}
                  </div>
                </div>
                <StarRating count={review.rating} />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "oklch(0.72 0.02 240)" }}>
                  "{review.text}"
                </p>
                <div
                  className="mt-4 flex items-center gap-1.5 text-xs"
                  style={{ color: "oklch(0.5 0.02 240)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Posted on Google
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="py-20 section-light">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="fade-up">
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Get In Touch
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  color: "oklch(0.1 0.03 240)",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                }}
              >
                Request a{" "}
                <span style={{ color: "oklch(0.75 0.18 210)" }}>Free Quote</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.4 0.02 240)" }}>
                If it feels uncomfortable or looks dirty, it's jeopardising your relationship with customers or tenants. Yet it's a problem that doesn't have to exist. Get in touch and find out how we can help.
              </p>

              <div className="space-y-5">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-4 p-5 group transition-all"
                  style={{
                    border: "2px solid oklch(0.75 0.18 210 / 0.3)",
                    background: "oklch(0.97 0.005 240)",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.75 0.18 210)" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: "oklch(0.06 0.02 240)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-0.5"
                      style={{ color: "oklch(0.55 0.02 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Call Us
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.1 0.03 240)" }}
                    >
                      {PHONE}
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@nexusfacilityservices.com.au"
                  className="flex items-center gap-4 p-5 group transition-all"
                  style={{
                    border: "2px solid oklch(0.75 0.18 210 / 0.3)",
                    background: "oklch(0.97 0.005 240)",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.75 0.18 210)" }}
                  >
                    <Mail className="w-5 h-5" style={{ color: "oklch(0.06 0.02 240)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-0.5"
                      style={{ color: "oklch(0.55 0.02 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Email Us
                    </div>
                    <div
                      className="text-base font-medium"
                      style={{ color: "oklch(0.1 0.03 240)" }}
                    >
                      info@nexusfacilityservices.com.au
                    </div>
                  </div>
                </a>

                <div
                  className="flex items-center gap-4 p-5"
                  style={{
                    border: "2px solid oklch(0.75 0.18 210 / 0.3)",
                    background: "oklch(0.97 0.005 240)",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.75 0.18 210)" }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: "oklch(0.06 0.02 240)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-0.5"
                      style={{ color: "oklch(0.55 0.02 240)", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Service Area
                    </div>
                    <div className="text-base font-medium" style={{ color: "oklch(0.1 0.03 240)" }}>
                      Melbourne & All Surrounding Suburbs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-up">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "oklch(0.06 0.02 240)", borderTop: "1px solid oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt="Nexus Facility Services" className="w-12 h-12 object-contain" />
                <div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      color: "white",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    NEXUS
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "oklch(0.75 0.18 210)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    FACILITY SERVICES
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.55 0.02 240)" }}>
                Professional commercial and domestic cleaning services across Melbourne. Fully insured, background-checked, and committed to excellence.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Cleaning Services
              </h4>
              <ul className="space-y-2">
                {[
                  "Commercial Cleaning",
                  "Domestic Cleaning",
                  "Steam Cleaning",
                  "Floor Polishing",
                  "Pressure Washing",
                  "Window Cleaning",
                  "Industrial Cleaning",
                  "End of Lease Cleaning",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      onClick={(e) => { e.preventDefault(); scrollTo("#services"); }}
                      className="text-sm transition-colors hover:text-white flex items-center gap-1.5"
                      style={{ color: "oklch(0.55 0.02 240)" }}
                    >
                      <ChevronRight className="w-3 h-3" style={{ color: "oklch(0.75 0.18 210)" }} />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                  style={{ color: "oklch(0.65 0.02 240)" }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.75 0.18 210)" }} />
                  {PHONE}
                </a>
                <a
                  href="mailto:info@nexusfacilityservices.com.au"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                  style={{ color: "oklch(0.65 0.02 240)" }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.75 0.18 210)" }} />
                  info@nexusfacilityservices.com.au
                </a>
                <div className="flex items-center gap-3 text-sm" style={{ color: "oklch(0.65 0.02 240)" }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.75 0.18 210)" }} />
                  Melbourne, VIC, Australia
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: "oklch(0.65 0.02 240)" }}>
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.75 0.18 210)" }} />
                  Available 7 Days a Week
                </div>
              </div>

              <div className="mt-6">
                <h4
                  className="text-sm font-bold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.75 0.18 210)", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Our Partners
                </h4>
                <div className="space-y-1.5">
                  <div className="text-sm" style={{ color: "oklch(0.55 0.02 240)" }}>Alpha Facility Group</div>
                  <div className="text-sm" style={{ color: "oklch(0.55 0.02 240)" }}>Ability to Ease</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
            style={{
              borderTop: "1px solid oklch(0.75 0.18 210 / 0.1)",
              color: "oklch(0.45 0.02 240)",
            }}
          >
            <span>© {new Date().getFullYear()} Nexus Facility Services. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>5.0 Google Rating</span>
              <span className="mx-2">·</span>
              <span>Melbourne, VIC</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Contact Form Component ────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center text-center p-10"
        style={{ border: "2px solid oklch(0.75 0.18 210 / 0.3)", background: "oklch(0.97 0.005 240)" }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center mb-4"
          style={{ background: "oklch(0.75 0.18 210)" }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: "oklch(0.06 0.02 240)" }} />
        </div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.1 0.03 240)" }}
        >
          Thank You!
        </h3>
        <p className="text-sm" style={{ color: "oklch(0.45 0.02 240)" }}>
          We've received your enquiry and will be in touch shortly. For urgent matters, please call us on{" "}
          <a href="tel:0404934544" style={{ color: "oklch(0.75 0.18 210)" }} className="font-semibold">
            0404 934 544
          </a>
          .
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "oklch(0.97 0.005 240)",
    border: "1px solid oklch(0.88 0.01 240)",
    color: "oklch(0.15 0.02 240)",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "0.4rem",
    color: "oklch(0.35 0.02 240)",
    fontFamily: "'Barlow Condensed', sans-serif",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8"
      style={{ border: "2px solid oklch(0.75 0.18 210 / 0.3)", background: "oklch(0.97 0.005 240)" }}
    >
      <h3
        className="text-xl font-bold mb-6"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          color: "oklch(0.1 0.03 240)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        Send Us a Message
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            required
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input
            required
            type="tel"
            placeholder="Your phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="mb-4">
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
      </div>

      <div className="mb-4">
        <label style={labelStyle}>Service Required</label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          style={{ ...inputStyle, appearance: "none" as const }}
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}
            </option>
          ))}
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      <div className="mb-6">
        <label style={labelStyle}>Message</label>
        <textarea
          rows={4}
          placeholder="Tell us about your cleaning needs..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <button type="submit" className="nexus-btn-solid w-full justify-center">
        Send Enquiry
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-center mt-4" style={{ color: "oklch(0.55 0.02 240)" }}>
        Or call us directly:{" "}
        <a href="tel:0404934544" style={{ color: "oklch(0.75 0.18 210)" }} className="font-semibold">
          0404 934 544
        </a>
      </p>
    </form>
  );
}
