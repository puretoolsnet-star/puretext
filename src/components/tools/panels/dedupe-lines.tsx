"use client";

import { Check, Copy, Download } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FormattedTextPreview } from "@/components/tools/FormattedTextPreview";
import { MainTextEditor, StatCard, StatGrid, ToolWorksplitLayout } from "@/components/tools/shared";
import { useTextSession } from "@/context/TextSessionContext";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import {
  dedupeText,
  DEFAULT_DEDUPE_OPTIONS,
  type DedupeOptions,
  type DedupeViewMode,
} from "@/lib/text/dedupe";
import { downloadTextFile } from "@/lib/text/stats-report";

function optsKey(opts: DedupeOptions): string {
  return `${opts.ignoreCase}|${opts.trimLines}|${opts.collapseSpaces}|${opts.removeEmpty}`;
}

export function DedupePanel() {
  const { t } = useI18n();
  const { text, setText, setDemoSource } = useTextSession();
  const [opts, setOpts] = useState<DedupeOptions>({ ...DEFAULT_DEDUPE_OPTIONS });
  const [viewMode, setViewMode] = useState<DedupeViewMode>("unique");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDemoSource("dedupe");
    return () => setDemoSource("default");
  }, [setDemoSource]);

  const { text: result, stats, duplicates } = useMemo(
    () => dedupeText(text, opts, viewMode),
    [text, opts, viewMode],
  );

  const uniqueText = useMemo(() => dedupeText(text, opts, "unique").text, [text, opts]);
  const previewKey = `${text.length}|${viewMode}|${optsKey(opts)}|${result.length}`;

  const copyResult = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* denied */
    }
  }, [result]);

  const stamp = () => new Date().toISOString().slice(0, 10);

  const quickBar = (
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-200">{t.dedupeTool.optionsHeading}</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <OptionToggle
          label={t.dedupeTool.options.ignoreCase}
          checked={opts.ignoreCase}
          onChange={(v) => setOpts((o) => ({ ...o, ignoreCase: v }))}
        />
        <OptionToggle
          label={t.dedupeTool.options.trimLines}
          checked={opts.trimLines}
          onChange={(v) => setOpts((o) => ({ ...o, trimLines: v }))}
        />
        <OptionToggle
          label={t.dedupeTool.options.collapseSpaces}
          checked={opts.collapseSpaces}
          onChange={(v) => setOpts((o) => ({ ...o, collapseSpaces: v }))}
        />
        <OptionToggle
          label={t.dedupeTool.options.removeEmpty}
          checked={opts.removeEmpty}
          onChange={(v) => setOpts((o) => ({ ...o, removeEmpty: v }))}
        />
      </div>
    </section>
  );

  return (
    <ToolWorksplitLayout
      editor={<MainTextEditor minRows={6} />}
      quickBar={quickBar}
      result={
        <DedupeResultPanel
          t={t}
          result={result}
          previewKey={previewKey}
          stats={stats}
          copied={copied}
          onCopy={() => void copyResult()}
          onDownload={() => downloadTextFile(result, `puretext-dedupe-${stamp()}.txt`)}
          onApply={() => setText(uniqueText)}
          applyDisabled={!uniqueText}
        />
      }
      controls={
        <>
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.dedupeTool.viewHeading}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <ViewChip
                active={viewMode === "unique"}
                label={t.dedupeTool.view.unique}
                onClick={() => setViewMode("unique")}
              />
              <ViewChip
                active={viewMode === "duplicates"}
                label={t.dedupeTool.view.duplicates}
                onClick={() => setViewMode("duplicates")}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.dedupeTool.duplicatesHeading}</h2>
            <p className="mt-1 text-xs text-slate-500">{t.dedupeTool.duplicatesHint}</p>
            {duplicates.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">{t.dedupeTool.noDuplicates}</p>
            ) : (
              <ul className="mt-3 max-h-56 space-y-2 overflow-y-auto">
                {duplicates.map((row) => (
                  <li
                    key={`${row.firstLineNumber}-${row.line}`}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="min-w-0 break-words font-medium text-slate-100">{row.line || "—"}</span>
                      <span className="shrink-0 text-xs tabular-nums text-teal-300">
                        {t.dedupeTool.countLabel}: ×{row.count}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {t.dedupeTool.firstAtLine} {row.firstLineNumber}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      }
    />
  );
}

function DedupeResultPanel({
  t,
  result,
  previewKey,
  stats,
  copied,
  onCopy,
  onDownload,
  onApply,
  applyDisabled,
}: {
  t: ReturnType<typeof useI18n>["t"];
  result: string;
  previewKey: string;
  stats: ReturnType<typeof dedupeText>["stats"];
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onApply: () => void;
  applyDisabled: boolean;
}) {
  return (
    <section className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 shadow-sm shadow-teal-950/30 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-100">{t.dedupeTool.previewHeading}</h2>
      <p className="mt-1 text-xs text-slate-500">{t.dedupeTool.previewHint}</p>

      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{t.dedupeTool.statsHeading}</h3>

      <div className="mt-2 space-y-1 rounded-lg border border-slate-800 bg-slate-950/50 p-3 sm:hidden">
        <p className="text-sm text-slate-200">
          {t.dedupeTool.stats.linesBefore}:{" "}
          <span className="font-medium tabular-nums text-teal-200">{stats.linesBefore}</span>
        </p>
        <p className="text-sm text-slate-200">
          {t.dedupeTool.stats.linesAfter}:{" "}
          <span className="font-medium tabular-nums text-teal-200">{stats.linesAfter}</span>
        </p>
        <p className="text-xs text-teal-300/90">
          −{stats.duplicatesRemoved} {t.dedupeTool.stats.duplicatesRemoved.toLowerCase()}
          {stats.emptyRemoved > 0 ? ` · −${stats.emptyRemoved} ${t.dedupeTool.stats.emptyRemoved.toLowerCase()}` : ""}
        </p>
      </div>

      <div className="mt-2 hidden sm:block">
        <StatGrid>
          <StatCard label={t.dedupeTool.stats.linesBefore} value={stats.linesBefore} />
          <StatCard label={t.dedupeTool.stats.linesAfter} value={stats.linesAfter} />
          <StatCard label={t.dedupeTool.stats.duplicatesRemoved} value={stats.duplicatesRemoved} />
          <StatCard label={t.dedupeTool.stats.emptyRemoved} value={stats.emptyRemoved} />
        </StatGrid>
      </div>

      <div className="mt-3 min-w-0">
        <FormattedTextPreview value={result} minRows={7} formatKey={previewKey} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          onClick={onCopy}
          icon={copied ? Check : Copy}
          label={copied ? t.dedupeTool.copiedResult : t.dedupeTool.copyResult}
          disabled={!result}
        />
        <ActionButton onClick={onDownload} icon={Download} label={t.dedupeTool.downloadResult} disabled={!result} />
        <ActionButton onClick={onApply} icon={Check} label={t.dedupeTool.applyResult} disabled={applyDisabled} primary />
      </div>
    </section>
  );
}

function OptionToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex min-h-11 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm",
        checked ? "border-teal-500/40 bg-teal-500/10 text-teal-100" : "border-slate-700 bg-slate-900 text-slate-400",
      )}
    >
      <span className="min-w-0 break-words">{label}</span>
      <span
        className={cn(
          "h-5 w-9 shrink-0 rounded-full border transition",
          checked ? "border-teal-400 bg-teal-500/40" : "border-slate-600 bg-slate-800",
        )}
        aria-hidden
      />
    </button>
  );
}

function ViewChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm",
        active ? "border-teal-400/50 bg-teal-500/15 text-teal-100" : "border-slate-700 bg-slate-900 text-slate-300",
      )}
    >
      {label}
    </button>
  );
}

function ActionButton({
  onClick,
  icon: Icon,
  label,
  disabled,
  primary,
}: {
  onClick: () => void;
  icon: typeof Copy;
  label: string;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium sm:flex-none sm:text-sm",
        "disabled:pointer-events-none disabled:opacity-40",
        primary
          ? "border-teal-500/50 bg-teal-600 text-white hover:bg-teal-500"
          : "border-slate-700 bg-slate-900 text-slate-200 hover:border-teal-500/50",
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />
      <span className="truncate">{label}</span>
    </button>
  );
}