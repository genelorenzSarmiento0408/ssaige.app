# SSAIGE 🚀

An AI-Gamified Education Application that transforms study materials into powerful learning tools using GPT-4, Next.js, and Supabase.

## ✨ Features

### 🤖 AI-Powered Study Tools

- **Smart Notes Generation**: Automatically generate comprehensive summaries with key points
- **Flashcard Creation**: AI creates optimized Q&A pairs for effective memorization
- **Quiz Generation**: Get multiple-choice questions with intelligent distractors
- **AI Tutor Chat**: 24/7 intelligent tutoring with RAG (Retrieval-Augmented Generation)

### 📚 Content Import

- **Text Input**: Paste any text content directly
- **URL Fetching**: Import content from web pages
- **Multiple Formats**: Support for PDF, DOCX, PPTX (coming soon)
- **Flashcard Import**: Compatible with Anki, Quizlet exports (coming soon)

### 🎮 Gamified Learning

- **Interactive Flashcards**: Beautiful flip animations and progress tracking
- **Adaptive Quizzes**: Immediate feedback with detailed explanations
- **Progress Dashboard**: Track your study materials and performance
- **Multiplayer Quizzes**: Real-time competitive learning (coming soon)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Authentication**: NextAuth.js (Google & Microsoft OAuth)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **AI**: OpenAI GPT-5-mini
- **Real-time**: Supabase Realtime (for multiplayer features)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))
- OpenAI API key ([platform.openai.com](https://platform.openai.com))
- Google OAuth credentials ([console.cloud.google.com](https://console.cloud.google.com))
- Microsoft OAuth credentials ([portal.azure.com](https://portal.azure.com))

### Installation

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials (see `.env.example` for required variables)

3. **Set up Supabase database**

   - Go to your Supabase project → SQL Editor
   - Run the migration: `supabase/migrations/001_initial_schema.sql`
   - See SETUP.md for detailed instructions

4. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **SETUP.md**: Complete setup instructions with OAuth configuration
- **IMPLEMENTATION_SUMMARY.md**: Technical implementation details

## 🎓 Pilot Phase

**All costs are covered by researchers during the study phase!** Users get free access to all premium features including unlimited AI generation, flashcards, quizzes, and AI tutoring.

## ❓ FAQ

### Q: What does SSAIGE mean?

A: SSAIGE means: "Study Simplifier, AI-Gamified Education [application]". It is also combined words of SSI + AI + SIGE

## 📄 License

Proprietary - Research Project  
© 2025 SSAIGE Research Team

---

**Built with ❤️ for smarter, more engaging learning**
