"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp, ArrowRight, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

const EXPLORE_LINKS = [
  { href: "#about", label: "About RBC Builders" },
  { href: "#services", label: "Our Services" },
  { href: "#projects", label: "Featured Projects" },
  { href: "#pricing", label: "Pricing & Rates" },
  { href: "#process", label: "Construction Process" },
  { href: "#testimonials", label: "Client Endorsements" },
  { href: "#contact", label: "Commission An Estate" },
];

const DISCIPLINES = [
  "Custom Architectural Planning",
  "Seismic Structural Engineering",
  "Turnkey General Contracting",
  "LGU Permits & Fire Clearances",
  "Bank Construction Financing",
  "Interior Architecture & Millwork",
  "Post-Turnover Structural Warranty",
];

const SERVICE_REGIONS = [
  "City of San Fernando (Headquarters)",
  "Angeles City & Clark Freeport",
  "Tarlac City & Province",
  "Balanga & Mariveles (Bataan)",
  "Olongapo & Subic Bay (Zambales)",
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
    <footer id="footer" className="bg-[#f8f6f0] border-t border-border relative overflow-hidden text-foreground">
      {/* 1. Tamayo-Revisa Finale: Grand Architectural House Stage */}
      <section className="finale" aria-labelledby="finale-title">
        <p className="finale__verse font-serif">
          &ldquo;A planning and design-build practice that creates human lifestyle beyond limitation.&rdquo;
        </p>

        <div className="finale__stage">
          {/* House Image with dusk lighting */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="RBC Builders bespoke luxury estate lit at dusk"
              fill
              quality={95}
              sizes="100vw"
              className="object-cover object-[50%_25%] finale__sky filter contrast-110 brightness-95"
            />
          </div>

          {/* Large Architectural Monograph Watermark Text layered over the sky behind the house */}
          <p className="finale__word font-serif select-none" aria-hidden="true">
            BUILDERS
          </p>

          {/* Bottom dusk vignette shade fading smoothly into the cap */}
          <div className="finale__shade" />
        </div>

        {/* Finale Cap: Call to Action Bar */}
        <div className="finale__cap">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#c8a483] font-medium mb-2">
              Designed &amp; Built by RBC Builders
            </p>
            <h2 id="finale-title" className="finale__title font-serif">
              Let&apos;s create your dream into reality.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#contact"
              className="btn btn--accent shadow-2xl"
            >
              <span>Start your project</span>
              <ArrowRight size={14} />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#a8adb6] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        {/* Main Monograph Directory: Spacious 4-Column Architectural Spread */}
        <div ref={footerNavRef} className="mx-auto max-w-7xl px-4 sm:px-8 py-20 sm:py-28 border-b border-border">
          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Column 1: Brand Authority, Mission & Real-Time PST Clock (Col-span 4) */}
            <div data-reveal data-reveal-delay="0.05" className="lg:col-span-4 flex flex-col gap-6">
              <a
                href="#top"
                className="flex items-center gap-3.5 group/brand cursor-pointer w-fit"
                title="RBC Builders - Architecture & Construction"
              >
                <div className="relative h-12 w-12 overflow-hidden border border-accent/40 group-hover/brand:border-accent group-hover/brand:shadow-[0_0_20px_rgba(154,116,66,0.3)] rounded-full shrink-0 transition-all duration-500">
                  <Image
                    src="/images/logo.jpg"
                    alt="RBC Builders"
                    fill
                    quality={95}
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl tracking-[0.06em] font-medium text-foreground leading-none transition-all duration-500 group-hover/brand:text-accent">
                    RBC BUILDERS
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.25em] text-accent font-light mt-1 leading-none group-hover/brand:tracking-[0.28em] transition-all duration-500">
                    Architecture &amp; Construction
                  </span>
                </div>
              </a>

              <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed max-w-sm">
                A premier design-build architecture and general contracting firm headquartered in the City of San Fernando, Pampanga. We unify architectural design, seismic structural engineering, municipal permitting, and turnkey master construction across Central Luzon.
              </p>

              {/* Status and Clock */}
              <div className="p-4 bg-surface border border-border shadow-sm space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-muted font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Manila (PST): <strong className="text-foreground">{manilaTime || "12:00:00 PM"}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <MapPin size={13} className="text-accent shrink-0" />
                  <span>San Fernando, Pampanga &middot; Central Luzon</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Clock size={13} className="text-accent shrink-0" />
                  <span>Mon – Sat: 8:00 AM – 6:00 PM PST</span>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Directory (Col-span 2) */}
            <div data-reveal data-reveal-delay="0.1" className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-border">
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {EXPLORE_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xs sm:text-[13px] text-foreground/75 hover:text-accent font-light transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs">&rarr;</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Specialized Disciplines (Col-span 3) */}
            <div data-reveal data-reveal-delay="0.15" className="lg:col-span-3 flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-border">
                Disciplines &amp; Standards
              </p>
              <ul className="flex flex-col gap-3 text-xs sm:text-[13px] text-foreground/75 font-light">
                {DISCIPLINES.map((discipline) => (
                  <li key={discipline} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/80 mt-1.5 shrink-0" />
                    <span>{discipline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Regional Footprint & Direct Contacts (Col-span 3) */}
            <div data-reveal data-reveal-delay="0.2" className="lg:col-span-3 flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-border">
                Active Territories
              </p>
              <ul className="flex flex-col gap-2.5 text-xs text-foreground/70 font-light">
                {SERVICE_REGIONS.map((region) => (
                  <li key={region} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                    <span>{region}</span>
                  </li>
                ))}
              </ul>

              {/* Direct Touchpoints Box */}
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2.5">
                <a
                  href="tel:+639772873075"
                  className="p-3 bg-surface border border-border hover:border-accent text-xs flex items-center justify-between gap-3 transition-colors group shadow-sm"
                >
                  <span className="flex items-center gap-2 text-muted group-hover:text-foreground shrink-0">
                    <Phone size={13} className="text-accent shrink-0" />
                    <span className="whitespace-nowrap">Direct Hotline</span>
                  </span>
                  <span className="text-accent font-mono font-medium text-xs whitespace-nowrap">0977 287 3075</span>
                </a>

                <a
                  href="mailto:rbcbuilders70@gmail.com"
                  className="p-3 bg-surface border border-border hover:border-accent text-xs flex items-center justify-between gap-3 transition-colors group shadow-sm"
                >
                  <span className="flex items-center gap-2 text-muted group-hover:text-foreground shrink-0">
                    <Mail size={13} className="text-accent shrink-0" />
                    <span className="whitespace-nowrap">Email</span>
                  </span>
                  <span className="text-accent font-mono text-[11px] whitespace-nowrap truncate" title="rbcbuilders70@gmail.com">
                    rbcbuilders70@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=100088879215614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface border border-border hover:border-accent text-xs flex items-center justify-between gap-3 transition-colors group shadow-sm"
                >
                  <span className="flex items-center gap-2 text-muted group-hover:text-foreground shrink-0">
                    <svg className="w-3.5 h-3.5 fill-accent group-hover:fill-[#1877F2] transition-colors shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="whitespace-nowrap">Facebook</span>
                  </span>
                  <span className="text-accent group-hover:text-accent-dim text-xs font-mono flex items-center gap-1.5 transition-colors whitespace-nowrap">
                    <span>Follow Page</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Grand Architectural Typography Signature */}
        <div
          onClick={scrollToTop}
          title="Click to scroll back to top"
          className="relative py-14 sm:py-20 select-none cursor-pointer text-center overflow-hidden border-b border-border group transition-colors duration-700 hover:border-accent/40"
        >
          {/* Ambient Warm Architectural Backlight that blooms on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="w-[85vw] h-48 bg-[radial-gradient(ellipse_at_center,rgba(154,116,66,0.18)_0%,rgba(154,116,66,0.08)_45%,transparent_75%)] blur-2xl" />
          </div>

          <span className="architectural-glow-hover wordmark wordmark--xl relative z-10 font-light text-foreground/[0.08] tracking-[0.2em] uppercase leading-none inline-flex items-center justify-center whitespace-nowrap select-none">
            RBC<i></i>BUILDERS
          </span>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent font-light mt-3">
            Architects &middot; Design &middot; Builders &middot; Central Luzon
          </p>

          {/* Architectural illuminated subline that blooms with the signature */}
          <div className="mt-4 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            <span className="h-px w-8 bg-accent/60" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent font-light">
              Click to return to top &bull; San Fernando, Pampanga Headquarters
            </span>
            <span className="h-px w-8 bg-accent/60" />
          </div>
        </div>

        {/* Legal, Warranties & Back-to-Top Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted font-light">
          <div className="flex items-center gap-2 text-foreground/80">
            <ShieldCheck size={16} className="text-accent shrink-0" />
            <span>15-Year Structural Warranty &middot; PRC Licensed Architectural &amp; Engineering Practice</span>
          </div>

          <p className="text-[11px] text-muted/70 text-center md:text-right">
            &copy; 2026 RBC Builders Design-Build &amp; Construction Services. All rights reserved.
          </p>

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
