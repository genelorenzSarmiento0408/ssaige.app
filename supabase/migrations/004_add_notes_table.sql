-- Create notes table for storing AI-generated summaries
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  key_points TEXT[] NOT NULL,
  topics TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_notes_material_id ON notes(material_id);

-- Enable Row Level Security (RLS)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notes
CREATE POLICY "Users can view notes from their materials" ON notes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = notes.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create notes for their materials" ON notes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = notes.material_id
      AND study_materials.user_id = auth.uid()
    )
  );
