"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const highlight = highlightRef.current;
    if (!dot || !highlight) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });

    let hovering: Element | null = null;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const followPointer = (x: number, y: number) => {
      gsap.to(highlight, {
        x,
        y,
        width: 10,
        height: 10,
        borderRadius: 999,
        opacity: 0.9,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      dotX(e.clientX);
      dotY(e.clientY);
      if (!hovering) followPointer(e.clientX, e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      if (!target || target === hovering) return;
      hovering = target;

      const rect = target.getBoundingClientRect();
      const pad = 10;
      gsap.to(highlight, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
        borderRadius: Math.min(24, rect.height / 2 + pad),
        opacity: 1,
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
    };

    const onOut = (e: MouseEvent) => {
      const related = (e.relatedTarget as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR);
      if (hovering && !related) {
        hovering = null;
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.25 });
        followPointer(lastX, lastY);
      }
    };

    const onDown = () => gsap.to(highlight, { scale: 0.92, duration: 0.15 });
    const onUp = () => gsap.to(highlight, { scale: 1, duration: 0.25, ease: "back.out(2)" });

    const onLeaveWindow = () => gsap.to([dot, highlight], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => {
      gsap.to(dot, { opacity: hovering ? 0 : 1, duration: 0.2 });
      gsap.to(highlight, { opacity: 1, duration: 0.2 });
    };

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
        ref={highlightRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 border border-accent/70 bg-accent/10 md:block"
        style={{ willChange: "transform, width, height", width: 10, height: 10, borderRadius: 999 }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
