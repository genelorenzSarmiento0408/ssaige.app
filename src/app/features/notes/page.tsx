"use client";

import Link from "next/link";
import { BookOpen, Sparkles, FileText, Clock, ArrowLeft } from "lucide-react";

export default function NotesLearnMore() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Generated Notes
          </h1>
          <p className="text-xl text-gray-600">
            Transform any content into comprehensive study notes in seconds
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upload Your Content
                </h3>
                <p className="text-gray-600">
                  Upload PDFs, DOCX files, PPTX presentations, or paste URLs.
                  Our system extracts and processes the content automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI Analysis
                </h3>
                <p className="text-gray-600">
                  GPT-4 analyzes your material, identifying key concepts,
                  important details, and relationships between ideas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Comprehensive Summaries
                </h3>
                <p className="text-gray-600">
                  Receive well-structured notes with headings, bullet points,
                  and clear explanations - perfect for review and retention.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Smart Summaries</h3>
            <p className="text-gray-600">
              AI identifies the most important information and creates concise,
              yet comprehensive summaries.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <FileText className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Structured Format</h3>
            <p className="text-gray-600">
              Notes are organized with clear headings, bullet points, and
              logical flow for easy studying.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Clock className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Save Time</h3>
            <p className="text-gray-600">
              What would take hours of manual note-taking is done in seconds,
              letting you focus on learning.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Multi-Format</h3>
            <p className="text-gray-600">
              Works with PDFs, Word docs, PowerPoints, web articles, and plain
              text - all your study materials in one place.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Your First Notes
          </Link>
        </div>
      </div>
    </div>
  );
}

