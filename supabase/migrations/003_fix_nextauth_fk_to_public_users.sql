-- Fix NextAuth tables to reference public.users instead of auth.users
-- This migration drops and recreates the FK constraints

-- Drop existing foreign key constraints
ALTER TABLE IF EXISTS public.accounts DROP CONSTRAINT IF EXISTS accounts_user_id_fkey;
ALTER TABLE IF EXISTS public.sessions DROP CONSTRAINT IF EXISTS sessions_user_id_fkey;

-- Recreate foreign keys to reference public.users instead of auth.users
ALTER TABLE public.accounts 
  ADD CONSTRAINT accounts_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES public.users(id) 
  ON DELETE CASCADE;

ALTER TABLE public.sessions 
  ADD CONSTRAINT sessions_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES public.users(id) 
  ON DELETE CASCADE;
