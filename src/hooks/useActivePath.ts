"use client";

import { usePathname } from "next/navigation";

/**
 * Returns a matcher that reports whether a navigation href is the page currently being viewed.
 */
export function useActivePath() {
  const pathname = usePathname();
  const current = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  return (href: string) => current === href;
}
