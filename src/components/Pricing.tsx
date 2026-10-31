"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Calculator, ShieldCheck, Sparkles, ArrowDown, ChevronDown, ChevronUp, Layers, Compass } from "lucide-react";
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
        {/* Sticky Viewport Stage: Pinned on Screen */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-background px-4 sm:px-8 py-5 z-20">
          <div className="mx-auto max-w-7xl w-full flex flex-col h-full justify-between">
            {/* Top Bar: Section Title, Progress Track & 01-04 Buttons */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[9.5px] uppercase tracking-[0.22em] font-medium font-mono">
                    <Compass size={11} />
                    <span>In-Place Architectural Build Progression</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground tracking-tight leading-tight mt-1">
                    Watch the Mansion Form As You Scroll
                  </h2>
                </div>

                {/* Progress Percentage Indicator */}
                <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded-2xl border border-border shadow-xs">
                  <div className="flex flex-col text-right">
                    <span className="text-[9.5px] uppercase tracking-wider text-muted font-mono">
                      Mansion Formation
                    </span>
                    <span className="font-mono text-xs font-semibold text-accent">
                      {Math.round(scrollPercent * 100)}% Complete
                    </span>
                  </div>
                  {/* Circular / Bar progress */}
                  <div className="w-16 h-2 bg-border/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-150 rounded-full"
                      style={{ width: `${Math.round(scrollPercent * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 01 till 04 Stage Selection Bar */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {FINISH_GRADES.map((grade, idx) => {
                  const isActive = currentTierIndex === idx;
                  return (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => jumpToStage(idx)}
                      className={`text-left p-2.5 sm:p-3.5 rounded-xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? "bg-surface border-accent shadow-md ring-1 ring-accent"
                          : "bg-surface/50 border-border hover:border-accent/40"
                      }`}
                    >
                      {grade.popular && (
                        <span className="absolute -top-1.5 right-2 hidden md:inline-flex items-center gap-0.5 text-[7.5px] uppercase tracking-widest bg-accent text-white px-2 py-0.2 font-semibold rounded-full shadow-xs">
                          <Sparkles size={7} />
                          <span>Popular</span>
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                          {grade.number}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider text-foreground font-medium hidden sm:inline truncate">
                          {grade.name}
                        </span>
                      </div>

                      <div className="font-serif text-xs sm:text-sm text-accent font-medium mt-1">
                        {grade.rateDisplay}
                      </div>

                      <div className="w-full bg-border/60 h-1 rounded-full mt-2 overflow-hidden">
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

            {/* Center: Large 3D Real Mansion Stage (Prominent & Clear) */}
            <div className="relative flex-1 w-full my-3 rounded-3xl bg-gradient-to-b from-[#f9f7f2] via-[#f5f0e6] to-[#ece5d8] border border-border shadow-2xl overflow-hidden min-h-[320px] max-h-[58vh]">
              {/* 3D Real Mansion Canvas with Continuous Progress */}
              <Mansion3DScene progress={buildProgress} />

              {/* Live Architectural Stage Callout Banner */}
              <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1.5 max-w-xs sm:max-w-md">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-accent font-bold bg-white/95 px-3 py-1 rounded-full border border-accent/30 shadow-xs backdrop-blur-sm">
                    {buildProgress < 0.35
                      ? "GROUND SITE SURVEY & FOUNDATION"
                      : `${activeTier.code} · ${activeTier.subtitle.toUpperCase()}`}
                  </span>
                </div>

                <div className="bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-black/5 shadow-xs w-fit">
                  <span className="font-serif text-lg sm:text-xl text-foreground font-medium">
                    {activeTier.rateDisplay} <span className="text-xs font-sans text-muted">/ m²</span>
                  </span>
                  <p className="text-[10.5px] text-foreground/75 font-light line-clamp-1 mt-0.5">
                    {activeTier.tagline}
                  </p>
                </div>
              </div>

              {/* Scroll Guidance Indicator */}
              <div className="absolute bottom-4 left-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 text-muted text-[10px] font-mono bg-white/80 px-3 py-1 rounded-full border border-border backdrop-blur-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  {scrollPercent < 0.96
                    ? "Scroll down to build the mansion in place ↓"
                    : "Mansion fully assembled! Scroll down to estimate costs ↓"}
                </span>
              </div>
            </div>

            {/* Bottom Bar: Live Materials Deployed + Quick Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9.5px] uppercase tracking-wider text-muted font-mono mr-1">
                  Active Materials:
                </span>
                {activeTier.materials.map((mat) => (
                  <span
                    key={mat.name}
                    className="text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-surface text-foreground font-mono border border-border shadow-2xs"
                  >
                    {mat.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowMatrix((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10.5px] uppercase tracking-[0.16em] border border-border text-foreground hover:border-accent hover:text-accent bg-surface transition-all cursor-pointer font-medium"
                >
                  <Layers size={11} className="text-accent" />
                  <span>{showMatrix ? "Hide Matrix" : "Compare 01–04"}</span>
                  {showMatrix ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                </button>

                <a
                  href="#cost-estimator"
                  className="btn btn--accent rounded-full px-4 py-1.5 text-[10.5px] uppercase tracking-[0.16em] shadow-xs flex items-center gap-1.5"
                >
                  <span>Estimate Costs</span>
                  <ArrowDown size={12} />
                </a>
              </div>
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
