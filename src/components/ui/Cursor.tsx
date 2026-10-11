"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], [role='tab'], summary, label, select";
const TEXT_INPUT = "input, textarea, [contenteditable='true']";

/**
 * Dumbbell cursor for mouse users. It sits exactly on the pointer hotspot
 * (no lag, so clicking stays precise), grows over anything clickable, and
 * does slow curls while it hovers, and squashes on press. Touch devices and
 * text fields keep the native cursor.
 * Blend mode "difference" keeps it visible on both black and lime surfaces.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    let x = -100;
    let y = -100;
    let raf: number | null = null;

    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (raf === null) raf = requestAnimationFrame(render);
      const t = e.target as Element | null;
      const overText = !!t?.closest(TEXT_INPUT);
      const overLink = !overText && !!t?.closest(INTERACTIVE);
      el.dataset.state = overText ? "hidden" : overLink ? "hover" : "idle";
    };
    const onDown = () => el.setAttribute("data-pressed", "");
    const onUp = () => el.removeAttribute("data-pressed");
    const onLeave = () => (el.dataset.state = "hidden");
    const onEnter = () => (el.dataset.state = "idle");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden data-state="hidden" className="cursor-dumbbell">
      <svg viewBox="0 0 32 32" width="32" height="32">
        <g className="cursor-rep">
        <g transform="rotate(-30 16 16)">
          <rect x="11" y="14.5" width="10" height="3" rx="0.5" fill="#c8f531" />
          <rect x="6" y="11" width="4.5" height="10" rx="0.8" fill="#c8f531" />
          <rect x="21.5" y="11" width="4.5" height="10" rx="0.8" fill="#c8f531" />
          <rect x="3" y="12.5" width="3" height="7" rx="0.6" fill="#c8f531" />
          <rect x="26" y="12.5" width="3" height="7" rx="0.6" fill="#c8f531" />
        </g>
        </g>
      </svg>
    </div>
  );
}
