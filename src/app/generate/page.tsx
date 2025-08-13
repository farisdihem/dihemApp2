
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/decor/logo';

export default function GeneratePage() {
  const { t, dir } = useLanguage();
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(timer);
          return 95;
        }
        return prevProgress + 5;
      });
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={dir}>
       <header className="bg-background p-4 pb-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-12">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" aria-label="Back">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
          </div>
          <div className="text-center flex-1">
            <Logo className="h-8 w-auto inline-block" />
          </div>
          <div className="w-12" />
        </div>
      </header>
      <main className="flex-grow pb-24 md:pb-0">
        <h1 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">{t.transformingSpace}</h1>
        <div className="flex flex-col gap-1 p-4">
          <div className="flex gap-6 justify-between">
            <p className="text-[#181411] text-base font-medium leading-normal">{t.processing}</p>
          </div>
          <Progress value={progress} className="h-2 mt-1" />
        </div>

        <div className="flex w-full grow bg-white @container py-3">
          <div className="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] flex">
            <div className="relative w-full aspect-auto rounded-none flex-1">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3TKrcH6fFHJj1sDRxGPYUDs7MKdCeqgNUOObIEs_mpr5UX7_aKenkD_FrWXPdZLvehzU2dIeyLlCc2wikykgXQNhXOm4EVI6fAiwyHuWPjdFbbbZYBEZQsU3bNsgX7fDcd8KV0H-YtH9nl1y5UjJNYDbjixlYERhYPdWktb1yEzqZ4IVzuDJ8WqPcB2dkXd7sTafNOuQjqOqpi1Aa8N93DHgGtF1sxaUZXWMJTC3D-zCUMZ86Pv_j9rAvCqNg6M4RXwEsUizEz0wM"
                alt="Room being transformed"
                layout="fill"
                objectFit="cover"
                data-ai-hint="room interior"
              />
            </div>
          </div>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">{t.designPrompt}</p>
            <Textarea
              className="min-h-36 bg-[#f4f2f0] border-none focus:ring-0 placeholder:text-[#887263]"
              placeholder={t.promptPlaceholder}
            />
          </label>
        </div>

        <div className="flex px-4 py-3">
          <Button
            className="flex-1 h-12 text-base"
          >
            {t.applyChanges}
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
