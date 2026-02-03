"use client";

import Link from "next/link";
import {
  Trophy,
  CheckCircle,
  Target,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

export default function QuizzesLearnMore() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Quizzes</h1>
          <p className="text-xl text-gray-600">
            Test your knowledge with AI-generated multiple-choice questions
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Smart Question Generation
                </h3>
                <p className="text-gray-600">
                  AI analyzes your study material and creates challenging
                  multiple-choice questions that test true understanding.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Take the Quiz
                </h3>
                <p className="text-gray-600">
                  Answer questions at your own pace. The system tracks your
                  progress and identifies areas that need more review.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Get Instant Feedback
                </h3>
                <p className="text-gray-600">
                  See detailed explanations for each answer, helping you learn
                  from mistakes and reinforce correct understanding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">
              Intelligent Questions
            </h3>
            <p className="text-gray-600">
              AI crafts questions that test comprehension, application, and
              critical thinking - not just memorization.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Target className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">
              Detailed Explanations
            </h3>
            <p className="text-gray-600">
              Every question includes comprehensive explanations for why answers
              are correct or incorrect.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your performance over time and identify which topics
              you've mastered and which need more attention.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Trophy className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">
              Adaptive Difficulty
            </h3>
            <p className="text-gray-600">
              Questions cover various difficulty levels, ensuring you're
              challenged appropriately as you learn.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-semibold"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Generate Your First Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

