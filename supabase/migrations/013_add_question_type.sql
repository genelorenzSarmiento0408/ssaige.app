-- Add question_type column to quizzes table to support different game modes
ALTER TABLE quizzes 
ADD COLUMN question_type TEXT DEFAULT 'mcq' CHECK (question_type IN ('mcq', 'identification'));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_quizzes_question_type ON quizzes(question_type);

-- Comment to explain the column
COMMENT ON COLUMN quizzes.question_type IS 'Type of question: mcq (multiple choice) or identification (fill-in-the-blank/short answer)';
