"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal, ShieldCheck, Check } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function BeforeAfter() {
  const sectionRef = useReveal<HTMLElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 px-4 sm:px-8 bg-surface relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Site Transformation
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              From Structural Groundwork to Turnkey Permanence
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            <MoveHorizontal size={16} className="text-accent" />
            <span>Drag slider to compare structural phases</span>
          </div>
        </div>

        {/* Comparison Frame */}
        <div data-reveal data-reveal-delay="0.1" className="relative border border-border bg-black shadow-2xl overflow-hidden">
          <div
            ref={containerRef}
            onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
            onMouseDown={(e) => {
              dragging.current = true;
              updatePos(e.clientX);
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => updatePos(e.touches[0].clientX)}
            onTouchStart={(e) => {
              dragging.current = true;
              updatePos(e.touches[0].clientX);
            }}
            onTouchEnd={() => (dragging.current = false)}
            className="relative aspect-[4/3] sm:aspect-video w-full select-none cursor-ew-resize touch-none"
          >
            {/* After (Completed Build) */}
            <Image
              src="/images/after.jpg"
              alt="Completed residence built by RBC Builders"
              fill
              quality={95}
              draggable={false}
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />

            {/* Before (Under Construction) with clip path */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src="/images/before.jpg"
                alt="Construction in progress: structural framing by RBC Builders"
                fill
                quality={95}
                draggable={false}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-center"
              />
            </div>

            {/* Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-accent shadow-[0_0_12px_rgba(197,168,128,0.8)]"
              style={{ left: `${pos}%` }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                  if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full luxury-glass border border-accent flex items-center justify-center text-accent shadow-xl focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <MoveHorizontal size={16} />
              </div>
            </div>

            {/* Phase Watermark Labels */}
            <div className="absolute top-6 left-6 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 luxury-glass border border-white/10 text-foreground/90 font-medium">
                Structural Execution (Phase 05)
              </span>
            </div>

            <div className="absolute top-6 right-6 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 luxury-glass border border-accent/40 text-accent font-medium">
                Turnkey Handover (Phase 07)
              </span>
            </div>
          </div>
        </div>

        {/* Structural Assurances Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
          <div className="flex items-start gap-3">
            <span className="h-6 w-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <Check size={13} />
            </span>
            <div>
              <h4 className="font-serif text-lg text-foreground font-normal">Reinforced Monolithic Concrete</h4>
              <p className="text-xs text-muted font-light mt-0.5 leading-relaxed">
                Poured-in-place concrete structures engineered to withstand Philippine seismic Zone 4 standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="h-6 w-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <Check size={13} />
            </span>
            <div>
              <h4 className="font-serif text-lg text-foreground font-normal">Concealed MEP Rough-ins</h4>
              <p className="text-xs text-muted font-light mt-0.5 leading-relaxed">
                Multi-stage pressure-tested sanitary lines, certified electrical load computation, and leak barriers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="h-6 w-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <ShieldCheck size={13} />
            </span>
            <div>
              <h4 className="font-serif text-lg text-foreground font-normal">15-Year Structural Guarantee</h4>
              <p className="text-xs text-muted font-light mt-0.5 leading-relaxed">
                Official contractor warranty with comprehensive punch-list resolution prior to key handover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
