import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "traffiqco",
    featured: true,
    title: "Traffiqco",
    context: "Freelance client project · AI traffic management planning · New Zealand",
    problem:
      "Every job on a New Zealand road needs a Temporary Traffic Management Plan. Planners research the site, draw diagrams with correctly spaced cones, tapers and signs, and write risk registers by hand, and small spacing mistakes are expensive to find late.",
    built: [
      "A six-step Next.js app that takes a planner from a work area drawn on an aerial map to a print-ready PDF plan.",
      "A LangGraph agent pipeline with Qdrant retrieval over the NZGTTM and CoPTTM standards that picks a treatment for each stage from measured road geometry.",
      "A deterministic diagram engine that sizes tapers, spaces cones and places signs to cited rules, plus a layout editor where planners drag devices and redraw.",
    ],
    outcome:
      "A complete site-to-submission workflow in one app, with every cone, taper and lane-width decision traceable to a standard, backed by about 2,600 backend and frontend tests.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "LangGraph", "Qdrant", "OpenAI", "Shapely", "OSMnx", "Leaflet", "Konva"],
    visual: {
      kind: "gallery",
      slides: [
        {
          src: "/images/projects/traffiqco/01-diagram-editor.webp",
          thumb: "/images/projects/traffiqco/thumbs/01-diagram-editor.webp",
          alt: "Layout editor showing an AI-drawn lane shift diagram with cones, tapers and signs on aerial imagery",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/traffiqco/02-site-and-work.webp",
          thumb: "/images/projects/traffiqco/thumbs/02-site-and-work.webp",
          alt: "Step 1, site and work: the work area drawn on an aerial map with project details",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/traffiqco/03-stages.webp",
          thumb: "/images/projects/traffiqco/thumbs/03-stages.webp",
          alt: "Step 2, stages: a timeline splitting the works into two stages with dates and hours",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/traffiqco/04-diagram-stage-2.webp",
          thumb: "/images/projects/traffiqco/thumbs/04-diagram-stage-2.webp",
          alt: "Layout editor showing the stage 2 partial road closure diagram on aerial imagery",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/traffiqco/05-stage-briefings.webp",
          thumb: "/images/projects/traffiqco/thumbs/05-stage-briefings.webp",
          alt: "Step 4, stage briefings: who is affected and the top risks for each stage",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/traffiqco/06-plan-review.webp",
          thumb: "/images/projects/traffiqco/thumbs/06-plan-review.webp",
          alt: "Step 5, plan review: section-by-section review with a blocking issue surfaced before approval",
          width: 1600,
          height: 1000,
        },
        {
          src: "/images/projects/traffiqco/07-download.webp",
          thumb: "/images/projects/traffiqco/thumbs/07-download.webp",
          alt: "Step 6, download: the generated plan document and the sheets included in the PDF pack",
          width: 1600,
          height: 1000,
        },
      ],
    },
  },
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
      width: 1600,
      height: 770,
    },
  },
];
