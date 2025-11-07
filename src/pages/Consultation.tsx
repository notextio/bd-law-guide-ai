import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, User, Bot, Wallet, TrendingDown, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { calculateTax } from "@/utils/taxCalculations";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UserProfile {
  tin_number: string;
  full_name: string;
  annual_income: number;
  tax_due: number;
}

export default function Consultation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadProfile();
  }, []);

  const checkAuthAndLoadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("দয়া করে লগইন করুন (Please login first)");
        navigate("/login");
        return;
      }

      // Fetch user profile
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("প্রোফাইল লোড করতে ব্যর্থ (Failed to load profile)");
      } else {
        setUserProfile(profile);
        
        // Calculate and update tax_due
        const { data: taxBrackets } = await supabase
          .from("tax_brackets")
          .select("*")
          .eq("fiscal_year", "2024-2025")
          .order("min_income");

        if (taxBrackets && profile.annual_income > 0) {
          const taxCalc = calculateTax(profile.annual_income, taxBrackets);
          
          // Update profile with calculated tax
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ tax_due: taxCalc.totalTax })
            .eq("user_id", user.id);

          if (!updateError) {
            setUserProfile({ ...profile, tax_due: taxCalc.totalTax });
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      navigate("/login");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const userTypes = [
    { id: "employer", label: "নিয়োগকর্তা (Employer)" },
    { id: "employee", label: "কর্মচারী (Employee)" },
    { id: "business", label: "ব্যবসায়ী (Business Owner)" },
    { id: "official", label: "সরকারি কর্মকর্তা (Government Official)" },
  ];

  const handleSend = async () => {
    if (!input.trim() || !userType) {
      toast.error("Please select your user type and enter your question");
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("tax-consultation", {
        body: { 
          messages: [...messages, userMessage],
          userType,
          userProfile 
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              কর পরামর্শ সেবা
            </h1>
            <p className="text-muted-foreground">Tax Consultation Service</p>
          </div>

          {/* User Financial Overview */}
          {userProfile && (
            <Card className="p-6 mb-6 shadow-elevated">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                আপনার আর্থিক সারসংক্ষেপ (Your Financial Overview)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">নাম (Name)</p>
                    <p className="text-lg font-semibold">{userProfile.full_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">TIN: {userProfile.tin_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Wallet className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">বার্ষিক আয় (Annual Income)</p>
                    <p className="text-lg font-semibold">৳{userProfile.annual_income.toLocaleString('en-BD')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <TrendingDown className="w-8 h-8 text-destructive flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">প্রদেয় কর (Tax Due)</p>
                    <p className="text-lg font-semibold text-destructive">৳{userProfile.tax_due.toLocaleString('en-BD')}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* User Type Selection */}
          {!userType && (
            <Card className="p-6 mb-6 shadow-elevated">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                আপনার ধরন নির্বাচন করুন (Select Your Type):
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="h-auto py-4 text-left justify-start hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => setUserType(type.id)}
                  >
                    <User className="mr-2" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </Card>
          )}

          {/* Chat Interface */}
          {userType && (
            <>
              <Card className="p-4 mb-4 shadow-elevated">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    Selected: {userTypes.find((t) => t.id === userType)?.label}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setUserType(null);
                      setMessages([]);
                    }}
                  >
                    Change
                  </Button>
                </div>
              </Card>

              {/* Messages */}
              <Card className="min-h-[400px] max-h-[500px] overflow-y-auto p-6 mb-4 shadow-elevated">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <Bot className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <p className="text-lg">আপনার প্রশ্ন জিজ্ঞাসা করুন</p>
                    <p className="text-sm">Ask your tax-related questions</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-4 max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Bot className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <Loader2 className="w-5 h-5 animate-spin text-accent" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="আপনার প্রশ্ন লিখুন... (Type your question...)"
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setMessages([]);
                      setInput("");
                      toast.success("চ্যাট পরিষ্কার করা হয়েছে (Chat cleared)");
                    }}
                    disabled={messages.length === 0}
                    variant="outline"
                    size="lg"
                    className="h-auto"
                    title="Clear chat"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    variant="hero"
                    size="lg"
                    className="h-auto"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
