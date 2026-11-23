export type DedupeOptions = {
  ignoreCase: boolean;
  trimLines: boolean;
  collapseSpaces: boolean;
  removeEmpty: boolean;
};

export type DedupeViewMode = "unique" | "duplicates";

export type DedupeDuplicateRow = {
  line: string;
  count: number;
  firstLineNumber: number;
};

export type DedupeStats = {
  linesBefore: number;
  linesAfter: number;
  duplicatesRemoved: number;
  emptyRemoved: number;
};

export type DedupeResult = {
  text: string;
  stats: DedupeStats;
  duplicates: DedupeDuplicateRow[];
};

export const DEFAULT_DEDUPE_OPTIONS: DedupeOptions = {
  ignoreCase: true,
  trimLines: true,
  collapseSpaces: false,
  removeEmpty: false,
};

export function dedupeText(
  source: string,
  opts: DedupeOptions,
  viewMode: DedupeViewMode = "unique",
): DedupeResult {
  const normalized = source.replace(/\r\n/g, "\n");
  const lines = normalized.length ? normalized.split("\n") : [];
  const counts = new Map<string, { line: string; count: number; firstLineNumber: number }>();
  const uniqueLines: string[] = [];

  let duplicatesRemoved = 0;
  let emptyRemoved = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i] ?? "";
    const key = comparisonKey(raw, opts);

    if (opts.removeEmpty && key.length === 0) {
      emptyRemoved += 1;
      continue;
    }

    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
      duplicatesRemoved += 1;
      continue;
    }

    const display = opts.trimLines ? raw.trim() : raw;
    counts.set(key, { line: display, count: 1, firstLineNumber: i + 1 });
    uniqueLines.push(display);
  }

  const duplicates: DedupeDuplicateRow[] = [...counts.values()]
    .filter((row) => row.count > 1)
    .sort((a, b) => a.firstLineNumber - b.firstLineNumber);

  const linesAfter = uniqueLines.length;

  const text =
    viewMode === "unique"
      ? uniqueLines.join("\n")
      : duplicates
          .map((d) => `×${d.count}  ${d.line}`)
          .join("\n");

  return {
    text,
    stats: {
      linesBefore: lines.length,
      linesAfter,
      duplicatesRemoved,
      emptyRemoved,
    },
    duplicates,
  };
}

function comparisonKey(raw: string, opts: DedupeOptions): string {
  let key = raw;
  if (opts.trimLines) key = key.trim();
  if (opts.collapseSpaces) key = key.replace(/\s+/g, " ");
  if (opts.ignoreCase) key = key.toLocaleLowerCase();
  return key;
}

/** @deprecated Use dedupeText */
export function dedupeLines(text: string, opts: Pick<DedupeOptions, "ignoreCase" | "trimLines">): string {
  return dedupeText(text, { ...DEFAULT_DEDUPE_OPTIONS, ...opts }, "unique").text;
}