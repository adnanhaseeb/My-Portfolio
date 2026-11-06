"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { StagePill, type StageStatus } from "./parts/StagePill";

type ClinFocusPipelineProps = {
  className?: string;
};

type PipelineStep = {
  title: string;
  detail: string;
};

const STEPS: PipelineStep[] = [
  { title: "Schema match", detail: "276 fields" },
  { title: "Dataset extraction", detail: "14 datasets from 69 forms" },
  { title: "Reconcile", detail: "values across sources" },
  { title: "Rule eligibility", detail: "86 rules" },
  { title: "Review workspace", detail: "tracked findings" },
];

const DESCRIPTION =
  "Clinical data reconciliation pipeline in five ordered stages. 1, schema match: 276 collected fields matched to the expected schema. 2, dataset extraction: 14 datasets extracted from 69 source forms. 3, reconcile: values compared across sources. 4, rule eligibility: which of 86 validation rules the study can run. 5, review workspace: flagged records become tracked findings.";

const STEP_INTERVAL_MS = 520;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const markerTone: Record<StageStatus, string> = {
  queued: "border-border bg-card text-muted-foreground",
  running: "border-brand-violet bg-card text-brand-violet ring-4 ring-brand-violet/15",
  done: "border-brand-violet/40 bg-accent text-accent-foreground",
  ready: "border-brand-blue/50 bg-accent text-accent-foreground",
};

function statusFor(index: number, completed: number, running: number): StageStatus {
  if (index < completed) {
    return index === STEPS.length - 1 ? "ready" : "done";
  }
  return index === running ? "running" : "queued";
}

export function ClinFocusPipeline({ className }: ClinFocusPipelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [progress, setProgress] = useState(0);

  const started = inView && !reduceMotion;
  const completed = reduceMotion ? STEPS.length : progress;
  const running = started && progress < STEPS.length ? progress : -1;

  useEffect(() => {
    if (!started || progress >= STEPS.length) {
      return;
    }
    const timer = window.setTimeout(() => setProgress(progress + 1), STEP_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [started, progress]);

  return (
    <div ref={ref} role="img" aria-label={DESCRIPTION} className={cn("w-full", className)}>
      <ol className="flex flex-col">
        {STEPS.map((step, index) => {
          const status = statusFor(index, completed, running);
          const isLast = index === STEPS.length - 1;

          return (
            <li
              key={step.title}
              className="relative grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-x-3 py-2"
            >
              {isLast ? null : (
                <span
                  aria-hidden
                  className="absolute top-10 -bottom-1 left-[calc(0.875rem-0.5px)] w-px overflow-hidden rounded-full bg-border"
                >
                  <motion.span
                    className="absolute inset-0 origin-top bg-linear-to-b from-brand-blue to-brand-violet"
                    initial={reduceMotion ? false : { scaleY: 0 }}
                    animate={{ scaleY: index < completed ? 1 : 0 }}
                    transition={{ duration: STEP_INTERVAL_MS / 1000, ease: EASE_OUT }}
                  />
                </span>
              )}

              <span
                className={cn(
                  "grid size-7 place-items-center self-start rounded-full border font-mono text-[11px] font-medium tabular-nums transition-[color,background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none",
                  markerTone[status],
                )}
              >
                {index + 1}
              </span>

              <span className="flex min-w-0 flex-col gap-0.5">
                <span
                  className={cn(
                    "font-heading text-sm leading-tight font-medium transition-colors duration-300 motion-reduce:transition-none",
                    status === "queued" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {step.title}
                </span>
                <span className="font-mono text-[11px] leading-snug text-muted-foreground">
                  {step.detail}
                </span>
              </span>

              <StagePill status={status} reduceMotion={reduceMotion} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
