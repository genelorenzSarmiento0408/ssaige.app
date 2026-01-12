// Text preprocessing utilities for AI
export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/[^\S\n]+/g, " ") // Remove extra spaces but keep newlines
    .trim();
}

export function chunkText(text: string, maxChunkSize: number = 2000): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function extractKeyTopics(text: string): string[] {
  // Simple topic extraction (can be enhanced with NLP)
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
  ]);

  const wordFreq = new Map<string, number>();

  words.forEach((word) => {
    const cleaned = word.replace(/[^a-z]/g, "");
    if (cleaned.length > 3 && !stopWords.has(cleaned)) {
      wordFreq.set(cleaned, (wordFreq.get(cleaned) || 0) + 1);
    }
  });

  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}
