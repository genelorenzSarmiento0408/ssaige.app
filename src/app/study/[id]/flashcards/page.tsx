"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const params = useParams();
  const materialId = params.id as string;
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadFlashcards = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("flashcards")
        .select("*")
        .eq("material_id", materialId)
        .order("created_at", { ascending: true });

      if (data && mounted) {
        setFlashcards(data);
      }
      if (mounted) {
        setLoading(false);
      }
    };

    loadFlashcards();

    return () => {
      mounted = false;
    };
  }, [materialId]);
  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No flashcards available</p>
          <Link
            href="/dashboard"
            className="text-purple-600 hover:underline mt-4 inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h1>
          <p className="text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full h-96 cursor-pointer perspective-1000"
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 backface-hidden flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-purple-600 mb-4">
                  QUESTION
                </p>
                <p className="text-2xl text-center text-gray-900">
                  {currentCard.question}
                </p>
                <p className="text-sm text-gray-500 mt-8">
                  Click to reveal answer
                </p>
              </div>

              {/* Back */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 backface-hidden rotate-y-180 flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-purple-200 mb-4">
                  ANSWER
                </p>
                <p className="text-2xl text-center text-white">
                  {currentCard.answer}
                </p>
                <p className="text-sm text-purple-200 mt-8">
                  Click to see question
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevCard}
            disabled={flashcards.length <= 1}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
          >
            <RotateCw className="w-5 h-5" />
            Flip Card
          </button>

          <button
            onClick={nextCard}
            disabled={flashcards.length <= 1}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-linear-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
