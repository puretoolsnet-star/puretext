"use client";

import { Check, Copy, FileSpreadsheet, FileText, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { MainTextEditor, OptionRow } from "@/components/tools/shared";
import { useI18n } from "@/i18n/context";
import { useTextSession } from "@/context/TextSessionContext";
import {
  analyzeFrequency,
  buildFrequencyReportCsv,
  buildFrequencyReportText,
  findOccurrences,
  type FrequencyRow,
  type NgramMode,
} from "@/lib/text/frequency";
import { downloadTextFile } from "@/lib/text/stats-report";
import { cn } from "@/lib/cn";

function modeLabel(mode: NgramMode, t: ReturnType<typeof useI18n>["t"]): string {
  if (mode === 1) return t.frequency.modes.one;
  if (mode === 2) return t.frequency.modes.two;
  return t.frequency.modes.three;
}

function highlightExcerpt(excerpt: string, term: string, ignoreCase: boolean): string {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = /\s/.test(term) ? escaped.replace(/\s+/g, "\\s+") : `\\b${escaped}\\b`;
  const re = new RegExp(`(${pattern})`, ignoreCase ? "gi" : "g");
  const safe = excerpt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return safe.replace(re, '<mark class="rounded bg-teal-500/35 px-0.5 text-teal-100">$1</mark>');
}

export function WordFrequencyPanel() {
  const { t, lang } = useI18n();
  const { text } = useTextSession();

  const [mode, setMode] = useState<NgramMode>(1);
  const [minLength, setMinLength] = useState(2);
  const [minCount, setMinCount] = useState(1);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [ignoreNumbers, setIgnoreNumbers] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);

  const rows = useMemo(
    () =>
      analyzeFrequency(text, {
        mode,
        minLength,
        minCount,
        ignoreStopWords,
        ignoreNumbers,
        ignoreCase,
        search,
        lang,
        limit: 100,
      }),
    [text, mode, minLength, minCount, ignoreStopWords, ignoreNumbers, ignoreCase, search, lang],
  );

  const occurrences = useMemo(
    () => (selected ? findOccurrences(text, selected, ignoreCase) : []),
    [text, selected, ignoreCase],
  );

  const reportText = useMemo(
    () =>
      buildFrequencyReportText(rows, {
        title: t.frequency.reportTitle,
        mode: `${t.frequency.reportMode}: ${modeLabel(mode, t)}`,
        generated: t.frequency.reportGenerated,
        term: t.frequency.term,
        count: t.frequency.count,
        percent: t.frequency.percent,
        empty: t.workspace.noData,
      }),
    [rows, t, mode],
  );

  const copyReport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopiedReport(true);
      window.setTimeout(() => setCopiedReport(false), 1500);
    } catch {
      /* denied */
    }
  }, [reportText]);

  const stamp = () => new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <MainTextEditor minRows={10} />

      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
        <h2 className="text-sm font-semibold text-slate-200">{t.frequency.filtersHeading}</h2>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label={t.frequency.reportMode}>
          {([1, 2, 3] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setSelected(null);
              }}
              className={cn(
                "min-h-10 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm",
                mode === m
                  ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                  : "border-slate-700 bg-slate-900 text-slate-300",
              )}
            >
              {modeLabel(m, t)}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <OptionRow label={t.frequency.ignoreStopWords}>
            <input type="checkbox" checked={ignoreStopWords} onChange={(e) => setIgnoreStopWords(e.target.checked)} />
          </OptionRow>
          <OptionRow label={t.frequency.ignoreNumbers}>
            <input type="checkbox" checked={ignoreNumbers} onChange={(e) => setIgnoreNumbers(e.target.checked)} />
          </OptionRow>
          <OptionRow label={t.frequency.ignoreCase}>
            <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
          </OptionRow>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">{t.frequency.minWordLength}</span>
          {(
            [
              [2, t.frequency.minLenOptions.two],
              [3, t.frequency.minLenOptions.three],
              [4, t.frequency.minLenOptions.four],
            ] as const
          ).map(([len, label]) => (
            <button
              key={len}
              type="button"
              onClick={() => setMinLength(len)}
              className={cn(
                "min-h-9 rounded-lg border px-2.5 text-xs",
                minLength === len
                  ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                  : "border-slate-700 text-slate-400",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">{t.frequency.minCount}</span>
          {(
            [
              [1, t.frequency.minCountOptions.one],
              [2, t.frequency.minCountOptions.two],
              [3, t.frequency.minCountOptions.three],
            ] as const
          ).map(([n, label]) => (
            <button
              key={n}
              type="button"
              onClick={() => setMinCount(n)}
              className={cn(
                "min-h-9 rounded-lg border px-2.5 text-xs",
                minCount === n
                  ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                  : "border-slate-700 text-slate-400",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="mt-4 flex min-h-10 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3">
          <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.frequency.searchPlaceholder}
            className="w-full min-w-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </label>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-200">{t.frequency.heading}</h2>
        {rows.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500">{t.workspace.noData}</p>
        ) : (
          <ul className="mt-3 max-h-[min(28rem,60vh)] space-y-2 overflow-y-auto overscroll-contain rounded-xl border border-slate-800 bg-slate-900/50 p-2 sm:p-3">
            {rows.map((row) => (
              <FrequencyRowItem
                key={row.term}
                row={row}
                active={selected === row.term}
                labels={{ count: t.frequency.count, percent: t.frequency.percent }}
                onSelect={() => setSelected((s) => (s === row.term ? null : row.term))}
              />
            ))}
          </ul>
        )}
        <p className="mt-2 text-[11px] text-slate-500">{t.frequency.occurrencesHint}</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
        <h2 className="text-sm font-semibold text-slate-200">{t.frequency.occurrences}</h2>
        {!selected ? (
          <p className="mt-2 text-xs text-slate-500">{t.frequency.selectTerm}</p>
        ) : occurrences.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500">{t.workspace.noData}</p>
        ) : (
          <ul className="mt-3 max-h-56 space-y-2 overflow-y-auto overscroll-contain">
            {occurrences.map((occ, i) => (
              <li
                key={`${occ.index}-${i}`}
                className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-2 text-xs leading-relaxed text-slate-300"
              >
                <span className="font-medium text-teal-300/90">
                  {t.frequency.line} {occ.line}
                </span>
                <p
                  className="mt-1 break-words"
                  dangerouslySetInnerHTML={{ __html: highlightExcerpt(occ.excerpt, selected, ignoreCase) }}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-200">{t.frequency.actionsHeading}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <ExportButton onClick={() => void copyReport()} icon={copiedReport ? Check : Copy} label={copiedReport ? t.frequency.copiedReport : t.frequency.copyReport} />
          <ExportButton
            onClick={() => downloadTextFile(reportText, `puretext-frequency-${stamp()}.txt`)}
            icon={FileText}
            label={t.frequency.downloadTxt}
          />
          <ExportButton
            onClick={() =>
              downloadTextFile(
                buildFrequencyReportCsv(rows, {
                  term: t.frequency.term,
                  count: t.frequency.count,
                  percent: t.frequency.percent,
                }),
                `puretext-frequency-${stamp()}.csv`,
                "text/csv;charset=utf-8",
              )
            }
            icon={FileSpreadsheet}
            label={t.frequency.downloadCsv}
          />
        </div>
      </section>
    </div>
  );
}

function FrequencyRowItem({
  row,
  active,
  labels,
  onSelect,
}: {
  row: FrequencyRow;
  active: boolean;
  labels: { count: string; percent: string };
  onSelect: () => void;
}) {
  const bar = row.maxPercent > 0 ? Math.max(8, Math.round((row.percent / row.maxPercent) * 100)) : 0;
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "w-full rounded-lg border px-3 py-2.5 text-left transition",
          active ? "border-teal-400/50 bg-teal-500/10" : "border-slate-800 bg-slate-900/60 hover:border-teal-500/30",
        )}
      >
        <div className="flex min-w-0 items-start justify-between gap-2">
          <span className="min-w-0 break-words text-sm font-medium text-slate-100">{row.term}</span>
          <span className="shrink-0 text-right text-xs tabular-nums text-slate-400">
            <span className="block text-teal-300">
              {labels.count}: {row.count}
            </span>
            <span>
              {labels.percent}: {row.percent}%
            </span>
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800" aria-hidden>
          <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${bar}%` }} />
        </div>
      </button>
    </li>
  );
}

function ExportButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  icon: typeof Copy;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-teal-500/50 hover:text-teal-200 sm:text-sm"
    >
      <Icon className="h-4 w-4 text-teal-400" aria-hidden />
      {label}
    </button>
  );
}