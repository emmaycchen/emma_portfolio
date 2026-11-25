"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

// Mechanism ported from reference/stacking-cards.html
const START = 0.04; // progress where card 2 begins to enter
const END = 0.84; // progress where the last card has landed; remainder is a "hold"

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Final resting tilt (deg): alternating and small, so edges of the cards behind peek out. */
const DEFAULT_TILTS = [-1.5, 2.5, -2, 2, -1, 1.5];
/** Extra rotation (deg) a card carries while travelling up, alternating direction. */
const DEFAULT_SWINGS = [0, 7, -7, 7, -7, 7];

type CardProps = {
  index: number;
  count: number;
  progress: MotionValue<number>;
  tilt: number;
  swing: number;
  className?: string;
  children: React.ReactNode;
};

function StackedCard({ index, count, progress, tilt, swing, className, children }: CardProps) {
  const seg = (END - START) / Math.max(1, count - 1);
  const t = useTransform(progress, (v) => (index === 0 ? 1 : clamp((v - (START + (index - 1) * seg)) / seg)));
  const e = useTransform(t, easeInOut);
  // vh units (not window.innerHeight) keep server and client output identical
  const y = useTransform(e, (v) => `${((1 - v) * 110).toFixed(2)}vh`);
  const rotate = useTransform(e, (v) => tilt + (1 - v) * swing);
  const visibility = useTransform(t, (v) => (v === 0 ? "hidden" : "visible"));

  return (
    <motion.div
      className={className}
      style={{ y, rotate, visibility, transformOrigin: "50% 60%", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

type StackedDeckProps = {
  progress: MotionValue<number>;
  /** Bottom card first; last item ends up on top. */
  cards: React.ReactNode[];
  tilts?: number[];
  swings?: number[];
  /** Classes of the deck box (set its size here). */
  className?: string;
  /** Classes applied to every card wrapper. */
  cardClassName?: string;
};

/** Pile of cards that slide in one after another as `progress` goes 0 → 1. */
export default function StackedDeck({
  progress,
  cards,
  tilts = DEFAULT_TILTS,
  swings = DEFAULT_SWINGS,
  className,
  cardClassName = "absolute inset-0",
}: StackedDeckProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {cards.map((card, i) => (
        <StackedCard
          key={i}
          index={i}
          count={cards.length}
          progress={progress}
          tilt={tilts[i % tilts.length]}
          swing={swings[i % swings.length]}
          className={cardClassName}
        >
          {card}
        </StackedCard>
      ))}
    </div>
  );
}
