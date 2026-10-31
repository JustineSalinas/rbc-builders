"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Compass, HardHat, FileCheck, Landmark, Hammer, Paintbrush, Key, CheckCircle2 } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import type { Journey3DHandle } from "./Journey3DCanvas";

// Dynamically load the 3D Journey Canvas with ssr: false
const Journey3DCanvas = dynamic(() => import("./Journey3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-[#ece6dc] text-muted text-xs font-mono gap-3 p-8">
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
  deliverables: string[];
}

const JOURNEY_STEPS: StepData[] = [
  {
    num: "01",
    phaseCode: "Sheet 01 · Consultation",
    name: "Consultation",
    duration: "Weeks 1–2",
    tagline: "Understanding your vision, lifestyle, and design inspirations.",
    body: "We begin by understanding your goals, lifestyle, and aesthetic inspirations, setting the tone for a personalized, transparent design-build process in Central Luzon.",
    icon: Compass,
    deliverables: [
      "Client lifestyle & spatial requirements brief",
      "Lot orientation & topography feasibility report",
      "Target floor area & budget parameter alignment",
    ],
  },
  {
    num: "02",
    phaseCode: "Sheet 02 · Site Visit & Schematic Design",
    name: "Site visit & schematic design",
    duration: "Weeks 3–4",
    tagline: "Lot boundary verification, prevailing winds, and solar exposure study.",
    body: "We assess the site’s orientation, views, and surroundings in Pampanga, then create initial layout options tailored to your lot dimensions and family preferences.",
    icon: Paintbrush,
    deliverables: [
      "Boundary relocation & elevation grade survey",
      "Solar path & natural cross-ventilation assessment",
      "Preliminary architectural schematic floor plan sketches",
    ],
  },
  {
    num: "03",
    phaseCode: "Sheet 03 · Design Development",
    name: "Design development",
    duration: "Weeks 5–7",
    tagline: "Refining spatial volumes, material textures, and photorealistic 3D elevations.",
    body: "We refine the layout into a full design package: modern facade, double-height living atrium, travertine portal tower, and photorealistic 3D concept visualizations for your approval.",
    icon: Landmark,
    deliverables: [
      "Full 3D exterior daytime & nighttime architectural renders",
      "Curated tactile material specification palette boards",
      "Optimized structural transfer slabs & staircase atrium layout",
    ],
  },
  {
    num: "04",
    phaseCode: "Sheet 04 · Plans & Permits",
    name: "Plans & permits",
    duration: "Weeks 8–11",
    tagline: "Signed and sealed blueprints, full municipal approvals, and bank BOQ.",
    body: "Signed and sealed architectural, structural, electrical, and sanitary blueprints by licensed PRC professionals, fully submitted and approved for all municipal building permits.",
    icon: FileCheck,
    deliverables: [
      "Seismic structural calculations signed by licensed Civil Engineers",
      "Complete technical MEP working blueprints",
      "Official municipal Building Permit release & clearances",
    ],
  },
  {
    num: "05",
    phaseCode: "Sheet 05 · Groundbreaking",
    name: "Groundbreaking",
    duration: "Months 3–4",
    tagline: "The first faithful step on site, with the family who dared to dream.",
    body: "Site clearing, layout staking, and heavy excavation. We pour reinforced concrete footings, tie beams, and slab-on-grade with certified ready-mix concrete tested for compressive strength.",
    icon: HardHat,
    deliverables: [
      "Groundbreaking ceremony & site mobilization",
      "Excavation & soil treatment termite barrier",
      "Grade 60 PNS rebar cage installation & monolithic footing pour",
    ],
  },
  {
    num: "06",
    phaseCode: "Sheet 06 · Construction",
    name: "Construction",
    duration: "Months 5–8",
    tagline: "Structural integrity first. Transparency always. Progress reports at every stage.",
    body: "Structural concrete framing rises, followed by natural travertine stone cladding, acoustic timber louver screens, floor-to-ceiling glass fenestration, and the iconic cantilever box.",
    icon: Hammer,
    deliverables: [
      "Reinforced concrete columns, beams & 2F transfer slab",
      "Hand-laid travertine stone portal tower & continuous timber soffits",
      "Floor-to-ceiling sliding glass fenestration & acoustic timber louvers",
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
    deliverables: [
      "Zero-defect multi-point quality assurance punch listing",
      "Official 15-Year Structural Warranty certificate",
      "Turnkey keys handover & municipal Certificate of Occupancy",
    ],
  },
];

export default function Process() {
  const sectionRef = useReveal<HTMLElement>();
  const stepsContainerRef = useRef<HTMLOListElement | null>(null);
  const journeyEngineRef = useRef<Journey3DHandle | null>(null);

  // Fast direct DOM refs to avoid 100+ React re-renders per second during scroll
  const phaseLabelRef = useRef<HTMLSpanElement | null>(null);
  const stepCounterRef = useRef<HTMLSpanElement | null>(null);
  const stampRef = useRef<HTMLDivElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);

  // Active step index state (only updates when crossing step boundary, max 7 times total!)
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStepIdxRef = useRef<number>(0);

  // High-performance scroll tracking: decoupled from React re-renders
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!stepsContainerRef.current) return;
      const stepItems = stepsContainerRef.current.querySelectorAll<HTMLElement>("[data-step-i]");
      if (stepItems.length === 0) return;

      const triggerLine = window.innerHeight * 0.52;
      let calculatedProgress = 0;

      for (let i = 0; i < stepItems.length; i++) {
        const rect = stepItems[i].getBoundingClientRect();
        if (rect.top <= triggerLine) {
          calculatedProgress = i + Math.min(Math.max((triggerLine - rect.top) / rect.height, 0), 1);
        }
      }

      const pClamped = Math.min(Math.max(calculatedProgress, 0), 7);

      // 1. Direct WebGL update: Zero React re-renders
      journeyEngineRef.current?.setProgress(pClamped);

      const activeIdx = Math.min(Math.floor(pClamped), 6);

      // 2. Direct DOM overlay updates: Zero React re-renders
      if (phaseLabelRef.current) {
        phaseLabelRef.current.textContent = JOURNEY_STEPS[activeIdx].phaseCode;
      }
      if (stepCounterRef.current) {
        stepCounterRef.current.textContent = `Step 0${activeIdx + 1} / 07 · ${JOURNEY_STEPS[activeIdx].name}`;
      }

      // Stamp overlay (Step 04)
      if (stampRef.current) {
        const showStamp = pClamped >= 3.35 && pClamped <= 4.85;
        stampRef.current.style.opacity = showStamp ? "1" : "0";
        stampRef.current.style.transform = showStamp
          ? "scale(1) rotate(-12deg)"
          : "scale(0.85) rotate(-20deg)";
        stampRef.current.style.pointerEvents = showStamp ? "auto" : "none";
      }

      // Finale overlay (Step 07)
      if (finaleRef.current) {
        const showFinale = pClamped >= 6.45;
        finaleRef.current.style.opacity = showFinale ? "1" : "0";
        finaleRef.current.style.transform = showFinale
          ? "translateY(0)"
          : "translateY(12px)";
      }

      // 3. React state ONLY updates when the step index actually changes (at most 7 times total!)
      if (activeIdx !== currentStepIdxRef.current) {
        currentStepIdxRef.current = activeIdx;
        setActiveStepIndex(activeIdx);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Smooth scroll directly to target step
  const scrollToStep = useCallback((index: number) => {
    if (!stepsContainerRef.current) return;
    const stepItems = stepsContainerRef.current.querySelectorAll<HTMLElement>("[data-step-i]");
    const targetItem = stepItems[index];
    if (!targetItem) return;

    const rect = targetItem.getBoundingClientRect();
    const triggerLine = window.innerHeight * 0.52;
    const targetScrollY = window.scrollY + rect.top - triggerLine + rect.height * 0.25;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-24 sm:py-32 px-4 sm:px-8 bg-background relative border-t border-border overflow-hidden"
    >
      {/* Anchor aliases for backward compatibility */}
      <div id="process" className="sr-only" />
      <div id="methodology" className="sr-only" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header: Styled after Tier One Architects Concept */}
        <div data-reveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] uppercase tracking-[0.25em] font-medium font-mono mb-3">
            <Compass size={12} />
            <span>Our journey with you</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
            From our first meeting to{" "}
            <em className="font-serif italic font-normal text-accent">
              a home standing proud.
            </em>
          </h2>
          <p className="text-sm sm:text-base text-foreground/75 font-light leading-relaxed mt-4 max-w-2xl">
            Seven deliberate phases. One licensed practice. Watch your villa evolve from a hand-drafted pencil blueprint into an illuminated luxury residence in San Fernando, Pampanga.
          </p>
        </div>

        {/* ── Two-Column Sticky Flow: 3D Canvas on Left + Interactive Steps on Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Left Column (Sticky 3D Architectural Model Viewport) */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-24 z-10">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl bg-[#ece6dc] border border-border shadow-2xl overflow-hidden group">
              {/* Three.js Engine Canvas */}
              <Journey3DCanvas
                onInit={(engine) => {
                  journeyEngineRef.current = engine;
                }}
              />

              {/* Top-Left Sheet Phase Indicator */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/10 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span
                    ref={phaseLabelRef}
                    className="text-[10px] uppercase tracking-widest font-mono text-accent font-bold"
                  >
                    Sheet 01 · Consultation
                  </span>
                </div>
              </div>

              {/* Official Signed & Sealed Architectural Stamp (Step 04) */}
              <div
                ref={stampRef}
                style={{ opacity: 0, transform: "scale(0.85) rotate(-20deg)" }}
                className="absolute right-6 bottom-8 sm:right-8 sm:bottom-10 z-20 pointer-events-none select-none transition-all duration-300 ease-out"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-double border-[#9b2f24] text-[#9b2f24] flex flex-col items-center justify-center text-center p-2 bg-radial from-[#9b2f24]/10 to-transparent shadow-lg shadow-[#9b2f24]/10 backdrop-blur-2xs">
                  <span className="text-[7.5px] uppercase tracking-[0.2em] font-mono font-bold">
                    Signed &amp; Sealed
                  </span>
                  <span className="font-serif text-sm font-semibold tracking-wide my-0.5">
                    PRC Licensed
                  </span>
                  <span className="text-[7px] uppercase tracking-[0.16em] font-mono font-bold">
                    RBC Builders &middot; 2026
                  </span>
                  <span className="text-[6.5px] text-[#9b2f24]/80 tracking-widest mt-0.5">
                    San Fernando, Pampanga
                  </span>
                </div>
              </div>

              {/* Finale Landing Banner (Step 07 Turnover) */}
              <div
                ref={finaleRef}
                style={{ opacity: 0, transform: "translateY(12px)" }}
                className="absolute inset-x-0 bottom-8 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-out"
              >
                <span className="font-serif italic text-xl sm:text-2xl text-amber-200 drop-shadow-md">
                  This is RBC Builders.
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-mono mt-1 drop-shadow-sm">
                  A dream built for a family. A home standing proud.
                </span>
              </div>

              {/* Bottom Step Status Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none flex items-center justify-between text-[10px] font-mono text-muted/90 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-black/5">
                <span
                  ref={stepCounterRef}
                  className="text-accent font-semibold uppercase tracking-wider"
                >
                  Step 01 / 07 &middot; Consultation
                </span>
                <span className="hidden sm:inline text-muted uppercase tracking-widest text-[9px]">
                  Parallax 3D &middot; Scroll to build ↓
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (The 7 Interactive Journey Steps) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ol ref={stepsContainerRef} className="list-none m-0 p-0 space-y-4">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const Icon = step.icon;

                return (
                  <li
                    key={step.num}
                    data-step-i={idx}
                    onClick={() => scrollToStep(idx)}
                    className={`cursor-pointer min-h-[44vh] sm:min-h-[48vh] flex flex-col justify-center pl-6 sm:pl-8 border-l-2 transition-all duration-300 relative group ${
                      isActive
                        ? "border-accent opacity-100"
                        : "border-border/70 opacity-45 hover:opacity-80"
                    }`}
                  >
                    {/* Big Serif Step Number */}
                    <div className="flex items-baseline justify-between mb-2">
                      <span
                        className={`font-serif italic text-4xl sm:text-5xl font-light transition-colors ${
                          isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium">
                        {step.duration}
                      </span>
                    </div>

                    {/* Step Title */}
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        size={17}
                        className={`transition-colors ${
                          isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                        }`}
                      />
                      <h3
                        className={`font-serif text-xl sm:text-2xl font-normal transition-colors ${
                          isActive ? "text-foreground" : "text-foreground/80"
                        }`}
                      >
                        {step.name}
                      </h3>
                    </div>

                    {/* Step Tagline */}
                    <p className="font-serif italic text-xs sm:text-sm text-accent/90 mb-3 font-light">
                      &ldquo;{step.tagline}&rdquo;
                    </p>

                    {/* Step Body */}
                    <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed mb-4">
                      {step.body}
                    </p>

                    {/* Step Deliverables Pills */}
                    <div className="space-y-1.5 pt-2 border-t border-border/50">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-[11px] text-muted">
                          <CheckCircle2
                            size={12}
                            className={`shrink-0 mt-0.5 ${
                              isActive ? "text-accent" : "text-muted/60"
                            }`}
                          />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Active Jump Arrow */}
                    {isActive && (
                      <div className="mt-4 flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-accent font-semibold animate-pulse">
                        <span>Current Active Phase</span>
                        <ArrowRight size={11} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
