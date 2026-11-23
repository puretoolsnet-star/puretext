"use client";

import { ArrowLeftRight, Check, Copy, Download, Eraser, Sparkles } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { StatCard, StatGrid } from "@/components/tools/shared";
import { TextEditor } from "@/components/workspace/TextEditor";
import { useTextSession } from "@/context/TextSessionContext";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import {
  compareTexts,
  type DiffOptions,
  type DiffRow,
  type DiffViewMode,
  type WordPart,
} from "@/lib/text/diff";
import { downloadTextFile } from "@/lib/text/stats-report";

const DEFAULT_OPTS: Omit<DiffOptions, "viewMode"> = {
  ignoreCase: false,
  ignoreWhitespace: false,
  ignoreEmptyLines: false,
  changesOnly: false,
};

export function ComparePanel() {
  const { t, lang } = useI18n();
  const { diffOriginal, diffModified, setDiffOriginal, setDiffModified, loadDiffDemo, clearDiff, swapTexts } =
    useDiffSession();

  const [viewMode, setViewMode] = useState<DiffViewMode>("lines");
  const [opts, setOpts] = useState(DEFAULT_OPTS);
  const [copied, setCopied] = useState(false);

  const fullOpts: DiffOptions = useMemo(() => ({ ...opts, viewMode }), [opts, viewMode]);

  const { rows, stats, report } = useMemo(
    () => compareTexts(diffOriginal, diffModified, fullOpts),
    [diffOriginal, diffModified, fullOpts],
  );

  const previewKey = `${diffOriginal.length}|${diffModified.length}|${JSON.stringify(fullOpts)}|${rows.length}`;

  const copyReport = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* denied */
    }
  }, [report]);

  const stamp = () => new Date().toISOString().slice(0, 10);

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
      <div className="contents lg:contents">
        <div className="order-1 min-w-0 space-y-4 lg:col-start-1">
          <div className="flex flex-wrap gap-2">
            <ToolbarButton icon={Sparkles} label={t.diffTool.loadDemo} onClick={() => loadDiffDemo(lang)} />
            <ToolbarButton icon={ArrowLeftRight} label={t.diffTool.swap} onClick={swapTexts} />
            <ToolbarButton icon={Eraser} label={t.diffTool.clear} onClick={clearDiff} />
            <ToolbarButton
              icon={copied ? Check : Copy}
              label={copied ? t.diffTool.copiedReport : t.diffTool.copyReport}
              onClick={() => void copyReport()}
            />
            <ToolbarButton
              icon={Download}
              label={t.diffTool.downloadReport}
              onClick={() => downloadTextFile(report, `puretext-diff-${stamp()}.txt`)}
            />
          </div>
        </div>

        <div className="order-2 min-w-0 space-y-4 lg:col-start-1">
          <h2 className="text-sm font-semibold text-slate-200">{t.diffTool.inputsHeading}</h2>
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <TextEditor
              label={t.workspace.diffOriginal}
              value={diffOriginal}
              onChange={setDiffOriginal}
              minRows={6}
              showToolbar={false}
            />
            <TextEditor
              label={t.workspace.diffModified}
              value={diffModified}
              onChange={setDiffModified}
              minRows={6}
              showToolbar={false}
            />
          </div>
        </div>

        <aside
          key={previewKey}
          className="order-3 min-w-0 lg:sticky lg:top-20 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:max-h-[min(75dvh,40rem)] lg:overflow-y-auto"
        >
          <DiffResultBlock rows={rows} stats={stats} t={t} />
        </aside>

        <section className="order-4 min-w-0 rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4 lg:col-start-1">
          <h2 className="text-sm font-semibold text-slate-200">{t.diffTool.viewHeading}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <ViewChip
              active={viewMode === "lines"}
              label={t.diffTool.view.lines}
              onClick={() => setViewMode("lines")}
            />
            <ViewChip
              active={viewMode === "words"}
              label={t.diffTool.view.words}
              onClick={() => setViewMode("words")}
            />
          </div>
          <h2 className="mt-4 text-sm font-semibold text-slate-200">{t.diffTool.optionsHeading}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <OptionToggle
              label={t.diffTool.options.ignoreCase}
              checked={opts.ignoreCase}
              onChange={(v) => setOpts((o) => ({ ...o, ignoreCase: v }))}
            />
            <OptionToggle
              label={t.diffTool.options.ignoreWhitespace}
              checked={opts.ignoreWhitespace}
              onChange={(v) => setOpts((o) => ({ ...o, ignoreWhitespace: v }))}
            />
            <OptionToggle
              label={t.diffTool.options.ignoreEmptyLines}
              checked={opts.ignoreEmptyLines}
              onChange={(v) => setOpts((o) => ({ ...o, ignoreEmptyLines: v }))}
            />
            <OptionToggle
              label={t.diffTool.options.changesOnly}
              checked={opts.changesOnly}
              onChange={(v) => setOpts((o) => ({ ...o, changesOnly: v }))}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function DiffResultBlock({
  rows,
  stats,
  t,
}: {
  rows: DiffRow[];
  stats: ReturnType<typeof compareTexts>["stats"];
  t: ReturnType<typeof useI18n>["t"];
}) {
  return (
    <section className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 shadow-sm shadow-teal-950/30 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-100">{t.diffTool.resultHeading}</h2>
      <p className="mt-1 text-xs text-slate-500">{t.diffTool.previewHint}</p>

      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{t.diffTool.statsHeading}</h3>
      <StatGrid>
        <StatCard label={t.diffTool.stats.same} value={stats.same} />
        <StatCard label={t.diffTool.stats.added} value={stats.added} />
        <StatCard label={t.diffTool.stats.removed} value={stats.removed} />
        <StatCard label={t.diffTool.stats.changed} value={stats.changed} />
      </StatGrid>

      <div className="mt-3 min-w-0 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
        <ul className="min-w-0 divide-y divide-slate-800 font-mono text-xs leading-relaxed sm:text-sm">
          {rows.length === 0 ? (
            <li className="px-3 py-4 text-slate-500">{t.diffTool.noDiff}</li>
          ) : (
            rows.map((row, i) => <DiffRowItem key={`${i}-${row.kind}`} row={row} t={t} />)
          )}
        </ul>
      </div>
      <p className="mt-3 text-xs text-slate-500">{t.diffTool.legend}</p>
    </section>
  );
}

function useDiffSession() {
  const session = useTextSession();
  const swapTexts = useCallback(() => {
    const a = session.diffOriginal;
    const b = session.diffModified;
    session.setDiffOriginal(b);
    session.setDiffModified(a);
  }, [session]);
  return { ...session, swapTexts };
}

function DiffRowItem({ row, t }: { row: DiffRow; t: ReturnType<typeof useI18n>["t"] }) {
  if (row.kind === "change") {
    return (
      <li className="space-y-1 bg-amber-500/10 px-3 py-2 text-amber-50">
        <span className="text-[11px] font-medium uppercase tracking-wide text-amber-300/90">{t.diffTool.changeLabel}</span>
        <div className="break-words">
          <WordInline parts={row.words} />
        </div>
      </li>
    );
  }

  return (
    <li
      className={cn(
        "break-words px-3 py-1.5",
        row.kind === "add" && "bg-emerald-500/15 text-emerald-200",
        row.kind === "remove" && "bg-rose-500/15 text-rose-200 line-through decoration-rose-400/50",
        row.kind === "same" && "text-slate-300",
      )}
    >
      <span className="mr-2 select-none opacity-60">
        {row.kind === "add" ? "+" : row.kind === "remove" ? "−" : " "}
      </span>
      {row.text || " "}
    </li>
  );
}

function WordInline({ parts }: { parts: WordPart[] }) {
  return (
    <span>
      {parts.map((p, i) => (
        <span
          key={`${i}-${p.kind}-${p.text.slice(0, 8)}`}
          className={cn(
            p.kind === "add" && "bg-emerald-500/30 text-emerald-100",
            p.kind === "remove" && "bg-rose-500/30 text-rose-100 line-through",
            p.kind === "same" && "text-amber-50",
          )}
        >
          {p.text}
        </span>
      ))}
    </span>
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

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Copy;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-teal-500/50 hover:text-teal-200 sm:text-sm"
    >
      <Icon className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />
      <span className="truncate">{label}</span>
    </button>
  );
}