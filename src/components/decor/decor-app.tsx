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

const formSchema = z.object({
  photoDataUri: z.string().min(1),
  designStyle: z.string().min(1),
  prompt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function DecorApp() {
  const { t, dir } = useLanguage();
  const { toast } = useToast();
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
      setGeneratedImage(result.data.redesignedRoomImage);
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
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.tagline}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.description}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {generatedImage ? (
               <BeforeAfterSlider before={photoDataUri} after={generatedImage} />
            ) : isLoading ? (
              <Loader message={t.generating} />
            ) : (
              <ImageUpload onImageUpload={onImageUpload} error={errors.photoDataUri?.message && t.uploadError} />
            )}

            <div>
              <h3 className="text-xl font-bold mb-4 text-center">{t.styleTitle}</h3>
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleSelect={onStyleSelect}
                error={errors.designStyle?.message && t.styleError}
              />
            </div>
            
            <Textarea
              placeholder={t.promptPlaceholder}
              className="min-h-[100px] text-base"
              onChange={onPromptChange}
            />

            <div className="flex justify-center">
              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isLoading}>
                <Wand2 className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
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
