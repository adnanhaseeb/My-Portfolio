import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    icon: "file-scan",
    title: "AI document extraction",
    description:
      "LLM extraction with structured output, schema validation and deterministic checks on what the model returns.",
  },
  {
    icon: "git-compare",
    title: "Reconciliation pipelines",
    description:
      "Matching statements, invoices and datasets against a source of truth, row by row, with clear reports of what's missing.",
  },
  {
    icon: "plug",
    title: "Integrations",
    description:
      "Microsoft 365 Graph API and Entra ID, Zoho Books, Meta WhatsApp Cloud API, REST APIs and webhooks.",
  },
  {
    icon: "server",
    title: "Backend APIs",
    description:
      "Services and REST APIs in FastAPI, Django, Spring Boot and Node.js, backed by MongoDB and PostgreSQL.",
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    description:
      "GCP (GKE, Pub/Sub, Secret Manager), AWS EC2, Docker, nginx, systemd and GitHub Actions CI/CD.",
  },
  {
    icon: "shield-check",
    title: "Reliability",
    description:
      "Feature flags, kill switches, idempotent processing, safe rollouts and tests on every change.",
  },
];
