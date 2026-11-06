"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function getServerSnapshot() {
  return false;
}

/**
 * Reports whether the window has scrolled further than `threshold` pixels.
 * Always false during server rendering and hydration, so markup stays stable.
 */
export function useScrolled(threshold = 10) {
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
