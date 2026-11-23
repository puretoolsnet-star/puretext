"use client";

import { Check, Copy, Download, WrapText } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FormattedTextPreview } from "@/components/tools/FormattedTextPreview";
import { MainTextEditor, OptionRow, StatCard, StatGrid, ToolWorksplitLayout } from "@/components/tools/shared";
import { useTextSession } from "@/context/TextSessionContext";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import {
  DEFAULT_FORMAT_POST_OPTIONS,
  FORMAT_POST_PRESETS,
  formatPostText,
  type FormatPostOptions,
  type FormatPostPresetId,
  type LongLine,
} from "@/lib/text/format-post";
import { downloadTextFile } from "@/lib/text/stats-report";

type PostLimitKey = "off" | "short" | "social" | "long" | "custom";

const LIMIT_VALUES: Record<Exclude<PostLimitKey, "off" | "custom">, number> = {
  short: 280,
  social: 500,
  long: 2000,
};

function buildFormatKey(text: string, opts: FormatPostOptions): string {
  return [
    text.length,
    text.slice(0, 48),
    opts.splitMode,
    opts.sentencesPerParagraph,
    opts.charsPerParagraph,
    opts.gap,
    opts.maxLineLength,
    opts.wrapLines,
    opts.postCharLimit,
  ].join("|");
}

export function FormatPostPanel() {
  const { t } = useI18n();
  const { text, setText, setDemoSource } = useTextSession();
  const [opts, setOpts] = useState<FormatPostOptions>({ ...DEFAULT_FORMAT_POST_OPTIONS });

  useEffect(() => {
    setDemoSource("post-format");
    return () => setDemoSource("default");
  }, [setDemoSource]);
  const [activePreset, setActivePreset] = useState<FormatPostPresetId | null>(null);
  const [limitMode, setLimitMode] = useState<PostLimitKey>("off");
  const [customLimit, setCustomLimit] = useState("");
  const [copied, setCopied] = useState(false);

  const effectiveOpts = useMemo<FormatPostOptions>(() => {
    let postCharLimit: number | null = null;
    if (limitMode === "short") postCharLimit = LIMIT_VALUES.short;
    else if (limitMode === "social") postCharLimit = LIMIT_VALUES.social;
    else if (limitMode === "long") postCharLimit = LIMIT_VALUES.long;
    else if (limitMode === "custom") {
      const n = parseInt(customLimit, 10);
      postCharLimit = Number.isFinite(n) && n > 0 ? n : null;
    }
    return { ...opts, postCharLimit };
  }, [opts, limitMode, customLimit]);

  const { text: result, stats, longLines } = useMemo(
    () => formatPostText(text, effectiveOpts),
    [text, effectiveOpts],
  );

  const applyPreset = (id: FormatPostPresetId) => {
    setOpts({ ...DEFAULT_FORMAT_POST_OPTIONS, ...FORMAT_POST_PRESETS[id] });
    setActivePreset(id);
  };

  const previewKey = useMemo(() => buildFormatKey(text, effectiveOpts), [text, effectiveOpts]);

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
  const lineMax = opts.maxLineLength ?? 120;

  return (
    <ToolWorksplitLayout
      editor={<MainTextEditor minRows={7} />}
      result={
        <ResultPanel
          t={t}
          result={result}
          previewKey={previewKey}
          stats={stats}
          longLines={longLines}
          opts={opts}
          copied={copied}
          onCopy={() => void copyResult()}
          onDownload={() => downloadTextFile(result, `puretext-post-${stamp()}.txt`)}
          onApply={() => setText(result)}
          onEnableWrap={() => {
            setActivePreset(null);
            setOpts((o) => ({ ...o, wrapLines: true }));
          }}
        />
      }
      controls={
        <>
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.postFormat.presetsHeading}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["feed", "medium", "compact"] as const).map((id) => (
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
                  {t.postFormat.presets[id]}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.postFormat.paragraphHeading}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Segmented
                active={opts.splitMode === "sentences"}
                label={t.postFormat.splitBySentences}
                onClick={() => {
                  setActivePreset(null);
                  setOpts((o) => ({ ...o, splitMode: "sentences" }));
                }}
              />
              <Segmented
                active={opts.splitMode === "chars"}
                label={t.postFormat.splitByChars}
                onClick={() => {
                  setActivePreset(null);
                  setOpts((o) => ({ ...o, splitMode: "chars" }));
                }}
              />
            </div>

            {opts.splitMode === "sentences" ? (
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{t.postFormat.sentencesPerParagraph}</span>
                    <span className="tabular-nums font-medium text-teal-200">{opts.sentencesPerParagraph}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={opts.sentencesPerParagraph}
                    onChange={(e) => {
                      setActivePreset(null);
                      setOpts((o) => ({ ...o, sentencesPerParagraph: Number(e.target.value) }));
                    }}
                    className="mt-2 h-2 w-full min-h-11 cursor-pointer accent-teal-500"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <OptionRow label={t.postFormat.charsPerParagraph}>
                  <input
                    type="number"
                    min={80}
                    max={4000}
                    value={opts.charsPerParagraph}
                    onChange={(e) => {
                      setActivePreset(null);
                      setOpts((o) => ({ ...o, charsPerParagraph: Number(e.target.value) || 400 }));
                    }}
                    className="w-24 rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-right text-sm text-slate-100"
                  />
                </OptionRow>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">{t.postFormat.gapLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Segmented
                active={opts.gap === "double"}
                label={t.postFormat.gapDouble}
                onClick={() => {
                  setActivePreset(null);
                  setOpts((o) => ({ ...o, gap: "double" }));
                }}
              />
              <Segmented
                active={opts.gap === "single"}
                label={t.postFormat.gapSingle}
                onClick={() => {
                  setActivePreset(null);
                  setOpts((o) => ({ ...o, gap: "single" }));
                }}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.postFormat.lineHeading}</h2>
            <LineOptions opts={opts} setOpts={setOpts} setActivePreset={setActivePreset} lineMax={lineMax} t={t} />
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <h2 className="text-sm font-semibold text-slate-200">{t.postFormat.limitHeading}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <LimitChip active={limitMode === "off"} label={t.postFormat.postLimitOff} onClick={() => setLimitMode("off")} />
              <LimitChip
                active={limitMode === "short"}
                label={t.postFormat.limitPresets.short}
                onClick={() => setLimitMode("short")}
              />
              <LimitChip
                active={limitMode === "social"}
                label={t.postFormat.limitPresets.social}
                onClick={() => setLimitMode("social")}
              />
              <LimitChip
                active={limitMode === "long"}
                label={t.postFormat.limitPresets.long}
                onClick={() => setLimitMode("long")}
              />
              <LimitChip
                active={limitMode === "custom"}
                label={t.postFormat.postLimitCustom}
                onClick={() => setLimitMode("custom")}
              />
            </div>
            {limitMode === "custom" ? (
              <div className="mt-3">
                <input
                  type="number"
                  min={1}
                  value={customLimit}
                  onChange={(e) => setCustomLimit(e.target.value)}
                  placeholder="500"
                  className="w-full max-w-xs min-h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100"
                />
              </div>
            ) : null}
          </section>
        </>
      }
    />
  );
}

function ResultPanel({
  t,
  result,
  previewKey,
  stats,
  longLines,
  opts,
  copied,
  onCopy,
  onDownload,
  onApply,
  onEnableWrap,
}: {
  t: ReturnType<typeof useI18n>["t"];
  result: string;
  previewKey: string;
  stats: ReturnType<typeof formatPostText>["stats"];
  longLines: LongLine[];
  opts: FormatPostOptions;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
  onApply: () => void;
  onEnableWrap: () => void;
}) {
  return (
    <section className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 shadow-sm shadow-teal-950/30 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-100">{t.postFormat.previewHeading}</h2>
      <p className="mt-1 text-xs text-slate-500">{t.postFormat.previewHint}</p>

      <div className="mt-3">
        <StatGrid>
          <StatCard label={t.postFormat.statsChars} value={stats.chars.toLocaleString()} />
          <StatCard label={t.postFormat.statsWords} value={stats.words.toLocaleString()} />
          <StatCard label={t.postFormat.statsParagraphs} value={stats.paragraphs} />
        </StatGrid>
        {stats.postLimit != null && stats.postLimit > 0 ? (
          <p
            className={cn(
              "mt-3 text-sm font-medium",
              stats.overLimit ? "text-rose-300" : "text-teal-200",
            )}
          >
            {stats.overLimit
              ? `${t.postFormat.overLimit} ${Math.abs(stats.remaining ?? 0).toLocaleString()}`
              : `${t.postFormat.remaining}: ${(stats.remaining ?? 0).toLocaleString()}`}
          </p>
        ) : null}
      </div>

      <div className="mt-3 min-w-0">
        <FormattedTextPreview value={result} minRows={8} formatKey={previewKey} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          onClick={onCopy}
          icon={Copy}
          label={copied ? t.postFormat.copiedResult : t.postFormat.copyResult}
          disabled={!result}
        />
        <ActionButton onClick={onDownload} icon={Download} label={t.postFormat.downloadResult} disabled={!result} />
        <ActionButton onClick={onApply} icon={Check} label={t.postFormat.applyResult} disabled={!result} primary />
      </div>

      {longLines.length > 0 ? (
        <div className="mt-4 border-t border-slate-800 pt-3">
          <h3 className="text-xs font-semibold text-slate-300">{t.postFormat.longLinesHeading}</h3>
          <ul className="mt-2 max-h-32 space-y-2 overflow-y-auto text-sm">
            {longLines.slice(0, 8).map((line) => (
              <li
                key={line.lineNumber}
                className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-1.5 text-rose-100"
              >
                <span className="text-[11px] font-medium text-rose-300">
                  {t.postFormat.longLine} {line.lineNumber} ({line.length})
                </span>
              </li>
            ))}
          </ul>
          {!opts.wrapLines ? (
            <button
              type="button"
              onClick={onEnableWrap}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-teal-500/40 bg-teal-600/20 px-3 py-2 text-sm text-teal-100"
            >
              <WrapText className="h-4 w-4" aria-hidden />
              {t.postFormat.wrapLines}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="mt-3 text-xs text-slate-500">{t.postFormat.noLongLines}</p>
      )}
    </section>
  );
}

function LineOptions({
  opts,
  setOpts,
  setActivePreset,
  lineMax,
  t,
}: {
  opts: FormatPostOptions;
  setOpts: React.Dispatch<React.SetStateAction<FormatPostOptions>>;
  setActivePreset: (v: FormatPostPresetId | null) => void;
  lineMax: number;
  t: ReturnType<typeof useI18n>["t"];
}) {
  return (
    <div className="mt-3 space-y-4">
      <div>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>{opts.maxLineLength ? t.postFormat.maxLineLength : t.postFormat.lineLengthOff}</span>
          {opts.maxLineLength ? (
            <span className="tabular-nums font-medium text-teal-200">{opts.maxLineLength}</span>
          ) : null}
        </div>
        <input
          type="range"
          min={0}
          max={160}
          value={opts.maxLineLength ?? 0}
          onChange={(e) => {
            setActivePreset(null);
            const v = Number(e.target.value);
            setOpts((o) => ({ ...o, maxLineLength: v < 24 ? null : v }));
          }}
          className="mt-2 h-2 w-full min-h-11 cursor-pointer accent-teal-500"
        />
      </div>
      <OptionToggle
        label={t.postFormat.wrapLines}
        checked={opts.wrapLines && opts.maxLineLength != null}
        onChange={(v) => {
          setActivePreset(null);
          setOpts((o) => ({
            ...o,
            wrapLines: v,
            maxLineLength: v && o.maxLineLength == null ? lineMax : o.maxLineLength,
          }));
        }}
      />
    </div>
  );
}

function Segmented({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
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

function LimitChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
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
      <span>{label}</span>
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