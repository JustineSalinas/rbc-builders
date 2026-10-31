"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Architectural Scroll Reveal Hook
 * Seamlessly glides elements into view with power3 easing and optional delays.
 * Targets the container itself if marked with [data-reveal], or any child elements with [data-reveal].
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Respect user's accessibility motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = root.hasAttribute("data-reveal")
      ? [root, ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))]
      : Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      targets.forEach((el, i) => {
        const delay =
          el.dataset.revealDelay !== undefined
            ? Number(el.dataset.revealDelay)
            : Math.min(i * 0.05, 0.25);
        const customY = Number(el.dataset.revealY ?? 28);

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: customY,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
