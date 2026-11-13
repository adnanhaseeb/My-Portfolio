"use client";

import { Download, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/content/site";
import { useActivePath } from "@/hooks/useActivePath";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const isActive = useActivePath();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="rounded-full md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs gap-0 border-border" aria-describedby={undefined}>
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2.5 pr-8 text-base font-semibold">
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-brand font-heading text-xs font-semibold text-white dark:[--brand-blue:#2563eb] dark:[--brand-violet:#7c3aed]"
            >
              {site.initials}
            </span>
            <span className="truncate">{site.name}</span>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Primary" className="px-3 py-4">
          <ul className="flex flex-col gap-1">
            {site.nav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                      active ? "bg-surface text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {active ? <span aria-hidden className="size-1.5 rounded-full bg-gradient-brand" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SheetFooter className="flex-row items-center gap-2 border-t border-border px-5 py-4">
          <ThemeToggle />
          <Button asChild size="lg" className="h-9 flex-1 rounded-full px-4">
            <a href={site.cvPath} download>
              <Download aria-hidden />
              {site.cvLabel}
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
