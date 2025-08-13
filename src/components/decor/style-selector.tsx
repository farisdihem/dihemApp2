'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';

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
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-4">
          {styles.map((style) => (
            <Card
              key={style.name}
              onClick={() => onStyleSelect(style.name)}
              className={cn(
                'group relative flex-shrink-0 w-40 cursor-pointer overflow-hidden transition-all duration-300 ring-offset-background ring-offset-2',
                selectedStyle === style.name ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
              )}
            >
              <Image
                src={`https://placehold.co/300x300.png`}
                data-ai-hint={style.hint}
                alt={style.name}
                width={160}
                height={160}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-semibold truncate">{style.name}</p>
              {selectedStyle === style.name && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-destructive text-center mt-2">{error}</p>}
    </div>
  );
}
