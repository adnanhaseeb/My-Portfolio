import type { Metadata } from "next";

import { CallToAction } from "@/components/sections/CallToAction";
import { Experience } from "@/components/sections/Experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/experience");

export default function ExperiencePage() {
  return (
    <>
      <Experience />
      <CallToAction />
    </>
  );
}
