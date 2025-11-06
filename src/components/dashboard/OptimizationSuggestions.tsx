import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, ExternalLink } from "lucide-react";
import { calculatePotentialSavings } from "@/utils/taxCalculations";

interface Suggestion {
  id: string;
  suggestion_type: string;
  title: string;
  description: string;
  max_deduction: number | null;
  legal_reference: string;
  priority: number;
}

interface OptimizationSuggestionsProps {
  suggestions: Suggestion[];
  currentIncome: number;
  currentTax: number;
}

export const OptimizationSuggestions = ({
  suggestions,
  currentIncome,
  currentTax,
}: OptimizationSuggestionsProps) => {
  const sortedSuggestions = [...suggestions].sort((a, b) => a.priority - b.priority);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <CardTitle>কর সাশ্রয়ের পরামর্শ (Tax Optimization)</CardTitle>
        </div>
        <CardDescription>
          আইনি উপায়ে আপনার কর কমাতে এই কৌশলগুলি ব্যবহার করুন
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedSuggestions.map((suggestion) => {
          const potentialSavings = suggestion.max_deduction
            ? calculatePotentialSavings(currentIncome, currentTax, suggestion.max_deduction)
            : 0;

          return (
            <div
              key={suggestion.id}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{suggestion.title}</h3>
                <Badge variant="secondary">Priority {suggestion.priority}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {suggestion.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">সম্ভাব্য সঞ্চয়: </span>
                  <span className="font-bold text-green-600">
                    ৳{potentialSavings.toLocaleString('en-IN')}
                  </span>
                  {suggestion.max_deduction && (
                    <span className="text-xs text-muted-foreground ml-2">
                      (সর্বোচ্চ: ৳{suggestion.max_deduction.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // This would open a modal or link with more details
                    console.log("Legal Reference:", suggestion.legal_reference);
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  আইনি তথ্য
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground border-t pt-2">
                <strong>Legal Reference:</strong> {suggestion.legal_reference}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
