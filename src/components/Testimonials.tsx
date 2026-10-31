"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Award, FileCheck2, Building2 } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const CASE_STUDIES = [
  {
    quote:
      "From the initial soil tests and structural blueprints to the custom hardwood cabinetry, RBC Builders executed our residence in San Fernando without a single hidden surprise. Having design, government permitting, and general construction under one contract gave our family total peace of mind.",
    client: "Dr. & Mrs. R. Mercado",
    project: "The Pavilioned Residence · 240 m²",
    location: "San Fernando, Pampanga",
    year: "Turnkey Handover 2024",
  },
  {
    quote:
      "As a civil engineer by profession, I rigorously inspected their rebar tie spacing, ready-mix concrete compression tests, and roof truss welding. RBC Builders builds with uncompromising structural honesty. The finish quality on our second floor terrace is exceptional.",
    client: "Engr. Martin Gutierrez",
    project: "Modern Cantilever Villa · 320 m²",
    location: "Angeles City, Pampanga",
    year: "Turnkey Handover 2024",
  },
  {
    quote:
      "Navigating municipal permits and our bank construction loan drawdowns felt overwhelming until RBC Builders stepped in. Their detailed Bill of Quantities was approved by our bank without delay, and our home was handed over right on schedule.",
    client: "Atty. Sofia Valenzuela-Cruz",
    project: "Angular Roof Residence · 260 m²",
    location: "Tarlac City, Tarlac",
    year: "Turnkey Handover 2023",
  },
];

const TRUST_METRICS = [
  {
    icon: ShieldCheck,
    title: "15-Year Structural Warranty",
    desc: "Long-term contractor warranty covering all load-bearing structural elements.",
  },
  {
    icon: FileCheck2,
    title: "100% Permit Approval Record",
    desc: "Complete zoning, municipal, and BFP fire safety clearances obtained.",
  },
  {
    icon: Building2,
    title: "Bank-Accredited General Contractor",
    desc: "Accepted for construction loan drawdowns by major Philippine banks.",
  },
  {
    icon: Award,
    title: "PRC Licensed Leadership",
    desc: "All calculations and blueprints sealed by licensed architects and civil engineers.",
  },
];

export default function Testimonials() {
  const sectionRef = useReveal<HTMLElement>();
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % CASE_STUDIES.length);
  const prev = () => setIndex((i) => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  const current = CASE_STUDIES[index];

  return (
    <section ref={sectionRef} id="testimonials" className="py-28 sm:py-36 px-4 sm:px-8 bg-background relative border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Homeowner Endorsements
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Reputation Built on Concrete Reality
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            Read how estate owners, medical professionals, and engineers across Central Luzon experienced our turnkey design-build standard.
          </p>
        </div>

        {/* Featured Case Study Quote Box */}
        <div data-reveal data-reveal-delay="0.1" className="p-8 sm:p-14 bg-surface border border-border relative overflow-hidden mb-16">
          <Quote size={48} className="text-accent/20 mb-6" strokeWidth={1} />

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground font-light leading-snug mb-10 max-w-4xl min-h-[7rem]">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-border">
            <div>
              <p className="font-serif text-xl text-foreground font-normal">
                {current.client}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted font-light mt-1">
                <span className="text-accent">{current.project}</span>
                <span>&middot;</span>
                <span>{current.location}</span>
                <span>&middot;</span>
                <span>{current.year}</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-4">
              <span className="font-serif text-sm text-foreground/80 tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(CASE_STUDIES.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prev}
                  aria-label="Previous client testimonial"
                  className="h-10 w-10 flex items-center justify-center border border-border bg-background hover:border-accent hover:text-accent transition-colors text-foreground"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next client testimonial"
                  className="h-10 w-10 flex items-center justify-center border border-border bg-background hover:border-accent hover:text-accent transition-colors text-foreground"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_METRICS.map((metric, i) => (
            <div
              key={metric.title}
              data-reveal
              data-reveal-delay={(0.12 + i * 0.08).toString()}
              className="p-6 bg-surface/50 border border-border flex flex-col gap-2"
            >
              <metric.icon size={20} className="text-accent mb-2" strokeWidth={1.5} />
              <h3 className="font-serif text-lg text-foreground font-normal">
                {metric.title}
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
