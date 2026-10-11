import { cn } from "@/lib/cn";

export function Eyebrow({ children, className, dot = true }: { children: React.ReactNode; className?: string; dot?: boolean }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5", className)}>
      {dot && <span aria-hidden className="inline-block size-1.5 rotate-45 bg-lime shadow-[0_0_10px_rgba(200,245,49,.8)]" />}
      {children}
    </p>
  );
}
