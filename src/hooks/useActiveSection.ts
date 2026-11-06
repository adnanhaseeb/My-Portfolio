"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the upper middle of the viewport,
 * or null before any observed section has been reached.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join("|");

  useEffect(() => {
    const sectionIds = idsKey.split("|").filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const pickActive = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }
      const first = sectionIds.find((id) => visible.has(id));
      if (first) setActiveId(first);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        pickActive();
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", pickActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, [idsKey]);

  return activeId;
}
