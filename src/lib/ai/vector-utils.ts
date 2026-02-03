export function dot(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] || 0) * (b[i] || 0);
  return s;
}

export function magnitude(a: number[]) {
  return Math.sqrt(a.reduce((acc, v) => acc + (v || 0) * (v || 0), 0));
}

export function cosineSimilarity(a: number[], b: number[]) {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dot(a, b) / (magA * magB);
}

