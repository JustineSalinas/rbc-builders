"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

// Real client reviews. Add more here as they come in.
const TESTIMONIALS = [
  {
    quote:
      "Good architectural and good design of houses. I recommend this, satisfied client. Good model, I will buy again.",
    name: "Jayskie Vergaño",
    detail: "Facebook review",
  },
];

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const multiple = TESTIMONIALS.length > 1;

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-background">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="flex items-end justify-between mb-12">
          <h2 data-reveal className="font-display text-4xl sm:text-5xl leading-tight max-w-md">
            What clients say.
          </h2>
          {multiple && (
            <p data-reveal data-reveal-delay="0.08" className="font-display text-sm text-muted tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </p>
          )}
        </div>

        <div data-reveal data-reveal-delay="0.12" className="relative border-t border-border pt-10">
          <Quote size={36} className="text-accent/30 mb-6" strokeWidth={1.5} />
          <p className="font-display text-2xl sm:text-3xl leading-snug mb-8 max-w-2xl min-h-[4rem] sm:min-h-[6rem]">
            {current.quote}
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{current.name}</p>
              <p className="text-xs text-muted mt-0.5">{current.detail}</p>
            </div>
            {multiple && (
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center border border-border hover:border-accent hover:text-accent transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
