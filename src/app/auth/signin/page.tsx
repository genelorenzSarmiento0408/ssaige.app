"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, BookOpen, Brain, Trophy } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function SignIn() {
  const { classes } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        setMessage({
          type: "success",
          text: "Check your email to confirm your account!",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${classes.gradientFull} p-4`}
    >
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all hover:scale-[1.02]">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 ${classes.gradientPrimary} rounded-2xl mb-4 transform rotate-12 hover:rotate-0 transition-transform`}
            >
              <Sparkles className="w-8 h-8 text-white -rotate-12 hover:rotate-0 transition-transform" />
            </div>
            <h1
              className={`text-4xl font-bold ${classes.gradientFull} bg-clip-text text-transparent mb-2`}
            >
              SSAIGE
            </h1>
            <p className="text-gray-600 font-medium">
              AI-Powered Learning Platform
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div
              className={`text-center p-3 ${classes.bgPrimary50} rounded-xl`}
            >
              <BookOpen
                className={`w-6 h-6 ${classes.textPrimary600} mx-auto mb-1`}
              />
              <p className={`text-xs font-semibold ${classes.textPrimary900}`}>
                AI Notes
              </p>
            </div>
            <div
              className={`text-center p-3 ${classes.bgSecondary50} rounded-xl`}
            >
              <Brain
                className={`w-6 h-6 ${classes.textSecondary600} mx-auto mb-1`}
              />
              <p
                className={`text-xs font-semibold ${classes.textSecondary900}`}
              >
                AI Tutor
              </p>
            </div>
            <div className={`text-center p-3 ${classes.bgAccent50} rounded-xl`}>
              <Trophy
                className={`w-6 h-6 ${classes.textAccent600} mx-auto mb-1`}
              />
              <p className={`text-xs font-semibold ${classes.textPrimary900}`}>
                Quizzes
              </p>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl ${classes.borderPrimary500} outline-none transition-all`}
                style={
                  {
                    "--tw-ring-color": "var(--tw-ring-opacity, 0.2)",
                  } as React.CSSProperties
                }
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl ${classes.borderPrimary500} outline-none transition-all`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${classes.gradientPrimary} text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50`}
            >
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className={`w-full text-sm text-gray-600 ${classes.hoverTextPrimary600} transition-colors mb-4`}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 ${classes.borderPrimary400} ${classes.hoverBgPrimary50} text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 hover:shadow-lg group disabled:opacity-50`}
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span
                className={`${classes.hoverTextPrimary700} transition-colors`}
              >
                Continue with Google
              </span>
            </button>

            <button
              onClick={async () => {
                setLoading(true);
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: "azure",
                  options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    scopes: "email",
                  },
                });
                if (error) {
                  setMessage({ type: "error", text: error.message });
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 hover:shadow-lg group disabled:opacity-50"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M0 0h11v11H0z" />
                <path fill="#81bc06" d="M12 0h11v11H12z" />
                <path fill="#05a6f0" d="M0 12h11v11H0z" />
                <path fill="#ffba08" d="M12 12h11v11H12z" />
              </svg>
              <span className="group-hover:text-blue-700 transition-colors">
                Continue with Microsoft
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Free during pilot phase
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            <br />
            All costs are covered by researchers during the study.
          </p>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-white text-sm font-medium mt-6 drop-shadow-lg">
          🚀 Transform your learning with AI
        </p>
      </div>
    </div>
  );
}
