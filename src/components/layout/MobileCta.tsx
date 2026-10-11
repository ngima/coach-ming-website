"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/**
 * Slim sticky WhatsApp bar for phones. It appears once the hero CTA has
 * scrolled away, so the next step is always one thumb away.
 * No backdrop blur and a dedicated compositor layer: mobile browsers resize
 * the viewport when the address bar collapses, and a blurred fixed element
 * repaints slowly during that resize, which makes the bar look laggy.
 */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  // Hysteresis: appears after 560px, hides again only above 440px, so it never flickers.
  useMotionValueEvent(scrollY, "change", (v) => setShow((prev) => (prev ? v > 440 : v > 560)));

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] will-change-transform md:hidden",
        "transition-[translate,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
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
