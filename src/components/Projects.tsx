"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, MapPin, Maximize2 } from "lucide-react";
import { PROJECTS, CATEGORIES, type Project } from "@/lib/projects-data";
import { useReveal } from "@/lib/useReveal";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const sectionRef = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All Works");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "All Works" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section ref={sectionRef} id="projects" className="py-28 sm:py-36 px-4 sm:px-8 bg-background relative">
      <div className="mx-auto max-w-7xl">
        {/* Monograph Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
              Architectural Monograph
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.1]">
              Selected Works &amp; Realized Estates
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/70 font-light max-w-md leading-relaxed">
            A survey of custom private residences, luxury family villas, and turnkey interior spaces built across Pampanga, Tarlac, Bataan, and Zambales.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div data-reveal data-reveal-delay="0.08" className="flex flex-wrap gap-2.5 mb-14 border-b border-border pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium border transition-all duration-300 ${
                filter === cat
                  ? "bg-accent text-[#0c0c0b] border-accent"
                  : "border-border text-foreground/70 hover:border-accent/50 hover:text-foreground bg-surface/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              data-reveal
              data-reveal-delay={(0.06 + (i % 3) * 0.08).toString()}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer flex flex-col bg-surface border border-border hover:border-accent/50 transition-all duration-500 overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0b]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 luxury-glass border border-white/10 text-foreground/90 font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Quick inspect button */}
                <div className="absolute bottom-4 right-4 h-9 w-9 rounded-full luxury-glass border border-white/20 flex items-center justify-center text-foreground group-hover:text-accent group-hover:border-accent transition-colors">
                  <Plus size={16} />
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted mb-2 font-light">
                    <MapPin size={12} className="text-accent shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-foreground font-normal group-hover:text-accent transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-foreground/70 font-light mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Specs Footer */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                  <span className="font-serif text-sm text-foreground/90 font-medium flex items-center gap-1">
                    <Maximize2 size={12} className="text-accent" /> {project.floorArea}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-accent font-medium">
                    {project.finishTier}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Consultation Monograph Invitation */}
        <div data-reveal data-reveal-delay="0.12" className="mt-16 p-8 sm:p-12 bg-surface border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium block mb-1">
              Confidential Client Portfolio
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-foreground font-normal">
              Review Full Architectural Blueprints &amp; Active Site Walkthroughs
            </h4>
            <p className="text-xs sm:text-sm text-foreground/70 font-light mt-2 leading-relaxed">
              We maintain active residential construction sites across San Fernando, Angeles City, and Tarlac. Prospective estate commissioners are invited to visit ongoing structural phases with our chief project engineers.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-[#0c0c0b] hover:bg-accent-light transition-colors shrink-0"
          >
            <span>Schedule Site Inspection</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Modal View */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
