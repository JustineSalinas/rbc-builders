"use client";

import { useState } from "react";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, Compass, HardHat, FileCheck, Landmark, Hammer, Paintbrush, Key } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const PHASES = [
  {
    step: "01",
    icon: Compass,
    title: "Site Survey & Topography Feasibility",
    duration: "Weeks 1–2",
    tagline: "Lot boundary verification, soil test analysis, and orientation study.",
    description:
      "Before drawing a single line, our civil engineers and architects assess your property's topography, natural drainage vectors, prevailing winds, and solar exposure. We establish the foundational parameters that dictate your estate's longevity.",
    deliverables: [
      "Topographical survey and boundary relocation report",
      "Soil bearing capacity testing and foundation depth recommendations",
      "Solar path and natural cross-ventilation assessment",
      "Preliminary investment and floor area feasibility brief",
    ],
  },
  {
    step: "02",
    icon: Paintbrush,
    title: "Architectural Design & 3D Visualization",
    duration: "Weeks 3–6",
    tagline: "Floor plan optimization, spatial flow, and photorealistic 3D elevations.",
    description:
      "We iterate floor plans until the layout feels effortless for your family. Once schematic layouts are approved, we generate comprehensive 3D exterior and interior renderings so you experience every ceiling volume, window reveal, and material texture before construction.",
    deliverables: [
      "Architectural schematic floor plans (all levels)",
      "High-resolution 3D exterior day and night visualizations",
      "Interior spatial perspective models with lighting schemes",
      "Curated material specification sample boards",
    ],
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Engineering Calculations & Permit Acquisition",
    duration: "Weeks 7–10",
    tagline: "Seismic calculations, MEP plans, and full municipal clearance.",
    description:
      "Our licensed PRC civil, electrical, and sanitary engineers calculate and seal all technical plans in strict compliance with the National Structural Code of the Philippines. We process all regulatory clearances with your local municipal hall.",
    deliverables: [
      "Seismic structural calculations signed by licensed Civil Engineers",
      "Complete electrical, plumbing, sanitary, and mechanical working blueprints",
      "Barangay clearances, zoning approvals, and BFP fire safety inspection permits",
      "Official municipal Building Permit release",
    ],
  },
  {
    step: "04",
    icon: Landmark,
    title: "Capital Structuring & Bank Loan Facilitation",
    duration: "Weeks 8–11",
    tagline: "Bank-ready detailed BOQ and milestone drawdown synchronization.",
    description:
      "If utilizing bank construction financing (BDO, BPI, Metrobank, Security Bank, or Pag-IBIG), we prepare accredited Bills of Quantities and schedule drawdown inspections so that financing flows seamlessly without site work stoppages.",
    deliverables: [
      "Bank-accredited detailed Bill of Quantities (BOQ) with unit material breakdowns",
      "Contractor qualification certificates and company credentials dossier",
      "Milestone billing schedule matched to bank inspection stages",
      "Direct technical liaison with bank valuation appraisers",
    ],
  },
  {
    step: "05",
    icon: HardHat,
    title: "Groundbreaking & Substructure Foundation",
    duration: "Months 3–4",
    tagline: "Excavation, reinforced footings, and monolithic concrete pouring.",
    description:
      "Site clearing, layout staking, and heavy excavation. We pour reinforced concrete footings, tie beams, and slab-on-grade with certified ready-mix concrete tested for 3,000 to 4,000 PSI compressive strength.",
    deliverables: [
      "Groundbreaking ceremony, site fencing, and temporary facilities mobilization",
      "Excavation and soil poisoning / subterranean termite treatment barrier",
      "Reinforced concrete footings, columns, and perimeter retaining walls",
      "Compressive cylinder strength laboratory test certificates",
    ],
  },
  {
    step: "06",
    icon: Hammer,
    title: "Structural Enclosure & Interior Finishes",
    duration: "Months 5–8",
    tagline: "Masonry walls, roof deck framing, MEP rough-ins, and finish specification.",
    description:
      "The residence takes physical form: concrete hollow block masonry, steel roof trusses, waterproof thermal roof decking, pressure-tested plumbing lines, and application of your chosen finish tier (granite, analok aluminum, hardwood joinery).",
    deliverables: [
      "Full structural framing and standing-seam / insulated roof installation",
      "Complete MEP rough-in inspection and pressure testing",
      "Exterior plastering, stone veneer cladding, and waterproof membranes",
      "Interior floor tiling, gypsum ceiling paneling, and architectural fenestration",
    ],
  },
  {
    step: "07",
    icon: Key,
    title: "Commissioning, Punch List & Key Turnover",
    duration: "Months 9–10",
    tagline: "Zero-defect quality inspection, Certificate of Occupancy, and keys in hand.",
    description:
      "Before handover, our quality assurance team conducts rigorous multi-point inspections on all electrical fixtures, water drainage, door seals, and surface finishes. We hand over the keys with full documentation, warranties, and municipal occupancy approval.",
    deliverables: [
      "Formal client walkthrough and exhaustive punch-list completion",
      "Municipal final inspection and Certificate of Occupancy release",
      "As-built architectural and MEP blueprint handover dossier",
      "Official 15-Year Structural Warranty certificate and turnkey keys",
    ],
  },
];

export default function Process() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={sectionRef} id="methodology" className="py-28 sm:py-36 px-4 sm:px-8 bg-surface relative border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              The Design-Build Methodology
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Seven Phases. Uncompromising Rigor.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            From the first topographical soil test to the final key turnover, our process is systematic, fully permitted, and documented at every milestone.
          </p>
        </div>

        {/* Spacious Two-Stage Architecture Milestone Grid */}
        <div data-reveal data-reveal-delay="0.08" className="mb-12 space-y-8">
          {/* Stage I: Pre-Construction & Regulatory Governance */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.24em] text-accent font-medium flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Stage I &middot; Pre-Construction &amp; Permitting (Weeks 1–11)
              </span>
              <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                Phases 01 – 04
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PHASES.slice(0, 4).map((phase, i) => {
                const isActive = activeStep === i;
                const Icon = phase.icon;
                return (
                  <button
                    key={phase.step}
                    onClick={() => setActiveStep(i)}
                    className={`text-left p-6 border transition-all duration-300 flex flex-col justify-between min-h-[160px] group ${
                      isActive
                        ? "bg-background border-accent shadow-xl shadow-black/80 ring-1 ring-accent"
                        : "bg-background/40 border-border hover:border-white/25 hover:bg-background/70"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-serif text-lg font-medium ${
                            isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                          }`}
                        >
                          Phase {phase.step}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono text-muted/90 px-2 py-0.5 bg-white/5 border border-white/10">
                          {phase.duration}
                        </span>
                      </div>
                      <h4
                        className={`font-serif text-base sm:text-lg leading-snug transition-colors ${
                          isActive ? "text-accent font-medium" : "text-foreground group-hover:text-accent"
                        }`}
                      >
                        {phase.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs">
                      <span className="text-[11px] text-muted font-light line-clamp-1 pr-2">
                        {phase.tagline}
                      </span>
                      <Icon
                        size={15}
                        className={
                          isActive
                            ? "text-accent shrink-0"
                            : "text-muted shrink-0 group-hover:text-foreground"
                        }
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage II: On-Site Structural Execution & Handover */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.24em] text-accent font-medium flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Stage II &middot; Structural Execution &amp; Turnkey Handover (Months 3–10)
              </span>
              <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                Phases 05 – 07
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PHASES.slice(4).map((phase, i) => {
                const actualIndex = i + 4;
                const isActive = activeStep === actualIndex;
                const Icon = phase.icon;
                return (
                  <button
                    key={phase.step}
                    onClick={() => setActiveStep(actualIndex)}
                    className={`text-left p-6 border transition-all duration-300 flex flex-col justify-between min-h-[160px] group ${
                      isActive
                        ? "bg-background border-accent shadow-xl shadow-black/80 ring-1 ring-accent"
                        : "bg-background/40 border-border hover:border-white/25 hover:bg-background/70"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-serif text-lg font-medium ${
                            isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                          }`}
                        >
                          Phase {phase.step}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono text-muted/90 px-2 py-0.5 bg-white/5 border border-white/10">
                          {phase.duration}
                        </span>
                      </div>
                      <h4
                        className={`font-serif text-base sm:text-lg leading-snug transition-colors ${
                          isActive ? "text-accent font-medium" : "text-foreground group-hover:text-accent"
                        }`}
                      >
                        {phase.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs">
                      <span className="text-[11px] text-muted font-light line-clamp-1 pr-2">
                        {phase.tagline}
                      </span>
                      <Icon
                        size={15}
                        className={
                          isActive
                            ? "text-accent shrink-0"
                            : "text-muted shrink-0 group-hover:text-foreground"
                        }
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Phase Details Card */}
        <div data-reveal data-reveal-delay="0.14" className="p-8 sm:p-12 bg-background border border-border relative overflow-hidden">
          {/* Subtle Background Watermark Number */}
          <div className="absolute right-6 -bottom-6 font-serif text-[12rem] text-white/[0.02] select-none pointer-events-none leading-none">
            {PHASES[activeStep].step}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column: Phase Description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
                  Phase {PHASES[activeStep].step} of 07
                </span>
                <span className="text-white/20">&middot;</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted flex items-center gap-1.5 font-light">
                  <Clock size={12} className="text-accent" /> {PHASES[activeStep].duration}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-foreground font-normal mb-3">
                {PHASES[activeStep].title}
              </h3>

              <p className="font-serif italic text-base sm:text-lg text-accent font-light mb-6">
                &ldquo;{PHASES[activeStep].tagline}&rdquo;
              </p>

              <p className="text-sm sm:text-base text-foreground/80 font-light leading-relaxed mb-8">
                {PHASES[activeStep].description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveStep((s) => (s > 0 ? s - 1 : PHASES.length - 1))}
                  className="px-5 py-2.5 border border-border hover:border-accent text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span>&larr; Previous</span>
                  <span className="text-[10px] text-muted/60 font-mono hidden sm:inline">
                    (Phase {PHASES[activeStep > 0 ? activeStep - 1 : PHASES.length - 1].step})
                  </span>
                </button>
                <button
                  onClick={() => setActiveStep((s) => (s < PHASES.length - 1 ? s + 1 : 0))}
                  className="px-5 py-2.5 bg-surface border border-accent/40 hover:border-accent text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors flex items-center gap-2"
                >
                  <span>Next Phase</span>
                  <span className="text-[10px] text-accent/80 font-mono hidden sm:inline">
                    (Phase {PHASES[activeStep < PHASES.length - 1 ? activeStep + 1 : 0].step})
                  </span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right Column: Key Deliverables Panel */}
            <div className="lg:col-span-5 p-6 bg-surface border border-border">
              <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-[0.2em] font-medium mb-4">
                <ShieldCheck size={16} />
                <span>Phase Deliverables &amp; Milestones</span>
              </div>

              <div className="space-y-3.5">
                {PHASES[activeStep].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </span>
                    <span className="text-xs text-foreground/80 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/80">
                <p className="text-[11px] text-muted font-light leading-relaxed">
                  Every milestone is verified on-site by our supervising Civil Engineers before the subsequent phase commences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
