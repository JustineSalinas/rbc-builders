"use client";

import { ShieldCheck, Compass, FileCheck2, Landmark, Clock } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const CREDENTIALS = [
  {
    icon: Compass,
    title: "Architectural Planning",
    desc: "Architectural drawings and structural plans for permit submission",
  },
  {
    icon: ShieldCheck,
    title: "Turnkey General Contracting",
    desc: "Single-source labor, materials, and builder accountability",
  },
  {
    icon: FileCheck2,
    title: "Government Permit Processing",
    desc: "Barangay and municipal permits handled on your behalf",
  },
  {
    icon: Landmark,
    title: "Bank Financing Assistance",
    desc: "Cost breakdowns and paperwork prepared for your construction loan",
  },
  {
    icon: Clock,
    title: "Transparent Progress Reporting",
    desc: "Milestone updates so you always know where the build stands",
  },
];

export default function Marquee() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="border-b border-border bg-surface py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {CREDENTIALS.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={(i * 0.07).toString()}
              className={`flex flex-col gap-2 ${
                i > 0 ? "md:border-l border-border md:pl-6" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-accent">
                <item.icon size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-accent">
                  Standard 0{i + 1}
                </span>
              </div>
              <h3 className="font-serif text-base text-foreground font-normal leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
