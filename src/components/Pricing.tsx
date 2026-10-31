"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ArrowRight, Calculator, ShieldCheck } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

type FinishGrade = {
  id: string;
  name: string;
  minRate: number;
  maxRate: number | null;
  rateDisplay: string;
  image: string;
  tagline: string;
  specifications: {
    ceiling: string;
    windows: string;
    doors: string;
    flooring: string;
    walls: string;
    fixtures: string;
  };
};

const FINISH_GRADES: FinishGrade[] = [
  {
    id: "bare",
    name: "Bare Shell Specification",
    minRate: 18000,
    maxRate: 20000,
    rateDisplay: "₱18,000 – ₱20,000",
    image: "/images/finish-bare.jpg",
    tagline: "Structural concrete framing, rough MEP, weather-tight perimeter shell.",
    specifications: {
      ceiling: "Exposed slab or basic flat board",
      windows: "Jalousie or standard steel casement",
      doors: "Flush hollow core timber",
      flooring: "Power-troweled smooth cement screed",
      walls: "Plastered concrete finish, ready for paint",
      fixtures: "Economic sanitary & basic electrical rough-in",
    },
  },
  {
    id: "standard",
    name: "Standard Architectural",
    minRate: 20000,
    maxRate: 25000,
    rateDisplay: "₱20,000 – ₱25,000",
    image: "/images/finish-standard.jpg",
    tagline: "Turnkey contemporary home with complete painted interiors & ceramic tiling.",
    specifications: {
      ceiling: "Flat gypsum board with modern recessed downlights",
      windows: "White powder-coated aluminum or UPVC casement",
      doors: "Engineered wood with contemporary lever hardware",
      flooring: "60x60cm polished ceramic floor tiles",
      walls: "Two-coat premium latex paint with subtle accent tones",
      fixtures: "Standard American Standard / Pozzi plumbing fittings",
    },
  },
  {
    id: "premium",
    name: "Premium Architectural",
    minRate: 25000,
    maxRate: 29000,
    rateDisplay: "₱25,000 – ₱29,000",
    image: "/images/finish-premium.jpg",
    tagline: "Our most requested specification. Textured panels, granite slabs & stone walls.",
    specifications: {
      ceiling: "Textured PVC / wood-slat accent panels with perimeter lighting",
      windows: "Analok bronze heavy-gauge aluminum sliding panels",
      doors: "Solid core hardwood entrance pivot door with digital lock prep",
      flooring: "Imported 60x120cm porcelain slabs or engineered timber",
      walls: "Hand-laid natural stacked-stone exterior & interior accents",
      fixtures: "Semi-luxury Kohler / Hansgrohe designer fittings",
    },
  },
  {
    id: "luxury",
    name: "Bespoke Luxury Specification",
    minRate: 29000,
    maxRate: null,
    rateDisplay: "₱29,000+",
    image: "/images/finish-luxury.jpg",
    tagline: "Museum-grade finishes, custom architectural joinery, and automated illumination.",
    specifications: {
      ceiling: "Multi-tier floating cove ceilings, acoustic timber battens",
      windows: "Thermal-break powder-coated floor-to-ceiling sliding fenestration",
      doors: "Custom oversized solid mahogany or teakwood architectural doors",
      flooring: "Seamless large-format sintered stone slabs & hardwood parquet",
      walls: "Full height natural marble veneers, fluted PVC & textured microcement",
      fixtures: "Full luxury Toto / Grohe sanitary fixtures & smart home pre-wiring",
    },
  },
];

const LOCATIONS = [
  "San Fernando, Pampanga",
  "Angeles City / Clark",
  "Tarlac City / Province",
  "Balanga / Mariveles, Bataan",
  "Olongapo / Subic, Zambales",
];

export default function Pricing() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeTier, setActiveTier] = useState<FinishGrade>(FINISH_GRADES[2]); // Default to Premium
  const [floorArea, setFloorArea] = useState<number>(240);
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATIONS[0]);

  // Investment calculation
  const minEstimatedCost = floorArea * activeTier.minRate;
  const maxEstimatedCost = activeTier.maxRate
    ? floorArea * activeTier.maxRate
    : Math.round(floorArea * activeTier.minRate * 1.35);

  const formatPHP = (num: number) => {
    return "₱" + num.toLocaleString("en-PH");
  };

  const estimatedMonths =
    floorArea < 180 ? "7–9" : floorArea < 300 ? "9–11" : "11–14";

  return (
    <section ref={sectionRef} id="pricing" className="py-28 sm:py-36 px-4 sm:px-8 bg-background relative border-t border-border">
      {/* Anchor alias for backwards compatibility */}
      <div id="specifications" className="sr-only" />
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Pricing &amp; Build Rates
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Construction Rates &amp; Build Standards
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            Transparent per-square-meter construction rates across Central Luzon. We quote with an itemized Bill of Quantities so you know exactly what is specified.
          </p>
        </div>

        {/* 4 Architectural Grade Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FINISH_GRADES.map((grade, i) => {
            const isSelected = activeTier.id === grade.id;
            return (
              <div
                key={grade.id}
                data-reveal
                data-reveal-delay={(0.06 + i * 0.08).toString()}
                onClick={() => setActiveTier(grade)}
                className={`group cursor-pointer flex flex-col bg-surface border transition-all duration-400 overflow-hidden ${
                  isSelected
                    ? "border-accent shadow-xl shadow-black/50"
                    : "border-border hover:border-white/30"
                }`}
              >
                {/* Visual Image Board */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={grade.image}
                    alt={grade.name}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="font-serif text-sm text-foreground/90 font-medium">
                      {grade.name}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] uppercase tracking-[0.15em] bg-accent text-[#0c0c0b] px-2 py-0.5 font-bold">
                        Selected
                      </span>
                    )}
                  </div>
                </div>

                {/* Grade Details */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="font-serif text-2xl text-accent font-normal mb-1">
                      {grade.rateDisplay}
                      <span className="text-xs font-sans text-muted font-light ml-1">/ m²</span>
                    </div>
                    <p className="text-xs text-foreground/70 font-light leading-relaxed mb-6">
                      {grade.tagline}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-border/60">
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong>Ceiling:</strong> {grade.specifications.ceiling}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong>Windows:</strong> {grade.specifications.windows}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong>Flooring:</strong> {grade.specifications.flooring}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong>Doors:</strong> {grade.specifications.doors}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong>Fixtures:</strong> {grade.specifications.fixtures}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`mt-6 w-full py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium border transition-colors ${
                      isSelected
                        ? "bg-accent text-[#0c0c0b] border-accent"
                        : "border-border text-foreground/70 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {isSelected ? "Active Specification" : "Select Specification"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Architectural Investment Estimator */}
        <div data-reveal data-reveal-delay="0.15" className="p-8 sm:p-12 bg-surface border border-border relative overflow-hidden">
          <div className="flex items-center gap-3 text-accent text-xs uppercase tracking-[0.2em] font-medium mb-3">
            <Calculator size={16} />
            <span>Interactive Residence Cost Estimator</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal mb-8">
            Estimate Your Construction Investment in Central Luzon
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Controls Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Floor Area Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="floor-area-slider" className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                    Target Gross Built Floor Area
                  </label>
                  <span className="font-serif text-2xl text-accent font-medium">
                    {floorArea} m²{" "}
                    <span className="text-xs font-sans text-muted font-light">
                      ({Math.round(floorArea * 10.764)} sq ft)
                    </span>
                  </span>
                </div>
                <input
                  id="floor-area-slider"
                  type="range"
                  min="100"
                  max="600"
                  step="10"
                  value={floorArea}
                  onChange={(e) => setFloorArea(Number(e.target.value))}
                  aria-label="Target Gross Built Floor Area"
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-muted font-light mt-1.5">
                  <span>100 m² (Townhome/Bungalow)</span>
                  <span>240 m² (Standard Villa)</span>
                  <span>400 m² (Large Estate)</span>
                  <span>600 m² (Grand Residence)</span>
                </div>
              </div>

              {/* Location Selector */}
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium block mb-2">
                  Project Municipality / Province
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-left px-3.5 py-2 text-xs border transition-colors ${
                        selectedLocation === loc
                          ? "border-accent bg-accent/10 text-accent font-medium"
                          : "border-border text-foreground/70 hover:border-white/20"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="p-4 bg-background border border-border text-xs text-foreground/75 font-light leading-relaxed flex items-center gap-3">
                <ShieldCheck size={20} className="text-accent shrink-0" />
                <span>
                  Estimates include architectural plans, structural engineering calculations, labor, material procurement, LGU building permits, and turnkey site supervision.
                </span>
              </div>
            </div>

            {/* Calculations Display Right Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-background border border-accent/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-1">
                  Estimated Turnkey Investment
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-foreground font-light mb-2">
                  {formatPHP(minEstimatedCost)}
                  {activeTier.maxRate && (
                    <span className="text-lg text-muted font-sans font-light">
                      {" "}to {formatPHP(maxEstimatedCost)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted font-light mb-6">
                  Based on <strong>{activeTier.name}</strong> rate of {activeTier.rateDisplay} / m² in {selectedLocation}.
                </p>

                {/* Breakdown percentage indicators */}
                <div className="space-y-2 mb-6 text-xs border-y border-border py-4">
                  <div className="flex justify-between text-foreground/80 font-light">
                    <span>Substructure &amp; Concrete Framing</span>
                    <span className="font-mono text-muted">~35%</span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-light">
                    <span>Enclosure, Roof &amp; Masonry</span>
                    <span className="font-mono text-muted">~20%</span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-light">
                    <span>Plumbing &amp; Electrical MEP</span>
                    <span className="font-mono text-muted">~15%</span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-light">
                    <span>Architectural Interior Finishes</span>
                    <span className="font-mono text-muted">~25%</span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-light">
                    <span>Permits, Engineering &amp; Turnover</span>
                    <span className="font-mono text-muted">~5%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted mb-6">
                  <span>Estimated Build Timeline:</span>
                  <span className="font-serif text-base text-accent font-medium">
                    {estimatedMonths} Months
                  </span>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full text-center py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-[#0c0c0b] hover:bg-accent-light transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Itemized BOQ Breakdown</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
