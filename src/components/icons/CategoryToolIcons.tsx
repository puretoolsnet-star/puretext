import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

const STROKE = 1.75;

export function CategoryIconTile({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-teal-500/15 ring-1 ring-teal-400/30",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        className,
      )}
      aria-hidden
    >
      <Icon
        className={cn("text-teal-300", size === "sm" ? "h-4 w-4" : "h-5 w-5")}
        strokeWidth={STROKE}
      />
    </span>
  );
}

export function ToolIconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/12 ring-1 ring-teal-400/25",
        className,
      )}
      aria-hidden
    >
      <Icon className="h-4 w-4 text-teal-300" strokeWidth={STROKE} />
    </span>
  );
}

export function ToolIconInline({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Icon
      className={cn("h-3.5 w-3.5 shrink-0 text-teal-400/90", className)}
      strokeWidth={STROKE}
      aria-hidden
    />
  );
}