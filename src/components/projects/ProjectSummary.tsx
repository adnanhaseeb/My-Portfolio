import type { Project } from "@/types/content";

type ProjectSummaryProps = {
  project: Project;
  headingId: string;
};

export function ProjectSummary({ project, headingId }: ProjectSummaryProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs text-muted-foreground">{project.context}</p>
        <h2 id={headingId} className="text-2xl font-semibold sm:text-3xl">
          {project.title}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Problem</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">{project.problem}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">What I built</h3>
        <ul className="flex flex-col gap-2.5">
          {project.built.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              <span aria-hidden="true" className="bg-gradient-brand mt-[0.6em] size-1.5 shrink-0 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
