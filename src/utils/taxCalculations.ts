// Tax calculation utilities for Bangladesh tax system

export interface TaxBracket {
  id?: string;
  min_income: number;
  max_income: number | null;
  tax_rate: number;
  fixed_amount: number;
  bracket_name: string;
}

export interface TaxCalculationResult {
  totalIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  breakdown: {
    bracket: string;
    amount: number;
    tax: number;
  }[];
}

/**
 * Calculate tax based on Bangladesh tax brackets
 */
export const calculateTax = (
  income: number,
  brackets: TaxBracket[]
): TaxCalculationResult => {
  const sortedBrackets = [...brackets].sort((a, b) => a.min_income - b.min_income);
  
  let remainingIncome = income;
  let totalTax = 0;
  const breakdown: { bracket: string; amount: number; tax: number }[] = [];

  for (const bracket of sortedBrackets) {
    if (remainingIncome <= 0) break;

    const bracketMin = bracket.min_income;
    const bracketMax = bracket.max_income ?? Infinity;
    
    // Skip if income doesn't reach this bracket
    if (income < bracketMin) continue;

    // Calculate taxable amount in this bracket
    const maxInBracket = bracketMax - bracketMin;
    const taxableInBracket = Math.min(
      remainingIncome,
      income < bracketMax ? income - bracketMin : maxInBracket
    );

    if (taxableInBracket > 0) {
      const bracketTax = (taxableInBracket * bracket.tax_rate) / 100 + bracket.fixed_amount;
      totalTax += bracketTax;
      
      breakdown.push({
        bracket: bracket.bracket_name,
        amount: taxableInBracket,
        tax: bracketTax,
      });

      remainingIncome -= taxableInBracket;
    }
  }

  return {
    totalIncome: income,
    taxableIncome: income,
    totalTax: Math.round(totalTax),
    effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
    breakdown,
  };
};

/**
 * Detect which tax bracket a user falls into
 */
export const detectTaxBracket = (
  income: number,
  brackets: TaxBracket[]
): TaxBracket | null => {
  const sortedBrackets = [...brackets].sort((a, b) => b.min_income - a.min_income);
  
  for (const bracket of sortedBrackets) {
    if (income >= bracket.min_income) {
      if (bracket.max_income === null || income <= bracket.max_income) {
        return bracket;
      }
    }
  }
  
  return brackets.find(b => b.min_income === 0) || null;
};

/**
 * Calculate potential tax savings from optimization strategies
 */
export const calculatePotentialSavings = (
  income: number,
  currentTax: number,
  maxDeduction: number
): number => {
  // Simplified calculation: assume 15% average tax rate on deductions
  const potentialSavings = maxDeduction * 0.15;
  return Math.min(potentialSavings, currentTax);
};

/**
 * Format currency in BDT
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format large numbers in lakhs/crores
 */
export const formatIndianNumber = (num: number): string => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  }
  return num.toLocaleString('en-IN');
};
