"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const EXPLORE_LINKS = [
  { href: "#about", label: "About RBC Builders" },
  { href: "#services", label: "Our Services" },
  { href: "#projects", label: "Featured Projects" },
  { href: "#pricing", label: "Pricing & Rates" },
  { href: "#process", label: "Construction Process" },
  { href: "#contact", label: "Commission An Estate" },
];

const SERVICE_REGIONS = [
  "San Fernando (Headquarters)",
  "Angeles City & Clark",
  "Tarlac City & Province",
  "Balanga & Mariveles (Bataan)",
  "Olongapo & Subic (Zambales)",
  "Guagua, Lubao & Mexico (Pampanga)",
];

export default function Footer() {
  const footerNavRef = useReveal<HTMLDivElement>();
  const [manilaTime, setManilaTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setManilaTime(
        new Intl.DateTimeFormat("en-PH", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#08090a] border-t border-border relative overflow-hidden text-foreground">
      {/* Luxury Mansion Background Image with Deep Architectural Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="RBC Builders Luxury Mansion"
          fill
          quality={95}
          className="object-cover object-center opacity-25 sm:opacity-30 scale-105 filter contrast-110 brightness-90"
        />
        {/* Layered Architectural Gradients for Deep Contrast & High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0b]/95 via-[#0c0c0b]/80 to-[#08090a]/98" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,12,11,0.7)_70%,rgba(8,9,10,0.95)_100%)]" />
      </div>

      <div className="relative z-10">
        {/* Top Monograph Bar */}
        <div ref={footerNavRef} className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-20 border-b border-white/10">
          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Brand & Mission */}
            <div data-reveal data-reveal-delay="0.05" className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden border border-white/10 rounded-sm">
                  <Image
                    src="/images/logo.jpg"
                    alt="RBC Builders"
                    fill
                    quality={95}
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-wider font-normal text-foreground">
                    RBC BUILDERS
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-light">
                    Architecture &amp; Construction
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed max-w-sm">
                A premier design-build architecture and general contracting firm based in San Fernando, Pampanga. We unify architectural design, structural engineering, government permitting, and turnkey master construction across Central Luzon.
              </p>

              <div className="flex items-center gap-2.5 text-xs text-muted font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Manila (PST): {manilaTime || "12:00:00 PM"}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-1">
                Architecture &amp; Works
              </p>
              <div className="flex flex-col gap-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xs text-foreground/75 hover:text-accent font-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Regions Served */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-1">
                Active Regional Footprint
              </p>
              <ul className="grid grid-cols-1 gap-2 text-xs text-foreground/70 font-light">
                {SERVICE_REGIONS.map((region) => (
                  <li key={region} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    <span>{region}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
                <span>Direct Inquiries:</span>
                <a href="tel:+639772873075" className="text-accent hover:underline">
                  0977 287 3075
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Back-to-Top Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-light">
          <p>
            &copy; 2026 RBC Builders Design-Build &amp; Construction Services. All rights reserved.
          </p>

          <p className="text-[11px] text-muted/70 text-center sm:text-right">
            Licensed Civil Engineering &amp; Architectural Practice · San Fernando, Pampanga
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-accent transition-colors"
          >
            <span>Top of Monograph</span>
            <ArrowUp size={14} className="text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
}
