"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type FlowConnectorProps = {
  play: boolean;
  reduceMotion: boolean;
  delay: number;
  tone?: "brand" | "pass";
  className?: string;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const lineTone = {
  brand: "bg-brand-violet/50",
  pass: "bg-pass/55",
};

const dotTone = {
  brand: "bg-brand-violet ring-3 ring-brand-violet/20",
  pass: "bg-pass ring-3 ring-pass/20",
};

/**
 * A short link between two flow nodes. It runs vertically in narrow containers
 * and horizontally from the @md container size up. Uniform scaling from a
 * top or left origin lets one animation draw the line in either orientation,
 * and the travelling dot moves by 100% of its own box on both axes for the same reason.
 */
export function FlowConnector({
  play,
  reduceMotion,
  delay,
  tone = "brand",
  className,
}: FlowConnectorProps) {
  return (
    <div
      aria-hidden
      className={cn("flex h-5 items-center justify-center @md:h-auto", className)}
    >
      <div className="relative h-full w-px @md:h-px @md:w-full">
        <span className="absolute inset-0 bg-border" />
        <motion.span
          className={cn("absolute inset-0 origin-top @md:origin-left", lineTone[tone])}
          initial={reduceMotion ? false : { scale: 0 }}
          animate={play ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay, ease: EASE_OUT }}
        />
        {reduceMotion ? null : (
          <motion.span
            className="absolute inset-0"
            initial={{ x: "0%", y: "0%", opacity: 0 }}
            animate={
              play
                ? { x: ["0%", "100%"], y: ["0%", "100%"], opacity: [0, 1, 1, 0] }
                : { x: "0%", y: "0%", opacity: 0 }
            }
            transition={{
              x: { duration: 0.55, delay, ease: "easeInOut" },
              y: { duration: 0.55, delay, ease: "easeInOut" },
              opacity: { duration: 0.55, delay, times: [0, 0.15, 0.8, 1] },
            }}
          >
            <span
              className={cn(
                "absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
                dotTone[tone],
              )}
            />
          </motion.span>
        )}
      </div>
    </div>
  );
}
