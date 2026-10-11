import { cn } from "@/lib/cn";

/** Tiny horizontal dumbbell used as the brand marker in eyebrows, chips and separators. */
export function Dumbbell({ className, size = 12 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 14" width={size * 1.7} height={size} className={cn("inline-block shrink-0 text-lime", className)} fill="currentColor">
      <rect x="8" y="5.5" width="8" height="3" rx="0.5" />
      <rect x="4" y="2" width="3.5" height="10" rx="0.8" />
      <rect x="16.5" y="2" width="3.5" height="10" rx="0.8" />
      <rect x="1.5" y="4" width="2.5" height="6" rx="0.6" />
      <rect x="20" y="4" width="2.5" height="6" rx="0.6" />
    </svg>
  );
}
