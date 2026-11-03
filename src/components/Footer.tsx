"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUp, Phone, Mail, ShieldCheck } from "lucide-react";
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
      className="bg-[#17140f] text-[#f1efe9] relative overflow-hidden"
    >
      {/* Subtle warm depth gradient, no background photo — keeps this compact */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(154,116,66,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Compact directory row: brand, nav, direct contact */}
        <div ref={footerNavRef} data-tour="footer-links" className="mx-auto max-w-7xl px-4 sm:px-8 pt-12 sm:pt-16 pb-8 sm:pb-10">
          <div data-reveal className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 sm:gap-10">
            {/* Studio */}
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">Studio</p>
              <p className="text-sm text-[#f1efe9]/75 font-light leading-relaxed">
                San Fernando, Pampanga<br />Central Luzon, Philippines
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=City+of+San+Fernando%2C+Pampanga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:text-accent-light underline underline-offset-4 w-fit transition-colors"
              >
                Open in Maps
              </a>
            </div>

            {/* Talk to us */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">Talk to Us</p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:+639772873075" className="inline-flex items-center gap-2 text-[#f1efe9]/75 hover:text-accent transition-colors">
                  <Phone size={13} className="text-accent shrink-0" />
                  <span>0977 287 3075</span>
                </a>
                <a href="mailto:rbcbuilders70@gmail.com" className="inline-flex items-center gap-2 text-[#f1efe9]/75 hover:text-accent transition-colors break-all">
                  <Mail size={13} className="text-accent shrink-0" />
                  <span>rbcbuilders70@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Follow the work */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">Follow the Work</p>
              <a
                href="https://www.facebook.com/profile.php?id=100088879215614"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#f1efe9]/75 hover:text-accent transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-accent shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>

            {/* Explore */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">Explore</p>
              <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
                {EXPLORE_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#f1efe9]/75 hover:text-accent font-light transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#contact" className="text-accent hover:text-accent-light font-medium w-fit transition-colors">
                  Start Your Project &rarr;
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Grand Wordmark Signature */}
        <div
          onClick={scrollToTop}
          title="Click to scroll back to top"
          className="relative py-6 sm:py-14 select-none cursor-pointer text-center overflow-hidden border-t border-white/10 group"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent/80 font-light mb-2 sm:mb-3">
            Design &middot; Build &middot; Deliver
          </p>
          <span className="architectural-glow-hover font-serif text-[13vw] sm:text-[9vw] font-light text-white/[0.09] tracking-[0.1em] sm:tracking-[0.2em] uppercase leading-none block whitespace-nowrap select-none">
            RBC BUILDERS
          </span>
        </div>

        {/* Legal Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#f1efe9]/55 font-light border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-accent shrink-0" />
            <span>&copy; 2026 RBC Builders. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("rbc:open-tour"))}
              className="hover:text-accent transition-colors underline underline-offset-4 cursor-pointer"
            >
              Take a Tour of This Site
            </button>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="text-accent" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
