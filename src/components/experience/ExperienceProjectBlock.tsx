import { TechChip } from "@/components/shared/TechChip";
import { cn } from "@/lib/utils";
import type { ExperienceProject } from "@/types/content";

type ExperienceProjectBlockProps = {
  project: ExperienceProject;
  className?: string;
};

function splitLeadingWord(text: string) {
  const index = text.indexOf(" ");
  if (index === -1) {
    return { lead: text, rest: "" };
  }
  return { lead: text.slice(0, index), rest: text.slice(index) };
}

export function ExperienceProjectBlock({ project, className }: ExperienceProjectBlockProps) {
  return (
    <article className={cn("rounded-2xl border bg-card p-5 shadow-xs sm:p-7", className)}>
      <header className="flex flex-col gap-1">
        <h4 className="font-heading text-lg font-semibold tracking-tight sm:text-xl">{project.name}</h4>
        <p className="text-sm text-muted-foreground">{project.context}</p>
      </header>

      <ul className="mt-5 flex max-w-[68ch] flex-col gap-4">
        {project.highlights.map((highlight) => {
          const { lead, rest } = splitLeadingWord(highlight);
          return (
            <li key={highlight} className="flex gap-3 text-[0.9375rem] leading-7 text-pretty text-muted-foreground">
              <span aria-hidden="true" className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-gradient-brand" />
              <span>
                <span className="font-medium text-foreground">{lead}</span>
                {rest}
              </span>
            </li>
          );
        })}
      </ul>

      {project.stack.length > 0 ? (
        <ul aria-label={`${project.name} tech stack`} className="mt-6 flex flex-wrap gap-2 border-t pt-5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechChip label={tech} />
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
