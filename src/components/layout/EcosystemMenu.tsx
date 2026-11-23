"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { EcosystemDialog } from "@/components/layout/EcosystemDialog";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

export function EcosystemMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden shrink-0 md:block">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.ecosystem.menuAria}
        onClick={() => setOpen((value) => !value)}
        className="glass-card inline-flex max-w-[14rem] items-center gap-1.5 rounded-xl border-slate-800 px-3 py-2 text-sm font-medium text-slate-200 hover:border-teal-500/40"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />
        <span className="min-w-0 truncate">{t.ecosystem.menuLabel}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-slate-400 transition", open && "rotate-180")}
        />
      </button>
      {open ? <EcosystemDialog open={open} onClose={() => setOpen(false)} layout="dropdown" /> : null}
    </div>
  );
}