
'use client';

import { useState, useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/language-context';
import { createDesign } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ImageUpload } from '@/components/decor/image-upload';
import { StyleSelector } from '@/components/decor/style-selector';
import { BeforeAfterSlider } from '@/components/decor/before-after-slider';
import { Loader } from '@/components/decor/loader';
import { Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  photoDataUri: z.string().min(1, 'Please upload an image.'),
  designStyle: z.string().min(1, 'Please select a style.'),
  prompt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function DecorApp() {
  const { t, dir } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoDataUri: '',
      designStyle: '',
      prompt: '',
    },
  });

  const photoDataUri = watch('photoDataUri');
  const selectedStyle = watch('designStyle');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedImage(null);
    const result = await createDesign(data);
    setIsLoading(false);

    if (result.success && result.data) {
      // Store images in session storage to pass to the next page
      sessionStorage.setItem('originalImage', data.photoDataUri);
      sessionStorage.setItem('generatedImage', result.data.redesignedRoomImage);
      router.push('/generate');
    } else {
      toast({
        variant: 'destructive',
        title: t.errorTitle,
        description: result.error || t.errorDescription,
      });
    }
  };

  const onImageUpload = useCallback((dataUri: string) => {
    setValue('photoDataUri', dataUri, { shouldValidate: true });
  }, [setValue]);

  const onStyleSelect = useCallback((style: string) => {
    setValue('designStyle', style, { shouldValidate: true });
  }, [setValue]);
  
  const onPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('prompt', e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={dir}>
      <Header />
      <main className="flex-grow pb-24 md:pb-0">
        <div className="max-w-4xl mx-auto">
          <div className="text-center pt-5 pb-3 px-4">
            <h2 className="text-[28px] font-bold tracking-tight leading-tight">{t.tagline}</h2>
            <p className="text-base font-normal mt-1">{t.description}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 pt-0">
            {generatedImage ? (
               <BeforeAfterSlider before={photoDataUri} after={generatedImage} />
            ) : isLoading ? (
              <Loader message={t.generating} />
            ) : (
              <ImageUpload onImageUpload={onImageUpload} error={errors.photoDataUri?.message && t.uploadError} />
            )}

            <div>
              <h3 className="text-[22px] font-bold mb-2 pt-1 px-4 text-start">{t.styleTitle}</h3>
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleSelect={onStyleSelect}
                error={errors.designStyle?.message && t.styleError}
              />
            </div>
            
            <div className="px-4">
              <Textarea
                placeholder={t.promptPlaceholder}
                className="min-h-[100px] text-base"
                onChange={onPromptChange}
              />
            </div>

            <div className="flex justify-end px-4">
              <Button type="submit" size="lg" className="h-14 pl-4 pr-6" disabled={isLoading}>
                <Wand2 className="mr-2 h-6 w-6 rtl:ml-2 rtl:mr-0" />
                {t.generate}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
