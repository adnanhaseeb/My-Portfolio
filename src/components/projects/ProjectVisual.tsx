import Image from "next/image";

import { BrkzFlow } from "@/components/illustrations/BrkzFlow";
import { ClinFocusPipeline } from "@/components/illustrations/ClinFocusPipeline";
import { cn } from "@/lib/utils";
import type { ProjectVisual as ProjectVisualData } from "@/types/content";

type ProjectVisualProps = {
  visual: ProjectVisualData;
  className?: string;
};

export function ProjectVisual({ visual, className }: ProjectVisualProps) {
  if (visual.kind === "illustration") {
    const Illustration = visual.id === "brkz-flow" ? BrkzFlow : ClinFocusPipeline;

    return (
      <div
        className={cn(
          "relative isolate flex h-full min-h-64 items-center justify-center overflow-hidden rounded-2xl border bg-surface p-4 sm:p-6",
          className,
        )}
      >
        <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
        <Illustration className="w-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-full items-center overflow-hidden rounded-2xl border bg-surface p-3 sm:p-5",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
      <figure className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b bg-muted/60 px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-2 h-4 flex-1 rounded-full bg-foreground/[0.06]" />
        </div>
        <Image
          src={visual.src}
          alt={visual.alt}
          width={1600}
          height={730}
          sizes="(min-width: 1152px) 540px, (min-width: 1024px) 46vw, 92vw"
          className="h-auto w-full"
        />
      </figure>
    </div>
  );
}
