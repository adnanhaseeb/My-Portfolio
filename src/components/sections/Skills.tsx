import { SkillGroupCard } from "@/components/cards/SkillGroupCard";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sectionCopy } from "@/content/sections";
import { skillGroups } from "@/content/skills";

export function Skills() {
  const heading = sectionCopy.skills;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-y bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="skills-heading"
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>
        <ul className="mt-14 columns-1 gap-4 md:mt-16 md:columns-2 lg:columns-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} as="li" delay={index * 0.05} className="mb-4 break-inside-avoid">
              <SkillGroupCard group={group} featured={index === 0} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
