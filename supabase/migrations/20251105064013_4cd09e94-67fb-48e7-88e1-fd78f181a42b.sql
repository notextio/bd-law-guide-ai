-- Add TIN and financial fields to existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS tin_number TEXT,
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS annual_income DECIMAL(15, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS tax_due DECIMAL(15, 2) DEFAULT 0;

-- Add unique constraint on TIN
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_tin_number_key;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_tin_number_key UNIQUE (tin_number);

-- Add TIN length check
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS tin_length;

ALTER TABLE public.profiles 
ADD CONSTRAINT tin_length CHECK (tin_number IS NULL OR char_length(tin_number) = 12);

-- Update the handle_new_user function to include TIN
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, tin_number, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'tin_number',
    new.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (user_id) DO UPDATE
  SET 
    tin_number = EXCLUDED.tin_number,
    full_name = EXCLUDED.full_name;
  RETURN new;
END;
$$;