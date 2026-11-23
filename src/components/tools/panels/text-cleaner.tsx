"use client";

import { Check, Copy, Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { FormattedTextPreview } from "@/components/tools/FormattedTextPreview";
import { MainTextEditor, StatCard, StatGrid, ToolWorksplitLayout } from "@/components/tools/shared";
import { useI18n } from "@/i18n/context";
import { useTextSession } from "@/context/TextSessionContext";
import {
  CLEAN_PRESETS,
  cleanTextWithStats,
  DEFAULT_CLEAN_OPTIONS,
  type CleanOptions,
  type CleanPresetId,
  type EmptyLinesMode,
} from "@/lib/text/clean";
import { downloadTextFile } from "@/lib/text/stats-report";
import { cn } from "@/lib/cn";

function optsFingerprint(opts: CleanOptions): string {
  return [
    opts.stripHtml,
    opts.collapseSpaces,
    opts.trimLineEnds,
    opts.trimWholeText,
    opts.stripTabs,
    opts.stripInvisible,
    opts.emptyLines,
  ].join(",");
}

export function CleanPanel() {
  const { t } = useI18n();
  const { text, setText } = useTextSession();
  const [opts, setOpts] = useState<CleanOptions>({ ...DEFAULT_CLEAN_OPTIONS });
  const [activePreset, setActivePreset] = useState<CleanPresetId | null>("spaces");
  const [copied, setCopied] = useState(false);

  const { text: result, stats } = useMemo(() => cleanTextWithStats(text, opts), [text, opts]);

  const applyPreset = (id: CleanPresetId) => {
    setOpts({ ...CLEAN_PRESETS[id] });
    setActivePreset(id);
  };

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
  const previewKey = `${text.length}|${result.length}|${optsFingerprint(opts)}`;

  const presetsSection = (
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-200">{t.cleanTool.presetsHeading}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {(["full", "html", "spaces"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => applyPreset(id)}
            className={cn(
              "min-h-11 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm",
              activePreset === id
                ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                : "border-slate-700 bg-slate-900 text-slate-300",
            )}
          >
            {t.cleanTool.presets[id]}
          </button>
        ))}
      </div>
    </section>
  );

  return (
    <ToolWorksplitLayout
      editor={<MainTextEditor minRows={6} />}
      quickBar={presetsSection}
      result={
        <CleanResultPanel
          t={t}
          result={result}
          previewKey={previewKey}
          stats={stats}
          copied={copied}
          onCopy={() => void copyResult()}
          onDownload={() => downloadTextFile(result, `puretext-clean-${stamp()}.txt`)}
          onApply={() => setText(result)}
        />
      }
      controls={
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
          <h2 className="text-sm font-semibold text-slate-200">{t.cleanTool.optionsHeading}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <OptionToggle
              label={t.cleanTool.options.stripHtml}
              checked={opts.stripHtml}
              onChange={(v) => {
                setActivePreset(null);
                setOpts((o) => ({ ...o, stripHtml: v }));
              }}
            />
            <OptionToggle
              label={t.cleanTool.options.collapseSpaces}
              checked={opts.collapseSpaces}
              onChange={(v) => {
                setActivePreset(null);
                setOpts((o) => ({ ...o, collapseSpaces: v }));
              }}
            />
            <OptionToggle
              label={t.cleanTool.options.trimLineEnds}
              checked={opts.trimLineEnds}
              onChange={(v) => {
                setActivePreset(null);
                setOpts((o) => ({ ...o, trimLineEnds: v }));
              }}
            />
            <OptionToggle
              label={t.cleanTool.options.trimWholeText}
              checked={opts.trimWholeText}
              onChange={(v) => {
                setActivePreset(null);
                setOpts((o) => ({ ...o, trimWholeText: v }));
              }}
            />
            <OptionToggle
              label={t.cleanTool.options.stripTabs}
              checked={opts.stripTabs}
              onChange={(v) => {
                setActivePreset(null);
                setOpts((o) => ({ ...o, stripTabs: v }));
              }}
            />
            <OptionToggle
              label={t.cleanTool.options.stripInvisible}
              checked={opts.stripInvisible}
              onChange={(v) => {
                setActivePreset(null);
                setOpts((o) => ({ ...o, stripInvisible: v }));
              }}
            />
          </div>
          <p className="mt-4 text-xs text-slate-500">{t.cleanTool.options.emptyLinesLabel}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                ["keep", t.cleanTool.options.emptyLinesKeep],
                ["collapse", t.cleanTool.options.emptyLinesCollapse],
                ["removeAll", t.cleanTool.options.emptyLinesRemove],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setActivePreset(null);
                  setOpts((o) => ({ ...o, emptyLines: mode as EmptyLinesMode }));
                }}
                className={cn(
                  "min-h-11 rounded-lg border px-3 py-2 text-xs sm:text-sm",
                  opts.emptyLines === mode
                    ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                    : "border-slate-700 text-slate-400",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </section>
      }
    />
  );
}

function CleanResultPanel({
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
  stats: ReturnType<typeof cleanTextWithStats>["stats"];
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onApply: () => void;
}) {
  return (
    <section className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 shadow-sm shadow-teal-950/30 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-100">{t.cleanTool.previewHeading}</h2>
      <p className="mt-1 text-xs text-slate-500">{t.cleanTool.previewHint}</p>

      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{t.cleanTool.statsHeading}</h3>

      <div className="mt-2 space-y-2 rounded-lg border border-slate-800 bg-slate-950/50 p-3 sm:hidden">
        <p className="text-sm text-slate-200">
          <span className="text-slate-500">{t.cleanTool.stats.charsBefore}:</span>{" "}
          <span className="tabular-nums font-medium text-slate-100">{stats.charsBefore}</span>
          <span className="mx-1 text-slate-600">→</span>
          <span className="tabular-nums font-medium text-teal-200">{stats.charsAfter}</span>
        </p>
        <p className="text-sm text-slate-200">
          <span className="text-slate-500">{t.cleanTool.stats.linesBefore}:</span>{" "}
          <span className="tabular-nums font-medium text-slate-100">{stats.linesBefore}</span>
          <span className="mx-1 text-slate-600">→</span>
          <span className="tabular-nums font-medium text-teal-200">{stats.linesAfter}</span>
        </p>
        <p className="text-xs text-teal-300/90">
          −{stats.charsRemoved} {t.cleanTool.stats.charsRemoved.toLowerCase()} · −{stats.linesRemoved}{" "}
          {t.cleanTool.stats.linesRemoved.toLowerCase()}
        </p>
      </div>

      <div className="mt-2 hidden sm:block">
        <StatGrid>
          <StatCard label={t.cleanTool.stats.charsBefore} value={stats.charsBefore} />
          <StatCard label={t.cleanTool.stats.charsAfter} value={stats.charsAfter} />
          <StatCard label={t.cleanTool.stats.linesBefore} value={stats.linesBefore} />
          <StatCard label={t.cleanTool.stats.linesAfter} value={stats.linesAfter} />
          <StatCard label={t.cleanTool.stats.charsRemoved} value={stats.charsRemoved} />
          <StatCard label={t.cleanTool.stats.linesRemoved} value={stats.linesRemoved} />
        </StatGrid>
      </div>

      <div className="mt-3 min-w-0">
        <FormattedTextPreview value={result} minRows={7} formatKey={previewKey} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          onClick={onCopy}
          icon={copied ? Check : Copy}
          label={copied ? t.cleanTool.copiedResult : t.cleanTool.copyResult}
          disabled={!result}
        />
        <ActionButton onClick={onDownload} icon={Download} label={t.cleanTool.downloadResult} disabled={!result} />
        <ActionButton onClick={onApply} icon={Check} label={t.cleanTool.applyResult} disabled={!result} primary />
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