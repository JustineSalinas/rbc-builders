"use client";

import { useState } from "react";
import { ArrowRight, Calculator, ShieldCheck, Sparkles, ArrowDown, ChevronDown, ChevronUp, Layers, Compass } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

type FinishGrade = {
  id: string;
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

// Architectural Blueprint Cutaway SVGs with Generous Scale
function LargeTierSchematic({ id }: { id: string }) {
  if (id === "bare") {
    return (
      <svg viewBox="0 0 460 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lg-grid-bare" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="460" height="220" fill="url(#lg-grid-bare)" />

        {/* Foundation Plinth */}
        <path d="M 70 170 L 230 200 L 390 170 L 230 140 Z" fill="#9a7442" fillOpacity="0.06" stroke="#9a7442" strokeWidth="1.4" />

        {/* 4 Reinforced Concrete Columns (Isometric Wireframe) */}
        <line x1="70" y1="170" x2="70" y2="70" stroke="#9a7442" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="230" y1="200" x2="230" y2="100" stroke="#9a7442" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="390" y1="170" x2="390" y2="70" stroke="#9a7442" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="230" y1="140" x2="230" y2="40" stroke="#9a7442" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.5" />

        {/* Roof Tie-Beams Perimeter */}
        <path d="M 70 70 L 230 100 L 390 70 L 230 40 Z" fill="#9a7442" fillOpacity="0.12" stroke="#9a7442" strokeWidth="2" />

        {/* Rebar Stirrup Ticks */}
        <line x1="64" y1="130" x2="76" y2="130" stroke="#9a7442" strokeWidth="1.2" />
        <line x1="64" y1="100" x2="76" y2="100" stroke="#9a7442" strokeWidth="1.2" />
        <line x1="224" y1="160" x2="236" y2="160" stroke="#9a7442" strokeWidth="1.2" />
        <line x1="224" y1="130" x2="236" y2="130" stroke="#9a7442" strokeWidth="1.2" />
        <line x1="384" y1="130" x2="396" y2="130" stroke="#9a7442" strokeWidth="1.2" />
        <line x1="384" y1="100" x2="396" y2="100" stroke="#9a7442" strokeWidth="1.2" />

        {/* Dimension Callout */}
        <g transform="translate(300, 50)">
          <circle cx="0" cy="0" r="10" fill="#fcfbf9" stroke="#9a7442" strokeWidth="1.2" />
          <path d="M-6 0 L6 0 M0 -6 L0 6" stroke="#9a7442" strokeWidth="1" />
          <text x="16" y="4" fill="#5c564e" fontSize="9" fontFamily="monospace" letterSpacing="0.14em">TIE-BEAM +3.20m</text>
        </g>
        <text x="70" y="200" fill="#8c8275" fontSize="8.5" fontFamily="monospace" letterSpacing="0.14em">STRUCTURAL CONCRETE f&apos;c = 28 MPa · PNS 49 REBAR</text>
      </svg>
    );
  }

  if (id === "standard") {
    return (
      <svg viewBox="0 0 460 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lg-grid-standard" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
          <linearGradient id="lgLightCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9a7442" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9a7442" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="460" height="220" fill="url(#lg-grid-standard)" />

        {/* Finished Floor with 60x60 Grid */}
        <path d="M 70 170 L 230 200 L 390 170 L 230 140 Z" fill="#ffffff" stroke="#9a7442" strokeWidth="1.4" />
        <path d="M 150 155 L 310 185 M 110 162.5 L 270 192.5" stroke="#9a7442" strokeWidth="0.7" strokeOpacity="0.3" />
        <path d="M 150 185 L 310 155 M 190 192.5 L 350 162.5" stroke="#9a7442" strokeWidth="0.7" strokeOpacity="0.3" />

        {/* Finished Walls */}
        <path d="M 70 170 L 230 200 L 230 95 L 70 65 Z" fill="#f5f2eb" fillOpacity="0.8" stroke="#9a7442" strokeWidth="1.5" />
        <path d="M 230 200 L 390 170 L 390 65 L 230 95 Z" fill="#ede7dc" fillOpacity="0.8" stroke="#9a7442" strokeWidth="1.5" />

        {/* Casement Window on Left Wall */}
        <path d="M 100 135 L 190 152 L 190 100 L 100 83 Z" fill="#e8f0f8" stroke="#9a7442" strokeWidth="1.4" />
        <line x1="145" y1="91.5" x2="145" y2="143.5" stroke="#9a7442" strokeWidth="1.2" />
        <line x1="115" y1="120" x2="130" y2="95" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />

        {/* Flat Gypsum Ceiling Slab */}
        <path d="M 70 65 L 230 95 L 390 65 L 230 35 Z" fill="#fdfcf9" stroke="#9a7442" strokeWidth="1.5" />

        {/* Recessed Downlight & Illumination Cone */}
        <circle cx="230" cy="70" r="4.5" fill="#9a7442" />
        <polygon points="230,70 165,185 295,185" fill="url(#lgLightCone)" />
        <ellipse cx="230" cy="185" rx="65" ry="14" fill="#9a7442" fillOpacity="0.08" />

        <text x="70" y="200" fill="#8c8275" fontSize="8.5" fontFamily="monospace" letterSpacing="0.14em">FLAT GYPSUM · RECESSED LED · 60×60 VITRIFIED TILE</text>
      </svg>
    );
  }

  if (id === "premium") {
    return (
      <svg viewBox="0 0 460 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lg-grid-premium" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
          <linearGradient id="lgBronzeGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4a3728" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#9a7442" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="lgWarmCove" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="460" height="220" fill="url(#lg-grid-premium)" />

        {/* 60x120 Porcelain Floor */}
        <path d="M 70 170 L 230 200 L 390 170 L 230 140 Z" fill="#faf8f5" stroke="#9a7442" strokeWidth="1.5" />
        <path d="M 120 159 L 280 189 M 170 149 L 330 179" stroke="#9a7442" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M 180 190 L 280 171" stroke="#9a7442" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Left Wall: Acoustic Wood Slat Screen */}
        <path d="M 70 170 L 230 200 L 230 90 L 70 60 Z" fill="#eedec9" fillOpacity="0.3" stroke="#9a7442" strokeWidth="1.4" />
        <g stroke="#9a7442" strokeWidth="1.6" strokeOpacity="0.8">
          <line x1="85" y1="63" x2="85" y2="173" />
          <line x1="100" y1="66" x2="100" y2="176" />
          <line x1="115" y1="69" x2="115" y2="179" />
          <line x1="130" y1="72" x2="130" y2="182" />
          <line x1="145" y1="75" x2="145" y2="185" />
          <line x1="160" y1="78" x2="160" y2="188" />
          <line x1="175" y1="81" x2="175" y2="191" />
        </g>

        {/* Right Wall: Analok Bronze Glazed Slider */}
        <path d="M 230 200 L 390 170 L 390 60 L 230 90 Z" fill="#e8e2d5" fillOpacity="0.5" stroke="#9a7442" strokeWidth="1.4" />
        <path d="M 255 186 L 365 165 L 365 76 L 255 98 Z" fill="url(#lgBronzeGlass)" stroke="#684a28" strokeWidth="2.2" />
        <line x1="310" y1="87" x2="310" y2="175" stroke="#684a28" strokeWidth="2" />
        <line x1="316" y1="120" x2="316" y2="148" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />

        {/* Ceiling Perimeter Ambient LED Glow */}
        <path d="M 70 60 L 230 90 L 390 60 L 230 30 Z" fill="#fcfbf8" stroke="#9a7442" strokeWidth="1.6" />
        <path d="M 73 63 L 227 92 L 387 63" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" />
        <polygon points="70,60 230,90 390,60 230,120" fill="url(#lgWarmCove)" />

        <text x="70" y="200" fill="#8c8275" fontSize="8.5" fontFamily="monospace" letterSpacing="0.14em">TIMBER SLAT WALL · ANALOK BRONZE · 60×120 PORCELAIN</text>
      </svg>
    );
  }

  // Luxury
  return (
    <svg viewBox="0 0 460 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="lg-grid-luxury" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
        </pattern>
        <linearGradient id="lgGoldGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c59b63" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c59b63" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lgMarbleSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f4eee1" />
          <stop offset="100%" stopColor="#e8dfce" />
        </linearGradient>
      </defs>
      <rect width="460" height="220" fill="url(#lg-grid-luxury)" />

      {/* Seamless Sintered Stone Floor */}
      <path d="M 60 170 L 230 204 L 400 170 L 230 136 Z" fill="#faf7f2" stroke="#9a7442" strokeWidth="1.6" />
      <path d="M 100 162 Q 170 176 210 156 T 320 170" stroke="#9a7442" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="6 4" />

      {/* Left Wall: Sintered Stone + Pivot Door */}
      <path d="M 60 170 L 230 204 L 230 85 L 60 50 Z" fill="url(#lgMarbleSheen)" stroke="#9a7442" strokeWidth="1.5" />
      <path d="M 100 162 L 175 178 L 175 80 L 100 64 Z" fill="#4a2e1b" stroke="#2c1a0e" strokeWidth="1.6" />
      <line x1="168" y1="88" x2="168" y2="168" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" />

      {/* Right Wall: Floor-to-Ceiling Thermal Glass Facade */}
      <path d="M 230 204 L 400 170 L 400 50 L 230 85 Z" fill="#edf4f9" fillOpacity="0.45" stroke="#9a7442" strokeWidth="1.5" />
      <line x1="285" y1="74" x2="285" y2="192" stroke="#1f2937" strokeWidth="2.2" />
      <line x1="345" y1="61" x2="345" y2="179" stroke="#1f2937" strokeWidth="2.2" />
      <line x1="255" y1="150" x2="295" y2="100" stroke="#ffffff" strokeWidth="2.8" strokeOpacity="0.8" strokeLinecap="round" />
      <line x1="315" y1="135" x2="355" y2="85" stroke="#ffffff" strokeWidth="2.8" strokeOpacity="0.8" strokeLinecap="round" />

      {/* Floating Multi-Tier Cantilever Cove Slab */}
      <path d="M 50 40 L 230 75 L 410 40 L 230 5 Z" fill="#ffffff" stroke="#9a7442" strokeWidth="2" />
      <path d="M 70 50 L 230 82 L 390 50 L 230 18 Z" fill="#c59b63" fillOpacity="0.2" stroke="#d4af37" strokeWidth="1.6" />
      <polygon points="70,50 230,82 390,50 230,125" fill="url(#lgGoldGlow)" />

      <text x="60" y="200" fill="#8c8275" fontSize="8.5" fontFamily="monospace" letterSpacing="0.14em">CANTILEVER COVE · SINTERED STONE · PANORAMIC GLASS</text>
    </svg>
  );
}

export default function Pricing() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeTier, setActiveTier] = useState<FinishGrade>(FINISH_GRADES[2]); // Default to Premium
  const [floorArea, setFloorArea] = useState<number>(240);
  const [selectedLocation, setSelectedLocation] = useState<string>(LOCATIONS[0]);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

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
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-16">
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

        {/* 1. Spacious Tier Selector Navigation Cards (No Cramping!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {FINISH_GRADES.map((grade) => {
            const isSelected = activeTier.id === grade.id;
            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => setActiveTier(grade)}
                className={`text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-surface border-accent shadow-xl shadow-accent/10 ring-2 ring-accent"
                    : "bg-surface/60 border-border hover:border-accent/40 hover:bg-surface"
                }`}
              >
                {/* Popular Badge */}
                {grade.popular && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[8.5px] uppercase tracking-[0.16em] bg-accent text-white px-2.5 py-0.5 font-semibold rounded-full shadow-xs">
                    <Sparkles size={9} />
                    <span>Most Popular</span>
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {grade.number}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-[10px] uppercase tracking-wider text-accent font-medium">
                      {grade.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-foreground font-normal mb-2">
                    {grade.name}
                  </h3>

                  <div className="font-serif text-xl sm:text-2xl text-accent font-medium mb-3">
                    {grade.rateDisplay}
                    <span className="text-xs font-sans text-muted font-light ml-1">/ m²</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className={`text-[11px] uppercase tracking-[0.16em] font-medium transition-colors ${
                    isSelected ? "text-accent font-semibold" : "text-muted"
                  }`}>
                    {isSelected ? "Active Grade ✓" : "Select Tier"}
                  </span>
                  <div className={`h-2 w-2 rounded-full transition-all ${
                    isSelected ? "bg-accent scale-125" : "bg-border"
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Expansive Architectural Specification Studio (Spacious 2-Column Spread) */}
        <div data-reveal className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-surface border border-accent/30 shadow-xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Large Architectural Cutaway Canvas & Material Swatch Board */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Large Schematic Stage */}
              <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-b from-[#f9f7f2] to-[#f2ede4] border border-border/80 overflow-hidden shadow-inner p-4">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest bg-white/90 text-accent font-semibold px-2.5 py-1 rounded-md border border-accent/20">
                    {activeTier.code} SCHEMATIC
                  </span>
                </div>

                <div className="w-full h-full flex items-center justify-center">
                  <LargeTierSchematic id={activeTier.id} />
                </div>
              </div>

              {/* Physical Material Palette Board */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-mono mb-2.5">
                  Tactile Material Palette Specification:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeTier.materials.map((mat) => (
                    <div
                      key={mat.name}
                      className="p-3 rounded-xl bg-background border border-border/80 flex flex-col justify-between"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-muted font-mono">
                        {mat.category}
                      </span>
                      <span className="text-xs text-foreground font-medium mt-1">
                        {mat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Spacious Specification Monograph & Deliverables */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] uppercase tracking-[0.2em] font-medium">
                  <Compass size={12} />
                  <span>Specification Standards &middot; Central Luzon</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="font-serif text-3xl sm:text-4xl text-foreground font-light">
                    {activeTier.name} Architecture
                  </h3>
                  <span className="text-sm font-sans text-muted">
                    ({activeTier.subtitle})
                  </span>
                </div>

                <div className="font-serif text-3xl sm:text-4xl text-accent font-medium mb-4">
                  {activeTier.rateDisplay}
                  <span className="text-sm font-sans text-muted font-light ml-1.5">
                    / m² gross floor area
                  </span>
                </div>

                <p className="text-sm sm:text-[15px] text-foreground/75 font-light leading-relaxed mb-8">
                  {activeTier.tagline}
                </p>

                {/* Categorized Specifications Grid (2x2 Spacious Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {/* Ceiling & Lighting */}
                  <div className="p-4 rounded-xl bg-background border border-border/70 flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Ceiling Architecture
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.ceiling}
                    </p>
                  </div>

                  {/* Windows & Glazing */}
                  <div className="p-4 rounded-xl bg-background border border-border/70 flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Fenestration &amp; Glass
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.windows}
                    </p>
                  </div>

                  {/* Flooring & Surfaces */}
                  <div className="p-4 rounded-xl bg-background border border-border/70 flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Flooring &amp; Walls
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.flooring}; {activeTier.specifications.walls}
                    </p>
                  </div>

                  {/* Doors & MEP Fixtures */}
                  <div className="p-4 rounded-xl bg-background border border-border/70 flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-accent font-mono font-medium">
                      Doors &amp; Fixtures
                    </span>
                    <p className="text-xs text-foreground/85 font-light leading-relaxed">
                      {activeTier.specifications.doors}; {activeTier.specifications.fixtures}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                <a
                  href="#cost-estimator"
                  className="btn btn--accent rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em] shadow-sm flex items-center gap-2"
                >
                  <span>Estimate for {activeTier.name}</span>
                  <ArrowDown size={13} />
                </a>

                <button
                  type="button"
                  onClick={() => setShowMatrix((v) => !v)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.16em] border border-border text-foreground hover:border-accent hover:text-accent bg-background transition-all cursor-pointer"
                >
                  <Layers size={13} className="text-accent" />
                  <span>{showMatrix ? "Hide Matrix" : "Compare All 4 Grades"}</span>
                  {showMatrix ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>
            </div>
          </div>

          {/* Optional Expansive Comparison Matrix Drawer */}
          {showMatrix && (
            <div className="mt-10 pt-10 border-t border-border animate-in fade-in slide-in-from-top-4 duration-400 overflow-x-auto">
              <div className="mb-6">
                <h4 className="font-serif text-2xl text-foreground font-normal">
                  Comparative Specification Matrix
                </h4>
                <p className="text-xs text-muted font-light mt-1">
                  Side-by-side comparison across all four build standards.
                </p>
              </div>

              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-border text-accent uppercase tracking-widest text-[10px] font-mono">
                    <th className="py-3 px-4">Component</th>
                    <th className="py-3 px-4">01 Bare Shell</th>
                    <th className="py-3 px-4">02 Standard</th>
                    <th className="py-3 px-4 bg-accent/5">03 Premium (Popular)</th>
                    <th className="py-3 px-4">04 Luxury</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-foreground/80 font-light">
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Rate / m²</td>
                    <td className="py-3 px-4 font-serif text-accent">₱18k – ₱20k</td>
                    <td className="py-3 px-4 font-serif text-accent">₱20k – ₱25k</td>
                    <td className="py-3 px-4 font-serif text-accent font-medium bg-accent/5">₱25k – ₱29k</td>
                    <td className="py-3 px-4 font-serif text-accent font-medium">₱29k+</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Ceiling</td>
                    <td className="py-3 px-4">Exposed slab / flat board</td>
                    <td className="py-3 px-4">Gypsum + recessed LED</td>
                    <td className="py-3 px-4 bg-accent/5">Textured PVC / wood slats</td>
                    <td className="py-3 px-4">Multi-tier floating cove</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Windows</td>
                    <td className="py-3 px-4">Jalousie / steel casement</td>
                    <td className="py-3 px-4">White UPVC / aluminum</td>
                    <td className="py-3 px-4 bg-accent/5">Analok bronze sliding</td>
                    <td className="py-3 px-4">Thermal floor-to-ceiling glass</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Flooring</td>
                    <td className="py-3 px-4">Smooth cement screed</td>
                    <td className="py-3 px-4">60×60 polished ceramic</td>
                    <td className="py-3 px-4 bg-accent/5">60×120 porcelain slabs</td>
                    <td className="py-3 px-4">Sintered stone &amp; parquet</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Doors</td>
                    <td className="py-3 px-4">Flush hollow core</td>
                    <td className="py-3 px-4">Engineered wood</td>
                    <td className="py-3 px-4 bg-accent/5">Solid hardwood pivot door</td>
                    <td className="py-3 px-4">Custom oversized mahogany</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Walls</td>
                    <td className="py-3 px-4">Plastered concrete</td>
                    <td className="py-3 px-4">Two-coat latex paint</td>
                    <td className="py-3 px-4 bg-accent/5">Stacked natural stone</td>
                    <td className="py-3 px-4">Natural marble veneers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">Fixtures</td>
                    <td className="py-3 px-4">Economic rough-in</td>
                    <td className="py-3 px-4">American Standard / Pozzi</td>
                    <td className="py-3 px-4 bg-accent/5">Kohler / Hansgrohe</td>
                    <td className="py-3 px-4">Toto / Grohe + Smart Home</td>
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
