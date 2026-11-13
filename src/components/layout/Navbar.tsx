"use client";

import { Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { useActivePath } from "@/hooks/useActivePath";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrolled(10);
  const isActive = useActivePath();
  const reduceMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 rounded-full border pr-2 pl-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out sm:pl-3",
          scrolled
            ? "border-border bg-background/80 shadow-[0_8px_30px_-12px_rgb(15_15_30/0.18)] backdrop-blur-md dark:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)]"
            : "border-transparent bg-transparent shadow-none",
        )}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pr-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-brand font-heading text-sm font-semibold tracking-tight text-white shadow-sm dark:[--brand-blue:#2563eb] dark:[--brand-violet:#7c3aed]"
          >
            {site.initials}
          </span>
          <span className="truncate font-heading md:max-lg:sr-only text-[0.95rem] font-semibold tracking-tight text-foreground">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5 rounded-full border border-border bg-surface/70 p-1">
            {site.nav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  {active ? (
                    <motion.span
                      layoutId="navbar-active-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-border bg-background shadow-sm"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }
                      }
                    />
                  ) : null}
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 lg:px-4",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button asChild size="lg" className="hidden h-9 rounded-full px-4 md:inline-flex">
            <a href={site.cvPath} download>
              <Download aria-hidden />
              {site.cvLabel}
            </a>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
