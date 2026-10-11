import { cn } from "@/lib/cn";
import { Dumbbell } from "./Dumbbell";

export function Eyebrow({ children, className, dot = true }: { children: React.ReactNode; className?: string; dot?: boolean }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5", className)}>
      {dot && <Dumbbell size={9} className="drop-shadow-[0_0_6px_rgba(200,245,49,.8)]" />}
      {children}
    </p>
  );
}
