import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "wouter";

const STORAGE_KEY = "nexus_welcome_offer_seen";

const SLIDES = [
  {
    src: "/manus-storage/welcome_offer_home_exterior_6a8f7cc5.png",
    alt: "Nexus Facility Group home exterior cleaning bundle with window cleaning and driveway pressure washing",
    label: "Home exterior cleaning bundle",
  },
  {
    src: "/manus-storage/welcome_offer_childcare_48da7dbf.png",
    alt: "Nexus Facility Group childcare and school cleaning offer",
    label: "Childcare and school cleaning",
  },
  {
    src: "/manus-storage/welcome_offer_windows_adf867f5.png",
    alt: "Nexus Facility Group free window cleaning offer for new contracts",
    label: "Free window cleaning offer",
  },
] as const;

export default function WelcomeOfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const hasSeenOffer = window.sessionStorage.getItem(STORAGE_KEY) === "true";
    if (!hasSeenOffer) setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleDismiss();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrevious();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, activeSlide]);

  const handleDismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    setActiveSlide((current) => (current + 1) % SLIDES.length);
  };

  const handlePrevious = () => {
    setActiveSlide((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  if (!isOpen) return null;

  const slide = SLIDES[activeSlide];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleDismiss();
      }}
      style={{ background: "oklch(0.04 0.03 245 / 0.86)", backdropFilter: "blur(5px)" }}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-offer-title"
        style={{ background: "oklch(0.10 0.05 245)", border: "1px solid oklch(0.62 0.22 230 / 0.45)" }}
      >
        <div className="flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-6" style={{ borderColor: "oklch(0.62 0.22 230 / 0.2)" }}>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.62 0.22 230)" }}>
              Welcome offer
            </p>
            <h2 id="welcome-offer-title" className="mt-1 text-xl font-bold uppercase sm:text-2xl" style={{ color: "oklch(0.97 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Special cleaning offers from Nexus Facility Group
            </h2>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-full p-2 transition-colors hover:bg-white/10"
            aria-label="Close welcome offer"
            style={{ color: "oklch(0.82 0.04 230)" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative bg-white">
          <img
            src={slide.src}
            alt={slide.alt}
            className="block max-h-[62vh] w-full object-contain sm:max-h-[68vh]"
          />
          <button
            type="button"
            onClick={handlePrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition-transform hover:scale-105"
            aria-label="Previous welcome offer image"
            style={{ background: "oklch(0.10 0.05 245 / 0.88)", color: "oklch(0.97 0.01 240)" }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg transition-transform hover:scale-105"
            aria-label="Next welcome offer image"
            style={{ background: "oklch(0.10 0.05 245 / 0.88)", color: "oklch(0.97 0.01 240)" }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-label={`Image ${activeSlide + 1} of ${SLIDES.length}`}>
              {SLIDES.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className="h-2 rounded-full transition-all"
                  aria-label={`Show ${item.label}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  style={{ width: activeSlide === index ? "1.5rem" : "0.5rem", background: activeSlide === index ? "oklch(0.62 0.22 230)" : "oklch(0.62 0.22 230 / 0.35)" }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: "oklch(0.72 0.05 230)" }}>
              {slide.label}
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleDismiss}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10"
              style={{ color: "oklch(0.72 0.05 230)" }}
            >
              Continue browsing
            </button>
            <Link
              href="/offers"
              onClick={handleDismiss}
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-[1.02]"
              style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              View all offers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
