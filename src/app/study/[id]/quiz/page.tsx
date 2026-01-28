"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface Quiz {
  id: string;
  question: string;
  correct_answer: string;
  options: string[];
  question_type?: "mcq" | "identification";
}

export default function QuizPage() {
  const params = useParams();
  const materialId = params.id as string;
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState(""); // For identification questions
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadQuizzes = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("quizzes")
        .select("*")
        .eq("material_id", materialId)
        .order("created_at", { ascending: true });

      if (data && mounted) {
        setQuizzes(data);
      }
      if (mounted) {
        setLoading(false);
      }
    };

    loadQuizzes();

    return () => {
      mounted = false;
    };
  }, [materialId]);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = (answerToCheck?: string) => {
    const answer = answerToCheck || selectedAnswer;
    if (!answer) return;

    // Set the selected answer if it was passed in
    if (answerToCheck) {
      setSelectedAnswer(answerToCheck);
    }

    setShowResult(true);
    
    // Check answer with case-insensitive comparison for identification questions
    // MCQ questions use exact match as options are pre-defined
    const currentQuiz = quizzes[currentIndex];
    const isCorrect =
      currentQuiz.question_type === "identification"
        ? answer.toLowerCase().trim() ===
          currentQuiz.correct_answer.toLowerCase().trim()
        : answer === currentQuiz.correct_answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < quizzes.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setTextAnswer(""); // Reset text answer for identification questions
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTextAnswer(""); // Reset text answer
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No quiz questions available</p>
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

  if (completed) {
    const percentage = Math.round((score / quizzes.length) * 100);
    return (
      <div className="min-h-screen bg-linear-to-b from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
          <div className="w-24 h-24 bg-linear-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Complete!
          </h2>
          <p className="text-6xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {percentage}%
          </p>
          <p className="text-xl text-gray-600 mb-8">
            You got {score} out of {quizzes.length} questions correct
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Try Again
            </button>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];

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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Quiz</h1>
            <p className="text-gray-600">
              Question {currentIndex + 1} / {quizzes.length}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-linear-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / quizzes.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {currentQuiz.question}
          </h2>

          {/* Conditional rendering based on question type */}
          {currentQuiz.question_type === "identification" ? (
            // Identification question: show text input
            <div className="space-y-4">
              <textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer here..."
                className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-lg disabled:bg-gray-100 disabled:cursor-not-allowed min-h-[100px] resize-y"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    textAnswer.trim() &&
                    !showResult
                  ) {
                    e.preventDefault();
                    checkAnswer(textAnswer.trim());
                  }
                }}
              />
              
              {showResult && selectedAnswer && (
                <div
                  className={`p-4 rounded-xl text-center font-semibold ${
                    selectedAnswer.toLowerCase().trim() ===
                    currentQuiz.correct_answer.toLowerCase().trim()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedAnswer.toLowerCase().trim() ===
                  currentQuiz.correct_answer.toLowerCase().trim() ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Correct!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <XCircle className="w-5 h-5" />
                        <span>Incorrect</span>
                      </div>
                      <p className="text-sm">
                        Correct answer: {currentQuiz.correct_answer}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            // MCQ question: show options as buttons
            <div className="space-y-4">
              {currentQuiz.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuiz.correct_answer;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full p-6 rounded-2xl border-2 text-left font-semibold transition-all ${
                      showCorrect
                        ? "bg-green-50 border-green-500 text-green-900"
                        : showWrong
                        ? "bg-red-50 border-red-500 text-red-900"
                        : isSelected
                        ? "bg-purple-50 border-purple-500 text-purple-900"
                        : "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                    } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          showCorrect
                            ? "bg-green-500 text-white"
                            : showWrong
                            ? "bg-red-500 text-white"
                            : isSelected
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {showWrong && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={() => {
                // For identification questions, pass the text answer to checkAnswer
                if (currentQuiz.question_type === "identification") {
                  checkAnswer(textAnswer.trim());
                } else {
                  checkAnswer();
                }
              }}
              disabled={
                currentQuiz.question_type === "identification"
                  ? !textAnswer.trim()
                  : !selectedAnswer
              }
              className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {currentIndex + 1 < quizzes.length
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
