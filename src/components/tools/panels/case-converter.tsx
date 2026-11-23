"use client";

import { Check, Copy, Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { FormattedTextPreview } from "@/components/tools/FormattedTextPreview";
import { MainTextEditor, StatCard, StatGrid, ToolWorksplitLayout } from "@/components/tools/shared";
import { useI18n } from "@/i18n/context";
import { useTextSession } from "@/context/TextSessionContext";
import { analyzeText } from "@/lib/text/analyze";
import {
  transformCase,
  type AlternateStart,
  type CaseMode,
} from "@/lib/text/case";
import { downloadTextFile } from "@/lib/text/stats-report";
import { cn } from "@/lib/cn";

const MODES: CaseMode[] = ["upper", "lower", "title", "titleSmart", "sentence", "alternate", "invert"];

function modeKey(mode: CaseMode): keyof ReturnType<typeof useI18n>["t"]["caseTool"]["modes"] {
  if (mode === "titleSmart") return "titleSmart";
  return mode as keyof ReturnType<typeof useI18n>["t"]["caseTool"]["modes"];
}

export function CasePanel() {
  const { t, lang } = useI18n();
  const { text, setText } = useTextSession();
  const [mode, setMode] = useState<CaseMode>("sentence");
  const [titleSmart, setTitleSmart] = useState(true);
  const [alternateStart, setAlternateStart] = useState<AlternateStart>("upper");
  const [copied, setCopied] = useState(false);

  const effectiveMode: CaseMode = useMemo(() => {
    if (mode === "title") return titleSmart ? "titleSmart" : "title";
    return mode;
  }, [mode, titleSmart]);

  const result = useMemo(
    () => transformCase(text, { mode: effectiveMode, lang, alternateStart }),
  [text, effectiveMode, lang, alternateStart],
  );

  const resultStats = useMemo(() => analyzeText(result), [result]);

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

  const previewKey = `${text.length}|${effectiveMode}|${result.length}`;

  return (
    <ToolWorksplitLayout
      editor={<MainTextEditor minRows={7} />}
      result={
        <section className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 sm:p-4">
          <h2 className="text-sm font-semibold text-slate-100">{t.caseTool.previewHeading}</h2>
          <p className="mt-1 text-xs text-slate-500">{t.caseTool.previewHint}</p>
          <div className="mt-3 min-w-0">
            <FormattedTextPreview value={result} minRows={8} formatKey={previewKey} />
          </div>
          <h3 className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{t.caseTool.resultStats}</h3>
          <StatGrid>
            <StatCard label={t.caseTool.chars} value={resultStats.charsWithSpaces} />
            <StatCard label={t.caseTool.words} value={resultStats.words} />
          </StatGrid>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton
              onClick={() => void copyResult()}
              icon={copied ? Check : Copy}
              label={copied ? t.caseTool.copiedResult : t.caseTool.copyResult}
            />
            <ActionButton
              onClick={() => downloadTextFile(result, `puretext-case-${stamp()}.txt`)}
              icon={Download}
              label={t.caseTool.downloadResult}
              disabled={!result}
            />
            <ActionButton
              onClick={() => setText(result)}
              icon={Check}
              label={t.caseTool.applyResult}
              disabled={!result}
              variant="primary"
            />
          </div>
        </section>
      }
      controls={
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
        <p className="text-xs text-slate-500">
          <span className="font-medium text-teal-300/90">{t.caseTool.activeMode}: </span>
          {t.caseTool.modes[modeKey(effectiveMode)]}
        </p>
        <h2 className="mt-2 text-sm font-semibold text-slate-200">{t.caseTool.modesHeading}</h2>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist">
          {MODES.filter((m) => m !== "titleSmart").map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m || (m === "title" && (mode === "title" || effectiveMode === "titleSmart"))}
              onClick={() => setMode(m)}
              className={cn(
                "min-h-10 rounded-lg border px-3 py-2 text-xs font-medium sm:min-w-[4.5rem] sm:text-sm",
                mode === m
                  ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-teal-500/40",
              )}
            >
              {t.caseTool.modes[modeKey(m)]}
            </button>
          ))}
        </div>

        {mode === "title" ? (
          <div className="mt-4">
            <p className="text-xs text-slate-500">{t.caseTool.titleStyle}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <ToggleChip active={!titleSmart} onClick={() => setTitleSmart(false)} label={t.caseTool.titleSimple} />
              <ToggleChip active={titleSmart} onClick={() => setTitleSmart(true)} label={t.caseTool.titleSmartLabel} />
            </div>
          </div>
        ) : null}

        {mode === "alternate" ? (
          <div className="mt-4">
            <p className="text-xs text-slate-500">{t.caseTool.alternateStart}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <ToggleChip
                active={alternateStart === "upper"}
                onClick={() => setAlternateStart("upper")}
                label={t.caseTool.alternateStartUpper}
              />
              <ToggleChip
                active={alternateStart === "lower"}
                onClick={() => setAlternateStart("lower")}
                label={t.caseTool.alternateStartLower}
              />
            </div>
          </div>
        ) : null}
      </section>
      }
    />
  );
}

function ToggleChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-lg border px-3 py-2 text-xs sm:text-sm",
        active ? "border-teal-400/50 bg-teal-500/15 text-teal-100" : "border-slate-700 text-slate-400",
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
  variant = "default",
}: {
  onClick: () => void;
  icon: typeof Copy;
  label: string;
  disabled?: boolean;
  variant?: "default" | "primary";
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium sm:text-sm",
        "disabled:pointer-events-none disabled:opacity-40",
        variant === "primary"
          ? "border-teal-500/50 bg-teal-600 text-white hover:bg-teal-500"
          : "border-slate-700 bg-slate-900 text-slate-200 hover:border-teal-500/50 hover:text-teal-200",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </button>
  );
}
