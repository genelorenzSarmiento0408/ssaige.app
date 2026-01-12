"use client";

import Link from "next/link";
import { Zap, Brain, Clock, Repeat, ArrowLeft } from "lucide-react";

export default function FlashcardsLearnMore() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-6">
            <Zap className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Flashcards
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered spaced repetition for maximum retention
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Smart Generation
                </h3>
                <p className="text-gray-600">
                  AI analyzes your study material and creates targeted
                  question-answer pairs optimized for memory retention.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Interactive Study
                </h3>
                <p className="text-gray-600">
                  Flip through cards, test yourself, and mark difficult concepts
                  for focused review.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Import from Anywhere
                </h3>
                <p className="text-gray-600">
                  Already have flashcards? Import from Anki, Quizlet, or Excel
                  sheets to combine with AI-generated cards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <Brain className="w-8 h-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">AI-Optimized</h3>
            <p className="text-gray-600">
              Questions are crafted to test understanding, not just
              memorization, using proven learning science.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Repeat className="w-8 h-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Spaced Repetition</h3>
            <p className="text-gray-600">
              Review cards at optimal intervals to move knowledge from
              short-term to long-term memory.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Clock className="w-8 h-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Quick Review</h3>
            <p className="text-gray-600">
              Perfect for studying on the go - review anywhere, anytime, on any
              device.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Zap className="w-8 h-8 text-pink-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Import Ready</h3>
            <p className="text-gray-600">
              Seamlessly import from Anki, Quizlet, or spreadsheets to enhance
              your existing flashcard sets.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors font-semibold"
          >
            <Zap className="w-5 h-5 mr-2" />
            Create Your First Flashcard Set
          </Link>
        </div>
      </div>
    </div>
  );
}
