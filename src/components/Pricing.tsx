"use client";

import { useState } from "react";
import { Check, ArrowRight, Calculator, ShieldCheck, Sparkles } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

type FinishGrade = {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  minRate: number;
  maxRate: number | null;
  rateDisplay: string;
  tagline: string;
  popular?: boolean;
  materials: string[];
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
    name: "Bare Shell",
    subtitle: "Structural Core",
    minRate: 18000,
    maxRate: 20000,
    rateDisplay: "₱18,000 – ₱20,000",
    tagline: "Reinforced structural concrete skeleton, rough MEP infrastructure, weather-tight perimeter shell.",
    materials: ["28 MPa Concrete", "Grade 60 Rebar", "Power Screed"],
    specifications: {
      ceiling: "Exposed slab or basic flat board ready for soffit framing",
      windows: "Jalousie or standard heavy-gauge steel casements",
      doors: "Flush hollow core timber with standard cylindrical locksets",
      flooring: "Power-troweled smooth cement screed ready for client tile overlay",
      walls: "Plastered reinforced concrete masonry ready for primer & paint",
      fixtures: "Economic sanitary plumbing & primary electrical conduit rough-in",
    },
  },
  {
    id: "standard",
    code: "GRADE 02",
    name: "Standard",
    subtitle: "Turnkey Contemporary",
    minRate: 20000,
    maxRate: 25000,
    rateDisplay: "₱20,000 – ₱25,000",
    tagline: "Complete move-in contemporary home with painted interiors, recessed illumination, and ceramic tiling.",
    materials: ["Flat Gypsum", "UPVC Framing", "60×60 Polished Tile"],
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
    name: "Premium",
    subtitle: "Signature Architectural",
    popular: true,
    minRate: 25000,
    maxRate: 29000,
    rateDisplay: "₱25,000 – ₱29,000",
    tagline: "Our most requested specification in Pampanga. Textured wood-slats, Analok bronze, and porcelain slabs.",
    materials: ["Textured Slat Panels", "Analok Bronze", "60×120 Porcelain"],
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
    name: "Luxury",
    subtitle: "Bespoke Masterpiece",
    minRate: 29000,
    maxRate: null,
    rateDisplay: "₱29,000+",
    tagline: "High-end imported finishes, floating multi-tier cove illumination, and panoramic floor-to-ceiling glass.",
    materials: ["Floating Cove", "Floor-to-Ceiling Glass", "Sintered Stone"],
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

// Bespoke Architectural Schematic SVGs for each tier
function TierSchematic({ id, isSelected }: { id: string; isSelected: boolean }) {
  const strokeColor = isSelected ? "#9a7442" : "#a89f91";

  if (id === "bare") {
    return (
      <svg viewBox="0 0 320 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-bare" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="320" height="150" fill="url(#grid-bare)" />

        {/* Foundation Plinth */}
        <path d="M 50 115 L 160 138 L 270 115 L 160 92 Z" fill="#9a7442" fillOpacity={isSelected ? 0.08 : 0.04} stroke={strokeColor} strokeWidth="1.2" />

        {/* 4 Reinforced Concrete Columns (Isometric Wireframe) */}
        <line x1="50" y1="115" x2="50" y2="48" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="160" y1="138" x2="160" y2="72" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="270" y1="115" x2="270" y2="48" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="160" y1="92" x2="160" y2="28" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.5" />

        {/* Roof Tie-Beams Perimeter */}
        <path d="M 50 48 L 160 72 L 270 48 L 160 28 Z" fill="#9a7442" fillOpacity={isSelected ? 0.14 : 0.06} stroke={strokeColor} strokeWidth="1.6" />

        {/* Rebar Stirrup Ticks */}
        <line x1="46" y1="88" x2="54" y2="88" stroke={strokeColor} strokeWidth="1" />
        <line x1="46" y1="68" x2="54" y2="68" stroke={strokeColor} strokeWidth="1" />
        <line x1="156" y1="112" x2="164" y2="112" stroke={strokeColor} strokeWidth="1" />
        <line x1="156" y1="92" x2="164" y2="92" stroke={strokeColor} strokeWidth="1" />
        <line x1="266" y1="88" x2="274" y2="88" stroke={strokeColor} strokeWidth="1" />
        <line x1="266" y1="68" x2="274" y2="68" stroke={strokeColor} strokeWidth="1" />

        {/* Dimension Marker */}
        <g transform="translate(205, 36)">
          <circle cx="0" cy="0" r="9" fill="#fcfbf9" stroke={strokeColor} strokeWidth="1" />
          <path d="M-5 0 L5 0 M0 -5 L0 5" stroke={strokeColor} strokeWidth="1" />
          <text x="13" y="3.5" fill="#5c564e" fontSize="7.5" fontFamily="monospace" letterSpacing="0.1em">TIE-BEAM +3.20m</text>
        </g>
        <text x="50" y="138" fill="#8c8275" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">f&apos;c = 28 MPa · PNS 49 REBAR</text>
      </svg>
    );
  }

  if (id === "standard") {
    return (
      <svg viewBox="0 0 320 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-standard" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
          <linearGradient id="lightCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9a7442" stopOpacity={isSelected ? 0.35 : 0.15} />
            <stop offset="100%" stopColor="#9a7442" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="320" height="150" fill="url(#grid-standard)" />

        {/* Finished Floor with 60x60 Grid */}
        <path d="M 50 115 L 160 138 L 270 115 L 160 92 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="1.2" />
        <path d="M 105 103.5 L 215 126.5 M 78 109 L 188 132" stroke={strokeColor} strokeWidth="0.6" strokeOpacity="0.3" />
        <path d="M 105 126.5 L 215 103.5 M 132 132 L 242 109" stroke={strokeColor} strokeWidth="0.6" strokeOpacity="0.3" />

        {/* Finished Walls */}
        <path d="M 50 115 L 160 138 L 160 68 L 50 45 Z" fill="#f5f2eb" fillOpacity="0.75" stroke={strokeColor} strokeWidth="1.3" />
        <path d="M 160 138 L 270 115 L 270 45 L 160 68 Z" fill="#eee9de" fillOpacity="0.75" stroke={strokeColor} strokeWidth="1.3" />

        {/* Casement Window on Left Wall */}
        <path d="M 72 92 L 132 104 L 132 68 L 72 56 Z" fill="#e8f0f8" stroke={strokeColor} strokeWidth="1.1" />
        <line x1="102" y1="62" x2="102" y2="98" stroke={strokeColor} strokeWidth="0.9" />
        <line x1="82" y1="84" x2="92" y2="66" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.8" />

        {/* Flat Gypsum Ceiling Slab */}
        <path d="M 50 45 L 160 68 L 270 45 L 160 22 Z" fill="#fdfcf9" stroke={strokeColor} strokeWidth="1.3" />

        {/* Recessed Downlight & Illumination Cone */}
        <circle cx="160" cy="48" r="3.5" fill="#9a7442" />
        <polygon points="160,48 115,125 205,125" fill="url(#lightCone)" />
        <ellipse cx="160" cy="125" rx="45" ry="10" fill="#9a7442" fillOpacity={isSelected ? 0.12 : 0.05} />

        <text x="50" y="138" fill="#8c8275" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">FLAT GYPSUM · DOWNLIGHTS · 60×60 TILE</text>
      </svg>
    );
  }

  if (id === "premium") {
    return (
      <svg viewBox="0 0 320 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-premium" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
          <linearGradient id="bronzeGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4a3728" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#9a7442" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="warmCove" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity={isSelected ? 0.5 : 0.25} />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="320" height="150" fill="url(#grid-premium)" />

        {/* 60x120 Porcelain Slab Floor */}
        <path d="M 50 115 L 160 138 L 270 115 L 160 92 Z" fill="#faf8f5" stroke={strokeColor} strokeWidth="1.3" />
        <path d="M 85 107 L 195 130 M 120 100 L 230 123" stroke={strokeColor} strokeWidth="0.7" strokeOpacity="0.4" />
        <path d="M 125 131 L 195 116" stroke={strokeColor} strokeWidth="0.7" strokeOpacity="0.4" />

        {/* Left Wall: Acoustic Wood Slat Screen */}
        <path d="M 50 115 L 160 138 L 160 64 L 50 41 Z" fill="#eedec9" fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.2" />
        <g stroke={strokeColor} strokeWidth="1.3" strokeOpacity={isSelected ? 0.85 : 0.6}>
          <line x1="60" y1="44" x2="60" y2="118" />
          <line x1="70" y1="47" x2="70" y2="121" />
          <line x1="80" y1="50" x2="80" y2="124" />
          <line x1="90" y1="53" x2="90" y2="127" />
          <line x1="100" y1="56" x2="100" y2="130" />
          <line x1="110" y1="59" x2="110" y2="133" />
          <line x1="120" y1="62" x2="120" y2="136" />
        </g>

        {/* Right Wall: Heavy Analok Bronze Glazed Slider */}
        <path d="M 160 138 L 270 115 L 270 41 L 160 64 Z" fill="#e8e2d5" fillOpacity="0.5" stroke={strokeColor} strokeWidth="1.2" />
        <path d="M 175 128 L 255 112 L 255 51 L 175 68 Z" fill="url(#bronzeGlass)" stroke="#684a28" strokeWidth="1.8" />
        <line x1="215" y1="59" x2="215" y2="120" stroke="#684a28" strokeWidth="1.6" />
        <line x1="219" y1="82" x2="219" y2="100" stroke="#d4af37" strokeWidth="1.4" strokeLinecap="round" />

        {/* Ceiling Perimeter Ambient LED Glow */}
        <path d="M 50 41 L 160 64 L 270 41 L 160 18 Z" fill="#fcfbf8" stroke={strokeColor} strokeWidth="1.4" />
        <path d="M 52 43 L 158 65 L 268 43" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="50,43 160,66 270,43 160,82" fill="url(#warmCove)" />

        <text x="50" y="138" fill="#8c8275" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">TIMBER SLATS · ANALOK BRONZE · 60×120 PORCELAIN</text>
      </svg>
    );
  }

  // Luxury
  return (
    <svg viewBox="0 0 320 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-luxury" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#9a7442" strokeWidth="0.5" strokeOpacity="0.08" />
        </pattern>
        <linearGradient id="goldGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c59b63" stopOpacity={isSelected ? 0.6 : 0.3} />
          <stop offset="100%" stopColor="#c59b63" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="marbleSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f4eee1" />
          <stop offset="100%" stopColor="#e8dfce" />
        </linearGradient>
      </defs>
      <rect width="320" height="150" fill="url(#grid-luxury)" />

      {/* Seamless Sintered Stone Floor */}
      <path d="M 45 115 L 160 140 L 275 115 L 160 90 Z" fill="#faf7f2" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M 75 110 Q 115 120 145 106 T 225 116" stroke="#9a7442" strokeWidth="0.7" strokeOpacity="0.3" strokeDasharray="5 3" />

      {/* Left Wall: Bookmatched Sintered Stone + Pivot Door */}
      <path d="M 45 115 L 160 140 L 160 60 L 45 35 Z" fill="url(#marbleSheen)" stroke={strokeColor} strokeWidth="1.3" />
      <path d="M 70 110 L 122 122 L 122 55 L 70 42 Z" fill="#4a2e1b" stroke="#2c1a0e" strokeWidth="1.4" />
      <line x1="117" y1="59" x2="117" y2="117" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />

      {/* Right Wall: Floor-to-Ceiling Thermal Glass Curtain Wall */}
      <path d="M 160 140 L 275 115 L 275 35 L 160 60 Z" fill="#edf4f9" fillOpacity="0.45" stroke={strokeColor} strokeWidth="1.3" />
      <line x1="198" y1="52" x2="198" y2="131" stroke="#1f2937" strokeWidth="1.8" />
      <line x1="238" y1="43" x2="238" y2="122" stroke="#1f2937" strokeWidth="1.8" />
      <line x1="180" y1="105" x2="208" y2="68" stroke="#ffffff" strokeWidth="2.2" strokeOpacity="0.8" strokeLinecap="round" />
      <line x1="218" y1="96" x2="246" y2="58" stroke="#ffffff" strokeWidth="2.2" strokeOpacity="0.8" strokeLinecap="round" />

      {/* Floating Multi-Tier Cove Slab & Indirect Channel Light */}
      <path d="M 38 28 L 160 54 L 282 28 L 160 2 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="1.6" />
      <path d="M 50 35 L 160 59 L 270 35 L 160 11 Z" fill="#c59b63" fillOpacity="0.18" stroke="#d4af37" strokeWidth="1.4" />
      <polygon points="50,35 160,59 270,35 160,88" fill="url(#goldGlow)" />

      <text x="45" y="138" fill="#8c8275" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">CANTILEVER COVE · SINTERED STONE · THERMAL GLASS</text>
    </svg>
  );
}

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

        {/* 4 Architectural Grade Cards — Custom Blueprint Schematics & Zero Cluttered Flyers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FINISH_GRADES.map((grade, i) => {
            const isSelected = activeTier.id === grade.id;
            return (
              <div
                key={grade.id}
                data-reveal
                data-reveal-delay={(0.06 + i * 0.08).toString()}
                onClick={() => setActiveTier(grade)}
                className={`group cursor-pointer flex flex-col bg-surface border transition-all duration-300 relative rounded-xl overflow-hidden ${
                  isSelected
                    ? "border-accent shadow-xl shadow-accent/10 ring-2 ring-accent"
                    : "border-border hover:border-accent/50 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popular Badge for Premium Tier */}
                {grade.popular && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] bg-accent text-white px-2.5 py-1 font-semibold rounded-full shadow-sm">
                      <Sparkles size={10} />
                      <span>Most Requested</span>
                    </span>
                  </div>
                )}

                {/* Creative Architectural Schematic Header */}
                <div className="relative h-44 w-full bg-gradient-to-b from-[#f9f7f2] to-[#f2ede4] border-b border-border/80 overflow-hidden flex flex-col justify-between p-3.5">
                  {/* Top Header Label */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[9.5px] uppercase tracking-[0.2em] font-mono text-muted font-medium bg-white/80 px-2 py-0.5 rounded border border-border/60">
                      {grade.code}
                    </span>
                    {isSelected && !grade.popular && (
                      <span className="text-[9px] uppercase tracking-[0.15em] bg-accent/15 text-accent border border-accent/40 px-2 py-0.5 font-medium rounded-full">
                        Active Selection
                      </span>
                    )}
                  </div>

                  {/* Bespoke Interactive Isometric Schematic Illustration */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-105 transition-transform duration-500">
                    <TierSchematic id={grade.id} isSelected={isSelected} />
                  </div>

                  {/* Bottom Tactile Material Swatch Tag Bar */}
                  <div className="z-10 flex flex-wrap gap-1 mt-auto">
                    {grade.materials.map((mat) => (
                      <span
                        key={mat}
                        className="text-[8.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/90 text-foreground/80 font-mono border border-black/5 backdrop-blur-xs"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grade Specifications & Pricing Body */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-surface">
                  <div>
                    {/* Tier Name & Subtitle */}
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-serif text-xl text-foreground font-normal">
                        {grade.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-accent font-medium">
                        {grade.subtitle}
                      </span>
                    </div>

                    {/* Rate Display */}
                    <div className="font-serif text-2xl sm:text-[26px] text-accent font-medium mt-1 mb-2">
                      {grade.rateDisplay}
                      <span className="text-xs font-sans text-muted font-light ml-1.5">/ m²</span>
                    </div>

                    {/* Summary Tagline */}
                    <p className="text-xs text-foreground/70 font-light leading-relaxed mb-5 min-h-[36px]">
                      {grade.tagline}
                    </p>

                    {/* Detailed Itemized Material Inclusions */}
                    <div className="space-y-2.5 pt-4 border-t border-border/80">
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground font-medium">Ceiling:</strong> {grade.specifications.ceiling}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground font-medium">Windows:</strong> {grade.specifications.windows}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground font-medium">Flooring:</strong> {grade.specifications.flooring}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground font-medium">Doors:</strong> {grade.specifications.doors}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground font-medium">Walls:</strong> {grade.specifications.walls}</span>
                      </div>
                      <div className="text-[11px] text-foreground/80 font-light flex items-start gap-2">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground font-medium">Fixtures:</strong> {grade.specifications.fixtures}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Selection Button */}
                  <button
                    type="button"
                    className={`mt-6 w-full py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-accent text-white border-accent shadow-sm"
                        : "border-border text-foreground/75 hover:border-accent hover:text-accent bg-background"
                    }`}
                  >
                    {isSelected ? "Active Specification ✓" : "Select Specification"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Architectural Investment Estimator */}
        <div data-reveal data-reveal-delay="0.15" className="p-8 sm:p-12 bg-surface border border-border relative overflow-hidden rounded-2xl shadow-sm">
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
            <div className="lg:col-span-5 p-6 sm:p-8 bg-background border border-accent/40 rounded-xl shadow-xl flex flex-col justify-between">
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
                className="w-full text-center py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-white hover:bg-accent-dim transition-colors flex items-center justify-center gap-2 rounded-lg shadow-sm"
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
