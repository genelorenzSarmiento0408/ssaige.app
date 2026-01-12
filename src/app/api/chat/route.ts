import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { chatWithTutor } from "@/lib/ai/openai";
import { embedText } from "@/lib/ai/embeddings";
import { cosineSimilarity } from "@/lib/ai/vector-utils";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user (secure method)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const { message, materialId } = await req.json();

    if (!message || !materialId) {
      return NextResponse.json(
        { error: "Message and material ID required" },
        { status: 400 }
      );
    }

    // Fetch the study material for context
    const { data: material } = await supabase
      .from("study_materials")
      .select("content")
      .eq("id", materialId)
      .eq("user_id", userId)
      .single();

    if (!material) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    // Fetch recent conversation history
    const { data: history } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("material_id", materialId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    const conversationHistory = (history || []).reverse();

    // Get AI response with type assertion for material content
    // RAG: retrieve nearest chunks by embedding similarity and use as context
    let context = material.content as string;
    try {
      const queryEmbedding = await embedText(message);

      const { data: chunks } = await supabase
        .from("material_chunks")
        .select("chunk_text, embedding")
        .eq("material_id", materialId);

      if (chunks && chunks.length > 0) {
        type ChunkRow = {
          chunk_text: string;
          embedding: number[] | string | null;
        };
        const scored = (chunks as ChunkRow[])
          .map((c) => {
            const emb: number[] = Array.isArray(c.embedding)
              ? (c.embedding as number[])
              : c.embedding
              ? JSON.parse(String(c.embedding))
              : [];
            return {
              chunk: c.chunk_text,
              score: cosineSimilarity(queryEmbedding, emb),
            };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        context = scored.map((s) => s.chunk).join("\n\n");
      }
    } catch (err) {
      console.error("RAG retrieval error:", err);
      // fallback to whole material content
      context = material.content as string;
    }

    const aiResponse = await chatWithTutor(
      message,
      context,
      conversationHistory as { role: "user" | "assistant"; content: string }[]
    );

    // Store both messages in database (auto-save)
    await supabase.from("chat_messages").insert([
      {
        user_id: userId,
        material_id: materialId,
        role: "user",
        content: message,
      },
      {
        user_id: userId,
        material_id: materialId,
        role: "assistant",
        content: aiResponse,
      },
    ]);

    return NextResponse.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to chat with tutor" },
      { status: 500 }
    );
  }
}
