"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { COMPANY_STATS } from "@/lib/company-stats";

const SLIDES = [
  { src: "/images/hero.jpg", caption: "Every detail engineered for long-term quality, not just a good render." },
  { src: "/images/hero-2.jpg", caption: "Warm, livable luxury designed around how a family actually uses a home." },
  { src: "/images/hero-3.jpg", caption: "Landscaping, lighting, and materials specified down to the finish tier." },
  { src: "/images/hero-4.jpg", caption: "Built to hold up: structure first, finishes that last, no shortcuts." },
];

const STATS = [
  COMPANY_STATS.totalFloorAreaDelivered,
  COMPANY_STATS.provincesServed,
  COMPANY_STATS.finishTiers,
  COMPANY_STATS.avgTurnover,
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [slide, setSlide] = useState(0);

  const next = () => setSlide((s) => (s + 1) % SLIDES.length);
  const prev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);

  // Auto-advance slideshow
  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, []);

  // Subtle 3D tilt on the image panel only
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const rotX = gsap.quickTo(panel, "rotateX", { duration: 0.9, ease: "power3.out" });
    const rotY = gsap.quickTo(panel, "rotateY", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 6);
      rotX(py * -6);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    panel.addEventListener("mousemove", onMove);
    panel.addEventListener("mouseleave", onLeave);
    return () => {
      panel.removeEventListener("mousemove", onMove);
      panel.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Scroll-scrubbed depth on the hero image
  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    const ctx = gsap.context(() => {
      gsap.to(imageWrap, {
        scale: 1.14,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Word-reveal entrance for the headline
  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    const words = headline.querySelectorAll<HTMLElement>("[data-word]");
    gsap.set(words, { yPercent: 115 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.06,
      ease: "expo.out",
      delay: 0.4,
    });
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative pt-28 sm:pt-36 pb-0 px-4 sm:px-6 bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left column — copy + headline */}
        <div className="lg:col-span-4 flex flex-col justify-center py-10 lg:py-0">
          <p className="max-w-xs text-sm text-foreground/60 leading-relaxed">
            Explore design-build projects that combine honest craftsmanship,
            transparent pricing, and permit-to-key-turnover delivery.
          </p>

          <h1
            ref={headlineRef}
            className="font-display mt-8 text-[13vw] sm:text-6xl lg:text-[3.6vw] xl:text-[3.1rem] leading-[0.95] uppercase"
          >
            <span className="block overflow-hidden text-foreground/35">
              <span data-word className="inline-block">
                Every Dream
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-word className="inline-block">
                Begins With{" "}
                <span className="text-accent">You.</span>
              </span>
            </span>
          </h1>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors w-fit border-b border-border hover:border-accent pb-1.5"
          >
            Start a conversation
          </a>
        </div>

        {/* Right column — hero image slideshow */}
        <div className="lg:col-span-8" style={{ perspective: "1600px" }}>
          <div
            ref={panelRef}
            data-cursor-label="Explore"
            className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden will-change-transform"
          >
            <div ref={imageWrapRef} className="absolute inset-0 scale-[1.04]">
              {SLIDES.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt="Luxury home built by RBC Builders"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className={`object-cover absolute inset-0 transition-opacity duration-1000 ease-out ${
                    i === slide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            <div className="absolute top-6 left-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-widest text-foreground/80">
                San Fernando, Pampanga
              </span>
            </div>

            {/* Single consolidated bottom bar */}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-4 px-6 py-5">
              <p className="hidden sm:block text-sm text-foreground/75 leading-relaxed max-w-xs">
                {SLIDES[slide].caption}
              </p>

              <div className="flex items-center gap-4 ml-auto">
                <span className="font-display text-sm tabular-nums text-foreground/90">
                  {String(slide + 1).padStart(2, "0")}
                  <span className="text-foreground/40"> / {String(SLIDES.length).padStart(2, "0")}</span>
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="flex h-9 w-9 items-center justify-center border border-foreground/20 hover:border-accent hover:text-accent transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="flex h-9 w-9 items-center justify-center border border-foreground/20 hover:border-accent hover:text-accent transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat bar */}
      <div className="mt-10 sm:mt-14 border-t border-border">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 px-1 sm:px-6 ${
                i !== 0 ? "sm:border-l border-border" : ""
              } ${i < 2 ? "border-b sm:border-b-0 border-border" : ""}`}
            >
              <p className="font-display text-2xl sm:text-3xl">
                {stat.value}
                <span className="text-sm text-muted font-sans font-normal normal-case ml-1">
                  {stat.unit}
                </span>
              </p>
              <p className="text-[11px] uppercase tracking-wider text-muted mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
