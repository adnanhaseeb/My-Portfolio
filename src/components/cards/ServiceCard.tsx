import { serviceIcons } from "@/lib/serviceIcons";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/content";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-5 rounded-2xl border bg-card p-6 text-card-foreground",
        "transition-[border-color,box-shadow,translate] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-lg hover:shadow-brand-violet/5",
        "motion-reduce:transition-colors motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl border border-brand-violet/15 bg-accent text-brand-violet",
          "transition-colors duration-300 group-hover:border-brand-violet/30",
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-lg font-semibold text-balance">{service.title}</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{service.description}</p>
      </div>
    </article>
  );
}
