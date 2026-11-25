"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * prefers-reduced-motion, hydration-safe: the server (and the hydration pass) always see `false`,
 * then React re-renders with the real value. framer-motion's own hook reads the media query on the
 * first client render, which causes a hydration mismatch for users who prefer reduced motion.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
