"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Site-wide reveal signature: a clip-path wipe (not fade+translate).
 * Elements inside the returned ref with [data-reveal] are masked until
 * they cross the trigger line, then wipe open with an expo ease.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.hasAttribute("data-reveal")
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      targets.forEach((el, i) => {
        const delay = Number(el.dataset.revealDelay ?? i * 0.08);
        gsap.set(el, { clipPath: "inset(0 0 100% 0)", y: 18 });
        gsap.to(el, {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.1,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}

export { gsap, ScrollTrigger };
