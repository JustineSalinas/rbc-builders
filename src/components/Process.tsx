"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Compass,
  HardHat,
  FileCheck,
  Landmark,
  Hammer,
  Paintbrush,
  Key,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  ArrowDown,
} from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import type { Journey3DHandle } from "./Journey3DCanvas";

// Dynamically load the 3D Journey Canvas with ssr: false
const Journey3DCanvas = dynamic(() => import("./Journey3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-[#ebe5da] text-muted text-xs font-mono gap-3 p-8">
      <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span>Loading 3D Architectural Journey...</span>
    </div>
  ),
});

interface StepData {
  num: string;
  phaseCode: string;
  name: string;
  duration: string;
  tagline: string;
  body: string;
  icon: typeof Compass;
  leadRole: string;
  deliverables: string[];
}

const JOURNEY_STEPS: StepData[] = [
  {
    num: "01",
    phaseCode: "Sheet 01 · Consultation",
    name: "Consultation",
    duration: "Weeks 1–2",
    tagline: "Understanding your vision, lifestyle, and design inspirations.",
    body: "We begin by understanding your family's spatial needs, daily routines, and aesthetic inspirations, establishing a transparent architectural framework tailored to your lot in Central Luzon.",
    icon: Compass,
    leadRole: "Principal Architect",
    deliverables: [
      "Client lifestyle & spatial requirements brief",
      "Lot orientation & topography feasibility report",
      "Target floor area & preliminary budget parameters",
    ],
  },
  {
    num: "02",
    phaseCode: "Sheet 02 · Site Visit",
    name: "Site visit & schematic",
    duration: "Weeks 3–4",
    tagline: "Lot boundary verification, prevailing winds, and solar exposure study.",
    body: "We conduct physical on-site surveys in Pampanga to evaluate elevation grades, natural cross-ventilation, and solar exposure, followed by initial conceptual floor plans and spatial volume sketches.",
    icon: Paintbrush,
    leadRole: "Site Surveyor",
    deliverables: [
      "Boundary relocation & elevation grade survey",
      "Solar path & natural cross-ventilation assessment",
      "Preliminary architectural schematic floor plans",
    ],
  },
  {
    num: "03",
    phaseCode: "Sheet 03 · Design Dev",
    name: "Design development",
    duration: "Weeks 5–7",
    tagline: "Refining spatial volumes, material textures, and photorealistic 3D elevations.",
    body: "We develop the approved schematic into an authentic architectural package: modern tropical facade, double-height living atrium, hand-laid travertine portal tower, and photorealistic 3D concept visualizations.",
    icon: Landmark,
    leadRole: "Senior 3D Visualizer",
    deliverables: [
      "Full 3D exterior daytime & nighttime architectural renders",
      "Curated tactile material specification palette boards",
      "Optimized structural transfer slabs & atrium layout",
    ],
  },
  {
    num: "04",
    phaseCode: "Sheet 04 · Plans & Permits",
    name: "Plans & permits",
    duration: "Weeks 8–11",
    tagline: "Signed and sealed blueprints, full municipal approvals, and bank BOQ.",
    body: "Signed and sealed architectural, structural, electrical, and sanitary blueprints by licensed PRC professionals, fully submitted and approved for all municipal building permits with zero delays.",
    icon: FileCheck,
    leadRole: "Engineering Team",
    deliverables: [
      "Structural calculations prepared for permit submission",
      "Complete technical MEP working construction blueprints",
      "Official municipal Building Permit release & clearances",
    ],
  },
  {
    num: "05",
    phaseCode: "Sheet 05 · Groundbreaking",
    name: "Groundbreaking",
    duration: "Months 3–4",
    tagline: "The first faithful step on site, with the family who dared to dream.",
    body: "Site clearing, layout staking, and heavy excavation. We pour reinforced concrete footings, tie beams, and slab-on-grade with certified ready-mix concrete rigorously tested for compressive strength.",
    icon: HardHat,
    leadRole: "Project Engineer",
    deliverables: [
      "Groundbreaking ceremony & site mobilization",
      "Excavation & soil treatment termite barrier",
      "Rebar cage installation & footing pour",
    ],
  },
  {
    num: "06",
    phaseCode: "Sheet 06 · Construction",
    name: "Construction",
    duration: "Months 5–8",
    tagline: "Structural integrity first. Transparency always. Progress reports at every stage.",
    body: "Structural concrete framing rises, followed by hand-laid travertine stone cladding, acoustic timber louver screens, floor-to-ceiling glass fenestration, and the signature cantilevered upper box.",
    icon: Hammer,
    leadRole: "Construction Manager",
    deliverables: [
      "Reinforced concrete columns, beams & 2F transfer slab",
      "Hand-laid travertine stone portal & continuous timber soffits",
      "Floor-to-ceiling sliding glass fenestration & timber louvers",
    ],
  },
  {
    num: "07",
    phaseCode: "Sheet 07 · Turnover",
    name: "Turnover",
    duration: "Months 9–10",
    tagline: "A dream built for a family. A home standing proud.",
    body: "Twilight falls on your finished residence. Architectural cove lighting illuminates, the reflection pool turns turquoise, and we hand over the keys with full warranties and municipal occupancy.",
    icon: Key,
    leadRole: "Turnover Director",
    deliverables: [
      "Zero-defect multi-point quality assurance punch listing",
      "Final walkthrough & punch list resolution",
      "Turnkey keys handover & municipal Certificate of Occupancy",
    ],
  },
];

export default function Process() {
  const sectionRef = useReveal<HTMLElement>();
  const pinTrackRef = useRef<HTMLDivElement | null>(null);
  const journeyEngineRef = useRef<Journey3DHandle | null>(null);

  // Direct DOM refs to avoid React re-renders per scroll tick
  const phaseLabelRef = useRef<HTMLSpanElement | null>(null);
  const stepProgressBarRef = useRef<HTMLDivElement | null>(null);
  const stepProgressTextRef = useRef<HTMLSpanElement | null>(null);
  const stampRef = useRef<HTMLDivElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const scrollGuidanceRef = useRef<HTMLSpanElement | null>(null);

  // Active step state (only updates when crossing stage thresholds: 7 times total)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStepIdxRef = useRef<number>(0);

  // Stable callback for 3D engine instance to prevent unnecessary unmounts/re-renders
  const handleCanvasInit = useCallback((engine: Journey3DHandle) => {
    journeyEngineRef.current = engine;
  }, []);

  // Zero-layout-thrashing 60-120fps scroll tracking
  useEffect(() => {
    let trackTop = 0;
    let trackHeight = 0;

    const getLenis = () =>
      (window as unknown as { __lenis?: { resize: () => void } }).__lenis;

    const measureTrack = () => {
      if (!pinTrackRef.current) return;
      const rect = pinTrackRef.current.getBoundingClientRect();
      trackTop = window.scrollY + rect.top;
      trackHeight = rect.height;
      // Lenis caches its own scroll ceiling from whatever the document
      // height was when it last measured. If layout shifts after that
      // (web fonts swapping, this lazy-loaded canvas mounting, images
      // loading in later sections) without telling Lenis to resize, its
      // real scroll ceiling can end up shorter than what this component
      // expects — the progress math then has no way to reach 100%
      // because the user physically can't scroll that far.
      getLenis()?.resize();
    };

    measureTrack();
    const t1 = setTimeout(measureTrack, 250);
    const t2 = setTimeout(measureTrack, 800);
    const t3 = setTimeout(measureTrack, 2000);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(measureTrack);
    }
    window.addEventListener("load", measureTrack);

    const onScroll = () => {
      if (!trackHeight) measureTrack();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = trackHeight - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolledPast = window.scrollY - trackTop;
      const rawProgress = Math.min(Math.max(scrolledPast / totalScrollableDistance, 0), 1);

      // Continuous 3D journey progress (0.0 to 7.0)
      const p3D = rawProgress * 7.0;

      // 1. Direct WebGL Engine Update (Zero latency, instant response)
      journeyEngineRef.current?.setProgress(p3D);

      const activeIdx = Math.min(Math.floor(p3D), 6);

      // 2. Direct DOM Overlay Updates (Zero React re-render)
      if (phaseLabelRef.current) {
        phaseLabelRef.current.textContent = JOURNEY_STEPS[activeIdx].phaseCode;
      }
      if (stepProgressBarRef.current) {
        stepProgressBarRef.current.style.width = `${Math.round(rawProgress * 100)}%`;
      }
      if (stepProgressTextRef.current) {
        stepProgressTextRef.current.textContent = `${Math.round(rawProgress * 100)}% Complete`;
      }

      // Stamp overlay (Step 04)
      if (stampRef.current) {
        const showStamp = p3D >= 3.15 && p3D <= 4.85;
        stampRef.current.style.opacity = showStamp ? "1" : "0";
        stampRef.current.style.transform = showStamp
          ? "scale(1) rotate(-12deg)"
          : "scale(0.85) rotate(-20deg)";
        stampRef.current.style.pointerEvents = showStamp ? "auto" : "none";
      }

      // Finale overlay (Step 07)
      if (finaleRef.current) {
        const showFinale = p3D >= 6.35;
        finaleRef.current.style.opacity = showFinale ? "1" : "0";
        finaleRef.current.style.transform = showFinale
          ? "translateY(0)"
          : "translateY(-12px)";
      }

      // Scroll guidance text
      if (scrollGuidanceRef.current) {
        scrollGuidanceRef.current.textContent =
          rawProgress < 0.95
            ? "Scroll to build villa in place ↓"
            : "Residence standing proud! Scroll down to continue ↓";
      }

      // 3. React State ONLY updates when crossing boundary (maximum 7 times total)
      if (activeIdx !== currentStepIdxRef.current) {
        currentStepIdxRef.current = activeIdx;
        setActiveStepIndex(activeIdx);
      }
    };

    // Lenis fires its own 'scroll' event once per rAF tick with precise
    // float values. The native browser 'scroll' event gets throttled/
    // coalesced by the browser when it's driven by Lenis's programmatic
    // scrollTo() calls, so subscribing to Lenis directly (when present)
    // is what keeps this in lockstep with the smooth-scroll motion
    // instead of visibly stepping during fast or inertial scrolling.
    type LenisLike = { on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void };
    let usingLenis: LenisLike | null = null;

    const onResize = () => {
      measureTrack();
      onScroll();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // SmoothScroll's effect (an ancestor) sets window.__lenis, but React
    // runs child effects before parent effects on mount, so it may not
    // exist yet on this tick. Defer one frame to pick it up reliably and
    // switch from the native listener to Lenis's precise one.
    const attachLenis = requestAnimationFrame(() => {
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis) {
        window.removeEventListener("scroll", onScroll);
        lenis.on("scroll", onScroll);
        usingLenis = lenis;
      }
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", measureTrack);
      cancelAnimationFrame(attachLenis);
      if (usingLenis) {
        usingLenis.off("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Smooth jump to step (scrolls pinned track directly to sweet-spot)
  const jumpToStep = useCallback((stepIndex: number) => {
    if (!pinTrackRef.current) return;
    const rect = pinTrackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const viewportHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - viewportHeight;

    const stepFractions = [0.05, 0.20, 0.35, 0.50, 0.65, 0.80, 0.95];
    const targetScrollY = trackTop + stepFractions[stepIndex] * totalScrollableDistance;

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: Record<string, unknown>) => void };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.0 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  }, []);

  const nextStep = useCallback(() => {
    const nextIdx = (activeStepIndex + 1) % JOURNEY_STEPS.length;
    jumpToStep(nextIdx);
  }, [activeStepIndex, jumpToStep]);

  const prevStep = useCallback(() => {
    const prevIdx = activeStepIndex > 0 ? activeStepIndex - 1 : JOURNEY_STEPS.length - 1;
    jumpToStep(prevIdx);
  }, [activeStepIndex, jumpToStep]);

  const skipPastJourney = useCallback(() => {
    if (!pinTrackRef.current) return;
    const rect = pinTrackRef.current.getBoundingClientRect();
    const targetScrollY = window.scrollY + rect.bottom + 20;

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: Record<string, unknown>) => void };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  }, []);

  const activeStep = JOURNEY_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bg-background relative border-t border-border"
    >
      {/* Anchor aliases for backward compatibility */}
      <div id="process" className="sr-only" />
      <div id="methodology" className="sr-only" />

      {/* ============================================================== */}
      {/* PINNED IN-PLACE SCROLL TRACK CONTAINER (Calibrated 340vh)       */}
      {/* Stops user first: scrolling in place builds villa 01 till 07   */}
      {/* Once complete at 07, section releases to scroll down naturally */}
      {/* ============================================================== */}
      <div ref={pinTrackRef} className="relative h-[340vh]">
        {/* Sticky Viewport Stage: Pinned on Screen with 100dvh for mobile address bar safety */}
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-background px-3 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-2 sm:pb-3 z-20">
          <div className="mx-auto max-w-7xl w-full flex flex-col h-full justify-between min-h-0">
            {/* Top Bar: Section Title, Progress Track & 01-07 Steps Pill Bar */}
            <div className="shrink-0 mb-1.5 sm:mb-2">
              <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] font-medium font-mono">
                    <Compass size={10} />
                    <span>Our journey with you</span>
                  </div>
                  <h2 className="font-serif text-base sm:text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight truncate mt-0.5">
                    From our first meeting to{" "}
                    <em className="font-serif italic font-normal text-accent">
                      a home standing proud.
                    </em>
                  </h2>
                </div>

                {/* Progress Indicator & Skip Action */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-surface px-2.5 sm:px-3 py-1 rounded-2xl border border-border shadow-2xs">
                    <div className="flex flex-col text-right">
                      <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-muted font-mono hidden xs:inline">
                        Progress
                      </span>
                      <span
                        ref={stepProgressTextRef}
                        className="font-mono text-[11px] sm:text-xs font-semibold text-accent"
                      >
                        0% Complete
                      </span>
                    </div>
                    <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-border/80 rounded-full overflow-hidden">
                      <div
                        ref={stepProgressBarRef}
                        className="h-full bg-accent transition-all duration-150 rounded-full"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={skipPastJourney}
                    aria-label="Skip Journey"
                    className="inline-flex items-center gap-1 text-[8.5px] sm:text-[9px] uppercase tracking-wider font-mono px-2 sm:px-2.5 py-1 rounded-full border border-border text-muted hover:text-accent hover:border-accent bg-surface transition-colors cursor-pointer"
                  >
                    <span>Skip</span>
                    <ArrowDown size={9} />
                  </button>
                </div>
              </div>

              {/* 01 till 07 Step Selection Pills: Touch-friendly swipeable carousel on mobile, clean grid on desktop */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 lg:grid lg:grid-cols-7 lg:gap-2 lg:overflow-visible lg:pb-0">
                {JOURNEY_STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => jumpToStep(idx)}
                      className={`text-left p-1.5 sm:p-2 rounded-xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between shrink-0 min-w-[76px] lg:min-w-0 lg:shrink ${
                        isActive
                          ? "bg-surface border-accent shadow-sm ring-1 ring-accent"
                          : "bg-surface/50 border-border hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold">
                          {step.num}
                        </span>
                        <span className="text-[8px] sm:text-[9.5px] uppercase tracking-wider text-foreground font-medium truncate">
                          {step.name}
                        </span>
                      </div>

                      <div className="w-full bg-border/60 h-0.5 sm:h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isActive ? "bg-accent" : "bg-transparent"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Row: Side-by-Side on Desktop (lg), Clean Proportioned Stack on Mobile */}
            <div className="flex-1 min-h-0 w-full my-1 flex flex-col lg:grid lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-4 items-stretch">
              {/* 3D Architectural Villa Model Stage (Generous mobile height, never squashed) */}
              <div
                style={{ touchAction: "pan-y" }}
                className="w-full h-[200px] xs:h-[225px] sm:h-[270px] lg:h-full lg:col-span-7 xl:col-span-7 relative rounded-2xl sm:rounded-3xl bg-[#ebe5da] border border-border shadow-xl overflow-hidden flex flex-col shrink-0"
              >
                <Journey3DCanvas
                  onInit={handleCanvasInit}
                />

                {/* Top-Left Sheet Phase Indicator */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 pointer-events-none z-10 flex flex-col gap-1 max-w-[240px] sm:max-w-xs">
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-black/5 shadow-xs">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent animate-pulse" />
                    <span
                      ref={phaseLabelRef}
                      className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-mono text-accent font-bold truncate"
                    >
                      Sheet 01 · Consultation
                    </span>
                  </div>
                </div>

                {/* Signed & Sealed Architectural Stamp (Step 04) */}
                <div
                  ref={stampRef}
                  style={{ opacity: 0, transform: "scale(0.85) rotate(-20deg)" }}
                  className="absolute right-3 bottom-3 sm:right-5 sm:bottom-5 z-20 pointer-events-none select-none transition-all duration-300 ease-out"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 sm:border-4 border-double border-[#9b2f24] text-[#9b2f24] flex flex-col items-center justify-center text-center p-1.5 sm:p-2 bg-radial from-[#9b2f24]/10 to-transparent shadow-lg backdrop-blur-2xs">
                    <span className="text-[5.5px] sm:text-[6.5px] uppercase tracking-[0.2em] font-mono font-bold">
                      Permits
                    </span>
                    <span className="font-serif text-[9px] sm:text-xs font-semibold tracking-wide my-0.5">
                      Approved
                    </span>
                    <span className="text-[5px] sm:text-[6px] uppercase tracking-[0.16em] font-mono font-bold">
                      RBC Builders &middot; 2026
                    </span>
                    <span className="text-[4.5px] sm:text-[5.5px] text-[#9b2f24]/80 tracking-widest mt-0.5">
                      San Fernando, Pampanga
                    </span>
                  </div>
                </div>

                {/* Finale Landing Banner (Step 07 Turnover) - Positioned at top-center so NO overlap with bottom buttons */}
                <div
                  ref={finaleRef}
                  style={{ opacity: 0, transform: "translateY(-12px)" }}
                  className="absolute top-10 sm:top-14 inset-x-0 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4 transition-all duration-500 ease-out"
                >
                  <div className="bg-black/70 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-amber-300/30 shadow-xl">
                    <span className="font-serif italic text-sm sm:text-xl text-amber-200 block drop-shadow-sm">
                      This is RBC Builders.
                    </span>
                    <span className="text-[8.5px] sm:text-[11px] uppercase tracking-[0.22em] text-white/95 font-mono block mt-0.5">
                      A dream built for a family. A home standing proud.
                    </span>
                  </div>
                </div>

                {/* Bottom-Left Interaction Hint */}
                <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10 hidden sm:flex items-center gap-1.5 text-muted text-[8.5px] sm:text-[9.5px] font-mono bg-white/85 px-2.5 sm:px-3 py-1 rounded-full border border-border backdrop-blur-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span ref={scrollGuidanceRef}>
                    Scroll down to build villa in place ↓
                  </span>
                </div>

                {/* Bottom-Right Step Quick Navigation Arrows */}
                <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1 bg-white/90 p-0.5 sm:p-1 rounded-full border border-border shadow-xs backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={prevStep}
                    aria-label="Previous Stage"
                    className="p-1 sm:p-1.5 rounded-full hover:bg-accent/15 text-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={11} />
                  </button>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono text-muted px-1 font-semibold">
                    0{activeStepIndex + 1} / 07
                  </span>
                  <button
                    type="button"
                    onClick={nextStep}
                    aria-label="Next Stage"
                    className="p-1 sm:p-1.5 rounded-full hover:bg-accent/15 text-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>

              {/* Live Step Dossier: Fully Fitted, Zero Cramping, Fits inside 100dvh without internal scrollbar */}
              <div className="w-full flex-1 min-h-0 lg:col-span-5 xl:col-span-5 relative rounded-2xl sm:rounded-3xl bg-surface/95 backdrop-blur-md border border-border shadow-xl p-3 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden">
                {/* Header: Step Number, Duration & Title */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                        Phase {activeStep.num}
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono text-muted">
                        Stage {activeStepIndex + 1} of 07
                      </span>
                    </div>

                    <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium">
                      {activeStep.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                    <StepIcon size={16} className="text-accent shrink-0 sm:w-5 sm:h-5" />
                    <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-foreground font-normal tracking-tight truncate">
                      {activeStep.name}
                    </h3>
                  </div>

                  <p className="font-serif italic text-[11px] sm:text-xs text-accent/90 font-light mt-0.5 truncate">
                    &ldquo;{activeStep.tagline}&rdquo;
                  </p>

                  <p className="text-[10px] sm:text-[11.5px] text-foreground/75 font-light leading-relaxed mt-1 line-clamp-2 sm:line-clamp-3">
                    {activeStep.body}
                  </p>
                </div>

                {/* Deliverables Checklist (Compact, clean, zero blank voids) */}
                <div className="my-1 sm:my-2 p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80">
                  <span className="text-[8px] sm:text-[8.5px] uppercase tracking-widest font-mono text-accent font-semibold mb-1 block">
                    Deliverables:
                  </span>
                  <div className="space-y-1">
                    {activeStep.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-1.5 text-[9.5px] sm:text-[10.5px] text-foreground/85">
                        <CheckCircle2
                          size={11}
                          className="shrink-0 mt-0.5 text-accent sm:w-3 sm:h-3"
                        />
                        <span className="leading-tight font-light truncate sm:whitespace-normal">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Oversight */}
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted font-mono mb-1.5">
                  <UserCheck size={11} className="text-accent shrink-0" />
                  <span className="truncate">
                    <strong>Lead:</strong> {activeStep.leadRole}
                  </span>
                </div>

                {/* Direct Step Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2 pt-1 border-t border-border/60">
                  <a
                    href="#contact"
                    className="flex-1 btn btn--accent rounded-full py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] shadow-xs flex items-center justify-center gap-1.5 font-medium"
                  >
                    <span>Consultation</span>
                    <ArrowRight size={10} />
                  </a>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.16em] border border-border text-foreground hover:border-accent hover:text-accent bg-background transition-all cursor-pointer font-medium"
                  >
                    <span>
                      {activeStepIndex === 6 ? "01" : `0${activeStepIndex + 2}`}
                    </span>
                    <ArrowRight size={9} className="text-accent" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Live Status & Municipal Footnote */}
            <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] text-muted font-mono pt-1 shrink-0">
              <span className="text-accent font-semibold uppercase tracking-wider truncate">
                Step 0{activeStepIndex + 1} / 07 &middot; {activeStep.name}
              </span>
              <span className="hidden sm:inline">
                San Fernando, Pampanga &middot; Design-Build Practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
