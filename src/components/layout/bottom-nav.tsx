
'use client';

import { useLanguage } from '@/contexts/language-context';
import { Home, Search, Wand2, Bookmark, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: 'home', icon: Home, href: '/' },
  { id: 'search', icon: Search, href: '/search' },
  { id: 'generate', icon: Wand2, href: '/generate' },
  { id: 'saved', icon: Bookmark, href: '#' },
  { id: 'profile', icon: User, href: '#' },
];

export function BottomNav() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navLabels: { [key: string]: string } = {
    home: t.home,
    search: t.search,
    generate: t.generate,
    saved: t.saved,
    profile: t.profile,
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex justify-around items-start h-16 px-2 pt-2 pb-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const label = navLabels[item.id];
          const colorClass = isActive ? 'text-foreground' : 'text-muted-foreground';

          return (
            <Link key={item.id} href={item.href} passHref>
              <div
                className={`flex flex-col items-center justify-start h-full w-16 rounded-lg transition-colors duration-200 ${colorClass}`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
