import { Link } from "wouter";

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.05 245)" }}>
      <section className="py-20">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Page Coming Soon
          </h1>
          <p style={{ color: "oklch(0.72 0.05 230)" }}>This page is being built</p>
          <Link href="/" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
