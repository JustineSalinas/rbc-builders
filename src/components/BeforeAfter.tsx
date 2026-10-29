"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
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
    <section ref={sectionRef} className="py-28 sm:py-36 px-4 sm:px-6 bg-surface">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <h2 data-reveal className="font-display text-4xl sm:text-5xl leading-tight max-w-xl">
            Watch the transformation.
          </h2>
          <p data-reveal data-reveal-delay="0.08" className="flex items-center gap-2 text-sm text-muted shrink-0">
            <MoveHorizontal size={16} className="text-accent" />
            Drag to compare
          </p>
        </div>

        <div
          data-reveal
          data-reveal-delay="0.12"
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
          className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden select-none cursor-ew-resize touch-none"
        >
          <Image
            src="/images/after.jpg"
            alt="Completed RBC Builders home"
            fill
            draggable={false}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />

          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image
              src="/images/before.jpg"
              alt="Construction in progress"
              fill
              draggable={false}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* drag handle */}
          <div className="absolute top-0 bottom-0 w-px bg-accent/80" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-background shadow-lg">
              <MoveHorizontal size={18} />
            </div>
          </div>

          <span className="absolute top-5 left-5 bg-background/80 backdrop-blur-md px-3.5 py-1.5 text-xs uppercase tracking-widest text-foreground/90">
            Before
          </span>
          <span className="absolute top-5 right-5 bg-background/80 backdrop-blur-md px-3.5 py-1.5 text-xs uppercase tracking-widest text-accent">
            After
          </span>
        </div>
      </div>
    </section>
  );
}
