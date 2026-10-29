"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.25, ease: "power3.out" });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3.out" });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      if (target) onEnterInteractive();
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      const related = (e.relatedTarget as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR);
      if (target && !related) onLeaveInteractive();
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.2 });

    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
