import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxBracketCard } from "@/components/dashboard/TaxBracketCard";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { TaxBreakdownChart } from "@/components/dashboard/TaxBreakdownChart";
import { OptimizationSuggestions } from "@/components/dashboard/OptimizationSuggestions";
import { FraudAlerts } from "@/components/dashboard/FraudAlerts";
import { calculateTax, detectTaxBracket, TaxBracket } from "@/utils/taxCalculations";
import { Loader2, TrendingUp, DollarSign, PieChart, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  tin_number: string;
  full_name: string;
  annual_income: number;
  tax_due: number;
}

interface OptimizationSuggestion {
  id: string;
  suggestion_type: string;
  title: string;
  description: string;
  max_deduction: number | null;
  legal_reference: string;
  priority: number;
}

interface FraudAlert {
  id: string;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detected_at: string;
  resolved: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("অনুগ্রহ করে লগইন করুন");
        navigate("/login");
        return;
      }

      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        toast.error("প্রোফাইল লোড করতে সমস্যা হয়েছে");
        return;
      }

      setUserProfile(profile);

      // Load tax brackets first
      const { data: taxBracketsData, error: bracketsError } = await supabase
        .from("tax_brackets")
        .select("*")
        .eq("fiscal_year", "2024-2025")
        .order("min_income");

      if (bracketsError) {
        console.error("Tax brackets error:", bracketsError);
      } else {
        setTaxBrackets(taxBracketsData || []);
        
        // Calculate and update tax_due
        if (taxBracketsData && profile.annual_income > 0) {
          const taxCalc = calculateTax(profile.annual_income, taxBracketsData);
          
          // Update profile with calculated tax
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ tax_due: taxCalc.totalTax })
            .eq("user_id", session.user.id);

          if (!updateError) {
            setUserProfile({ ...profile, tax_due: taxCalc.totalTax });
          }
        }
      }

      // Load optimization suggestions
      const { data: suggestionsData, error: suggestionsError } = await supabase
        .from("optimization_suggestions")
        .select("*")
        .order("priority");

      if (suggestionsError) {
        console.error("Suggestions error:", suggestionsError);
      } else {
        setSuggestions(suggestionsData || []);
      }

      // Load fraud alerts
      const { data: alertsData, error: alertsError } = await supabase
        .from("fraud_alerts")
        .select("*")
        .eq("user_id", session.user.id)
        .order("detected_at", { ascending: false });

      if (alertsError) {
        console.error("Alerts error:", alertsError);
      } else {
        setAlerts((alertsData || []) as FraudAlert[]);
      }

    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast.error("ড্যাশবোর্ড লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>প্রোফাইল পাওয়া যায়নি</p>
      </div>
    );
  }

  const calculation = calculateTax(userProfile.annual_income, taxBrackets);
  const currentBracket = detectTaxBracket(userProfile.annual_income, taxBrackets);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-28 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            স্বাগতম, {userProfile.full_name}
          </h1>
          <p className="text-muted-foreground">
            TIN: {userProfile.tin_number} | অর্থবছর: ২০২৪-২০২৫
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                বার্ষিক আয়
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-primary" />
                <div className="text-2xl font-bold">
                  ৳{userProfile.annual_income.toLocaleString('en-IN')}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                মোট কর
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-destructive" />
                <div className="text-2xl font-bold">
                  ৳{calculation.totalTax.toLocaleString('en-IN')}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                কার্যকর হার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PieChart className="w-4 h-4 mr-2 text-primary" />
                <div className="text-2xl font-bold">
                  {calculation.effectiveRate.toFixed(2)}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                কর ব্র্যাকেট
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                <div className="text-2xl font-bold">
                  {currentBracket?.tax_rate}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">সারসংক্ষেপ</TabsTrigger>
            <TabsTrigger value="brackets">কর ব্র্যাকেট</TabsTrigger>
            <TabsTrigger value="optimization">অপ্টিমাইজেশন</TabsTrigger>
            <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <IncomeChart 
                totalIncome={userProfile.annual_income} 
                totalTax={calculation.totalTax} 
              />
              <TaxBreakdownChart calculation={calculation} />
            </div>
          </TabsContent>

          <TabsContent value="brackets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>বাংলাদেশ কর ব্র্যাকেট ২০২৪-২০২৫</CardTitle>
                <CardDescription>
                  আপনার আয়ের উপর ভিত্তি করে কর হার নির্ধারণ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {taxBrackets.map((bracket) => (
                    <TaxBracketCard
                      key={bracket.id}
                      bracketName={bracket.bracket_name}
                      taxRate={bracket.tax_rate}
                      income={userProfile.annual_income}
                      minIncome={bracket.min_income}
                      maxIncome={bracket.max_income}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <OptimizationSuggestions
              suggestions={suggestions}
              currentIncome={userProfile.annual_income}
              currentTax={calculation.totalTax}
            />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <FraudAlerts alerts={alerts} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
