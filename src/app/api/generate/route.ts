import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  generateNotes,
  generateFlashcards,
  generateQuizzes,
  generateIdentificationQuizzes,
} from "@/lib/ai/openai";

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
    const { materialId } = await req.json();

    if (!materialId) {
      return NextResponse.json(
        { error: "Material ID required" },
        { status: 400 }
      );
    }

    // Fetch the study material
    const { data: material, error: fetchError } = await supabase
      .from("study_materials")
      .select("*")
      .eq("id", materialId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !material) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 }
      );
    }

    // Type assertion for material content
    const materialContent = material.content as string;

    // Optimize: Reduce token count by limiting content length
    const contentLimit = 8000; // ~2000 tokens
    const truncatedContent =
      materialContent.length > contentLimit
        ? materialContent.substring(0, contentLimit) + "..."
        : materialContent;

    // Generate AI content in parallel with reduced counts for faster responses
    // Generate both MCQ and identification questions for different game modes
    const [notes, flashcards, mcqQuizzes, identificationQuizzes] =
      await Promise.all([
        generateNotes(truncatedContent),
        generateFlashcards(truncatedContent, 10), // Reduced from 15
        generateQuizzes(truncatedContent, 5), // MCQ questions
        generateIdentificationQuizzes(truncatedContent, 5), // Identification questions
      ]);

    // Combine both types of quizzes
    const allQuizzes = [...mcqQuizzes, ...identificationQuizzes];

    // Store all data in parallel instead of sequentially
    const insertPromises = [];

    // Store notes in database
    if (notes && notes.summary) {
      insertPromises.push(
        supabase.from("notes").insert({
          material_id: materialId,
          summary: notes.summary,
          key_points: notes.keyPoints || [],
          topics: notes.topics || [],
        })
      );
    }

    // Store flashcards in database
    if (flashcards.length > 0) {
      const flashcardData = flashcards.map((fc) => ({
        material_id: materialId,
        question: fc.question,
        answer: fc.answer,
      }));

      insertPromises.push(supabase.from("flashcards").insert(flashcardData));
    }

    // Store quizzes in database (both MCQ and identification types)
    if (allQuizzes.length > 0) {
      const quizData = allQuizzes.map((q) => ({
        material_id: materialId,
        question: q.question,
        correct_answer: q.correctAnswer,
        options: q.options,
        question_type: q.questionType || "mcq",
      }));

      insertPromises.push(supabase.from("quizzes").insert(quizData));
    }

    // Execute all database inserts in parallel
    await Promise.all(insertPromises);

    return NextResponse.json({
      success: true,
      notes,
      flashcardsCount: flashcards.length,
      quizzesCount: allQuizzes.length,
      mcqCount: mcqQuizzes.length,
      identificationCount: identificationQuizzes.length,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate study materials" },
      { status: 500 }
    );
  }
}

