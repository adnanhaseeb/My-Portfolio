import { BrkzFlow } from "@/components/illustrations/BrkzFlow";
import { ClinFocusPipeline } from "@/components/illustrations/ClinFocusPipeline";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectScreenshotShowcase } from "@/components/projects/ProjectScreenshotShowcase";
import { cn } from "@/lib/utils";
import type { ProjectVisual as ProjectVisualData } from "@/types/content";

type ProjectVisualProps = {
  visual: ProjectVisualData;
  label: string;
  className?: string;
};

export function ProjectVisual({ visual, label, className }: ProjectVisualProps) {
  if (visual.kind === "gallery") {
    return <ProjectGallery gallery={visual} label={label} className={className} />;
  }

  if (visual.kind === "image") {
    return <ProjectScreenshotShowcase screenshot={visual} className={className} />;
  }

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
