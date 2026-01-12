"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Users,
  Play,
  Sparkles,
  Loader2,
  Trophy,
  Crown,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

interface Participant {
  id: string;
  user_id: string | null;
  nickname: string | null;
  score: number;
  profiles?: {
    name: string;
    email: string;
  } | null;
}

interface Lobby {
  id: string;
  material_id: string;
  host_id: string;
  lobby_code: string;
  max_players: number;
  status: string;
  study_materials: {
    title: string;
  };
}

export default function LobbyRoomPage() {
  const params = useParams();
  const router = useRouter();
  const lobbyId = params?.id as string;

  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousNickname, setAnonymousNickname] = useState("");
  const [showNicknamePrompt, setShowNicknamePrompt] = useState(false);
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [quizzes, setQuizzes] = useState<
    Array<{
      id: string;
      question: string;
      options: string[];
      correct_answer: string;
    }>
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const supabase = createClient();

  // Helper function to get participant display name
  const getParticipantName = (participant: Participant): string => {
    if (participant.nickname) {
      return participant.nickname;
    }
    return (
      participant.profiles?.name || participant.profiles?.email || "Anonymous"
    );
  };

  // Helper function to get participant initial
  const getParticipantInitial = (participant: Participant): string => {
    const name = getParticipantName(participant);
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser({ id: session.user.id, email: session.user.email! });
        setIsAnonymous(false);
      } else {
        // Check if user has a stored anonymous nickname
        const storedNickname = localStorage.getItem(`anonymous_${lobbyId}`);
        if (storedNickname) {
          setAnonymousNickname(storedNickname);
          setIsAnonymous(true);
        } else {
          // Show nickname prompt for new anonymous users
          setShowNicknamePrompt(true);
        }
      }
    };
    getUser();
  }, [router, supabase.auth, lobbyId]);

  useEffect(() => {
    if ((user || isAnonymous) && lobbyId) {
      loadLobbyData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, lobbyId, isAnonymous]);

  // Separate effect for realtime subscription - runs once
  useEffect(() => {
    if (lobbyId) {
      const cleanup = setupRealtimeSubscription();
      return cleanup;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobbyId]);

  // Polling as backup for realtime - check lobby status every 2 seconds when in waiting room
  useEffect(() => {
    if (lobby && lobby.status === "waiting" && lobbyId) {
      const pollInterval = setInterval(async () => {
        const { data: lobbyData } = await supabase
          .from("quiz_lobbies")
          .select("status")
          .eq("id", lobbyId)
          .single();

        if (lobbyData && lobbyData.status === "active") {
          setGameStarted(true);
          loadLobbyData();
          clearInterval(pollInterval);
        } else if (lobbyData && lobbyData.status === "completed") {
          loadLobbyData();
          clearInterval(pollInterval);
        }
      }, 2000); // Poll every 2 seconds

      return () => clearInterval(pollInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby?.status, lobbyId]);

  // Separate effect for anonymous joining
  useEffect(() => {
    if (isAnonymous && anonymousNickname && lobbyId) {
      // Use a flag to prevent multiple calls
      const joinedKey = `joined_${lobbyId}_${anonymousNickname}`;
      const hasJoined = sessionStorage.getItem(joinedKey);

      if (!hasJoined) {
        joinAsAnonymous().then(() => {
          sessionStorage.setItem(joinedKey, "true");
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnonymous, anonymousNickname, lobbyId]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameStarted, selectedAnswer]);

  const loadLobbyData = async () => {
    const { data: lobbyData } = await supabase
      .from("quiz_lobbies")
      .select(
        `
        *,
        study_materials(title)
      `
      )
      .eq("id", lobbyId)
      .single();

    if (lobbyData) {
      const lobbyStatus = (lobbyData as { status: string }).status;
      setLobby(lobbyData as unknown as Lobby);

      // Set game started state based on status
      if (lobbyStatus === "active") {
        setGameStarted(true);
      } else if (lobbyStatus === "completed") {
        // Ensure game started is true so results show properly
        setGameStarted(true);
      }

      // Always load quizzes so they're available for results screen
      const { data: quizData } = await supabase
        .from("quizzes")
        .select("*")
        .eq("material_id", (lobbyData as { material_id: string }).material_id)
        .limit(10);

      if (quizData) {
        setQuizzes(quizData);
      }
    }

    const { data: participantData } = await supabase
      .from("quiz_participants")
      .select(
        `
        *,
        profiles(name, email)
      `
      )
      .eq("lobby_id", lobbyId);

    if (participantData) {
      setParticipants(participantData as unknown as Participant[]);

      // Initialize scores from participant data
      const initialScores: Record<string, number> = {};
      (participantData as unknown as Participant[]).forEach((p) => {
        const key = p.user_id || p.nickname || p.id;
        initialScores[key] = p.score || 0;
      });
      setScores(initialScores);
    }

    setLoading(false);
  };

  const setupRealtimeSubscription = () => {
    const participantsChannel = supabase
      .channel(`lobby_${lobbyId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "quiz_participants",
          filter: `lobby_id=eq.${lobbyId}`,
        },
        (payload) => {
          // Reload participant data when scores change
          loadLobbyData();

          // If it's an update, sync the score in local state immediately
          if (payload.eventType === "UPDATE" && payload.new) {
            const updatedParticipant = payload.new as Participant;
            const participantKey =
              updatedParticipant.user_id ||
              updatedParticipant.nickname ||
              updatedParticipant.id;
            setScores((prev) => ({
              ...prev,
              [participantKey]: updatedParticipant.score || 0,
            }));
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "quiz_lobbies",
          filter: `id=eq.${lobbyId}`,
        },
        async (payload) => {
          const newStatus = (payload.new as { status: string }).status;

          // Update the lobby state with new data immediately
          setLobby((prev) => (prev ? { ...prev, status: newStatus } : null));

          // Update lobby data when status changes
          if (newStatus === "active") {
            setGameStarted(true);
            // Reload to get questions and ensure everything is synced
            await loadLobbyData();
          } else if (newStatus === "completed") {
            // Reload to show final results
            await loadLobbyData();
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "quiz_lobbies",
          filter: `id=eq.${lobbyId}`,
        },
        () => {
          // Lobby was deleted, redirect to lobby list
          router.push("/multiplayer");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(participantsChannel);
    };
  };

  const copyLobbyCode = () => {
    if (lobby) {
      navigator.clipboard.writeText(lobby.lobby_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const joinAsAnonymous = async () => {
    if (!anonymousNickname || !lobbyId) return;

    // Check if already joined
    const { data: existing } = await supabase
      .from("quiz_participants")
      .select("id")
      .eq("lobby_id", lobbyId)
      .eq("nickname", anonymousNickname)
      .maybeSingle();

    if (!existing) {
      // @ts-expect-error - Database types not yet updated for nullable user_id
      await supabase.from("quiz_participants").insert({
        lobby_id: lobbyId,
        user_id: null,
        nickname: anonymousNickname,
        score: 0,
      });
    }
  };

  const handleNicknameSubmit = () => {
    if (anonymousNickname.trim().length >= 2) {
      localStorage.setItem(`anonymous_${lobbyId}`, anonymousNickname);
      setIsAnonymous(true);
      setShowNicknamePrompt(false);
      joinAsAnonymous();
    }
  };

  const startGame = async () => {
    if (user && lobby?.host_id === user.id) {
      await supabase
        .from("quiz_lobbies")
        .update({ status: "active" })
        .eq("id", lobbyId);
    }
  };

  const endGame = async () => {
    if (user && lobby?.host_id === user.id) {
      // Delete the lobby (participants will be cascade deleted)
      await supabase.from("quiz_lobbies").delete().eq("id", lobbyId);

      // Redirect to multiplayer lobby list
      router.push("/multiplayer");
    }
  };

  const handleAnswerSelect = (answer: string) => {
    // Prevent selecting if already answered or no user/anonymous session
    if (selectedAnswer !== null || (!user && !isAnonymous)) return;

    setSelectedAnswer(answer);
    const currentQuiz = quizzes[currentQuestion];

    // Track user's answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));

    // Track correct/incorrect count
    if (answer === currentQuiz.correct_answer) {
      setCorrectCount((prev) => prev + 1);

      const points = timeLeft * 10;

      // Get participant identifier (user_id for authenticated, find by nickname for anonymous)
      const participantId = user?.id || anonymousNickname;

      setScores((prev) => ({
        ...prev,
        [participantId]: (prev[participantId] || 0) + points,
      }));

      // Update score in database
      if (user) {
        supabase
          .from("quiz_participants")
          .update({
            score: (scores[user.id] || 0) + points,
          })
          .eq("lobby_id", lobbyId)
          .eq("user_id", user.id)
          .then();
      } else if (isAnonymous && anonymousNickname) {
        supabase
          .from("quiz_participants")
          .update({
            score: (scores[anonymousNickname] || 0) + points,
          })
          .eq("lobby_id", lobbyId)
          .eq("nickname", anonymousNickname)
          .then();
      }
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    setTimeout(() => handleNextQuestion(), 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(15);
    } else {
      // Game over - update status and immediately show results locally
      supabase
        .from("quiz_lobbies")
        .update({ status: "completed" })
        .eq("id", lobbyId)
        .then(() => {
          // Force reload to show results without refresh
          loadLobbyData();
        });
    }
  };

  if (!user && !isAnonymous) {
    // Show nickname prompt if anonymous user hasn't set nickname
    if (showNicknamePrompt) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Join as Guest
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Enter a nickname to join the game
            </p>
            <input
              type="text"
              value={anonymousNickname}
              onChange={(e) => setAnonymousNickname(e.target.value)}
              placeholder="Your nickname"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-purple-500 focus:outline-none"
              maxLength={20}
            />
            <button
              onClick={handleNicknameSubmit}
              disabled={anonymousNickname.trim().length < 2}
              className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Game
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!lobby) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Lobby not found</h1>
          <Link
            href="/multiplayer"
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
          >
            Back to Lobbies
          </Link>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (lobby.status === "completed") {
    const sortedParticipants = [...participants].sort(
      (a, b) => b.score - a.score
    );

    // Get current user's rank
    const currentUserId = user?.id || anonymousNickname;
    const userRank =
      sortedParticipants.findIndex(
        (p) => (p.user_id || p.nickname) === currentUserId
      ) + 1;

    return (
      <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="container mx-auto max-w-6xl py-8">
          {/* Header - No second navbar */}
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
            <p className="text-gray-600">
              {(lobby.study_materials as unknown as { title: string })?.title ||
                "Quiz"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Performance Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                Your Performance
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <span className="text-gray-700 font-semibold">Your Rank</span>
                  <span className="text-2xl font-bold text-purple-600">
                    #{userRank}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <span className="text-gray-700 font-semibold">
                    Correct Answers
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {correctCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <span className="text-gray-700 font-semibold">
                    Incorrect Answers
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {incorrectCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                  <span className="text-gray-700 font-semibold">
                    Total Score
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    {scores[currentUserId] || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Final Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Final Leaderboard
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sortedParticipants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      index === 0
                        ? "bg-linear-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400"
                        : (participant.user_id || participant.nickname) ===
                          currentUserId
                        ? "bg-purple-100 border-2 border-purple-400"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-600 w-8">
                        #{index + 1}
                      </span>
                      {index === 0 && (
                        <Crown className="w-5 h-5 text-yellow-600" />
                      )}
                      <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {getParticipantInitial(participant)}
                      </div>
                      <div>
                        <p className="font-semibold">
                          {getParticipantName(participant)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-purple-600">
                        {participant.score}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-purple-600" />
              Question Review
            </h2>
            <div className="space-y-6">
              {quizzes.map((quiz, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === quiz.correct_answer;

                return (
                  <div
                    key={quiz.id}
                    className={`p-5 rounded-xl border-2 ${
                      isCorrect
                        ? "bg-green-50 border-green-300"
                        : userAnswer
                        ? "bg-red-50 border-red-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg flex-1">
                        Question {index + 1}: {quiz.question}
                      </h3>
                      {isCorrect ? (
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <Check className="w-5 h-5" />
                          Correct
                        </div>
                      ) : userAnswer ? (
                        <div className="flex items-center gap-1 text-red-600 font-semibold">
                          <span className="text-xl">✕</span>
                          Incorrect
                        </div>
                      ) : (
                        <div className="text-gray-500 font-semibold">
                          Not Answered
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      {(quiz.options as string[]).map((option, optIndex) => {
                        const isCorrectAnswer = option === quiz.correct_answer;
                        const isUserAnswer = option === userAnswer;

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg flex items-center gap-3 ${
                              isCorrectAnswer
                                ? "bg-green-100 border-2 border-green-500 font-semibold"
                                : isUserAnswer
                                ? "bg-red-100 border-2 border-red-500"
                                : "bg-white border border-gray-200"
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-sm border">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isCorrectAnswer && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="text-red-600 text-xl">✕</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/multiplayer"
            className="block w-full py-4 text-center bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Lobbies
          </Link>
        </div>
      </div>
    );
  }

  // Game Started Screen  // Game Started Screen
  if (gameStarted && quizzes.length > 0) {
    const currentQuiz = quizzes[currentQuestion];

    return (
      <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50 p-4">
        <div className="container mx-auto max-w-4xl py-8">
          {/* Host Controls */}
          {user && lobby?.host_id === user.id && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={endGame}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                End Game
              </button>
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {(
                    lobby.study_materials as unknown as {
                      title: string;
                    }
                  )?.title || "Quiz"}
                </h2>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {quizzes.length}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">
                  {timeLeft}
                </div>
                <p className="text-xs text-gray-500">seconds</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">
                  {scores[user?.id || anonymousNickname] || 0}
                </div>
                <p className="text-xs text-gray-500">your score</p>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold mb-6">{currentQuiz.question}</h3>

            <div className="grid gap-4">
              {(currentQuiz.options as string[]).map((option, index) => {
                const isCorrect = option === currentQuiz.correct_answer;
                const isSelected = option === selectedAnswer;
                const showResult = selectedAnswer !== null;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-6 rounded-xl font-semibold text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? "bg-green-100 border-2 border-green-500 text-green-900"
                          : isSelected
                          ? "bg-red-100 border-2 border-red-500 text-red-900"
                          : "bg-gray-100 text-gray-600"
                        : "bg-gray-50 hover:bg-purple-50 hover:border-purple-300 border-2 border-gray-200"
                    } ${
                      selectedAnswer === null
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <Check className="w-6 h-6 ml-auto text-green-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Live Scores
            </h3>
            <div className="space-y-2">
              {participants
                .sort((a, b) => {
                  const aScore = scores[a.user_id || a.nickname || a.id] || 0;
                  const bScore = scores[b.user_id || b.nickname || b.id] || 0;
                  return bScore - aScore;
                })
                .map((participant) => {
                  const participantScore =
                    scores[
                      participant.user_id ||
                        participant.nickname ||
                        participant.id
                    ] || 0;
                  return (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {getParticipantInitial(participant)}
                        </div>
                        <span className="font-semibold">
                          {getParticipantName(participant)}
                        </span>
                        {participant.user_id === lobby?.host_id && (
                          <Crown className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <span className="text-purple-600 font-bold">
                        {participantScore}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Waiting Room
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SSAIGE
              </span>
            </Link>
            <div className="flex items-center gap-3">
              {user && lobby?.host_id === user.id && (
                <button
                  onClick={endGame}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  End Game
                </button>
              )}
              <Link
                href="/multiplayer"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                ← Leave Lobby
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Waiting Room */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {(
                lobby.study_materials as unknown as {
                  title: string;
                }
              )?.title || "Quiz Lobby"}
            </h1>
            <p className="text-gray-600">Waiting for players to join...</p>
          </div>

          {/* Lobby Code */}
          <div className="bg-linear-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
            <p className="text-sm text-purple-900 font-semibold mb-2 text-center">
              Lobby Code
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl font-mono font-bold text-purple-700">
                {lobby.lobby_code}
              </span>
              <button
                onClick={copyLobbyCode}
                className="p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors"
              >
                {copied ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <Copy className="w-6 h-6 text-purple-600" />
                )}
              </button>
            </div>
            <p className="text-xs text-purple-700 text-center mt-2">
              Share this code with your friends!
            </p>
          </div>

          {/* Participants */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Players ({participants.length}/{lobby.max_players})
              </h2>
            </div>
            <div className="space-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {getParticipantInitial(participant)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {getParticipantName(participant)}
                    </p>
                    {participant.profiles?.email && (
                      <p className="text-sm text-gray-500">
                        {participant.profiles.email}
                      </p>
                    )}
                    {participant.nickname && (
                      <p className="text-sm text-purple-600">
                        Anonymous Player
                      </p>
                    )}
                  </div>
                  {participant.user_id === lobby.host_id && (
                    <Crown className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Start Button (Host Only) */}
          {user && lobby.host_id === user.id ? (
            <button
              onClick={startGame}
              disabled={participants.length < 1}
              className="w-full py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {participants.length < 1
                ? "Need at least 1 player..."
                : "Start Quiz"}
            </button>
          ) : (
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-purple-900">
                Waiting for host to start the quiz...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nickname Prompt Modal for Anonymous Users */}
      {showNicknamePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Join as Guest</h2>
            <p className="text-gray-600 mb-6">
              Enter a nickname to join this quiz lobby as an anonymous player
            </p>
            <input
              type="text"
              value={anonymousNickname}
              onChange={(e) => setAnonymousNickname(e.target.value)}
              placeholder="Your nickname"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none mb-4"
              maxLength={20}
              onKeyPress={(e) => e.key === "Enter" && handleNicknameSubmit()}
            />
            <div className="flex gap-3">
              <Link
                href="/multiplayer"
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                onClick={handleNicknameSubmit}
                disabled={anonymousNickname.trim().length < 2}
                className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Lobby
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
