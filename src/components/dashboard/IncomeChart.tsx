import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface IncomeChartProps {
  totalIncome: number;
  totalTax: number;
}

export const IncomeChart = ({ totalIncome, totalTax }: IncomeChartProps) => {
  const netIncome = totalIncome - totalTax;
  
  const data = [
    { name: "নিট আয় (Net Income)", value: netIncome },
    { name: "কর (Tax)", value: totalTax },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--destructive))"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>আয় বিতরণ (Income Distribution)</CardTitle>
        <CardDescription>আপনার মোট আয় এবং করের তুলনা</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `৳${Number(value).toLocaleString('en-IN')}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">নিট আয়</p>
            <p className="text-2xl font-bold text-primary">
              ৳{netIncome.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">মোট কর</p>
            <p className="text-2xl font-bold text-destructive">
              ৳{totalTax.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
