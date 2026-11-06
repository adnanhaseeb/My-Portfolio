import { EducationCard } from "@/components/experience/EducationCard";
import { TimelineItem } from "@/components/experience/TimelineItem";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { education, experience } from "@/content/experience";
import { sectionCopy } from "@/content/sections";

export function Experience() {
  const heading = sectionCopy.experience;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 bottom-0 left-4 w-px -translate-x-1/2 bg-linear-to-b from-brand-blue via-brand-violet/60 to-transparent"
          />
          <ol className="relative">
            {experience.map((item) => (
              <TimelineItem key={`${item.company}-${item.role}`} item={item} />
            ))}
            <EducationCard education={education} />
          </ol>
        </div>
      </Container>
    </section>
  );
}
