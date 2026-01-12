-- Add privacy column to study_materials table
ALTER TABLE study_materials ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false;

-- Create index for public materials
CREATE INDEX IF NOT EXISTS idx_study_materials_is_public ON study_materials(is_public);

-- Update RLS policies to allow viewing public materials
-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can view their own study materials" ON study_materials;

-- Create new SELECT policies
-- Users can view their own materials
CREATE POLICY "Users can view their own study materials" ON study_materials
  FOR SELECT USING (auth.uid() = user_id);

-- Anyone can view public materials
CREATE POLICY "Anyone can view public study materials" ON study_materials
  FOR SELECT USING (is_public = true);

-- Update flashcards RLS to allow viewing from public materials
DROP POLICY IF EXISTS "Users can view flashcards from their materials" ON flashcards;

CREATE POLICY "Users can view flashcards from accessible materials" ON flashcards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = flashcards.material_id
      AND (study_materials.user_id = auth.uid() OR study_materials.is_public = true)
    )
  );

-- Update quizzes RLS to allow viewing from public materials
DROP POLICY IF EXISTS "Users can view quizzes from their materials" ON quizzes;

CREATE POLICY "Users can view quizzes from accessible materials" ON quizzes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = quizzes.material_id
      AND (study_materials.user_id = auth.uid() OR study_materials.is_public = true)
    )
  );

-- Update chat_messages RLS to allow chatting about public materials
DROP POLICY IF EXISTS "Users can view their own chat messages" ON chat_messages;

CREATE POLICY "Users can view chat messages for accessible materials" ON chat_messages
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = chat_messages.material_id
      AND study_materials.is_public = true
    )
  );

-- Allow users to create chat messages for public materials
DROP POLICY IF EXISTS "Users can create their own chat messages" ON chat_messages;

CREATE POLICY "Users can create chat messages for accessible materials" ON chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = chat_messages.material_id
      AND (study_materials.user_id = auth.uid() OR study_materials.is_public = true)
    )
  );
