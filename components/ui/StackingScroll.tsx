"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MotionValue, useScroll } from "framer-motion";

type StackingScrollProps = {
  /** Total scroll length of the section, in viewport heights. */
  heightVh?: number;
  id?: string;
  labelledBy?: string;
  className?: string;
  /** Classes for the inner stage (the part that is pinned while scrolling). */
  stageClassName?: string;
  /** progress: 0 → 1 across the whole section. reduced: user prefers reduced motion (no pinning). */
  children: (progress: MotionValue<number>, reduced: boolean) => React.ReactNode;
};

/**
 * Tall section with a sticky 100vh stage; exposes scroll progress to drive stacked-card animations.
 * Reusable for any "pin and play" block (Who I Work With, Process, ...).
 * With prefers-reduced-motion the section is a normal static block and `reduced` is true.
 */
export default function StackingScroll({
  heightVh = 500,
  id,
  labelledBy,
  className,
  stageClassName,
  children,
}: StackingScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={labelledBy}
      className={className}
      style={reduced ? undefined : { height: `${heightVh}vh` }}
    >
      <div className={`${reduced ? "" : "sticky top-0 h-screen overflow-hidden"} ${stageClassName ?? ""}`}>
        {children(scrollYProgress, reduced)}
      </div>
    </section>
  );
}
