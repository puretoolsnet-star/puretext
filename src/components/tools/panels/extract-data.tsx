"use client";

import { Check, Copy, Download } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { MainTextEditor, ToolWorksplitLayout } from "@/components/tools/shared";
import { useTextSession } from "@/context/TextSessionContext";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { extractCounts, extractFromText, type ExtractKind } from "@/lib/text/extract";
import { downloadTextFile } from "@/lib/text/stats-report";

const KINDS: ExtractKind[] = ["email", "url", "number"];

export function ExtractPanel() {
  const { t } = useI18n();
  const { text, setDemoSource } = useTextSession();
  const [kind, setKind] = useState<ExtractKind>("email");
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    setDemoSource("extract");
    return () => setDemoSource("default");
  }, [setDemoSource]);

  const { items, totalMatches } = useMemo(
    () => extractFromText(text, kind, uniqueOnly),
    [text, kind, uniqueOnly],
  );

  const counts = useMemo(() => extractCounts(text, uniqueOnly), [text, uniqueOnly]);

  const listText = useMemo(() => items.join("\n"), [items]);
  const previewKey = `${kind}|${uniqueOnly}|${text.length}|${items.length}`;

  const copyAll = useCallback(async () => {
    if (!items.length) return;
    try {
      await navigator.clipboard.writeText(listText);
      setCopiedAll(true);
      window.setTimeout(() => setCopiedAll(false), 1500);
    } catch {
      /* denied */
    }
  }, [items.length, listText]);

  const copyOne = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedItem(value);
      window.setTimeout(() => setCopiedItem(null), 1200);
    } catch {
      /* denied */
    }
  }, []);

  const stamp = () => new Date().toISOString().slice(0, 10);

  const typeLabels: Record<ExtractKind, string> = {
    email: t.extractTool.types.email,
    url: t.extractTool.types.url,
    number: t.extractTool.types.number,
  };

  const quickBar = (
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-200">{t.extractTool.typeHeading}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {KINDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setKind(id)}
            className={cn(
              "min-h-11 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm",
              kind === id
                ? "border-teal-400/50 bg-teal-500/15 text-teal-100"
                : "border-slate-700 bg-slate-900 text-slate-300",
            )}
          >
            {typeLabels[id]}
            <span className="ml-1.5 tabular-nums text-teal-300/90">({counts[id]})</span>
          </button>
        ))}
      </div>
      <div className="mt-3">
        <OptionToggle
          label={t.extractTool.uniqueOnly}
          checked={uniqueOnly}
          onChange={setUniqueOnly}
        />
      </div>
    </section>
  );

  return (
    <ToolWorksplitLayout
      editor={<MainTextEditor minRows={6} />}
      quickBar={quickBar}
      result={
        <section
          key={previewKey}
          className="rounded-xl border border-teal-500/25 bg-slate-900/60 p-3 shadow-sm shadow-teal-950/30 sm:p-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-100">{t.extractTool.resultsHeading}</h2>
            <p className="text-xs text-teal-200">
              {t.extractTool.foundCount}: <span className="font-semibold tabular-nums">{items.length}</span>
              {!uniqueOnly && totalMatches > items.length ? (
                <span className="ml-2 text-slate-500">
                  ({t.extractTool.totalMatches}: {totalMatches})
                </span>
              ) : null}
            </p>
          </div>
          <p className="mt-1 text-xs text-slate-500">{t.extractTool.previewHint}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton
              onClick={() => void copyAll()}
              icon={copiedAll ? Check : Copy}
              label={copiedAll ? t.extractTool.copiedAll : t.extractTool.copyAll}
              disabled={!items.length}
            />
            <ActionButton
              onClick={() => downloadTextFile(listText, `puretext-extract-${kind}-${stamp()}.txt`)}
              icon={Download}
              label={t.extractTool.downloadResult}
              disabled={!items.length}
            />
          </div>

          {items.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">{t.extractTool.noMatches}</p>
          ) : (
            <ul className="mt-4 max-h-[min(50dvh,24rem)] space-y-2 overflow-y-auto">
              {items.map((item, index) => (
                <li
                  key={`${kind}-${index}-${item}`}
                  className="flex min-h-11 items-stretch gap-2 rounded-lg border border-slate-800 bg-slate-950/80 p-2"
                >
                  <span className="min-w-0 flex-1 break-all py-1 text-sm text-slate-100">{item}</span>
                  <button
                    type="button"
                    onClick={() => void copyOne(item)}
                    className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-teal-500/50"
                  >
                    {copiedItem === item ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-teal-400" aria-hidden />
                        {t.extractTool.copiedItem}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-teal-400" aria-hidden />
                        {t.extractTool.copyItem}
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      }
      controls={
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
          <p className="text-xs leading-relaxed text-slate-500">{t.extractTool.footerHint}</p>
        </section>
      }
    />
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
        "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 sm:flex-none sm:text-sm",
        "hover:border-teal-500/50 disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-teal-400" aria-hidden />
      <span className="truncate">{label}</span>
    </button>
  );
}