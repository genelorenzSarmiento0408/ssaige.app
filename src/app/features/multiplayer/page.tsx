"use client";

import Link from "next/link";
import {
  Users,
  Zap,
  Trophy,
  Clock,
  Target,
  Gamepad2,
  ArrowLeft,
} from "lucide-react";

export default function MultiplayerLearnMore() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multiplayer Quizzes
          </h1>
          <p className="text-xl text-gray-600">
            Compete with friends in real-time quiz battles
          </p>
        </div>

        {/* Game Modes */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Game Modes</h2>

          <div className="space-y-6">
            {/* MCQ Quizizz Mode */}
            <div className="border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    MCQ Mode - Quizizz Style 🎯
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Fast-paced multiple-choice questions with speed-based
                    scoring
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Scoring System:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-center">
                        <Trophy className="w-4 h-4 text-purple-600 mr-2" />
                        Base points for correct answers
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-4 h-4 text-purple-600 mr-2" />
                        Bonus points for fast answers (more time left = more
                        points)
                      </li>
                      <li className="flex items-center">
                        <Zap className="w-4 h-4 text-purple-600 mr-2" />
                        Answer streak bonuses (consecutive correct answers)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* MCQ Regular Mode */}
            <div className="border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    MCQ Mode - Regular ✓
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Classic quiz format focused on accuracy over speed
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Scoring System:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-center">
                        <Trophy className="w-4 h-4 text-blue-600 mr-2" />
                        Simple 1 point per correct answer
                      </li>
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        No speed bonuses - focus on accuracy
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-4 h-4 text-blue-600 mr-2" />
                        More time to think through each question
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Identification Mode */}
            <div className="border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Identification Mode - Word Bomb Style 💣
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Type answers quickly before time runs out
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      How It Works:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-center">
                        <Gamepad2 className="w-4 h-4 text-green-600 mr-2" />
                        See a question or prompt
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-4 h-4 text-green-600 mr-2" />
                        Type your answer before the timer expires
                      </li>
                      <li className="flex items-center">
                        <Zap className="w-4 h-4 text-green-600 mr-2" />
                        First correct answer gets the points
                      </li>
                      <li className="flex items-center">
                        <Trophy className="w-4 h-4 text-green-600 mr-2" />
                        Tests knowledge AND typing speed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">
              Real-Time Competition
            </h3>
            <p className="text-gray-600">
              See live updates as players answer questions. Watch the
              leaderboard change in real-time!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Trophy className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Leaderboards</h3>
            <p className="text-gray-600">
              Compete for the top spot! See who's the fastest and most accurate
              learner in your group.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Zap className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Engaging & Fun</h3>
            <p className="text-gray-600">
              Make studying fun and social. Challenge friends or join public
              lobbies to meet new study partners.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Gamepad2 className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Choose Your Style</h3>
            <p className="text-gray-600">
              Pick the game mode that fits your learning style - speed-based,
              accuracy-focused, or rapid typing.
            </p>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">How to Play:</h3>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <span>Create a lobby and choose your game mode</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <span>Share the lobby code with friends</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <span>Wait for players to join</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">4.</span>
              <span>Start the game and compete!</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">5.</span>
              <span>See the final results and celebrate the winner 🎉</span>
            </li>
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/multiplayer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-semibold"
          >
            <Users className="w-5 h-5 mr-2" />
            Create or Join a Multiplayer Lobby
          </Link>
        </div>
      </div>
    </div>
  );
}

