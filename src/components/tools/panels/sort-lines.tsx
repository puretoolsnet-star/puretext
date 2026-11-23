"use client";

import { Check, Copy, Download } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FormattedTextPreview } from "@/components/tools/FormattedTextPreview";
import { MainTextEditor, StatCard, StatGrid, ToolWorksplitLayout } from "@/components/tools/shared";
import { useTextSession } from "@/context/TextSessionContext";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import {
  DEFAULT_SORT_OPTIONS,
  transformSortLines,
  type NumberFormat,
  type SortDirection,
  type SortLinesPipelineOptions,
} from "@/lib/text/sort-lines";
import { downloadTextFile } from "@/lib/text/stats-report";

const SORT_MODES: SortDirection[] = ["asc", "desc", "length-asc", "length-desc"];

function pipelineKey(opts: SortLinesPipelineOptions): string {
  return JSON.stringify(opts);
}

export function SortLinesPanel() {
  const { t, lang } = useI18n();
  const { text, setText, setDemoSource } = useTextSession();
  const [opts, setOpts] = useState<SortLinesPipelineOptions>({ ...DEFAULT_SORT_OPTIONS });
  const [copied, setCopied] = useState(false);

  const locale = lang === "uk" ? "uk" : lang;

  useEffect(() => {
    setDemoSource("sort-lines");
    return () => setDemoSource("default");
  }, [setDemoSource]);

  const { text: result, stats } = useMemo(() => transformSortLines(text, opts, locale), [text, opts, locale]);
  const previewKey = `${text.length}|${pipelineKey(opts)}|${result.length}`;

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

  const sortLabels: Record<SortDirection, string> = {
    asc: t.sortTool.sort.asc,
    desc: t.sortTool.sort.desc,
    "length-asc": t.sortTool.sort.lengthAsc,
    "length-desc": t.sortTool.sort.lengthDesc,
  };

  const quickBar = (
  <>
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-200">{t.sortTool.sortHeading}</h2>
      <p className="mt-1 text-xs text-slate-500">{t.sortTool.pipelineHint}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SORT_MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setOpts((o) => ({ ...o, sort: { ...o.sort, direction: mode } }))}
            className={cn(
              "min-h-11 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm",
              opts.sort.direction === mode
                ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                : "border-slate-700 bg-slate-900 text-slate-300",
            )}
          >
            {sortLabels[mode]}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <OptionToggle
          label={t.sortTool.sort.ignoreCase}
          checked={opts.sort.ignoreCase}
          onChange={(v) => setOpts((o) => ({ ...o, sort: { ...o.sort, ignoreCase: v } }))}
        />
        <OptionToggle
          label={t.sortTool.sort.trimForLength}
          checked={opts.sort.trimForLength}
          onChange={(v) => setOpts((o) => ({ ...o, sort: { ...o.sort, trimForLength: v } }))}
        />
        <OptionToggle
          label={t.sortTool.sort.removeEmpty}
          checked={opts.sort.removeEmpty}
          onChange={(v) => setOpts((o) => ({ ...o, sort: { ...o.sort, removeEmpty: v } }))}
        />
      </div>
    </section>
  </>
  );

  return (
    <ToolWorksplitLayout
      editor={<MainTextEditor minRows={6} />}
      quickBar={quickBar}
      result={
        <SortResultPanel
          t={t}
          result={result}
          previewKey={previewKey}
          stats={stats}
          copied={copied}
          onCopy={() => void copyResult()}
          onDownload={() => downloadTextFile(result, `puretext-sort-${stamp()}.txt`)}
          onApply={() => setText(result)}
        />
      }
      controls={
        <>
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.sortTool.affixHeading}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                {t.sortTool.affix.prefix}
                <input
                  value={opts.affix.prefix}
                  onChange={(e) => setOpts((o) => ({ ...o, affix: { ...o.affix, prefix: e.target.value } }))}
                  placeholder={t.sortTool.affix.placeholderPrefix}
                  className="mt-1 w-full min-h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                />
              </label>
              <label className="block text-sm text-slate-300">
                {t.sortTool.affix.suffix}
                <input
                  value={opts.affix.suffix}
                  onChange={(e) => setOpts((o) => ({ ...o, affix: { ...o.affix, suffix: e.target.value } }))}
                  placeholder={t.sortTool.affix.placeholderSuffix}
                  className="mt-1 w-full min-h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                />
              </label>
            </div>
            <div className="mt-3">
              <OptionToggle
                label={t.sortTool.affix.skipEmpty}
                checked={opts.affix.skipEmpty}
                onChange={(v) => setOpts((o) => ({ ...o, affix: { ...o.affix, skipEmpty: v } }))}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.sortTool.numberHeading}</h2>
            <OptionToggle
              label={t.sortTool.number.enabled}
              checked={opts.numbering.enabled}
              onChange={(v) => setOpts((o) => ({ ...o, numbering: { ...o.numbering, enabled: v } }))}
            />
            {opts.numbering.enabled ? (
              <div className="mt-4 space-y-4">
                <label className="flex items-center justify-between gap-3 text-sm text-slate-300">
                  {t.sortTool.number.start}
                  <input
                    type="number"
                    min={1}
                    max={9999}
                    value={opts.numbering.start}
                    onChange={(e) =>
                      setOpts((o) => ({
                        ...o,
                        numbering: { ...o.numbering, start: Math.max(1, Number(e.target.value) || 1) },
                      }))
                    }
                    className="w-24 min-h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-right text-sm text-slate-100"
                  />
                </label>
                <p className="text-xs text-slate-500">{t.sortTool.previewHint}</p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["dot", t.sortTool.number.formatDot],
                      ["paren", t.sortTool.number.formatParen],
                      ["zeroPad", t.sortTool.number.formatZeroPad],
                    ] as const
                  ).map(([fmt, label]) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() =>
                        setOpts((o) => ({ ...o, numbering: { ...o.numbering, format: fmt as NumberFormat } }))
                      }
                      className={cn(
                        "min-h-11 rounded-lg border px-3 py-2 font-mono text-xs sm:text-sm",
                        opts.numbering.format === fmt
                          ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                          : "border-slate-700 bg-slate-900 text-slate-300",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <OptionToggle
                  label={t.sortTool.number.skipEmpty}
                  checked={opts.numbering.skipEmpty}
                  onChange={(v) => setOpts((o) => ({ ...o, numbering: { ...o.numbering, skipEmpty: v } }))}
                />
              </div>
            ) : null}
          </section>
        </>
      }
    />
  );
}

function SortResultPanel({
  t,
  result,
  previewKey,
  stats,
  copied,
  onCopy,
  onDownload,
  onApply,
}: {
  t: ReturnType<typeof useI18n>["t"];
  result: string;
  previewKey: string;
  stats: ReturnType<typeof transformSortLines>["stats"];
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onApply: () => void;
}) {
  return (
    <section className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 shadow-sm shadow-teal-950/30 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-100">{t.sortTool.previewHeading}</h2>
      <p className="mt-1 text-xs text-slate-500">{t.sortTool.previewHint}</p>

      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{t.sortTool.statsHeading}</h3>

      <div className="mt-2 space-y-1 rounded-lg border border-slate-800 bg-slate-950/50 p-3 sm:hidden">
        <p className="text-sm text-slate-200">
          {t.sortTool.stats.linesBefore}: <span className="font-medium tabular-nums text-teal-200">{stats.linesBefore}</span>
        </p>
        <p className="text-sm text-slate-200">
          {t.sortTool.stats.linesAfter}: <span className="font-medium tabular-nums text-teal-200">{stats.linesAfter}</span>
        </p>
        {stats.emptyRemoved > 0 ? (
          <p className="text-xs text-teal-300/90">
            −{stats.emptyRemoved} {t.sortTool.stats.emptyRemoved.toLowerCase()}
          </p>
        ) : null}
      </div>

      <div className="mt-2 hidden sm:block">
        <StatGrid>
          <StatCard label={t.sortTool.stats.linesBefore} value={stats.linesBefore} />
          <StatCard label={t.sortTool.stats.linesAfter} value={stats.linesAfter} />
          <StatCard label={t.sortTool.stats.emptyRemoved} value={stats.emptyRemoved} />
        </StatGrid>
      </div>

      <div className="mt-3 min-w-0">
        <FormattedTextPreview value={result} minRows={7} formatKey={previewKey} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          onClick={onCopy}
          icon={copied ? Check : Copy}
          label={copied ? t.sortTool.copiedResult : t.sortTool.copyResult}
          disabled={!result}
        />
        <ActionButton onClick={onDownload} icon={Download} label={t.sortTool.downloadResult} disabled={!result} />
        <ActionButton onClick={onApply} icon={Check} label={t.sortTool.applyResult} disabled={!result} primary />
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
        "flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm",
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