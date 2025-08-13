'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

const styles = [
  { name: 'Modern', hint: 'modern living room' },
  { name: 'Minimalist', hint: 'minimalist living room' },
  { name: 'Luxury', hint: 'luxury living room' },
  { name: 'Bohemian', hint: 'bohemian living room' },
  { name: 'Scandinavian', hint: 'scandinavian living room' },
  { name: 'Industrial', hint: 'industrial living room' },
  { name: 'Traditional Arabic', hint: 'arabic majlis' },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
  error?: string;
}

export function StyleSelector({ selectedStyle, onStyleSelect, error }: StyleSelectorProps) {
  return (
    <div>
      <div className="flex overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-3 px-4">
          {styles.map((style) => (
            <div
              key={style.name}
              onClick={() => onStyleSelect(style.name)}
              className={cn(
                'group flex-shrink-0 w-40 cursor-pointer space-y-2',
                selectedStyle !== style.name ? 'opacity-70 hover:opacity-100' : ''
              )}
            >
              <div className={cn(
                'relative rounded-xl overflow-hidden aspect-square ring-offset-background ring-offset-2',
                selectedStyle === style.name ? 'ring-2 ring-primary' : ''
              )}>
                <Image
                  src={`https://placehold.co/300x300.png`}
                  data-ai-hint={style.hint}
                  alt={style.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                 {selectedStyle === style.name && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="text-base font-medium text-center">{style.name}</p>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-destructive text-center mt-2">{error}</p>}
    </div>
  );
}
