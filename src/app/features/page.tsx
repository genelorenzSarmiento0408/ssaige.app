import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Users,
  Cpu,
  ArrowLeft,
  Zap,
  Trophy,
  MessageSquare,
  FileUp,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Features — SSAIGE",
  description: "Overview of implemented features and implementation notes",
};

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Implementation
          </h1>
          <p className="text-xl text-gray-600">
            Explore all the powerful features SSAIGE has to offer
          </p>
        </div>

        {/* Feature Cards */}
        <section className="space-y-6 mb-12">
          {/* Notes Feature */}
          <Link href="/features/notes">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 group cursor-pointer my-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      AI-Generated Notes
                    </h3>
                    <p className="text-gray-600">
                      Transform any content into comprehensive study notes in
                      seconds. Upload PDFs, DOCX, PPTX, or paste URLs and let AI
                      create structured, easy-to-understand notes with key
                      concepts highlighted.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>
          </Link>

          {/* Flashcards Feature */}
          <Link href="/features/flashcards">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 group cursor-pointer my-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      Smart Flashcards
                    </h3>
                    <p className="text-gray-600">
                      AI-powered spaced repetition for maximum retention.
                      Generate targeted question-answer pairs, import from Anki
                      or Quizlet, and study with interactive flip cards
                      optimized for memory retention.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>
          </Link>

          {/* Quizzes Feature */}
          <Link href="/features/quizzes">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 group cursor-pointer my-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      AI Quizzes
                    </h3>
                    <p className="text-gray-600">
                      Test your knowledge with AI-generated multiple-choice
                      questions. Get instant feedback, detailed explanations,
                      and track your progress to identify areas that need more
                      focus.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>
          </Link>

          {/* AI Tutor Feature */}
          <Link href="/features/tutor">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 group cursor-pointer my-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      AI Tutor Chat
                    </h3>
                    <p className="text-gray-600">
                      Get personalized help from an AI tutor that knows your
                      study materials. Ask questions, clarify concepts, and
                      receive explanations tailored to your learning style and
                      pace.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>
          </Link>

          {/* Multiplayer Feature */}
          <Link href="/features/multiplayer">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 group cursor-pointer my-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="shrink-0 w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-lime-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      Multiplayer Quizzes
                    </h3>
                    <p className="text-gray-600">
                      Compete with friends in real-time quiz battles. Create
                      lobbies, invite others with a code, and race against the
                      clock to see who knows the material best with live scoring
                      and rankings.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-lime-600 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>
          </Link>

          {/* Import Feature */}
          <Link href="/features/import">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 group cursor-pointer my-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      Import & Integration
                    </h3>
                    <p className="text-gray-600">
                      Bring your existing study materials into SSAIGE. Import
                      flashcards from Anki, Quizlet, or CSV files. Upload
                      documents in multiple formats including PDF, DOCX, PPTX,
                      and more.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
              </div>
            </div>
          </Link>
        </section>

        {/* Technical Overview */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-600" />
            Technical Infrastructure
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="text-sm space-y-1">
                <li>• Next.js 14 (App Router)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• React Hooks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <ul className="text-sm space-y-1">
                <li>• Supabase Auth</li>
                <li>• PostgreSQL Database</li>
                <li>• Realtime Subscriptions</li>
                <li>• Row Level Security</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI & Processing</h3>
              <ul className="text-sm space-y-1">
                <li>• OpenAI GPT-4o-mini</li>
                <li>• Document Parsing</li>
                <li>• Vector Embeddings</li>
                <li>• Natural Language Processing</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="mt-8 text-sm text-gray-600 text-center">
          <p>Powered by AI • Built for Students • Made with ❤️</p>
        </footer>
      </div>
    </div>
  );
}
