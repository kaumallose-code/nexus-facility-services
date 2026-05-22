import { Star, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

const PHONE = "0477 376 440";
const PHONE_HREF = "tel:0477376440";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/ihTt8RP5MBdjkkLw9?g_st=ic";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      {/* Header */}
      <section className="py-16 border-b" style={{ borderColor: "oklch(0.75 0.18 210 / 0.15)" }}>
        <div className="container text-center">
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              color: "oklch(0.95 0.01 240)",
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: "uppercase",
            }}
          >
            What Our Clients Say
          </h1>
          <p style={{ color: "oklch(0.72 0.05 230)", maxWidth: "600px", margin: "0 auto" }}>
            Real reviews from real customers who trust Nexus Facility Services for their cleaning needs across Melbourne.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container">
          {/* Rating Summary */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-2xl font-bold mb-2" style={{ color: "oklch(0.95 0.01 240)" }}>
                5.0 Stars
              </p>
              <p style={{ color: "oklch(0.72 0.05 230)" }}>
                Based on 11 verified Google reviews
              </p>
            </div>
          </div>

          {/* Google Reviews Embed */}
          <div className="mb-16">
            <div
              className="rounded-lg overflow-hidden"
              style={{
                background: "oklch(0.13 0.03 240)",
                border: "1px solid oklch(0.75 0.18 210 / 0.15)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8386516005147!2d145.2622041!3d-38.2496873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d9e0a442a24fd4b%3A0xdbfcb7cf76c75b75!2sNexus%20Facility%20Services!5e0!3m2!1sen!2sau!4v1716203400000"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-center mt-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90"
                style={{
                  background: "oklch(0.62 0.22 230)",
                  color: "oklch(0.10 0.05 245)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                <MapPin className="w-4 h-4" />
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="mb-16">
            <h2
              className="text-2xl font-bold mb-8 text-center"
              style={{
                color: "oklch(0.95 0.01 240)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Google Reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "White B.",
                  rating: 5,
                  text: "The team was punctual and did an incredible job. They didn't just do the basics; they scrubbed the shower until it sparkled and even folded the towels beautifully. Awesome services!",
                  date: "2 months ago",
                },
                {
                  name: "Amila Samarakoon",
                  rating: 5,
                  text: "Recently had a great experience with Nexus Facility Group. The team is reliable and easy to deal with. They arrive on time and get the job done well. I would happily recommend Nexus Facility Group to anyone in Melbourne!",
                  date: "4 weeks ago",
                },
                {
                  name: "Marisa Orfanidis",
                  rating: 5,
                  text: "Excellent service and excellent work. Will definitely be used on a regular basis.",
                  date: "1 month ago",
                },
                {
                  name: "Casey M",
                  rating: 5,
                  text: "Very happy with the Nexus Facility Group team and the quality of cleaning. The house is sparkling! Friendly and welcoming service too. Thank you.",
                  date: "1 month ago",
                },
                {
                  name: "Julie West",
                  rating: 5,
                  text: "We hired Nexus to clean, strip and polish the floors of our clinic. They did great work and were very professional. I would definitely recommend them and will use them again in the future.",
                  date: "1 year ago",
                },
                {
                  name: "Grant Keenan",
                  rating: 5,
                  text: "I cannot praise the Nexus Facility Group and Vino enough. Vino was called to do a deep clean of my elderly mother's home and she worked carefully and compassionately to restore the house to its former clean state. Whether it's residential or commercial cleaning, you won't go wrong calling this team. Thank you Vino and team, we won't hesitate to call you next time we need your service.",
                  date: "1 year ago",
                },
                {
                  name: "janak kasun",
                  rating: 5,
                  text: "Good service highly recommended.",
                  date: "2 months ago",
                },
                {
                  name: "Magret Silva",
                  rating: 5,
                  text: "Highly recommend.",
                  date: "2 months ago",
                },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border"
                  style={{
                    background: "oklch(0.13 0.03 240)",
                    borderColor: "oklch(0.75 0.18 210 / 0.15)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold" style={{ color: "oklch(0.95 0.01 240)" }}>
                        {review.name}
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.72 0.05 230)" }}>
                        {review.date}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: "oklch(0.72 0.05 230)" }}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="p-12 rounded-lg text-center"
            style={{
              background: "oklch(0.13 0.03 240)",
              border: "1px solid oklch(0.75 0.18 210 / 0.15)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                color: "oklch(0.95 0.01 240)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              Ready to Experience the Nexus Difference?
            </h3>
            <p className="mb-6" style={{ color: "oklch(0.72 0.05 230)" }}>
              Join hundreds of satisfied customers across Melbourne who trust us with their cleaning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-bold text-sm uppercase tracking-wider"
                style={{
                  background: "oklch(0.62 0.22 230)",
                  color: "oklch(0.10 0.05 245)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                Get a Free Quote
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-bold text-sm uppercase tracking-wider border"
                style={{
                  borderColor: "oklch(0.62 0.22 230)",
                  color: "oklch(0.62 0.22 230)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
