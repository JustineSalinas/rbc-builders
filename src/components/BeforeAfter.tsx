"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const SLIDES = [
  {
    src: "/images/before.jpg",
    label: "Before",
    caption: "Mid-construction. Structural shell, scaffolding, and groundwork underway.",
  },
  {
    src: "/images/after.jpg",
    label: "After",
    caption: "Completed and move-in ready. Same build, delivered to spec.",
  },
];

export default function BeforeAfter() {
  const sectionRef = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, scrollStart: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, scrollStart: track.scrollLeft };
    setDragging(true);
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    track.scrollLeft = drag.current.scrollStart - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 bg-surface overflow-hidden">
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <h2
            data-reveal
            className="font-display text-4xl sm:text-5xl leading-tight max-w-xl"
          >
            Watch the transformation.
          </h2>
          <p data-reveal data-reveal-delay="0.08" className="flex items-center gap-2 text-sm text-muted shrink-0">
            <MoveHorizontal size={16} className="text-accent" />
            Drag to compare
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`hide-scrollbar flex gap-5 overflow-x-auto px-4 sm:px-6 pb-2 snap-x snap-proximity select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="shrink-0 w-[6vw] sm:w-[10vw]" aria-hidden />
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            data-reveal
            data-reveal-delay={0.08 + i * 0.1}
            className="group relative shrink-0 w-[82vw] sm:w-[58vw] lg:w-[46vw] aspect-[4/3] snap-center overflow-hidden"
          >
            <Image
              src={slide.src}
              alt={slide.label === "Before" ? "Construction in progress" : "Completed RBC Builders home"}
              fill
              draggable={false}
              sizes="(max-width: 1024px) 80vw, 46vw"
              className="object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />

            <span className="absolute top-5 left-5 inline-flex items-center gap-2 bg-background/80 backdrop-blur-md px-3.5 py-1.5">
              <span className="font-display text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs uppercase tracking-widest text-accent">{slide.label}</span>
            </span>

            <p className="absolute bottom-5 left-5 right-5 text-sm text-foreground/80 leading-relaxed max-w-sm">
              {slide.caption}
            </p>
          </div>
        ))}
        <div className="shrink-0 w-[6vw] sm:w-[10vw]" aria-hidden />
      </div>
    </section>
  );
}
