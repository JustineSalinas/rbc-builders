"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";
const LABEL_SELECTOR = "[data-cursor-label]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const pillTextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pill = pillRef.current;
    const pillText = pillTextRef.current;
    if (!dot || !ring || !pill || !pillText) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const pillX = gsap.quickTo(pill, "x", { duration: 0.35, ease: "power3.out" });
    const pillY = gsap.quickTo(pill, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      pillX(e.clientX);
      pillY(e.clientY);
    };

    let currentLabelEl: Element | null = null;
    let currentPlainEl: Element | null = null;

    const showLabel = (text: string) => {
      pillText.textContent = text;
      gsap.to(pill, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" });
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const hideLabel = () => {
      gsap.to(pill, { scale: 0.6, opacity: 0, duration: 0.25, ease: "power3.in" });
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };
    const growRing = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.45, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.25, ease: "power3.out" });
    };
    const shrinkRing = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3.out" });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelEl = target.closest(LABEL_SELECTOR);
      if (labelEl) {
        currentLabelEl = labelEl;
        showLabel(labelEl.getAttribute("data-cursor-label") || "");
        return;
      }
      const plainEl = target.closest(INTERACTIVE_SELECTOR);
      if (plainEl) {
        currentPlainEl = plainEl;
        growRing();
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (currentLabelEl && !related?.closest(LABEL_SELECTOR)) {
        currentLabelEl = null;
        hideLabel();
      }
      if (currentPlainEl && !related?.closest(INTERACTIVE_SELECTOR)) {
        currentPlainEl = null;
        shrinkRing();
      }
    };

    const onDown = () => gsap.to([ring, pill], { scale: (i, t) => (t === pill ? 0.92 : 0.8), duration: 0.15 });
    const onUp = () => {
      gsap.to(ring, { scale: currentPlainEl ? 2.2 : 1, duration: 0.2 });
      gsap.to(pill, { scale: currentLabelEl ? 1 : 0.6, duration: 0.2 });
    };

    const onLeaveWindow = () => gsap.to([dot, ring, pill], { opacity: 0, duration: 0.2 });
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
      <div
        ref={pillRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent px-5 py-2.5 opacity-0 md:flex"
        style={{ willChange: "transform", transform: "translate(-50%, -50%) scale(0.6)" }}
      >
        <span
          ref={pillTextRef}
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-background"
        />
      </div>
    </>
  );
}
