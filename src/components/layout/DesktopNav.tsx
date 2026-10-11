"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Desktop navigation with an "angle-grinder" hover: the lime underline cuts
 * across the item from left to right while sparks spray off the cutting tip
 * and the label vibrates. Clicking cuts through: the line completes and
 * stays as the active indicator. Everything is pointer-driven, so it costs
 * nothing until a cursor arrives, and reduced-motion users get a plain line.
 */

type Spark = { x: number; y: number; vx: number; vy: number; age: number; life: number };

const CUT_MS = 420;
const RETRACT_MS = 140;
const GRAVITY = 900;

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

/** Tiny particle system drawn on one canvas over the nav list. Plain class, no React state per frame. */
class SparkField {
  private sparks: Spark[] = [];
  private raf: number | null = null;
  private last = 0;
  constructor(private canvas: HTMLCanvasElement, private list: HTMLUListElement) {}

  emit(x: number, y: number, count: number, burst = false) {
    for (let i = 0; i < count; i++) {
      // sparks fly forward and down from the cut, with a few thrown back
      const angle = burst ? Math.random() * Math.PI * 2 : -0.95 + Math.random() * 1.5;
      const speed = (burst ? 140 : 90) + Math.random() * (burst ? 320 : 260);
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed * (Math.random() < 0.15 ? -0.6 : 1),
        vy: Math.sin(angle) * speed,
        age: 0,
        life: 0.22 + Math.random() * 0.4,
      });
    }
    if (this.raf === null) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  destroy() {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.sparks = [];
  }

  private tick = (now: number) => {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    const dt = Math.min(0.05, (now - this.last) / 1000 || 0.016);
    this.last = now;

    const dpr = window.devicePixelRatio || 1;
    const w = this.list.offsetWidth;
    const h = this.list.offsetHeight + 56;
    if (this.canvas.width !== Math.round(w * dpr) || this.canvas.height !== Math.round(h * dpr)) {
      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const live: Spark[] = [];
    for (const s of this.sparks) {
      s.age += dt;
      if (s.age >= s.life) continue;
      s.vy += GRAVITY * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const t = s.age / s.life;
      // white-hot → lime → ember orange as the spark cools
      ctx.strokeStyle = t < 0.3 ? "#ffffff" : t < 0.65 ? "#c8f531" : "#ff8a3d";
      ctx.globalAlpha = 1 - t * t;
      ctx.lineWidth = t < 0.3 ? 1.6 : 1.1;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 0.028, s.y - s.vy * 0.028);
      ctx.stroke();
      live.push(s);
    }
    ctx.globalAlpha = 1;
    this.sparks = live;
    this.raf = live.length > 0 ? requestAnimationFrame(this.tick) : null;
  };
}

export function DesktopNav({ pathname }: { pathname: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const field = useRef<SparkField | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (canvasRef.current && listRef.current) field.current = new SparkField(canvasRef.current, listRef.current);
    return () => {
      field.current?.destroy();
      field.current = null;
    };
  }, []);

  const emit = useCallback(
    (x: number, y: number, count: number, burst = false) => {
      if (!reduce) field.current?.emit(x, y, count, burst);
    },
    [reduce],
  );

  return (
    <nav aria-label="Primary" className="relative hidden md:block">
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10" />
      <ul ref={listRef} className="flex items-center gap-1">
        {nav.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return <NavItem key={item.href} href={item.href} label={item.label} active={active} emit={emit} listRef={listRef} reduce={reduce} />;
        })}
      </ul>
    </nav>
  );
}

type ItemProps = {
  href: string;
  label: string;
  active: boolean;
  reduce: boolean;
  emit: (x: number, y: number, count: number, burst?: boolean) => void;
  listRef: React.RefObject<HTMLUListElement | null>;
};

function NavItem({ href, label, active, reduce, emit, listRef }: ItemProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const progress = useRef(active ? 1 : 0);
  const raf = useRef<number | null>(null);
  const [shaking, setShaking] = useState(false);

  const setLine = (p: number) => {
    if (lineRef.current) lineRef.current.style.transform = `scaleX(${p})`;
  };

  // Keep the line in sync with route changes.
  useEffect(() => {
    progress.current = active ? 1 : 0;
    setLine(progress.current);
  }, [active]);

  const tip = () => {
    const line = lineRef.current;
    const list = listRef.current;
    if (!line || !list) return null;
    const lr = line.getBoundingClientRect();
    const ur = list.getBoundingClientRect();
    // the line is scaled from its left edge, so compute the tip from the untransformed width
    const fullWidth = line.offsetWidth;
    return { x: lr.left - ur.left + fullWidth * progress.current, y: lr.top - ur.top + lr.height / 2 };
  };

  const animate = (target: number, ms: number, sparking: boolean) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const from = progress.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      progress.current = from + (target - from) * t;
      setLine(progress.current);
      if (sparking) {
        const p = tip();
        if (p) emit(p.x, p.y, 3);
      }
      if (t < 1) raf.current = requestAnimationFrame(step);
      else raf.current = null;
    };
    raf.current = requestAnimationFrame(step);
  };

  const onEnter = () => {
    if (active) return;
    if (reduce) {
      setLine(1);
      progress.current = 1;
      return;
    }
    setShaking(true);
    animate(1, CUT_MS * (1 - progress.current), true);
  };

  const onLeave = () => {
    if (active) return;
    animate(0, RETRACT_MS, false);
  };

  const onClick = () => {
    const p = tip();
    if (p) emit(p.x, p.y, 28, true);
    progress.current = 1;
    setLine(1);
  };

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  return (
    <li className="relative">
      <Link
        ref={linkRef}
        href={href}
        aria-current={active ? "page" : undefined}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        onClick={onClick}
        className={cn("nav-link relative block px-4 py-2 transition-colors", active ? "text-fg" : "text-muted hover:text-fg")}
      >
        <span
          className={cn("inline-block", shaking && "nav-shake")}
          onAnimationEnd={() => setShaking(false)}
        >
          {label}
        </span>
        <span
          ref={lineRef}
          aria-hidden
          className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left bg-lime shadow-[0_0_6px_rgba(200,245,49,.7)]"
          style={{ transform: `scaleX(${active ? 1 : 0})` }}
        />
      </Link>
    </li>
  );
}
