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
  Building2,
  ShieldCheck,
  ExternalLink,
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
    shortName: "Architecture",
    icon: Compass,
    tag: "Discipline 01 · Design Phase",
    title: "Architectural Planning & Engineering",
    subtitle: "From spatial conceptualization to seismic calculations and working blueprints.",
    description:
      "Every project begins with a careful reading of your site, sunlight exposure, prevailing breezes, and lifestyle patterns. We deliver full architectural blueprints, structural engineering calculations, and interior spatial models that eliminate guesswork before ground is broken.",
    badge: "PRC Licensed Architects & Structural Engineers · Zone 4 Seismic Compliance",
    deliverables: [
      "Site orientation, topography and solar path analysis",
      "Full architectural schematic design & floor plan iterations",
      "Signed and sealed structural, sanitary, and electrical engineering plans",
      "Comprehensive material specification palette & sample boards",
      "Bill of Quantities (BOQ) with guaranteed itemized unit pricing",
    ],
    ctaLabel: "Start Architectural Planning",
    ctaHref: "#contact",
  },
  {
    id: "02",
    shortName: "Contracting",
    icon: HardHat,
    tag: "Discipline 02 · Build Phase",
    title: "Turnkey General Contracting (Labor & Materials)",
    subtitle: "End-to-end site mobilization, structural execution, and turnkey interior fit-out.",
    description:
      "We provide our own dedicated construction crews, licensed project engineers, and vetted material supply chains. Whether building to Bare Finish, Standard, Premium, or Luxury specifications, our workmanship adheres strictly to the National Structural Code of the Philippines.",
    badge: "Certified 28 MPa Concrete & Grade 60 PNS Rebar · Weekly Progress Tracking",
    deliverables: [
      "Soil bearing verification, site clearing & heavy excavation",
      "Reinforced concrete substructure & structural framing",
      "Complete MEP (mechanical, electrical, plumbing) rough-ins",
      "Precision architectural finishes: stone, timber, tiles, glazing",
      "Weekly photo and video progress reports with milestone tracking",
    ],
    ctaLabel: "View Specification Standards",
    ctaHref: "#pricing",
  },
  {
    id: "03",
    shortName: "LGU Permits",
    icon: FileText,
    tag: "Discipline 03 · Regulatory Governance",
    title: "Government Permits & Regulatory Clearances",
    subtitle: "Full LGU permit processing so your build stays 100% compliant and unhindered.",
    description:
      "Navigating municipal bureaucracies across Central Luzon can delay a build by months. RBC Builders handles the entire permitting lifecycle with local LGUs, barangays, and fire bureaus, ensuring your project has legal sanction at every milestone.",
    badge: "Full Municipal Building Permit & BFP Fire Safety Clearances Guaranteed",
    deliverables: [
      "Barangay construction clearances & neighbor notifications",
      "City/Municipal building permit acquisition (San Fernando, Angeles, Clark, etc.)",
      "Zoning, environmental, and structural safety documentation",
      "Bureau of Fire Protection (BFP) safety clearances & inspections",
      "Final municipal inspection and Certificate of Occupancy handover",
    ],
    chips: [
      "City of San Fernando",
      "Angeles City",
      "Clark Freeport",
      "Guagua & Lubao",
      "Mexico & Bacolor",
      "Tarlac Province",
      "Bataan & Zambales",
    ],
    ctaLabel: "Inquire Permitting Assistance",
    ctaHref: "#contact",
  },
  {
    id: "04",
    shortName: "Bank Financing",
    icon: Landmark,
    tag: "Discipline 04 · Capital Structuring",
    title: "Bank Loan Financing Assistance",
    subtitle: "Turnkey bank loan coordination and milestone drawdown documentation.",
    description:
      "Building an estate through a construction loan requires strict financial and technical documentation. We prepare bank-standard Bills of Quantities (BOQ), certified cost breakdowns, and stage-by-stage billing statements accepted by all major Philippine financial institutions.",
    badge: "Bank-Accredited BOQ Documentation & Appraisal Stage Drawdown Coordination",
    deliverables: [
      "Bank-accredited detailed Bill of Quantities (BOQ) with unit costs",
      "Standard construction agreement formatted for bank appraisal",
      "Progress billing milestones aligned with bank drawdown schedules",
      "Direct coordination with BDO, BPI, Metrobank, Security Bank, & Pag-IBIG",
      "Site inspection accompaniment for bank appraiser verification",
    ],
    chips: ["BDO", "BPI", "Metrobank", "Security Bank", "Pag-IBIG Fund", "UnionBank"],
    ctaLabel: "Consult Financing Options",
    ctaHref: "#contact",
  },
  {
    id: "05",
    shortName: "3D Renders",
    icon: Sparkles,
    tag: "Discipline 05 · 3D Visualization Studio",
    title: "3D Rendering Projects & Architectural CGI",
    subtitle: "High-fidelity daytime & twilight CGI elevations, interior spatial design, and material studies.",
    description:
      "Experience your custom residence before groundbreaking with high-fidelity architectural visualizations. Our dedicated 3D visualization studio crafts ultra-detailed CGI elevations, dynamic natural lighting simulations, and material texture studies that bring your vision to life with complete photorealism.",
    badge: "Official RBC Builders Rendering Monograph & Behance Portfolio",
    deliverables: [
      "High-resolution exterior daytime & dramatic twilight architectural CGI renders",
      "Immersive interior 3D visualizations with curated lighting & tactile textures",
      "Accurate solar path, shadow dynamics, and natural cross-ventilation modeling",
      "Photorealistic material palette preview (stone, timber, glass, concrete)",
      "Direct access to RBC Builders' official Behance design showcase portfolio",
    ],
    isRenderingService: true,
    ctaLabel: "View All Renders on Behance",
    ctaHref: BEHANCE_RENDERING_URL,
    isExternal: true,
  },
];

export default function Services() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeServiceId, setActiveServiceId] = useState<string>("01");
  const [selectedRenderIdx, setSelectedRenderIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll spy with IntersectionObserver: automatically highlights active discipline as user scrolls through each service
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-service-id");
            if (id) setActiveServiceId(id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0.1, 0.4],
      }
    );

    const cards = document.querySelectorAll("[data-service-card]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Smooth programmatic scroll to specific service
  const scrollToService = (id: string) => {
    const el = document.getElementById(`service-${id}`);
    if (!el) return;
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (target: HTMLElement, opts?: Record<string, unknown>) => void;
        };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(el, { offset: -90, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Keyboard navigation for full-screen lightbox
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
      className="py-24 sm:py-32 px-4 sm:px-8 bg-[#f8f6f0] text-foreground relative border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          data-reveal
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Services &amp; Capabilities
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Five Specialized Disciplines.{" "}
              <em className="font-serif italic font-normal text-accent">
                One Accountable Builder.
              </em>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted font-light max-w-md leading-relaxed">
            Scroll down to review each discipline offered in full detail — from architectural concept and turnkey construction to our 3D rendering project portfolio.
          </p>
        </div>

        {/* Mobile Sticky Quick-Jump Pill Bar */}
        <div className="lg:hidden sticky top-14 sm:top-16 z-30 bg-[#f8f6f0]/95 backdrop-blur-md py-2.5 -mx-4 px-4 border-b border-border/80 mb-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {DISCIPLINES.map((d) => {
            const isActive = activeServiceId === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => scrollToService(d.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-accent text-white font-semibold shadow-xs"
                    : "bg-surface border border-border text-muted hover:text-foreground hover:border-accent/40"
                }`}
              >
                <span>{d.id}</span>
                <span className="text-[10px]">{d.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Layout: Sticky Left Navigation Rail + Scrollable Right Services Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Left Navigation Rail (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-3">
            <div className="p-2 rounded-3xl bg-surface/80 border border-border/80 shadow-xs backdrop-blur-sm space-y-2">
              <div className="px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-muted flex items-center justify-between">
                <span>Disciplines Index</span>
                <span className="text-accent font-semibold">
                  0{activeServiceId} / 05
                </span>
              </div>

              {DISCIPLINES.map((item) => {
                const Icon = item.icon;
                const isActive = activeServiceId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToService(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer ${
                      isActive
                        ? "bg-white border-accent shadow-md ring-1 ring-accent text-foreground translate-x-1"
                        : "bg-surface/50 border-transparent hover:border-border hover:bg-white text-muted"
                    }`}
                  >
                    <span
                      className={`font-serif text-base tabular-nums mt-0.5 ${
                        isActive ? "text-accent font-semibold" : "text-muted"
                      }`}
                    >
                      {item.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9.5px] uppercase tracking-wider font-mono text-accent font-semibold truncate">
                          {item.shortName}
                        </span>
                        <Icon
                          size={14}
                          className={isActive ? "text-accent" : "text-muted/60"}
                        />
                      </div>
                      <h4 className="font-serif text-sm text-foreground font-normal mt-0.5 leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Consultation Link */}
            <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
              <span className="text-[10px] uppercase tracking-widest font-mono text-accent font-semibold block mb-1">
                Single-Source Architecture
              </span>
              <p className="text-xs text-foreground/80 font-light leading-relaxed mb-3">
                Have questions about design, turnkey contracting, or 3D rendering?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-accent font-medium hover:text-accent-dim transition-colors"
              >
                <span>Speak with Our Team</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: All 5 Services Stacked in Continuous Natural Scroll Order */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            {DISCIPLINES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={`service-${service.id}`}
                  data-service-card
                  data-service-id={service.id}
                  className="bg-white border border-border p-6 sm:p-10 lg:p-12 rounded-3xl shadow-sm relative overflow-hidden scroll-mt-24 transition-shadow hover:shadow-md"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-start justify-between border-b border-border pb-6 mb-6 gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold font-mono px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/25">
                          {service.tag}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono text-muted">
                          Service {service.id} of 05
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight mt-1 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-accent/90 font-serif italic mt-1 font-light">
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-accent/40 flex items-center justify-center text-accent bg-accent/10 shrink-0">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-foreground/85 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Highlight Badge */}
                  {service.badge && (
                    <div className="inline-flex items-center gap-2 text-xs text-muted font-mono bg-[#f8f6f0] px-3.5 py-1.5 rounded-xl border border-border mb-6">
                      <ShieldCheck size={14} className="text-accent shrink-0" />
                      <span>{service.badge}</span>
                    </div>
                  )}

                  {/* Region or Bank Chips (if present) */}
                  {service.chips && (
                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-muted block mb-2">
                        {service.id === "03"
                          ? "Municipal & Provincial Coverage:"
                          : "Accredited Financial Institutions:"}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {service.chips.map((chip) => (
                          <span
                            key={chip}
                            className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface border border-border text-foreground/85"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guaranteed Deliverables */}
                  <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#fbf9f4] border border-border/80">
                    <h4 className="text-[10.5px] uppercase tracking-[0.2em] text-accent font-semibold font-mono mb-3.5 flex items-center gap-1.5">
                      <Building2 size={13} className="text-accent" />
                      <span>Guaranteed Scope &amp; Deliverables</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5">
                          <span className="h-4.5 w-4.5 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={2.5} />
                          </span>
                          <span className="text-xs sm:text-sm text-foreground/85 font-light leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* SERVICE 05: 15-ITEM 3D RENDERING PROJECTS SHOWCASE       */}
                  {/* ======================================================== */}
                  {service.isRenderingService && (
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-mono text-accent font-semibold block">
                            RBC Architectural CGI Portfolio
                          </span>
                          <h4 className="font-serif text-xl text-foreground font-normal">
                            Interactive 3D Rendering Project Gallery
                          </h4>
                        </div>
                        <a
                          href={BEHANCE_RENDERING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--accent inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium shadow-xs shrink-0 self-start sm:self-auto"
                        >
                          <span>View All on Behance</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      {/* Featured Large Preview with Lightbox Trigger */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white z-10">
                          <span className="text-xs font-mono">
                            Render {selectedRenderIdx + 1} of {RENDERING_PROJECTS.length} &middot; Click to inspect full resolution
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs">
                            <Maximize2 size={11} />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>

                      {/* Horizontal Thumbnail Strip */}
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
                            Explore the Complete 3D Monograph on Behance
                          </span>
                          <p className="text-xs text-foreground/75 font-light leading-relaxed mt-0.5">
                            High-definition CGI renders, dusk lighting breakdowns, and floor plan visualizations curated by RBC Builders.
                          </p>
                        </div>
                        <a
                          href={BEHANCE_RENDERING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--accent inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium shadow-sm shrink-0 hover:scale-[1.02] transition-transform"
                        >
                          <span>Open Behance Gallery</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Card Footer Actions */}
                  <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 mt-6">
                    <span className="text-xs text-muted font-mono">
                      San Fernando &middot; Angeles City &middot; Clark &middot; Pampanga
                    </span>
                    <a
                      href={service.ctaHref}
                      target={service.isExternal ? "_blank" : undefined}
                      rel={service.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent hover:text-accent-dim font-medium transition-colors cursor-pointer"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
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
                <ExternalLink size={12} />
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
              className="absolute left-2 sm:left-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-accent transition-colors cursor-pointer z-10"
              aria-label="Previous render"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % RENDERING_PROJECTS.length)
              }
              className="absolute right-2 sm:right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-accent transition-colors cursor-pointer z-10"
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
