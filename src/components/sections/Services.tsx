import { ServiceCard } from "@/components/cards/ServiceCard";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { sectionCopy } from "@/content/sections";
import { services } from "@/content/services";

export function Services() {
  const heading = sectionCopy.services;

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} as="li" delay={index * 0.06} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
