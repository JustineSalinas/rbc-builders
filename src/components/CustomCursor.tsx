"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [data-cursor-hover], [data-cursor-label]";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const ring = ringRef.current;
    if (!ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
    };

    let hovering: Element | null = null;

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      if (target && !hovering) {
        hovering = target;
        gsap.to(ring, { scale: 2.4, duration: 0.4, ease: "power3.out" });
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = (e.relatedTarget as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR);
      if (hovering && !related) {
        hovering = null;
        gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out" });
      }
    };

    const onDown = () => gsap.to(ring, { scale: hovering ? 2.0 : 0.7, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: hovering ? 2.4 : 1, duration: 0.2 });

    const onLeaveWindow = () => gsap.to(ring, { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to(ring, { opacity: 1, duration: 0.2 });

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
    <div
      ref={ringRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      style={{ willChange: "transform" }}
    />
  );
}
