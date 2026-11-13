import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { WorkPreviewCard } from "@/components/projects/WorkPreviewCard";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { sectionCopy } from "@/content/sections";
import type { Project, ProjectImage } from "@/types/content";

function coverFor(project: Project): ProjectImage | undefined {
  if (project.visual.kind === "gallery") return project.visual.slides[0];
  if (project.visual.kind === "image") return project.visual;
  return undefined;
}

export function FeaturedWork() {
  const heading = sectionCopy.work;
  const [lead, ...rest] = projects;

  return (
    <section aria-labelledby="work-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            id="work-heading"
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="flex flex-col gap-5">
          <Reveal>
            <WorkPreviewCard project={lead} cover={coverFor(lead)} />
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-3">
            {rest.map((project, index) => (
              <Reveal key={project.slug} as="li" delay={index * 0.06}>
                <WorkPreviewCard project={project} />
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-5 text-sm">
            <Link href="/projects">
              See all projects
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
