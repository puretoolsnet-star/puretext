"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { EcosystemProjectList } from "@/components/layout/EcosystemProjectList";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";

export function EcosystemDialog({
  open,
  onClose,
  layout,
}: {
  open: boolean;
  onClose: () => void;
  layout: "dropdown" | "centered";
}) {
  const { t } = useI18n();
  const isCentered = layout === "centered";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const panel = (
    <div
      role="dialog"
      aria-modal={isCentered}
      aria-label={t.ecosystem.menuAria}
      className={cn(
        "glass-card pointer-events-auto flex max-h-[min(85dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] w-full min-w-0 flex-col overflow-hidden border border-slate-800 shadow-2xl shadow-black/50",
        isCentered &&
          "fixed left-1/2 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl sm:top-1/2 sm:max-h-[min(calc(100dvh-2rem),40rem)] sm:-translate-y-1/2",
        layout === "dropdown" &&
          "absolute right-0 top-full z-40 mt-2 w-[min(44rem,calc(100vw-2rem))] rounded-xl",
      )}
      style={isCentered ? { zIndex: Z.modalPanel } : { zIndex: Z.dropdown }}
    >
      <div className="shrink-0 border-b border-slate-800 bg-slate-900/40 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-teal-400/90">
              {t.ecosystem.menuLabel}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{t.ecosystem.menuHint}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.ecosystem.close}
            className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
      <EcosystemProjectList onNavigate={onClose} className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4" />
    </div>
  );

  if (isCentered) {
    return (
      <BodyPortal open>
        <button
          type="button"
          className="fixed inset-0 bg-black/60"
          style={{ zIndex: Z.modalPanel - 1 }}
          aria-label={t.ecosystem.close}
          onClick={onClose}
        />
        {panel}
      </BodyPortal>
    );
  }

  return panel;
}