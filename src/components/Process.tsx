"use client";

import { useState, useCallback } from "react";
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
  Calendar,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { useReveal } from "@/lib/useReveal";

// Dynamically load the 3D Journey Canvas with ssr: false
const Journey3DCanvas = dynamic(() => import("./Journey3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center bg-[#ebe5da] text-muted text-xs font-mono gap-3 p-8">
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
    leadRole: "Principal PRC Architect & Design Director",
    deliverables: [
      "Client lifestyle & spatial requirements brief",
      "Lot orientation & topography feasibility report",
      "Target floor area & preliminary budget parameters",
    ],
  },
  {
    num: "02",
    phaseCode: "Sheet 02 · Site Visit & Schematic",
    name: "Site visit & schematic design",
    duration: "Weeks 3–4",
    tagline: "Lot boundary verification, prevailing winds, and solar exposure study.",
    body: "We conduct physical on-site surveys in Pampanga to evaluate elevation grades, natural cross-ventilation, and solar exposure, followed by initial conceptual floor plans and spatial volume sketches.",
    icon: Paintbrush,
    leadRole: "PRC Geodetic Surveyor & Architectural Designer",
    deliverables: [
      "Boundary relocation & elevation grade survey",
      "Solar path & natural cross-ventilation assessment",
      "Preliminary architectural schematic floor plan options",
    ],
  },
  {
    num: "03",
    phaseCode: "Sheet 03 · Design Development",
    name: "Design development",
    duration: "Weeks 5–7",
    tagline: "Refining spatial volumes, material textures, and photorealistic 3D elevations.",
    body: "We develop the approved schematic into an authentic architectural package: modern tropical facade, double-height living atrium, hand-laid travertine portal tower, and photorealistic 3D concept visualizations.",
    icon: Landmark,
    leadRole: "Senior 3D Visualizer & Materials Specialist",
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
    body: "Signed and sealed architectural, structural, electrical, and sanitary blueprints by licensed PRC professionals, fully submitted and approved for all municipal building permits with zero delays.",
    icon: FileCheck,
    leadRole: "PRC Licensed Civil & MEP Professional Engineers",
    deliverables: [
      "Seismic structural calculations signed by licensed Civil Engineers",
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
    leadRole: "Project Engineer & Structural Site Supervisor",
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
    body: "Structural concrete framing rises, followed by hand-laid travertine stone cladding, acoustic timber louver screens, floor-to-ceiling glass fenestration, and the signature cantilevered upper box.",
    icon: Hammer,
    leadRole: "Construction Manager & Quality Assurance Lead",
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
    leadRole: "Turnover Director & Client Concierge",
    deliverables: [
      "Zero-defect multi-point quality assurance punch listing",
      "Official 15-Year Structural Warranty certificate",
      "Turnkey keys handover & municipal Certificate of Occupancy",
    ],
  },
];

export default function Process() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = JOURNEY_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

  const nextStep = useCallback(() => {
    setActiveStepIndex((prev) => (prev < JOURNEY_STEPS.length - 1 ? prev + 1 : 0));
  }, []);

  const prevStep = useCallback(() => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : JOURNEY_STEPS.length - 1));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bg-background relative py-16 sm:py-24 border-t border-border"
    >
      {/* Anchor aliases for backward compatibility */}
      <div id="process" className="sr-only" />
      <div id="methodology" className="sr-only" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] uppercase tracking-[0.2em] font-mono font-medium mb-3">
              <Compass size={12} />
              <span>Our journey with you</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight">
              From our first meeting to{" "}
              <em className="font-serif italic font-normal text-accent">
                a home standing proud.
              </em>
            </h2>
            <p className="text-sm sm:text-base text-foreground/75 font-light leading-relaxed mt-3">
              A transparent 7-phase design-build process refined across Central Luzon. Watch each milestone unfold from initial blueprint to finished residence.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded-2xl border border-border shadow-2xs self-start sm:self-auto">
            <div className="flex flex-col text-right">
              <span className="text-[9px] uppercase tracking-wider text-muted font-mono">
                Stage {activeStepIndex + 1} of 07
              </span>
              <span className="font-mono text-xs font-semibold text-accent">
                {Math.round(((activeStepIndex + 1) / 7) * 100)}% Complete
              </span>
            </div>
            <div className="w-16 h-2 bg-border/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${Math.round(((activeStepIndex + 1) / 7) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 01 TILL 07 INTERACTIVE STAGE SELECTOR PILLS                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-3 rounded-2xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-surface border-accent shadow-md ring-2 ring-accent/30"
                    : "bg-surface/50 border-border hover:border-accent/40 hover:bg-surface"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                    {step.num}
                  </span>
                  <span className="text-[8.5px] uppercase font-mono text-muted/80">
                    {step.duration.split(" ")[0]}
                  </span>
                </div>

                <span className="text-[11px] sm:text-xs text-foreground font-medium truncate block">
                  {step.name}
                </span>

                <div className="w-full bg-border/60 h-1 rounded-full mt-2.5 overflow-hidden">
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

        {/* ============================================================== */}
        {/* MAIN STAGE: 3D MODEL STAGE (LEFT) + STEP DOSSIER (RIGHT)       */}
        {/* Generous un-cramped height, no squashing, no rigid h-screen     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column (7 cols): Spacious 3D Architectural Villa Model Stage */}
          <div className="lg:col-span-7 xl:col-span-7 relative w-full h-[420px] sm:h-[480px] lg:h-[560px] rounded-3xl bg-[#ebe5da] border border-border shadow-xl overflow-hidden flex flex-col">
            <Journey3DCanvas progress={activeStepIndex} />

            {/* Top-Left Sheet Phase Indicator */}
            <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1.5 max-w-[280px]">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full border border-black/5 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-mono text-accent font-bold truncate">
                  {activeStep.phaseCode}
                </span>
              </div>
            </div>

            {/* Signed & Sealed Architectural Stamp (Step 04) */}
            {activeStepIndex === 3 && (
              <div className="absolute right-6 bottom-8 z-20 pointer-events-none select-none transition-all duration-500 ease-out animate-in fade-in zoom-in-90">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-double border-[#9b2f24] text-[#9b2f24] flex flex-col items-center justify-center text-center p-2 bg-radial from-[#9b2f24]/10 to-transparent shadow-xl backdrop-blur-2xs rotate-[-12deg]">
                  <span className="text-[7px] uppercase tracking-[0.2em] font-mono font-bold">
                    Signed &amp; Sealed
                  </span>
                  <span className="font-serif text-xs font-bold tracking-wide my-0.5">
                    PRC Licensed
                  </span>
                  <span className="text-[6.5px] uppercase tracking-[0.16em] font-mono font-bold">
                    RBC Builders &middot; 2026
                  </span>
                  <span className="text-[6px] text-[#9b2f24]/80 tracking-widest mt-0.5">
                    San Fernando, Pampanga
                  </span>
                </div>
              </div>
            )}

            {/* Finale Landing Banner (Step 07 Turnover) */}
            {activeStepIndex === 6 && (
              <div className="absolute inset-x-0 bottom-8 z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-3">
                <span className="font-serif italic text-xl sm:text-2xl text-amber-200 drop-shadow-md">
                  This is RBC Builders.
                </span>
                <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.22em] text-white/95 font-mono mt-1 drop-shadow-sm">
                  A dream built for a family. A home standing proud.
                </span>
              </div>
            )}

            {/* Bottom-Left Interaction Hint */}
            <div className="absolute bottom-4 left-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 text-muted text-[10px] font-mono bg-white/90 px-3.5 py-1.5 rounded-full border border-border backdrop-blur-xs shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Interactive 3D &middot; Hover to Parallax</span>
            </div>

            {/* Bottom-Right Stage Navigation Arrows */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 p-1 rounded-full border border-border shadow-xs backdrop-blur-xs">
              <button
                type="button"
                onClick={prevStep}
                aria-label="Previous Stage"
                className="p-2 rounded-full hover:bg-accent/15 text-foreground hover:text-accent transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
              </button>
              <span className="text-[10px] font-mono text-muted px-1.5">
                {activeStep.num} / 07
              </span>
              <button
                type="button"
                onClick={nextStep}
                aria-label="Next Stage"
                className="p-2 rounded-full hover:bg-accent/15 text-foreground hover:text-accent transition-colors cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Spacious, Uncramped Live Step Dossier */}
          <div className="lg:col-span-5 xl:col-span-5 relative w-full rounded-3xl bg-surface border border-border shadow-xl p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
            {/* Top Phase Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                    Phase {activeStep.num}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-wider font-mono text-muted">
                    Stage {activeStepIndex + 1} of 07
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium">
                  <Calendar size={11} />
                  <span>{activeStep.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 mt-2">
                <StepIcon size={22} className="text-accent shrink-0" />
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight">
                  {activeStep.name}
                </h3>
              </div>

              <p className="font-serif italic text-sm text-accent/90 font-light mt-2">
                &ldquo;{activeStep.tagline}&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed mt-3">
                {activeStep.body}
              </p>
            </div>

            {/* Deliverables Checklist (Generous, clean, NO blank grey voids!) */}
            <div className="my-6 p-4 sm:p-5 rounded-2xl bg-background/80 border border-border/80">
              <span className="text-[9.5px] uppercase tracking-widest font-mono text-accent font-semibold mb-3 block">
                Verified Engineering &amp; Design Deliverables:
              </span>
              <div className="space-y-2.5">
                {activeStep.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-foreground/85">
                    <CheckCircle2
                      size={15}
                      className="shrink-0 mt-0.5 text-accent"
                    />
                    <span className="leading-snug font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Oversight */}
            <div className="pb-5 mb-5 border-b border-border/60 flex items-center gap-2 text-xs text-muted font-mono">
              <UserCheck size={14} className="text-accent shrink-0" />
              <span>
                <strong>Supervised by:</strong> {activeStep.leadRole}
              </span>
            </div>

            {/* Step Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#contact"
                className="w-full sm:flex-1 btn btn--accent rounded-full py-2.5 text-[11px] uppercase tracking-[0.16em] shadow-xs flex items-center justify-center gap-2 font-medium"
              >
                <span>Start Project Consultation</span>
                <ArrowRight size={13} />
              </a>

              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.16em] border border-border text-foreground hover:border-accent hover:text-accent bg-background transition-all cursor-pointer font-medium"
              >
                <span>
                  {activeStepIndex === 6 ? "Review Stage 01" : `Next: Stage 0${activeStepIndex + 2}`}
                </span>
                <ArrowRight size={12} className="text-accent" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM TIMELINE MILESTONE TRACKER                             */}
        {/* ============================================================== */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted font-mono gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-accent" />
            <span>
              100% On-Time Turnkey Delivery Guarantee Across Central Luzon
            </span>
          </div>
          <span>San Fernando, Pampanga &middot; PRC Licensed Design-Build Practice</span>
        </div>
      </div>
    </section>
  );
}
