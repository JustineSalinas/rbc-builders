"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDownRight, MapPin, Maximize2, ShieldCheck } from "lucide-react";
import { COMPANY_STATS } from "@/lib/company-stats";
import { gsap } from "@/lib/gsap";

const SLIDES = [
  {
    src: "/images/hero.jpg",
    title: "The Pavilioned Estate",
    location: "San Fernando, Pampanga",
    area: "340 m²",
    typology: "Private Luxury Residence",
    caption: "Unified architectural design, reinforced concrete execution, and turnkey luxury handover.",
  },
  {
    src: "/images/hero-2.jpg",
    title: "Double-Height Great Room",
    location: "Angeles City, Pampanga",
    area: "280 m²",
    typology: "Contemporary Interior Architecture",
    caption: "Bespoke interior architecture with imported large-format porcelain slabs and integrated cove illumination.",
  },
  {
    src: "/images/hero-3.jpg",
    title: "The Gated Horizon Villa",
    location: "Clark Enclave, Pampanga",
    area: "310 m²",
    typology: "Modern Gated Estate",
    caption: "Custom boundary enclosure, architectural timber louvers, and climate-responsive solar shading.",
  },
  {
    src: "/images/hero-4.jpg",
    title: "The Angular Monolith",
    location: "Tarlac City, Central Luzon",
    area: "290 m²",
    typology: "Mid-Century Modern Villa",
    caption: "Structural integrity without compromise: permit processing, raw excavation to completed keys.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((s) => (s + 1) % SLIDES.length);
  const prev = () => setCurrent((s) => (s - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="top" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-background overflow-hidden architectural-grid">
      {/* Ambient warm champagne glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Main Balanced Grid: Left Narrative + Right Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          {/* Left Column: Brand Statement & Positioning */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Accreditation Badge */}
            <div className="hero-reveal inline-flex items-center gap-2.5 px-3 py-1 mb-4 border border-accent/40 bg-accent/5 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.26em] text-accent font-medium">
                Architects &middot; Design &middot; Builders &middot; Central Luzon
              </span>
            </div>

            {/* Editorial Main Headline */}
            <h1 className="hero-reveal font-serif text-4xl sm:text-5xl lg:text-[3.7rem] font-light leading-[1.06] tracking-tight text-foreground mb-6">
              Architecture engineered with permanence.{" "}
              <span className="italic font-normal text-accent block mt-1">
                Built for generations.
              </span>
            </h1>

            {/* Core Narrative Paragraph */}
            <p className="hero-reveal text-sm sm:text-[15px] text-foreground/75 leading-relaxed font-light mb-8 max-w-lg">
              Headquartered in the City of San Fernando, Pampanga, RBC Builders unifies architectural planning, seismic structural calculations, LGU municipal permitting, and master general contracting under single-source accountability.
            </p>

            {/* Call to Actions */}
            <div className="hero-reveal flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#contact"
                className="btn btn--accent shadow-md"
              >
                <span>Start a Project</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="#projects"
                className="btn btn--line"
              >
                <span>Explore Works</span>
                <ArrowDownRight size={14} />
              </a>
            </div>

            {/* Active Project Micro-Card */}
            <div className="hero-reveal p-4 bg-surface border border-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent/80 shrink-0" />
                <div>
                  <p className="font-serif text-sm text-foreground font-normal leading-tight">
                    {slide.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted font-light mt-0.5">
                    {slide.location} &middot; {slide.area}
                  </p>
                </div>
              </div>
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-accent font-medium px-2 py-1 bg-accent/10 border border-accent/20">
                {slide.typology.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame */}
          <div className="lg:col-span-7 hero-reveal">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-border bg-black shadow-2xl group">
              {SLIDES.map((s, i) => (
                <div
                  key={s.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    i === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    priority={i === 0}
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center scale-[1.01] transition-transform duration-[6500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                </div>
              ))}

              {/* Bottom Information & Controls Bar */}
              <div className="absolute bottom-5 inset-x-5 z-20 flex items-end justify-between gap-4">
                <div className="max-w-md">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent-light mb-1 font-medium">
                    <MapPin size={11} className="text-accent-light" />
                    <span>{slide.location}</span>
                    <span className="text-white/40">&middot;</span>
                    <span className="text-white/90 flex items-center gap-1">
                      <Maximize2 size={11} /> {slide.area}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-xs text-white/80 font-light mt-1 hidden sm:block line-clamp-1">
                    {slide.caption}
                  </p>
                </div>

                {/* Slideshow Navigation Controls */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-serif text-xs tracking-widest text-white/90 tabular-nums">
                    {String(current + 1).padStart(2, "0")}{" "}
                    <span className="text-white/60 font-sans font-light">/ {String(SLIDES.length).padStart(2, "0")}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prev}
                      aria-label="Previous architectural build"
                      className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center border border-white/30 bg-black/40 hover:border-accent hover:text-accent transition-colors text-white backdrop-blur-sm"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next architectural build"
                      className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center border border-white/30 bg-black/40 hover:border-accent hover:text-accent transition-colors text-white backdrop-blur-sm"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prestigious Key Metrics Bar with Hairline Dividers */}
        <div className="hero-reveal border-t border-border pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col">
            <span className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-tight">
              {COMPANY_STATS.totalFloorAreaDelivered.value}
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-muted mt-1 font-light">
              Built Floor Area Delivered
            </span>
          </div>

          <div className="flex flex-col sm:border-l border-border sm:pl-8">
            <span className="font-serif text-3xl sm:text-4xl text-accent font-light tracking-tight">
              {COMPANY_STATS.provincesServed.value}{" "}
              <span className="text-sm font-sans font-normal text-muted">Provinces</span>
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-muted mt-1 font-light">
              Pampanga, Tarlac, Bataan, Zambales
            </span>
          </div>

          <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-8">
            <span className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-tight flex items-center gap-2">
              {COMPANY_STATS.permitApprovalRate.value}
              <ShieldCheck size={20} className="text-accent" />
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-muted mt-1 font-light">
              LGU Permitting &amp; Title Compliance
            </span>
          </div>

          <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-8">
            <span className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-tight">
              {COMPANY_STATS.avgTurnover.value}{" "}
              <span className="text-sm font-sans font-normal text-muted">Months</span>
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.2em] text-muted mt-1 font-light">
              Average Turnkey Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
