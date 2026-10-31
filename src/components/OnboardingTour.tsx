"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Navigation } from "lucide-react";

type TourStep = {
  id: string;
  badge: string;
  title: string;
  getDescription: (name: string) => string;
  actionHint: string;
};

const TOUR_STEPS: TourStep[] = [
  {
    id: "top",
    badge: "01 / 10 · Executive Positioning",
    title: "Architecture with Permanence",
    getDescription: (name) =>
      `Welcome to RBC Builders, ${name}. Here is our master architectural positioning and PRC-accredited credentials across Central Luzon. Explore our signature residential slideshow and key built metrics.`,
    actionHint: "Inspect the slideshow controls and built square meters delivered.",
  },
  {
    id: "about",
    badge: "02 / 10 · Firm Philosophy",
    title: "The Design-Build Practice",
    getDescription: (name) =>
      `Here, ${name}, we detail our unified design-build accountability: eliminating contractor friction by housing architectural blueprints, civil engineering, and general contracting under a single 15-year warranty.`,
    actionHint: "Review our 4 architectural pillars: cost engineering, seismic rigor, and authentic finishes.",
  },
  {
    id: "services",
    badge: "03 / 10 · Capabilities Matrix",
    title: "Four Core Services",
    getDescription: (name) =>
      `${name}, we provide single-source execution across 4 distinct disciplines: Architectural Planning, Turnkey General Contracting, LGU Building Permits, and Bank Loan Financing.`,
    actionHint: "Tap through the four service tabs to inspect itemized deliverable lists.",
  },
  {
    id: "projects",
    badge: "04 / 10 · Realized Portfolio",
    title: "Completed Luxury Estates",
    getDescription: (name) =>
      `Here is our monograph of 12 realized private residences, ${name}. You can click any villa card to inspect full structural specifications and room allocations.`,
    actionHint: "Filter by Custom Modern Villas, Estates, or Turnkey Interiors, and click to view full monograph specs.",
  },
  {
    id: "transformation",
    badge: "05 / 10 · Site Transformation",
    title: "Groundwork to Turnkey Permanence",
    getDescription: (name) =>
      `Witness our construction integrity, ${name}. Use the interactive before-and-after slider to compare raw structural groundwork with the completed residence handover.`,
    actionHint: "Drag the slider left and right or use your keyboard arrow keys.",
  },
  {
    id: "pricing",
    badge: "06 / 10 · Investment Framework",
    title: "Pricing & Build Rates Estimator",
    getDescription: (name) =>
      `Transparent per-square-meter construction rates across 4 finish standards, ${name}. Use our interactive floor area slider to estimate your project budget in Central Luzon.`,
    actionHint: "Slide the floor area from 100 m² to 600 m² and select your project municipality.",
  },
  {
    id: "process",
    badge: "07 / 10 · Construction Roadmap",
    title: "Two-Stage 7-Phase Journey",
    getDescription: (name) =>
      `Here is our two-stage methodology, ${name}: divided into Pre-Construction Permitting (Weeks 1–11) and Structural Execution & Turnover (Months 3–10) with zero hidden delays.`,
    actionHint: "Click any phase card to review verified engineering deliverables and quality checklists.",
  },
  {
    id: "testimonials",
    badge: "08 / 10 · Homeowner Endorsements",
    title: "Reputation Built on Concrete",
    getDescription: (name) =>
      `Read authentic testimonials from estate owners and fellow professionals who built their homes with RBC Builders, ${name}.`,
    actionHint: "Browse the endorsement carousel and review our 15-year structural warranty badge.",
  },
  {
    id: "contact",
    badge: "09 / 10 · Commission An Estate",
    title: "Private Consultation & Brief",
    getDescription: (name) =>
      `Ready to build your bespoke residence, ${name}? Complete our 5-step interactive project brief or connect directly with our chief architects via direct phone and official email.`,
    actionHint: "Use the guided brief wizard or submit a direct inquiry form.",
  },
  {
    id: "footer",
    badge: "10 / 10 · Regional Footprint",
    title: "Headquarters & Territories",
    getDescription: (name) =>
      `Our expanded operations directory: real-time Manila PST clock, Central Luzon coverage across 5 provinces, and direct Facebook hotline. Thank you for touring RBC Builders, ${name}!`,
    actionHint: "Explore our active service regions or scroll back to top.",
  },
];

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [boxRect, setBoxRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Helper to retrieve the prominent inner container or fallback to section
  const getTargetContentEl = (stepId: string): HTMLElement | null => {
    const targetEl = document.getElementById(stepId);
    if (!targetEl) return null;
    if (stepId === "footer") {
      const maxWContainers = targetEl.querySelectorAll(".max-w-7xl");
      return (maxWContainers[1] as HTMLElement) || (maxWContainers[0] as HTMLElement) || targetEl;
    }
    return (targetEl.querySelector(".max-w-7xl") as HTMLElement) || targetEl;
  };

  // Smooth unhurried scroll helper
  const scrollToStep = useCallback((stepIndex: number) => {
    const targetStep = TOUR_STEPS[stepIndex];
    if (!targetStep) return;

    setIsScrolling(true);
    const contentEl = getTargetContentEl(targetStep.id);
    if (contentEl) {
      const topOffset = contentEl.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  }, []);

  const handleSkipTour = useCallback(() => {
    sessionStorage.setItem("rbc_tour_seen", "true");
    setIsOpen(false);
    setHasStarted(false);
    setBoxRect(null);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollToStep(nextStep);
    } else {
      // Finished tour
      setIsOpen(false);
      setHasStarted(false);
      setBoxRect(null);
    }
  }, [currentStep, scrollToStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollToStep(prevStep);
    }
  }, [currentStep, scrollToStep]);

  const handleStartTour = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || "Distinguished Guest";
    setName(finalName);
    localStorage.setItem("rbc_viewer_name", finalName);
    sessionStorage.setItem("rbc_tour_seen", "true");
    setHasStarted(true);
    setCurrentStep(0);
    scrollToStep(0);
  };

  // Check if tour should prompt on initial mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem("rbc_viewer_name");
      const hasSeenTour = sessionStorage.getItem("rbc_tour_seen");
      const timer = setTimeout(() => {
        if (savedName) setName(savedName);
        if (!hasSeenTour) {
          setIsOpen(true);
        }
      }, 700);
      return () => clearTimeout(timer);
    } catch {
      // ignore storage access restrictions
    }
  }, []);

  // Recalculate highlighted box bounds when step changes or window resizes
  useEffect(() => {
    if (!isOpen || !hasStarted) {
      return;
    }

    const updateRect = () => {
      const step = TOUR_STEPS[currentStep];
      if (!step) return;
      const contentEl = getTargetContentEl(step.id);
      if (!contentEl) return;

      const rect = contentEl.getBoundingClientRect();
      const pad = window.innerWidth < 640 ? 10 : 20;

      setBoxRect({
        top: Math.round(rect.top + window.scrollY - pad),
        left: Math.round(Math.max(6, rect.left + window.scrollX - pad)),
        width: Math.round(Math.min(window.innerWidth - 12, rect.width + pad * 2)),
        height: Math.round(rect.height + pad * 2),
      });
    };

    // Immediate calculation + settling updates after scroll animation finishes
    const timer1 = setTimeout(updateRect, 100);
    const timer2 = setTimeout(updateRect, 950);

    window.addEventListener("resize", updateRect);

    // Observe size changes of target element (e.g. tab switches, filters)
    const step = TOUR_STEPS[currentStep];
    const contentEl = step ? getTargetContentEl(step.id) : null;
    let observer: ResizeObserver | null = null;
    if (contentEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        updateRect();
      });
      observer.observe(contentEl);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateRect);
      if (observer) observer.disconnect();
    };
  }, [isOpen, hasStarted, currentStep]);

  // Keyboard navigation support (ArrowRight, ArrowLeft, Escape)
  useEffect(() => {
    if (!isOpen || !hasStarted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleSkipTour();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasStarted, handleNext, handlePrev, handleSkipTour]);

  const stepData = TOUR_STEPS[currentStep];
  const displayName = name.trim() || "Distinguished Guest";

  return (
    <>
      {/* Re-Open Tour Floating Trigger Button (Bottom-Left) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasStarted(false);
          }}
          aria-label="Start Guided Architectural Tour"
          title="Start Guided Architectural Tour"
          className="fixed bottom-6 left-6 z-40 h-11 px-4 rounded-full bg-white/95 hover:bg-white border border-accent/50 hover:border-accent text-accent shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:scale-105 group"
        >
          <Navigation size={14} className="text-accent group-hover:rotate-45 transition-transform duration-500" />
          <span className="hidden sm:inline text-[10.5px]">Guided Tour</span>
        </button>
      )}

      {/* State 1: Welcome & Name Prompt Modal */}
      {isOpen && !hasStarted && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-white border border-accent/50 p-7 sm:p-10 shadow-2xl rounded-none text-foreground flex flex-col">
            {/* Close / Skip button */}
            <button
              onClick={handleSkipTour}
              aria-label="Skip architectural tour"
              className="absolute top-5 right-5 text-muted hover:text-foreground p-1 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Emblem & Accent Badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative h-9 w-9 rounded-full overflow-hidden border border-accent/50 shrink-0">
                <Image src="/images/logo.jpg" alt="RBC Builders" fill className="object-cover" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
                Architectural Guided Tour
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-light text-foreground mb-3 leading-tight">
              Welcome to RBC Builders
            </h3>

            <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed mb-6">
              Allow us to guide you through our turnkey design-build practice from foundational blueprints and cost engineering down to completed estates.
            </p>

            {/* Name Input Form */}
            <form onSubmit={handleStartTour} className="space-y-5">
              <div>
                <label htmlFor="viewer-name-input" className="block text-[11px] uppercase tracking-[0.18em] text-muted mb-2 font-medium">
                  May we know your name or title?
                </label>
                <input
                  id="viewer-name-input"
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arch. Justine, Engr. Santos, Dr. Garcia..."
                  autoFocus
                  className="w-full bg-[#fbfaf8] border border-border px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-white hover:bg-accent-dim transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Start Guided Tour</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleSkipTour}
                  className="w-full sm:w-auto py-3.5 px-5 text-xs uppercase tracking-[0.2em] font-medium border border-border text-muted hover:border-accent hover:text-accent transition-colors text-center"
                >
                  Skip Tour
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted font-light">
              <span>PRC Accredited Design-Build Firm</span>
              <span>San Fernando, Pampanga</span>
            </div>
          </div>
        </div>
      )}

      {/* State 2A: Active Feature Highlighting Box */}
      {isOpen && hasStarted && boxRect && (
        <div
          aria-hidden="true"
          className="absolute z-40 pointer-events-none transition-all duration-700 ease-out"
          style={{
            top: `${boxRect.top}px`,
            left: `${boxRect.left}px`,
            width: `${boxRect.width}px`,
            height: `${boxRect.height}px`,
          }}
        >
          {/* Main Glowing Architectural Box Frame with Tamayo-Revisa theatrical spotlight */}
          <div
            className="relative w-full h-full rounded-sm"
            style={{
              boxShadow:
                "0 0 0 9999px rgba(18, 22, 28, 0.76), 0 0 0 2px #c8a483, 0 0 0 8px rgba(200, 164, 131, 0.22)",
            }}
          >
            {/* Architectural Crosshair Corners */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#c8a483]" />
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-[#c8a483]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-[#c8a483]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#c8a483]" />

            {/* Top Luminous Spotlight Badge */}
            <div className="absolute -top-4 left-4 sm:left-8 px-3.5 py-1 bg-[#1d232c] border border-[#c8a483] shadow-2xl flex items-center gap-2.5 rounded-full pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a483] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8a483]" />
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#c8a483] font-mono font-medium whitespace-nowrap">
                ✦ {stepData.title}
              </span>
            </div>

            {/* Bottom Technical Specification Tag */}
            <div className="hidden sm:flex absolute -bottom-3.5 right-6 sm:right-8 px-3 py-0.5 bg-[#1d232c] border border-[#c8a483]/60 text-[9px] font-mono text-[#c8a483] uppercase tracking-[0.2em] items-center gap-2 shadow-lg">
              <span>SECTION {currentStep + 1} OF {TOUR_STEPS.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* State 2B: Floating Tour Concierge Card (Active Walkthrough) */}
      {isOpen && hasStarted && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-[460px] z-[80] bg-[#faf9f6] border border-border/80 p-6 sm:p-7 rounded-[18px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] text-[#1d232c] animate-in slide-in-from-bottom-5 duration-300">
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8b6a4e] font-medium font-mono">
              {stepData.badge}
            </span>

            <button
              onClick={handleSkipTour}
              aria-label="End tour"
              className="text-[10.5px] uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors underline underline-offset-4"
            >
              Skip Tour
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-stone-200 overflow-hidden mb-4 rounded-full">
            <div
              className="h-full bg-[#8b6a4e] transition-all duration-500 rounded-full"
              style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step Title */}
          <h4 className="font-serif text-2xl text-[#1d232c] font-normal mb-2 leading-snug">
            {stepData.title}
          </h4>

          {/* Personalized Description */}
          <p className="text-xs sm:text-[13px] text-[#4b5260] font-light leading-relaxed mb-4">
            {stepData.getDescription(displayName)}
          </p>

          {/* Action Hint */}
          <div className="p-2.5 bg-[#8b6a4e]/5 border border-[#8b6a4e]/20 text-[11px] text-[#8b6a4e] font-medium flex items-start gap-2 mb-5 rounded-lg">
            <Sparkles size={13} className="text-[#8b6a4e] shrink-0 mt-0.5" />
            <span>{stepData.actionHint}</span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || isScrolling}
              className="px-4 py-2 border border-border disabled:opacity-30 disabled:pointer-events-none hover:border-[#8b6a4e] text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors flex items-center gap-1.5 rounded-full"
            >
              <ArrowLeft size={12} />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono text-muted/70">
              {currentStep + 1} / {TOUR_STEPS.length}
            </span>

            <button
              onClick={handleNext}
              disabled={isScrolling}
              className="px-5 py-2.5 bg-[#1d232c] hover:bg-[#47546e] text-white text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 shadow-md rounded-full"
            >
              <span>{currentStep === TOUR_STEPS.length - 1 ? "Finish Tour" : "Next Section"}</span>
              {currentStep === TOUR_STEPS.length - 1 ? <Check size={14} /> : <ArrowRight size={13} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
