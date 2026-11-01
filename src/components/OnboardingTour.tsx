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

// Steps whose target is position:fixed (always on screen regardless of
// scroll position): there's no sensible document position to scroll to,
// so these skip the scroll animation and just move the highlight.
const FIXED_STEP_IDS = new Set(["site-navbar", "chatbot-launcher"]);

const TOTAL_STEPS = 18;
const n = (i: number) => `${String(i).padStart(2, "0")} / ${TOTAL_STEPS}`;

// Walks every section top to bottom, in page order, with a dedicated
// stop for every distinct interactive sub-feature — nothing on the
// page is skipped.
const TOUR_STEPS: TourStep[] = [
  {
    id: "site-navbar",
    badge: n(1),
    title: "Navigate Anywhere",
    getDescription: (name) => `Hi ${name}. Jump to any section from this menu, anytime.`,
    actionHint: "",
  },
  {
    id: "top",
    badge: n(2),
    title: "Welcome, RBC Builders",
    getDescription: () => "A project slideshow, our key numbers, and ways to get started.",
    actionHint: "Browse the slideshow and stats.",
  },
  {
    id: "credentials",
    badge: n(3),
    title: "What We Handle",
    getDescription: () => "Planning, contracting, permits, financing, and progress reporting.",
    actionHint: "",
  },
  {
    id: "about",
    badge: n(4),
    title: "Design + Build, One Team",
    getDescription: () =>
      "Unified accountability, precise cost engineering, permit handling, and quality finishes.",
    actionHint: "",
  },
  {
    id: "services",
    badge: n(5),
    title: "Our Services",
    getDescription: () =>
      "Architectural planning, contracting, permits, bank financing assistance, and 3D rendering.",
    actionHint: "Tap a service to see details.",
  },
  {
    id: "services",
    badge: n(6),
    title: "3D Rendering Gallery",
    getDescription: () => "Photorealistic CGI renders from our visualization studio.",
    actionHint: "Click a thumbnail, or view the full set on Behance.",
  },
  {
    id: "projects",
    badge: n(7),
    title: "Completed Projects",
    getDescription: () => "A gallery of exteriors and interiors we've designed and built.",
    actionHint: "Filter by type, then click a project to see specs.",
  },
  {
    id: "transformation",
    badge: n(8),
    title: "Before & After",
    getDescription: () => "Compare the build at groundwork vs. handover, plus our build standards.",
    actionHint: "Drag the slider left or right.",
  },
  {
    id: "pricing",
    badge: n(9),
    title: "Finish Tiers & Specs",
    getDescription: () => "Per-square-meter rates across four finish tiers, itemized by category.",
    actionHint: "Tap a tier to see its full specification sheet.",
  },
  {
    id: "pricing",
    badge: n(10),
    title: "Compare All Tiers",
    getDescription: () => "Every category, side by side across all four tiers.",
    actionHint: "Toggle the comparison matrix open.",
  },
  {
    id: "pricing",
    badge: n(11),
    title: "Cost Estimator",
    getDescription: () => "Estimate your budget and timeline from floor area and location.",
    actionHint: "Slide the floor area to see your estimate update.",
  },
  {
    id: "journey",
    badge: n(12),
    title: "Our Build Process",
    getDescription: () => "Watch the home take shape in 3D, from first call to turnover.",
    actionHint: "Scroll to build, or tap a step to jump.",
  },
  {
    id: "testimonials",
    badge: n(13),
    title: "What Clients Say",
    getDescription: () => "Real feedback from the people we've built for.",
    actionHint: "",
  },
  {
    id: "contact-info",
    badge: n(14),
    title: "Headquarters & Map",
    getDescription: () => "Our office location, phone, and email, plus a live map.",
    actionHint: "",
  },
  {
    id: "contact-form",
    badge: n(15),
    title: "Send Your Project Brief",
    getDescription: (name) => `Ready, ${name}? Use the guided brief or a quick form.`,
    actionHint: "Both reach our team directly.",
  },
  {
    id: "footer-cta",
    badge: n(16),
    title: "Let's Build It Right",
    getDescription: () => "A direct line whenever you're ready to start.",
    actionHint: "",
  },
  {
    id: "footer-links",
    badge: n(17),
    title: "Service Areas & Socials",
    getDescription: () => "Every area we build in, our live local clock, and social links.",
    actionHint: "",
  },
  {
    id: "chatbot-launcher",
    badge: n(18),
    title: "Ask Us Anything",
    getDescription: (name) =>
      `That's everything, ${name}. Our chat assistant is always here if you have questions.`,
    actionHint: "",
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

  // Helper to retrieve the prominent inner container or fallback to section.
  // Sub-sections (footer's CTA vs. link columns, contact's info vs. form)
  // are marked with a data-tour attribute for precise targeting instead
  // of guessing by container order. Fixed-position elements (the navbar,
  // the chat launcher) are their own direct target — they have no inner
  // .max-w-7xl content wrapper to drill into.
  const getTargetContentEl = (stepId: string): HTMLElement | null => {
    if (stepId.startsWith("footer-") || stepId.startsWith("contact-")) {
      return document.querySelector<HTMLElement>(`[data-tour="${stepId}"]`);
    }
    if (FIXED_STEP_IDS.has(stepId)) {
      return document.getElementById(stepId);
    }
    const targetEl = document.getElementById(stepId);
    if (!targetEl) return null;
    return (targetEl.querySelector(".max-w-7xl") as HTMLElement) || targetEl;
  };

  // Slow, deliberate scroll to the next highlighted section. Uses Lenis
  // directly rather than native window.scrollTo(behavior:"smooth") —
  // Lenis is intercepting wheel/touch scroll globally, so a native
  // smooth-scroll call fights it and produces an abrupt snap instead of
  // one continuous glide. Touch devices get a longer duration: taps
  // land more easily than a mouse click, so without extra margin it's
  // easy to tap through steps faster than the glide (and the reader)
  // can keep up.
  const isTouchDevice = () =>
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const scrollDuration = () => (isTouchDevice() ? 1.9 : 1.5);

  const scrollToStep = useCallback((stepIndex: number) => {
    const targetStep = TOUR_STEPS[stepIndex];
    if (!targetStep) return;

    const duration = scrollDuration();

    // Fixed-position targets (navbar, chat launcher) are always on
    // screen no matter the scroll position — there's no document
    // position to scroll to, so just hold the current pacing for
    // reading/settling and move the highlight box in place.
    if (FIXED_STEP_IDS.has(targetStep.id)) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500);
      return;
    }

    setIsScrolling(true);
    const contentEl = getTargetContentEl(targetStep.id);
    if (contentEl) {
      const lenis = (window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: Record<string, unknown>) => void };
      }).__lenis;
      const topOffset = contentEl.getBoundingClientRect().top + window.scrollY - 100;
      const top = Math.max(0, topOffset);

      if (lenis) {
        lenis.scrollTo(top, { duration, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, duration * 1000 + 150);
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

  // Allow triggering the tour anytime via custom event
  useEffect(() => {
    const handleTriggerTour = () => {
      setIsOpen(true);
      setHasStarted(false);
      setCurrentStep(0);
    };
    window.addEventListener("rbc:open-tour", handleTriggerTour);
    return () => window.removeEventListener("rbc:open-tour", handleTriggerTour);
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

    // Track the highlight box during the glide instead of snapping once
    // at the end — keeps it visually glued to the section as the page
    // scrolls, matching the scroll duration (longer on touch devices).
    const raf = { id: 0 };
    const trackDuringScroll = () => {
      updateRect();
      raf.id = requestAnimationFrame(trackDuringScroll);
    };
    raf.id = requestAnimationFrame(trackDuringScroll);
    const stopTracking = setTimeout(() => {
      cancelAnimationFrame(raf.id);
      updateRect();
    }, scrollDuration() * 1000 + 150);

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
      cancelAnimationFrame(raf.id);
      clearTimeout(stopTracking);
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
              <span>Design-Build Firm</span>
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
        <div className="fixed bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:w-[420px] z-[80] bg-[#faf9f6] border border-border/80 p-6 sm:p-7 rounded-[20px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] text-[#1d232c] animate-in slide-in-from-bottom-5 duration-300">
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8b6a4e] font-medium font-mono whitespace-nowrap">
              {stepData.badge}
            </span>

            <button
              onClick={handleSkipTour}
              aria-label="End tour"
              className="shrink-0 text-[10.5px] uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors underline underline-offset-4 whitespace-nowrap"
            >
              Skip Tour
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-stone-200 overflow-hidden mb-5 rounded-full">
            <div
              className="h-full bg-[#8b6a4e] transition-all duration-500 rounded-full"
              style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step Title */}
          <h4 className="font-serif text-xl sm:text-2xl text-[#1d232c] font-normal mb-3 leading-snug">
            {stepData.title}
          </h4>

          {/* Personalized Description */}
          <p className="text-xs sm:text-[13px] text-[#4b5260] font-light leading-relaxed mb-5">
            {stepData.getDescription(displayName)}
          </p>

          {/* Action Hint */}
          {stepData.actionHint && (
            <div className="p-3 bg-[#8b6a4e]/5 border border-[#8b6a4e]/20 text-[11px] text-[#8b6a4e] font-medium flex items-start gap-2 mb-6 rounded-lg">
              <Sparkles size={13} className="text-[#8b6a4e] shrink-0 mt-0.5" />
              <span>{stepData.actionHint}</span>
            </div>
          )}

          {/* Navigation Controls — kept to one line at every width */}
          <div className="flex flex-nowrap items-center justify-between gap-2 pt-4 border-t border-border">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || isScrolling}
              className="shrink-0 whitespace-nowrap px-3.5 py-2 border border-border disabled:opacity-30 disabled:pointer-events-none hover:border-[#8b6a4e] text-[11px] sm:text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors flex items-center gap-1 rounded-full"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </button>

            <span className="shrink-0 whitespace-nowrap text-[11px] sm:text-xs font-mono text-muted/70">
              {currentStep + 1}/{TOUR_STEPS.length}
            </span>

            <button
              onClick={handleNext}
              disabled={isScrolling}
              className="shrink-0 whitespace-nowrap px-4 py-2 bg-[#1d232c] hover:bg-[#47546e] text-white text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 shadow-md rounded-full"
            >
              <span>{currentStep === TOUR_STEPS.length - 1 ? "Finish" : "Next"}</span>
              {currentStep === TOUR_STEPS.length - 1 ? <Check size={14} /> : <ArrowRight size={13} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
