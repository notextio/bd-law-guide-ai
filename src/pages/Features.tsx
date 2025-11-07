import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Brain, Shield, FileText, TrendingUp, Globe, Mic, BarChart3, Lock, Zap, Database } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Dual AI Expert System",
      description: "Virtual Tax Lawyer AI and Government Auditor AI evaluate your data from dual legal perspectives, collaboratively producing the most lawful and optimized tax solution.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Blockchain Integrity",
      description: "Tax records become tamper-proof and transparent with blockchain technology, providing government-level integrity and eliminating corruption risks.",
      color: "text-accent"
    },
    {
      icon: FileText,
      title: "Intelligent Document Extraction",
      description: "Simply upload bank statements, salary slips, or PDFs. Our AI automatically identifies income, expenses, and applicable rebates with zero manual effort.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Adaptive Legal Intelligence",
      description: "System automatically updates as Bangladesh Finance Act changes each year, ensuring always-current compliance with national tax laws.",
      color: "text-accent"
    },
    {
      icon: BarChart3,
      title: "ML Anomaly Detection",
      description: "Machine learning models analyze profession-wise financial patterns and detect anomalies, flagging suspicious underreporting like real tax investigation tools.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Personalized Financial Advisory",
      description: "Acts as your financial advisor by suggesting government-approved savings plans and future tax strategies tailored to your individual profile.",
      color: "text-accent"
    },
    {
      icon: Globe,
      title: "Geo-Economic Intelligence",
      description: "Aggregated anonymous tax data converts into heatmaps helping policymakers identify regional compliance trends and revenue improvement opportunities.",
      color: "text-primary"
    },
    {
      icon: Database,
      title: "Tax Compliance Risk Score",
      description: "Similar to bank credit scoring, provides each user with a clear compliance status and builds trust with authorities through transparent scoring.",
      color: "text-accent"
    },
    {
      icon: Mic,
      title: "Bangla Voice Input",
      description: "Ensuring accessibility for all citizens including rural and less literate users - simply speak your income details to receive instant tax guidance in Bangla.",
      color: "text-primary"
    },
    {
      icon: Lock,
      title: "Advanced Cybersecurity",
      description: "Military-grade encryption and multi-layer security protocols protect your sensitive financial data with zero-trust architecture.",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            উদ্ভাবনী প্রযুক্তি (Innovation & Technology)
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A groundbreaking national tax governance model powered by AI, machine learning, automation, 
            cybersecurity, and blockchain innovation — demonstrating unprecedented social impact for Bangladesh.
          </p>
        </div>

        {/* Vision Statement */}
        <Card className="p-8 mb-16 bg-gradient-primary text-primary-foreground shadow-elevated">
          <h2 className="text-2xl font-bold mb-4">Future-Ready Tax Governance</h2>
          <p className="text-lg leading-relaxed opacity-95">
            This Tax Consultation System transforms traditional tax calculation into an intelligent, 
            transparent, and citizen-centric platform. By integrating cutting-edge AI, blockchain, 
            and machine learning technologies, we're building a system that doesn't just calculate taxes 
            — it ensures fairness, detects fraud, provides personalized financial guidance, and helps 
            shape national economic policy. This is more than a calculator; it's a comprehensive 
            governance tool that serves citizens, protects government revenue, and promotes economic justice.
          </p>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-2"
              >
                <div className={`${feature.color} mb-4`}>
                  <Icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Impact Statement */}
        <Card className="p-8 mt-16 border-2 border-accent">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Transforming Bangladesh's Tax Ecosystem
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">For Citizens:</strong> Eliminates confusion, reduces tax burden through legal optimization, 
              and provides financial planning guidance — all in their native language.
            </p>
            <p>
              <strong className="text-foreground">For Government:</strong> Increases revenue collection, reduces tax evasion, provides 
              real-time economic insights, and builds public trust through transparency.
            </p>
            <p>
              <strong className="text-foreground">For National Development:</strong> Creates a data-driven policy framework, identifies 
              regional economic opportunities, and establishes Bangladesh as a leader in digital governance innovation.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Features;
