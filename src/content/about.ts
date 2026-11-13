import type { AboutContent } from "@/types/content";

export const about: AboutContent = {
  eyebrow: "About",
  title: "I make AI output safe to act on",
  paragraphs: [
    "I'm Adnan, a software engineer based in Lahore. At StechAI I build backend systems for client products: LLM document extraction, reconciliation pipelines, and integrations with Zoho Books, Microsoft 365 and WhatsApp.",
    "Since 2023 I've also built web apps and APIs for freelance clients, most recently Traffiqco, an AI planning tool for temporary traffic management in New Zealand.",
    "The idea behind all of it: a model's answer is a draft. The system around it decides what is safe to ship, and what a person should look at first.",
  ],
  facts: [
    { icon: "map-pin", label: "Based in", value: "Lahore, Pakistan" },
    { icon: "briefcase", label: "Currently", value: "Associate Software Engineer at StechAI" },
    { icon: "laptop", label: "Freelance", value: "Web apps and APIs since 2023" },
    { icon: "graduation-cap", label: "Education", value: "BS Computer Science, 2025" },
  ],
  stack: ["Python", "FastAPI", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "LangGraph", "Docker", "GCP", "AWS"],
};
