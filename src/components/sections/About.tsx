import { ArrowRight, Briefcase, GraduationCap, Laptop, MapPin, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { TechChip } from "@/components/shared/TechChip";
import { about } from "@/content/about";
import { site } from "@/content/site";
import type { AboutFact } from "@/types/content";

const factIcons: Record<AboutFact["icon"], LucideIcon> = {
  "map-pin": MapPin,
  briefcase: Briefcase,
  laptop: Laptop,
  "graduation-cap": GraduationCap,
};

const linkClassName =
  "group inline-flex items-center gap-1.5 rounded-md text-foreground outline-none transition-colors hover:text-brand-violet focus-visible:ring-3 focus-visible:ring-ring/50";

const arrowClassName = "size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none";

export function About() {
  return (
    <section aria-labelledby="about-heading" className="border-y bg-surface py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <div className="shrink-0 rounded-full bg-gradient-brand p-0.5 shadow-sm">
              <Image
                src="/images/profile/adnan.webp"
                alt={site.name}
                width={256}
                height={256}
                sizes="112px"
                className="size-24 rounded-full border-4 border-surface object-cover sm:size-28"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="font-heading text-xl font-semibold tracking-tight">{site.name}</p>
              <p className="text-sm text-pretty text-muted-foreground">{site.title}</p>
            </div>
          </div>

          <dl className="flex flex-col divide-y rounded-2xl border bg-card">
            {about.facts.map((fact) => {
              const Icon = factIcons[fact.icon];
              return (
                <div key={fact.label} className="flex items-center gap-4 px-5 py-4">
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-brand-violet" />
                  <dt className="w-20 shrink-0 text-sm text-muted-foreground sm:w-24">{fact.label}</dt>
                  <dd className="min-w-0 text-sm font-medium text-pretty">{fact.value}</dd>
                </div>
              );
            })}
          </dl>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs">
            {about.eyebrow}
          </span>
          <h2 id="about-heading" className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            {about.title}
          </h2>
          <div className="flex flex-col gap-4">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <ul aria-label="Main stack" className="flex flex-wrap gap-2">
            {about.stack.map((tool) => (
              <li key={tool}>
                <TechChip label={tool} />
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <Link href="/experience" className={linkClassName}>
              Read my experience
              <ArrowRight aria-hidden="true" className={arrowClassName} />
            </Link>
            <Link href="/skills" className={linkClassName}>
              See all skills
              <ArrowRight aria-hidden="true" className={arrowClassName} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
