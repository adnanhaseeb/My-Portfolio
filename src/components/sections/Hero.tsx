"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { hero } from "@/content/profile";
import { site } from "@/content/site";

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaClassName = "h-11 w-full rounded-full px-5 text-sm focus-visible:ring-3 sm:w-auto";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] opacity-50 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]"
      />

      <Container>
        <motion.div
          className="flex flex-col items-center text-center"
          variants={sequence}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={rise}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border bg-card/80 py-1 pr-3.5 pl-1 text-sm text-muted-foreground shadow-xs backdrop-blur-sm"
          >
            <Image
              src="/images/profile/adnan.webp"
              alt={site.name}
              width={24}
              height={24}
              preload
              className="size-6 shrink-0 rounded-full object-cover"
            />
            <span className="relative flex size-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pass opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-pass" />
            </span>
            <span className="truncate">{site.availability}</span>
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-7 max-w-4xl text-5xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl"
          >
            {hero.headlineStart} <GradientText>{hero.headlineHighlight}</GradientText> {hero.headlineEnd}
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
          >
            {hero.subtext}
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className={ctaClassName}>
              <Link href="/projects">
                {hero.primaryCta}
                <ArrowRight
                  data-icon="inline-end"
                  aria-hidden
                  className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={ctaClassName}>
              <a href={site.cvPath} download>
                <Download data-icon="inline-start" aria-hidden />
                {hero.secondaryCta}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
