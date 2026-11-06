import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function GradientText({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("text-gradient", className)} {...props} />;
}
