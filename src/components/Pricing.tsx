"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Layers,
  Compass,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  AppWindow,
  DoorOpen,
  Grid,
  Paintbrush,
  Shield,
  Lock,
  Bath,
  UtensilsCrossed,
  Lightbulb,
  Fence,
  Phone,
  Mail,
} from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export interface SpecificationItems {
  ceiling: string;
  windows: string;
  doors: string;
  floors: string;
  walls: string;
  railings: string;
  locketHinges: string;
  toiletBath: string;
  kitchen: string;
  lightingElectrical: string;
  gate: string;
}

export type FinishGrade = {
  id: string;
  stageNum: number;
  code: string;
  number: string;
  name: string;
  minRate: number;
  maxRate: number | null;
  rateDisplay: string;
  popular?: boolean;
  idealFor: string;
  specifications: SpecificationItems;
};

// Exact Official Architectural Specifications per RBC Builders flyer
const FINISH_GRADES: FinishGrade[] = [
  {
    id: "bare",
    stageNum: 1,
    code: "GRADE 01",
    number: "01",
    name: "Bare Finish",
    minRate: 18000,
    maxRate: 20000,
    rateDisplay: "₱18,000 – ₱20,000",
    idealFor: "Homeowners & investors seeking structural core completion with progressive interior build.",
    specifications: {
      ceiling: "None, Flat",
      windows: "Jalousie, Steel",
      doors: "Simple Wood",
      floors: "Cement Finish, Ceramic Tiles",
      walls: "Concrete Finish, No Paint",
      railings: "Steel",
      locketHinges: "Economic",
      toiletBath: "Economic",
      kitchen: "Economic",
      lightingElectrical: "Economic",
      gate: "None",
    },
  },
  {
    id: "standard",
    stageNum: 2,
    code: "GRADE 02",
    number: "02",
    name: "Standard Finish",
    minRate: 20000,
    maxRate: 25000,
    rateDisplay: "₱20,000 – ₱25,000",
    idealFor: "Turnkey contemporary residences with painted surfaces, ceramic flooring, and steel perimeter fence.",
    specifications: {
      ceiling: "Flat",
      windows: "Aluminum Analok Frame, Upvc White",
      doors: "Simple Wood",
      floors: "Ceramic Tiles",
      walls: "Paint w/ Accent Colors",
      railings: "Steel",
      locketHinges: "Regular",
      toiletBath: "Regular",
      kitchen: "Regular",
      lightingElectrical: "Regular",
      gate: "Steel Gate & Fence",
    },
  },
  {
    id: "premium",
    stageNum: 3,
    code: "GRADE 03",
    number: "03",
    name: "Premium Finish",
    popular: true,
    minRate: 25000,
    maxRate: 29000,
    rateDisplay: "₱25,000 – ₱29,000",
    idealFor: "Executive modern residences featuring granite tiling, natural stone wall accents, and PVC paneling.",
    specifications: {
      ceiling: "Flat, PVC Textured Panel",
      windows: "Aluminum Analok Frame, Upvc White",
      doors: "Solid Wood",
      floors: "Granite Tiles, Wood Floors",
      walls: "Paint Finish w/ Stone Accents, PVC Cladding",
      railings: "Glass Steel",
      locketHinges: "Semi-Luxury",
      toiletBath: "Semi-Luxury",
      kitchen: "Semi-Luxury",
      lightingElectrical: "Semi-Luxury",
      gate: "Steel Gate w/ Wood & Fence",
    },
  },
  {
    id: "luxury",
    stageNum: 4,
    code: "GRADE 04",
    number: "04",
    name: "Luxury Finish",
    minRate: 29000,
    maxRate: null,
    rateDisplay: "₱29,000 – Above",
    idealFor: "Bespoke high-end masterpieces with architectural cove lights, solid wood doors, and luxury stone gates.",
    specifications: {
      ceiling: "Flat, PVC Textured Panel, Cove Lights",
      windows: "Aluminum Powdercoated, UPVC White",
      doors: "Solid Wood",
      floors: "Granite Tiles, Wood Floors",
      walls: "Paint Finish w/ Stone Accents, PVC Cladding",
      railings: "Glass Steel, Steel w/ Wood Top",
      locketHinges: "Luxury",
      toiletBath: "Luxury",
      kitchen: "Luxury",
      lightingElectrical: "Luxury",
      gate: "Steel Gate w/ Wood, Stone & Fence",
    },
  },
];

// The exact 11 Architectural Specification Categories
const SPEC_CATEGORIES = [
  { key: "ceiling", label: "Ceiling", icon: Layers },
  { key: "windows", label: "Windows", icon: AppWindow },
  { key: "doors", label: "Doors", icon: DoorOpen },
  { key: "floors", label: "Floors", icon: Grid },
  { key: "walls", label: "Walls", icon: Paintbrush },
  { key: "railings", label: "Railings", icon: Shield },
  { key: "locketHinges", label: "Locket & Hinges", icon: Lock },
  { key: "toiletBath", label: "Toilet & Bath Fixtures", icon: Bath },
  { key: "kitchen", label: "Kitchen Fixtures", icon: UtensilsCrossed },
  { key: "lightingElectrical", label: "Lighting & Electrical", icon: Lightbulb },
  { key: "gate", label: "Gate", icon: Fence },
] as const;

const LOCATIONS = [
  "San Fernando, Pampanga",
  "Angeles City / Clark Freeport",
  "Tarlac City / Capas",
  "Balanga / Mariveles, Bataan",
  "Olongapo / Subic Bay, Zambales",
];

export default function Pricing() {
  const sectionRef = useReveal<HTMLElement>();
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(2); // Default to Premium (03)
  const [floorArea, setFloorArea] = useState<number>(240);
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATIONS[0]);
  const [showMatrix, setShowMatrix] = useState<boolean>(true);

  const activeTier = FINISH_GRADES[selectedTierIndex];

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
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-background relative py-16 sm:py-24 border-t border-border"
    >
      {/* Anchor aliases for backward compatibility */}
      <div id="specifications" className="sr-only" />
      <div id="cost-estimator" className="sr-only" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] uppercase tracking-[0.2em] font-mono font-medium mb-3">
              <Compass size={12} />
              <span>Specification Standards &middot; Central Luzon</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight">
              House Construction Cost{" "}
              <em className="font-serif italic font-normal text-accent">
                in Pampanga
              </em>
            </h2>
            <p className="text-sm sm:text-base text-foreground/75 font-light leading-relaxed mt-3">
              Exact itemized specifications per finish tier. Direct design-build delivery with zero hidden contractor escalations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMatrix((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider border border-border text-foreground hover:border-accent hover:text-accent bg-surface transition-all cursor-pointer font-mono font-medium shadow-2xs"
            >
              <Layers size={13} className="text-accent" />
              <span>{showMatrix ? "Hide Full Matrix" : "View Comparison Matrix"}</span>
              {showMatrix ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 01 TILL 04 TIER SELECTOR TABS                                  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {FINISH_GRADES.map((grade, idx) => {
            const isActive = selectedTierIndex === idx;
            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => setSelectedTierIndex(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-surface border-accent shadow-md ring-2 ring-accent/30"
                    : "bg-surface/60 border-border hover:border-accent/40 hover:bg-surface"
                }`}
              >
                {grade.popular && (
                  <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 text-[8px] uppercase tracking-widest bg-accent text-white px-2.5 py-0.5 font-bold rounded-full shadow-2xs">
                    <Sparkles size={8} />
                    <span>Most Popular</span>
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {grade.number} &middot; {grade.code}
                    </span>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isActive ? "bg-accent animate-pulse" : "bg-border"
                      }`}
                    />
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-foreground font-normal tracking-tight">
                    {grade.name}
                  </h3>

                  <div className="font-serif text-base sm:text-lg text-accent font-medium mt-1">
                    {grade.rateDisplay}{" "}
                    <span className="text-[10px] text-muted font-sans font-light">
                      / m²
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] uppercase tracking-wider font-mono">
                  <span
                    className={
                      isActive
                        ? "text-accent font-semibold flex items-center gap-1"
                        : "text-muted"
                    }
                  >
                    {isActive ? (
                      <>
                        <Check size={12} />
                        <span>Active Grade</span>
                      </>
                    ) : (
                      "Select Tier"
                    )}
                  </span>
                  <span className="text-[9px] text-muted/70">
                    Grade 0{grade.stageNum} of 04
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* ACTIVE TIER EXACT SPECIFICATION DOSSIER                        */}
        {/* ============================================================== */}
        <div className="rounded-3xl bg-surface border border-border shadow-xl p-6 sm:p-8 lg:p-10 mb-12">
          {/* Top Dossier Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border/80">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                  {activeTier.code}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-mono text-muted">
                  House Construction Cost in Pampanga
                </span>
                {activeTier.popular && (
                  <span className="inline-flex items-center gap-1 text-[8.5px] uppercase tracking-widest bg-accent text-white px-2 py-0.5 font-bold rounded-full shadow-2xs">
                    <Sparkles size={8} />
                    <span>Recommended Grade</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight">
                {activeTier.name} Standards
              </h3>

              <div className="flex items-center gap-2 text-xs text-muted font-mono mt-3">
                <Building2 size={13} className="text-accent shrink-0" />
                <span>
                  <strong>Ideal for:</strong> {activeTier.idealFor}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-background/80 rounded-2xl p-5 border border-border/80 text-left lg:text-right shrink-0 min-w-[240px]">
              <span className="text-[10px] uppercase tracking-wider text-muted font-mono block">
                Gross Floor Area Rate
              </span>
              <div className="font-serif text-2xl sm:text-3xl text-accent font-semibold tracking-tight mt-0.5">
                {activeTier.rateDisplay}
              </div>
              <span className="text-xs text-muted font-light block mt-0.5">
                per square meter (m²)
              </span>
              <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-2">
                <ShieldCheck size={12} />
                <span>Fixed-Price Milestone Contract</span>
              </div>
            </div>
          </div>

          {/* Exact 11 Architectural Specification Cards */}
          <div className="my-8">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h4 className="font-serif text-lg text-foreground font-normal">
                Exact Architectural Inclusions &amp; Finishes
              </h4>
              <span className="text-[10px] uppercase tracking-wider font-mono text-muted">
                11 Specification Categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
              {SPEC_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const value = activeTier.specifications[cat.key];
                return (
                  <div
                    key={cat.key}
                    className="p-4 rounded-2xl bg-background/70 border border-border/80 flex flex-col justify-between hover:border-accent/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[9.5px] uppercase tracking-wider font-mono text-accent font-semibold flex items-center gap-1.5">
                          <IconComponent size={12} className="text-accent" />
                          <span>{cat.label}</span>
                        </span>
                        <span className="text-[8px] uppercase font-mono text-muted/60">
                          {activeTier.code}
                        </span>
                      </div>
                      <div className="font-serif text-sm sm:text-base text-foreground font-medium leading-snug">
                        {value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Verification & Contact Hotline */}
          <div className="p-4 rounded-2xl bg-background/50 border border-border/70 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-muted">
              <ShieldCheck size={14} className="text-accent shrink-0" />
              <span>
                All specifications verified by PRC-Licensed Architects &amp; Civil Engineers.
              </span>
            </div>
            <div className="flex items-center gap-3 text-foreground/80">
              <a
                href="tel:09772873075"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Phone size={11} className="text-accent" />
                <span>0977-287-3075</span>
              </a>
              <span className="text-border">|</span>
              <a
                href="mailto:rbcbuilders70@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Mail size={11} className="text-accent" />
                <span>rbcbuilders70@gmail.com</span>
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* INTERACTIVE INVESTMENT & SCHEDULE CALCULATOR                 */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-8 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calculator size={15} className="text-accent" />
                <h4 className="font-serif text-lg text-foreground font-normal">
                  Calculate Estimated Investment
                </h4>
              </div>
              <p className="text-xs text-foreground/75 font-light leading-relaxed mb-4">
                Slide to adjust your proposed gross floor area and view realistic turn-key budget parameters for {selectedLocation}.
              </p>

              {/* Slider & Location Select */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-muted uppercase tracking-wider">
                      Target Gross Floor Area:
                    </span>
                    <span className="text-accent font-bold text-sm">
                      {floorArea} m² ({Math.round(floorArea * 10.764)} sq ft)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="600"
                    step="10"
                    value={floorArea}
                    onChange={(e) => setFloorArea(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer h-2 bg-border/60 rounded-lg"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-muted mt-1">
                    <span>Compact (120 m²)</span>
                    <span>Standard Villa (240 m²)</span>
                    <span>Grand Estate (600 m²)</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono text-muted block mb-1">
                    Project Site Location:
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-surface border border-border text-foreground text-xs rounded-xl px-3 py-2 font-mono focus:border-accent focus:outline-none"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Estimated Total Card */}
            <div className="bg-surface p-6 rounded-2xl border border-border shadow-md shrink-0 lg:w-80 flex flex-col justify-between">
              <div>
                <span className="text-[9.5px] uppercase tracking-wider font-mono text-muted block">
                  Estimated Total Investment Range
                </span>
                <div className="font-serif text-2xl sm:text-3xl text-accent font-semibold tracking-tight my-1">
                  {formatPHP(minEstimatedCost)}
                  {activeTier.maxRate ? (
                    <span className="text-lg font-light text-foreground/80 block">
                      to {formatPHP(maxEstimatedCost)}
                    </span>
                  ) : (
                    <span className="text-xs font-light text-muted block mt-0.5">
                      Starting parameter
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted font-mono mt-2 pt-2 border-t border-border/60">
                  <Calendar size={13} className="text-accent" />
                  <span>Estimated Schedule: {estimatedMonths} Months</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <a
                  href="#contact"
                  className="w-full btn btn--accent rounded-full py-2.5 text-[11px] uppercase tracking-[0.16em] shadow-xs flex items-center justify-center gap-2 font-medium"
                >
                  <span>Request Itemized BOQ</span>
                  <ArrowRight size={13} />
                </a>
                <span className="text-[9px] text-center block text-muted font-mono">
                  Includes complete architectural &amp; engineering drawings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FULL SIDE-BY-SIDE SPECIFICATION COMPARISON MATRIX              */}
        {/* ============================================================== */}
        {showMatrix && (
          <div className="rounded-3xl bg-surface border border-border shadow-xl p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-accent font-semibold">
                  Comprehensive Comparison Matrix
                </span>
                <h3 className="font-serif text-2xl text-foreground font-normal tracking-tight mt-1">
                  Exact Specifications Across All 4 Tiers
                </h3>
              </div>
              <span className="text-xs text-muted font-mono">
                House Construction Cost in Pampanga &middot; Central Luzon
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-muted font-semibold w-1/5">
                      Category
                    </th>
                    {FINISH_GRADES.map((g) => (
                      <th
                        key={g.id}
                        className={`py-3.5 px-4 font-serif text-sm font-normal w-1/5 ${
                          g.id === activeTier.id
                            ? "bg-accent/10 text-accent font-medium rounded-t-xl"
                            : "text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>{g.name}</span>
                          {g.popular && (
                            <span className="text-[7.5px] uppercase font-mono px-1.5 py-0.2 rounded-full bg-accent text-white font-bold">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="font-serif text-xs text-accent block mt-0.5 font-medium">
                          {g.rateDisplay} / m²
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {SPEC_CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <tr key={cat.key}>
                        <td className="py-3 px-4 font-mono text-[10.5px] text-muted font-semibold">
                          <div className="flex items-center gap-1.5">
                            <IconComponent size={12} className="text-accent" />
                            <span>{cat.label}</span>
                          </div>
                        </td>
                        {FINISH_GRADES.map((g) => (
                          <td
                            key={g.id}
                            className={`py-3 px-4 leading-relaxed font-light ${
                              g.id === activeTier.id ? "bg-accent/5 font-medium text-foreground" : "text-foreground/85"
                            }`}
                          >
                            {g.specifications[cat.key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Milestone Guarantee Footnote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted font-mono pt-4 border-t border-border/60 gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-accent" />
            <span>
              All rates include PRC-Licensed Civil, Structural &amp; Electrical Engineering Blueprints.
            </span>
          </div>
          <span>San Fernando &middot; Angeles City &middot; Clark &middot; Subic</span>
        </div>
      </div>
    </section>
  );
}
