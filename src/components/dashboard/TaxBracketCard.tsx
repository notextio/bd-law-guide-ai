import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface TaxBracketCardProps {
  bracketName: string;
  taxRate: number;
  income: number;
  minIncome: number;
  maxIncome: number | null;
}

export const TaxBracketCard = ({
  bracketName,
  taxRate,
  income,
  minIncome,
  maxIncome,
}: TaxBracketCardProps) => {
  const isInBracket = income >= minIncome && (maxIncome === null || income <= maxIncome);

  return (
    <Card className={isInBracket ? "border-primary bg-primary/5" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {bracketName}
          </CardTitle>
          {isInBracket && (
            <Badge variant="default" className="ml-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              আপনার ব্র্যাকেট
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{taxRate}%</div>
        <p className="text-xs text-muted-foreground mt-1">
          {minIncome.toLocaleString('en-IN')} - {maxIncome ? maxIncome.toLocaleString('en-IN') : '∞'}
        </p>
      </CardContent>
    </Card>
  );
};
