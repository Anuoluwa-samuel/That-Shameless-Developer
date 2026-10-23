"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// d3 and the world map load only when the globe scrolls into view.
const GlobeWireframe = dynamic(() => import("./globe-wireframe"), { ssr: false });

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(reducedMotionQuery);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
}

/** Decorative globe: reserves its space up front (no layout shift), loads lazily, spins unless reduced motion is on. */
export function GlobeSlot() {
  const holder = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    // Wait until the globe is really on screen, then until the browser is idle, so it never
    // competes with the page's first paint or interactivity.
    let idle = 0;
    const start = () => setShow(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        // Safari has no requestIdleCallback; fall back to a short timer.
        idle =
          typeof window.requestIdleCallback === "function"
            ? window.requestIdleCallback(start, { timeout: 2000 })
            : window.setTimeout(start, 300);
      },
      // Mostly on screen, not merely peeking in: a phone shows the top of it without scrolling.
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (typeof window.cancelIdleCallback === "function")
        window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return (
    <div ref={holder} aria-hidden="true" className="relative h-56 overflow-hidden">
      {show ? (
        <GlobeWireframe
          className="text-control absolute top-0 left-0"
          variant="wireframesolid"
          autoRotate={!reduceMotion}
          autoRotateSpeed={0.45}
          strokeWidth={0.6}
        />
      ) : null}
      <div className="from-bg pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent" />
    </div>
  );
}
