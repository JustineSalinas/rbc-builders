"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, MapPin, Ruler, BedDouble, Layers } from "lucide-react";
import { gsap } from "@/lib/gsap";
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
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out" }
      );
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const specs = [
    project.location && { icon: MapPin, label: project.location },
    project.floorArea && { icon: Ruler, label: project.floorArea },
    project.bedrooms && { icon: BedDouble, label: project.bedrooms },
    project.storeys && { icon: Layers, label: project.storeys },
  ].filter(Boolean) as { icon: typeof MapPin; label: string }[];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-surface border border-border"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur text-foreground hover:text-accent transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[4/3] sm:aspect-video w-full">
          <Image
            src={project.src}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-10">
          <p className="text-xs uppercase tracking-wider text-accent mb-3">{project.category}</p>
          <h3 className="font-display text-3xl sm:text-4xl mb-5">{project.title}</h3>
          <p className="text-foreground/70 leading-relaxed max-w-xl mb-8">{project.description}</p>

          {specs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border pt-6 mb-8">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2">
                  <spec.icon size={16} className="text-accent shrink-0" />
                  <span className="text-sm text-foreground/80">{spec.label}</span>
                </div>
              ))}
            </div>
          )}

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3.5 text-sm font-semibold uppercase tracking-wide hover:bg-foreground transition-colors"
          >
            Build Something Like This
          </a>
        </div>
      </div>
    </div>
  );
}
