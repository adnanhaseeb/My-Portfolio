import type { Metadata } from "next";

import { CallToAction } from "@/components/sections/CallToAction";
import { Projects } from "@/components/sections/Projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/projects");

export default function ProjectsPage() {
  return (
    <>
      <Projects />
      <CallToAction />
    </>
  );
}
