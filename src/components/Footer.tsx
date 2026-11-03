"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUp, ArrowRight, Phone, Mail, ShieldCheck } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const EXPLORE_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#pricing", label: "Pricing" },
  { href: "#journey", label: "Our Process" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const footerNavRef = useReveal<HTMLDivElement>();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#f8f6f0] border-t border-border relative overflow-hidden text-foreground"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Background Villa Layer: Spans the Entire Footer */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `scale(1.08) translate3d(${tilt.x * -20}px, ${tilt.y * -16}px, 0)`,
        }}
      >
        <Image
          src="/images/hero.jpg"
          alt="RBC Builders completed luxury modern villa in San Fernando, Pampanga"
          fill
          quality={95}
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
        {/* Soft Alabaster Travertine Glass Scrim for 100% WCAG AAA Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfaf8]/76 via-[#f5f2eb]/90 to-[#f8f6f0]/96 backdrop-blur-[5px]" />
      </div>

      {/* Floating 3D Mid-Ground Typographic Relief ("RBC BUILDERS") */}
      <div
        className="absolute top-14 sm:top-20 inset-x-0 text-center pointer-events-none select-none z-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${tilt.x * 28}px, ${tilt.y * 22}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="font-serif text-[13vw] font-light tracking-[0.24em] text-foreground/[0.06] uppercase whitespace-nowrap block leading-none">
          RBC BUILDERS
        </span>
      </div>

      {/* Foreground Content: Consultation Monograph & Master Directory */}
      <div className="relative z-20">
        {/* 1. RBC Builders Estate Finale: Editorial Consultation Header */}
        <section className="pt-10 sm:pt-24 pb-8 sm:pb-16 border-b border-border/80" aria-labelledby="estate-finale-title">
          <div data-tour="footer-cta" className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 sm:mb-4 border border-accent/40 rounded-full bg-white/85 shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.24em] text-accent font-medium font-mono">
                  Design &amp; Build Contractor &middot; San Fernando, Pampanga
                </span>
              </div>

              <h2 id="estate-finale-title" className="font-serif text-2xl sm:text-5xl lg:text-6xl font-light text-[#151413] tracking-tight leading-[1.15] sm:leading-[1.08]">
                Every custom home begins with a conversation.
              </h2>

              <p className="text-sm sm:text-base text-[#5c564e] font-light mt-3 sm:mt-4 max-w-2xl leading-relaxed">
                Schedule a design-build consultation. We provide full site feasibility reviews, custom architectural plans, and transparent cost estimates.
              </p>

              {/* Direct Consultation Actions */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mt-6 sm:mt-8">
                <a
                  href="#contact"
                  className="btn btn--accent shadow-md rounded-full px-5 py-3 sm:px-7 sm:py-3.5 text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em]"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="tel:+639772873075"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 text-xs uppercase tracking-[0.08em] sm:tracking-[0.14em] font-mono text-[#151413] border border-border hover:border-accent hover:text-accent transition-all rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
                  title="Direct Hotline: 0977 287 3075"
                >
                  <Phone size={13} className="text-accent shrink-0" />
                  <span>0977 287 3075</span>
                </a>

                <button
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="inline-flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full bg-white/90 hover:bg-white text-foreground text-xs uppercase tracking-[0.1em] sm:tracking-[0.16em] font-medium shadow-sm backdrop-blur-sm transition-all border border-border ml-auto sm:ml-0"
                >
                  <span>Top</span>
                  <ArrowUp size={13} className="text-accent" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Directory Row: brand, nav, direct contact — one line of
            purpose each, no repeated content from the sections above it */}
        <div ref={footerNavRef} data-tour="footer-links" className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-16 border-b border-border">
          <div data-reveal className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-6">
            {/* Brand mark */}
            <a
              href="#top"
              className="flex items-center gap-3 group/brand cursor-pointer w-fit shrink-0"
              title="RBC Builders - Architecture & Construction"
            >
              <div className="relative h-11 w-11 overflow-hidden border border-accent/40 group-hover/brand:border-accent rounded-full shrink-0 transition-all duration-500">
                <Image
                  src="/images/logo.jpg"
                  alt="RBC Builders"
                  fill
                  quality={95}
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.06em] font-medium text-foreground leading-none transition-colors duration-500 group-hover/brand:text-accent">
                  RBC BUILDERS
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-accent font-light mt-1 leading-none">
                  Architecture &amp; Construction
                </span>
              </div>
            </a>

            {/* Navigation */}
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2.5 md:gap-x-6">
              {EXPLORE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/75 hover:text-accent font-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Direct contact */}
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+639772873075" className="inline-flex items-center gap-2 text-foreground/75 hover:text-accent font-light transition-colors">
                <Phone size={14} className="text-accent shrink-0" />
                <span>0977 287 3075</span>
              </a>
              <a href="mailto:rbcbuilders70@gmail.com" className="inline-flex items-center gap-2 text-foreground/75 hover:text-accent font-light transition-colors">
                <Mail size={14} className="text-accent shrink-0" />
                <span>rbcbuilders70@gmail.com</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100088879215614"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground/75 hover:text-accent font-light transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-accent shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Large Grand Architectural Typography Signature */}
        <div
          onClick={scrollToTop}
          title="Click to scroll back to top"
          className="relative py-8 sm:py-20 select-none cursor-pointer text-center overflow-hidden border-b border-border group transition-colors duration-700 hover:border-accent/40"
        >
          {/* Ambient Warm Architectural Backlight that blooms on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="w-[85vw] h-48 bg-[radial-gradient(ellipse_at_center,rgba(154,116,66,0.18)_0%,rgba(154,116,66,0.08)_45%,transparent_75%)] blur-2xl" />
          </div>

          <span className="architectural-glow-hover font-serif text-[8.5vw] font-light text-foreground/[0.08] tracking-[0.2em] uppercase leading-none block whitespace-nowrap select-none">
            RBC BUILDERS
          </span>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-accent font-light mt-3">
            Design &middot; Build &middot; Architecture &middot; San Fernando, Pampanga
          </p>

          {/* Architectural illuminated subline that blooms with the signature — hidden on
              mobile (opacity-0 non-interactive on touch anyway, but was still consuming
              layout height every screen) */}
          <div className="hidden sm:flex mt-4 items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            <span className="h-px w-8 bg-accent/60" />
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-light">
              Click to return to top &bull; San Fernando, Pampanga Headquarters
            </span>
            <span className="h-px w-8 bg-accent/60" />
          </div>
        </div>

        {/* Legal, Warranties & Back-to-Top Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-5 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-muted font-light">
          <div className="flex items-center gap-2 text-foreground/80">
            <ShieldCheck size={16} className="text-accent shrink-0" />
            <span>Design-Build Practice &middot; San Fernando, Pampanga</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("rbc:open-tour"))}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors underline underline-offset-4 cursor-pointer"
            >
              <span>Take a Tour of This Site</span>
            </button>
            <span>&middot;</span>
            <p className="text-[11px] text-muted/70">
              &copy; 2026 RBC Builders. All rights reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-accent transition-colors pt-2 md:pt-0"
          >
            <span>Top of Monograph</span>
            <ArrowUp size={14} className="text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
}
