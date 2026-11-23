export function formatForMessenger(text: string, maxLineLength: number): string {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";
  const paragraphs = normalized.split(/\n\s*\n/);
  const wrapped = paragraphs.map((p) => wrapParagraph(p, maxLineLength));
  return wrapped.join("\n\n");
}

function wrapParagraph(paragraph: string, max: number): string {
  const lines = paragraph.split("\n");
  return lines.map((line) => wrapLine(line.trim(), max)).join("\n");
}

function wrapLine(line: string, max: number): string {
  if (line.length <= max) return line;
  const words = line.split(/\s+/);
  const out: string[] = [];
  let current = "";
  for (const w of words) {
    const next = current ? `${current} ${w}` : w;
    if (next.length <= max) {
      current = next;
    } else {
      if (current) out.push(current);
      current = w.length > max ? breakLongWord(w, max).join("\n") : w;
      if (current.includes("\n")) {
        const parts = current.split("\n");
        out.push(...parts.slice(0, -1));
        current = parts[parts.length - 1]!;
      }
    }
  }
  if (current) out.push(current);
  return out.join("\n");
}

function breakLongWord(word: string, max: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < word.length; i += max) chunks.push(word.slice(i, i + max));
  return chunks;
}