"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Calculator, ShieldCheck, Sparkles, ArrowDown, Layers, Compass } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

// Dynamically load 3D Canvas with ssr: false
const Mansion3DScene = dynamic(() => import("./Mansion3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-gradient-to-b from-[#f9f7f2] to-[#f2ede4] text-muted text-xs font-mono gap-3 p-8">
      <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span>Initializing 3D Architectural Mansion Engine...</span>
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
    railings: string;
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
      railings: "Structural steel perimeter safety framing / rough site enclosure",
    },
  },
  {
    id: "standard",
    stageNum: 2,
    code: "GRADE 02",
    number: "02",
    name: "Standard Architecture",
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
      railings: "Modern painted steel balustrades & standard entry gate",
    },
  },
  {
    id: "premium",
    stageNum: 3,
    code: "GRADE 03",
    number: "03",
    name: "Premium Architectural",
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
      railings: "Tempered glass balustrades & architectural motorized gate",
    },
  },
  {
    id: "luxury",
    stageNum: 4,
    code: "GRADE 04",
    number: "04",
    name: "Luxury Masterpiece",
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
      railings: "Frameless laminated glass balustrades & custom acoustic timber-slat gate",
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
  const pinTrackRef = useRef<HTMLDivElement | null>(null);

  // Continuous 3D build progress (0.0 = nothing/ground site, 1.0 = Bare Shell, 2.0 = Standard, 3.0 = Premium, 4.0 = Luxury)
  const [buildProgress, setBuildProgress] = useState<number>(3.0);
  const [currentTierIndex, setCurrentTierIndex] = useState<number>(2); // 0 to 3
  const [scrollPercent, setScrollPercent] = useState<number>(0.75); // 0.0 to 1.0
  const [floorArea, setFloorArea] = useState<number>(240);
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATIONS[0]);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  const activeTier = FINISH_GRADES[currentTierIndex] || FINISH_GRADES[2];

  // Pinned In-Place Scroll Timing Engine:
  // When the user scrolls into the section, it locks in place for the full build evolution
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!pinTrackRef.current) return;

      const rect = pinTrackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;

      if (totalScrollableDistance <= 0) return;

      // How much the top of the track has scrolled past the top of the viewport
      const scrolledPast = -rect.top;
      const rawProgress = Math.min(Math.max(scrolledPast / totalScrollableDistance, 0), 1);
      setScrollPercent(rawProgress);

      // EXACT TIMING PHYSICS:
      // 0.00 - 0.12 : Empty Ground & Foundation Excavation (3D progress 0.0 -> 0.3)
      // 0.12 - 0.36 : 01 BARE SHELL Structural Skeleton (3D progress 0.3 -> 1.0)
      // 0.36 - 0.62 : 02 STANDARD Enclosure Walls & Windows (3D progress 1.0 -> 2.0)
      // 0.62 - 0.85 : 03 PREMIUM Timber Slats, Bronze & Stone (3D progress 2.0 -> 3.0)
      // 0.85 - 1.00 : 04 LUXURY Cantilever, Marble, Pool & Glow (3D progress 3.0 -> 4.0)
      // > 1.00 : Section releases and page scrolls down naturally!
      let mapped3DProgress = 0;
      let activeIdx = 0;

      if (rawProgress < 0.12) {
        // From nothing to foundation slab
        mapped3DProgress = (rawProgress / 0.12) * 0.35;
        activeIdx = 0;
      } else if (rawProgress < 0.36) {
        // Stage 01: Bare Shell
        mapped3DProgress = 0.35 + ((rawProgress - 0.12) / 0.24) * 0.65; // reaches 1.0
        activeIdx = 0;
      } else if (rawProgress < 0.62) {
        // Stage 02: Standard
        mapped3DProgress = 1.0 + ((rawProgress - 0.36) / 0.26) * 1.0; // reaches 2.0
        activeIdx = 1;
      } else if (rawProgress < 0.85) {
        // Stage 03: Premium
        mapped3DProgress = 2.0 + ((rawProgress - 0.62) / 0.23) * 1.0; // reaches 3.0
        activeIdx = 2;
      } else {
        // Stage 04: Luxury
        mapped3DProgress = 3.0 + ((rawProgress - 0.85) / 0.15) * 1.0; // reaches 4.0
        activeIdx = 3;
      }

      setBuildProgress(mapped3DProgress);
      setCurrentTierIndex(activeIdx);
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
    // Initial calculation on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Manual jump by clicking any of the 01-04 tabs
  const jumpToStage = useCallback((tierIndex: number) => {
    if (!pinTrackRef.current) return;
    const rect = pinTrackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const viewportHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - viewportHeight;

    // Percentages mapped to stage sweet-spots
    const targetPercentages = [0.22, 0.48, 0.74, 0.94];
    const targetScrollY = trackTop + targetPercentages[tierIndex] * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, []);

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
    <section ref={sectionRef} id="pricing" className="bg-background relative border-t border-border">
      {/* Anchor alias */}
      <div id="specifications" className="sr-only" />

      {/* ============================================================== */}
      {/* PINNED IN-PLACE SCROLL TRACK CONTAINER (Locks for 380vh)       */}
      {/* Builds mansion from nothing -> foundation -> finished mansion   */}
      {/* Once 100% complete, it naturally scrolls down to next sections */}
      {/* ============================================================== */}
      <div ref={pinTrackRef} className="relative h-[380vh]">
        {/* Sticky Viewport Stage: Pinned on Screen with navbar safe top padding */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-background px-3 sm:px-8 pt-20 sm:pt-22 lg:pt-24 pb-3 sm:pb-4 z-20">
          <div className="mx-auto max-w-7xl w-full flex flex-col h-full justify-between">
            {/* Top Bar: Section Title, Progress Track & 01-04 Stage Tabs */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-2.5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[9px] uppercase tracking-[0.22em] font-medium font-mono">
                    <Compass size={11} />
                    <span>In-Place Architectural Build Progression</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight mt-0.5">
                    Watch the Mansion Form As You Scroll
                  </h2>
                </div>

                {/* Progress Percentage Indicator */}
                <div className="flex items-center gap-2.5 bg-surface px-3 py-1.5 rounded-2xl border border-border shadow-2xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] uppercase tracking-wider text-muted font-mono">
                      Mansion Formation
                    </span>
                    <span className="font-mono text-xs font-semibold text-accent">
                      {Math.round(scrollPercent * 100)}% Complete
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-16 h-2 bg-border/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-150 rounded-full"
                      style={{ width: `${Math.round(scrollPercent * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 01 till 04 Stage Selection Bar (Matching Image 2 Specification Standards) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {FINISH_GRADES.map((grade, idx) => {
                  const isActive = currentTierIndex === idx;
                  return (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => jumpToStage(idx)}
                      className={`text-left p-2 sm:p-2.5 rounded-xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? "bg-surface border-accent shadow-md ring-1 ring-accent"
                          : "bg-surface/50 border-border hover:border-accent/40"
                      }`}
                    >
                      {grade.popular && (
                        <span className="absolute -top-2 right-2 inline-flex items-center gap-0.5 text-[7px] uppercase tracking-widest bg-accent text-white px-2 py-0.5 font-bold rounded-full shadow-2xs">
                          <Sparkles size={7} />
                          <span>Most Popular</span>
                        </span>
                      )}

                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                          {grade.number} &middot; {grade.subtitle}
                        </span>
                        <h4 className="font-serif text-sm sm:text-base text-foreground font-normal tracking-tight">
                          {grade.name}
                        </h4>
                      </div>

                      <div className="font-serif text-xs sm:text-sm text-accent font-medium mt-1 truncate">
                        {grade.rateDisplay}{" "}
                        <span className="text-[9px] text-muted font-sans font-light">/ m&sup2;</span>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-border/50 text-[8.5px] uppercase tracking-wider font-mono">
                        <span className={isActive ? "text-accent font-bold" : "text-muted"}>
                          {isActive ? "Active Grade \u2713" : "Select Tier"}
                        </span>
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive ? "bg-accent" : "bg-border"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Row: Side-by-Side 3D Real Mansion + Live Stage Specifications Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 flex-1 min-h-0 w-full my-1.5 sm:my-2 items-stretch">
              {/* Left Column (7 cols): 3D Mansion Canvas Stage */}
              <div className="lg:col-span-7 xl:col-span-7 relative w-full h-[280px] sm:h-[340px] lg:h-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#f9f7f2] via-[#f5f0e6] to-[#ece5d8] border border-border shadow-xl overflow-hidden flex flex-col">
                <Mansion3DScene progress={buildProgress} />

                {/* Live Architectural Stage Callout Banner over 3D Canvas */}
                <div className="absolute top-3 left-3 pointer-events-none z-10 flex flex-col gap-1 max-w-[260px] sm:max-w-xs">
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-black/5 shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[9.5px] uppercase tracking-wider font-mono text-accent font-bold truncate">
                      {buildProgress < 0.35
                        ? "SITE SURVEY & EXCAVATION"
                        : `${activeTier.code} · ${activeTier.subtitle.toUpperCase()}`}
                    </span>
                  </div>
                </div>

                {/* Scroll Guidance Indicator */}
                <div className="absolute bottom-3 left-3 pointer-events-none z-10 hidden sm:flex items-center gap-2 text-muted text-[9.5px] font-mono bg-white/85 px-3 py-1 rounded-full border border-border backdrop-blur-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>
                    {scrollPercent < 0.96
                      ? "Scroll in place to form mansion ↓"
                      : "Mansion fully assembled! Scroll down to estimate costs ↓"}
                  </span>
                </div>
              </div>

              {/* Right Column (5 cols): Live Specifications & Price Dossier Beside the Mansion */}
              <div className="lg:col-span-5 xl:col-span-5 relative w-full h-full rounded-2xl sm:rounded-3xl bg-surface/95 backdrop-blur-md border border-border shadow-xl p-3.5 sm:p-5 flex flex-col justify-between overflow-y-auto lg:overflow-hidden min-h-0">
                {/* Header: Stage Code, Name, Price, and Tagline (Matching Image 2 Specification Standard) */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-[9px] uppercase tracking-[0.18em] font-mono font-medium">
                      <span>@ Specification Standards &middot; Central Luzon</span>
                    </div>

                    {activeTier.popular ? (
                      <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-widest bg-accent text-white px-2.5 py-0.5 font-bold rounded-full shadow-2xs">
                        <Sparkles size={8} />
                        <span>Most Popular</span>
                      </span>
                    ) : (
                      <span className="text-[9.5px] font-mono text-muted uppercase tracking-wider">
                        {activeTier.code} &middot; Stage {activeTier.stageNum} of 04
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between gap-2 mt-1">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight">
                        {activeTier.name}
                      </h3>
                      <span className="text-[11px] text-muted font-light font-sans">
                        ({activeTier.subtitle})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xl sm:text-2xl text-accent font-semibold tracking-tight">
                        {activeTier.rateDisplay}
                      </span>
                      <span className="text-[9.5px] font-sans text-muted font-light block">
                        / m² gross floor area
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-foreground/75 font-light leading-relaxed mt-1">
                    {activeTier.tagline}
                  </p>
                </div>

                {/* Modular Specification Inclusions (The Contents per 01 to 04) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 my-2 flex-1 min-h-0">
                  {/* Ceiling */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80 flex flex-col justify-start">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold mb-0.5">
                      Ceiling Architecture
                    </span>
                    <span className="text-[10.5px] text-foreground/85 leading-snug font-light">
                      {activeTier.specifications.ceiling}
                    </span>
                  </div>

                  {/* Fenestration */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80 flex flex-col justify-start">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold mb-0.5">
                      Fenestration &amp; Glass
                    </span>
                    <span className="text-[10.5px] text-foreground/85 leading-snug font-light">
                      {activeTier.specifications.windows}
                    </span>
                  </div>

                  {/* Flooring */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80 flex flex-col justify-start">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold mb-0.5">
                      Flooring &amp; Surfaces
                    </span>
                    <span className="text-[10.5px] text-foreground/85 leading-snug font-light">
                      {activeTier.specifications.flooring}
                    </span>
                  </div>

                  {/* Doors */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80 flex flex-col justify-start">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold mb-0.5">
                      Doors &amp; Hardware
                    </span>
                    <span className="text-[10.5px] text-foreground/85 leading-snug font-light">
                      {activeTier.specifications.doors}
                    </span>
                  </div>

                  {/* Walls */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80 flex flex-col justify-start">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold mb-0.5">
                      Walls &amp; Cladding
                    </span>
                    <span className="text-[10.5px] text-foreground/85 leading-snug font-light">
                      {activeTier.specifications.walls}
                    </span>
                  </div>

                  {/* Fixtures */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-background/80 border border-border/80 flex flex-col justify-start">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold mb-0.5">
                      Fixtures &amp; MEP
                    </span>
                    <span className="text-[10.5px] text-foreground/85 leading-snug font-light">
                      {activeTier.specifications.fixtures}
                    </span>
                  </div>
                </div>

                {/* Railings & Materials Section */}
                <div className="pt-1.5 border-t border-border/60">
                  <div className="flex items-center gap-1.5 text-[10px] text-foreground/80 font-light mb-1.5">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-accent font-semibold shrink-0">
                      Railings &amp; Gate:
                    </span>
                    <span className="truncate">{activeTier.specifications.railings}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[8.5px] uppercase tracking-wider font-mono text-muted mr-1">
                      Materials:
                    </span>
                    {activeTier.materials.map((mat) => (
                      <span
                        key={mat.name}
                        className="text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/10 text-accent font-mono border border-accent/20"
                      >
                        {mat.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Stage Actions */}
                <div className="flex items-center gap-2 pt-2.5">
                  <a
                    href="#cost-estimator"
                    className="flex-1 btn btn--accent rounded-full py-2 text-[10px] uppercase tracking-[0.16em] shadow-xs flex items-center justify-center gap-1.5 font-medium"
                  >
                    <span>Estimate {activeTier.name}</span>
                    <ArrowDown size={11} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowMatrix((v) => !v)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-[10px] uppercase tracking-[0.16em] border border-border text-foreground hover:border-accent hover:text-accent bg-background transition-all cursor-pointer font-medium"
                  >
                    <Layers size={10} className="text-accent" />
                    <span>{showMatrix ? "Hide Matrix" : "Matrix"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Live Phase Indicator */}
            <div className="flex items-center justify-between text-[10px] text-muted font-mono pt-1">
              <span>
                Active Phase: Stage {activeTier.number} &middot; {activeTier.subtitle}
              </span>
              <span className="hidden sm:inline">
                San Fernando, Pampanga &middot; Turnkey Design-Build Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* COMPARATIVE SPECIFICATION MATRIX MODAL / DRAWER                */}
      {/* ============================================================== */}
      {showMatrix && (
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 animate-in fade-in slide-in-from-top-4 duration-400 overflow-x-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-accent/30 shadow-xl">
            <div className="mb-4">
              <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                Comparative Specification Matrix (01 till 04)
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
                <tr>
                  <td className="py-2.5 px-4 font-medium text-foreground">Railings &amp; Gate</td>
                  <td className="py-2.5 px-4">Steel perimeter frame</td>
                  <td className="py-2.5 px-4">Modern painted steel &amp; gate</td>
                  <td className="py-2.5 px-4 bg-accent/5">Tempered glass &amp; motorized gate</td>
                  <td className="py-2.5 px-4">Frameless laminated glass &amp; acoustic timber gate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. INTERACTIVE ARCHITECTURAL INVESTMENT ESTIMATOR               */}
      {/* (Scrolled to after the mansion finishes assembling!)           */}
      {/* ============================================================== */}
      <div id="cost-estimator" className="mx-auto max-w-7xl px-4 sm:px-8 py-20">
        <div data-reveal className="p-8 sm:p-12 bg-surface border border-border relative overflow-hidden rounded-3xl shadow-sm">
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
