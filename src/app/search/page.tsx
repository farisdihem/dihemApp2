
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Search } from 'lucide-react';

const popularStyles = [
  {
    name: 'Modernity',
    ar_name: 'الحداثة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtvKZqJUDX5598PCrd-NgXj-JLaWgaIzbJzVk-2hBBk1Hki4v6zwVXZ3dMLErP92u_XRT6tD4NndXNXKTOAs6RyNc0YCwf3OvtkKKgoJyPk1x-sgWY5ZMyyOTLGTAfailAPXo3XwL1MizgoZUI499zW37edH-7i_B8Bn-LYYIY5dd0OEk2JPQIgUJZYDWxQ88i5sXxx9en2s0zFmhdmgMr64K71QaDrw9WMmqg1Up8in3SIud4Wo5TtiIQIRgzmvT-CdNiglDp_Qrp',
    hint: 'modern interior',
  },
  {
    name: 'Bohemian',
    ar_name: 'البوهيمية',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCZeOYS2buBT6_61etnfkxtPg3a2yQ45HfS-zAZbNn9327lC0q-zwoWkXz17Zm-QSFVRjPqt4RHpzNx33tUCyIlumntZyxGQnxYYKi4PBIVDbVldlCa0Av39wz8ny9eKjROyhiXC5jfCtwog6UkrGKj4WpZ8fxGjOarzs1rKST-imc4RKUpDtmciDXHRBIpgIXNT6e15s7gbc72M0nwVwXv7pFcuDDylBi1MN7NIi3wDQZL7O5iq8ntyKIfiwGMmWmPIgTRZnlWVZu',
    hint: 'bohemian interior',
  },
  {
    name: 'Abstract',
    ar_name: 'التجريدية',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcfAYglDuMU1hIYopTRXgeBraVzmdTzsiOk_E1ndJRPWWUXWilGM5_xAXqtlRDmG6ll2_hTLf5lr2oivBTSOO4jRPAASxYz7ksC0JvpRz7fhENCsgnlSwolcbnFDCPvIQ-LEeqmmg6aqQu9hF9yRaIf5uofQd9IjiBL0aHLKhHoEv2qrL6r77Ahayox_g3Vn8VsEx-zV25vLSORYhE79txp3jmiWdyLD1wU_y0O5VuHy5ccZK9RRPvMeSIXdmyFmOOXIow4RrBA-NY',
    hint: 'abstract interior',
  },
  {
    name: 'Minimalist',
    ar_name: 'البسيطة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4Kr1MvnP6hi_3bq9TK2eisajeyIFneJVdLWIkbvkz2AhE8E3WdpCeX7TV0LPR7alcVPQVhlKP9-JZzeqroMPNz-QyKTh6UnnnzakVEYTbdLb8wLsFG0JZwBPI7euPBbslbb5WDegsAvZZRKM3xdLnHztsYjOxdk6mLH-hof6w2CwmP1n4QQXzq26RYCYUWsAcyyp5gplQgs6H0ImUnVl5JCvTng2QwDbfXTfcWdHCfVRj8PYDkQix9pcDhz46yz4FZ-rvr9S73U-s',
    hint: 'minimalist interior',
  },
];

export default function SearchPage() {
  const { t, language, dir } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={dir}>
      <Header showSettings={true} />
      <main className="flex-grow pb-24 md:pb-0">
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-12 pr-4 text-base bg-secondary border-none rounded-xl"
            />
          </div>
        </div>
        <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">{t.popularStyles}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {popularStyles.map((style) => (
            <div key={style.name} className="flex flex-col gap-3 pb-3 group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={style.image}
                  data-ai-hint={style.hint}
                  alt={language === 'ar' ? style.ar_name : style.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-base font-medium text-center">{language === 'ar' ? style.ar_name : style.name}</p>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
