import { ProjectOutcome } from "@/components/projects/ProjectOutcome";
import { ProjectSummary } from "@/components/projects/ProjectSummary";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  reverse?: boolean;
};

export function ProjectCard({ project, reverse = false }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  if (project.featured) {
    return (
      <Reveal
        as="article"
        className="relative rounded-3xl bg-gradient-brand p-px shadow-sm"
      >
        <div className="flex flex-col gap-8 rounded-[calc(var(--radius-3xl)-1px)] bg-card p-3 sm:p-4 lg:gap-10">
          <ProjectVisual visual={project.visual} featured />
          <div className="grid gap-8 px-2 pb-4 sm:px-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 lg:px-6 lg:pb-6">
            <ProjectSummary project={project} headingId={headingId} />
            <div className="lg:pt-10">
              <ProjectOutcome project={project} />
            </div>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal as="article" className="rounded-3xl border bg-card p-3 shadow-xs sm:p-4">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <ProjectVisual visual={project.visual} className={cn(reverse && "lg:order-last")} />
        <div className="flex min-w-0 flex-col gap-6 px-2 pb-4 sm:px-4 lg:py-6">
          <ProjectSummary project={project} headingId={headingId} />
          <ProjectOutcome project={project} />
        </div>
      </div>
    </Reveal>
  );
}
