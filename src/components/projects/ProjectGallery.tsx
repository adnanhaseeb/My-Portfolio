"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { cn } from "@/lib/utils";
import type { ProjectGallery as ProjectGalleryData } from "@/types/content";

type ProjectGalleryProps = {
  gallery: ProjectGalleryData;
  label: string;
  className?: string;
};

const swipeThreshold = 48;

const arrowClassName =
  "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-card/90 text-foreground shadow-lg backdrop-blur-sm transition-[opacity,transform] outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none sm:size-11 sm:opacity-0 sm:group-hover/gallery:opacity-100 sm:focus-visible:opacity-100";

export function ProjectGallery({ gallery, label, className }: ProjectGalleryProps) {
  const { slides } = gallery;
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set([0, 1]));
  const pointerStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    const next = (index + slides.length) % slides.length;
    setActive(next);
    setLoaded((previous) => new Set([...previous, next, (next + 1) % slides.length]));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < swipeThreshold) return;
    goTo(distance < 0 ? active + 1 : active - 1);
  };

  return (
    <div className={cn("flex flex-col gap-3 sm:gap-4", className)}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="group/gallery relative touch-pan-y overflow-hidden rounded-2xl border bg-surface shadow-sm outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="grid">
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <div
                key={slide.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}`}
                aria-hidden={!isActive}
                className={cn(
                  "col-start-1 row-start-1 transition-opacity duration-500 ease-out motion-reduce:transition-none",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                {loaded.has(index) ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    draggable={false}
                    sizes="(min-width: 1152px) 1088px, 94vw"
                    className="h-auto w-full"
                  />
                ) : (
                  <div style={{ aspectRatio: `${slide.width} / ${slide.height}` }} />
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous screenshot" className={cn(arrowClassName, "left-3")}>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button type="button" onClick={() => goTo(active + 1)} aria-label="Next screenshot" className={cn(arrowClassName, "right-3")}>
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>

        <p aria-live="polite" className="sr-only">
          {`Screenshot ${active + 1} of ${slides.length}: ${slides[active].alt}`}
        </p>
      </div>

      <ul className="flex snap-x gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <li key={slide.thumb} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show screenshot ${index + 1}: ${slide.alt}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "block w-24 overflow-hidden rounded-lg border transition outline-none focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none sm:w-full",
                  isActive
                    ? "border-brand-violet opacity-100 ring-2 ring-brand-violet/40"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image src={slide.thumb} alt="" width={320} height={200} className="h-auto w-full" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
