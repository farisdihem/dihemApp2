'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/language-context';

export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
