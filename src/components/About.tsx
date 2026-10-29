"use client";

import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import { COMPANY_STATS } from "@/lib/company-stats";

const STATS = [
  { value: COMPANY_STATS.facebookCommunity.value, label: "Followers & Community" },
  { value: COMPANY_STATS.provincesServed.value, label: COMPANY_STATS.provincesServed.label },
  { value: COMPANY_STATS.avgFloorAreaPerProject.value, label: COMPANY_STATS.avgFloorAreaPerProject.label },
  { value: COMPANY_STATS.finishTiers.value, label: "Finish Tiers Available" },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 sm:py-36 px-6">
      <div
        ref={ref}
        className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
        <div data-reveal className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/images/project-6.jpg"
            alt="A completed RBC Builders residence, photographed on site"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        <div>
          <h2
            data-reveal
            className="font-display text-4xl sm:text-5xl leading-tight mb-8"
          >
            Design + build, under one roof.
          </h2>
          <p
            data-reveal
            data-reveal-delay="0.08"
            className="text-foreground/70 text-lg leading-relaxed mb-6 max-w-xl"
          >
            RBC Builders is a Pampanga-based design and construction team
            serving Tarlac, Angeles City, Olongapo, Balanga, and Mariveles.
            We take every project from concept to key-turnover: architectural
            design, labor and materials, government permit processing, and
            even bank application assistance for financing.
          </p>
          <p
            data-reveal
            data-reveal-delay="0.14"
            className="text-foreground/70 text-lg leading-relaxed max-w-xl"
          >
            Every home tells a different story, but every dream begins with
            you. Our job is to build it right, on budget, and on time.
          </p>

          <div
            data-reveal
            data-reveal-delay="0.2"
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-border pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-accent">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
