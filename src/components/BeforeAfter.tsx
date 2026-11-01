"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal, ShieldCheck, Check } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function BeforeAfter() {
  const sectionRef = useReveal<HTMLElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const updatePos = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  // Idle showcase: slowly sweeps the slider back and forth until the
  // visitor takes control by dragging it themselves.
  useEffect(() => {
    if (!autoPlay) return;
    let frame: number;
    let direction = 1;
    const speed = 0.12; // % per frame (~60fps)
    const tick = () => {
      setPos((p) => {
        let next = p + speed * direction;
        if (next >= 85) {
          next = 85;
          direction = -1;
        } else if (next <= 15) {
          next = 15;
          direction = 1;
        }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoPlay]);

  return (
    <section ref={sectionRef} id="transformation" className="py-28 sm:py-36 px-4 sm:px-8 bg-surface relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Site Transformation
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              From Groundwork to Completed Handover
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-muted whitespace-nowrap">
            <MoveHorizontal size={16} className="text-accent shrink-0" />
            <span>Drag slider to compare phases</span>
          </div>
        </div>

        {/* Comparison Frame */}
        <div data-reveal data-reveal-delay="0.1" className="relative border border-border bg-black shadow-2xl overflow-hidden">
          <div
            ref={containerRef}
            onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
            onMouseDown={(e) => {
              dragging.current = true;
              setAutoPlay(false);
              updatePos(e.clientX);
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => updatePos(e.touches[0].clientX)}
            onTouchStart={(e) => {
              dragging.current = true;
              setAutoPlay(false);
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
              className="absolute top-0 bottom-0 w-[2px] bg-accent shadow-[0_0_12px_rgba(154,116,66,0.8)]"
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
                  if (e.key === "ArrowLeft") {
                    setAutoPlay(false);
                    setPos((p) => Math.max(0, p - 5));
                  }
                  if (e.key === "ArrowRight") {
                    setAutoPlay(false);
                    setPos((p) => Math.min(100, p + 5));
                  }
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-white/95 border border-accent flex items-center justify-center text-accent shadow-xl focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <MoveHorizontal size={16} />
              </div>
            </div>

            {/* Phase Watermark Labels — stacked on mobile so they can
                never collide; side by side once there's room (sm+) */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pointer-events-none">
              <span className="self-start text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-white/20 text-white font-medium backdrop-blur-md whitespace-nowrap">
                <span className="sm:hidden">Before</span>
                <span className="hidden sm:inline">Structural Execution (Phase 05)</span>
              </span>

              <span className="self-end sm:self-start text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-accent/50 text-accent font-medium backdrop-blur-md whitespace-nowrap">
                <span className="sm:hidden">After</span>
                <span className="hidden sm:inline">Turnkey Handover (Phase 07)</span>
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
                Poured-in-place concrete structures built to the project's structural engineering plan.
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
              <h4 className="font-serif text-lg text-foreground font-normal">Punch List Resolution</h4>
              <p className="text-xs text-muted font-light mt-0.5 leading-relaxed">
                Every item on the final walkthrough is resolved before keys are handed over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
