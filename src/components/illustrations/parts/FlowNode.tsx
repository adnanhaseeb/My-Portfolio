import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type FlowTone = "neutral" | "brand" | "pass" | "flag";

type FlowNodeProps = {
  icon: LucideIcon;
  label: string;
  tone?: FlowTone;
  className?: string;
};

const frameTone: Record<FlowTone, string> = {
  neutral: "border-border",
  brand: "border-brand-violet/30",
  pass: "border-pass/35",
  flag: "border-flag/40",
};

const iconTone: Record<FlowTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  brand: "bg-brand-violet/10 text-brand-violet",
  pass: "bg-pass/10 text-pass",
  flag: "bg-flag/10 text-flag",
};

export function FlowNode({ icon: Icon, label, tone = "neutral", className }: FlowNodeProps) {
  return (
    <div
      className={cn(
        "flex h-full items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5 shadow-xs shadow-foreground/[0.03] @md:flex-col @md:items-start @md:gap-2",
        frameTone[tone],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("grid size-7 shrink-0 place-items-center rounded-lg", iconTone[tone])}
      >
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <span className="text-xs leading-snug font-medium text-card-foreground">{label}</span>
    </div>
  );
}
