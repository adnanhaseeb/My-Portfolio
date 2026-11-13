import type { Metadata } from "next";

import { Skills } from "@/components/sections/Skills";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/skills");

export default function SkillsPage() {
  return <Skills />;
}
