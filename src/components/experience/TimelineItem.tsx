import { ExperienceProjectBlock } from "@/components/experience/ExperienceProjectBlock";
import { Reveal } from "@/components/shared/Reveal";
import type { ExperienceItem } from "@/types/content";

type TimelineItemProps = {
  item: ExperienceItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <li className="relative pb-16 pl-11 last:pb-0 sm:pl-14 md:pb-20">
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-4 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border bg-background shadow-xs"
      >
        <span className="size-1.5 rounded-full bg-gradient-brand" />
      </span>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <Reveal className="flex flex-col gap-2 self-start lg:sticky lg:top-28">
          <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
          <h3 className="text-xl font-semibold sm:text-2xl">{item.role}</h3>
          <p className="text-base font-medium text-foreground/90">{item.company}</p>
          <p className="font-mono text-xs text-muted-foreground">{item.location}</p>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-5">
          <Reveal>
            <p className="max-w-[68ch] text-base leading-7 text-pretty text-muted-foreground">{item.summary}</p>
          </Reveal>

          {item.projects.length > 0
            ? item.projects.map((project, index) => (
                <Reveal key={project.name} delay={index * 0.05}>
                  <ExperienceProjectBlock project={project} />
                </Reveal>
              ))
            : null}

          {item.projects.length === 0 && item.highlights.length > 0 ? (
            <Reveal>
              <ul className="flex max-w-[68ch] flex-col gap-3">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[0.9375rem] leading-7 text-pretty text-muted-foreground">
                    <span aria-hidden="true" className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-gradient-brand" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </li>
  );
}
