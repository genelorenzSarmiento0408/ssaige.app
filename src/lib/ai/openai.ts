import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GeneratedNotes {
  summary: string;
  keyPoints: string[];
  topics: string[];
}

export interface GeneratedFlashcard {
  question: string;
  answer: string;
}

export interface GeneratedQuiz {
  question: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

export async function generateNotes(content: string): Promise<GeneratedNotes> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Use faster model
    messages: [
      {
        role: "system",
        content:
          "You are an expert educational assistant especially in General Biology. Generate comprehensive study notes from the provided content. Return a JSON object with: summary (string), keyPoints (array of strings), topics (array of strings).",
      },
      {
        role: "user",
        content: `Generate study notes from this content:\n\n${content}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1500, // Limit response size for faster generation
  });

  const result = JSON.parse(response.choices[0].message.content || "{}");
  console.log("AI Response:", response.choices[0].message.content);
  return result as GeneratedNotes;
}

export async function generateFlashcards(
  content: string,
  count: number = 10
): Promise<GeneratedFlashcard[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Use faster model
    messages: [
      {
        role: "system",
        content: `You are an expert at creating educational flashcards. Generate ${count} high-quality question-answer pairs from the content. Focus on key concepts, definitions, and important facts. Return a JSON object with a "flashcards" array containing objects with "question" and "answer" fields.`,
      },
      {
        role: "user",
        content: `Generate ${count} flashcards from this content:\n\n${content}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.8,
    max_tokens: 2000, // Limit response size
  });

  const result = JSON.parse(
    response.choices[0].message.content || '{"flashcards":[]}'
  );
  console.log("AI Response:", response.choices[0].message.content);
  return result.flashcards || [];
}

export async function generateQuizzes(
  content: string,
  count: number = 5
): Promise<GeneratedQuiz[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Use faster model
    messages: [
      {
        role: "system",
        content: `You are an expert at creating educational quizzes. Generate ${count} multiple-choice questions with 4 options each. Make sure distractors are plausible but clearly wrong. Return a JSON object with a "quizzes" array containing objects with: question, correctAnswer, options (array of 4 strings), and explanation fields.`,
      },
      {
        role: "user",
        content: `Generate ${count} quiz questions from this content:\n\n${content}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.8,
    max_tokens: 2500, // Limit response size
  });

  const result = JSON.parse(
    response.choices[0].message.content || '{"quizzes":[]}'
  );
  console.log("AI Response:", response.choices[0].message.content);
  return result.quizzes || [];
}

export async function chatWithTutor(
  userMessage: string,
  context: string,
  conversationHistory: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are a helpful AI tutor. You have access to the following study material context:\n\n${context}\n\nUse this context to answer questions accurately and helpfully. If the question is outside the context, still try to help but mention it's outside the provided material.`,
    },
    ...conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Use faster model
    messages,
    temperature: 0.7,
    max_tokens: 800, // Limit for faster responses
    stream: false,
  });
  console.log("AI Response:", response.choices[0].message.content);

  return (
    response.choices[0].message.content ||
    "Sorry, I could not generate a response."
  );
}
