import { SkillGroupCard } from "@/components/cards/SkillGroupCard";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sectionCopy } from "@/content/sections";
import { skillGroups } from "@/content/skills";

export function Skills() {
  const heading = sectionCopy.skills;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <Reveal>
          <SectionHeading
            as="h1"
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
