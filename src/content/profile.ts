import type { HeroContent, ValidationTrace } from "@/types/content";

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

export const validationTrace: ValidationTrace = {
  documentLabel: "supplier_invoice.pdf",
  supplier: "Supplier invoice · BRKZ",
  extractedFields: [
    { key: "invoice_number", value: "INV-2025-0418" },
    { key: "po_number", value: "PO-77310" },
    { key: "total_amount", value: "SAR 18,450.00" },
    { key: "issue_date", value: "2025-09-14" },
  ],
  checks: [
    { label: "Schema", detail: "All required fields present and typed", status: "pass" },
    { label: "Invoice number", detail: "Matches e-invoice ID pattern, not an invoice number", status: "flag" },
    { label: "PO match", detail: "PO-77310 found, amount within tolerance", status: "pass" },
  ],
  outcome: "Routed to review before reaching the ERP",
};
