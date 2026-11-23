export type SortDirection = "asc" | "desc" | "length-asc" | "length-desc";

export type NumberFormat = "dot" | "paren" | "zeroPad";

export type SortLinesOptions = {
  direction: SortDirection;
  ignoreCase: boolean;
  trimForLength: boolean;
  removeEmpty: boolean;
};

export type AffixOptions = {
  prefix: string;
  suffix: string;
  skipEmpty: boolean;
};

export type NumberingOptions = {
  enabled: boolean;
  start: number;
  format: NumberFormat;
  skipEmpty: boolean;
};

export type SortLinesPipelineOptions = {
  sort: SortLinesOptions;
  affix: AffixOptions;
  numbering: NumberingOptions;
};

export type SortLinesStats = {
  linesBefore: number;
  linesAfter: number;
  emptyRemoved: number;
};

export type SortLinesResult = {
  text: string;
  stats: SortLinesStats;
};

export const DEFAULT_SORT_OPTIONS: SortLinesPipelineOptions = {
  sort: {
    direction: "asc",
    ignoreCase: true,
    trimForLength: true,
    removeEmpty: false,
  },
  affix: { prefix: "", suffix: "", skipEmpty: true },
  numbering: { enabled: false, start: 1, format: "dot", skipEmpty: true },
};

export function transformSortLines(source: string, opts: SortLinesPipelineOptions, locale: string): SortLinesResult {
  const normalized = source.replace(/\r\n/g, "\n");
  const initial = normalized.length ? normalized.split("\n") : [];
  let lines = [...initial];
  let emptyRemoved = 0;

  if (opts.sort.removeEmpty) {
    const before = lines.length;
    lines = lines.filter((l) => l.trim().length > 0);
    emptyRemoved = before - lines.length;
  }

  lines = sortLineArray(lines, opts.sort, locale);
  lines = applyAffixes(lines, opts.affix);
  lines = applyNumbering(lines, opts.numbering);

  return {
    text: lines.join("\n"),
    stats: {
      linesBefore: initial.length,
      linesAfter: lines.length,
      emptyRemoved,
    },
  };
}

function sortLineArray(lines: string[], sort: SortLinesOptions, locale: string): string[] {
  const out = [...lines];
  out.sort((a, b) => compareLines(a, b, sort, locale));
  return out;
}

function compareLines(a: string, b: string, sort: SortLinesOptions, locale: string): number {
  if (sort.direction === "length-asc" || sort.direction === "length-desc") {
    const la = lineLength(a, sort.trimForLength);
    const lb = lineLength(b, sort.trimForLength);
    const diff = la - lb;
    const primary = sort.direction === "length-asc" ? diff : -diff;
    if (primary !== 0) return primary;
    return localeTextCompare(a, b, sort.ignoreCase, locale);
  }

  const cmp = localeTextCompare(a, b, sort.ignoreCase, locale);
  return sort.direction === "asc" ? cmp : -cmp;
}

function localeTextCompare(a: string, b: string, ignoreCase: boolean, locale: string): number {
  return a.localeCompare(b, locale, { sensitivity: ignoreCase ? "base" : "variant", numeric: true });
}

function lineLength(line: string, trim: boolean): number {
  return trim ? line.trim().length : line.length;
}

function applyAffixes(lines: string[], affix: AffixOptions): string[] {
  if (!affix.prefix && !affix.suffix) return lines;
  return lines.map((line) => {
    if (affix.skipEmpty && line.trim().length === 0) return line;
    return `${affix.prefix}${line}${affix.suffix}`;
  });
}

function applyNumbering(lines: string[], numbering: NumberingOptions): string[] {
  if (!numbering.enabled) return lines;

  const countable = lines.filter((l) => !(numbering.skipEmpty && l.trim().length === 0)).length;
  const padWidth = Math.max(2, String(numbering.start + Math.max(0, countable - 1)).length);

  let n = numbering.start;
  return lines.map((line) => {
    if (numbering.skipEmpty && line.trim().length === 0) return line;
    const label = formatNumberLabel(n, numbering.format, padWidth);
    n += 1;
    return `${label}${line}`;
  });
}

function formatNumberLabel(n: number, format: NumberFormat, padWidth: number): string {
  const num = format === "zeroPad" ? String(n).padStart(padWidth, "0") : String(n);
  switch (format) {
    case "paren":
      return `${num}) `;
    case "dot":
    case "zeroPad":
    default:
      return `${num}. `;
  }
}

/** @deprecated Use transformSortLines */
export type SortMode = SortDirection | "natural";

export function sortLines(text: string, mode: SortMode, locale: string): string {
  const direction: SortDirection =
    mode === "natural" || mode === "asc" ? "asc" : mode === "desc" ? "desc" : mode;
  return transformSortLines(
    text,
    {
      ...DEFAULT_SORT_OPTIONS,
      sort: { ...DEFAULT_SORT_OPTIONS.sort, direction },
    },
    locale,
  ).text;
}

export function numberLines(text: string, start = 1, separator = ". "): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const format: NumberFormat = separator.includes(")") ? "paren" : "dot";
  return applyNumbering(lines, { enabled: true, start, format, skipEmpty: false }).join("\n");
}

export function addPrefixSuffix(text: string, prefix: string, suffix: string): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  return applyAffixes(lines, { prefix, suffix, skipEmpty: false }).join("\n");
}