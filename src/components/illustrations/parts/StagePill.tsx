"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type StageStatus = "queued" | "running" | "done" | "ready";

type StagePillProps = {
  status: StageStatus;
  reduceMotion: boolean;
  className?: string;
};

const tone: Record<StageStatus, string> = {
  queued: "border-border text-muted-foreground",
  running: "border-brand-violet/40 bg-brand-violet/10 text-brand-violet",
  done: "border-pass/35 bg-pass/10 text-pass",
  ready: "border-brand-blue/40 bg-brand-blue/10 text-brand-blue",
};

export function StagePill({ status, reduceMotion, className }: StagePillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-[4.5rem] items-center justify-center rounded-full border font-mono text-[10px] leading-none transition-colors duration-300 motion-reduce:transition-none",
        tone[status],
        className,
      )}
    >
      <motion.span
        key={status}
        className="inline-flex items-center gap-1"
        initial={reduceMotion ? false : { opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {status === "running" ? (
          <span aria-hidden className="relative flex size-1.5">
            {reduceMotion ? null : (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-violet/60" />
            )}
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-violet" />
          </span>
        ) : null}
        {status === "done" ? <Check aria-hidden className="size-3" strokeWidth={2.5} /> : null}
        {status}
      </motion.span>
    </span>
  );
}
