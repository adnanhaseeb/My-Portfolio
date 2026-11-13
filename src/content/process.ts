import type { ProcessStep } from "@/types/content";

export const processSteps: ProcessStep[] = [
  {
    title: "Extract",
    description: "An LLM reads the document into structured output with a fixed schema, never free text.",
  },
  {
    title: "Validate",
    description: "Deterministic checks catch what the model got wrong, like an e-invoice ID read as the invoice number.",
  },
  {
    title: "Reconcile",
    description: "Every row is matched against a source of truth: the ledger, the purchase order or the expected schema.",
  },
  {
    title: "Review",
    description: "Anything uncertain becomes a tracked finding that a person approves before it moves on.",
  },
  {
    title: "Ship safely",
    description: "Feature flags, kill switches, idempotent processing and tests on every change.",
  },
];
