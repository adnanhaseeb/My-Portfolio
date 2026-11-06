import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-glow pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-6 py-32 text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-medium text-muted-foreground shadow-xs">
          404
        </span>
        <h1 className="font-heading text-4xl font-semibold text-balance sm:text-5xl">Page not found</h1>
        <p className="max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
          The link may be outdated or mistyped. Head back to the home page to find what you need.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-2 h-11 rounded-full px-5 text-sm focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <ArrowLeft aria-hidden="true" />
          Back to home
        </Link>
      </Container>
    </section>
  );
}
