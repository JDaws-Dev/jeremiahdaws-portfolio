"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveals. Anything marked data-reveal fades up out of a soft blur
 * (a rack focus) when it enters the viewport; children of data-stagger
 * come in one after another. The hidden state only exists while <html>
 * has the "motion" class, which the head script sets for viewers who
 * haven't asked for reduced motion, so the page always works without it.
 */
export function MotionLayer() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;
    // Tells the head script's failsafe that reveals are wired up.
    root.setAttribute("data-motion-ready", "");

    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
      const step = Number(list.dataset.stagger) || 80;
      Array.from(list.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.setProperty("--d", `${i * step}ms`);
      });
    });

    if (!("IntersectionObserver" in window)) {
      root.classList.remove("motion");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            // A wipe row's items start fully clipped, which the observer
            // can't see, so the row itself is watched and cues them all.
            if (e.target.classList.contains("wipe")) {
              for (const c of Array.from(e.target.children)) c.classList.add("is-in");
            }
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const els = document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]:not(.wipe) > *, .wipe");
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
