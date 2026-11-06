import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "brkz-supplier-finance",
    title: "Supplier finance automation",
    context: "BRKZ · Saudi B2B marketplace · at StechAI",
    problem:
      "Supplier invoices and statements were read by LLMs, but model output went straight towards the ERP, and one supplier's e-invoice IDs were regularly misread as invoice numbers.",
    built: [
      "Deterministic validation around LLM invoice extraction and purchase-order matching.",
      "Statement-of-account reconciliation that matches every row against the ledger and sends suppliers a PDF of the exact invoices missing.",
      "A WhatsApp agent that chases VAT documents on a working-day schedule and escalates to a voice agent with full context.",
    ],
    outcome:
      "Misread identifiers on about 12% of one major supplier's invoices are now caught before they reach the ERP.",
    stack: ["Python", "Kotlin", "FastAPI", "Spring Boot", "MongoDB", "GCP Pub/Sub", "Zoho Books API", "WhatsApp Cloud API"],
    visual: { kind: "illustration", id: "brkz-flow" },
  },
  {
    slug: "clinfocus-reconciliation",
    title: "Clinical data reconciliation",
    context: "ClinFocus · at StechAI",
    problem:
      "Clinical study data arrives across dozens of source forms, and reviewers need to know which validation rules can actually run before trusting the results.",
    built: [
      "A five-stage pipeline: schema matching, dataset extraction, reconciliation, rule eligibility and review.",
      "A review workspace where every flagged record becomes a tracked finding with status, approval and history.",
      "AWS EC2 deployment with systemd, nginx and GitHub Actions, plus Microsoft 365 mail through the Graph API.",
    ],
    outcome:
      "276 fields matched to schema, 14 datasets extracted from 69 forms, and a rule run cut from 4.1 minutes to under one.",
    stack: ["Python", "TypeScript", "FastAPI", "MongoDB", "LLMs", "AWS EC2", "GitHub Actions", "Microsoft Graph API"],
    visual: { kind: "illustration", id: "clinfocus-pipeline" },
  },
  {
    slug: "supercrypt",
    title: "SuperCrypt",
    context: "Personal project · crypto trading platform",
    problem:
      "Retail traders make decisions on crypto prices without a clear view of where the market might move next.",
    built: [
      "A Django web app with machine learning models that predict crypto prices.",
      "Dashboards that help users make more informed trading decisions.",
      "Docker-based deployment for repeatable, scalable environments.",
    ],
    outcome: "An end-to-end ML web app, from model training to a containerised deployment.",
    stack: ["Python", "Django", "scikit-learn", "Pandas", "Docker"],
    visual: {
      kind: "image",
      src: "/images/projects/supercrypt.webp",
      alt: "SuperCrypt landing page: Advanced AI trading solutions",
    },
  },
];
