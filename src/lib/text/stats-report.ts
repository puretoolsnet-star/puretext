import type { TextStats, WordCount } from "@/lib/text/analyze";

export type ReportLabels = {
  title: string;
  generated: string;
  charsWithSpaces: string;
  charsNoSpaces: string;
  words: string;
  sentences: string;
  paragraphs: string;
  lines: string;
  avgWordLen: string;
  readTime: string;
  speakTime: string;
  charLimit: string;
  limitRemaining: string;
  limitExceeded: string;
  topWords: string;
  count: string;
  none: string;
};

export function buildStatsReportText(
  stats: TextStats,
  labels: ReportLabels,
  topWords: WordCount[],
  readTimeDisplay: string,
  speakTimeDisplay: string,
  limit: number | null,
  limitRemaining: number | null,
  limitExceeded: boolean,
): string {
  const lines: string[] = [
    labels.title,
    labels.generated,
    "",
    `${labels.charsWithSpaces}: ${stats.charsWithSpaces}`,
    `${labels.charsNoSpaces}: ${stats.charsNoSpaces}`,
    `${labels.words}: ${stats.words}`,
    `${labels.sentences}: ${stats.sentences}`,
    `${labels.paragraphs}: ${stats.paragraphs}`,
    `${labels.lines}: ${stats.lines}`,
    `${labels.avgWordLen}: ${stats.avgWordLength}`,
    `${labels.readTime}: ${readTimeDisplay}`,
    `${labels.speakTime}: ${speakTimeDisplay}`,
  ];
  if (limit && limit > 0) {
    const limLine = limitExceeded
      ? `${labels.limitExceeded}: ${Math.abs(limitRemaining ?? 0)}`
      : `${labels.limitRemaining}: ${limitRemaining ?? 0} / ${limit}`;
    lines.push(`${labels.charLimit} (${limit}): ${limLine}`);
  }
  lines.push("", labels.topWords);
  if (topWords.length === 0) lines.push(labels.none);
  else topWords.forEach((w) => lines.push(`  ${w.word} — ${w.count}`));
  return lines.join("\n");
}

export function buildStatsReportCsv(
  stats: TextStats,
  labels: ReportLabels,
  readTimeDisplay: string,
  speakTimeDisplay: string,
  topWords: WordCount[],
): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows: string[] = [
    "metric,value",
    `${esc(labels.charsWithSpaces)},${stats.charsWithSpaces}`,
    `${esc(labels.charsNoSpaces)},${stats.charsNoSpaces}`,
    `${esc(labels.words)},${stats.words}`,
    `${esc(labels.sentences)},${stats.sentences}`,
    `${esc(labels.paragraphs)},${stats.paragraphs}`,
    `${esc(labels.lines)},${stats.lines}`,
    `${esc(labels.avgWordLen)},${stats.avgWordLength}`,
    `${esc(labels.readTime)},${esc(readTimeDisplay)}`,
    `${esc(labels.speakTime)},${esc(speakTimeDisplay)}`,
    "",
    "word,count",
    ...topWords.map((w) => `${esc(w.word)},${w.count}`),
  ];
  return rows.join("\n");
}

export function downloadTextFile(content: string, filename: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}