"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, MapPin, Maximize2, BedDouble, Layers, Check, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects-data";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-6 sm:p-10 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-surface border border-border text-foreground shadow-2xl flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project monograph"
          className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-black/60 border border-white/20 text-foreground hover:text-accent hover:border-accent transition-colors flex items-center justify-center backdrop-blur-sm"
        >
          <X size={18} />
        </button>

        {/* Hero Architectural Image Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden border-b border-border bg-black">
          <Image
            src={project.src}
            alt={project.title}
            fill
            quality={95}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium block mb-1">
                {project.category} · {project.year}
              </span>
              <h3 id="modal-project-title" className="font-serif text-3xl sm:text-4xl text-foreground font-normal">
                {project.title}
              </h3>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] px-3.5 py-1.5 border border-accent/40 bg-accent/10 text-accent font-medium">
              {project.finishTier}
            </span>
          </div>
        </div>

        {/* Monograph Body */}
        <div className="p-6 sm:p-10 flex flex-col gap-8">
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-1.5 mb-1">
                <MapPin size={12} className="text-accent" /> Location
              </span>
              <span className="font-serif text-base text-foreground font-medium">
                {project.location}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-1.5 mb-1">
                <Maximize2 size={12} className="text-accent" /> Floor Area
              </span>
              <span className="font-serif text-base text-foreground font-medium">
                {project.floorArea}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-1.5 mb-1">
                <BedDouble size={12} className="text-accent" /> Capacity
              </span>
              <span className="font-serif text-base text-foreground font-medium">
                {project.bedrooms || "Custom Plan"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-1.5 mb-1">
                <Layers size={12} className="text-accent" /> Structure
              </span>
              <span className="font-serif text-base text-foreground font-medium">
                {project.storeys}
              </span>
            </div>
          </div>

          {/* Architectural Intent Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
                Architectural Statement &amp; Execution
              </h4>
              <p className="text-sm sm:text-base text-foreground/80 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-background border border-border p-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
                Structural &amp; Finish Highlights
              </h4>
              <ul className="flex flex-col gap-2.5">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground/75 font-light leading-snug">
                    <Check size={13} className="text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted font-light">
              Full architectural drawings and itemized BOQ available for review upon consultation.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-[#0c0c0b] hover:bg-accent-light transition-colors"
            >
              <span>Commission an Estate Like This</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
