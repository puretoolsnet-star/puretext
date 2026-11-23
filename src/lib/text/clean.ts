export type EmptyLinesMode = "keep" | "removeAll" | "collapse";

export type CleanOptions = {
  trimLineEnds: boolean;
  trimWholeText: boolean;
  collapseSpaces: boolean;
  emptyLines: EmptyLinesMode;
  stripTabs: boolean;
  stripInvisible: boolean;
  stripHtml: boolean;
};

export const DEFAULT_CLEAN_OPTIONS: CleanOptions = {
  trimLineEnds: true,
  trimWholeText: true,
  collapseSpaces: true,
  emptyLines: "collapse",
  stripTabs: true,
  stripInvisible: true,
  stripHtml: false,
};

export type CleanPresetId = "full" | "html" | "spaces";

export const CLEAN_PRESETS: Record<CleanPresetId, CleanOptions> = {
  full: {
    trimLineEnds: true,
    trimWholeText: true,
    collapseSpaces: true,
    emptyLines: "collapse",
    stripTabs: true,
    stripInvisible: true,
    stripHtml: true,
  },
  html: {
    trimLineEnds: true,
    trimWholeText: true,
    collapseSpaces: true,
    emptyLines: "collapse",
    stripTabs: true,
    stripInvisible: true,
    stripHtml: true,
  },
  spaces: {
    trimLineEnds: true,
    trimWholeText: false,
    collapseSpaces: true,
    emptyLines: "collapse",
    stripTabs: true,
    stripInvisible: true,
    stripHtml: false,
  },
};

export type CleanStats = {
  charsBefore: number;
  charsAfter: number;
  linesBefore: number;
  linesAfter: number;
  charsRemoved: number;
  linesRemoved: number;
};

export type CleanResult = {
  text: string;
  stats: CleanStats;
};

export function cleanTextWithStats(text: string, opts: CleanOptions): CleanResult {
  const charsBefore = text.length;
  const linesBefore = text.length === 0 ? 0 : text.split(/\r?\n/).length;

  let out = text;
  if (opts.stripHtml) out = stripHtmlSmart(out);
  if (opts.stripInvisible) out = removeInvisibleChars(out);
  if (opts.stripTabs) out = out.replace(/\t/g, " ");
  if (opts.collapseSpaces) out = out.replace(/[^\S\n]+/g, " ");
  if (opts.trimLineEnds) {
    out = out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .join("\n");
  }
  if (opts.emptyLines === "removeAll") {
    out = out
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .join("\n");
  } else if (opts.emptyLines === "collapse") {
    out = out.replace(/\n{3,}/g, "\n\n");
    out = out.replace(/^\s*\n+/g, "").replace(/\n+\s*$/g, "");
  }
  if (opts.trimWholeText) out = out.trim();

  const charsAfter = out.length;
  const linesAfter = out.length === 0 ? 0 : out.split(/\r?\n/).length;

  return {
    text: out,
    stats: {
      charsBefore,
      charsAfter,
      linesBefore,
      linesAfter,
      charsRemoved: Math.max(0, charsBefore - charsAfter),
      linesRemoved: Math.max(0, linesBefore - linesAfter),
    },
  };
}

/** @deprecated use cleanTextWithStats */
export function cleanText(text: string, opts: Partial<CleanOptions> = {}): string {
  const merged = { ...DEFAULT_CLEAN_OPTIONS, ...opts };
  return cleanTextWithStats(text, merged).text;
}

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  "#39": "'",
};

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (match, body: string) => {
      const key = body.toLowerCase();
      if (NAMED_ENTITIES[key] !== undefined) return NAMED_ENTITIES[key]!;
      if (key.startsWith("#x")) {
        const code = Number.parseInt(key.slice(2), 16);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      if (key.startsWith("#")) {
        const code = Number.parseInt(key.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      return match;
    })
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)));
}

const BLOCK_BREAK = /<\s*br\s*\/?>/gi;
const BLOCK_CLOSE = /<\/\s*(p|div|h[1-6]|li|tr|td|th|blockquote|section|article|header|footer)\s*>/gi;
const BLOCK_OPEN = /<\s*(p|div|h[1-6]|li|tr|blockquote|section|article)\b[^>]*>/gi;

function stripHtmlSmart(html: string): string {
  let out = html.replace(/\r\n/g, "\n");
  out = out.replace(BLOCK_BREAK, "\n");
  out = out.replace(BLOCK_CLOSE, "\n");
  out = out.replace(BLOCK_OPEN, "\n");
  out = out.replace(/<[^>]+>/g, "");
  out = decodeHtmlEntities(out);
  return out;
}

const INVISIBLE_RE = /[\u200B-\u200D\uFEFF\u2060\u180E]/g;

function removeInvisibleChars(text: string): string {
  return text.replace(/\u00A0/g, " ").replace(INVISIBLE_RE, "");
}