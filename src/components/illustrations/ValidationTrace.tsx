"use client";

import { AlertTriangle, ArrowRight, CheckCircle2, FileText, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { validationTrace } from "@/content/profile";
import { cn } from "@/lib/utils";
import type { TraceCheckStatus } from "@/types/content";

type ValidationTraceProps = {
  className?: string;
};

type CheckPhase = "pending" | "running" | "done";

const ease = [0.22, 1, 0.36, 1] as const;

const fieldCount = validationTrace.extractedFields.length;
const checkCount = validationTrace.checks.length;
const finalStep = fieldCount + checkCount * 2 + 1;

const stepDelays: number[] = [
  650,
  ...validationTrace.extractedFields.slice(1).map(() => 170),
  ...validationTrace.checks.flatMap((_, index) => [index === 0 ? 380 : 260, 620]),
  420,
];

const statusText: Record<TraceCheckStatus, string> = {
  pass: "Passed",
  flag: "Flagged",
};

function phaseFor(step: number, index: number): CheckPhase {
  const runningAt = fieldCount + index * 2 + 1;
  if (step >= runningAt + 1) return "done";
  if (step >= runningAt) return "running";
  return "pending";
}

function StatusIcon({ phase, status }: { phase: CheckPhase; status: TraceCheckStatus }) {
  const key = phase === "done" ? status : phase;

  return (
    <span className="relative flex size-5 shrink-0 items-center justify-center" aria-hidden>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={key}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease }}
        >
          {key === "pending" ? <span className="size-3.5 rounded-full border-[1.5px] border-dashed border-muted-foreground/50" /> : null}
          {key === "running" ? <Loader2 className="size-4 animate-spin text-muted-foreground" /> : null}
          {key === "pass" ? <CheckCircle2 className="size-[1.125rem] text-pass" /> : null}
          {key === "flag" ? <AlertTriangle className="size-[1.125rem] text-flag" /> : null}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function ValidationTrace({ className }: ValidationTraceProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "0px 0px -15% 0px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    let elapsed = 0;
    const timers = stepDelays.map((delay, index) => {
      elapsed += delay;
      return window.setTimeout(() => setProgress(index + 1), elapsed);
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduceMotion]);

  const step = reduceMotion ? finalStep : progress;
  const outcomeVisible = step >= finalStep;

  return (
    <div
      ref={rootRef}
      className={cn(
        "overflow-hidden rounded-2xl border bg-card text-left shadow-xl shadow-black/[0.04] dark:shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b bg-surface/70 px-4 py-3">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <p className="flex min-w-0 flex-1 items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <FileText className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{validationTrace.documentLabel}</span>
        </p>
        <Badge variant="outline" className="shrink-0 bg-card text-[0.6875rem] text-muted-foreground">
          Example
        </Badge>
      </div>

      <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-brand-violet" aria-hidden />
            <p className="text-sm font-medium">Extracted by LLM</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{validationTrace.supplier}</p>
          <dl className="mt-4 flex flex-col gap-2">
            {validationTrace.extractedFields.map((field, index) => (
              <motion.div
                key={field.key}
                className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-lg border bg-surface/60 px-3 py-2 font-mono"
                initial={false}
                animate={step > index ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <dt className="text-xs text-muted-foreground">{field.key}</dt>
                <dd className="text-[0.8125rem] text-foreground">{field.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-brand-blue" aria-hidden />
            <p className="text-sm font-medium">Deterministic checks</p>
          </div>
          <ul className="mt-4 flex flex-col gap-4">
            {validationTrace.checks.map((check, index) => {
              const phase = phaseFor(step, index);

              return (
                <li key={check.label} className="flex items-start gap-3">
                  <StatusIcon phase={phase} status={check.status} />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        phase === "pending" ? "text-muted-foreground" : "text-foreground",
                      )}
                    >
                      {check.label}
                      <span className="sr-only">: {statusText[check.status]}</span>
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{check.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="min-h-12 border-t bg-flag/[0.06] px-5 py-3.5">
        <motion.p
          className="flex items-center gap-2 text-sm font-medium text-flag"
          initial={false}
          animate={outcomeVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.45, ease }}
        >
          <ArrowRight className="size-4 shrink-0" aria-hidden />
          {validationTrace.outcome}
        </motion.p>
      </div>
    </div>
  );
}
