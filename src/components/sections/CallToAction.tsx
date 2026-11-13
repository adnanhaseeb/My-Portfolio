import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { callToAction } from "@/content/callToAction";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type CallToActionProps = {
  className?: string;
};

export function CallToAction({ className }: CallToActionProps) {
  return (
    <section aria-labelledby="cta-heading" className={cn("pb-24 md:pb-32", className)}>
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-gradient-brand p-px shadow-sm">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-3xl)-1px)] bg-card">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow" />
              <div className="relative flex flex-col items-start gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
                <div className="flex max-w-xl flex-col gap-3">
                  <h2 id="cta-heading" className="text-3xl font-semibold sm:text-4xl">
                    {callToAction.title}
                  </h2>
                  <p className="text-base text-pretty text-muted-foreground sm:text-lg">{callToAction.description}</p>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button asChild size="lg" className="h-11 rounded-full px-5 text-sm">
                    <Link href={callToAction.primaryHref}>
                      {callToAction.primaryLabel}
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-5 text-sm">
                    <a href={site.cvPath} download>
                      <Download data-icon="inline-start" aria-hidden="true" />
                      {site.cvLabel}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
