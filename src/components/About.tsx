"use client";

import Image from "next/image";
import { ArrowUpRight, Shield, Layers, Scale, Sparkles } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const PILLARS = [
  {
    icon: Layers,
    title: "Unified Design-Build Accountability",
    desc: "No friction between separate architects and general contractors. From initial structural blueprints to the final interior coat, a single master builder is responsible for your investment.",
  },
  {
    icon: Scale,
    title: "Precise Cost Engineering (No Variations)",
    desc: "Every design decision is cross-referenced against realistic material costs and labor indices before groundbreaking. We build according to an itemized, transparent Bill of Quantities.",
  },
  {
    icon: Shield,
    title: "Permit Governance & Seismic Rigor",
    desc: "All structural calculations are sealed by licensed PRC civil engineers, fully complying with the National Building Code of the Philippines and local municipal seismic standards.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Material Finishes",
    desc: "From Bare Shell to Bespoke Luxury finishes, our sourced materials — imported porcelain slabs, analok architectural windows, solid hardwood millwork — are guaranteed authentic.",
  },
];

export default function About() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="py-28 sm:py-36 px-4 sm:px-8 bg-background relative overflow-hidden">
      {/* Background architectural coordinates watermark */}
      <div className="absolute right-6 top-12 select-none pointer-events-none opacity-[0.03] text-foreground font-serif text-[12vw] leading-none">
        PAMPANGA
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div data-reveal className="max-w-3xl mb-16 sm:mb-24">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
            The Practice · Architectural Design + Construction
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight">
            A singular responsibility from architectural conception to structural reality.
          </h2>
        </div>

        {/* Two-Column Grid: Visual Story + Philosophical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image with Architectural Monograph Framing */}
          <div data-reveal data-reveal-delay="0.1" className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-surface">
              <Image
                src="/images/project-1.jpg"
                alt="RBC Builders completed luxury estate in Pampanga"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Monograph caption */}
              <div className="absolute bottom-6 inset-x-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium block mb-1">
                  Private Estate Execution
                </span>
                <p className="font-serif text-lg text-foreground font-normal">
                  The Pavilioned Residence · San Fernando
                </p>
                <p className="text-xs text-foreground/70 font-light mt-1">
                  240 m² floor area delivered turnkey with structural guarantee and private landscaped courtyard.
                </p>
              </div>
            </div>

            {/* Quick firm badge overlay */}
            <div className="mt-6 p-6 bg-surface border border-border flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Firm Headquarters</p>
                <p className="font-serif text-base text-foreground mt-0.5">San Fernando, Pampanga, PH</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Active Service</p>
                <p className="text-xs text-foreground/80 font-light mt-0.5">Central Luzon Region</p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Narrative & 4 Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div data-reveal data-reveal-delay="0.15" className="prose prose-invert max-w-none mb-10">
              <p className="text-base sm:text-lg text-foreground/80 font-light leading-relaxed mb-6">
                Most home building projects stumble over the historic disconnect between creative designers and general contractors. An independent architect drafts a vision without direct accountability for construction costs; the builder inherits plans they must interpret; and the homeowner absorbs the expensive fallout of variation orders and delayed permits.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 font-light leading-relaxed">
                RBC Builders operates on the integrated <strong className="text-foreground font-medium">Design-Build</strong> doctrine. Our architects, civil engineers, master carpenters, and permit officers work side by side under one roof. We draft with structural awareness, build with architectural reverence, and stand behind our work for decades to come.
              </p>
            </div>

            {/* Four Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border">
              {PILLARS.map((pillar, i) => (
                <div
                  key={pillar.title}
                  data-reveal
                  data-reveal-delay={(0.2 + i * 0.08).toString()}
                  className="p-6 bg-surface border border-border flex flex-col"
                >
                  <pillar.icon size={20} className="text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg text-foreground font-normal mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom action link */}
            <div data-reveal data-reveal-delay="0.45" className="mt-10 flex items-center gap-6">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors font-medium pb-1 border-b border-accent/40 hover:border-foreground"
              >
                <span>Explore Full Design-Build Capabilities</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
