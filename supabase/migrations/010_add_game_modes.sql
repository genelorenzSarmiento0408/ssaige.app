-- Add game modes and enhanced multiplayer features
-- Supports: MCQ with Quizizz-style scoring, Regular MCQ, and Identification (Word Bomb style)

-- Add game_mode and scoring_type to quiz_lobbies
ALTER TABLE quiz_lobbies 
  ADD COLUMN IF NOT EXISTS game_mode TEXT NOT NULL DEFAULT 'mcq' CHECK (game_mode IN ('mcq', 'identification')),
  ADD COLUMN IF NOT EXISTS scoring_type TEXT NOT NULL DEFAULT 'regular' CHECK (scoring_type IN ('regular', 'quizizz')),
  ADD COLUMN IF NOT EXISTS time_limit INTEGER DEFAULT 20,
  ADD COLUMN IF NOT EXISTS lobby_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS max_players INTEGER DEFAULT 10;

-- Add answer timing tracking for Quizizz-style scoring
ALTER TABLE quiz_participants
  ADD COLUMN IF NOT EXISTS answers_data JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS streak INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS correct_answers INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wrong_answers INTEGER DEFAULT 0;

-- Create index for lobby codes
CREATE INDEX IF NOT EXISTS idx_quiz_lobbies_lobby_code ON quiz_lobbies(lobby_code);

-- Update RLS policies to include lobby_code queries
DROP POLICY IF EXISTS "Anyone can view public lobbies" ON quiz_lobbies;
CREATE POLICY "Anyone can view public lobbies" ON quiz_lobbies
  FOR SELECT
  USING (status = 'waiting' OR status = 'active');
