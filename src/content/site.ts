import type { SiteConfig } from "@/types/content";

export const site: SiteConfig = {
  name: "Adnan Haseeb",
  shortName: "Adnan",
  initials: "AH",
  title: "Software Engineer · Python Backend · AI & LLMs",
  location: "Lahore, Pakistan",
  email: "adnann.haseeb@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/adnan-h-a1a4bb22a",
  githubUrl: null,
  cvPath: "/cv/Adnan_Haseeb_CV.pdf",
  cvLabel: "Download CV",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Adnan Haseeb is a software engineer building Python backends, LLM document workflows and integrations, with deterministic validation around every AI output.",
  availability: "Open to AI & backend roles",
  nav: [
    {
      label: "Home",
      href: "/",
      title: "Home",
      description:
        "Adnan Haseeb is a software engineer building Python backends, LLM document workflows and integrations, with deterministic validation around every AI output.",
    },
    {
      label: "Experience",
      href: "/experience",
      title: "Experience",
      description: "Roles Adnan Haseeb has held, the client systems built in them, and the stack behind each.",
    },
    {
      label: "Projects",
      href: "/projects",
      title: "Projects",
      description: "Traffiqco, BRKZ, ClinFocus and SuperCrypt: what was breaking, what was built, and what changed once it shipped.",
    },
    {
      label: "Skills",
      href: "/skills",
      title: "Skills",
      description: "LLM extraction, Python backends, integrations, infrastructure and testing tools Adnan Haseeb works with.",
    },
    {
      label: "Contact",
      href: "/contact",
      title: "Contact",
      description: "Get in touch with Adnan Haseeb about AI and backend roles or integration work.",
    },
  ],
};
