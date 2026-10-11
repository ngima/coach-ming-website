import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

type Props = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Show the directional arrow that nudges on hover (affordance cue). */
  arrow?: boolean;
  onClick?: () => void;
};

const base =
  "group/btn relative inline-flex items-center active:scale-[0.98] transition-transform motion-reduce:active:scale-100 justify-center gap-3 select-none font-display font-bold italic uppercase tracking-[0.08em] transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "chamfer bg-lime text-ink hover:bg-[#d8ff4a]",
  inverse: "chamfer bg-ink text-lime hover:bg-[#161a16]",
  secondary: "border border-line-strong text-fg hover:border-lime hover:text-lime rounded-control",
  ghost: "text-fg hover:text-lime",
};

const sizes = {
  md: "h-12 px-6 text-[0.8rem]",
  lg: "h-14 px-8 text-[0.9rem]",
};

export function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  arrow = variant === "primary" || variant === "inverse",
  onClick,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
        >
          <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      )}
    </>
  );
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
