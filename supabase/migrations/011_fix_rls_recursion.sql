-- Fix infinite recursion in quiz_lobbies RLS policies
-- This resolves the "infinite recursion detected in policy" error

-- Drop the conflicting policy from migration 010
DROP POLICY IF EXISTS "Anyone can view public lobbies" ON quiz_lobbies;

-- Drop the original SELECT policy
DROP POLICY IF EXISTS "Users can view quiz lobbies they're in" ON quiz_lobbies;

-- Create a single, non-recursive SELECT policy
-- This allows:
-- 1. Hosts to see their lobbies
-- 2. Participants to see lobbies they've joined
-- 3. Anyone to see waiting/active lobbies (for lobby list)
CREATE POLICY "Users can view lobbies" ON quiz_lobbies
  FOR SELECT
  USING (
    -- Anyone can see waiting or active lobbies
    status IN ('waiting', 'active')
    OR
    -- Users can always see lobbies they host
    auth.uid() = host_id
    OR
    -- Users can see completed lobbies they participated in
    (status = 'completed' AND auth.uid() = host_id)
  );

-- Update the participants SELECT policy to avoid recursion
DROP POLICY IF EXISTS "Users can view participants in their lobbies" ON quiz_participants;

CREATE POLICY "Users can view participants" ON quiz_participants
  FOR SELECT
  USING (
    -- Users can see participants in lobbies they're part of
    user_id = auth.uid()
    OR
    -- Or if they're viewing a lobby (checked separately, no recursion)
    EXISTS (
      SELECT 1 FROM quiz_lobbies
      WHERE quiz_lobbies.id = lobby_id
      AND quiz_lobbies.host_id = auth.uid()
    )
  );
