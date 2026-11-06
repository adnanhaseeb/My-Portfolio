"use client";

import { Download, Menu } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  activeId: string | null;
};

export function MobileMenu({ activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pendingHref = useRef<string | null>(null);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    pendingHref.current = href;
    setOpen(false);
  };

  const handleCloseAutoFocus = (event: Event) => {
    const href = pendingHref.current;
    if (!href) return;
    event.preventDefault();
    pendingHref.current = null;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    window.history.pushState(null, "", href);
    target.scrollIntoView();
  };

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
      <SheetContent
        side="right"
        className="w-full max-w-xs gap-0 border-border"
        aria-describedby={undefined}
        onCloseAutoFocus={handleCloseAutoFocus}
      >
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
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                      isActive
                        ? "bg-surface text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive ? <span aria-hidden className="size-1.5 rounded-full bg-gradient-brand" /> : null}
                  </a>
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
