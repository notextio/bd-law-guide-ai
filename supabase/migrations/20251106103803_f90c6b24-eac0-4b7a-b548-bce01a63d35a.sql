-- Create user_roles table for multi-role access system (enum already exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create tax_brackets table
CREATE TABLE IF NOT EXISTS public.tax_brackets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  min_income NUMERIC NOT NULL,
  max_income NUMERIC,
  tax_rate NUMERIC NOT NULL,
  fixed_amount NUMERIC DEFAULT 0,
  bracket_name TEXT NOT NULL,
  fiscal_year TEXT NOT NULL DEFAULT '2024-2025',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on tax_brackets (public read access)
ALTER TABLE public.tax_brackets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view tax brackets" ON public.tax_brackets;
DROP POLICY IF EXISTS "Only admins can modify tax brackets" ON public.tax_brackets;

CREATE POLICY "Anyone can view tax brackets"
ON public.tax_brackets
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify tax brackets"
ON public.tax_brackets
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert Bangladesh tax brackets for FY 2024-2025 (only if not exists)
INSERT INTO public.tax_brackets (min_income, max_income, tax_rate, fixed_amount, bracket_name, fiscal_year)
SELECT 0, 350000, 0, 0, 'Tax-free (up to 3.5 lakh)', '2024-2025'
WHERE NOT EXISTS (SELECT 1 FROM public.tax_brackets WHERE fiscal_year = '2024-2025' AND min_income = 0);

INSERT INTO public.tax_brackets (min_income, max_income, tax_rate, fixed_amount, bracket_name, fiscal_year)
SELECT 350001, 450000, 5, 0, '5% (3.5-4.5 lakh)', '2024-2025'
WHERE NOT EXISTS (SELECT 1 FROM public.tax_brackets WHERE fiscal_year = '2024-2025' AND min_income = 350001);

INSERT INTO public.tax_brackets (min_income, max_income, tax_rate, fixed_amount, bracket_name, fiscal_year)
SELECT 450001, 750000, 10, 5000, '10% (4.5-7.5 lakh)', '2024-2025'
WHERE NOT EXISTS (SELECT 1 FROM public.tax_brackets WHERE fiscal_year = '2024-2025' AND min_income = 450001);

INSERT INTO public.tax_brackets (min_income, max_income, tax_rate, fixed_amount, bracket_name, fiscal_year)
SELECT 750001, 1150000, 15, 35000, '15% (7.5-11.5 lakh)', '2024-2025'
WHERE NOT EXISTS (SELECT 1 FROM public.tax_brackets WHERE fiscal_year = '2024-2025' AND min_income = 750001);

INSERT INTO public.tax_brackets (min_income, max_income, tax_rate, fixed_amount, bracket_name, fiscal_year)
SELECT 1150001, 1650000, 20, 95000, '20% (11.5-16.5 lakh)', '2024-2025'
WHERE NOT EXISTS (SELECT 1 FROM public.tax_brackets WHERE fiscal_year = '2024-2025' AND min_income = 1150001);

INSERT INTO public.tax_brackets (min_income, max_income, tax_rate, fixed_amount, bracket_name, fiscal_year)
SELECT 1650001, NULL, 25, 195000, '25% (above 16.5 lakh)', '2024-2025'
WHERE NOT EXISTS (SELECT 1 FROM public.tax_brackets WHERE fiscal_year = '2024-2025' AND min_income = 1650001);

-- Create optimization_suggestions table
CREATE TABLE IF NOT EXISTS public.optimization_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suggestion_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  max_deduction NUMERIC,
  legal_reference TEXT NOT NULL,
  applicable_to_income_above NUMERIC DEFAULT 0,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on optimization_suggestions
ALTER TABLE public.optimization_suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view optimization suggestions" ON public.optimization_suggestions;
DROP POLICY IF EXISTS "Only admins can modify suggestions" ON public.optimization_suggestions;

CREATE POLICY "Anyone can view optimization suggestions"
ON public.optimization_suggestions
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify suggestions"
ON public.optimization_suggestions
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert common tax optimization suggestions (only if not exists)
INSERT INTO public.optimization_suggestions (suggestion_type, title, description, max_deduction, legal_reference, applicable_to_income_above, priority)
SELECT 'investment', 'Investment Tax Credit', 'Invest in approved savings certificates, stocks, or mutual funds to get up to 15% rebate on investment amount', 10000000, 'Section 44 of Income Tax Ordinance 1984, as amended by Finance Act 2024', 0, 1
WHERE NOT EXISTS (SELECT 1 FROM public.optimization_suggestions WHERE suggestion_type = 'investment');

INSERT INTO public.optimization_suggestions (suggestion_type, title, description, max_deduction, legal_reference, applicable_to_income_above, priority)
SELECT 'life_insurance', 'Life Insurance Premium Rebate', 'Life insurance premiums qualify for tax rebate up to 10% of total income or BDT 100,000 (whichever is lower)', 100000, 'Section 44(2) of Income Tax Ordinance 1984', 0, 2
WHERE NOT EXISTS (SELECT 1 FROM public.optimization_suggestions WHERE suggestion_type = 'life_insurance');

INSERT INTO public.optimization_suggestions (suggestion_type, title, description, max_deduction, legal_reference, applicable_to_income_above, priority)
SELECT 'provident_fund', 'Provident Fund Contribution', 'Recognized provident fund contributions are tax-exempt up to certain limits', 500000, 'Section 24 of Income Tax Ordinance 1984', 0, 3
WHERE NOT EXISTS (SELECT 1 FROM public.optimization_suggestions WHERE suggestion_type = 'provident_fund');

INSERT INTO public.optimization_suggestions (suggestion_type, title, description, max_deduction, legal_reference, applicable_to_income_above, priority)
SELECT 'donation', 'Charitable Donations', 'Donations to approved charitable organizations qualify for deduction', 300000, 'Section 44(6) of Income Tax Ordinance 1984', 0, 4
WHERE NOT EXISTS (SELECT 1 FROM public.optimization_suggestions WHERE suggestion_type = 'donation');

INSERT INTO public.optimization_suggestions (suggestion_type, title, description, max_deduction, legal_reference, applicable_to_income_above, priority)
SELECT 'zakat', 'Zakat Fund Deduction', 'Contributions to Zakat Fund are fully deductible from taxable income', NULL, 'Section 44(4) of Income Tax Ordinance 1984', 0, 5
WHERE NOT EXISTS (SELECT 1 FROM public.optimization_suggestions WHERE suggestion_type = 'zakat');

-- Create tax_calculations table to store historical calculations
CREATE TABLE IF NOT EXISTS public.tax_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  fiscal_year TEXT NOT NULL,
  total_income NUMERIC NOT NULL,
  taxable_income NUMERIC NOT NULL,
  total_tax NUMERIC NOT NULL,
  deductions_applied JSONB DEFAULT '[]',
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on tax_calculations
ALTER TABLE public.tax_calculations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own calculations" ON public.tax_calculations;
DROP POLICY IF EXISTS "Users can insert their own calculations" ON public.tax_calculations;

CREATE POLICY "Users can view their own calculations"
ON public.tax_calculations
FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'tax_consultant') OR public.has_role(auth.uid(), 'auditor'));

CREATE POLICY "Users can insert their own calculations"
ON public.tax_calculations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create fraud_alerts table for anomaly detection
CREATE TABLE IF NOT EXISTS public.fraud_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on fraud_alerts
ALTER TABLE public.fraud_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view alerts about themselves" ON public.fraud_alerts;
DROP POLICY IF EXISTS "System can insert fraud alerts" ON public.fraud_alerts;
DROP POLICY IF EXISTS "Auditors can update alerts" ON public.fraud_alerts;

CREATE POLICY "Users can view alerts about themselves"
ON public.fraud_alerts
FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'auditor') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert fraud alerts"
ON public.fraud_alerts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Auditors can update alerts"
ON public.fraud_alerts
FOR UPDATE
USING (public.has_role(auth.uid(), 'auditor') OR public.has_role(auth.uid(), 'admin'));