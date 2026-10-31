"use client";

import { useEffect, useState, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // Smooth unhurried scroll helper
  const scrollToStep = (stepIndex: number) => {
    const targetStep = TOUR_STEPS[stepIndex];
    if (!targetStep) return;

    setIsScrolling(true);
    const el = document.getElementById(targetStep.id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  };

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

  const handleSkipTour = () => {
    sessionStorage.setItem("rbc_tour_seen", "true");
    setIsOpen(false);
    setHasStarted(false);
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollToStep(nextStep);
    } else {
      // Finished tour
      setIsOpen(false);
      setHasStarted(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollToStep(prevStep);
    }
  };

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
          className="fixed bottom-6 left-6 z-40 h-11 px-4 rounded-full bg-[#141312]/90 hover:bg-[#1c1a18] border border-accent/40 hover:border-accent text-accent shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:scale-105 group"
        >
          <Navigation size={14} className="text-accent group-hover:rotate-45 transition-transform duration-500" />
          <span className="hidden sm:inline text-[10.5px]">Guided Tour</span>
        </button>
      )}

      {/* State 1: Welcome & Name Prompt Modal */}
      {isOpen && !hasStarted && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#141312] border border-accent/40 p-7 sm:p-10 shadow-2xl rounded-none text-foreground flex flex-col">
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
                  className="w-full bg-[#0c0c0b] border border-border px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-[#0c0c0b] hover:bg-accent-light transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Start Guided Tour</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleSkipTour}
                  className="w-full sm:w-auto py-3.5 px-5 text-xs uppercase tracking-[0.2em] font-medium border border-border text-muted hover:border-white/30 hover:text-foreground transition-colors text-center"
                >
                  Skip Tour
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-muted font-light">
              <span>PRC Accredited Design-Build Firm</span>
              <span>San Fernando, Pampanga</span>
            </div>
          </div>
        </div>
      )}

      {/* State 2: Floating Tour Concierge Card (Active Walkthrough) */}
      {isOpen && hasStarted && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-[460px] z-[80] bg-[#121110]/95 backdrop-blur-2xl border border-accent/60 p-6 sm:p-7 shadow-2xl text-foreground animate-in slide-in-from-bottom-5 duration-300">
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-medium font-mono">
              {stepData.badge}
            </span>

            <button
              onClick={handleSkipTour}
              aria-label="End tour"
              className="text-[10px] uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors"
            >
              Skip Tour &times;
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/10 overflow-hidden mb-4">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step Title */}
          <h4 className="font-serif text-2xl text-foreground font-normal mb-2 leading-snug">
            {stepData.title}
          </h4>

          {/* Personalized Description */}
          <p className="text-xs sm:text-[13px] text-foreground/85 font-light leading-relaxed mb-4">
            {stepData.getDescription(displayName)}
          </p>

          {/* Action Hint */}
          <div className="p-2.5 bg-white/[0.03] border border-white/10 text-[11px] text-accent/90 font-light flex items-start gap-2 mb-5">
            <Sparkles size={13} className="text-accent shrink-0 mt-0.5" />
            <span>{stepData.actionHint}</span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || isScrolling}
              className="px-4 py-2 border border-border disabled:opacity-30 disabled:pointer-events-none hover:border-accent text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors flex items-center gap-1.5"
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
              className="px-5 py-2.5 bg-accent hover:bg-accent-light text-[#0c0c0b] text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 shadow-md"
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
