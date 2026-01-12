import { Check, Sparkles, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      {/* <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SSAIGE
            </span>
          </Link>
        </div>
      </header> */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
          Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Transform your learning experience with AI-powered study tools
        </p>

        {/* Special Notice */}
        <div className="max-w-3xl mx-auto mb-12 p-6 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-green-900 mb-2">
                🎉 Free During Pilot Phase!
              </h3>
              <p className="text-green-800 leading-relaxed">
                We&apos;re currently in our research pilot phase.{" "}
                <strong>
                  All costs are being covered by our research team
                </strong>
                , so you can enjoy unlimited access to all premium features at
                absolutely no cost to you. Help us improve the platform while
                learning smarter!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier (Future) */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-gray-600" />
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600 ml-2">/ month</span>
            </div>
            <p className="text-gray-600 mb-6">
              Perfect for trying out the platform
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  5 AI-generated study sets per month
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">Basic flashcard creation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">Limited AI tutor access</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full py-3 px-6 bg-gray-100 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
            >
              Future Plan
            </button>
          </div>

          {/* Pro Tier (Currently Free) */}
          <div className="bg-linear-to-br from-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 border-4 border-purple-400 transform scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">
                FREE NOW! 🎉
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">Pro</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white line-through opacity-75">
                $9.99
              </span>
              <span className="text-white ml-2">/ month</span>
              <div className="text-2xl font-bold text-yellow-300 mt-1">
                FREE during pilot
              </div>
            </div>
            <p className="text-purple-100 mb-6">
              Most popular for serious learners
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-white">Unlimited AI study sets</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-white">
                  Advanced flashcards & quizzes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-white">24/7 AI tutor access</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-white">Multiplayer quiz games</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-white">Import from PDF, DOCX, URLs</span>
              </li>
            </ul>

            <Link
              href="/auth/signin"
              className="block w-full py-3 px-6 bg-white text-purple-600 rounded-xl font-semibold hover:bg-yellow-300 hover:text-purple-700 transition-colors text-center"
            >
              Get Started Free
            </Link>
          </div>

          {/* Enterprise Tier (Future) */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">Custom</span>
            </div>
            <p className="text-gray-600 mb-6">For schools and institutions</p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">Everything in Pro</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">Custom AI model training</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Advanced analytics & reporting
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">Dedicated support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">SSO & LMS integration</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full py-3 px-6 bg-gray-100 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-10 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Why is everything free right now?
              </h3>
              <p className="text-gray-600">
                We&apos;re conducting educational research and want your
                feedback! Our research team is covering all AI and
                infrastructure costs during the pilot phase. You get full access
                to premium features while helping us improve the platform.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                What does SSAIGE mean?
              </h3>
              <p className="text-gray-600">
                SAIGE means: &quot;Study Simplifier, AI-Gamified Education
                [application]&quot;. It is also combined words of SSI + AI +
                SIGE
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Will I have to pay later?
              </h3>
              <p className="text-gray-600">
                When the pilot phase ends, we&apos;ll introduce the pricing
                tiers shown above. However, pilot participants will receive
                special early-adopter benefits and grandfathered pricing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                What data do you collect for research?
              </h3>
              <p className="text-gray-600">
                We collect anonymized usage patterns and learning outcomes to
                improve our AI models. Your study content remains private and is
                never shared. You can opt out of research data collection in
                your settings at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
