import type { Metadata } from "next";

import { Contact } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/contact");

export default function ContactPage() {
  return <Contact />;
}
