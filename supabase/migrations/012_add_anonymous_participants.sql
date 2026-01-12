-- Add support for anonymous participants in quiz lobbies
-- Allows non-registered users to join lobbies with a nickname

-- Add nickname column for anonymous participants
ALTER TABLE quiz_participants
  ADD COLUMN IF NOT EXISTS nickname TEXT;

-- Make user_id nullable to support anonymous participants
ALTER TABLE quiz_participants
  ALTER COLUMN user_id DROP NOT NULL;

-- Add constraint: must have either user_id OR nickname
ALTER TABLE quiz_participants
  ADD CONSTRAINT user_or_nickname_required 
  CHECK (user_id IS NOT NULL OR nickname IS NOT NULL);

-- Update RLS policy to allow anonymous participants to join
DROP POLICY IF EXISTS "Users can join quiz lobbies" ON quiz_participants;

CREATE POLICY "Anyone can join quiz lobbies" ON quiz_participants
  FOR INSERT
  WITH CHECK (
    -- Authenticated users can join as themselves
    (auth.uid() = user_id AND user_id IS NOT NULL)
    OR
    -- Anonymous users can join with a nickname
    (user_id IS NULL AND nickname IS NOT NULL)
  );

-- Update SELECT policy to allow viewing anonymous participants
DROP POLICY IF EXISTS "Users can view participants" ON quiz_participants;

CREATE POLICY "Anyone can view participants in active lobbies" ON quiz_participants
  FOR SELECT
  USING (
    -- Anyone can see participants in lobbies they're viewing
    EXISTS (
      SELECT 1 FROM quiz_lobbies
      WHERE quiz_lobbies.id = lobby_id
      AND (quiz_lobbies.status IN ('waiting', 'active') OR quiz_lobbies.host_id = auth.uid())
    )
  );

-- Add index for nickname lookups
CREATE INDEX IF NOT EXISTS idx_quiz_participants_nickname ON quiz_participants(nickname) WHERE nickname IS NOT NULL;
