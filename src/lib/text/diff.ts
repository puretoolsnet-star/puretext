export type DiffLineKind = "same" | "add" | "remove" | "change";

export type WordPart = { kind: "same" | "add" | "remove"; text: string };

export type DiffRow =
  | { kind: "same"; text: string }
  | { kind: "add"; text: string }
  | { kind: "remove"; text: string }
  | { kind: "change"; before: string; after: string; words: WordPart[] };

export type DiffViewMode = "lines" | "words";

export type DiffOptions = {
  ignoreCase: boolean;
  ignoreWhitespace: boolean;
  ignoreEmptyLines: boolean;
  changesOnly: boolean;
  viewMode: DiffViewMode;
};

export type DiffStats = {
  same: number;
  added: number;
  removed: number;
  changed: number;
};

export type DiffResult = {
  rows: DiffRow[];
  stats: DiffStats;
  report: string;
};

export function compareTexts(original: string, modified: string, opts: DiffOptions): DiffResult {
  const a = prepareLines(original, opts);
  const b = prepareLines(modified, opts);
  const lineRows = diffLineRows(a, b);
  const merged = mergeToChanges(lineRows, opts.viewMode);
  const rows = opts.changesOnly ? merged.filter((r) => r.kind !== "same") : merged;
  const stats = countStats(merged);
  const report = buildReport(merged, stats);
  return { rows, stats, report };
}

type LinePack = { norm: string; raw: string };

function prepareLines(text: string, opts: DiffOptions): LinePack[] {
  const raw = text.replace(/\r\n/g, "\n").split("\n");
  return raw
    .map((line) => {
      let norm = line;
      if (opts.ignoreWhitespace) norm = norm.replace(/\s+/g, " ").trim();
      if (opts.ignoreCase) norm = norm.toLocaleLowerCase();
      return { norm, raw: line };
    })
    .filter((p) => !(opts.ignoreEmptyLines && p.norm.length === 0));
}

function diffLineRows(a: LinePack[], b: LinePack[]): DiffRow[] {
  const an = a.map((x) => x.norm);
  const bn = b.map((x) => x.norm);
  const lcs = longestCommonSubsequence(an, bn);
  const out: DiffRow[] = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < a.length || j < b.length) {
    if (k < lcs.length && i < a.length && j < b.length && an[i] === lcs[k] && bn[j] === lcs[k]) {
      out.push({ kind: "same", text: a[i]!.raw });
      i++;
      j++;
      k++;
    } else if (j < b.length && (k >= lcs.length || bn[j] !== lcs[k])) {
      out.push({ kind: "add", text: b[j]!.raw });
      j++;
    } else if (i < a.length) {
      out.push({ kind: "remove", text: a[i]!.raw });
      i++;
    }
  }
  return out;
}

function mergeToChanges(rows: DiffRow[], viewMode: DiffViewMode): DiffRow[] {
  const out: DiffRow[] = [];
  let i = 0;
  while (i < rows.length) {
    const row = rows[i]!;
    if (row.kind !== "remove") {
      out.push(row);
      i++;
      continue;
    }
    const removes: string[] = [];
    while (i < rows.length && rows[i]!.kind === "remove") {
      removes.push((rows[i] as { kind: "remove"; text: string }).text);
      i++;
    }
    const adds: string[] = [];
    while (i < rows.length && rows[i]!.kind === "add") {
      adds.push((rows[i] as { kind: "add"; text: string }).text);
      i++;
    }
    const pairs = Math.min(removes.length, adds.length);
    for (let p = 0; p < pairs; p++) {
      if (viewMode === "words" && removes[p] !== adds[p]) {
        out.push({
          kind: "change",
          before: removes[p]!,
          after: adds[p]!,
          words: diffWords(removes[p]!, adds[p]!),
        });
      } else {
        out.push({ kind: "remove", text: removes[p]! });
        out.push({ kind: "add", text: adds[p]! });
      }
    }
    for (let p = pairs; p < removes.length; p++) out.push({ kind: "remove", text: removes[p]! });
    for (let p = pairs; p < adds.length; p++) out.push({ kind: "add", text: adds[p]! });
  }
  return out;
}

function diffWords(before: string, after: string): WordPart[] {
  const a = before.split(/(\s+)/).filter((x) => x.length > 0);
  const b = after.split(/(\s+)/).filter((x) => x.length > 0);
  const lcs = longestCommonSubsequence(a, b);
  const parts: WordPart[] = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < a.length || j < b.length) {
    if (k < lcs.length && i < a.length && j < b.length && a[i] === lcs[k] && b[j] === lcs[k]) {
      parts.push({ kind: "same", text: a[i]! });
      i++;
      j++;
      k++;
    } else if (j < b.length && (k >= lcs.length || b[j] !== lcs[k])) {
      parts.push({ kind: "add", text: b[j]! });
      j++;
    } else if (i < a.length) {
      parts.push({ kind: "remove", text: a[i]! });
      i++;
    }
  }
  return parts;
}

function countStats(rows: DiffRow[]): DiffStats {
  let same = 0;
  let added = 0;
  let removed = 0;
  let changed = 0;
  for (const r of rows) {
    if (r.kind === "same") same++;
    else if (r.kind === "add") added++;
    else if (r.kind === "remove") removed++;
    else changed++;
  }
  return { same, added, removed, changed };
}

function buildReport(rows: DiffRow[], stats: DiffStats): string {
  const lines: string[] = [
    `--- PureText diff ---`,
    `same: ${stats.same} | added: ${stats.added} | removed: ${stats.removed} | changed: ${stats.changed}`,
    "",
  ];
  for (const r of rows) {
    if (r.kind === "same") lines.push(`  ${r.text}`);
    else if (r.kind === "add") lines.push(`+ ${r.text}`);
    else if (r.kind === "remove") lines.push(`- ${r.text}`);
    else lines.push(`~ - ${r.before}\n~ + ${r.after}`);
  }
  return lines.join("\n");
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (a[i] === b[j]) dp[i]![j] = dp[i + 1]![j + 1]! + 1;
      else dp[i]![j] = Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    }
  }
  const result: string[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      result.push(a[i]!);
      i++;
      j++;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) i++;
    else j++;
  }
  return result;
}

/** @deprecated */
export type DiffLine = { kind: "same" | "add" | "remove"; text: string };

export function diffLines(original: string, modified: string, opts: Pick<DiffOptions, "ignoreCase" | "ignoreWhitespace">): DiffLine[] {
  const { rows } = compareTexts(original, modified, {
    ...opts,
    ignoreEmptyLines: false,
    changesOnly: false,
    viewMode: "lines",
  });
  return rows
    .filter((r): r is DiffRow & { kind: "same" | "add" | "remove" } => r.kind !== "change")
    .map((r) => ({ kind: r.kind, text: "text" in r ? r.text : "" }));
}