import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/types/content";

type ProjectScreenshotShowcaseProps = {
  screenshot: ProjectScreenshot;
  className?: string;
};

export function ProjectScreenshotShowcase({ screenshot, className }: ProjectScreenshotShowcaseProps) {
  return (
    <div className={cn("self-center overflow-hidden rounded-2xl border shadow-sm", className)}>
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        sizes="(min-width: 1152px) 540px, (min-width: 1024px) 46vw, 92vw"
        className="h-auto w-full"
      />
    </div>
  );
}
