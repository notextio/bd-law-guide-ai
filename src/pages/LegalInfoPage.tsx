import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, BookOpen, FileText, Building2, ArrowLeft, Shield, Gavel, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LegalInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-primary hover:text-primary-light"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          হোম পেজে ফিরে যান / Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            আইনি তথ্য
          </h1>
          <p className="text-2xl text-primary-light mb-2">
            Legal Information
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            বাংলাদেশের সংবিধান ও কর আইন অনুযায়ী সম্পূর্ণ আইনি তথ্য
          </p>
          <p className="text-sm text-muted-foreground italic">
            Complete legal information according to Bangladesh Constitution and Tax Laws
          </p>
        </div>

        {/* Constitution Section */}
        <Card className="mb-8 border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <Scale className="w-8 h-8" />
              <div>
                <div>সংবিধান (Constitution)</div>
                <div className="text-base font-normal text-muted-foreground mt-1">
                  Constitution of the People's Republic of Bangladesh
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">অনুচ্ছেদ ৮৩ (Article 83) - করারোপণ</h3>
              <p className="text-base mb-2">
                সংসদ আইনের দ্বারা করারোপণ, পরিবর্তন বা বিলোপ করার ক্ষমতাপ্রাপ্ত হবে। কোনো কর আইনের কর্তৃত্ব ব্যতীত আরোপিত বা আদায় করা যাবে না।
              </p>
              <p className="text-sm text-muted-foreground italic mb-4">
                Parliament shall have power to impose, modify or repeal taxes by law. No tax shall be levied or collected except by or under the authority of an Act of Parliament.
              </p>
              <div className="bg-background/50 p-4 rounded">
                <h4 className="font-semibold text-primary mb-2">মূল নীতি (Core Principle):</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>সংসদীয় অনুমোদন ছাড়া কোনো কর আরোপ করা যাবে না</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span className="italic">No taxation without parliamentary approval</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">অনুচ্ছেদ ২০ (Article 20) - কর্মসংস্থান অধিকার</h3>
              <p className="text-base mb-2">
                রাষ্ট্র সকল নাগরিকের কর্মের অধিকার নিশ্চিত করার জন্য প্রচেষ্টা চালাবেন এবং এই উদ্দেশ্যে উৎপাদনশক্তির ক্রমবিকাশের পরিকল্পনার ভিত্তিতে কর্মসংস্থানের সুযোগ সৃষ্টির ব্যবস্থা গ্রহণ করবেন।
              </p>
              <p className="text-sm text-muted-foreground italic">
                The State shall endeavor to ensure the right to work, that is the right to guaranteed employment at a reasonable wage having regard to the quantity and quality of work.
              </p>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">অনুচ্ছেদ ১৫ (Article 15) - মৌলিক প্রয়োজন</h3>
              <p className="text-base mb-2">
                রাষ্ট্র অন্ন, বস্ত্র, আশ্রয়, শিক্ষা ও চিকিৎসাসহ জীবনধারণের মৌলিক উপকরণের ব্যবস্থা করার জন্য প্রচেষ্টা চালাবেন।
              </p>
              <p className="text-sm text-muted-foreground italic">
                It shall be a fundamental responsibility of the State to attain, through planned economic growth, a constant increase of productive forces and a steady improvement in the material and cultural standard of living of the people.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Income Tax Act 2023 */}
        <Card className="mb-8 border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <FileText className="w-8 h-8" />
              <div>
                <div>আয়কর আইন ২০২৩ (Income Tax Act 2023)</div>
                <div className="text-base font-normal text-muted-foreground mt-1">
                  The Income Tax Act, 2023 (Act No. 22 of 2023)
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">মূল আইন (Primary Legislation)</h3>
              <p className="text-base mb-2">
                ১ জুলাই ২০২৩ থেকে কার্যকর - আয়কর অধ্যাদেশ ১৯৮৪ সম্পূর্ণভাবে প্রতিস্থাপন করেছে। এই আইন বাংলাদেশের আয়কর ব্যবস্থাকে আধুনিকায়ন ও সরলীকরণ করেছে।
              </p>
              <p className="text-sm text-muted-foreground italic">
                Effective from July 1, 2023 - Completely replaced the Income Tax Ordinance 1984. This Act modernizes and simplifies Bangladesh's income tax system.
              </p>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">ব্যক্তিগত আয়কর হার (Personal Income Tax Rates)</h3>
              <div className="bg-background/50 p-4 rounded mb-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-2">আয় সীমা (Income Slab)</th>
                      <th className="text-center py-2">হার (Rate)</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-muted">
                      <td className="py-2">প্রথম ৩,৫০,০০০ টাকা (First BDT 350,000)</td>
                      <td className="text-center">০% (Nil)</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">পরবর্তী ১,০০,০০০ টাকা (Next BDT 100,000)</td>
                      <td className="text-center">৫%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">পরবর্তী ৩,০০,০০০ টাকা (Next BDT 300,000)</td>
                      <td className="text-center">১০%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">পরবর্তী ৪,০০,০০০ টাকা (Next BDT 400,000)</td>
                      <td className="text-center">১৫%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="py-2">পরবর্তী ৫,০০,০০০ টাকা (Next BDT 500,000)</td>
                      <td className="text-center">২০%</td>
                    </tr>
                    <tr>
                      <td className="py-2">বাকি আয় (Balance)</td>
                      <td className="text-center">২৫%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Progressive tax rates from 0% to 25% based on income slabs
              </p>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">কর্পোরেট কর (Corporate Tax Rates)</h3>
              <ul className="space-y-3">
                <li className="bg-background/50 p-3 rounded">
                  <span className="font-semibold text-primary">পাবলিক লিমিটেড কোম্পানি (Public Limited Company):</span>
                  <span className="ml-2">২২.৫%</span>
                </li>
                <li className="bg-background/50 p-3 rounded">
                  <span className="font-semibold text-primary">প্রাইভেট লিমিটেড কোম্পানি (Private Limited Company):</span>
                  <span className="ml-2">২৭.৫%</span>
                </li>
                <li className="bg-background/50 p-3 rounded">
                  <span className="font-semibold text-primary">ব্যাংক, বীমা ও আর্থিক প্রতিষ্ঠান (Banks, Insurance & Financial Institutions):</span>
                  <span className="ml-2">৪০%</span>
                </li>
                <li className="bg-background/50 p-3 rounded">
                  <span className="font-semibold text-primary">সিগারেট উৎপাদন (Cigarette Manufacturing):</span>
                  <span className="ml-2">৪৫%</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">কর অব্যাহতি ও রেয়াত (Tax Exemptions & Rebates)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>বিনিয়োগে কর রেয়াত: সর্বোচ্চ ১৫ লক্ষ টাকা পর্যন্ত (Investment rebate: up to BDT 15 lakhs)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>মহিলা ও ৬৫+ বয়সীদের জন্য বিশেষ করমুক্ত সীমা (Special tax-free threshold for women and senior citizens 65+)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>প্রতিবন্ধী ব্যক্তিদের জন্য অতিরিক্ত ছাড় (Additional allowances for persons with disabilities)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* VAT Act 1991 */}
        <Card className="mb-8 border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <BookOpen className="w-8 h-8" />
              <div>
                <div>মূল্য সংযোজন কর আইন ১৯৯১</div>
                <div className="text-base font-normal text-muted-foreground mt-1">
                  The Value Added Tax Act, 1991
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">মানক ভ্যাট হার (Standard VAT Rate)</h3>
              <p className="text-base mb-2">
                বর্তমান ভ্যাট হার: ১৫% (পণ্য ও সেবার উপর প্রযোজ্য)। কিছু নির্দিষ্ট পণ্য ও সেবা ভ্যাট মুক্ত বা হ্রাসকৃত হারে ভ্যাট প্রযোজ্য।
              </p>
              <p className="text-sm text-muted-foreground italic">
                Current VAT Rate: 15% (applicable on goods and services). Certain goods and services are VAT-exempt or subject to reduced rates.
              </p>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">নিবন্ধন বাধ্যবাধকতা (Registration Requirements)</h3>
              <div className="bg-background/50 p-4 rounded">
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>বার্ষিক টার্নওভার ৫০ লক্ষ টাকার বেশি হলে ভ্যাট নিবন্ধন বাধ্যতামূলক</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="italic">VAT registration mandatory if annual turnover exceeds BDT 50 lakhs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>আমদানিকারক ও রপ্তানিকারকদের জন্য অবশ্যই নিবন্ধন প্রয়োজন (Importers and exporters must register)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">ভ্যাট মুক্ত পণ্য ও সেবা (VAT-Exempt Goods & Services)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>মৌলিক খাদ্য পণ্য (চাল, ডাল, তেল) - Basic food items (rice, lentils, oil)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>স্বাস্থ্য সেবা ও শিক্ষা - Healthcare and education services</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>কৃষি পণ্য ও উপকরণ - Agricultural products and inputs</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* National Board of Revenue */}
        <Card className="mb-8 border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <Building2 className="w-8 h-8" />
              <div>
                <div>জাতীয় রাজস্ব বোর্ড (NBR)</div>
                <div className="text-base font-normal text-muted-foreground mt-1">
                  National Board of Revenue
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">কর্তৃপক্ষ ও দায়িত্ব (Authority & Responsibilities)</h3>
              <p className="text-base mb-2">
                জাতীয় রাজস্ব বোর্ড (NBR) বাংলাদেশের কেন্দ্রীয় কর প্রশাসন এবং আইন প্রয়োগকারী সংস্থা। এটি অর্থ মন্ত্রণালয়ের অধীনে কাজ করে এবং দেশের রাজস্ব সংগ্রহ ও পরিচালনার জন্য দায়ী।
              </p>
              <p className="text-sm text-muted-foreground italic mb-4">
                The National Board of Revenue (NBR) is the central tax administration and enforcement authority of Bangladesh. It operates under the Ministry of Finance and is responsible for revenue collection and management.
              </p>
              <div className="bg-background/50 p-4 rounded">
                <h4 className="font-semibold text-primary mb-2">প্রধান দায়িত্ব (Main Responsibilities):</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>আয়কর আইন বাস্তবায়ন ও প্রয়োগ (Implementation and enforcement of Income Tax laws)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>মূল্য সংযোজন কর (ভ্যাট) ব্যবস্থাপনা (Value Added Tax (VAT) management)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>শুল্ক ও আবগারি কর সংগ্রহ (Customs and excise duty collection)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>করদাতা সেবা ও সচেতনতা কার্যক্রম (Taxpayer services and awareness programs)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-primary/50 pl-6 py-4 bg-primary/5">
              <h3 className="text-xl font-bold text-primary mb-3">করদাতা সেবা (Taxpayer Services)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>অনলাইন TIN নিবন্ধন ব্যবস্থা (Online TIN registration system)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>ই-রিটার্ন দাখিল সুবিধা (E-return filing facility)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>করদাতা হেল্পলাইন সেবা (Taxpayer helpline services)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Additional Legal References */}
        <Card className="mb-8 border-primary/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <Gavel className="w-8 h-8" />
              <div>
                <div>অন্যান্য প্রাসঙ্গিক আইন</div>
                <div className="text-base font-normal text-muted-foreground mt-1">
                  Other Relevant Legislation
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary/50 pl-6 py-3 bg-primary/5">
              <h4 className="font-semibold text-primary mb-2">কাস্টমস আইন ১৯৬৯ (Customs Act, 1969)</h4>
              <p className="text-sm">আমদানি-রপ্তানি শুল্ক ও নিয়ন্ত্রণ সংক্রান্ত</p>
            </div>
            <div className="border-l-4 border-primary/50 pl-6 py-3 bg-primary/5">
              <h4 className="font-semibold text-primary mb-2">মানি লন্ডারিং প্রতিরোধ আইন ২০১২ (Money Laundering Prevention Act, 2012)</h4>
              <p className="text-sm">অর্থ পাচার রোধ ও আর্থিক স্বচ্ছতা নিশ্চিতকরণ</p>
            </div>
            <div className="border-l-4 border-primary/50 pl-6 py-3 bg-primary/5">
              <h4 className="font-semibold text-primary mb-2">কোম্পানি আইন ১৯৯৪ (Companies Act, 1994)</h4>
              <p className="text-sm">কোম্পানি নিবন্ধন, পরিচালনা ও নিয়ন্ত্রণ</p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Compliance Notice */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <Shield className="w-8 h-8" />
              <div>
                <div>গোপনীয়তা ও সম্মতি নীতি</div>
                <div className="text-base font-normal text-muted-foreground mt-1">
                  Privacy & Compliance Policy
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold text-primary mb-4">
                গুরুত্বপূর্ণ নোট (Important Notice)
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium">এই সিস্টেম বাংলাদেশ সংবিধান ও সকল প্রযোজ্য কর আইন কঠোরভাবে মেনে চলে</p>
                    <p className="text-sm text-muted-foreground italic">This system strictly follows Bangladesh Constitution and all applicable tax laws</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium">আপনার সকল তথ্য সম্পূর্ণ গোপনীয় এবং শুধুমাত্র এই সিস্টেমে সংরক্ষিত থাকবে</p>
                    <p className="text-sm text-muted-foreground italic">All your data remains completely confidential and stored only within this system</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium">কোনো তথ্য বিদেশে বা বাংলাদেশের বাইরের সার্ভারে প্রেরণ করা হয় না</p>
                    <p className="text-sm text-muted-foreground italic">No data is transmitted abroad or to servers outside Bangladesh</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">✓</span>
                  <div>
                    <p className="font-medium">সকল পরামর্শ বাংলাদেশের আইন অনুযায়ী বৈধ কর হ্রাসকরণে সহায়তা করে</p>
                    <p className="text-sm text-muted-foreground italic">All advice helps with legal tax reduction according to Bangladesh laws</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-background/50 p-4 rounded border border-primary/10">
              <p className="text-sm text-center text-muted-foreground">
                এই তথ্য শুধুমাত্র সাধারণ নির্দেশনার জন্য। নির্দিষ্ট কর পরিস্থিতির জন্য দয়া করে প্রত্যয়িত কর পেশাদার বা NBR এর সাথে পরামর্শ করুন।
              </p>
              <p className="text-xs text-center text-muted-foreground italic mt-2">
                This information is for general guidance only. For specific tax situations, please consult with certified tax professionals or the NBR.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate('/')}
            variant="hero"
            size="lg"
            className="group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            হোম পেজে ফিরে যান / Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LegalInfoPage;
