'use client';

import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import { translations, type Translations } from '@/lib/translations';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: Translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This runs only on the client
    const storedLang = localStorage.getItem('language') as Language | null;
    const initialLang = storedLang || 'en';
    setLanguage(initialLang);
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
    setIsMounted(true);
  }, []);

  const setLanguageWithStorage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };
  
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const t = translations[language];

  const value = { language, setLanguage: setLanguageWithStorage, dir, t };

  // Render children only after the component has mounted on the client
  // This prevents hydration mismatches and server-side errors
  if (!isMounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
