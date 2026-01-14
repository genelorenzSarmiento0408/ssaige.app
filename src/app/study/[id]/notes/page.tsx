"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

interface Notes {
  id: string;
  summary: string;
  key_points: string[];
  topics: string[];
  created_at: string;
}

interface Material {
  id: string;
  title: string;
}

export default function NotesPage() {
  const params = useParams();
  const router = useRouter();
  const materialId = params.id as string;

  const [notes, setNotes] = useState<Notes | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();

        // Fetch material
        const { data: materialData, error: materialError } = await supabase
          .from("study_materials")
          .select("id, title")
          .eq("id", materialId)
          .single();

        if (materialError) throw materialError;
        setMaterial(materialData);

        // Fetch notes
        const { data: notesData, error: notesError } = await supabase
          .from("notes")
          .select("*")
          .eq("material_id", materialId)
          .single();

        if (notesError) {
          if (notesError.code === "PGRST116") {
            setError(
              "Notes not generated yet. Please wait for AI generation to complete."
            );
          } else {
            throw notesError;
          }
        } else {
          setNotes(notesData);
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [materialId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <h1 className="text-2xl font-bold ">
              <span>📝</span>
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Study Notes
              </span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">{error}</p>
            <Link
              href={`/dashboard`}
              className="text-yellow-600 hover:text-yellow-700 underline mt-2 inline-block"
            >
              Return to Dashboard
            </Link>
          </div>
        )}

        {material && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {material.title}
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>AI-Generated Study Notes</span>
            </div>
          </div>
        )}

        {notes && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{notes.summary}</p>
            </div>

            {/* Key Points Card */}
            {notes.key_points && notes.key_points.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Points
                </h3>
                <ul className="space-y-3">
                  {notes.key_points.map((point, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Topics Card */}
            {notes.topics && notes.topics.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {notes.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href={`/study/${materialId}/flashcards`}
            className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-semibold"
          >
            Study Flashcards
          </Link>
          <Link
            href={`/study/${materialId}/quiz`}
            className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors text-center font-semibold"
          >
            Take Quiz
          </Link>
        </div>
      </main>
    </div>
  );
}
