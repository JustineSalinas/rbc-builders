"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Calculator, ShieldCheck, Sparkles, ArrowDown, ChevronDown, ChevronUp, Layers, Compass, RotateCw } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

// Dynamically load 3D Canvas with ssr: false to prevent hydration/canvas issues
const Mansion3DScene = dynamic(() => import("./Mansion3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-gradient-to-b from-[#f9f7f2] to-[#f2ede4] text-muted text-xs font-mono gap-3 p-8">
      <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span>Loading 3D Architectural Mansion Engine...</span>
    </div>
  ),
});

type FinishGrade = {
  id: string;
  stageNum: number;
  code: string;
  number: string;
  name: string;
  subtitle: string;
  minRate: number;
  maxRate: number | null;
  rateDisplay: string;
  tagline: string;
  popular?: boolean;
  materials: { name: string; category: string }[];
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
    stageNum: 1,
    code: "GRADE 01",
    number: "01",
    name: "Bare Shell",
    subtitle: "Structural Core",
    minRate: 18000,
    maxRate: 20000,
    rateDisplay: "₱18,000 – ₱20,000",
    tagline: "Reinforced structural concrete framing, weather-tight perimeter shell, and primary rough MEP conduit.",
    materials: [
      { name: "28 MPa Concrete", category: "Structural Frame" },
      { name: "Grade 60 PNS Rebar", category: "Reinforcement" },
      { name: "Power-Troweled Screed", category: "Floor Surface" },
    ],
    specifications: {
      ceiling: "Exposed reinforced slab or basic flat board ready for soffit framing",
      windows: "Jalousie or standard heavy-gauge steel casements",
      doors: "Flush hollow core timber with standard cylindrical locksets",
      flooring: "Power-troweled smooth cement screed ready for custom tile overlay",
      walls: "Plastered reinforced concrete masonry ready for primer & paint",
      fixtures: "Economic sanitary rough-in & primary electrical conduit lines",
    },
  },
  {
    id: "standard",
    stageNum: 2,
    code: "GRADE 02",
    number: "02",
    name: "Standard",
    subtitle: "Turnkey Contemporary",
    minRate: 20000,
    maxRate: 25000,
    rateDisplay: "₱20,000 – ₱25,000",
    tagline: "Complete move-in contemporary home with painted interiors, recessed illumination, and ceramic tiling.",
    materials: [
      { name: "Flat Gypsum Board", category: "Ceiling System" },
      { name: "UPVC / Powder Aluminum", category: "Fenestration" },
      { name: "60×60 Polished Ceramic", category: "Floor Tile" },
    ],
    specifications: {
      ceiling: "Flat gypsum board with modern recessed LED warm downlights",
      windows: "White powder-coated aluminum or thermal UPVC casement windows",
      doors: "Engineered wood with contemporary stainless lever hardware",
      flooring: "60×60cm high-gloss polished ceramic floor tiles",
      walls: "Two-coat premium latex paint with subtle tone-on-tone accents",
      fixtures: "Standard American Standard / Pozzi plumbing & electrical switches",
    },
  },
  {
    id: "premium",
    stageNum: 3,
    code: "GRADE 03",
    number: "03",
    name: "Premium",
    subtitle: "Signature Architectural",
    popular: true,
    minRate: 25000,
    maxRate: 29000,
    rateDisplay: "₱25,000 – ₱29,000",
    tagline: "Our most requested specification in Pampanga. Textured wood-slats, Analok bronze, and porcelain slabs.",
    materials: [
      { name: "Textured Slat Panels", category: "Wall Accents" },
      { name: "Analok Bronze Glass", category: "Heavy Glazing" },
      { name: "60×120 Porcelain Slabs", category: "Stone Floor" },
    ],
    specifications: {
      ceiling: "Textured PVC / acoustic wood-slat accent panels with perimeter LED lighting",
      windows: "Analok bronze heavy-gauge aluminum sliding fenestration with tinted glass",
      doors: "Solid core hardwood entrance pivot door with digital lock preparation",
      flooring: "Imported 60×120cm large-format porcelain slabs or engineered timber",
      walls: "Hand-laid natural stacked-stone exterior & textured interior feature walls",
      fixtures: "Semi-luxury Kohler / Hansgrohe designer plumbing fixtures",
    },
  },
  {
    id: "luxury",
    stageNum: 4,
    code: "GRADE 04",
    number: "04",
    name: "Luxury",
    subtitle: "Bespoke Masterpiece",
    minRate: 29000,
    maxRate: null,
    rateDisplay: "₱29,000+",
    tagline: "High-end imported finishes, floating multi-tier cove illumination, and panoramic floor-to-ceiling glass.",
    materials: [
      { name: "Floating Cove Ceilings", category: "Multi-Tier Ceiling" },
      { name: "Thermal-Break Glass", category: "Full Facade" },
      { name: "Sintered Stone Slabs", category: "Luxury Cladding" },
    ],
    specifications: {
      ceiling: "Multi-tier floating cove ceilings with indirect channel lighting & acoustic timber",
      windows: "Thermal-break powder-coated floor-to-ceiling sliding glass fenestration",
      doors: "Custom oversized solid mahogany or teakwood architectural pivot doors",
      flooring: "Seamless large-format sintered stone slabs & solid hardwood parquet",
      walls: "Full-height natural marble veneers, fluted acoustic PVC & microcement",
      fixtures: "Full luxury Toto / Grohe sanitary fixtures & smart home automation pre-wire",
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
  const stageSectionRef = useRef<HTMLDivElement | null>(null);

  const [currentStage, setCurrentStage] = useState<number>(3); // Default to Premium (Stage 3)
  const [floorArea, setFloorArea] = useState<number>(240);
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATIONS[0]);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [isUserScrubbing, setIsUserScrubbing] = useState<boolean>(false);

  const activeTier = FINISH_GRADES[currentStage - 1] || FINISH_GRADES[2];

  // Scroll observer to advance mansion stages smoothly as user scrolls past the stage section
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isUserScrubbing) return;
      if (!stageSectionRef.current) return;

      const rect = stageSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // When the section is in the middle of viewport
      if (rect.top <= viewportHeight * 0.65 && rect.bottom >= viewportHeight * 0.35) {
        const totalScrollable = rect.height;
        const currentScrolled = viewportHeight * 0.65 - rect.top;
        const progress = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);

        let targetStage = 1;
        if (progress > 0.72) targetStage = 4;
        else if (progress > 0.45) targetStage = 3;
        else if (progress > 0.18) targetStage = 2;
        else targetStage = 1;

        if (targetStage !== currentStage) {
          setCurrentStage(targetStage);
        }
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentStage, isUserScrubbing]);

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
    <section ref={sectionRef} id="pricing" className="py-24 sm:py-32 px-4 sm:px-8 bg-background relative border-t border-border">
      {/* Anchor alias for backwards compatibility */}
      <div id="specifications" className="sr-only" />
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] uppercase tracking-[0.24em] font-medium font-mono">
              <Compass size={12} />
              <span>3D Construction Evolution &middot; 01 till 04</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              The Real Mansion Assembly
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            Watch a luxury modern villa structure take shape from raw reinforced concrete into an architectural masterpiece. Scroll or select 01 through 04 below to inspect real-time construction specifications.
          </p>
        </div>

        {/* 1. Interactive 01 till 04 Grade Stepper Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {FINISH_GRADES.map((grade) => {
            const isSelected = currentStage === grade.stageNum;
            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => {
                  setIsUserScrubbing(true);
                  setCurrentStage(grade.stageNum);
                  setTimeout(() => setIsUserScrubbing(false), 800);
                }}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-surface border-accent shadow-xl shadow-accent/10 ring-2 ring-accent"
                    : "bg-surface/60 border-border hover:border-accent/40 hover:bg-surface"
                }`}
              >
                {/* Popular Badge */}
                {grade.popular && (
                  <span className="absolute top-3 right-3 hidden sm:inline-flex items-center gap-1 text-[8px] uppercase tracking-[0.16em] bg-accent text-white px-2 py-0.5 font-semibold rounded-full shadow-xs">
                    <Sparkles size={8} />
                    <span>Popular</span>
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                      {grade.number}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-[9.5px] uppercase tracking-wider text-muted font-medium truncate">
                      {grade.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-foreground font-normal mb-1">
                    {grade.name}
                  </h3>

                  <div className="font-serif text-base sm:text-lg text-accent font-medium">
                    {grade.rateDisplay}
                    <span className="text-[10px] font-sans text-muted font-light ml-1">/ m²</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs mt-3">
                  <span className={`text-[10px] uppercase tracking-[0.16em] font-medium transition-colors ${
                    isSelected ? "text-accent font-semibold" : "text-muted"
                  }`}>
                    {isSelected ? "Active Stage ✓" : "Select Stage"}
                  </span>
                  <div className={`h-2 w-2 rounded-full transition-all ${
                    isSelected ? "bg-accent scale-125 animate-pulse" : "bg-border"
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Real Mansion 3D Studio Showcase (Forms 01 till 04) */}
        <div
          ref={stageSectionRef}
          data-reveal
          className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-surface border border-accent/30 shadow-2xl mb-14 overflow-hidden relative"
        >
          {/* Top Stage Bar: Stage Indicator & 3D Interactive Notice */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-border/80">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                BUILD STAGE {activeTier.number} &middot; {activeTier.name.toUpperCase()} SPECIFICATION
              </span>
              <span className="text-xs text-muted hidden sm:inline">&middot; {activeTier.subtitle}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted font-mono bg-background px-3 py-1.5 rounded-full border border-border">
              <RotateCw size={12} className="text-accent" />
              <span>Interactive 3D Mansion: Drag to Orbit 360&deg;</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: 3D Real Mansion Canvas */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl bg-gradient-to-b from-[#f9f7f2] via-[#f5f0e6] to-[#ece5d8] border border-border overflow-hidden shadow-inner">
                {/* 3D Real Mansion Engine */}
                <Mansion3DScene stage={currentStage} />

                {/* Floating Architectural Stage Badge in Canvas */}
                <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1">
                  <span className="text-[9.5px] uppercase tracking-widest font-mono text-accent font-bold bg-white/90 px-3 py-1 rounded-full border border-accent/30 shadow-xs backdrop-blur-sm">
                    {activeTier.code} &middot; {activeTier.subtitle.toUpperCase()}
                  </span>
                  <span className="font-serif text-lg text-foreground font-medium bg-white/80 px-3 py-0.5 rounded-md w-fit border border-black/5">
                    {activeTier.rateDisplay} <span className="text-xs font-sans text-muted">/ m²</span>
                  </span>
                </div>
              </div>

              {/* Real-time Material Swatch Palette */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono mb-2">
                  Material Palette Deployed in Stage {activeTier.number}:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeTier.materials.map((mat) => (
                    <div
                      key={mat.name}
                      className="p-3 rounded-xl bg-background border border-border/80 flex flex-col justify-between"
                    >
                      <span className="text-[8.5px] uppercase tracking-wider text-muted font-mono">
                        {mat.category}
                      </span>
                      <span className="text-xs text-foreground font-medium mt-0.5">
                        {mat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Specifications Monograph & Action */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-mono font-medium block mb-1">
                  Turnkey Deliverables &amp; Inclusions
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-light mb-1">
                  {activeTier.name} Architecture
                </h3>

                <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed mb-6">
                  {activeTier.tagline}
                </p>

                {/* Categorized Specifications Cards */}
                <div className="space-y-3 mb-6">
                  {/* Ceiling & Lighting */}
                  <div className="p-3.5 rounded-xl bg-background border border-border/70 flex flex-col gap-1">
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Ceiling &amp; Illumination
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.ceiling}
                    </p>
                  </div>

                  {/* Fenestration & Glass */}
                  <div className="p-3.5 rounded-xl bg-background border border-border/70 flex flex-col gap-1">
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Fenestration &amp; Glass Openings
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.windows}
                    </p>
                  </div>

                  {/* Flooring & Surfaces */}
                  <div className="p-3.5 rounded-xl bg-background border border-border/70 flex flex-col gap-1">
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Flooring, Walls &amp; Exterior Stone
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.flooring}; {activeTier.specifications.walls}
                    </p>
                  </div>

                  {/* Doors & MEP Fixtures */}
                  <div className="p-3.5 rounded-xl bg-background border border-border/70 flex flex-col gap-1">
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Doors, Hardware &amp; Sanitary Fixtures
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.doors}; {activeTier.specifications.fixtures}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                <a
                  href="#cost-estimator"
                  className="btn btn--accent rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] shadow-sm flex items-center gap-2"
                >
                  <span>Estimate This Stage</span>
                  <ArrowDown size={13} />
                </a>

                <button
                  type="button"
                  onClick={() => setShowMatrix((v) => !v)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] border border-border text-foreground hover:border-accent hover:text-accent bg-background transition-all cursor-pointer"
                >
                  <Layers size={12} className="text-accent" />
                  <span>{showMatrix ? "Hide Matrix" : "Compare 01–04"}</span>
                  {showMatrix ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>
            </div>
          </div>

          {/* Optional Comparative Specification Matrix Drawer */}
          {showMatrix && (
            <div className="mt-8 pt-8 border-t border-border animate-in fade-in slide-in-from-top-4 duration-400 overflow-x-auto">
              <div className="mb-4">
                <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                  Comparative Specification Matrix
                </h4>
                <p className="text-xs text-muted font-light mt-1">
                  Detailed side-by-side comparison across all four build standards.
                </p>
              </div>

              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-border text-accent uppercase tracking-widest text-[9.5px] font-mono">
                    <th className="py-2.5 px-4">Component</th>
                    <th className="py-2.5 px-4">01 Bare Shell</th>
                    <th className="py-2.5 px-4">02 Standard</th>
                    <th className="py-2.5 px-4 bg-accent/5">03 Premium (Popular)</th>
                    <th className="py-2.5 px-4">04 Luxury</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-foreground/80 font-light">
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Rate / m²</td>
                    <td className="py-2.5 px-4 font-serif text-accent">₱18k – ₱20k</td>
                    <td className="py-2.5 px-4 font-serif text-accent">₱20k – ₱25k</td>
                    <td className="py-2.5 px-4 font-serif text-accent font-medium bg-accent/5">₱25k – ₱29k</td>
                    <td className="py-2.5 px-4 font-serif text-accent font-medium">₱29k+</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Ceiling</td>
                    <td className="py-2.5 px-4">Exposed slab / flat board</td>
                    <td className="py-2.5 px-4">Gypsum + recessed LED</td>
                    <td className="py-2.5 px-4 bg-accent/5">Textured PVC / wood slats</td>
                    <td className="py-2.5 px-4">Multi-tier floating cove</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Windows</td>
                    <td className="py-2.5 px-4">Jalousie / steel casement</td>
                    <td className="py-2.5 px-4">White UPVC / aluminum</td>
                    <td className="py-2.5 px-4 bg-accent/5">Analok bronze sliding</td>
                    <td className="py-2.5 px-4">Thermal floor-to-ceiling glass</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Flooring</td>
                    <td className="py-2.5 px-4">Smooth cement screed</td>
                    <td className="py-2.5 px-4">60×60 polished ceramic</td>
                    <td className="py-2.5 px-4 bg-accent/5">60×120 porcelain slabs</td>
                    <td className="py-2.5 px-4">Sintered stone &amp; parquet</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Doors</td>
                    <td className="py-2.5 px-4">Flush hollow core</td>
                    <td className="py-2.5 px-4">Engineered wood</td>
                    <td className="py-2.5 px-4 bg-accent/5">Solid hardwood pivot door</td>
                    <td className="py-2.5 px-4">Custom oversized mahogany</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Walls</td>
                    <td className="py-2.5 px-4">Plastered concrete</td>
                    <td className="py-2.5 px-4">Two-coat latex paint</td>
                    <td className="py-2.5 px-4 bg-accent/5">Stacked natural stone</td>
                    <td className="py-2.5 px-4">Natural marble veneers</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-foreground">Fixtures</td>
                    <td className="py-2.5 px-4">Economic rough-in</td>
                    <td className="py-2.5 px-4">American Standard / Pozzi</td>
                    <td className="py-2.5 px-4 bg-accent/5">Kohler / Hansgrohe</td>
                    <td className="py-2.5 px-4">Toto / Grohe + Smart Home</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 3. Interactive Architectural Investment Estimator */}
        <div id="cost-estimator" data-reveal data-reveal-delay="0.15" className="p-8 sm:p-12 bg-surface border border-border relative overflow-hidden rounded-3xl shadow-sm">
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
                      className={`text-left px-3.5 py-2 text-xs border rounded-lg transition-colors cursor-pointer ${
                        selectedLocation === loc
                          ? "border-accent bg-accent/10 text-accent font-medium"
                          : "border-border text-foreground/70 hover:border-accent/40"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="p-4 bg-background border border-border rounded-xl text-xs text-foreground/75 font-light leading-relaxed flex items-center gap-3">
                <ShieldCheck size={20} className="text-accent shrink-0" />
                <span>
                  Estimates include architectural plans, structural engineering calculations, labor, material procurement, LGU building permits, and turnkey site supervision.
                </span>
              </div>
            </div>

            {/* Calculations Display Right Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-background border border-accent/40 rounded-2xl shadow-xl flex flex-col justify-between">
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
                  Based on <strong>{activeTier.name} ({activeTier.subtitle})</strong> rate of {activeTier.rateDisplay} / m² in {selectedLocation}.
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
                className="w-full text-center py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-white hover:bg-accent-dim transition-colors flex items-center justify-center gap-2 rounded-xl shadow-sm"
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
