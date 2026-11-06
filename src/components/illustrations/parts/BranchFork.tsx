"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type BranchForkProps = {
  play: boolean;
  reduceMotion: boolean;
  delay: number;
  passLabel: string;
  flagLabel: string;
  className?: string;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Anchor points, as offsets from the left edge, that line up with the lane columns below.
 * Narrow containers use two equal lanes with a 0.75rem gap under a centred trunk.
 * From @md up the lanes share the five track grid of the main row
 * (three node columns, two 1.25rem connector tracks), so the trunk sits under
 * the third column and the pass lane starts back at the first.
 */
const anchors = cn(
  "[--p:calc((100%_-_0.75rem)/4)] [--t:50%] [--f:calc(100%_-_(100%_-_0.75rem)/4)]",
  "@md:[--p:calc((100%_-_2.5rem)/6)] @md:[--t:calc(100%_-_(100%_-_2.5rem)/6)] @md:[--f:calc(100%_-_(100%_-_2.5rem)/6)]",
);

const at = (left: string, right?: string): CSSProperties =>
  right === undefined ? { left } : { left, right };

export function BranchFork({
  play,
  reduceMotion,
  delay,
  passLabel,
  flagLabel,
  className,
}: BranchForkProps) {
  const grow = (axis: "scaleX" | "scaleY", offset: number, duration = 0.3) => ({
    initial: reduceMotion ? false : { [axis]: 0 },
    animate: play ? { [axis]: 1 } : { [axis]: 0 },
    transition: { duration, delay: delay + offset, ease: EASE_OUT },
  });

  return (
    <div aria-hidden className={cn("relative h-10", anchors, className)}>
      <motion.span
        className="absolute top-0 h-3 w-px origin-top bg-brand-violet/50"
        style={at("var(--t)")}
        {...grow("scaleY", 0, 0.2)}
      />
      <motion.span
        className="absolute top-3 h-px origin-right bg-pass/55"
        style={at("var(--p)", "calc(100% - var(--t))")}
        {...grow("scaleX", 0.2, 0.4)}
      />
      <motion.span
        className="absolute top-3 h-px origin-left bg-flag/60"
        style={at("var(--t)", "calc(100% - var(--f))")}
        {...grow("scaleX", 0.2)}
      />
      <motion.span
        className="absolute top-3 bottom-0 w-px origin-top bg-pass/55"
        style={at("var(--p)")}
        {...grow("scaleY", 0.6, 0.25)}
      />
      <motion.span
        className="absolute top-3 bottom-0 w-px origin-top bg-flag/60"
        style={at("var(--f)")}
        {...grow("scaleY", 0.45, 0.25)}
      />
      <span
        className="absolute top-4 font-mono text-[10px] leading-none text-pass"
        style={at("calc(var(--p) + 0.4rem)")}
      >
        {passLabel}
      </span>
      <span
        className="absolute top-4 font-mono text-[10px] leading-none text-flag"
        style={at("calc(var(--f) + 0.4rem)")}
      >
        {flagLabel}
      </span>
    </div>
  );
}
