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
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Adnan Haseeb is a software engineer building Python backends, LLM document workflows and integrations, with deterministic validation around every AI output.",
  availability: "Open to AI & backend roles",
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};
