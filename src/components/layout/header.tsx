'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-background p-4 pb-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="w-12"></div>
        <h1 className="text-lg font-bold text-center flex-1">{t.appName}</h1>
        <div className="flex w-12 items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
            <Globe className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
