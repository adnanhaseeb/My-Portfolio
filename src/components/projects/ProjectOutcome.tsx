import { TechChip } from "@/components/shared/TechChip";
import type { Project } from "@/types/content";

type ProjectOutcomeProps = {
  project: Project;
};

export function ProjectOutcome({ project }: ProjectOutcomeProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-1.5 rounded-2xl border border-brand-violet/25 bg-brand-violet/[0.06] p-4">
        <h4 className="text-sm font-semibold text-brand-violet">Outcome</h4>
        <p className="text-sm leading-relaxed font-medium text-pretty text-foreground sm:text-base">{project.outcome}</p>
      </div>

      <ul aria-label={`${project.title} tech stack`} className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <TechChip label={tech} />
          </li>
        ))}
      </ul>
    </div>
  );
}
