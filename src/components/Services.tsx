"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Compass,
  HardHat,
  FileText,
  Landmark,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const RENDERING_PROJECTS = Array.from(
  { length: 15 },
  (_, i) => `/images/renders/render-${i + 1}.png`
);

const BEHANCE_RENDERING_URL =
  "https://www.behance.net/gallery/168202939/MY-RENDERING-PROJECT";

const DISCIPLINES = [
  {
    id: "01",
    icon: Compass,
    title: "Architectural Design",
    description:
      "Floor plans, structural drawings, and a material spec sheet before ground is broken.",
    ctaLabel: "Start a design",
    ctaHref: "#contact",
  },
  {
    id: "02",
    icon: HardHat,
    title: "Labor & Materials",
    description:
      "Our own crews, sourced materials, and weekly progress updates across all four finish tiers.",
    ctaLabel: "See pricing",
    ctaHref: "#pricing",
  },
  {
    id: "03",
    icon: FileText,
    title: "Government Permits",
    description:
      "We handle barangay, municipal, and fire-safety clearances so the build stays compliant.",
    ctaLabel: "Ask about permits",
    ctaHref: "#contact",
  },
  {
    id: "04",
    icon: Landmark,
    title: "Bank Financing Assistance",
    description:
      "Help preparing the cost breakdown and paperwork your bank needs for a construction loan.",
    ctaLabel: "Talk financing",
    ctaHref: "#contact",
  },
  {
    id: "05",
    icon: Sparkles,
    title: "3D Rendering",
    description:
      "Photorealistic exterior and interior visualizations before you commit to a design.",
    isRenderingService: true,
    ctaLabel: "View on Behance",
    ctaHref: BEHANCE_RENDERING_URL,
    isExternal: true,
  },
];

export default function Services() {
  const sectionRef = useReveal<HTMLElement>();
  const [selectedRenderIdx, setSelectedRenderIdx] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + RENDERING_PROJECTS.length) % RENDERING_PROJECTS.length : null
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % RENDERING_PROJECTS.length : null));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="services" ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl leading-tight max-w-xl">
            Five disciplines, one accountable builder.
          </h2>
          <p className="text-sm text-muted max-w-xs">
            From the first sketch to the keys in your hand, no handoffs between separate vendors.
          </p>
        </div>

        <div className="border-t border-border">
          {DISCIPLINES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.id} data-reveal data-reveal-delay={0.05 + i * 0.05} className="border-b border-border">
                <a
                  href={service.ctaHref}
                  target={service.isExternal ? "_blank" : undefined}
                  rel={service.isExternal ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_1fr_2.5rem] items-center gap-x-4 sm:gap-x-8 py-7 sm:py-9 hover:bg-surface transition-colors px-2 -mx-2"
                >
                  <Icon size={20} className="text-accent" strokeWidth={1.5} />
                  <h3 className="font-display text-xl sm:text-2xl group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="hidden sm:block text-sm text-foreground/60 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                  <ArrowUpRight
                    size={20}
                    className="hidden sm:block justify-self-end text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                  <p className="sm:hidden col-start-2 text-sm text-foreground/60 leading-relaxed mt-2">
                    {service.description}
                  </p>
                </a>

                {service.isRenderingService && (
                  <div className="pb-8 sm:pb-9 px-2 -mx-2">
                    <div
                      className="relative aspect-video overflow-hidden cursor-pointer group/preview"
                      onClick={() => setLightboxIndex(selectedRenderIdx)}
                    >
                      <Image
                        src={RENDERING_PROJECTS[selectedRenderIdx]}
                        alt={`RBC Builders 3D render ${selectedRenderIdx + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-500 group-hover/preview:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/0 group-hover/preview:bg-background/20 transition-colors" />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto py-3 mt-1 hide-scrollbar">
                      {RENDERING_PROJECTS.map((img, rIdx) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setSelectedRenderIdx(rIdx)}
                          className={`relative shrink-0 w-16 sm:w-20 aspect-video overflow-hidden border transition-opacity ${
                            selectedRenderIdx === rIdx ? "border-accent" : "border-border opacity-50 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted">
              {lightboxIndex + 1} / {RENDERING_PROJECTS.length}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={BEHANCE_RENDERING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-background text-xs uppercase tracking-wider hover:bg-foreground transition-colors"
              >
                View on Behance <ExternalLink size={12} />
              </a>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                className="p-1.5 text-foreground hover:text-accent transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4 relative px-2 sm:px-8 h-[78vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={RENDERING_PROJECTS[lightboxIndex]}
              alt={`RBC Builders 3D render ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + RENDERING_PROJECTS.length) % RENDERING_PROJECTS.length)}
              className="absolute left-2 sm:left-4 p-2.5 bg-background/70 hover:bg-accent hover:text-background transition-colors"
              aria-label="Previous render"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % RENDERING_PROJECTS.length)}
              className="absolute right-2 sm:right-4 p-2.5 bg-background/70 hover:bg-accent hover:text-background transition-colors"
              aria-label="Next render"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
