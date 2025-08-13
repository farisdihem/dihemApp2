'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const styles = [
  { name: 'Modern', ar_name: 'حديث', hint: 'modern living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQMUrSI0TQCId-W0y1ugOIMzNNgJlRhr3jK4K9XMkZLohBsLcpJXy-8fUQ_itW9GBUfnBEETruk4Ue8bykdiZR79Tdk3TQLXixPNAOOYUEZ2Wwj5E75HyUNJxl2H-oEbpz84andSAUGkgYd4hzwx1b33GJpQ00VvM8bosHZWmtEh7s6kKRepKjTujsU68OOHLpIUoYXg-E0A3NN9LzI8emyvRJhre3FmWm7zQ_aa2ENDZVbUe3jEdOsYW4gaIjhrn6srVme9UgWgB2" },
  { name: 'Minimalist', ar_name: 'بسيط', hint: 'minimalist living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv-2gTHlI5pw11_8KddRXvuC3mwxSg-532BdDwd05yHXb2k3tkikvyw8uLl3HjpHo7z1cR4qBsDAHLBXutA9uA3DnPYk9SMffiKRq74Y9H70GtFUqLI8CWfydQ19hzQc-U5fvpX2Dli62JN2h65jhUlV3jVvnSB5cBBbmy8w07OA4gHOYRsim0Ojp3gf1o0FMNffjxnux7sdbKg4W6EB3k7bor56uDsDGSSgff5GIQF6Kq6Q0BlQhLoJSb26fYfT3l6VLXTzReJHwi" },
  { name: 'Luxury', ar_name: 'فاخر', hint: 'luxury living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpRKQA6e7nGOmBDpbjVGX7CZkKDrobGugdeKPIgH3FFevPVqu3Ga5Sfn_TuLeV4dZjqVP4fQ7zUr5jhGqiLmlnsSrY1nP3trcFQmDlxI-UUVTU2IOIrD3IIzman37qQP0UEY3WFJW1UAWJXsRF8zkGpv8NexwiCYHuZFDeblSKoKZOvuuf4ymnebooj2_DyRxkq2V-nhULDpMxF4QGiLPbaUO6v3GBj9kcZTOKJBglkrRvyHAiyhDv2k3Dnl86YIKj-_jiSU1vxPjC" },
  { name: 'Bohemian', ar_name: 'بوهيمي', hint: 'bohemian living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI5a4L6c1wDRug2eN8dYQZvWrCLMmxt0ZnmUQt-7Nq0Gc7DkP4LZhY9-pMq3JUPBF8pjAVTk8JNZW4Y3XErn2g55rGDiu-sZ9gQCLeWFUSfn5WXpVTXRlIFBr8ZIaX7iOeZrTD2C8KwUTMqWjKDmLFQI1BDG_SWrG-5Cyp0m7g01FkvJsZKwQkaIxZ3I-yFeftpH55UYh1Ne6ALIbk33-huTNPFZ98RHLLtdU_Kflez4j76jTHDU6MN-BsikzMFF-OJS-a_MadbELW" },
  { name: 'Scandinavian', ar_name: 'اسكندنافي', hint: 'scandinavian living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2yPMAA1QbDvjwWv-skljZ4YBzdDsncDahx8IGkJQsKsRCxUS36E348SgWPvHOCm8CtEeTMi6nHV0dGiDIUOT0swtBRkhECescmbWWrII-iMy6MXyVO5-jqWn7ccLRx9Ky1403MiuLXQQfB5-M0r8TB0txs1wTBmT6SCNK_0cQ4CVYr9Dtq6XnBpZ78onXFnTUK1Xj1LYwgd89-UUaudjToQBYSGK8bnUYqksNrILgAJvukbrzQpTcp3r3MytPRk13x3VQgbNDsgni" },
  { name: 'Industrial', ar_name: 'صناعي', hint: 'industrial living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUu76kWTFN8FWPiKlRFNo4-yc3aoZXmITo3CNusOBvujaeQGJjLsVQKdSL7cDHxe7bO22lA0FgwGgRtrHgeZZMslgCIQIoqVd6b1eW_udlKUFUtthQRzIOjs-PJX_BTcxLi4IOyjyx9OrCF0FP0qtiHxpxWDSIHr0Vj4Hcd9ZM-HYdKjvkrMyxcWtWFFAy6DR7afYEGG99Dq80E53bzMPLVxfWIfxMz0ws9pvAyqLRjo_CHPKzaCAMonAUA913Kgp-ddD0TaZroJIM" },
  { name: 'Traditional Arabic', ar_name: 'عربي تقليدي', hint: 'arabic majlis', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIaRcwK_A5vxQWplOvCxF88uvYBqMqT9KdemBd4IcJNfBY9PBMx64SAZvPQY6qGgRdfqSzXIBxqbXmiwhH5nRI2GZ3FJ19UwlZr0J6tGv1_cOCjNvTfN_cvmW7aTWeIjKXiP--oI4fqDN-95680Xiulu-XTJlq-k1ekH8u2riHJjGeneYOpKEfpwqYAad0m6jD5lmk_tdWcxvppy3mAsAvMuBAtpyQxktgNvV5egjf5ozUUxpcl0VMjT_vfHagxB0vpHakdduVrlT2" },
  { name: 'Coastal', ar_name: 'ساحلي', hint: 'coastal living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDslP6Hl44M5O5Z4Q-A4tO1a1A7e_6Q2f_9g2eR6h-j5B_8zV8G_p6O8q9L-H1c7g_8y6K9X-pA3-V9Z6h_gB0rL6fC8b4Z_7H-w_0_dI6S_qN-c_9Y9aA_qA_7K_5C-k_2_w_9" },
  { name: 'Farmhouse', ar_name: 'ريفي', hint: 'farmhouse living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4bZ_8Y_7_6J_1Z_3a_5X_8W_8Y_2X_5Y_5a_7X_5Z_4X_3Y_2X_3Y_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3X_3" },
  { name: 'Mid-Century Modern', ar_name: 'منتصف القرن الحديث', hint: 'mid century modern living room', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_qA_7Y_8Z_9a_5W_8X_7Y_6a_5X_5Y_4Z_3a_2X_2Y_3Z_4a_5X_6Y_7Z_8a_9b_0c_1d_2e_3f_4g_5h_6i_7j_8k_9l_0m_1n_2o_3p_4q_5r_6s_7t_8u_9v_0w_1x_2y_3z" },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
  error?: string;
}

export function StyleSelector({ selectedStyle, onStyleSelect, error }: StyleSelectorProps) {
  const { language } = useLanguage();

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
                  src={style.image}
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
              <p className="text-base font-medium text-center">{language === 'ar' ? style.ar_name : style.name}</p>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-destructive text-center mt-2">{error}</p>}
    </div>
  );
}
