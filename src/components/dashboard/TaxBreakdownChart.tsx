import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TaxCalculationResult } from "@/utils/taxCalculations";

interface TaxBreakdownChartProps {
  calculation: TaxCalculationResult;
}

export const TaxBreakdownChart = ({ calculation }: TaxBreakdownChartProps) => {
  const data = calculation.breakdown.map((item) => ({
    bracket: item.bracket.split('(')[0].trim(),
    amount: item.amount,
    tax: item.tax,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>কর বিভাজন (Tax Breakdown by Bracket)</CardTitle>
        <CardDescription>প্রতিটি ব্র্যাকেটে আপনার কর কীভাবে গণনা করা হয়েছে</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bracket" angle={-15} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(value) => `৳${Number(value).toLocaleString('en-IN')}`} />
            <Legend />
            <Bar dataKey="amount" fill="hsl(var(--primary))" name="করযোগ্য পরিমাণ" />
            <Bar dataKey="tax" fill="hsl(var(--destructive))" name="কর পরিমাণ" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
