import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 80"
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e66b19" />
          <stop offset="100%" stopColor="#E6D799" />
        </linearGradient>
      </defs>
      <rect x="10" y="20" width="40" height="40" rx="8" fill="url(#logoGradient)" />
      <path d="M25 30 L 35 40 L 25 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text 
        x="65" 
        y="50" 
        fontFamily="Plus Jakarta Sans, sans-serif" 
        fontWeight="bold" 
        fontSize="24" 
        fill="hsl(var(--foreground))"
        dominantBaseline="middle"
      >
        decorAI-DIHEM
      </text>
    </svg>
  );
}
