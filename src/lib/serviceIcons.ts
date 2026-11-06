import { Cloud, FileScan, GitCompareArrows, Plug, Server, ShieldCheck, type LucideIcon } from "lucide-react";

import type { ServiceIcon } from "@/types/content";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  "file-scan": FileScan,
  "git-compare": GitCompareArrows,
  plug: Plug,
  server: Server,
  cloud: Cloud,
  "shield-check": ShieldCheck,
};
