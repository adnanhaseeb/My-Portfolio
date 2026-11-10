import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/types/content";

type ProjectScreenshotShowcaseProps = {
  screenshot: ProjectScreenshot;
  featured?: boolean;
  className?: string;
};

const calloutPositionsWithInset = ["sm:absolute sm:-top-4 sm:-right-3", "sm:absolute sm:right-[-0.75rem] sm:bottom-[22%]"];
const calloutPositionsWithoutInset = ["sm:absolute sm:-top-5 sm:-right-3", "sm:absolute sm:-bottom-6 sm:-left-3"];

export function ProjectScreenshotShowcase({ screenshot, featured = false, className }: ProjectScreenshotShowcaseProps) {
  const { url, callouts = [], inset } = screenshot;
  const calloutPositions = inset ? calloutPositionsWithInset : calloutPositionsWithoutInset;

  return (
    <div
      className={cn(
        "relative isolate flex h-full flex-col justify-center overflow-hidden rounded-2xl border bg-surface px-3 py-4 sm:px-8 sm:py-10",
        featured && "lg:px-16 lg:py-14",
        className,
      )}
    >
      <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] opacity-70"
      />

      <div className={cn("relative mx-auto w-full", inset && "sm:mb-16", featured && "max-w-4xl")}>
        <figure className="overflow-hidden rounded-xl border bg-card shadow-xl shadow-brand-violet/10">
          <div className="flex items-center gap-1.5 border-b bg-muted/60 px-3 py-2.5">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
            <span className="ml-2 flex h-5 min-w-0 flex-1 items-center rounded-full bg-foreground/[0.06] px-3 font-mono text-[0.65rem] text-muted-foreground">
              <span className="truncate">{url}</span>
            </span>
          </div>
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            sizes={featured ? "(min-width: 1152px) 896px, 92vw" : "(min-width: 1152px) 540px, (min-width: 1024px) 46vw, 92vw"}
            className="h-auto w-full"
          />
        </figure>

        {inset ? (
          <figure
            className={cn(
              "relative mt-3 w-full overflow-hidden rounded-xl border bg-card shadow-2xl sm:absolute sm:-bottom-16 sm:-left-4 sm:mt-0 sm:-rotate-2",
              featured ? "sm:w-[30%]" : "sm:w-[44%]",
            )}
          >
            <figcaption className="border-b bg-muted/60 px-3 py-1.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
              {inset.caption}
            </figcaption>
            <Image
              src={inset.src}
              alt={inset.alt}
              width={inset.width}
              height={inset.height}
              sizes={featured ? "(min-width: 1152px) 270px, (min-width: 640px) 30vw, 92vw" : "(min-width: 640px) 40vw, 92vw"}
              className="h-auto w-full"
            />
          </figure>
        ) : null}

        {callouts.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2 sm:contents">
            {callouts.slice(0, calloutPositions.length).map((callout, index) => (
              <li
                key={callout.label}
                className={cn(
                  "flex flex-col rounded-xl border bg-card/95 px-3.5 py-2.5 shadow-xl backdrop-blur-sm",
                  calloutPositions[index],
                )}
              >
                <span className="text-gradient font-heading text-lg leading-tight font-semibold">{callout.value}</span>
                <span className="text-xs text-muted-foreground">{callout.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
