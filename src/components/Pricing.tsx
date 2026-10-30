"use client";

import { Check } from "lucide-react";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              data-reveal
              data-reveal-delay={0.1 + i * 0.08}
              className={`relative flex flex-col bg-background border-t border-b border-r border-border first:border-l lg:first:border-l ${
                tier.featured ? "lg:-translate-y-3" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute inset-x-0 -top-px h-px bg-accent" />
              )}

              <div className="flex flex-col flex-1 p-8 sm:p-9">
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="font-display text-xl">{tier.name}</h3>
                  {tier.featured && (
                    <span className="text-[10px] uppercase tracking-[0.15em] text-accent">
                      Most Chosen
                    </span>
                  )}
                </div>

                <div className="mb-1 flex items-start gap-1">
                  <span className="text-accent text-lg mt-1.5">₱</span>
                  <span className="font-display text-3xl sm:text-[2.1rem] leading-none tabular-nums">
                    {tier.price}
                  </span>
                </div>
                <p className="text-xs text-muted mb-8">
                  {tier.priceTo ? `up to ₱${tier.priceTo}` : "and up"} &middot; {tier.unit}
                </p>

                <ul className="flex flex-col gap-4 mb-9 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground/65 leading-snug"
                    >
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className={`mt-0.5 shrink-0 ${tier.featured ? "text-accent" : "text-foreground/30"}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`text-center py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                    tier.featured
                      ? "bg-accent text-background hover:bg-foreground"
                      : "border border-border text-foreground/70 hover:border-accent hover:text-accent"
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
