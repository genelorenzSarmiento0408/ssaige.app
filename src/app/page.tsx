"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  BookOpen,
  Brain,
  Trophy,
  Upload,
  Zap,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ email: session.user.email! });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const firstName = user?.email?.split("@")[0] ?? null;

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      {/* <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SSAIGE
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Pricing
              </Link>
            </nav>

            <div>
              {!user && (
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {user
                ? `Welcome back, ${firstName || "there"}!`
                : "Welcome to SSAIGE"}
            </span>
            {user && <span className="ml-3">👋</span>}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Transform your study materials into powerful learning tools with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link
                  href="/upload"
                  className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Study Material
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  View My Materials
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/features"
                  className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Powerful AI Study Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1: AI Notes */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-100 hover:border-purple-300">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI-Generated Notes
            </h3>
            <p className="text-gray-600 mb-4">
              Automatically generate comprehensive summaries from any content.
              Save hours of note-taking.
            </p>
            <Link
              href="/features/notes"
              className="text-purple-600 font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </div>

          {/* Feature 2: Flashcards */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-pink-100 hover:border-pink-300">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Smart Flashcards
            </h3>
            <p className="text-gray-600 mb-4">
              AI creates question-answer pairs optimized for retention. Import
              from Anki, Quizlet, or sheets.
            </p>
            <Link
              href="/features/flashcards"
              className="text-pink-600 font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </div>

          {/* Feature 3: AI Tutor */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-100 hover:border-orange-300">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              24/7 AI Tutor
            </h3>
            <p className="text-gray-600 mb-4">
              Chat with an intelligent tutor trained on your materials. Get
              instant explanations and guidance.
            </p>
            <Link
              href="/features/tutor"
              className="text-orange-600 font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </div>

          {/* Feature 4: Quizzes */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-100 hover:border-green-300">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Quizzes</h3>
            <p className="text-gray-600 mb-4">
              Test yourself with auto-generated multiple-choice questions. Track
              your progress over time.
            </p>
            <Link
              href="/features/quizzes"
              className="text-green-600 font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </div>

          {/* Feature 5: Multiplayer */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-100 hover:border-blue-300">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Multiplayer Quizzes
            </h3>
            <p className="text-gray-600 mb-4">
              Compete with friends in real-time quiz battles. Make learning fun
              and engaging!
            </p>
            <Link
              href="/features/multiplayer"
              className="text-blue-600 font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </div>

          {/* Feature 6: Import */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-indigo-100 hover:border-indigo-300">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Multi-Source Import
            </h3>
            <p className="text-gray-600 mb-4">
              Upload PDFs, DOCX, PPTX, or paste URLs. We extract and process
              content automatically.
            </p>
            <Link
              href="/features/import"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Study Smarter?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            All features are completely free during our pilot phase!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-purple-900/30 backdrop-blur text-white border-2 border-white rounded-xl font-semibold hover:bg-purple-900/50 transition-all"
            >
              Learn About Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">SSAIGE</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 SSAIGE. Research pilot program.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-purple-600"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-purple-600"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-purple-600"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
