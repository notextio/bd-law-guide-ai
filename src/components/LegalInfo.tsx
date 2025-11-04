import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, BookOpen, FileText, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LegalInfo = () => {
  const navigate = useNavigate();
  
  const legalSections = [
    {
      icon: Scale,
      title: "সংবিধান (Constitution)",
      titleEn: "Constitution of Bangladesh",
      items: [
        {
          heading: "অনুচ্ছেদ ৮৩ (Article 83)",
          text: "করারোপণ - সংসদ আইনের দ্বারা করারোপণ, পরিবর্তন বা বিলোপ ক্ষমতাপ্রাপ্ত",
          textEn: "Taxation - Parliament shall have power to impose, modify or repeal taxes by law"
        },
        {
          heading: "অনুচ্ছেদ ২০ (Article 20)",
          text: "কর্মসংস্থান অধিকার - রাষ্ট্র নাগরিকদের কর্মের অধিকার নিশ্চিত করতে প্রচেষ্টা চালাবেন",
          textEn: "Right to work - The State shall ensure the right to work of citizens"
        }
      ]
    },
    {
      icon: FileText,
      title: "আয়কর আইন ২০২৩ (Income Tax Act 2023)",
      titleEn: "Income Tax Act 2023",
      items: [
        {
          heading: "মূল আইন (Primary Law)",
          text: "১ জুলাই ২০২৩ থেকে কার্যকর - আয়কর অধ্যাদেশ ১৯৮৪ প্রতিস্থাপন করেছে",
          textEn: "Effective from July 1, 2023 - Replaced Income Tax Ordinance 1984"
        },
        {
          heading: "কর হার (Tax Rates)",
          text: "ব্যক্তিগত আয়কর: ৫% থেকে ৩০% পর্যন্ত প্রগতিশীল হার",
          textEn: "Personal Income Tax: Progressive rates from 5% to 30%"
        },
        {
          heading: "কর্পোরেট কর (Corporate Tax)",
          text: "পাবলিক লিমিটেড: ২২.৫%, প্রাইভেট লিমিটেড: ২৭.৫%",
          textEn: "Public Limited: 22.5%, Private Limited: 27.5%"
        }
      ]
    },
    {
      icon: BookOpen,
      title: "মূল্য সংযোজন কর আইন ১৯৯১ (VAT Act 1991)",
      titleEn: "Value Added Tax Act 1991",
      items: [
        {
          heading: "মানক হার (Standard Rate)",
          text: "বর্তমান ভ্যাট হার: ১৫% (পণ্য ও সেবার উপর প্রযোজ্য)",
          textEn: "Current VAT Rate: 15% (applicable on goods and services)"
        },
        {
          heading: "নিবন্ধন (Registration)",
          text: "বার্ষিক টার্নওভার ৫০ লক্ষ টাকার বেশি হলে ভ্যাট নিবন্ধন বাধ্যতামূলক",
          textEn: "VAT registration mandatory if annual turnover exceeds BDT 50 lakhs"
        }
      ]
    },
    {
      icon: Building2,
      title: "জাতীয় রাজস্ব বোর্ড (NBR)",
      titleEn: "National Board of Revenue",
      items: [
        {
          heading: "কর্তৃপক্ষ (Authority)",
          text: "বাংলাদেশের কেন্দ্রীয় কর প্রশাসন এবং আইন প্রয়োগকারী সংস্থা",
          textEn: "Central tax administration and enforcement authority of Bangladesh"
        },
        {
          heading: "দায়িত্ব (Responsibilities)",
          text: "আয়কর, ভ্যাট, শুল্ক এবং অন্যান্য পরোক্ষ করের ব্যবস্থাপনা",
          textEn: "Management of Income Tax, VAT, Customs and other indirect taxes"
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            আইনি তথ্য
          </h2>
          <p className="text-xl text-primary-light">
            Legal Information
          </p>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            বাংলাদেশের সংবিধান ও কর আইন অনুযায়ী সকল তথ্য
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {legalSections.map((section, idx) => (
            <Card key={idx} className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <section.icon className="w-6 h-6" />
                  <div>
                    <div className="text-lg">{section.title}</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      {section.titleEn}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-l-4 border-primary/30 pl-4 py-2">
                    <h4 className="font-semibold text-primary mb-2">
                      {item.heading}
                    </h4>
                    <p className="text-sm text-foreground/90 mb-1">
                      {item.text}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      {item.textEn}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            গুরুত্বপূর্ণ নোট (Important Notice)
          </h3>
          <ul className="space-y-2 text-sm text-foreground/90 mb-6">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>এই সিস্টেম বাংলাদেশ সংবিধান ও সকল প্রযোজ্য কর আইন মেনে চলে</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="italic">This system strictly follows Bangladesh Constitution and all applicable tax laws</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>আপনার সকল তথ্য সম্পূর্ণ গোপনীয় এবং শুধুমাত্র এই সিস্টেমে সংরক্ষিত থাকবে</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="italic">All your data remains completely confidential and stored only within this system</span>
            </li>
          </ul>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate('/legal-info')}
              variant="hero"
              size="lg"
              className="group"
            >
              আরও পড়ুন / Read More
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
