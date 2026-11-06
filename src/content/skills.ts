import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / LLM",
    skills: ["LLM document extraction", "Structured output", "Schema validation", "AI agents", "Prompt engineering", "OpenAI SDK", "Pydantic", "LangGraph"],
  },
  {
    title: "Backend & frontend",
    skills: ["Python", "FastAPI", "Django", "Kotlin", "Spring Boot", "Node.js", "Express", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Integrations",
    skills: ["Microsoft Graph API", "Entra ID", "OAuth2", "Zoho Books API", "WhatsApp Cloud API", "REST APIs", "Webhooks"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["GCP (GKE, Pub/Sub, Cloud Storage, Secret Manager)", "AWS EC2", "Docker", "nginx", "systemd", "GitHub Actions", "Datadog"],
  },
  {
    title: "Data & ML",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Pandas", "PyTorch", "scikit-learn"],
  },
  {
    title: "Finance & data workflows",
    skills: ["Invoice extraction", "Invoice-to-PO matching", "Statement reconciliation", "VAT document tracking", "Review & approval queues", "CSV export"],
  },
  {
    title: "Reliability & testing",
    skills: ["pytest", "Feature flags", "Kill switches", "Idempotent processing", "Safe rollout"],
  },
];
