"use client";

import { Check, Crown } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const TIERS = [
  {
    name: "Bare Finish",
    price: "18,000",
    priceTo: "20,000",
    unit: "per sqm",
    features: [
      "Ceiling: None, flat",
      "Windows: Jalousie, steel",
      "Doors: Simple wood",
      "Floors: Cement finish, ceramic tiles",
      "Walls: Concrete finish, no paint",
      "Fixtures & electrical: Economic",
    ],
    featured: false,
  },
  {
    name: "Standard Finish",
    price: "20,000",
    priceTo: "25,000",
    unit: "per sqm",
    features: [
      "Ceiling: Flat",
      "Windows: Aluminum / UPVC white",
      "Doors: Simple wood",
      "Floors: Ceramic tiles",
      "Walls: Paint with accent colors",
      "Fixtures & electrical: Regular",
    ],
    featured: false,
  },
  {
    name: "Premium Finish",
    price: "25,000",
    priceTo: "29,000",
    unit: "per sqm",
    features: [
      "Ceiling: Flat, PVC textured panel",
      "Windows: Aluminum analok / UPVC",
      "Doors: Solid wood",
      "Floors: Granite tiles, wood floors",
      "Walls: Paint finish w/ stone accents",
      "Fixtures & electrical: Semi-luxury",
    ],
    featured: true,
  },
  {
    name: "Luxury Finish",
    price: "29,000",
    priceTo: null,
    unit: "per sqm",
    features: [
      "Ceiling: Flat, PVC panel, cove lights",
      "Windows: Powdercoated aluminum",
      "Doors: Solid wood",
      "Floors: Granite tiles, wood floors",
      "Walls: Paint, stone accents, PVC cladding",
      "Fixtures & electrical: Full luxury",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="py-28 sm:py-36 px-4 sm:px-6 bg-surface">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2
            data-reveal
            className="font-display text-4xl sm:text-5xl leading-tight"
          >
            House construction cost in Pampanga.
          </h2>
          <p data-reveal data-reveal-delay="0.08" className="mt-5 text-foreground/60">
            Transparent per-square-meter pricing so you know exactly what
            you&apos;re building toward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 lg:items-start">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              data-reveal
              data-reveal-delay={0.1 + i * 0.08}
              className={`group flex flex-col bg-background transition-all duration-300 ${
                tier.featured
                  ? "lg:-translate-y-4 ring-1 ring-accent shadow-[0_30px_70px_-25px_rgba(255,90,31,0.45)]"
                  : "ring-1 ring-border hover:ring-foreground/20"
              }`}
            >
              {tier.featured ? (
                <div className="flex items-center justify-center gap-1.5 bg-accent text-background text-[11px] font-semibold uppercase tracking-[0.15em] py-2.5">
                  <Crown size={12} strokeWidth={2.5} />
                  Most Chosen
                </div>
              ) : (
                <div className="h-2.5" />
              )}

              <div className="flex flex-col flex-1 p-7 sm:p-8">
                <h3 className="font-display text-xl mb-5">{tier.name}</h3>

                <div className="mb-1 flex items-start gap-1">
                  <span className="text-accent text-lg mt-1.5">₱</span>
                  <span className="font-display text-3xl sm:text-[2.1rem] leading-none tabular-nums">
                    {tier.price}
                  </span>
                </div>
                <p className="text-xs text-muted mb-7">
                  {tier.priceTo ? `up to ₱${tier.priceTo}` : "and up"} &middot; {tier.unit}
                </p>

                <div className="h-px bg-border mb-7" />

                <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground/70 leading-snug"
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          tier.featured ? "bg-accent/20 text-accent" : "bg-surface text-muted"
                        }`}
                      >
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`text-center py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    tier.featured
                      ? "bg-accent text-background hover:bg-foreground"
                      : "border border-border text-foreground/80 group-hover:border-accent group-hover:text-accent"
                  }`}
                >
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
