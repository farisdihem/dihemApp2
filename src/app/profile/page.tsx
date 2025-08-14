
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
  ChevronRight,
} from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { translations } from '@/lib/translations';
import { SettingsSheet } from '@/components/layout/settings-sheet';

type Item = {
  id: string;
  icon: React.ElementType;
  titleKey: keyof typeof translations.en;
  subtitleKey: keyof typeof translations.en;
};

const accountItems: Item[] = [
  { id: 'edit-profile', icon: User, titleKey: 'editProfile', subtitleKey: 'manageProfile' },
  { id: 'change-password', icon: Lock, titleKey: 'changePassword', subtitleKey: 'updatePassword' },
];

const ListItem = ({ item, onClick }: { item: Item, onClick: (item: Item) => void }) => {
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


export default function ProfilePage() {
  const { t, language, dir, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const [profile, setProfile] = useState({
    name: 'dihem abd',
    username: '@dihem.abd',
    avatar: 'https://images.unsplash.com/photo-1645356153497-b0975856908d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8JUQ4JUIxJUQ4JUFDQ5JTg0JTIwJUQ4JUE4JUQ5JTg0JUQ4JUFEJUQ5JThBJUQ4JUE5fGVufDB8fHx8MTc1NTEwMDAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'man portrait',
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }

    setIsUploading(true);

    try {
      const dataUri = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setProfile((p) => ({ ...p, avatar: dataUri }));

      const userId = 'test-user'; 
      const storageRef = ref(storage, `avatars/${userId}/${uuidv4()}`);
      const uploadResult = await uploadString(storageRef, dataUri, 'data_url');
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      setProfile((p) => ({ ...p, avatar: downloadURL }));

      toast({
        title: t.uploadSuccessTitle,
        description: t.uploadSuccessDescription,
      });
    } catch (error) {
      console.error("Error uploading avatar: ", error);
      toast({
          variant: 'destructive',
          title: t.uploadErrorTitle,
          description: t.uploadErrorDescription,
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast, t]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    maxFiles: 1,
    disabled: isUploading,
  });
  
  const handleItemClick = (item: Item) => {
    toast({
      title: t[item.titleKey],
      description: 'This feature is not yet implemented.',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={dir}>
      <header className="bg-background p-4 pb-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-12"></div>
          <div className="text-center flex-1">
             <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">{t.profile}</h2>
          </div>
          <div className="flex w-12 items-center justify-end">
             <SettingsSheet />
          </div>
        </div>
      </header>
      <main className="flex-grow pb-24 md:pb-0">
        <div className="flex p-4 @container">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div {...getRootProps()} className="relative rounded-full min-h-32 w-32 overflow-hidden cursor-pointer group/avatar">
                <input {...getInputProps()} />
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  data-ai-hint={profile.hint}
                  layout="fill"
                  objectFit="cover"
                />
                 {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{profile.name}</p>
                <p className="text-[#887263] text-base font-normal leading-normal text-center">{profile.username}</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t.account}</h3>
        {accountItems.map((item) => <ListItem key={item.id} item={item} onClick={handleItemClick} />)}

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
