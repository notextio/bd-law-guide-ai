import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { LegalInfo } from "@/components/LegalInfo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <LegalInfo />
    </div>
  );
};

export default Index;
