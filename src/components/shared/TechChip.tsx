import { cn } from "@/lib/utils";

type TechChipProps = {
  label: string;
  className?: string;
};

export function TechChip({ label, className }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-surface px-2.5 py-0.5 text-xs font-medium text-foreground/80",
        className,
      )}
    >
      {label}
    </span>
  );
}
