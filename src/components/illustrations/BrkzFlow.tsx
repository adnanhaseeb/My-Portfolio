"use client";

import {
  ClipboardCheck,
  Database,
  FileText,
  Inbox,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { BranchFork } from "./parts/BranchFork";
import { FlowConnector } from "./parts/FlowConnector";
import { FlowNode } from "./parts/FlowNode";

type BrkzFlowProps = {
  className?: string;
};

const DESCRIPTION =
  "Supplier invoice flow. Each supplier invoice is read by LLM extraction, then checked by deterministic validation. Invoices that pass are matched to a purchase order and posted to the ERP. Invoices that fail, for example when an e-invoice ID was read as the invoice number, are flagged to a review queue instead.";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const TRACKS = "@md:grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)]";

const timing = {
  invoice: 0,
  toExtraction: 0.25,
  extraction: 0.45,
  toValidation: 0.7,
  validation: 0.9,
  fork: 1.15,
  outcomes: 1.85,
  caption: 2.05,
  toErp: 2.05,
  erp: 2.3,
};

type StageProps = {
  play: boolean;
  reduceMotion: boolean;
  delay: number;
  className?: string;
  children: ReactNode;
};

function Stage({ play, reduceMotion, delay, className, children }: StageProps) {
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0.25, y: 6 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 6 }}
      transition={{ duration: 0.45, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export function BrkzFlow({ className }: BrkzFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion() ?? false;
  const play = reduceMotion || inView;
  const motionProps = { play, reduceMotion };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={DESCRIPTION}
      className={cn("@container w-full", className)}
    >
      <div className={cn("flex flex-col @md:grid", TRACKS)}>
        <Stage {...motionProps} delay={timing.invoice}>
          <FlowNode icon={FileText} label="Supplier invoice" />
        </Stage>
        <FlowConnector {...motionProps} delay={timing.toExtraction} />
        <Stage {...motionProps} delay={timing.extraction}>
          <FlowNode icon={Sparkles} label="LLM extraction" tone="brand" />
        </Stage>
        <FlowConnector {...motionProps} delay={timing.toValidation} />
        <Stage {...motionProps} delay={timing.validation}>
          <FlowNode icon={ShieldCheck} label="Deterministic validation" tone="brand" />
        </Stage>
      </div>

      <BranchFork {...motionProps} delay={timing.fork} passLabel="pass" flagLabel="flag" />

      <div className={cn("grid grid-cols-2 items-start gap-x-3 @md:gap-x-0", TRACKS)}>
        <div className="flex flex-col @md:contents">
          <Stage {...motionProps} delay={timing.outcomes} className="@md:col-start-1 @md:row-start-1">
            <FlowNode icon={ClipboardCheck} label="PO match" tone="pass" />
          </Stage>
          <FlowConnector
            {...motionProps}
            delay={timing.toErp}
            tone="pass"
            className="@md:col-start-2 @md:row-start-1 @md:self-stretch"
          />
          <Stage {...motionProps} delay={timing.erp} className="@md:col-start-3 @md:row-start-1">
            <FlowNode icon={Database} label="ERP" tone="pass" />
          </Stage>
        </div>

        <div className="flex flex-col gap-2 @md:contents">
          <Stage {...motionProps} delay={timing.outcomes} className="@md:col-start-5 @md:row-start-1">
            <FlowNode icon={Inbox} label="Review queue" tone="flag" />
          </Stage>
          <Stage
            {...motionProps}
            delay={timing.caption}
            className="@md:col-start-5 @md:row-start-2 @md:mt-2"
          >
            <p className="rounded-md border border-dashed border-flag/40 bg-flag/5 px-2 py-1 font-mono text-[10px] leading-snug text-flag">
              e-invoice ID != invoice no.
            </p>
          </Stage>
        </div>
      </div>
    </div>
  );
}
