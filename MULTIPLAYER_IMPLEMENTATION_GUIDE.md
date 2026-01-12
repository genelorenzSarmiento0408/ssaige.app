# Multiplayer Game Modes Implementation Guide

## ✅ What's Been Completed

### 1. Database Migration (010_add_game_modes.sql)

- ✅ Added `game_mode` column (mcq, identification)
- ✅ Added `scoring_type` column (regular, quizizz)
- ✅ Added `time_limit` column
- ✅ Added tracking columns for answers, streaks, correct/wrong counts
- ✅ Created indexes and RLS policies

### 2. "Learn More" Feature Pages Created

- ✅ `/features/notes` - AI-Generated Notes info
- ✅ `/features/flashcards` - Smart Flashcards info
- ✅ `/features/tutor` - 24/7 AI Tutor info
- ✅ `/features/quizzes` - AI Quizzes info
- ✅ `/features/multiplayer` - Multiplayer Quizzes with game modes explained
- ✅ `/features/import` - Multi-Source Import info

### 3. Updated Multiplayer Lobby Creation

- ✅ Added game mode selection (MCQ vs Identification)
- ✅ Added scoring type selection (Quizizz vs Regular) for MCQ mode
- ✅ Added time limit configuration
- ✅ Updated UI with better modal design

## 🔧 Next Steps (For You to Complete)

### Step 1: Run Database Migrations

**Important:** You must run these migrations in order:

1. **Migration 009** - Fix foreign key constraints (if you haven't already):

```sql
-- Run in Supabase SQL Editor
-- See: supabase/migrations/009_fix_foreign_key_constraints.sql
```

2. **Migration 010** - Add game modes:

```sql
-- Run in Supabase SQL Editor
-- See: supabase/migrations/010_add_game_modes.sql
```

### Step 2: Update Multiplayer Lobby Room (`/multiplayer/[id]/page.tsx`)

The lobby room page needs to be updated to:

1. **Read game mode and scoring type from lobby data**

```typescript
interface Lobby {
  // ... existing fields
  game_mode: "mcq" | "identification";
  scoring_type: "regular" | "quizizz";
  time_limit: number;
}
```

2. **Implement MCQ Mode with Quizizz Scoring**

```typescript
// Calculate points based on speed
const calculateQuizizzScore = (
  timeLeft: number,
  timeLimit: number,
  isCorrect: boolean
) => {
  if (!isCorrect) return 0;

  const basePoints = 1000;
  const speedBonus = Math.floor((timeLeft / timeLimit) * 500);
  return basePoints + speedBonus;
};

// Track streaks
const updateStreak = (userId: string, isCorrect: boolean) => {
  if (isCorrect) {
    // Increment streak
    // Add streak bonus points (e.g., +100 per streak level)
  } else {
    // Reset streak to 0
  }
};
```

3. **Implement MCQ Mode with Regular Scoring**

```typescript
// Simple scoring: 1 point per correct answer
const calculateRegularScore = (isCorrect: boolean) => {
  return isCorrect ? 1 : 0;
};
```

4. **Implement Identification Mode (Word Bomb Style)**

```typescript
// Players type answers
// First correct answer gets the points
// Fast-paced, countdown timer
const handleIdentificationAnswer = async (answer: string) => {
  // Check if answer is correct
  // Award points to first player with correct answer
  // Move to next question
};
```

### Step 3: Update Game UI

#### For MCQ Quizizz Mode:

- Show timer countdown
- Display speed bonus indicator
- Show streak counter
- Animate points being added

#### For MCQ Regular Mode:

- Show timer countdown
- Simple correct/incorrect feedback
- Show current score

#### For Identification Mode:

- Text input field (not multiple choice buttons)
- Countdown timer with urgency animation
- First correct answer wins
- Show who answered correctly first

### Step 4: Update Leaderboard Display

Add game mode indicator and scoring details:

```typescript
<div className="lobby-info">
  <span>{lobby.game_mode === "mcq" ? "📝 MCQ" : "💣 Identification"}</span>
  {lobby.game_mode === "mcq" && (
    <span>
      {lobby.scoring_type === "quizizz" ? "🎯 Speed Scoring" : "✓ Regular"}
    </span>
  )}
  <span>⏱️ {lobby.time_limit}s per question</span>
</div>
```

### Step 5: Test Each Game Mode

1. **Test MCQ Quizizz Mode:**

   - Create lobby with MCQ + Quizizz scoring
   - Verify speed bonuses work
   - Verify streaks increment/reset correctly
   - Check leaderboard updates in real-time

2. **Test MCQ Regular Mode:**

   - Create lobby with MCQ + Regular scoring
   - Verify 1 point per correct answer
   - Check that speed doesn't affect score

3. **Test Identification Mode:**
   - Create lobby with Identification mode
   - Verify text input works
   - Verify first correct answer gets points
   - Test countdown timer

### Step 6: Fix API Routes (Already Done)

✅ All API routes now use `getUser()` instead of `getSession()`:

- `/api/chat/route.ts`
- `/api/generate/route.ts`
- `/api/upload/route.ts`

## 📋 Implementation Checklist

- [ ] Run migration 009 (fix foreign keys)
- [ ] Run migration 010 (add game modes)
- [ ] Update lobby room interface to include new fields
- [ ] Implement Quizizz scoring algorithm
- [ ] Implement Regular scoring algorithm
- [ ] Implement Identification mode UI
- [ ] Add timer countdown component
- [ ] Add streak counter display
- [ ] Update leaderboard to show game mode info
- [ ] Test all three game modes
- [ ] Update database types in `types/database.ts` if needed

## 🎮 Game Mode Formulas

### Quizizz Scoring Formula:

```
Base Points: 1000
Speed Bonus: (time_left / time_limit) * 500
Streak Bonus: streak_count * 100
Total = Base + Speed + Streak (if correct)
```

### Streak Logic:

- Correct answer: `streak = streak + 1`
- Wrong answer: `streak = 0`
- Bonus points: `streak * 100`

### Identification Mode:

- First player with correct answer: Full points (e.g., 1000)
- Other players: 0 points
- Check answers as players type (or on submit)

## 🐛 Common Issues

1. **Migration fails:**

   - Check if migration 009 was run first
   - Verify no syntax errors in SQL
   - Check Supabase logs for details

2. **Game mode not showing:**

   - Verify migration 010 ran successfully
   - Check that lobby creation includes new fields
   - Refresh database types

3. **Scoring not working:**
   - Check that `answers_data` JSONB is being updated
   - Verify streak calculation logic
   - Check realtime updates are subscribed

## 📚 Resources

- Supabase Realtime: https://supabase.com/docs/guides/realtime
- Quizizz-style scoring reference: Fast answers = more points
- Word Bomb inspiration: Type-based racing game

---

**All "Learn more" pages are now live!** Visit:

- http://localhost:3000/features/notes
- http://localhost:3000/features/flashcards
- http://localhost:3000/features/tutor
- http://localhost:3000/features/quizzes
- http://localhost:3000/features/multiplayer
- http://localhost:3000/features/import
