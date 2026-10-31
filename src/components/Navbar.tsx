"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "Practice" },
  { href: "#services", label: "Disciplines" },
  { href: "#projects", label: "Works" },
  { href: "#specifications", label: "Specifications" },
  { href: "#methodology", label: "Methodology" },
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
            ? "bg-[#0c0c0b]/92 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80"
            : "bg-[#0c0c0b]/65 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40"
        }`}
      >
        {/* Left: Brand Identity */}
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full border border-accent/40 group-hover:border-accent transition-colors shrink-0">
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
            <span className="font-serif text-base sm:text-lg tracking-[0.06em] font-medium text-foreground group-hover:text-accent transition-colors leading-none">
              RBC BUILDERS
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.22em] text-muted font-sans font-light mt-1 leading-none">
              Architecture &amp; Construction
            </span>
          </div>
        </a>

        {/* Center: Flexible Spacious Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 flex-1 min-w-0 px-2 xl:px-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10.5px] xl:text-[11.5px] uppercase tracking-[0.14em] xl:tracking-[0.16em] text-foreground/80 hover:text-accent transition-colors font-medium relative group py-1 whitespace-nowrap"
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

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 text-[10px] xl:text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.18em] font-medium text-[#0c0c0b] bg-accent hover:bg-accent-light transition-all duration-300 rounded-full shadow-sm whitespace-nowrap"
          >
            <span>Private Consultation</span>
            <ArrowUpRight size={13} className="shrink-0" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl rounded-3xl bg-[#0c0c0b]/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-300">
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
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-medium bg-accent text-[#0c0c0b] hover:bg-accent-light transition-colors rounded-full"
              >
                Request Private Consultation
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
