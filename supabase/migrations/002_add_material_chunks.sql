-- Create material_chunks table to store text chunks and embeddings
CREATE TABLE IF NOT EXISTS material_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES study_materials(id) ON DELETE CASCADE,
  chunk_text TEXT NOT NULL,
  embedding JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_material_chunks_material_id ON material_chunks(material_id);

-- Enable Row Level Security (RLS)
ALTER TABLE material_chunks ENABLE ROW LEVEL SECURITY;

-- RLS policies: allow users to select/insert chunks only for their own materials
CREATE POLICY "Users can view chunks for their materials" ON material_chunks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = material_chunks.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create chunks for their materials" ON material_chunks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_materials
      WHERE study_materials.id = NEW.material_id
      AND study_materials.user_id = auth.uid()
    )
  );

