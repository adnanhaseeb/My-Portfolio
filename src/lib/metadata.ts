import type { Metadata } from "next";

import { site } from "@/content/site";

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.name} | ${site.title}`,
  description: site.description,
};
