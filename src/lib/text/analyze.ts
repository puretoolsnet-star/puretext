export type TextStats = {
  charsWithSpaces: number;
  charsNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  avgWordLength: number;
  readMinutes: number;
  readSeconds: number;
  speakMinutes: number;
  speakSeconds: number;
};

const READ_WPM = 200;
const SPEAK_WPM = 130;

export function analyzeText(text: string): TextStats {
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const sentences =
    trimmed.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g)?.filter((s) => s.trim().length > 0).length ?? 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0;
  const lines = text.length === 0 ? 0 : text.split(/\r?\n/).length;
  const tokens = trimmed.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? [];
  const avgWordLength =
    tokens.length === 0 ? 0 : Math.round((tokens.reduce((a, w) => a + w.length, 0) / tokens.length) * 10) / 10;

  const readSeconds = words === 0 ? 0 : Math.max(1, Math.round((words / READ_WPM) * 60));
  const readMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / READ_WPM));

  const speakSeconds = words === 0 ? 0 : Math.max(1, Math.round((words / SPEAK_WPM) * 60));
  const speakMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / SPEAK_WPM));

  return {
    charsWithSpaces,
    charsNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    avgWordLength,
    readMinutes,
    readSeconds,
    speakMinutes,
    speakSeconds,
  };
}

export type WordCount = { word: string; count: number };

export function wordFrequency(text: string, limit = 40): WordCount[] {
  const tokens = text.toLowerCase().match(/[\p{L}\p{N}']{2,}/gu) ?? [];
  const map = new Map<string, number>();
  for (const t of tokens) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}

export function formatDuration(
  minutes: number,
  seconds: number,
  labels: { min: string; sec: string },
): string {
  if (seconds <= 0) return `0 ${labels.sec}`;
  if (seconds < 60) return `~${seconds} ${labels.sec}`;
  if (minutes === 1 && seconds < 90) return `~${seconds} ${labels.sec}`;
  return `~${minutes} ${labels.min}`;
}

export type LimitState = {
  limit: number | null;
  remaining: number | null;
  exceeded: boolean;
  percent: number;
};

export function charLimitState(charsWithSpaces: number, limit: number | null): LimitState {
  if (!limit || limit <= 0) {
    return { limit: null, remaining: null, exceeded: false, percent: 0 };
  }
  const remaining = limit - charsWithSpaces;
  const exceeded = remaining < 0;
  const percent = Math.min(100, Math.round((charsWithSpaces / limit) * 100));
  return { limit, remaining, exceeded, percent };
}