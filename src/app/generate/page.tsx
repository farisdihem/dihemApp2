
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/language-context';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { Logo } from '@/components/decor/logo';
import { createDesign } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader } from '@/components/decor/loader';

export default function GeneratePage() {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const original = sessionStorage.getItem('originalImage');
    const generated = sessionStorage.getItem('generatedImage');
    
    if (original && generated) {
      setOriginalImage(original);
      setGeneratedImage(generated);
    } else {
      // Redirect back if no images are found
      router.push('/');
    }
  }, [router]);

  const handleApplyChanges = async () => {
    if (!generatedImage) return;

    setIsLoading(true);

    const result = await createDesign({
      photoDataUri: generatedImage, // Use the generated image as the new base
      designStyle: 'anything', // Style is now driven by the prompt
      prompt,
    });
    
    setIsLoading(false);

    if (result.success && result.data) {
      const newGeneratedImage = result.data.redesignedRoomImage;
      setGeneratedImage(newGeneratedImage);
      sessionStorage.setItem('generatedImage', newGeneratedImage);
      setPrompt(''); // Clear prompt after applying
    } else {
      toast({
        variant: 'destructive',
        title: t.errorTitle,
        description: result.error || t.errorDescription,
      });
    }
  };
  
  if (!generatedImage || !originalImage) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader message={t.generating} />
      </div>
    );
  }

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
        
        {isLoading ? (
          <div className="p-4">
             <Loader message={t.generating} />
          </div>
        ) : (
          <div className="flex w-full grow bg-white @container py-3">
            <div className="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] flex">
              <div className="relative w-full aspect-auto rounded-none flex-1">
                <Image
                  src={generatedImage}
                  alt="Room being transformed"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="room interior"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">{t.designPrompt}</p>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-36 bg-[#f4f2f0] border-none focus:ring-0 placeholder:text-[#887263]"
              placeholder={t.promptPlaceholder}
            />
          </label>
        </div>

        <div className="flex px-4 py-3 max-w-[480px] mx-auto">
          <Button
            className="flex-1 h-12 text-base"
            onClick={handleApplyChanges}
            disabled={isLoading || !prompt}
          >
            <Wand2 className="mr-2 h-5 w-5" />
            {t.applyChanges}
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

