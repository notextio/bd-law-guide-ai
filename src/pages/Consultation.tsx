import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, User, Bot } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Consultation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

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
          userType 
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
