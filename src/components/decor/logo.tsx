import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#F0E8E8', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g clipPath="url(#clip)">
        <path d="M0 0 H200 V100 H0 Z" fill="#F2E6E4" />
        <path d="M-20 100 L100 -20 L220 -20 L100 120 Z" fill="#DDE6E8" />
        <path d="M40 0 H240 L160 100 H-40 Z" fill="#C9D6D9" />
        <path 
          d="M35 50 C40 30, 60 25, 80 30 L170 65 C180 70, 180 80, 170 85 L80 115 C70 120, 50 120, 40 110 Z" 
          transform="rotate(-20 100 60)" 
          fill="#4A5559"
        />
        <text 
          x="100" 
          y="58" 
          fontFamily="sans-serif" 
          fontWeight="bold" 
          fontSize="24px" 
          textAnchor="middle" 
          fill="url(#textGradient)"
        >
          DECORai
        </text>
      </g>
    </svg>
  );
}
