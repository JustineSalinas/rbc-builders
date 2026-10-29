"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

const EXPLORE = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Portfolio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const AREAS = [
  "San Fernando",
  "Tarlac",
  "Angeles City",
  "Olongapo",
  "Balanga",
  "Mariveles",
];

const TICKER_WORDS = Array(6).fill("RBC BUILDERS");

export default function Footer() {
  const ref = useReveal<HTMLDivElement>();
  const magnetRef = useRef<HTMLSpanElement | null>(null);
  const magnetBtnRef = useRef<HTMLAnchorElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const circumference = 2 * Math.PI * 17;

  // Live Philippine time
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-PH", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "Asia/Manila",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Magnetic pull on the footer CTA icon
  useEffect(() => {
    const btn = magnetBtnRef.current;
    const icon = magnetRef.current;
    if (!btn || !icon) return;

    const moveX = gsap.quickTo(icon, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(icon, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX(relX * 0.35);
      moveY(relY * 0.35);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Scroll progress for the back-to-top ring
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollTop / max) : 0);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <footer className="relative bg-surface border-t border-border overflow-hidden">
      {/* Blueprint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Giant background wordmark ticker */}
      <div className="absolute inset-x-0 top-10 sm:top-16 pointer-events-none select-none overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
            <span
              key={i}
              className="text-outline font-display text-[18vw] sm:text-[11vw] leading-none px-6 opacity-[0.07]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="relative px-4 sm:px-6">
        {/* CTA strip */}
        <div className="mx-auto max-w-7xl pt-24 pb-20 sm:pt-32 sm:pb-28">
          <p data-reveal className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping [animation-duration:2.5s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            San Fernando, PH{time ? ` · ${time}` : ""} &middot; Open for new projects
          </p>
          <a
            ref={magnetBtnRef}
            href="tel:+639772873075"
            data-reveal
            data-reveal-delay="0.08"
            data-cursor-label="Call"
            className="group inline-flex flex-wrap items-center gap-x-5 font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05]"
          >
            Let&apos;s build it right.
            <span className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent text-background group-hover:bg-foreground transition-colors">
              <span ref={magnetRef} className="inline-flex">
                <ArrowUpRight size={26} />
              </span>
            </span>
          </a>
          <p data-reveal data-reveal-delay="0.14" className="mt-6 text-sm text-foreground/60 max-w-sm">
            Call, text, or send an inquiry below. We typically respond within
            one business day.
          </p>
        </div>

        {/* Link columns */}
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8 pb-16 border-t border-border pt-16">
          <div data-reveal className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.jpg"
                alt="RBC Builders"
                width={36}
                height={36}
                className="rounded-sm"
              />
              <span className="font-display text-base tracking-wide">
                RBC BUILDERS
              </span>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-[26ch]">
              Design-build construction across Central Luzon, from permits to
              key turnover.
            </p>
          </div>

          <div data-reveal data-reveal-delay="0.06">
            <p className="text-xs uppercase tracking-wider text-muted mb-5">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal data-reveal-delay="0.12">
            <p className="text-xs uppercase tracking-wider text-muted mb-5">
              Service Areas
            </p>
            <ul className="flex flex-col gap-3">
              {AREAS.map((area) => (
                <li key={area} className="text-sm text-foreground/80">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal data-reveal-delay="0.18">
            <p className="text-xs uppercase tracking-wider text-muted mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="tel:+639772873075"
                  className="text-foreground/80 hover:text-accent transition-colors"
                >
                  0977 287 3075
                </a>
              </li>
              <li>
                <a
                  href="tel:+639627863202"
                  className="text-foreground/80 hover:text-accent transition-colors"
                >
                  0962 786 3202
                </a>
              </li>
              <li>
                <a
                  href="mailto:rbcbuilders70@gmail.com"
                  className="text-foreground/80 hover:text-accent transition-colors break-all"
                >
                  rbcbuilders70@gmail.com
                </a>
              </li>
              <li className="text-foreground/60 pt-1">
                San Fernando, Pampanga, PH 2005
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative border-t border-border px-4 sm:px-6 py-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; 2026 RBC Builders. All rights reserved.
          </p>

          <a
            href="#top"
            aria-label="Back to top"
            className="group relative flex h-11 w-11 items-center justify-center shrink-0"
          >
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 40 40"
              width="44"
              height="44"
            >
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp
              size={16}
              className="relative text-foreground group-hover:text-accent group-hover:-translate-y-0.5 transition-all"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
