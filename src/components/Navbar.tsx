"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Phone, Compass } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#pricing", label: "Pricing" },
  { href: "#process", label: "Process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-5 transition-all duration-300 pointer-events-none">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16 rounded-full pointer-events-auto transition-all duration-500 gap-3 sm:gap-4 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border border-black/10 shadow-xl shadow-black/5"
            : "bg-white/75 backdrop-blur-xl border border-black/[0.06] shadow-md shadow-black/[0.03]"
        }`}
      >
        {/* Left: Brand Identity */}
        <a href="#top" className="flex items-center gap-3 group shrink-0" aria-label="RBC Builders - Design & Build Architecture">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full border border-accent/40 group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(154,116,66,0.3)] transition-all duration-300 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="RBC Builders"
              fill
              sizes="36px"
              quality={95}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[15px] sm:text-[17px] font-medium tracking-[0.12em] text-foreground group-hover:text-accent transition-colors leading-none uppercase">
              RBC BUILDERS
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.22em] text-muted font-sans font-light mt-1 leading-none">
              Design &middot; Build &middot; Architecture
            </span>
          </div>
        </a>

        {/* Center: Flexible Spacious Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 flex-1 min-w-0 px-2 xl:px-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] xl:text-[12px] uppercase tracking-[0.18em] text-foreground/80 hover:text-accent transition-colors font-medium relative group py-1 whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right: Action Area */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href="tel:+639772873075"
            className="hidden 2xl:inline-flex items-center gap-2 text-[11px] text-foreground/70 hover:text-accent transition-colors tracking-wider font-mono mr-1"
          >
            <Phone size={12} className="text-accent shrink-0" />
            <span>0977 287 3075</span>
          </a>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("rbc:open-tour"))}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-foreground/75 hover:text-accent border border-black/10 hover:border-accent/40 rounded-full transition-all cursor-pointer bg-white/60"
            title="Take interactive tour of this website"
          >
            <Compass size={12} className="text-accent" />
            <span>Site Tour</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[10.5px] xl:text-[11.5px] uppercase tracking-[0.18em] font-medium text-white bg-accent hover:bg-accent-dim transition-all duration-300 shadow-sm whitespace-nowrap rounded-full"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={13} className="shrink-0" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden h-9 w-9 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 p-6 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex flex-col gap-4">
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-accent font-medium pb-2 border-b border-border/60">
              Navigation Index
            </span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-xl text-foreground/85 hover:text-accent transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="text-muted" />
              </a>
            ))}

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("rbc:open-tour"));
                }}
                className="w-full text-center py-2.5 text-xs uppercase tracking-[0.18em] font-medium border border-border text-foreground hover:text-accent hover:border-accent/50 transition-colors rounded-full flex items-center justify-center gap-2 cursor-pointer bg-surface"
              >
                <Compass size={13} className="text-accent" />
                <span>Take Site Tour</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-white hover:bg-accent-dim transition-colors rounded-full"
              >
                Start Your Project
              </a>
              <div className="flex items-center justify-between text-xs text-muted pt-1">
                <span>San Fernando, Pampanga</span>
                <a href="tel:+639772873075" className="text-accent font-mono flex items-center gap-1">
                  <Phone size={11} /> 0977 287 3075
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
