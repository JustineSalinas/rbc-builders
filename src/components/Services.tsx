"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Compass,
  HardHat,
  FileText,
  Landmark,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const RENDERING_PROJECTS = [
  "/images/renders/render-1.png",
  "/images/renders/render-2.png",
  "/images/renders/render-3.png",
  "/images/renders/render-4.png",
  "/images/renders/render-5.png",
  "/images/renders/render-6.png",
  "/images/renders/render-7.png",
  "/images/renders/render-8.png",
  "/images/renders/render-9.png",
  "/images/renders/render-10.png",
  "/images/renders/render-11.png",
  "/images/renders/render-12.png",
  "/images/renders/render-13.png",
  "/images/renders/render-14.png",
  "/images/renders/render-15.png",
];

const BEHANCE_RENDERING_URL =
  "https://www.behance.net/gallery/168202939/MY-RENDERING-PROJECT";

const DISCIPLINES = [
  {
    id: "01",
    icon: Compass,
    tag: "Design Phase",
    title: "Architectural Planning & Engineering",
    subtitle: "From spatial conceptualization to seismic calculations and working blueprints.",
    description:
      "Every project begins with a careful reading of your site, sunlight exposure, prevailing breezes, and lifestyle patterns. We deliver full architectural blueprints, structural engineering calculations, and interior spatial models that eliminate guesswork before ground is broken.",
    deliverables: [
      "Site orientation, topography and solar path analysis",
      "Full architectural schematic design & floor plan iterations",
      "Sealed structural, sanitary, and electrical engineering plans",
      "Comprehensive material specification palette & sample boards",
      "Bill of Quantities (BOQ) with guaranteed itemized unit pricing",
    ],
  },
  {
    id: "02",
    icon: HardHat,
    tag: "Build Phase",
    title: "Turnkey General Contracting (Labor & Materials)",
    subtitle: "End-to-end site mobilization, structural execution, and turnkey interior fit-out.",
    description:
      "We provide our own dedicated construction crews, licensed project engineers, and vetted material supply chains. Whether building to Bare Finish, Standard, Premium, or Luxury specifications, our workmanship adheres strictly to the National Structural Code of the Philippines.",
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
  {
    id: "05",
    icon: Sparkles,
    tag: "3D CGI & Visualization",
    title: "3D Rendering Projects & Architectural CGI",
    subtitle: "High-fidelity daytime & twilight CGI elevations, interior spatial design, and material studies.",
    description:
      "Experience your custom residence before groundbreaking with high-fidelity architectural visualizations. Our dedicated 3D visualization studio crafts ultra-detailed CGI elevations, dynamic natural lighting simulations, and material texture studies that bring your vision to life with complete photorealism.",
    deliverables: [
      "High-resolution exterior daytime & dramatic twilight architectural CGI renders",
      "Immersive interior 3D visualizations with curated lighting & tactile textures",
      "Accurate solar path, shadow dynamics, and natural cross-ventilation modeling",
      "Photorealistic material palette preview (stone, timber, glass, concrete)",
      "Direct access to RBC Builders' official Behance design showcase portfolio",
    ],
  },
];

export default function Services() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRenderIdx, setSelectedRenderIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + RENDERING_PROJECTS.length) % RENDERING_PROJECTS.length : null
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % RENDERING_PROJECTS.length : null
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-28 sm:py-36 px-4 sm:px-8 bg-[#f8f6f0] text-foreground relative border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          data-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Services &amp; Capabilities
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Five Specialized Disciplines. One Accountable Builder.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted font-light max-w-md leading-relaxed">
            Eliminating third-party friction by housing architectural vision, structural contracting, municipal legalities, bank financing, and photorealistic 3D visualization under one roof.
          </p>
        </div>

        {/* Desktop Tabs & Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Navigation Column */}
          <div
            data-reveal
            data-reveal-delay="0.1"
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {DISCIPLINES.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-left p-5 sm:p-6 border transition-all duration-300 flex items-start gap-4 sm:gap-5 rounded-2xl cursor-pointer ${
                    isActive
                      ? "bg-white border-accent shadow-md ring-1 ring-accent text-foreground"
                      : "bg-white/60 border-border hover:border-accent/40 hover:bg-white text-muted"
                  }`}
                >
                  <span
                    className={`font-serif text-lg tabular-nums mt-0.5 ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium font-mono truncate">
                        {item.tag}
                      </span>
                      <Icon
                        size={16}
                        className={isActive ? "text-accent" : "text-muted/60"}
                      />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal mt-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Panel */}
          <div
            data-reveal
            data-reveal-delay="0.18"
            className="lg:col-span-7 bg-white border border-border p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm rounded-3xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-border pb-6 mb-8 gap-4">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium font-mono">
                  Discipline {DISCIPLINES[activeTab].id}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal mt-1 leading-tight">
                  {DISCIPLINES[activeTab].title}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full border border-accent/40 flex items-center justify-center text-accent bg-accent/10 shrink-0">
                {(() => {
                  const Icon = DISCIPLINES[activeTab].icon;
                  return <Icon size={22} strokeWidth={1.5} />;
                })()}
              </div>
            </div>

            <p className="text-sm sm:text-base text-foreground/85 font-light leading-relaxed mb-8">
              {DISCIPLINES[activeTab].description}
            </p>

            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
                Guaranteed Scope &amp; Deliverables
              </h4>
              <div className="grid grid-cols-1 gap-3.5">
                {DISCIPLINES[activeTab].deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span className="text-xs sm:text-sm text-foreground/80 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* 3D RENDERING PROJECTS SHOWCASE & BEHANCE GALLERY (05)    */}
            {/* ======================================================== */}
            {activeTab === 4 && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-accent font-semibold block">
                      RBC Architectural CGI Portfolio
                    </span>
                    <h4 className="font-serif text-lg text-foreground font-normal">
                      Interactive Rendering Projects Gallery
                    </h4>
                  </div>
                  <a
                    href={BEHANCE_RENDERING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--accent inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium shadow-xs shrink-0 self-start sm:self-auto"
                  >
                    <span>View All on Behance</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                {/* Featured Large Preview */}
                <div
                  className="relative rounded-2xl overflow-hidden bg-black/5 border border-border aspect-video group cursor-pointer shadow-md"
                  onClick={() => setLightboxIndex(selectedRenderIdx)}
                >
                  <Image
                    src={RENDERING_PROJECTS[selectedRenderIdx]}
                    alt={`RBC 3D Rendering Project ${selectedRenderIdx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    priority={selectedRenderIdx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white z-10">
                    <span className="text-xs font-mono">
                      Render {selectedRenderIdx + 1} of {RENDERING_PROJECTS.length} &middot; Click to inspect full resolution
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs">
                      <Maximize2 size={11} />
                      <span>Expand</span>
                    </span>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 -mx-1 px-1 mt-2">
                  {RENDERING_PROJECTS.map((img, rIdx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedRenderIdx(rIdx)}
                      className={`relative shrink-0 w-20 sm:w-24 aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedRenderIdx === rIdx
                          ? "border-accent shadow-md scale-105 ring-1 ring-accent"
                          : "border-border/70 opacity-60 hover:opacity-100 hover:border-accent/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${rIdx + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Behance Direct Feature Banner */}
                <div className="mt-4 p-5 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-serif text-base text-foreground font-medium block">
                      Explore the Complete Monograph on Behance
                    </span>
                    <p className="text-xs text-foreground/75 font-light leading-relaxed mt-0.5">
                      View full photorealistic 3D elevations, lighting studies, and architectural renderings curated on Behance.
                    </p>
                  </div>
                  <a
                    href={BEHANCE_RENDERING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--accent inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium shadow-sm shrink-0 hover:scale-[1.02] transition-transform"
                  >
                    <span>View All Rendering Projects</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="text-xs text-muted font-mono">
                San Fernando &middot; Angeles &middot; Tarlac &middot; Bataan &middot; Zambales
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-dim font-medium transition-colors"
              >
                <span>Consult Our Engineers</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR RENDERING PROJECTS             */}
      {/* ============================================================ */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full pt-2 z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                RBC 3D Rendering Project
              </span>
              <span className="text-white/60 text-xs font-mono">
                ({lightboxIndex + 1} of {RENDERING_PROJECTS.length})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={BEHANCE_RENDERING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-accent-dim transition-colors"
              >
                <span>View on Behance</span>
                <ArrowUpRight size={12} />
              </a>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Center High-Res Image Display */}
          <div
            className="flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4 relative px-2 sm:px-8 h-[78vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={RENDERING_PROJECTS[lightboxIndex]}
                alt={`Full view ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain rounded-xl shadow-2xl border border-white/10"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + RENDERING_PROJECTS.length) %
                    RENDERING_PROJECTS.length
                )
              }
              className="absolute left-2 sm:left-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-accent transition-colors cursor-pointer"
              aria-label="Previous render"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % RENDERING_PROJECTS.length)
              }
              className="absolute right-2 sm:right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-accent transition-colors cursor-pointer"
              aria-label="Next render"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Bottom Bar Info */}
          <div className="text-center text-xs text-white/60 font-mono pb-2">
            Use Left / Right arrow keys to browse &middot; Press ESC or tap anywhere outside to close
          </div>
        </div>
      )}
    </section>
  );
}
