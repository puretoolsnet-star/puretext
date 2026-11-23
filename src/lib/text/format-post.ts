export type ParagraphGap = "double" | "single";
export type ParagraphSplitMode = "sentences" | "chars";

export type FormatPostOptions = {
  splitMode: ParagraphSplitMode;
  sentencesPerParagraph: number;
  charsPerParagraph: number;
  gap: ParagraphGap;
  maxLineLength: number | null;
  wrapLines: boolean;
  postCharLimit: number | null;
};

export type FormatPostPresetId = "feed" | "medium" | "compact";

export const FORMAT_POST_PRESETS: Record<FormatPostPresetId, Partial<FormatPostOptions>> = {
  feed: {
    splitMode: "sentences",
    sentencesPerParagraph: 2,
    gap: "double",
    maxLineLength: 120,
    wrapLines: true,
  },
  medium: {
    splitMode: "sentences",
    sentencesPerParagraph: 3,
    gap: "double",
    maxLineLength: 88,
    wrapLines: true,
  },
  compact: {
    splitMode: "chars",
    charsPerParagraph: 320,
    gap: "single",
    maxLineLength: 72,
    wrapLines: true,
  },
};

export const DEFAULT_FORMAT_POST_OPTIONS: FormatPostOptions = {
  splitMode: "sentences",
  sentencesPerParagraph: 2,
  charsPerParagraph: 400,
  gap: "double",
  maxLineLength: 120,
  wrapLines: true,
  postCharLimit: null,
};

export type LongLine = { lineNumber: number; length: number; text: string };

export type FormatPostStats = {
  chars: number;
  words: number;
  paragraphs: number;
  postLimit: number | null;
  overLimit: boolean;
  remaining: number | null;
};

export type FormatPostResult = {
  text: string;
  stats: FormatPostStats;
  longLines: LongLine[];
};

export function formatPostText(source: string, opts: FormatPostOptions): FormatPostResult {
  const normalized = source.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return emptyResult(opts.postCharLimit);
  }

  const sentences = splitSentences(normalized);
  const rawParagraphs =
    opts.splitMode === "sentences"
      ? groupSentences(sentences, Math.max(1, Math.min(5, opts.sentencesPerParagraph)))
      : groupByCharBudget(sentences, Math.max(80, opts.charsPerParagraph));

  const gap = opts.gap === "double" ? "\n\n" : "\n";
  let body = rawParagraphs.join(gap);

  if (opts.wrapLines && opts.maxLineLength && opts.maxLineLength > 20) {
    body = rawParagraphs.map((p) => wrapParagraph(p, opts.maxLineLength!)).join(gap);
  }

  const stats = computeStats(body, opts.postCharLimit, rawParagraphs.length);
  const longLines = findLongLines(body, opts.maxLineLength);

  return { text: body, stats, longLines };
}

function emptyResult(limit: number | null): FormatPostResult {
  return {
    text: "",
    stats: { chars: 0, words: 0, paragraphs: 0, postLimit: limit, overLimit: false, remaining: limit },
    longLines: [],
  };
}

export function splitSentences(text: string): string[] {
  const parts = text.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/gu) ?? [];
  const trimmed = parts.map((s) => s.trim()).filter((s) => s.length > 0);
  if (trimmed.length > 0) return trimmed;
  return text.trim() ? [text.trim()] : [];
}

function groupSentences(sentences: string[], per: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += per) {
    out.push(sentences.slice(i, i + per).join(" "));
  }
  return out;
}

function groupByCharBudget(sentences: string[], budget: number): string[] {
  const out: string[] = [];
  let bucket: string[] = [];
  let len = 0;
  for (const s of sentences) {
    const extra = bucket.length ? 1 + s.length : s.length;
    if (len + extra > budget && bucket.length > 0) {
      out.push(bucket.join(" "));
      bucket = [s];
      len = s.length;
    } else {
      bucket.push(s);
      len += extra;
    }
  }
  if (bucket.length) out.push(bucket.join(" "));
  return out.length ? out : [sentences.join(" ")];
}

function wrapParagraph(paragraph: string, max: number): string {
  const lines = paragraph.split("\n");
  return lines.map((line) => wrapLine(line.trim(), max)).join("\n");
}

function wrapLine(line: string, max: number): string {
  if (line.length <= max) return line;
  const words = line.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (candidate.length <= max) {
      current = candidate;
      continue;
    }
    if (current) out.push(current);
    if (w.length > max) {
      out.push(...chunkWord(w, max));
      current = "";
    } else {
      current = w;
    }
  }
  if (current) out.push(current);
  return out.join("\n");
}

function chunkWord(word: string, max: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < word.length; i += max) chunks.push(word.slice(i, i + max));
  return chunks;
}

function computeStats(text: string, postLimit: number | null, paragraphs: number): FormatPostStats {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const overLimit = postLimit != null && postLimit > 0 && chars > postLimit;
  const remaining = postLimit != null && postLimit > 0 ? postLimit - chars : null;
  return { chars, words, paragraphs, postLimit: postLimit, overLimit, remaining };
}

export function findLongLines(text: string, max: number | null): LongLine[] {
  if (!max || max < 1 || !text) return [];
  const lines = text.split("\n");
  return lines
    .map((line, i) => ({ lineNumber: i + 1, length: line.length, text: line }))
    .filter((l) => l.length > max);
}