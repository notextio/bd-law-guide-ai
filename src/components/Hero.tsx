import { Button } from "@/components/ui/button";
import { Shield, Users, Scale, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-accent mb-6 shadow-elevated">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            বাংলাদেশ কর পরামর্শ সিস্টেম
            <span className="block text-2xl md:text-4xl mt-2 text-accent">Bangladesh Tax Consultation System</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            আইনসম্মতভাবে কর হ্রাসের জন্য সংবিধান, আইন এবং আদেশ অনুসরণ করে AI-চালিত পরামর্শ পান।
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Get AI-powered guidance following Bangladesh Constitution, laws, and orders to legally minimize taxes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/consultation">
              <Button variant="hero" size="lg" className="text-lg px-10 py-7 shadow-glow hover:shadow-elevated transition-all">
                পরামর্শ শুরু করুন (Start Consultation)
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="official" size="lg" className="text-lg px-10 py-7 shadow-elevated hover:shadow-glow transition-all">
                <Sparkles className="mr-2 w-5 h-5" />
                Innovation Features
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-xl border-2 border-border shadow-elevated hover:shadow-glow hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
              <Users className="w-14 h-14 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-3 text-foreground">সকলের জন্য</h3>
              <p className="text-muted-foreground">নিয়োগকর্তা, কর্মচারী, ব্যবসায়ী ও সরকারি কর্মকর্তা</p>
            </div>
            <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-xl border-2 border-border shadow-elevated hover:shadow-glow hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
              <Scale className="w-14 h-14 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-3 text-foreground">আইন অনুযায়ী</h3>
              <p className="text-muted-foreground">সংবিধান ও আইনের উপর ভিত্তি করে সম্পূর্ণ নির্দেশনা</p>
            </div>
            <div className="group bg-card/95 backdrop-blur-sm p-8 rounded-xl border-2 border-border shadow-elevated hover:shadow-glow hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
              <Shield className="w-14 h-14 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-3 text-foreground">সম্পূর্ণ গোপনীয়</h3>
              <p className="text-muted-foreground">আপনার তথ্য সুরক্ষিত ও গোপনীয় থাকবে</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
