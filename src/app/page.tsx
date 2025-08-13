
'use client';

import { DecorApp } from '@/components/decor/decor-app';
import { usePathname } from 'next/navigation';
import SearchPage from './search/page';

export default function Home() {
  const pathname = usePathname();

  if (pathname === '/search') {
    return <SearchPage />;
  }
  
  return <DecorApp />;
}
