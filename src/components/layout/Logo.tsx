import Link from "next/link";
import { site } from "@/config/site";

/**
 * Mark: a chamfered lime plate with an italic "M" whose outer legs are drawn
 * as two flexed arms — strength with a wink, which is Ming's coaching style.
 * Wordmark: the "I" in MING is a dumbbell standing on end.
 */
export function Mark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className={className}>
      <path d="M0 0h32l8 8v32H8l-8-8z" fill="#c8f531" />
      <g transform="skewX(-10) translate(5 0)" fill="none" stroke="#0a0c0a" strokeWidth="4.2" strokeLinecap="square" strokeLinejoin="miter">
        {/* left arm: forearm up, bicep bump */}
        <path d="M8 31V18c0-4.5 3.2-6.4 5-6.4" />
        {/* right arm, mirrored */}
        <path d="M32 31V18c0-4.5-3.2-6.4-5-6.4" />
        {/* the V of the M: two fists meeting */}
        <path d="M13 11.6 20 22l7-10.4" />
      </g>
      {/* knuckles: two lime-on-black dots where the fists meet */}
      <circle cx="16.6" cy="12.4" r="1.6" fill="#0a0c0a" />
      <circle cx="29.6" cy="12.4" r="1.6" fill="#0a0c0a" />
    </svg>
  );
}

function DumbbellI({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 18" aria-hidden className={className} style={{ height: "0.82em", width: "auto", transform: "skewX(-10deg)" }}>
      <rect x="5" y="2" width="4" height="14" fill="currentColor" />
      <rect x="1" y="0" width="12" height="3.2" fill="currentColor" />
      <rect x="1" y="14.8" width="12" height="3.2" fill="currentColor" />
      <rect x="3" y="4.2" width="8" height="1.6" fill="#0a0c0a" opacity="0.9" />
      <rect x="3" y="12.2" width="8" height="1.6" fill="#0a0c0a" opacity="0.9" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-display text-base font-bold italic uppercase tracking-[0.06em] text-fg ${className}`}>
      <span className="mr-[0.32em]">Coach</span>
      <span className="inline-flex items-baseline">
        M<DumbbellI className="mx-[0.06em] translate-y-[0.05em] text-lime" />NG
      </span>
    </span>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3">
      <span className="sr-only">{site.brand} — home</span>
      <Mark className="transition-transform duration-300 ease-out-expo group-hover:-rotate-6" />
      <Wordmark />
    </Link>
  );
}
