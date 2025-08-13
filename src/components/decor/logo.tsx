import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 150 40" 
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="sans-serif"
      fontWeight="bold"
      fontSize="38px"
      fill="currentColor"
    >
      <text x="0" y="32">D</text>
      <text x="25" y="32">I</text>
      <text x="40" y="32">H</text>
      <text x="67" y="32">E</text>
      <text x="90" y="32">M</text>
    </svg>
  );
}
