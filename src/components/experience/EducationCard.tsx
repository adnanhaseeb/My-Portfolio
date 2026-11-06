import { GraduationCap } from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";
import type { EducationItem } from "@/types/content";

type EducationCardProps = {
  education: EducationItem;
};

export function EducationCard({ education }: EducationCardProps) {
  return (
    <li className="relative pl-11 sm:pl-14">
      <span
        aria-hidden="true"
        className="absolute top-0 left-4 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border bg-card text-brand-violet shadow-xs"
      >
        <GraduationCap className="size-4" />
      </span>

      <Reveal className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <div className="hidden lg:block" />
        <div className="rounded-2xl border bg-card p-5 shadow-xs sm:p-7">
          <p className="font-mono text-xs text-muted-foreground">{education.period}</p>
          <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{education.degree}</h3>
          <p className="mt-1 text-base text-foreground/90">{education.institution}</p>
          <p className="mt-4 inline-flex rounded-full border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
            {education.detail}
          </p>
        </div>
      </Reveal>
    </li>
  );
}
