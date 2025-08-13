'use client';

import { useLanguage } from '@/contexts/language-context';
import { Home, Search, Wand2, Bookmark, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const navItems = [
  { id: 'home', icon: Home, href: '#' },
  { id: 'search', icon: Search, href: '#' },
  { id: 'generate', icon: Wand2, href: '#' },
  { id: 'saved', icon: Bookmark, href: '#' },
  { id: 'profile', icon: User, href: '#' },
];

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => {
          const isActive = index === 0; // Highlight 'Home' for now
          const Icon = item.icon;
          const label = t[item.id as keyof typeof t];

          return (
            <Link key={item.id} href={item.href} passHref>
              <Button
                variant="ghost"
                className={`flex flex-col items-center justify-center h-full w-16 rounded-lg transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
