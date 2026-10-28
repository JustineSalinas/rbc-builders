"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import { PROJECTS, CATEGORIES, type Project } from "@/lib/projects-data";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const headRef = useReveal<HTMLDivElement>();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  useEffect(() => {
    const pinSection = pinRef.current;
    const track = trackRef.current;
    if (!pinSection || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const distance = track.scrollWidth - pinSection.clientWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: () => "+=" + distance,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [filtered.length]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section id="projects" className="bg-background">
      <div ref={headRef} className="pt-28 sm:pt-36 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <h2 data-reveal className="font-display text-4xl sm:text-5xl leading-tight max-w-2xl">
            Selected projects &amp; designs.
          </h2>
          <a
            data-reveal
            data-reveal-delay="0.1"
            href="https://www.behance.net/gallery/168202939/MY-RENDERING-PROJECT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-widest text-muted hover:text-accent transition-colors shrink-0"
          >
            View full portfolio &rarr;
          </a>
        </div>

        <div data-reveal data-reveal-delay="0.14" className="mx-auto max-w-7xl flex flex-wrap gap-2 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                filter === cat
                  ? "bg-accent text-background border-accent"
                  : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: pinned horizontal scrub. Mobile: native snap-scroll carousel. */}
      <div ref={pinRef} className="relative overflow-hidden md:h-[80vh] md:flex md:items-center">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 md:px-[4vw] overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0"
        >
          {filtered.map((project) => (
            <button
              key={project.src}
              onClick={() => setActive(project)}
              className="group relative shrink-0 w-[78vw] sm:w-[48vw] md:w-[32vw] aspect-[4/3] snap-start overflow-hidden text-left"
            >
              <Image
                src={project.src}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 80vw, 32vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-display text-xl text-white">{project.title}</p>
                <p className="text-xs uppercase tracking-wider text-white/60 mt-1">
                  {project.floorArea ?? project.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
