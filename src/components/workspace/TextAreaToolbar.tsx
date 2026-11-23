"use client";

import { Check, Copy, Eraser, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

import { useI18n } from "@/i18n/context";
import { useTextSession } from "@/context/TextSessionContext";
import { cn } from "@/lib/cn";

export function TextAreaToolbar({ onClear }: { onClear?: () => void }) {
  const { t, lang } = useI18n();
  const { loadDemo, clear, text } = useTextSession();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard denied */
    }
  }, [text]);

  return (
    <div className="flex flex-wrap gap-2">
      <ToolbarButton onClick={() => loadDemo(lang)} icon={Sparkles} label={t.workspace.demo} />
      <ToolbarButton
        onClick={() => {
          clear();
          onClear?.();
        }}
        icon={Eraser}
        label={t.workspace.clear}
      />
      <ToolbarButton
        onClick={() => void handleCopy()}
        icon={copied ? Check : Copy}
        label={copied ? t.workspace.copied : t.workspace.copy}
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  icon: Icon,
  label,
  className,
}: {
  onClick: () => void;
  icon: typeof Copy;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 shadow-sm transition hover:border-teal-500/50 hover:bg-slate-800 hover:text-teal-200 sm:py-1.5",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 text-teal-400" aria-hidden />
      {label}
    </button>
  );
}