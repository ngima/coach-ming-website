"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/**
 * Slim sticky WhatsApp bar for phones. It appears once the hero CTA has
 * scrolled away, so the next step is always one thumb away.
 */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 520));

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out-expo md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!show}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="chamfer flex h-12 w-full items-center justify-center gap-3 bg-lime font-display text-[0.8rem] font-bold uppercase italic tracking-[0.08em] text-ink"
      >
        Book a free consult
        <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      </a>
    </div>
  );
}
