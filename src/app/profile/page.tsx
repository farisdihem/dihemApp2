
'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import {
  User,
  Lock,
  Globe,
  Bell,
  FileText,
  HelpCircle,
  ChevronRight,
  Settings
} from 'lucide-react';

const accountItems = [
  { id: 'edit-profile', icon: User, titleKey: 'editProfile', subtitleKey: 'manageProfile' },
  { id: 'change-password', icon: Lock, titleKey: 'changePassword', subtitleKey: 'updatePassword' },
];

const settingsItems = [
    { id: 'language', icon: Globe, titleKey: 'language', subtitleKey: 'chooseLanguage' },
    { id: 'notifications', icon: Bell, titleKey: 'notifications', subtitleKey: 'manageNotifications' },
];

const supportItems = [
    { id: 'terms', icon: FileText, titleKey: 'terms', subtitleKey: 'readTerms' },
    { id: 'help', icon: HelpCircle, titleKey: 'help', subtitleKey: 'contactSupport' },
];

export default function ProfilePage() {
  const { t, language, dir, setLanguage } = useLanguage();
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: 'dihem abd',
    username: '@dihem.abd',
    avatar: 'https://images.unsplash.com/photo-1645356153497-b0975856908d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8JUQ4JUIxJUQ4JUFDJUQ5JTg0JTIwJUQ4JUE4JUQ5JTg0JUQ4JUFEJUQ5JThBJUQ4JUE5fGVufDB8fHx8MTc1NTEwMDAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'man portrait',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setProfile((p) => ({ ...p, avatar: dataUri }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });

  type Item = {
    id: string;
    icon: React.ElementType;
    titleKey: keyof typeof t;
    subtitleKey: keyof typeof t;
  };
  
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

  const ListItem = ({ item }: { item: Item }) => (
    <div 
      onClick={() => handleItemClick(item)}
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

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={dir}>
      <header className="bg-background p-4 pb-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-12"></div>
          <div className="text-center flex-1">
             <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">{t.profile}</h2>
          </div>
          <div className="flex w-12 items-center justify-end">
            <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => toast({ title: t.settings, description: 'This feature is not yet implemented.' })}>
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow pb-24 md:pb-0">
        <div className="flex p-4 @container">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div {...getRootProps()} className="relative rounded-full min-h-32 w-32 overflow-hidden cursor-pointer">
                <input {...getInputProps()} />
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  data-ai-hint={profile.hint}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{profile.name}</p>
                <p className="text-[#887263] text-base font-normal leading-normal text-center">{profile.username}</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t.account}</h3>
        {accountItems.map((item) => <ListItem key={item.id} item={item} />)}

        <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t.settings}</h3>
        {settingsItems.map((item) => <ListItem key={item.id} item={item} />)}

        <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t.support}</h3>
        {supportItems.map((item) => <ListItem key={item.id} item={item} />)}

        <div className="flex px-4 py-3 mt-4">
          <Button
            variant="secondary"
            className="flex-1 h-12 text-base text-destructive hover:text-destructive/90"
            onClick={() => toast({ title: t.logOut, description: 'This feature is not yet implemented.' })}
          >
            {t.logOut}
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
