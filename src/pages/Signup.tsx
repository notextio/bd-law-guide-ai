import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('signup.passwordMismatch'));
      return;
    }

    if (password.length < 6) {
      toast.error(t('signup.passwordLength'));
      return;
    }

    if (tinNumber.length !== 12) {
      toast.error(t('signup.tinLength'));
      return;
    }

    if (!fullName.trim()) {
      toast.error(t('signup.provideName'));
      return;
    }

    if (!annualIncome || parseFloat(annualIncome) < 0) {
      toast.error(t('signup.provideIncome'));
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            tin_number: tinNumber,
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      // Wait a moment for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the session to update annual income
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!sessionError && session?.user) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ annual_income: parseFloat(annualIncome) })
          .eq("user_id", session.user.id);

        if (updateError) {
          console.error("Error updating annual income:", updateError);
        }
      }

      toast.success(t('signup.success'));
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || t('signup.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-elevated">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{t('signup.title')}</h1>
              <p className="text-muted-foreground">{t('signup.subtitle')}</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="fullName">{t('signup.fullName')}</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="মোহাম্মদ করিম (Mohammad Karim)"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tinNumber">{t('signup.tinNumber')}</Label>
                <Input
                  id="tinNumber"
                  type="text"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="123456789012"
                  maxLength={12}
                  required
                />
              </div>

              <div>
                <Label htmlFor="annualIncome">{t('signup.annualIncome')}</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder="500000"
                  min="0"
                  step="1000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">{t('signup.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">{t('signup.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t('signup.loading') : t('signup.submit')}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                {t('signup.alreadyHaveAccount')}{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t('signup.loginLink')}
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
