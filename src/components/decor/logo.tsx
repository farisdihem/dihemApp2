import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        {/* Icon: Simple house/leaf fusion */}
        <path 
          d="M20 35 L20 20 L30 10 L40 20 L40 35 L25 35 L25 25 L35 25 L35 35 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M30 10 C 30 10, 45 1, 50 15 C 55 1, 70 10, 70 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          transform="translate(-25 -2)"
        />
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
