import { ArrowRight, Calendar, User } from "lucide-react";
import { useNavigate } from "wouter";

export default function BlogPage() {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "5 Essential Tips for Spring Cleaning Your Home",
      excerpt: "Spring is the perfect time to refresh your home. Learn our top 5 professional cleaning tips to get your house sparkling clean.",
      date: "May 15, 2025",
      author: "Nexus Team",
      category: "Domestic Cleaning",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_domestic_v2-9YM3QtzCXTxaDCjvGcDqPr.webp",
    },
    {
      id: 2,
      title: "Commercial Cleaning Standards: What Every Business Should Know",
      excerpt: "Maintaining high cleaning standards is crucial for your business reputation. Discover what professional commercial cleaning includes.",
      date: "May 10, 2025",
      author: "Nexus Team",
      category: "Commercial Cleaning",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_commercial_v2-LpEKwd5ocUenUXBG94ayFW.webp",
    },
    {
      id: 3,
      title: "End of Lease Cleaning: Your Complete Bond-Back Guide",
      excerpt: "Moving out? Our comprehensive guide covers everything you need to know about end of lease cleaning to get your full bond back.",
      date: "May 5, 2025",
      author: "Nexus Team",
      category: "End of Lease",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_endoflease_v2-RqLXusXXq7ajrgp8J6rtfh.webp",
    },
    {
      id: 4,
      title: "How Often Should You Deep Clean Your Office?",
      excerpt: "Regular deep cleaning keeps your office healthy and productive. Learn the recommended frequency for different office types.",
      date: "April 28, 2025",
      author: "Nexus Team",
      category: "Commercial Cleaning",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_commercial_v2-LpEKwd5ocUenUXBG94ayFW.webp",
    },
    {
      id: 5,
      title: "Industrial Cleaning for Warehouses: Safety and Efficiency",
      excerpt: "Warehouse cleaning requires specialised knowledge. Explore how professional industrial cleaning improves safety and productivity.",
      date: "April 20, 2025",
      author: "Nexus Team",
      category: "Industrial Cleaning",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_commercial_v2-LpEKwd5ocUenUXBG94ayFW.webp",
    },
    {
      id: 6,
      title: "Steam Cleaning vs Traditional Methods: Which is Better?",
      excerpt: "Wondering about steam cleaning? Compare it with traditional methods to see which is best for your cleaning needs.",
      date: "April 15, 2025",
      author: "Nexus Team",
      category: "Cleaning Tips",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663396125342/LsnnQBd3D9ZpGUiGw6PBwg/svc_steam_v2-kfQhfbixzE66ExUjj9PURz.webp",
    },
  ];

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
            Cleaning Tips & <span style={{ color: "oklch(0.62 0.22 230)" }}>Insights</span>
          </h1>
          <p className="max-w-2xl text-base" style={{ color: "oklch(0.85 0.04 230)" }}>
            Expert advice, industry insights, and practical cleaning tips from the Nexus Facility Services team.
          </p>
        </div>
      </section>

      {/* ─── Blog Grid ─── */}
      <section className="py-20" style={{ background: "oklch(0.62 0.22 230 / 0.03)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col overflow-hidden group"
                style={{
                  border: "1px solid oklch(0.75 0.18 210 / 0.25)",
                  background: "oklch(0.27 0.11 245)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.62 0.22 230)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px oklch(0.75 0.18 210 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.75 0.18 210 / 0.25)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, oklch(0.27 0.11 245))" }}
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: "oklch(0.62 0.22 230)",
                      color: "oklch(0.20 0.10 245)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="mb-3 font-bold"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "white",
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm mb-4 flex-1" style={{ color: "oklch(0.82 0.05 230)" }}>
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "oklch(0.72 0.05 230)" }}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                    style={{
                      background: "oklch(0.62 0.22 230)",
                      color: "oklch(0.20 0.10 245)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter CTA ─── */}
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
            Get Cleaning Tips Delivered to Your Inbox
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: "oklch(0.10 0.05 245)" }}>
            Subscribe to our newsletter for expert cleaning advice, industry insights, and special offers.
          </p>
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
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
