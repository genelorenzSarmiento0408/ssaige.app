"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Trophy,
  Upload,
  Sparkles,
  FileText,
  Trash2,
} from "lucide-react";
import UserProfile from "@/components/user-profile";
import { createClient } from "@/lib/supabase/client";

interface StudyMaterial {
  id: string;
  title: string;
  source_type: string;
  created_at: string;
  user_id: string;
  is_public: boolean;
  flashcards_count?: number;
  quizzes_count?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Listen to auth state changes instead of calling getSession
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        router.push("/auth/signin");
      }
    });

    // Also check current session once
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Separate effect for data loading
  useEffect(() => {
    if (!user?.id) return;

    let mounted = true;

    const loadMaterials = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("study_materials")
        .select(
          `
        id,
        title,
        source_type,
        created_at,
        user_id,
        is_public
      `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data && mounted) {
        // Get counts for each material
        const materialsWithCounts = await Promise.all(
          data.map(async (material) => {
            const [flashcardsRes, quizzesRes] = await Promise.all([
              supabase
                .from("flashcards")
                .select("id", { count: "exact", head: true })
                .eq("material_id", material.id),
              supabase
                .from("quizzes")
                .select("id", { count: "exact", head: true })
                .eq("material_id", material.id),
            ]);

            return {
              ...material,
              flashcards_count: flashcardsRes.count || 0,
              quizzes_count: quizzesRes.count || 0,
            };
          })
        );

        if (mounted) {
          setMaterials(materialsWithCounts);
        }
      }

      if (mounted) {
        setLoading(false);
      }
    };

    loadMaterials();

    return () => {
      mounted = false;
    };
  }, [user]);

  const loadMaterials = useCallback(async () => {
    if (!user?.id) return;

    const supabase = createClient();

    const { data, error } = await supabase
      .from("study_materials")
      .select(
        `
        id,
        title,
        source_type,
        created_at,
        user_id,
        is_public
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Get counts for each material
      const materialsWithCounts = await Promise.all(
        data.map(async (material) => {
          const [flashcardsRes, quizzesRes] = await Promise.all([
            supabase
              .from("flashcards")
              .select("id", { count: "exact", head: true })
              .eq("material_id", material.id),
            supabase
              .from("quizzes")
              .select("id", { count: "exact", head: true })
              .eq("material_id", material.id),
          ]);

          return {
            ...material,
            flashcards_count: flashcardsRes.count || 0,
            quizzes_count: quizzesRes.count || 0,
          };
        })
      );

      setMaterials(materialsWithCounts);
    }
  }, [user]);

  const deleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;

    const supabase = createClient();
    await supabase.from("study_materials").delete().eq("id", id);
    loadMaterials();
  };

  const togglePrivacy = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("study_materials")
      .update({ is_public: !currentStatus })
      .eq("id", id);

    if (!error) {
      setMaterials((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_public: !currentStatus } : m))
      );
    }
  };

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

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      {/* <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SSAIGE
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-purple-600 font-semibold">
                Dashboard
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Pricing
              </Link>
            </nav>

            <UserProfile />
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Study Materials
            </h1>
            <p className="text-gray-600">
              Manage your uploaded content and AI-generated study tools
            </p>
          </div>
          <Link
            href="/upload"
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Upload className="w-5 h-5" />
            Upload New Material
          </Link>
        </div>

        {/* Materials Grid */}
        {materials.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No materials yet
            </h3>
            <p className="text-gray-600 mb-6">
              Upload your first study material to get started with AI-powered
              learning
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Upload className="w-5 h-5" />
              Upload Material
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-purple-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                      {material.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(material.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <button
                        onClick={() =>
                          togglePrivacy(material.id, material.is_public)
                        }
                        className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
                          material.is_public
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {material.is_public ? "🌐 Public" : "🔒 Private"}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMaterial(material.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-purple-900">
                      Notes
                    </p>
                  </div>
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <Brain className="w-5 h-5 text-pink-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-pink-900">
                      {material.flashcards_count || 0}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-orange-900">
                      {material.quizzes_count || 0}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/study/${material.id}/notes`}
                    className="block w-full py-2 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-lg transition-colors text-center"
                  >
                    View Notes
                  </Link>
                  <Link
                    href={`/study/${material.id}/flashcards`}
                    className="block w-full py-2 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold rounded-lg transition-colors text-center"
                  >
                    Study Flashcards
                  </Link>
                  <Link
                    href={`/study/${material.id}/quiz`}
                    className="block w-full py-2 px-4 bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold rounded-lg transition-colors text-center"
                  >
                    Take Quiz
                  </Link>
                  <Link
                    href={`/study/${material.id}/tutor`}
                    className="block w-full py-2 px-4 bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold rounded-lg transition-colors text-center"
                  >
                    Chat with Tutor
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
