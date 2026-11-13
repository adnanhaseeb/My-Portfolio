import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TechChip } from "@/components/shared/TechChip";
import { cn } from "@/lib/utils";
import type { Project, ProjectImage } from "@/types/content";

type WorkPreviewCardProps = {
  project: Project;
  cover?: ProjectImage;
  className?: string;
};

export function WorkPreviewCard({ project, cover, className }: WorkPreviewCardProps) {
  const href = `/projects/#project-${project.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-[border-color,box-shadow] duration-300 hover:border-brand-violet/40 hover:shadow-lg hover:shadow-brand-violet/5",
        cover && "lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
        className,
      )}
    >
      {cover ? (
        <div className="overflow-hidden border-b lg:border-r lg:border-b-0">
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 1024px) 620px, 92vw"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <p className="font-mono text-xs text-muted-foreground">{project.context}</p>
        <h3 className="text-xl font-semibold sm:text-2xl">
          <Link
            href={href}
            className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">{project.outcome}</p>
        <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 4).map((tool) => (
            <li key={tool}>
              <TechChip label={tool} />
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand-violet"
        >
          Read the case study
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </div>
    </article>
  );
}
