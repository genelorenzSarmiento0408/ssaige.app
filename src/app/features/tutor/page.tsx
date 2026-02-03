"use client";

import Link from "next/link";
import {
  Brain,
  MessageSquare,
  Sparkles,
  Search,
  ArrowLeft,
} from "lucide-react";

export default function TutorLearnMore() {
  return (
    <div className="min-h-screen bg-linear-to-br from-lime-50 via-white to-yellow-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-lime-600 hover:text-lime-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-lime-100 rounded-full mb-6">
            <Brain className="w-10 h-10 text-lime-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            24/7 AI Tutor
          </h1>
          <p className="text-xl text-gray-600">
            Your personal study assistant, trained on your materials
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-lime-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Material Understanding
                </h3>
                <p className="text-gray-600">
                  The AI tutor analyzes and deeply understands your study
                  materials using advanced RAG (Retrieval-Augmented Generation).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-lime-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ask Anything
                </h3>
                <p className="text-gray-600">
                  Type your questions naturally. The AI searches through your
                  content to provide accurate, contextual answers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-lime-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Instant Explanations
                </h3>
                <p className="text-gray-600">
                  Get clear explanations, examples, and guidance - like having a
                  tutor available whenever you need help.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <MessageSquare className="w-8 h-8 text-lime-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">
              Natural Conversation
            </h3>
            <p className="text-gray-600">
              Chat naturally like you would with a human tutor. Ask follow-up
              questions and dive deeper into topics.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Search className="w-8 h-8 text-lime-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Semantic Search</h3>
            <p className="text-gray-600">
              Finds relevant information even when you don't know the exact
              words used in your materials.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Brain className="w-8 h-8 text-lime-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Context-Aware</h3>
            <p className="text-gray-600">
              Remembers your conversation history to provide coherent,
              contextually relevant answers.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Sparkles className="w-8 h-8 text-lime-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Always Available</h3>
            <p className="text-gray-600">
              Study at 3 AM? No problem. Your AI tutor is available 24/7, ready
              to help whenever you need it.
            </p>
          </div>
        </div>

        {/* Example Questions */}
        <div className="bg-linear-to-r from-lime-50 to-yellow-50 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Example Questions:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-lime-600 mr-2">•</span>
              "Can you explain this concept in simpler terms?"
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 mr-2">•</span>
              "What's the difference between X and Y?"
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 mr-2">•</span>
              "Give me an example of how this works in practice"
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 mr-2">•</span>
              "What are the key takeaways from this chapter?"
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-lime-600 text-white rounded-full hover:bg-lime-700 transition-colors font-semibold"
          >
            <Brain className="w-5 h-5 mr-2" />
            Start Chatting with AI Tutor
          </Link>
        </div>
      </div>
    </div>
  );
}
