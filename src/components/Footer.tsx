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
    <footer id="footer" className="bg-[#08090a] border-t border-border relative overflow-hidden text-foreground">
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
        {/* Top Section: Grand Architectural Invitation Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20 border-b border-white/10">
          <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 border border-accent/40 rounded-full bg-accent/10">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
                  Central Luzon Architectural Practice
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-[1.08]">
                Architecture engineered with permanence. Built for generations.
              </h2>
              <p className="text-sm sm:text-base text-foreground/75 font-light leading-relaxed mt-4 max-w-xl">
                Ready to commission your bespoke luxury residence? Schedule a private design-build consultation with our chief architects and structural engineers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-[#0c0c0b] hover:bg-accent-light transition-all duration-300 rounded-full shadow-xl whitespace-nowrap"
              >
                <span>Request Consultation</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="tel:+639772873075"
                className="inline-flex items-center gap-2.5 px-7 py-4 text-xs uppercase tracking-[0.2em] font-medium text-foreground border border-white/20 hover:border-accent hover:text-accent transition-colors rounded-full font-mono bg-white/5 whitespace-nowrap"
              >
                <Phone size={13} className="text-accent shrink-0" />
                <span>0977 287 3075</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Monograph Directory: Spacious 4-Column Architectural Spread */}
        <div ref={footerNavRef} className="mx-auto max-w-7xl px-4 sm:px-8 py-20 sm:py-28 border-b border-white/10">
          <div data-reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Column 1: Brand Authority, Mission & Real-Time PST Clock (Col-span 4) */}
            <div data-reveal data-reveal-delay="0.05" className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 overflow-hidden border border-accent/40 rounded-full shrink-0">
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
                  <span className="font-serif text-2xl tracking-[0.06em] font-medium text-foreground leading-none">
                    RBC BUILDERS
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.25em] text-accent font-light mt-1 leading-none">
                    Architecture &amp; Construction
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-foreground/75 font-light leading-relaxed max-w-sm">
                A premier design-build architecture and general contracting firm headquartered in the City of San Fernando, Pampanga. We unify architectural design, seismic structural engineering, municipal permitting, and turnkey master construction across Central Luzon.
              </p>

              {/* Status and Clock */}
              <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2.5">
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
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-white/10">
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
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-white/10">
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
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-white/10">
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
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="tel:+639772873075"
                  className="p-3 bg-surface border border-border hover:border-accent text-xs flex items-center justify-between transition-colors group"
                >
                  <span className="text-muted group-hover:text-foreground">Direct Hotline</span>
                  <span className="text-accent font-mono font-medium">0977 287 3075</span>
                </a>

                <a
                  href="mailto:rbcbuilders70@gmail.com"
                  className="p-3 bg-surface border border-border hover:border-accent text-xs flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2 text-muted group-hover:text-foreground">
                    <Mail size={13} className="text-accent shrink-0" />
                    <span>Official Email</span>
                  </span>
                  <span className="text-accent font-mono text-[11px]">rbcbuilders70@gmail.com</span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=100088879215614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1877F2]/10 border border-[#1877F2]/30 hover:border-[#1877F2] text-xs flex items-center justify-between transition-colors group text-[#1877F2]"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook Official Page</span>
                  </span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Grand Architectural Typography Signature */}
        <div className="py-12 sm:py-16 select-none pointer-events-none text-center overflow-hidden border-b border-white/5">
          <span className="font-serif text-[9vw] sm:text-[10vw] font-light text-white/[0.025] tracking-[0.2em] uppercase leading-none block whitespace-nowrap">
            RBC BUILDERS
          </span>
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
