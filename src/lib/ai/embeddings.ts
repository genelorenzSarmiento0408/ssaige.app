import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function embedTexts(texts: string[]): Promise<number[][]> {
  // Use OpenAI embeddings API (batched)
  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  // The response data maps 1:1 with inputs
  return res.data.map((item) => item.embedding as number[]);
}

export async function embedText(text: string): Promise<number[]> {
  const [v] = await embedTexts([text]);
  return v;
}

