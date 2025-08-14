'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/language-context';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [value, setValue] = useState(50);
  const { t, dir } = useLanguage();

  const clipPathValue = dir === 'rtl' ? `inset(0 0 0 ${100 - value}%)` : `inset(0 ${100 - value}% 0 0)`;

  return (
    <div className="relative w-full max-w-4xl mx-auto @container">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border">
        <Image src={before} alt={t.before} layout="fill" objectFit="cover" />
        <div
          className="absolute inset-0"
          style={{ clipPath: clipPathValue }}
        >
          <Image src={after} alt={t.after} layout="fill" objectFit="cover" />
        </div>
        <div 
          className="absolute top-0 bottom-0 bg-white w-1"
          style={{ 
            left: `calc(${value}% - 2px)`,
            right: dir === 'rtl' ? `calc(${100 - value}% - 2px)` : undefined,
          }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white rounded-full p-1 border shadow-md">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
          </div>
        </div>
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">{t.before}</div>
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">{t.after}</div>
      </div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={(vals) => setValue(vals[0])}
        className="mt-4"
        dir={dir}
      />
    </div>
  );
}
