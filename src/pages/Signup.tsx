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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না (Passwords do not match)");
      return;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে (Password must be at least 6 characters)");
      return;
    }

    if (tinNumber.length !== 12) {
      toast.error("টিআইএন নম্বর ১২ ডিজিটের হতে হবে (TIN must be 12 digits)");
      return;
    }

    if (!fullName.trim()) {
      toast.error("নাম প্রদান করুন (Please provide your name)");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            tin_number: tinNumber,
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast.success("অ্যাকাউন্ট তৈরি সফল! এখন লগইন করুন। (Account created successfully! You can now login.)");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি ব্যর্থ (Failed to create account)");
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
              <h1 className="text-2xl font-bold text-foreground mb-2">নিবন্ধন করুন</h1>
              <p className="text-muted-foreground">Create your account</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="fullName">পূর্ণ নাম (Full Name)</Label>
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
                <Label htmlFor="tinNumber">টিআইএন নম্বর (TIN Number - 12 digits)</Label>
                <Input
                  id="tinNumber"
                  type="text"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="123456789012"
                  maxLength={12}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Demo TIN: 123456789012 (Email: demo@tax.gov.bd, Password: demo123)
                </p>
              </div>

              <div>
                <Label htmlFor="email">ইমেইল (Email)</Label>
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
                <Label htmlFor="password">পাসওয়ার্ড (Password)</Label>
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
                <Label htmlFor="confirmPassword">
                  পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
                </Label>
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
                {isLoading ? "নিবন্ধন হচ্ছে..." : "নিবন্ধন করুন (Sign Up)"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                ইতিমধ্যে একাউন্ট আছে? (Already have an account?){" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  লগইন করুন (Login)
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
