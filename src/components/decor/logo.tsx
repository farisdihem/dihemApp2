import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Abstract Icon inspired by the image */}
        <path d="M10 10 H 30 V 30 H 10 Z" fill="hsl(var(--primary))" />
        <circle cx="20" cy="20" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="20" cy="20" r="3" fill="hsl(var(--primary))" />
        <path d="M 5 5 L 15 15 M 25 15 L 35 5 M 5 35 L 15 25 M 25 25 L 35 35" stroke="hsl(var(--primary))" strokeWidth="1.5" />

      </g>
      {/* Text: dihem decorAI */}
      <text x="55" y="32" fontFamily="sans-serif" fontWeight="bold" fontSize="28px" fill="currentColor">
        dihem
      </text>
      <text x="125" y="32" fontFamily="sans-serif" fontWeight="normal" fontSize="28px" fill="hsl(var(--primary))">
        decorAI
      </text>
    </svg>
  );
}
