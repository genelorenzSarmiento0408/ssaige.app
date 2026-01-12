-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create study_materials table
CREATE TABLE IF NOT EXISTS study_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('pdf', 'pptx', 'docx', 'url', 'text', 'flashcards')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create quiz_lobbies table for multiplayer quizzes
CREATE TABLE IF NOT EXISTS quiz_lobbies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed')),
  current_question_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create quiz_participants table
CREATE TABLE IF NOT EXISTS quiz_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lobby_id UUID NOT NULL REFERENCES quiz_lobbies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(lobby_id, user_id)
);

-- Create chat_messages table for AI tutor conversations
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_study_materials_user_id ON study_materials(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_material_id ON flashcards(material_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_material_id ON quizzes(material_id);
CREATE INDEX IF NOT EXISTS idx_quiz_lobbies_host_id ON quiz_lobbies(host_id);
CREATE INDEX IF NOT EXISTS idx_quiz_participants_lobby_id ON quiz_participants(lobby_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_material_id ON chat_messages(material_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for study_materials
CREATE POLICY "Users can view their own study materials" ON study_materials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study materials" ON study_materials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study materials" ON study_materials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study materials" ON study_materials
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for flashcards
CREATE POLICY "Users can view flashcards from their materials" ON flashcards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = flashcards.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create flashcards for their materials" ON flashcards
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = flashcards.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

-- Create RLS policies for quizzes (similar to flashcards)
CREATE POLICY "Users can view quizzes from their materials" ON quizzes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = quizzes.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create quizzes for their materials" ON quizzes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = quizzes.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

-- Create RLS policies for quiz lobbies
CREATE POLICY "Users can view quiz lobbies they're in" ON quiz_lobbies
  FOR SELECT USING (
    auth.uid() = host_id OR
    EXISTS (
      SELECT 1 FROM quiz_participants
      WHERE quiz_participants.lobby_id = quiz_lobbies.id
      AND quiz_participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create quiz lobbies" ON quiz_lobbies
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their lobbies" ON quiz_lobbies
  FOR UPDATE USING (auth.uid() = host_id);

-- Create RLS policies for quiz participants
CREATE POLICY "Users can view participants in their lobbies" ON quiz_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_lobbies
      WHERE quiz_lobbies.id = quiz_participants.lobby_id
      AND (quiz_lobbies.host_id = auth.uid() OR quiz_participants.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can join quiz lobbies" ON quiz_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for chat messages
CREATE POLICY "Users can view their own chat messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON study_materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_lobbies_updated_at BEFORE UPDATE ON quiz_lobbies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
