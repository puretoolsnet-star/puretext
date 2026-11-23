"use client";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

type FormattedTextPreviewProps = {
  value: string;
  minRows?: number;
  formatKey: string;
  className?: string;
};

/** Read-only preview that reliably reflects derived text (avoids sticky readOnly textareas). */
export function FormattedTextPreview({ value, minRows = 10, formatKey, className }: FormattedTextPreviewProps) {
  const { t } = useI18n();
  const minHeight = `${Math.max(6, minRows) * 1.625}rem`;

  return (
    <div
      key={formatKey}
      role="textbox"
      aria-readonly
      aria-live="polite"
      style={{ minHeight }}
      className={cn(
        "studio-input w-full min-w-0 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/90 px-3 py-3 text-sm leading-relaxed text-slate-100 shadow-inner",
        !value && "text-slate-500",
        className,
      )}
    >
      {value ? <span className="whitespace-pre-wrap break-words">{value}</span> : t.workspace.noData}
    </div>
  );
}