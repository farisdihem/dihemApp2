
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Settings, Globe, Bell, FileText, HelpCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';

type Item = {
  id: string;
  icon: React.ElementType;
  titleKey: keyof (typeof translations.en);
  subtitleKey: keyof (typeof translations.en);
};

const settingsItems: Item[] = [
  { id: 'language', icon: Globe, titleKey: 'language', subtitleKey: 'chooseLanguage' },
  { id: 'notifications', icon: Bell, titleKey: 'notifications', subtitleKey: 'manageNotifications' },
];

const supportItems: Item[] = [
  { id: 'terms', icon: FileText, titleKey: 'terms', subtitleKey: 'readTerms' },
  { id: 'help', icon: HelpCircle, titleKey: 'help', subtitleKey: 'contactSupport' },
];

const ListItem = ({ item, onClick }: { item: Item; onClick: (item: Item) => void }) => {
  const { t } = useLanguage();
  return (
    <div
      onClick={() => onClick(item)}
      className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 group cursor-pointer active:bg-secondary"
    >
      <div className="text-[#181411] flex items-center justify-center rounded-lg bg-[#f4f2f0] shrink-0 size-12">
        <item.icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <p className="text-[#181411] text-base font-medium leading-normal line-clamp-1">{t[item.titleKey]}</p>
        <p className="text-[#887263] text-sm font-normal leading-normal line-clamp-2">{t[item.subtitleKey]}</p>
      </div>
      <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </div>
  );
};

export function SettingsSheet() {
  const { t, language, dir, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleItemClick = (item: Item) => {
    if (item.id === 'language') {
      setLanguage(language === 'en' ? 'ar' : 'en');
      return;
    }
    toast({
      title: t[item.titleKey],
      description: 'This feature is not yet implemented.',
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={dir === 'rtl' ? 'left' : 'right'} className="w-[320px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-start">{t.settings}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col pt-4">
            <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-0">{t.settings}</h3>
            {settingsItems.map((item) => <ListItem key={item.id} item={item} onClick={handleItemClick} />)}

            <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t.support}</h3>
            {supportItems.map((item) => <ListItem key={item.id} item={item} onClick={handleItemClick} />)}
        </div>
      </SheetContent>
    </Sheet>
  );
}
