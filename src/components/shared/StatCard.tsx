import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col-reverse justify-end gap-1.5 rounded-2xl border bg-card/70 p-4 text-left sm:p-5",
        className,
      )}
    >
      <dt className="text-xs leading-snug text-pretty text-muted-foreground sm:text-sm">{label}</dt>
      <dd className="font-heading text-xl font-semibold tracking-tight text-balance tabular-nums text-foreground sm:text-2xl lg:text-3xl">
        {value}
      </dd>
    </div>
  );
}
