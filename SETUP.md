# SSAIGE 🚀

AI-Gamified Education Application for transforming study materials into powerful learning tools.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth (Google & Email)
- **Database**: Supabase (PostgreSQL)
- **AI**: GPT-4 (OpenAI)
- **Icons**: Lucide React
- **Vector Storage**: pgvector for embeddings

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher installed
- **npm** or **pnpm** package manager
- A **Supabase** account (free tier works)
- An **OpenAI API** key

---

## Step-by-Step Setup Guide

### Step 1: Clone and Install Dependencies

```bash
# Navigate to project directory
cd c:\Users\Sarmi\dev-files\school\ssaige

# Install all dependencies
npm install
```

**Expected Output**: You should see packages being installed. This may take 2-3 minutes.

---

### Step 2: Create Supabase Project

1. **Go to** [supabase.com](https://supabase.com) and sign in
2. **Click** "New Project"
3. **Enter**:
   - Project Name: `ssaige` (or your preferred name)
   - Database Password: (generate a strong password and save it)
   - Region: Choose closest to your location
4. **Click** "Create new project"
5. **Wait** ~2 minutes for project to initialize

---

### Step 3: Get Supabase Credentials

1. **In your Supabase project**, go to **Project Settings** (gear icon) → **API**
2. **Copy these values** (you'll need them in Step 5):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJhbG...`)
   - **service_role key** (starts with `eyJhbG...`) - keep this secret!

---

### Step 4: Get OpenAI API Key

1. **Go to** [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Click** "Create new secret key"
3. **Name it**: "SSAIGE Development"
4. **Copy** the key immediately (you won't see it again!)

---

### Step 5: Configure Environment Variables

1. **Create** a new file named `.env.local` in the project root:

```bash
# In PowerShell
New-Item -Path .env.local -ItemType File
```

2. **Open** `.env.local` and paste this template:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Replace** the placeholder values with your actual credentials from Steps 3 and 4
4. **Save** the file

**⚠️ Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

---

### Step 6: Set Up Database Schema

1. **In Supabase Dashboard**, go to **SQL Editor** (in left sidebar)
2. **Click** "New Query"
3. **Open** `supabase/migrations/001_initial_schema.sql` from your project
4. **Copy** the entire SQL content
5. **Paste** into the Supabase SQL Editor
6. **Click** "Run" (or press F5)
7. **Verify**: You should see "Success. No rows returned"

**Repeat for additional migrations in order:**

- Run `002_add_material_chunks.sql`
- Run `004_add_notes_table.sql`
- Run `006_add_study_materials_privacy.sql`
- Run `007_auto_create_profile_on_signup.sql` (IMPORTANT for authentication)
- Run `008_fix_profile_creation_trigger.sql` (Fixes profile creation issues)
- Run `009_fix_foreign_key_constraints.sql` (Fixes database constraints)
- Run `010_add_game_modes.sql` (Adds multiplayer game modes)
- Run `011_fix_rls_recursion.sql` (CRITICAL: Fixes infinite recursion in quiz lobbies)
- Run `012_add_anonymous_participants.sql` (Allows non-registered users to join lobbies)

**To verify tables were created:**

1. Go to **Table Editor** in Supabase
2. You should see tables: `profiles`, `study_materials`, `material_chunks`, `flashcards`, `quizzes`, `quiz_lobbies`, `notes`, etc.

---

### Step 7: Enable Supabase Authentication Providers

1. **In Supabase Dashboard**, go to **Authentication** → **Providers**

2. **Enable Email provider**:

   - Toggle "Email" to ON
   - Disable "Confirm email" for development (optional)

3. **Enable Google OAuth** (recommended):

   - Click on "Google"
   - Toggle to ON
   - Follow instructions to get Google Client ID and Secret:
     - Go to [Google Cloud Console](https://console.cloud.google.com/)
     - Create a project
     - Enable Google+ API
     - Create OAuth 2.0 credentials
     - Add authorized redirect: Copy from Supabase (looks like `https://xxxxx.supabase.co/auth/v1/callback`)
   - Paste Client ID and Client Secret in Supabase
   - Click Save

4. **Enable Microsoft Azure AD** (optional):
   - Click on "Azure" in Providers list
   - Toggle to ON
   - Follow instructions to get Azure AD credentials:
     - Go to [Azure Portal](https://portal.azure.com/)
     - Navigate to Azure Active Directory → App registrations
     - Click "New registration"
     - Name: "SSAIGE"
     - Add redirect URI: Copy from Supabase (the callback URL shown)
     - After creating, copy:
       - **Application (client) ID**
       - **Directory (tenant) ID**
     - Go to Certificates & secrets → New client secret
     - Copy the secret value immediately
   - Paste all three values in Supabase Azure configuration
   - Click Save

---

### Step 8: Configure Site URL

1. **In Supabase**, go to **Authentication** → **URL Configuration**
2. **Set**:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Add `http://localhost:3000/**`
3. **Click** Save

---

### Step 9: Enable pgvector Extension (for AI embeddings)

1. **In Supabase**, go to **Database** → **Extensions**
2. **Search** for "vector"
3. **Enable** the `vector` extension
4. **Click** "Enable"

This allows storing and querying AI embeddings for the RAG system.

---

### Step 10: Run the Development Server

```bash
npm run dev
```

**Expected Output**:

```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in X.Xs
```

---

### Step 11: Test the Application

1. **Open your browser** and go to [http://localhost:3000](http://localhost:3000)
2. **You should see** the SSAIGE homepage
3. **Click** "Sign In" or "Get Started"
4. **Sign up** with:
   - Email/Password, OR
   - Google OAuth (if configured)
5. **After signing in**, you should see the dashboard

---

### Step 12: Verify Everything Works

**Test each feature:**

1. **Dashboard** (`/dashboard`):

   - Should load your study materials (empty at first)
   - No infinite loading loops

2. **Upload** (`/upload`):

   - Try uploading a PDF or creating content
   - Check if it appears in dashboard

3. **Study Modes**:

   - Click on a study material
   - Test Flashcards, Notes, Quiz, and Tutor tabs

4. **Multiplayer** (`/multiplayer`):
   - Create a quiz lobby
   - Share the lobby code

---

## Troubleshooting

### Problem: "Invalid API key" error

**Solution**:

- Check that `OPENAI_API_KEY` in `.env.local` is correct
- Make sure there are no extra spaces or quotes
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Problem: "Failed to fetch" or database errors

**Solution**:

- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that all migrations ran successfully in SQL Editor
- Make sure Supabase project is not paused (free tier pauses after 1 week of inactivity)

### Problem: Authentication redirects not working

**Solution**:

- Verify Site URL is set to `http://localhost:3000` in Supabase Auth settings
- Check that redirect URLs include `http://localhost:3000/**`
- Clear browser cookies and try again

### Problem: "Cannot find module" errors

**Solution**:

```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

---

---

## Project Structure

```
ssaige/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/              # AI tutor chat endpoint
│   │   │   ├── generate/          # AI content generation
│   │   │   ├── import/            # File import endpoints
│   │   │   └── upload/            # File upload endpoint
│   │   ├── auth/
│   │   │   └── signin/            # Sign-in page (Supabase Auth)
│   │   ├── dashboard/             # User dashboard
│   │   ├── multiplayer/           # Multiplayer quiz lobbies
│   │   ├── study/[id]/            # Study material viewer
│   │   │   ├── flashcards/
│   │   │   ├── notes/
│   │   │   ├── quiz/
│   │   │   └── tutor/
│   │   ├── upload/                # Upload/import page
│   │   ├── pricing/               # Pricing page
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Homepage
│   ├── components/
│   │   ├── toast.tsx              # Toast notifications
│   │   └── user-profile.tsx       # User profile dropdown
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── embeddings.ts      # Vector embeddings
│   │   │   ├── openai.ts          # OpenAI client
│   │   │   ├── text-processing.ts # Text chunking
│   │   │   └── vector-utils.ts    # Vector operations
│   │   └── supabase/
│   │       ├── client.ts          # Client-side Supabase
│   │       └── server.ts          # Server-side Supabase
│   └── types/
│       └── database.ts            # Database type definitions
├── supabase/
│   └── migrations/                # Database migrations
├── .env.local                     # Your environment variables (git-ignored)
├── .env.example                   # Environment template
└── package.json
```

---

## Features Implemented

### ✅ Core Features

- **Authentication**: Supabase Auth with Google OAuth and Email/Password
- **Study Material Upload**: PDF, DOCX, PPTX, and text import
- **AI-Powered Study Tools**:
  - 📝 **Notes**: AI-generated comprehensive notes
  - 🎴 **Flashcards**: Spaced repetition flashcards
  - 📊 **Quizzes**: Multiple-choice quizzes with explanations
  - 🤖 **AI Tutor**: Chat with RAG-powered AI about your materials
- **Multiplayer Quizzes**: Real-time competitive quiz lobbies
- **Privacy Controls**: Public/private study materials
- **Vector Search**: Semantic search using pgvector embeddings

### 🎯 Key Technologies

- **RAG System**: Retrieval-Augmented Generation for accurate AI tutoring
- **Text Chunking**: Intelligent content splitting for embeddings
- **Real-time**: Supabase Realtime for multiplayer features
- **Type Safety**: Full TypeScript coverage with database types

---

## Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Build
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## Environment Variables Reference

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# OpenAI (Required)
OPENAI_API_KEY=sk-...
```

---

## Database Tables

### Core Tables

- **`profiles`** - User profile data linked to Supabase auth.users
- **`study_materials`** - Uploaded study content (PDFs, docs, etc.)
- **`material_chunks`** - Text chunks with vector embeddings for RAG
- **`flashcards`** - AI-generated flashcards
- **`quizzes`** - AI-generated quiz questions
- **`notes`** - User-created notes with AI assistance

### Multiplayer Tables

- **`quiz_lobbies`** - Multiplayer quiz sessions
- **`quiz_participants`** - Players in quiz lobbies

### AI Tables

- **`chat_messages`** - AI tutor conversation history

---

## Cost Note

**During the pilot/research phase, all AI and infrastructure costs are covered by the research team.** Users have free access to all premium features. See `/pricing` page for future pricing plans.

---

## Development Guidelines

### Authentication Pattern

Always use Supabase auth in client components:

```typescript
"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/signin");
        return;
      }
      setUser(session.user);
    };
    getUser();
  }, []);

  // ... rest of component
}
```

### Database Queries with RLS

Always query with user context for Row Level Security:

```typescript
const { data, error } = await supabase
  .from("study_materials")
  .select("*")
  .eq("user_id", user.id); // RLS automatically filters by user
```

### AI Integration

Use the AI utilities for consistent behavior:

```typescript
import { generateEmbedding } from "@/lib/ai/embeddings";
import { chunkText } from "@/lib/ai/text-processing";

// Chunk content before embedding
const chunks = chunkText(content);

// Generate embeddings
for (const chunk of chunks) {
  const embedding = await generateEmbedding(chunk);
  // Store in material_chunks table
}
```

---

## Common Issues and Solutions

### Issue: "User not authenticated" errors

**Solution**:

1. Check that you're calling `supabase.auth.getSession()` before queries
2. Ensure RLS policies allow the operation
3. Verify user is signed in: check Application tab → Storage → supabase.auth.token in browser DevTools

### Issue: Vector search not working

**Solution**:

1. Verify pgvector extension is enabled in Supabase
2. Check that embeddings were generated (look in `material_chunks` table)
3. Ensure embedding dimensions match (OpenAI uses 1536 dimensions)

### Issue: File upload fails

**Solution**:

1. Check file size (API routes have default 4.5MB limit)
2. Verify file type is supported (PDF, DOCX, PPTX, TXT)
3. Check browser console for specific error messages

---

## Production Deployment

### Deploy to Vercel

1. **Push code** to GitHub
2. **Import** project in Vercel
3. **Add environment variables** in Vercel dashboard
4. **Update Supabase** Site URL to your Vercel domain
5. **Deploy**

### Update Supabase for Production

1. Go to **Authentication** → **URL Configuration**
2. Update:
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: `https://your-domain.vercel.app/**`

---

## Support and Contributing

This is a research project for educational purposes.

**For issues or questions:**

- Check the troubleshooting section above
- Review error messages in browser console and terminal
- Verify all setup steps were completed

---

**Built with ❤️ for smarter learning**
