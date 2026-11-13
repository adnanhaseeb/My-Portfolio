import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const rowClassName =
  "group flex min-h-14 items-center gap-4 rounded-2xl border bg-background/60 px-4 py-3 transition-colors outline-none hover:border-brand-blue/40 hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/50";

const iconClassName =
  "flex size-9 shrink-0 items-center justify-center rounded-xl border bg-card text-brand-blue transition-colors group-hover:text-brand-violet";

export function Contact() {
  const linkedinHandle = site.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-gradient-brand p-px shadow-sm">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-3xl)-1px)] bg-card">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow" />

              <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-0 lg:p-14">
                <div className="flex min-w-0 flex-col gap-8 lg:pr-14">
                  <div className="flex flex-col items-start gap-4">
                    <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs">
                      Contact
                    </span>
                    <h1 id="contact-heading" className="font-heading text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                      {contact.heading}
                    </h1>
                    <p className="max-w-prose text-base text-pretty text-muted-foreground sm:text-lg">{contact.subtext}</p>
                  </div>

                  <ul className="flex flex-col gap-3">
                    <li>
                      <a href={`mailto:${site.email}`} className={rowClassName}>
                        <span className={iconClassName}>
                          <Mail aria-hidden="true" className="size-4" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-xs font-medium text-muted-foreground">Email</span>
                          <span className="truncate text-sm font-medium text-foreground sm:text-base">{site.email}</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className={rowClassName}>
                        <span className={iconClassName}>
                          <LinkedInIcon />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-xs font-medium text-muted-foreground">LinkedIn</span>
                          <span className="truncate text-sm font-medium text-foreground sm:text-base">{linkedinHandle}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  </ul>

                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="size-4 shrink-0" />
                    {site.location}
                  </p>
                </div>

                <div className="min-w-0 lg:border-l lg:pl-14">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-8 md:mt-20">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">{contact.nextStepsTitle}</h2>
          </Reveal>
          <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
            {contact.nextSteps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 0.07}
                className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-6"
              >
                <span className="grid size-10 place-items-center rounded-full border bg-surface font-mono text-sm font-medium text-brand-violet">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
