"use client";

import { Check, Copy, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { MainTextEditor, StatCard, StatGrid } from "@/components/tools/shared";
import { useI18n } from "@/i18n/context";
import { useTextSession } from "@/context/TextSessionContext";
import {
  analyzeText,
  charLimitState,
  formatDuration,
  wordFrequency,
} from "@/lib/text/analyze";
import {
  buildStatsReportCsv,
  buildStatsReportText,
  downloadTextFile,
  type ReportLabels,
} from "@/lib/text/stats-report";
import { cn } from "@/lib/cn";

const LIMIT_PRESETS = [
  { key: "off" as const, value: null },
  { key: "tweet" as const, value: 280 },
  { key: "sms" as const, value: 160 },
  { key: "snippet" as const, value: 500 },
  { key: "post" as const, value: 1000 },
  { key: "long" as const, value: 2000 },
];

const TOP_PREVIEW = 8;

export function CharCounterPanel() {
  const { t } = useI18n();
  const { text } = useTextSession();
  const [charLimit, setCharLimit] = useState<number | null>(null);
  const [customLimit, setCustomLimit] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);
  const topWords = useMemo(() => wordFrequency(text, TOP_PREVIEW), [text]);
  const limit = useMemo(() => charLimitState(stats.charsWithSpaces, charLimit), [stats.charsWithSpaces, charLimit]);

  const durationLabels = { min: t.workspace.minutes, sec: t.workspace.seconds };
  const readDisplay = formatDuration(stats.readMinutes, stats.readSeconds, durationLabels);
  const speakDisplay = formatDuration(stats.speakMinutes, stats.speakSeconds, durationLabels);

  const reportLabels: ReportLabels = useMemo(
    () => ({
      title: t.counter.reportTitle,
      generated: t.counter.reportGenerated,
      charsWithSpaces: t.workspace.charsWithSpaces,
      charsNoSpaces: t.workspace.charsNoSpaces,
      words: t.workspace.words,
      sentences: t.workspace.sentences,
      paragraphs: t.workspace.paragraphs,
      lines: t.workspace.lines,
      avgWordLen: t.workspace.avgWordLen,
      readTime: t.counter.readTimeApprox,
      speakTime: t.counter.speakTime,
      charLimit: t.counter.limitHeading,
      limitRemaining: t.counter.limitRemaining,
      limitExceeded: t.counter.limitExceeded,
      topWords: t.counter.topRepeats,
      count: t.workspace.words,
      none: t.workspace.noData,
    }),
    [t],
  );

  const buildReport = useCallback(
    () =>
      buildStatsReportText(
        stats,
        reportLabels,
        topWords,
        readDisplay,
        speakDisplay,
        limit.limit,
        limit.remaining,
        limit.exceeded,
      ),
    [stats, reportLabels, topWords, readDisplay, speakDisplay, limit],
  );

  const copyText = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      window.setTimeout(() => setCopiedText(false), 1500);
    } catch {
      /* denied */
    }
  }, [text]);

  const copyReport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildReport());
      setCopiedReport(true);
      window.setTimeout(() => setCopiedReport(false), 1500);
    } catch {
      /* denied */
    }
  }, [buildReport]);

  const stamp = () => new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <MainTextEditor minRows={10} />

      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
        <h2 className="text-sm font-semibold text-slate-200">{t.counter.limitHeading}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {LIMIT_PRESETS.map((preset) => {
            const active =
              preset.value === null ? charLimit === null : charLimit === preset.value && !customLimit;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => {
                  setCharLimit(preset.value);
                  setCustomLimit("");
                }}
                className={cn(
                  "min-h-10 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm",
                  active
                    ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-teal-500/40",
                )}
              >
                {t.counter.presets[preset.key]}
              </button>
            );
          })}
          <label className="flex min-h-10 min-w-[7rem] flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-2 sm:max-w-[8.5rem]">
            <span className="sr-only">{t.counter.limitCustomPlaceholder}</span>
            <input
              type="number"
              min={1}
              max={100000}
              value={customLimit}
              placeholder={t.counter.limitCustomPlaceholder}
              onChange={(e) => {
                const raw = e.target.value;
                setCustomLimit(raw);
                const n = Number(raw);
                if (raw && Number.isFinite(n) && n > 0) setCharLimit(Math.round(n));
                else if (!raw) setCharLimit(null);
              }}
              className="w-full min-w-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </label>
        </div>
        {charLimit && charLimit > 0 ? (
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm">
              <span className="text-slate-400">
                {stats.charsWithSpaces} {t.counter.limitOf} {charLimit}
              </span>
              <span
                className={cn(
                  "font-medium tabular-nums",
                  limit.exceeded ? "text-rose-300" : "text-teal-300",
                )}
              >
                {limit.exceeded
                  ? `${t.counter.limitExceeded} ${Math.abs(limit.remaining ?? 0)}`
                  : `${t.counter.limitRemaining}: ${limit.remaining ?? 0}`}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-valuenow={limit.percent} aria-valuemin={0} aria-valuemax={100}>
              <div
                className={cn("h-full rounded-full transition-all", limit.exceeded ? "bg-rose-500" : "bg-teal-500")}
                style={{ width: `${limit.percent}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="mt-3 text-xs text-slate-500">{t.counter.limitNone}</p>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-200">{t.counter.statsHeading}</h2>
        <StatGrid>
          <StatCard label={t.workspace.charsWithSpaces} value={stats.charsWithSpaces} />
          <StatCard label={t.workspace.charsNoSpaces} value={stats.charsNoSpaces} />
          <StatCard label={t.workspace.words} value={stats.words} />
          <StatCard label={t.workspace.sentences} value={stats.sentences} />
          <StatCard label={t.workspace.paragraphs} value={stats.paragraphs} />
          <StatCard label={t.workspace.lines} value={stats.lines} />
          <StatCard label={t.workspace.avgWordLen} value={stats.avgWordLength} />
          <StatCard label={t.counter.readTimeApprox} value={readDisplay} />
          <StatCard label={t.counter.speakTime} value={speakDisplay} />
        </StatGrid>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-200">{t.counter.topRepeats}</h2>
          <p className="text-[11px] text-slate-500">{t.counter.topRepeatsHint}</p>
        </div>
        {topWords.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500">{t.workspace.noData}</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {topWords.map((row) => (
              <li
                key={row.word}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-200"
              >
                <span className="truncate">{row.word}</span>
                <span className="shrink-0 tabular-nums text-teal-300">×{row.count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-200">{t.counter.actionsHeading}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton onClick={() => void copyText()} icon={copiedText ? Check : Copy} label={copiedText ? t.workspace.copied : t.counter.copyText} />
          <ActionButton onClick={() => void copyReport()} icon={copiedReport ? Check : Copy} label={copiedReport ? t.counter.copiedReport : t.counter.copyReport} />
          <ActionButton
            onClick={() => text && downloadTextFile(text, `puretext-${stamp()}.txt`)}
            icon={Download}
            label={t.counter.downloadText}
            disabled={!text}
          />
          <ActionButton
            onClick={() => downloadTextFile(buildReport(), `puretext-stats-${stamp()}.txt`)}
            icon={FileText}
            label={t.counter.downloadReportTxt}
          />
          <ActionButton
            onClick={() =>
              downloadTextFile(
                buildStatsReportCsv(stats, reportLabels, readDisplay, speakDisplay, topWords),
                `puretext-stats-${stamp()}.csv`,
                "text/csv;charset=utf-8",
              )
            }
            icon={FileSpreadsheet}
            label={t.counter.downloadReportCsv}
          />
        </div>
      </section>
    </div>
  );
}

function ActionButton({
  onClick,
  icon: Icon,
  label,
  disabled,
}: {
  onClick: () => void;
  icon: typeof Copy;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 transition sm:text-sm",
        "hover:border-teal-500/50 hover:bg-slate-800 hover:text-teal-200",
        "disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />
      <span className="text-left">{label}</span>
    </button>
  );
}