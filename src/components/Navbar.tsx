"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Portfolio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4 sm:pt-5">
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between rounded-full border px-4 sm:px-6 py-2.5 transition-colors duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-border"
            : "bg-background/40 backdrop-blur-md border-foreground/10"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="RBC Builders"
            width={30}
            height={30}
            className="rounded-sm"
          />
          <span className="font-display text-sm tracking-wide hidden sm:block">
            RBC BUILDERS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-wider text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent text-background pl-5 pr-2 py-2 text-[13px] font-semibold uppercase tracking-wide hover:bg-foreground transition-colors"
        >
          Get a Quote
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/20">
            <ArrowRight size={13} />
          </span>
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mx-auto max-w-7xl mt-2 rounded-3xl bg-background/95 backdrop-blur-xl border border-border">
          <div className="flex flex-col px-6 py-6 gap-5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base uppercase tracking-wider text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-background px-5 py-3 text-sm font-semibold uppercase tracking-wide w-fit"
            >
              Get a Quote
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
