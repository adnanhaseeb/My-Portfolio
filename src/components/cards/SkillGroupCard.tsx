import { TechChip } from "@/components/shared/TechChip";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/types/content";

type SkillGroupCardProps = {
  group: SkillGroup;
  featured?: boolean;
  className?: string;
};

export function SkillGroupCard({ group, featured = false, className }: SkillGroupCardProps) {
  const headingId = `skill-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const countLabel = `${group.skills.length} ${group.skills.length === 1 ? "skill" : "skills"}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground",
        featured && "shadow-sm",
        className,
      )}
    >
      {featured ? <span aria-hidden="true" className="bg-gradient-brand absolute inset-x-0 top-0 h-0.5" /> : null}
      <header className="flex items-baseline justify-between gap-4">
        <h2 id={headingId} className="font-heading text-lg font-semibold text-balance">
          {group.title}
        </h2>
        <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{countLabel}</span>
      </header>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li key={skill} className="max-w-full">
            <TechChip label={skill} className="max-w-full" />
          </li>
        ))}
      </ul>
    </article>
  );
}
