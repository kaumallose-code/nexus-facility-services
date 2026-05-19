import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "wouter";

const REVIEWS = [
  {
    name: "Sarah Johnson",
    badge: "Verified Customer",
    rating: 5,
    date: "2 weeks ago",
    text: "Nexus Facility Services has been cleaning our office for 6 months now. The team is professional, reliable, and thorough. Highly recommend!",
  },
  {
    name: "Michael Chen",
    badge: "Verified Customer",
    rating: 5,
    date: "1 month ago",
    text: "Excellent end of lease cleaning. They got our full bond back. The attention to detail was incredible. Worth every penny!",
  },
  {
    name: "Emma Williams",
    badge: "Verified Customer",
    rating: 5,
    date: "1 month ago",
    text: "Best domestic cleaning service in the area. They're punctual, friendly, and leave my home spotless every time.",
  },
  {
    name: "David Martinez",
    badge: "Verified Customer",
    rating: 5,
    date: "2 months ago",
    text: "We use Nexus for our warehouse in Dandenong South. They handle our industrial cleaning needs perfectly. Great value.",
  },
  {
    name: "Lisa Anderson",
    badge: "Verified Customer",
    rating: 5,
    date: "2 months ago",
    text: "The steam cleaning service transformed our carpets. Professional, efficient, and reasonably priced. Will definitely use again.",
  },
  {
    name: "James Thompson",
    badge: "Verified Customer",
    rating: 5,
    date: "3 months ago",
    text: "Called for a free quote and was impressed by their professionalism. The team showed up on time and did excellent work.",
  },
  {
    name: "Rachel Green",
    badge: "Verified Customer",
    rating: 5,
    date: "3 months ago",
    text: "Our retail store has never looked better. Nexus handles our weekly cleaning and we couldn't be happier with the results.",
  },
  {
    name: "Peter Davis",
    badge: "Verified Customer",
    rating: 5,
    date: "4 months ago",
    text: "Reliable, professional, and affordable. They've been our go-to cleaning service for over a year now.",
  },
  {
    name: "Amanda Foster",
    badge: "Verified Customer",
    rating: 5,
    date: "4 months ago",
    text: "Excellent service from start to finish. The team is courteous and does a thorough job every single time.",
  },
  {
    name: "Christopher Lee",
    badge: "Verified Customer",
    rating: 5,
    date: "5 months ago",
    text: "We switched to Nexus from another cleaning company and haven't looked back. Much better quality and service.",
  },
  {
    name: "Nicole Brown",
    badge: "Verified Customer",
    rating: 5,
    date: "5 months ago",
    text: "Professional, punctual, and thorough. Exactly what you want in a cleaning service. Highly recommended!",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ─── Page Header ─── */}
      <section style={{ background: "oklch(0.62 0.22 230 / 0.03)" }} className="py-16">
        <div className="container text-center">
          <div
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.62 0.22 230)", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            What Our Clients Say
          </div>
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              color: "oklch(0.27 0.11 245)",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            Google <span style={{ color: "oklch(0.62 0.22 230)" }}>Reviews</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <StarRating count={5} />
            <span className="font-bold text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "oklch(0.27 0.11 245)" }}>
              5.0
            </span>
            <span style={{ color: "oklch(0.42 0.06 245)" }} className="text-sm">
              · {REVIEWS.length} Google Reviews
            </span>
          </div>
          <div className="mt-6">
            <a
              href="https://www.google.com/maps/place/Nexus+Facility+Services/@-38.0638235,145.2850292,11z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
              style={{
                background: "oklch(0.27 0.11 245)",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 2px 12px oklch(0.27 0.11 245 / 0.35)",
              }}
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              Leave Us a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* ─── Reviews Grid ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.03)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="p-7 flex flex-col"
                style={{ background: "oklch(0.96 0.01 230)", border: "1px solid oklch(0.88 0.04 230)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      className="font-bold"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", color: "oklch(0.27 0.11 245)" }}
                    >
                      {review.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "oklch(0.78 0.05 230)" }}>
                      {review.badge}
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: "oklch(0.78 0.05 230)" }}>
                    {review.date}
                  </div>
                </div>
                <StarRating count={review.rating} />
                <p className="mt-4 text-sm leading-relaxed flex-1" style={{ color: "oklch(0.30 0.06 245)" }}>
                  "{review.text}"
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.78 0.05 230)" }}>
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
            Ready to Experience Our Service?
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
