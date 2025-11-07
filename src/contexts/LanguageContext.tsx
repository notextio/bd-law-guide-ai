import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.consultation': 'Consultation',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    
    // Login Page
    'login.title': 'Login',
    'login.subtitle': 'Login to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'login.loading': 'Logging in...',
    'login.newUser': 'New user?',
    'login.signupLink': 'Sign up',
    'login.success': 'Successfully logged in!',
    'login.error': 'Failed to login',
    
    // Signup Page
    'signup.title': 'Sign Up',
    'signup.subtitle': 'Create your account',
    'signup.fullName': 'Full Name',
    'signup.tinNumber': 'TIN Number - 12 digits',
    'signup.annualIncome': 'Annual Income in BDT',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.confirmPassword': 'Confirm Password',
    'signup.submit': 'Sign Up',
    'signup.loading': 'Signing up...',
    'signup.alreadyHaveAccount': 'Already have an account?',
    'signup.loginLink': 'Login',
    'signup.passwordMismatch': 'Passwords do not match',
    'signup.passwordLength': 'Password must be at least 6 characters',
    'signup.tinLength': 'TIN must be 12 digits',
    'signup.provideName': 'Please provide your name',
    'signup.provideIncome': 'Please provide annual income',
    'signup.success': 'Account created successfully! You can now login.',
    'signup.error': 'Failed to create account',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.fiscalYear': 'Fiscal Year: 2024-2025',
    'dashboard.annualIncome': 'Annual Income',
    'dashboard.totalTax': 'Total Tax',
    'dashboard.effectiveRate': 'Effective Rate',
    'dashboard.taxBracket': 'Tax Bracket',
    'dashboard.overview': 'Overview',
    'dashboard.brackets': 'Tax Brackets',
    'dashboard.optimization': 'Optimization',
    'dashboard.security': 'Security',
    'dashboard.taxBracketsTitle': 'Bangladesh Tax Brackets 2024-2025',
    'dashboard.taxBracketsDesc': 'Tax rates based on your income',
    
    // Consultation
    'consultation.title': 'Tax Consultation Service',
    'consultation.subtitle': 'Tax Consultation Service',
    'consultation.financialOverview': 'Your Financial Overview',
    'consultation.name': 'Name',
    'consultation.annualIncome': 'Annual Income',
    'consultation.taxDue': 'Tax Due',
    'consultation.selectType': 'Select Your Type:',
    'consultation.employer': 'Employer',
    'consultation.employee': 'Employee',
    'consultation.business': 'Business Owner',
    'consultation.official': 'Government Official',
    'consultation.selected': 'Selected',
    'consultation.change': 'Change',
    'consultation.askQuestion': 'Ask your tax-related questions',
    'consultation.typePlaceholder': 'Type your question...',
    'consultation.pleaseLogin': 'Please login first',
    'consultation.profileLoadError': 'Failed to load profile',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.consultation': 'পরামর্শ',
    'nav.login': 'লগইন',
    'nav.signup': 'নিবন্ধন',
    'nav.logout': 'লগআউট',
    
    // Login Page
    'login.title': 'লগইন করুন',
    'login.subtitle': 'Login to your account',
    'login.email': 'ইমেইল (Email)',
    'login.password': 'পাসওয়ার্ড (Password)',
    'login.submit': 'লগইন করুন (Login)',
    'login.loading': 'লগইন হচ্ছে...',
    'login.newUser': 'নতুন ব্যবহারকারী? (New user?)',
    'login.signupLink': 'নিবন্ধন করুন (Sign up)',
    'login.success': 'সফলভাবে লগইন হয়েছে!',
    'login.error': 'লগইন ব্যর্থ হয়েছে',
    
    // Signup Page
    'signup.title': 'নিবন্ধন করুন',
    'signup.subtitle': 'Create your account',
    'signup.fullName': 'পূর্ণ নাম (Full Name)',
    'signup.tinNumber': 'টিআইএন নম্বর (TIN Number - 12 digits)',
    'signup.annualIncome': 'বার্ষিক আয় (Annual Income in BDT)',
    'signup.email': 'ইমেইল (Email)',
    'signup.password': 'পাসওয়ার্ড (Password)',
    'signup.confirmPassword': 'পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)',
    'signup.submit': 'নিবন্ধন করুন (Sign Up)',
    'signup.loading': 'নিবন্ধন হচ্ছে...',
    'signup.alreadyHaveAccount': 'ইতিমধ্যে একাউন্ট আছে? (Already have an account?)',
    'signup.loginLink': 'লগইন করুন (Login)',
    'signup.passwordMismatch': 'পাসওয়ার্ড মিলছে না (Passwords do not match)',
    'signup.passwordLength': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে (Password must be at least 6 characters)',
    'signup.tinLength': 'টিআইএন নম্বর ১২ ডিজিটের হতে হবে (TIN must be 12 digits)',
    'signup.provideName': 'নাম প্রদান করুন (Please provide your name)',
    'signup.provideIncome': 'বার্ষিক আয় প্রদান করুন (Please provide annual income)',
    'signup.success': 'অ্যাকাউন্ট তৈরি সফল! এখন লগইন করুন। (Account created successfully! You can now login.)',
    'signup.error': 'অ্যাকাউন্ট তৈরি ব্যর্থ (Failed to create account)',
    
    // Dashboard
    'dashboard.welcome': 'স্বাগতম',
    'dashboard.fiscalYear': 'অর্থবছর: ২০২৪-২০২৫',
    'dashboard.annualIncome': 'বার্ষিক আয়',
    'dashboard.totalTax': 'মোট কর',
    'dashboard.effectiveRate': 'কার্যকর হার',
    'dashboard.taxBracket': 'কর ব্র্যাকেট',
    'dashboard.overview': 'সারসংক্ষেপ',
    'dashboard.brackets': 'কর ব্র্যাকেট',
    'dashboard.optimization': 'অপ্টিমাইজেশন',
    'dashboard.security': 'নিরাপত্তা',
    'dashboard.taxBracketsTitle': 'বাংলাদেশ কর ব্র্যাকেট ২০২৪-২০২৫',
    'dashboard.taxBracketsDesc': 'আপনার আয়ের উপর ভিত্তি করে কর হার নির্ধারণ',
    
    // Consultation
    'consultation.title': 'কর পরামর্শ সেবা',
    'consultation.subtitle': 'Tax Consultation Service',
    'consultation.financialOverview': 'আপনার আর্থিক সারসংক্ষেপ (Your Financial Overview)',
    'consultation.name': 'নাম (Name)',
    'consultation.annualIncome': 'বার্ষিক আয় (Annual Income)',
    'consultation.taxDue': 'প্রদেয় কর (Tax Due)',
    'consultation.selectType': 'আপনার ধরন নির্বাচন করুন (Select Your Type):',
    'consultation.employer': 'নিয়োগকর্তা (Employer)',
    'consultation.employee': 'কর্মচারী (Employee)',
    'consultation.business': 'ব্যবসায়ী (Business Owner)',
    'consultation.official': 'সরকারি কর্মকর্তা (Government Official)',
    'consultation.selected': 'Selected',
    'consultation.change': 'Change',
    'consultation.askQuestion': 'আপনার প্রশ্ন জিজ্ঞাসা করুন',
    'consultation.typePlaceholder': 'আপনার প্রশ্ন লিখুন... (Type your question...)',
    'consultation.pleaseLogin': 'দয়া করে লগইন করুন (Please login first)',
    'consultation.profileLoadError': 'প্রোফাইল লোড করতে ব্যর্থ (Failed to load profile)',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
