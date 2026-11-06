import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/content/projects";
import { sectionCopy } from "@/content/sections";

export function Projects() {
  const heading = sectionCopy.projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
        <div className="mt-14 flex flex-col gap-8 md:mt-20 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
