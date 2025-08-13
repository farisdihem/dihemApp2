'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (dataUri: string) => void;
  error?: string;
}

export function ImageUpload({ onImageUpload, error }: ImageUploadProps) {
  const { t } = useLanguage();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUri = e.target?.result as string;
          setPreview(dataUri);
          onImageUpload(dataUri);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    maxFiles: 1,
    noClick: !preview, // Only allow click when there's no preview
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-14 text-center transition-colors bg-white',
        isDragActive ? 'border-primary bg-primary/10' : 'hover:border-primary/50',
        error ? 'border-destructive' : 'border-border',
        preview ? 'cursor-default' : 'cursor-pointer'
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <Image
          src={preview}
          alt="Room preview"
          width={400}
          height={400}
          className="max-h-64 w-auto object-contain rounded-lg"
        />
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-bold">{t.uploadTitle}</p>
            <p className="text-sm text-muted-foreground">{t.uploadSubtitle}</p>
          </div>
          <Button type="button" variant="secondary" className="mt-2" onClick={open}>
            {t.browse}
          </Button>
        </>
      )}
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}
