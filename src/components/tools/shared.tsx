"use client";

import type { ReactNode } from "react";

import { useTextSession } from "@/context/TextSessionContext";
import { TextEditor } from "@/components/workspace/TextEditor";

/** Mobile: editor → [quickBar] → result → controls. Desktop: left column stack, sticky result right. */
export function ToolWorksplitLayout({
  editor,
  quickBar,
  result,
  controls,
}: {
  editor: ReactNode;
  /** e.g. preset chips — shown under the editor before the result on narrow screens */
  quickBar?: ReactNode;
  result: ReactNode;
  controls: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start">
      <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">{editor}</div>
      {quickBar ? <div className="order-2 min-w-0 lg:col-start-1 lg:row-start-2">{quickBar}</div> : null}
      <aside
        className={
          quickBar
            ? "order-3 min-w-0 lg:sticky lg:top-20 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-h-[min(70dvh,36rem)] lg:self-start lg:overflow-y-auto"
            : "order-2 min-w-0 lg:sticky lg:top-20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-h-[min(70dvh,36rem)] lg:self-start lg:overflow-y-auto"
        }
      >
        {result}
      </aside>
      <div
        className={
          quickBar
            ? "order-4 min-w-0 space-y-6 lg:col-start-1 lg:row-start-3"
            : "order-3 min-w-0 space-y-6 lg:col-start-1 lg:row-start-2"
        }
      >
        {controls}
      </div>
    </div>
  );
}

export function MainTextEditor({ minRows = 12 }: { minRows?: number }) {
  const { text, setText } = useTextSession();
  return <TextEditor value={text} onChange={setText} minRows={minRows} />;
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{children}</dl>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-teal-300/80">{label}</dt>
      <dd className="mt-0.5 text-lg font-semibold tabular-nums text-teal-100">{value}</dd>
    </div>
  );
}

export function OptionRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200">
      <span>{label}</span>
      {children}
    </label>
  );
}