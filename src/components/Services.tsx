"use client";

import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const SERVICES = [
  {
    index: "Design",
    title: "Design to Completion",
    desc: "Architectural planning and 3D visualization carried through to the final turnover key. One team, start to finish.",
  },
  {
    index: "Build",
    title: "Labor and Materials",
    desc: "A dedicated crew and sourced materials across four finish tiers, from bare shell to full luxury specification.",
  },
  {
    index: "Permit",
    title: "Government Permits",
    desc: "We process building permits and regulatory requirements so your project stays compliant and on schedule.",
  },
  {
    index: "Finance",
    title: "Bank Application Assistance",
    desc: "Need financing? We help prepare and guide your bank loan application for your construction project.",
  },
];

export default function Services() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <h2
            data-reveal
            className="font-display text-4xl sm:text-5xl leading-[0.95] max-w-xl"
          >
            Full-service construction, end to end.
          </h2>
          <p
            data-reveal
            data-reveal-delay="0.08"
            className="text-sm text-muted max-w-xs"
          >
            Four disciplines, one accountable builder, from the first sketch
            to the keys in your hand.
          </p>
        </div>

        <div className="border-t border-border">
          {SERVICES.map((service, i) => (
            <a
              key={service.title}
              href="#contact"
              data-reveal
              data-reveal-delay={0.06 + i * 0.06}
              className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[6rem_1fr_1fr_2.5rem] items-center gap-x-4 sm:gap-x-8 py-7 sm:py-9 border-b border-border hover:bg-surface transition-colors px-2 -mx-2"
            >
              <span className="text-xs uppercase tracking-wider text-muted">
                {service.index}
              </span>
              <h3 className="font-display text-xl sm:text-2xl group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="hidden sm:block text-sm text-foreground/60 leading-relaxed max-w-md">
                {service.desc}
              </p>
              <ArrowUpRight
                size={20}
                className="hidden sm:block justify-self-end text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />
              <p className="sm:hidden col-start-2 text-sm text-foreground/60 leading-relaxed mt-2">
                {service.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
