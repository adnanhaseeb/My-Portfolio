import type { EducationItem, ExperienceItem } from "@/types/content";

export const experience: ExperienceItem[] = [
  {
    company: "StechAI",
    role: "Associate Software Engineer",
    period: "Jan 2026 - Present",
    location: "Lahore, Pakistan",
    summary:
      "Backend systems, REST APIs, integrations, AI workflows and deployments for client products, from build and testing through production support.",
    projects: [
      {
        name: "BRKZ",
        context: "Saudi B2B marketplace · supplier finance automation",
        stack: ["Python", "Kotlin", "FastAPI", "Spring Boot", "MongoDB", "LLMs", "GCP", "Zoho Books API", "WhatsApp Cloud API"],
        highlights: [
          "Made LLM-based invoice extraction and purchase-order matching more reliable by adding deterministic validation around model output, catching e-invoice identifiers misread as invoice numbers on about 12% of one major supplier's invoices before they reached the ERP.",
          "Developed statement-of-account reconciliation: supplier statements are read with LLMs, every row is matched against the ledger by invoice number, then by amount and date, and suppliers receive a generated PDF of the exact invoices missing.",
          "Built an AI agent that automates supplier document collection for VAT reporting: scheduled WhatsApp reminders with quick-reply buttons that pause the chase, working-day-aware scheduling, and escalation to a voice agent with full conversation context.",
          "Delivered production integrations across Python and Kotlin microservices (GCP Pub/Sub, Zoho Books API with webhooks, WhatsApp Cloud API) with feature flags, kill switches, idempotent messaging and tests on every change.",
        ],
      },
      {
        name: "ClinFocus",
        context: "Clinical data reconciliation",
        stack: ["Python", "TypeScript", "FastAPI", "MongoDB", "LLMs", "AWS EC2", "nginx", "systemd", "GitHub Actions", "Microsoft Graph API"],
        highlights: [
          "Deployed and maintained the platform on AWS EC2 with systemd, nginx and GitHub Actions CI/CD, and cut a single rule run from 4.1 minutes to under a minute by caching extraction on content rather than on generated file bytes.",
          "Integrated Microsoft 365 through the Graph API: Entra ID app registration and the OAuth2 client-credentials flow to send transactional mail from a designated mailbox, with SMTP and log transports chosen by configuration and a clear error when SMTP AUTH is disabled on the tenant.",
          "Built a five-stage data reconciliation pipeline that matches 276 collected fields to their expected schema, extracts 14 normalised datasets from 69 source forms, reconciles the values, and works out which of 86 validation rules a study has the columns to run before any execute.",
          "Delivered the review workspace where every flagged record becomes a tracked finding with status, approval, site response and history, plus bulk actions, per-rule filters, CSV export and a model log that separates rules that ran clean from rules that never read the column they needed.",
        ],
      },
    ],
    highlights: [],
  },
  {
    company: "Fiverr",
    role: "Freelance Software Developer",
    period: "Mar 2023 - Present",
    location: "Remote",
    summary:
      "Web applications, backend services and REST APIs built to client requirements.",
    projects: [],
    highlights: [
      "Build web applications, backend services and REST APIs, integrating databases and third-party APIs.",
      "Maintain, debug and improve existing client applications, and work directly with clients on requirements.",
    ],
  },
];

export const education: EducationItem = {
  degree: "Bachelor of Computer Science",
  institution: "Arid Agriculture University Rawalpindi (Burewala Campus)",
  period: "2021 - 2025",
  detail: "CGPA 3.46 / 4.0",
};
