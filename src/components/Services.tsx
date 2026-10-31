"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Compass, HardHat, FileText, Landmark } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const DISCIPLINES = [
  {
    id: "01",
    icon: Compass,
    tag: "Design Phase",
    title: "Architectural Planning & 3D Visualization",
    subtitle: "From spatial conceptualization to photorealistic elevations and working blueprints.",
    description:
      "Every project begins with a careful reading of your site, sunlight exposure, prevailing breezes, and lifestyle patterns. We deliver full architectural blueprints, structural engineering calculations, and interior spatial models that eliminate guesswork before ground is broken.",
    deliverables: [
      "Site orientation, topography and solar path analysis",
      "Full architectural schematic design & floor plan iterations",
      "Photorealistic 3D exterior & interior architectural renderings",
      "Sealed structural, sanitary, and electrical engineering plans",
      "Comprehensive material specification palette & sample boards",
    ],
  },
  {
    id: "02",
    icon: HardHat,
    tag: "Build Phase",
    title: "Turnkey General Contracting (Labor & Materials)",
    subtitle: "End-to-end site mobilization, structural execution, and bespoke interior fit-out.",
    description:
      "We provide our own dedicated construction crews, licensed project engineers, and vetted material supply chains. Whether building to Bare Shell or Bespoke Luxury specifications, our workmanship adheres strictly to the National Structural Code of the Philippines.",
    deliverables: [
      "Soil bearing verification, site clearing & excavation",
      "Reinforced concrete substructure & structural framing",
      "Complete MEP (mechanical, electrical, plumbing) rough-ins",
      "Precision architectural finishes: stone, timber, tiles, glazing",
      "Weekly photo and video progress reports with milestone tracking",
    ],
  },
  {
    id: "03",
    icon: FileText,
    tag: "Regulatory Governance",
    title: "Government Permits & Regulatory Clearances",
    subtitle: "Full LGU permit processing so your build stays 100% compliant and unhindered.",
    description:
      "Navigating municipal bureaucracies across Central Luzon can delay a build by months. RBC Builders handles the entire permitting lifecycle with local LGUs, barangays, and fire bureaus, ensuring your project has legal sanction at every milestone.",
    deliverables: [
      "Barangay construction clearances & neighbor notices",
      "City/Municipal building permit acquisition (San Fernando, Angeles, etc.)",
      "Zoning, environmental, and structural safety documentation",
      "Bureau of Fire Protection (BFP) safety clearances",
      "Final municipal inspection and Certificate of Occupancy handover",
    ],
  },
  {
    id: "04",
    icon: Landmark,
    tag: "Capital Structuring",
    title: "Bank Loan Financing Assistance",
    subtitle: "Turnkey bank loan coordination and milestone drawdown documentation.",
    description:
      "Building an estate through a construction loan requires strict financial and technical documentation. We prepare bank-standard Bills of Quantities (BOQ), certified cost breakdowns, and stage-by-stage billing statements accepted by all major Philippine financial institutions.",
    deliverables: [
      "Bank-accredited detailed Bill of Quantities (BOQ) with unit costs",
      "Standard construction agreement formatted for bank appraisal",
      "Progress billing milestones aligned with bank drawdown schedules",
      "Direct coordination with BDO, BPI, Metrobank, Security Bank, & Pag-IBIG",
      "Site inspection accompaniment for bank appraiser verification",
    ],
  },
];

export default function Services() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={sectionRef} id="services" className="py-28 sm:py-36 px-4 sm:px-8 bg-surface relative">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Services &amp; Capabilities
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Four Core Services. One Accountable Master Builder.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            Eliminating third-party friction by housing architectural vision, structural contracting, municipal legalities, and financing facilitation under one roof.
          </p>
        </div>

        {/* Desktop Tabs & Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Navigation Column */}
          <div data-reveal data-reveal-delay="0.1" className="lg:col-span-5 flex flex-col gap-3">
            {DISCIPLINES.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-left p-6 border transition-all duration-300 flex items-start gap-5 ${
                    isActive
                      ? "bg-background border-accent/70 shadow-lg shadow-black/40"
                      : "bg-background/40 border-border hover:border-white/20 hover:bg-background/70"
                  }`}
                >
                  <span
                    className={`font-serif text-lg tabular-nums mt-0.5 ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
                        {item.tag}
                      </span>
                      <Icon
                        size={16}
                        className={isActive ? "text-accent" : "text-muted/60"}
                      />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted font-light mt-1.5 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Panel */}
          <div data-reveal data-reveal-delay="0.18" className="lg:col-span-7 bg-background border border-border p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
                  Discipline {DISCIPLINES[activeTab].id}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal mt-1">
                  {DISCIPLINES[activeTab].title}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full border border-accent/20 flex items-center justify-center text-accent bg-accent/5">
                {(() => {
                  const Icon = DISCIPLINES[activeTab].icon;
                  return <Icon size={22} strokeWidth={1.5} />;
                })()}
              </div>
            </div>

            <p className="text-sm sm:text-base text-foreground/80 font-light leading-relaxed mb-8">
              {DISCIPLINES[activeTab].description}
            </p>

            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
                Guaranteed Scope &amp; Deliverables
              </h4>
              <div className="grid grid-cols-1 gap-3.5">
                {DISCIPLINES[activeTab].deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span className="text-xs sm:text-sm text-foreground/80 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-muted">
                San Fernando · Angeles · Tarlac · Bataan · Zambales
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent hover:text-foreground font-medium transition-colors"
              >
                <span>Consult Our Engineers</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
