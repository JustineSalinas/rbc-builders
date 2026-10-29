"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

const ConstructionScene = dynamic(() => import("./ConstructionScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const STEPS = [
  {
    step: "01",
    title: "Inquiry & Site Visit",
    desc: "We review your lot, your goals, and your target budget, in person where possible.",
  },
  {
    step: "02",
    title: "Design & Estimate",
    desc: "Architectural plans and a per-square-meter cost breakdown across our four finish tiers.",
  },
  {
    step: "03",
    title: "Contract & Permits",
    desc: "We finalize the build contract and process your government building permits.",
  },
  {
    step: "04",
    title: "Financing Assistance",
    desc: "If needed, we help prepare and guide your bank loan application alongside the build timeline.",
  },
  {
    step: "05",
    title: "Groundbreaking",
    desc: "Site mobilization, excavation, and foundation work begin on the agreed schedule.",
  },
  {
    step: "06",
    title: "Construction",
    desc: "Structural work, MEP rough-ins, and finishes applied to your chosen tier specification.",
  },
  {
    step: "07",
    title: "Turnover",
    desc: "Final walkthrough, punch list resolution, and the keys handed to you.",
  },
];

export default function Process() {
  const ref = useReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Single scrubbed trigger is the one source of truth for both the
  // 3D build progress and the active step highlight — avoids drift
  // between separate per-row triggers.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top 70%",
      end: "bottom 40%",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        setActiveStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
      },
    });

    return () => trigger.kill();
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 bg-surface">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14 sm:mb-20">
          <h2 data-reveal className="font-display text-4xl sm:text-5xl leading-tight max-w-xl">
            From first call to the keys in your hand.
          </h2>
          <p data-reveal data-reveal-delay="0.08" className="text-sm text-muted max-w-xs">
            Seven steps, one accountable team. No handoffs between separate designers, contractors, and permit runners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] gap-10 lg:gap-16">
          {/* Sticky 3D construction scene */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-background border border-border p-6">
              <div className="aspect-square w-full">
                <ConstructionScene progress={progress} />
              </div>

              <div className="mt-2 pt-6 border-t border-border">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-muted">Build Progress</span>
                  <span className="font-display text-xl text-accent tabular-nums">{percent}%</span>
                </div>
                <div className="h-1.5 bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${percent}%`, transition: "width 0.1s linear" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step list */}
          <div ref={trackRef} className="border-t border-border">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                data-reveal
                data-reveal-delay={0.05 + i * 0.05}
                className={`grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr_2fr] gap-x-6 sm:gap-x-10 items-baseline py-7 sm:py-8 border-b border-border transition-opacity duration-300 ${
                  activeStep === i ? "opacity-100" : "opacity-70"
                }`}
              >
                <span
                  className={`font-display text-xl sm:text-2xl transition-colors duration-300 ${
                    activeStep >= i ? "text-accent" : "text-muted"
                  }`}
                >
                  {s.step}
                </span>
                <h3 className="font-display text-xl sm:text-2xl">{s.title}</h3>
                <p className="col-start-2 sm:col-start-3 text-sm text-foreground/60 leading-relaxed mt-2 sm:mt-0 max-w-md">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
