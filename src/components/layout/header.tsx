
'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Globe, Settings } from 'lucide-react';
import { Logo } from '@/components/decor/logo';

interface HeaderProps {
  showSettings?: boolean;
}

export function Header({ showSettings = false }: HeaderProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-background p-4 pb-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="w-12"></div>
        <div className="text-center flex-1">
          <Logo className="h-8 w-auto inline-block" />
        </div>
        <div className="flex w-12 items-center justify-end">
          {showSettings ? (
             <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
              <Globe className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
