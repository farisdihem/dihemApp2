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
      <g>
        <rect width="200" height="100" fill="#1A2E39" />
        <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#F26A4E" />
        <path d="M150 0 L200 50 L150 100 L100 50 Z" fill="#4EADF2" />
        <text 
          x="100" 
          y="58" 
          fontFamily="sans-serif" 
          fontWeight="bold" 
          fontSize="20px" 
          textAnchor="middle" 
          fill="white"
        >
          decorAI-DIHEM
        </text>
      </g>
    </svg>
  );
}
