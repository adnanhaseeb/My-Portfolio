import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { processSteps } from "@/content/process";
import { sectionCopy } from "@/content/sections";

export function Process() {
  const heading = sectionCopy.process;

  return (
    <section aria-labelledby="process-heading" className="border-y bg-surface py-24 md:py-32">
      <Container className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <ol className="relative grid gap-6 md:grid-cols-5 md:gap-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-5 right-[10%] left-[10%] hidden h-px bg-linear-to-r from-brand-blue via-brand-violet to-brand-blue/30 md:block"
          />
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 0.07}
              className="relative flex gap-4 md:flex-col md:items-center md:text-center"
            >
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-card font-mono text-sm font-medium text-brand-violet shadow-xs">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
