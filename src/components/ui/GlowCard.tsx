"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Card whose border lights up around the cursor. The glow is a signal that the
 * whole card is interactive (it wraps a link), so it is only used on linked cards.
 */
export function GlowCard({ className, children, as: Tag = "div" }: { className?: string; children: React.ReactNode; as?: "div" | "li" | "article" }) {
  const ref = useRef<HTMLElement | null>(null);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      onPointerMove={onMove}
      className={cn("group/card relative rounded-card bg-line p-px", className)}
    >
      <span aria-hidden className="glow-ring pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      <div className="relative h-full rounded-[15px] bg-surface">{children}</div>
    </Tag>
  );
}
