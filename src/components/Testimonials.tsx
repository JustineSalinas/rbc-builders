"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Hammer, Users, MapPin } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import { COMPANY_STATS } from "@/lib/company-stats";

// Real client reviews. Add more here as they come in — the layout
// pairs whatever reviews exist with hard trust signals so the section
// never reads as sparse while the review count is still low.
const TESTIMONIALS = [
  {
    quote:
      "Good architectural and good design of houses. I recommend this, satisfied client. Good model, I will buy again.",
    name: "Jayskie Vergaño",
    detail: "Facebook review",
  },
];

const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: "Licensed & Permitted Builder" },
  { icon: Hammer, label: "Design-to-Turnover, One Accountable Team" },
  { icon: MapPin, label: `${COMPANY_STATS.provincesServed.value} Provinces Served Across Central Luzon` },
  { icon: Users, label: `${COMPANY_STATS.facebookCommunity.value} Facebook Community` },
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
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <h2 data-reveal className="font-display text-4xl sm:text-5xl leading-tight max-w-md">
            Why clients trust us.
          </h2>
          {multiple && (
            <p data-reveal data-reveal-delay="0.08" className="font-display text-sm text-muted tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 border-t border-border pt-10">
          <div data-reveal data-reveal-delay="0.1">
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

          <div data-reveal data-reveal-delay="0.18" className="lg:border-l lg:border-border lg:pl-10">
            <p className="text-xs uppercase tracking-wider text-muted mb-5">
              Backed by
            </p>
            <ul className="flex flex-col gap-4">
              {TRUST_SIGNALS.map((signal) => (
                <li key={signal.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface text-accent">
                    <signal.icon size={16} />
                  </span>
                  <span className="text-sm text-foreground/80">{signal.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
