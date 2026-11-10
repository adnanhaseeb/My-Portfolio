import type { HeroContent } from "@/types/content";

export const hero: HeroContent = {
  headlineStart: "AI systems that are",
  headlineHighlight: "checked",
  headlineEnd: "before they ship",
  subtext:
    "I'm a software engineer building Python backends, LLM document workflows and integrations. Every model output passes deterministic validation, and anything uncertain goes to a human before it reaches the ledger.",
  primaryCta: "View projects",
  secondaryCta: "Download CV",
  stats: [
    { value: "~12%", label: "of one supplier's invoices caught with misread IDs before the ERP" },
    { value: "4.1 → <1 min", label: "rule run time after caching extraction on content" },
    { value: "276", label: "collected fields matched to their expected schema" },
    { value: "3+ yrs", label: "building web apps and APIs for freelance clients" },
  ],
};
