"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Users, Plus, Play, Trophy, Clock } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

interface Lobby {
  id: string;
  material_id: string;
  host_id: string;
  lobby_code: string;
  max_players: number;
  status: string;
  created_at: string;
  current_question_index?: number;
  updated_at?: string;
  study_materials: {
    title: string;
  };
  quiz_participants: {
    id: string;
  }[];
}

export default function MultiplayerPage() {
  const { colors } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [materials, setMaterials] = useState<{ id: string; title: string }[]>(
    []
  );
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [lobbyCode, setLobbyCode] = useState("");
  const [gameMode, setGameMode] = useState<"mcq" | "identification">("mcq");
  const [scoringType, setScoringType] = useState<"regular" | "quizizz">(
    "quizizz"
  );
  const [timeLimit, setTimeLimit] = useState(20);
  const supabase = createClient();

  useEffect(() => {
    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        setUser(null);
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
  }, [supabase.auth]);

  const loadLobbies = useCallback(async () => {
    const { data } = await supabase
      .from("quiz_lobbies")
      .select(
        `
        *,
        study_materials(title),
        quiz_participants(id)
      `
      )
      .eq("status", "waiting")
      .order("created_at", { ascending: false });

    if (data) {
      setLobbies(data as Lobby[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Stable callback, doesn't need supabase in deps

  useEffect(() => {
    // Load data regardless of authentication status
    let mounted = true;

    const loadData = async () => {
      // Load lobbies (available to everyone)
      const { data: lobbiesData } = await supabase
        .from("quiz_lobbies")
        .select(
          `
        *,
        study_materials(title),
        quiz_participants(id)
      `
        )
        .eq("status", "waiting")
        .order("created_at", { ascending: false });

      if (lobbiesData && mounted) {
        setLobbies(lobbiesData as Lobby[]);
      }
    };

    loadData();

    // Setup realtime subscription
    const channel = supabase
      .channel("quiz_lobbies")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "quiz_lobbies",
        },
        () => {
          loadLobbies();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount, user changes handled separately

  // Load materials when user becomes available
  useEffect(() => {
    if (user) {
      const loadMaterials = async () => {
        const { data: materialsData } = await supabase
          .from("study_materials")
          .select("id, title")
          .eq("user_id", user.id);

        if (materialsData) {
          setMaterials(materialsData);
        }
      };
      loadMaterials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const generateLobbyCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createLobby = async () => {
    if (!selectedMaterial || !user) return;

    const code = generateLobbyCode();

    const { data: lobby, error } = await supabase
      .from("quiz_lobbies")
      .insert({
        material_id: selectedMaterial,
        host_id: user.id,
        lobby_code: code,
        max_players: maxPlayers,
        status: "waiting",
        game_mode: gameMode,
        scoring_type: scoringType,
        time_limit: timeLimit,
      })
      .select()
      .single();

    if (!error && lobby) {
      // Join the lobby as host
      await supabase.from("quiz_participants").insert({
        lobby_id: lobby.id,
        user_id: user.id,
        score: 0,
      });

      router.push(`/multiplayer/${lobby.id}`);
    }

    setShowCreateModal(false);
  };

  const joinLobby = async (lobbyId: string) => {
    // If user is authenticated, check if already in lobby and add them
    if (user) {
      // Check if already in lobby
      const { data: existing } = await supabase
        .from("quiz_participants")
        .select("id")
        .eq("lobby_id", lobbyId)
        .eq("user_id", user.id)
        .single();

      if (!existing) {
        await supabase.from("quiz_participants").insert({
          lobby_id: lobbyId,
          user_id: user.id,
          score: 0,
        });
      }
    }

    // Redirect to lobby (both authenticated and anonymous users)
    router.push(`/multiplayer/${lobbyId}`);
  };

  const joinByCode = async () => {
    const { data: lobby } = await supabase
      .from("quiz_lobbies")
      .select("id")
      .eq("lobby_code", lobbyCode.toUpperCase())
      .eq("status", "waiting")
      .single();

    if (lobby) {
      joinLobby(lobby.id);
    } else {
      alert("Lobby not found or already started");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-${colors.primary}-50 via-${colors.secondary}-50 to-${colors.accent}-50`}>
      {/* Header */}
      <header className="">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {user && (
              <Link
                href="/dashboard"
                className={`text-${colors.primary}-600 hover:text-${colors.primary}-700 font-semibold`}
              >
                ← Back to Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-${colors.primary}-600 to-${colors.secondary}-600 rounded-2xl mb-4`}>
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 bg-linear-to-r from-${colors.primary}-600 via-${colors.secondary}-600 to-${colors.accent}-500 bg-clip-text text-transparent`}>
            Multiplayer Quiz Lobbies
          </h1>
          <p className="text-gray-600 text-lg">
            Compete with friends in real-time quizzes
          </p>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {user && (
            <button
              onClick={() => setShowCreateModal(true)}
              className={`flex items-center justify-center gap-3 bg-linear-to-r from-${colors.primary}-600 to-${colors.secondary}-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              <Plus className="w-5 h-5" />
              Create New Lobby
            </button>
          )}
          <div className={`flex gap-2 ${!user ? "md:col-span-2" : ""}`}>
            <input
              type="text"
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
              placeholder="Enter lobby code"
              className={`flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-${colors.primary}-500 focus:outline-none uppercase`}
              maxLength={6}
            />
            <button
              onClick={joinByCode}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Join
            </button>
          </div>
        </div>

        {/* Lobbies List */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Available Lobbies</h2>
          {lobbies.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">
                No active lobbies. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {lobbies.map((lobby) => (
                <div
                  key={lobby.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className={`w-5 h-5 text-${colors.primary}-600`} />
                        <h3 className="text-xl font-bold">
                          {(
                            lobby.study_materials as unknown as {
                              title: string;
                            }
                          )?.title || "Quiz Lobby"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {lobby.quiz_participants?.length || 0} /{" "}
                          {lobby.max_players} players
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(lobby.created_at).toLocaleTimeString()}
                        </span>
                        <span className={`font-mono font-semibold text-${colors.primary}-600`}>
                          {lobby.lobby_code}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => joinLobby(lobby.id)}
                      className={`flex items-center gap-2 px-6 py-3 bg-linear-to-r from-${colors.primary}-600 to-${colors.secondary}-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                    >
                      <Play className="w-5 h-5" />
                      Join Lobby
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Lobby Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Create Quiz Lobby</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Study Material
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-${colors.primary}-500 focus:outline-none`}
                >
                  <option value="">Choose material...</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Game Mode
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setGameMode("mcq")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      gameMode === "mcq"
                        ? `border-${colors.primary}-600 bg-${colors.primary}-50`
                        : `border-gray-200 hover:border-${colors.primary}-300`
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">
                      Multiple Choice Questions
                    </div>
                    <div className="text-sm text-gray-600">
                      Answer MCQ questions with different scoring options
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameMode("identification")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      gameMode === "identification"
                        ? `border-${colors.primary}-600 bg-${colors.primary}-50`
                        : `border-gray-200 hover:border-${colors.primary}-300`
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">
                      Identification (Word Bomb Style) 💣
                    </div>
                    <div className="text-sm text-gray-600">
                      Type answers quickly before time runs out
                    </div>
                  </button>
                </div>
              </div>

              {gameMode === "mcq" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Scoring System
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setScoringType("quizizz")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        scoringType === "quizizz"
                          ? `border-${colors.primary}-600 bg-${colors.primary}-50`
                          : `border-gray-200 hover:border-${colors.primary}-300`
                      }`}
                    >
                      <div className="font-semibold text-gray-900 mb-1">
                        Quizizz Style 🎯
                      </div>
                      <div className="text-sm text-gray-600">
                        Speed bonuses, streaks, more points for faster answers
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setScoringType("regular")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        scoringType === "regular"
                          ? `border-${colors.primary}-600 bg-${colors.primary}-50`
                          : `border-gray-200 hover:border-${colors.primary}-300`
                      }`}
                    >
                      <div className="font-semibold text-gray-900 mb-1">
                        Regular Scoring ✓
                      </div>
                      <div className="text-sm text-gray-600">
                        Simple 1 point per correct answer
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Limit per Question (seconds)
                </label>
                <input
                  type="number"
                  min="10"
                  max="60"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-${colors.primary}-500 focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Players
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-${colors.primary}-500 focus:outline-none`}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createLobby}
                  disabled={!selectedMaterial}
                  className={`flex-1 px-6 py-3 bg-linear-to-r from-${colors.primary}-600 to-${colors.secondary}-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

