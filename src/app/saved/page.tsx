
'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Logo } from '@/components/decor/logo';

const savedDesigns = [
  {
    name: 'Modern Living Room',
    ar_name: 'غرفة معيشة حديثة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7irELyqsULGD86bCvgXMI-91_Nzo5BmozcMHkTeOpH6qmD-jsddo6Q-o6_Law2VzB8Ei1gvTdo87ZqTvnCr0E5uVKbwZQqjiqWgJyDILfNJQ6mkuqgWfYi4Xr5AiBmkgXfZlNMmcCebO5EOp0cwUejZq_khbrEEXNEaVLIA_Z0wZa48LeM9t7r7A86opCJ-nITSjL4hh-6HTqjTVB69raISg964yTq-TzkdDGceN8tjD57QwqazlFNaQQONOlJGDYv-WT_U_e7IZb',
    hint: 'modern living room',
  },
  {
    name: 'Cozy Bedroom',
    ar_name: 'غرفة نوم مريحة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACeFNifLKEdU-Szbn73CeMafWRQhvzX8SE5n_bcBvkCXeIR3e6W6dopOgLnyOUqjhltPAA6EGr57Lc3W3qP2hVj2xmzUqmXzwNjUjvGQ_5WowMrCvpq3p9q9J0WwP564JqKmGw7sXrgQ0g2P31p9Ws3EbstEPWPa4QAuUEA7W-qrtGh9uTaFBt4gKMwAJbuxmKnfhzDEO2W0XTOBoIWtlERNENuTWnVfuRuQO6M2zGWXayRenYLFDhU5ExUn_AQLLvA0eusFX9hzNu',
    hint: 'cozy bedroom',
  },
  {
    name: 'Minimalist Kitchen',
    ar_name: 'مطبخ بسيط',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzqsYzDzlHVRjIacdtlyvpiWzruQn1QZzUfJlTDWPOaojGq72jlCjKyqJ5hZZ4FxhpqjQSkLyZgdCNzIfyt_idP0FrhmaqfWFcXpM6GFtcKZaR-Hvs2VGBjB1FCW6-xNqKFrAWI2cOCfD6wI8d6e8Zg6cjkxgCUO_b4cHc2o9rHvA1fSnWaULyqn3sHnai27f4WaauD46HQJq4N-8XdsT_w3FLznijcCdloFZTEeVteKy_McnbRelXmzu_RnuvvxwvJFQDAvM5Frj6',
    hint: 'minimalist kitchen',
  },
  {
    name: 'Rustic Dining Room',
    ar_name: 'غرفة طعام ريفية',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRFzrpsVssQMgmEOc3Pked8TVQbAy29yAmmsr9GUvKno46CyBzIlUMfvNZkBE5HCcirEimxUatqweQu2z2SJNETr_xLgQpQvE4xDG3VRie1telWDMv7sNTZDa0GtEmGAlEXD5LP_vb87bDyMmh82M27f-2W1juY_PC24lDHY1e9yE0kXUlYhSFQkBkaaSx9_cHAriv5t8ZIrIKpbFXBwRa99Oz5-Fu8gtQqy_BX7oyaxUyLOLVqdD-NE-_budJ_azdjdrzJQS4OYky',
    hint: 'rustic dining room',
  },
  {
    name: 'Bohemian Study',
    ar_name: 'مكتب بوهيمي',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJbkAcU7EP5hGwZxfd1o4u_uusNftuZHRoL5NT-rx16-Sk1GNqD5bYTx_ZtznRT6cDa0b36m7ETc2KaThnS0I3ydtS7NEOizCANYQPEygake94h0OtF-HaBm5zfe3jgmxyVoX6muK9_sY-I1NzO_2q55XoAx1eUlZ5LBpF_YGU1rmfdj5kf465rXfG81rsvMZl4wZnWhcM_qhKdn5ti2mnKeUI4J5_o_R0aeQ66OYER_oLgOTA6KbqeK0phhmhVmUqmtnz37w6J3kC',
    hint: 'bohemian study',
  },
  {
    name: 'Contemporary Bathroom',
    ar_name: 'حمام معاصر',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEogXG7zGV6mEeUdfmvPeS5JbD88mJ7orwsxYhpJA6ecfCHDEwdWPrDRk5e_h425vNvxRV9dxC_XFTlBUzR_w52eON5oxQou9rIfUQAdAAoNUJTJBFmUrm1dWxV74KW3dbXvI3PpY9S1al-4tCZ3nH4kjYTzaIHDEij3REWvt0XuPctk6PlNcQDPVrKL9jz0F9mTL1C6uwVCE_JbGNwVwTdDWNzxoYBgGvRkrc3H5SL7P-S_T_swrwQ6DsLy5pSvfMlVwYj_ed_LwE',
    hint: 'contemporary bathroom',
  },
];


export default function SavedPage() {
  const { t, language, dir } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={dir}>
      <header className="bg-background p-4 pb-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-12"></div>
          <div className="text-center flex-1">
             <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">{t.saved}</h2>
          </div>
          <div className="flex w-12 items-center justify-end">
            <Button variant="ghost" size="icon" aria-label="Add new">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow pb-24 md:pb-0">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {savedDesigns.map((design) => (
            <div key={design.name} className="flex flex-col gap-3 pb-3 group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={design.image}
                  data-ai-hint={design.hint}
                  alt={language === 'ar' ? design.ar_name : design.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-base font-medium text-center">{language === 'ar' ? design.ar_name : design.name}</p>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
