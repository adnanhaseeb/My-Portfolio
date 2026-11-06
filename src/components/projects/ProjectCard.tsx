import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Reveal } from "@/components/shared/Reveal";
import { TechChip } from "@/components/shared/TechChip";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  reverse?: boolean;
};

export function ProjectCard({ project, reverse = false }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  return (
    <Reveal as="article" className="rounded-3xl border bg-card p-3 shadow-xs sm:p-4">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <ProjectVisual visual={project.visual} className={cn(reverse && "lg:order-last")} />

        <div className="flex min-w-0 flex-col gap-6 px-2 pb-4 sm:px-4 lg:py-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs text-muted-foreground">{project.context}</p>
            <h3 id={headingId} className="text-2xl font-semibold sm:text-3xl">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Problem</h4>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">{project.problem}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">What I built</h4>
            <ul className="flex flex-col gap-2.5">
              {project.built.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base"
                >
                  <span aria-hidden="true" className="bg-gradient-brand mt-[0.6em] size-1.5 shrink-0 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-1.5 rounded-2xl border border-brand-violet/25 bg-brand-violet/[0.06] p-4">
            <h4 className="text-sm font-semibold text-brand-violet">Outcome</h4>
            <p className="text-sm leading-relaxed font-medium text-pretty text-foreground sm:text-base">
              {project.outcome}
            </p>
          </div>

          <ul aria-label={`${project.title} tech stack`} className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <TechChip label={tech} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
