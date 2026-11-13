import type { ContactContent } from "@/types/content";

export const contact: ContactContent = {
  heading: "Let's build something reliable",
  subtext:
    "Hiring for an AI or backend role, or need an integration that holds up in production? Send a message and I'll reply within two working days.",
  successMessage: "Message sent. I'll reply within two working days.",
  errorMessage: "Message not sent. Check your connection and try again, or email me directly.",
  missingConfigMessage: "The contact form isn't connected yet. Email me directly instead.",
  nextStepsTitle: "What happens next",
  nextSteps: [
    {
      title: "You send a message",
      description: "A role, a project or a workflow that keeps breaking. A few lines of context is enough.",
    },
    {
      title: "I reply within two working days",
      description: "With questions, a first take on the approach, or my CV and availability for a role.",
    },
    {
      title: "We talk it through",
      description: "A short call to agree on scope, timeline and how we'll know it's working.",
    },
  ],
};
