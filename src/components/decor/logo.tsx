import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 40"
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Professional Icon */}
        <path d="M10 5 Q 20 0, 30 5 L 30 35 Q 20 40, 10 35 Z" fill="hsl(var(--primary))" />
        <path d="M10 5 Q 15 10, 10 15 M30 5 Q 25 10, 30 15" stroke="hsl(var(--background))" strokeWidth="1.5" fill="none"/>
         <circle cx="20" cy="20" r="4" fill="hsl(var(--background))" />
      </g>
      {/* Text: dihem decorAI */}
      <text x="45" y="29" fontFamily="sans-serif" fontWeight="bold" fontSize="26px" fill="currentColor">
        dihem
      </text>
      <text x="135" y="29" fontFamily="sans-serif" fontWeight="normal" fontSize="26px" fill="hsl(var(--primary))">
        decorAI
      </text>
    </svg>
  );
}
