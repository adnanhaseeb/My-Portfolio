import type { SectionCopy } from "@/types/content";

export const sectionCopy = {
  services: {
    eyebrow: "What I do",
    title: "What I build",
    description:
      "Backend systems that put LLMs into real finance and data workflows, with validation, reconciliation and safe rollouts around every model call.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've worked",
    description: "The roles I've held, the client systems I built in them, and the stack behind each.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    description:
      "Four systems in detail: what was breaking, what I built to fix it, and what changed once it shipped.",
  },
  work: {
    eyebrow: "Selected work",
    title: "Recent projects",
    description: "A freelance product built end to end, two client systems at StechAI, and a personal ML project.",
  },
  process: {
    eyebrow: "How I work",
    title: "From document to decision",
    description:
      "The same five steps sit behind every AI workflow I build, so a model's mistake is caught long before anyone acts on it.",
  },
  skills: {
    eyebrow: "Skills",
    title: "Tools I work with",
    description:
      "From LLM extraction and finance workflows to the integrations, infrastructure and tests that keep them running in production.",
  },
} satisfies Record<string, SectionCopy>;
