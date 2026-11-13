import type { Metadata } from "next";

import { site } from "@/content/site";
import type { NavLink } from "@/types/content";

const keywords = [
  site.name,
  "Software Engineer",
  "Python Backend Engineer",
  "Backend Developer",
  "AI Engineer",
  "LLM Engineer",
  "LLM document extraction",
  "Structured output",
  "Deterministic validation",
  "FastAPI",
  "Django",
  "Python",
  "REST APIs",
  "Data reconciliation",
  "Finance automation",
  "Microsoft Graph API",
  "Zoho Books integration",
  "WhatsApp Cloud API",
  "Google Cloud",
  "Docker",
  "Freelance developer",
  site.location,
];

/**
 * Builds the title, description and canonical URL for one of the routed pages in the site navigation.
 */
export function pageMetadata(href: NavLink["href"]): Metadata {
  const page = site.nav.find((link) => link.href === href);
  if (!page) throw new Error(`No navigation entry for ${href}`);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: { url: page.href, title: `${page.title} | ${site.name}`, description: page.description },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords,
  authors: [{ name: site.name, url: site.linkedinUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};
