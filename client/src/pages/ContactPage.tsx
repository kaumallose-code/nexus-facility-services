import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const PHONE = "0404 934 544";
const PHONE_HREF = "tel:0404934544";
const EMAIL = "admin@nexusfacilites.au";

const SERVICES = [
  { label: "Domestic Cleaning" },
  { label: "General Cleaning" },
  { label: "Commercial Cleaning" },
  { label: "Industrial Cleaning" },
  { label: "End of Lease Cleaning" },
  { label: "Steam Cleaning" },
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "60b0c703-f29a-47e4-b929-39f1a114078a";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Enquiry from ${form.name} — Nexus Facility Services`,
        name: form.name,
        phone: form.phone,
        email: form.email || "Not provided",
        service: form.service || "Not specified",
        message: form.message || "No message provided",
        from_name: "Nexus Facility Services Website",
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center text-center p-10"
        style={{ border: "1px solid oklch(0.75 0.18 210 / 0.3)", background: "oklch(0.30 0.12 245)" }}
      >
        <div className="w-16 h-16 flex items-center justify-center mb-4" style={{ background: "oklch(0.62 0.22 230)" }}>
          <CheckCircle className="w-8 h-8" style={{ color: "oklch(0.20 0.10 245)" }} />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "white" }}>
          Thank You!
        </h3>
        <p className="text-sm" style={{ color: "oklch(0.82 0.05 230)" }}>
          We've received your enquiry and will be in touch shortly. For urgent matters, please call{" "}
          <a href={PHONE_HREF} style={{ color: "oklch(0.62 0.22 230)" }} className="font-semibold">
            {PHONE}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${EMAIL}`} style={{ color: "oklch(0.62 0.22 230)" }} className="font-semibold">
            {EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "oklch(0.14 0.03 240)",
    border: "1px solid oklch(0.75 0.18 210 / 0.2)",
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "0.4rem",
    color: "oklch(0.82 0.05 230)",
    fontFamily: "'Barlow Condensed', sans-serif",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8"
      style={{ border: "1px solid oklch(0.75 0.18 210 / 0.25)", background: "oklch(0.30 0.12 245)" }}
    >
      <h3
        className="text-xl font-bold mb-6"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "white", textTransform: "uppercase", letterSpacing: "0.04em" }}
      >
        Send Us a Message
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input required type="tel" placeholder="Your phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div className="mb-4">
        <label style={labelStyle}>Email Address</label>
        <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
      </div>

      <div className="mb-4">
        <label style={labelStyle}>Service Required</label>
        <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle, appearance: "none" as const }}>
          <option value="">Select a service...</option>
          {SERVICES.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      <div className="mb-6">
        <label style={labelStyle}>Message</label>
        <textarea rows={4} placeholder="Tell us about your cleaning needs..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {error && (
        <p className="text-sm mb-4 p-3" style={{ background: "oklch(0.35 0.15 25 / 0.3)", color: "oklch(0.85 0.08 25)", border: "1px solid oklch(0.55 0.15 25 / 0.4)" }}>
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className="nexus-btn-solid w-full justify-center" style={{ opacity: loading ? 0.7 : 1 }}>
        {loading ? "Sending..." : "Send Enquiry"}
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-center mt-4" style={{ color: "oklch(0.42 0.06 245)" }}>
        Or call us:{" "}
        <a href={PHONE_HREF} style={{ color: "oklch(0.62 0.22 230)" }} className="font-semibold">{PHONE}</a>
        {" "}· Email:{" "}
        <a href={`mailto:${EMAIL}`} style={{ color: "oklch(0.62 0.22 230)" }} className="font-semibold">{EMAIL}</a>
      </p>
    </form>
  );
}

export default function ContactPage() {
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
            Get In <span style={{ color: "oklch(0.62 0.22 230)" }}>Touch</span>
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "oklch(0.85 0.04 230)" }}>
            Have questions or ready to book a cleaning service? Contact us today for a free, no-obligation quote.
          </p>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.03)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Request a Free Quote
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  color: "oklch(0.27 0.11 245)",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                }}
              >
                We're Here to Help
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.42 0.06 245)" }}>
                Whether you need domestic, commercial, or industrial cleaning, our team is ready to provide a free, no-obligation quote tailored to your specific needs.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Call Us", value: PHONE, href: PHONE_HREF },
                  { icon: Mail, label: "Email Us", value: EMAIL, href: `mailto:${EMAIL}` },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-5 transition-all"
                    style={{
                      border: "1px solid oklch(0.75 0.18 210 / 0.25)",
                      background: "oklch(0.27 0.11 245)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.75 0.18 210 / 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.75 0.18 210 / 0.25)";
                    }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.62 0.22 230)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "oklch(0.20 0.10 245)" }} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-0.5"
                        style={{ color: "oklch(0.78 0.05 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {label}
                      </div>
                      <div
                        className="font-bold"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "white", fontSize: "1.1rem" }}
                      >
                        {value}
                      </div>
                    </div>
                  </a>
                ))}

                <div
                  className="flex items-center gap-4 p-5"
                  style={{ border: "1px solid oklch(0.75 0.18 210 / 0.25)", background: "oklch(0.27 0.11 245)" }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.62 0.22 230)" }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: "oklch(0.20 0.10 245)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-0.5"
                      style={{ color: "oklch(0.78 0.05 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Service Area
                    </div>
                    <div className="font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "white", fontSize: "1.1rem" }}>
                      Melbourne & All Surrounding Suburbs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Response Time ─── */}
      <section className="py-16" style={{ background: "oklch(0.13 0.05 245)" }}>
        <div className="container text-center">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            What to Expect
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Fast Response", desc: "We respond to all enquiries within 24 hours." },
              { title: "Free Quote", desc: "No obligation site assessment and detailed pricing." },
              { title: "Professional Service", desc: "Fully insured, background-checked team." },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h3
                  className="mb-2 font-bold"
                  style={{
                    color: "oklch(0.62 0.22 230)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.78 0.05 230)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
