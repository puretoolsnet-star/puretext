import type { Lang } from "@/i18n/locales";

import { isStopWord } from "@/lib/text/stopwords";

export type NgramMode = 1 | 2 | 3;

export type FrequencyOptions = {
  mode: NgramMode;
  minLength: number;
  ignoreCase: boolean;
  ignoreNumbers: boolean;
  ignoreStopWords: boolean;
  minCount: number;
  search: string;
  lang: Lang;
  limit?: number;
};

export type FrequencyRow = {
  term: string;
  count: number;
  percent: number;
  maxPercent: number;
};

export type Occurrence = {
  index: number;
  line: number;
  excerpt: string;
};

function tokenize(text: string, ignoreCase: boolean): string[] {
  const raw = text.match(/[\p{L}\p{N}']+/gu) ?? [];
  return ignoreCase ? raw.map((t) => t.toLowerCase()) : raw;
}

function isNumericToken(token: string): boolean {
  return /^\d+([.,]\d+)?$/.test(token);
}

function buildNgrams(tokens: string[], size: NgramMode): string[] {
  if (tokens.length < size) return [];
  const out: string[] = [];
  for (let i = 0; i <= tokens.length - size; i++) {
    out.push(tokens.slice(i, i + size).join(" "));
  }
  return out;
}

function phraseIsAllStop(tokens: string[], lang: Lang): boolean {
  return tokens.every((t) => isStopWord(t, lang));
}

export function analyzeFrequency(text: string, opts: FrequencyOptions): FrequencyRow[] {
  let tokens = tokenize(text, opts.ignoreCase);

  if (opts.ignoreNumbers) tokens = tokens.filter((t) => !isNumericToken(t));

  const ngrams = buildNgrams(tokens, opts.mode);
  if (ngrams.length === 0) return [];

  const map = new Map<string, number>();

  for (const phrase of ngrams) {
    const parts = phrase.split(" ");
    if (parts.some((w) => w.length < opts.minLength)) continue;
    if (opts.ignoreStopWords) {
      if (opts.mode === 1 && isStopWord(parts[0]!, opts.lang)) continue;
      if (opts.mode > 1 && phraseIsAllStop(parts, opts.lang)) continue;
    }
    map.set(phrase, (map.get(phrase) ?? 0) + 1);
  }

  const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
  let rows = [...map.entries()]
    .map(([term, count]) => ({
      term,
      count,
      percent: Math.round((count / total) * 1000) / 10,
      maxPercent: 0,
    }))
    .filter((r) => r.count >= opts.minCount);

  if (opts.search.trim()) {
    const q = opts.ignoreCase ? opts.search.trim().toLowerCase() : opts.search.trim();
    rows = rows.filter((r) => (opts.ignoreCase ? r.term.toLowerCase() : r.term).includes(q));
  }

  rows.sort((a, b) => b.count - a.count || a.term.localeCompare(b.term));
  const cap = opts.limit ?? 80;
  rows = rows.slice(0, cap);

  const max = rows[0]?.percent ?? 0;
  return rows.map((r) => ({ ...r, maxPercent: max }));
}

export function findOccurrences(text: string, term: string, ignoreCase: boolean, limit = 40): Occurrence[] {
  if (!term.trim() || !text) return [];
  const flags = ignoreCase ? "giu" : "gu";
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const isPhrase = /\s/.test(term);
  const pattern = isPhrase ? escaped.replace(/\s+/g, "\\s+") : `\\b${escaped}\\b`;
  const re = new RegExp(pattern, flags);
  const out: Occurrence[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null && out.length < limit) {
    const index = m.index;
    const line = text.slice(0, index).split(/\r?\n/).length;
    const start = Math.max(0, index - 24);
    const end = Math.min(text.length, index + m[0].length + 24);
    const excerpt = `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
    out.push({ index, line, excerpt });
    if (!isPhrase && m[0].length === 0) re.lastIndex++;
  }
  return out;
}

export function buildFrequencyReportText(
  rows: FrequencyRow[],
  meta: { title: string; mode: string; generated: string; term: string; count: string; percent: string; empty: string },
): string {
  const lines = [meta.title, meta.mode, meta.generated, "", `${meta.term}\t${meta.count}\t${meta.percent}`];
  if (rows.length === 0) lines.push(meta.empty);
  else rows.forEach((r) => lines.push(`${r.term}\t${r.count}\t${r.percent}%`));
  return lines.join("\n");
}

export function buildFrequencyReportCsv(
  rows: FrequencyRow[],
  labels: { term: string; count: string; percent: string },
): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [
    `${esc(labels.term)},${esc(labels.count)},${esc(labels.percent)}`,
    ...rows.map((r) => `${esc(r.term)},${r.count},${r.percent}`),
  ].join("\n");
}