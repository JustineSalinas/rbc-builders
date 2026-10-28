"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

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
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeStep, setActiveStep] = useState(-1);

  // Scroll-driven construction illustration
  useEffect(() => {
    const container = rowsRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const rows = Array.from(container.querySelectorAll<HTMLElement>("[data-step-row]"));
    const g = (id: string) => svg.querySelector<SVGGElement>(`#${id}`);

    const groups = {
      pin: g("pg-pin"),
      blueprint: g("pg-blueprint"),
      permit: g("pg-permit"),
      financing: g("pg-financing"),
      foundation: g("pg-foundation"),
      walls: g("pg-walls"),
      roof: g("pg-roof"),
      finishing: g("pg-finishing"),
    };

    gsap.set([groups.pin, groups.permit, groups.financing, groups.foundation, groups.roof, groups.finishing], {
      opacity: 0,
    });
    gsap.set(groups.blueprint, { opacity: 0 });
    gsap.set(groups.walls, { opacity: 0, scaleY: 0, transformOrigin: "50% 100%" });

    const triggers: ScrollTrigger[] = [];

    rows.forEach((row, i) => {
      const t = ScrollTrigger.create({
        trigger: row,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
      triggers.push(t);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Reveal/hide illustration groups based on active step
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const g = (id: string) => svg.querySelector<SVGGElement>(`#${id}`);

    const reveal = (el: SVGGElement | null, show: boolean, extra?: object) => {
      if (!el) return;
      gsap.to(el, { opacity: show ? 1 : 0, duration: 0.6, ease: "power2.out", ...(show ? extra : {}) });
    };

    reveal(g("pg-pin"), activeStep >= 0 && activeStep < 1);
    reveal(g("pg-blueprint"), activeStep >= 1);
    reveal(g("pg-permit"), activeStep >= 2);
    reveal(g("pg-financing"), activeStep >= 3);
    reveal(g("pg-foundation"), activeStep >= 4);
    if (activeStep >= 5) {
      gsap.to(g("pg-walls"), { opacity: 1, scaleY: 1, duration: 0.9, ease: "power3.out" });
    } else {
      gsap.to(g("pg-walls"), { opacity: 0, scaleY: 0, duration: 0.4, ease: "power2.in" });
    }
    reveal(g("pg-roof"), activeStep >= 5, { delay: 0.3 });
    reveal(g("pg-finishing"), activeStep >= 6);
  }, [activeStep]);

  const percent = Math.round(((Math.max(activeStep, 0) + 1) / STEPS.length) * 100);

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
          {/* Sticky construction illustration */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-background border border-border p-8">
              <svg ref={svgRef} viewBox="0 0 240 200" className="w-full h-auto">
                {/* ground */}
                <line x1="10" y1="175" x2="230" y2="175" stroke="var(--border)" strokeWidth="2" />

                {/* stage 1: site pin */}
                <g id="pg-pin">
                  <circle cx="120" cy="165" r="4" fill="var(--accent)" />
                  <path d="M120 165 L120 140" stroke="var(--accent)" strokeWidth="2" />
                  <path d="M120 140 q16 0 16 12 q-16 4 -16 -12" fill="var(--accent)" />
                </g>

                {/* stage 2: blueprint footprint */}
                <g id="pg-blueprint">
                  <rect x="65" y="110" width="110" height="65" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="5 4" />
                </g>

                {/* stage 3: permit stamp */}
                <g id="pg-permit">
                  <circle cx="190" cy="100" r="16" fill="none" stroke="var(--accent)" strokeWidth="2" />
                  <path d="M183 100 l5 5 l9 -11" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* stage 4: financing */}
                <g id="pg-financing">
                  <circle cx="50" cy="100" r="14" fill="none" stroke="var(--accent)" strokeWidth="2" />
                  <text x="50" y="105" textAnchor="middle" fontSize="14" fill="var(--accent)" fontFamily="var(--font-archivo)">
                    {"₱"}
                  </text>
                </g>

                {/* stage 5: foundation */}
                <g id="pg-foundation">
                  <rect x="65" y="168" width="110" height="8" fill="var(--muted)" />
                </g>

                {/* stage 6: walls + roof */}
                <g id="pg-walls">
                  <rect x="70" y="118" width="100" height="50" fill="var(--surface)" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="1.5" />
                </g>
                <g id="pg-roof">
                  <path d="M60 118 L120 85 L180 118 Z" fill="var(--accent)" />
                </g>

                {/* stage 7: finishing touches */}
                <g id="pg-finishing">
                  <rect x="112" y="140" width="18" height="28" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
                  <rect x="82" y="130" width="16" height="16" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
                  <rect x="142" y="130" width="16" height="16" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
                  <line x1="90" y1="130" x2="90" y2="146" stroke="var(--accent)" strokeWidth="1" />
                  <line x1="82" y1="138" x2="98" y2="138" stroke="var(--accent)" strokeWidth="1" />
                  <line x1="150" y1="130" x2="150" y2="146" stroke="var(--accent)" strokeWidth="1" />
                  <line x1="142" y1="138" x2="158" y2="138" stroke="var(--accent)" strokeWidth="1" />
                </g>
              </svg>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-muted">Build Progress</span>
                  <span className="font-display text-xl text-accent tabular-nums">{percent}%</span>
                </div>
                <div className="h-1.5 bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent transition-[width] duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step list */}
          <div ref={rowsRef} className="border-t border-border">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                data-step-row
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
