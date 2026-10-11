"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/** Illustrative lower-body strength block: three checkpoints across 8 weeks. */
const weeks = [
  {
    id: "wk1",
    label: "Wk 01",
    phase: "Foundation",
    progress: 12,
    lifts: [
      { name: "Back squat", scheme: "3 × 8", load: "40 kg" },
      { name: "Romanian deadlift", scheme: "3 × 10", load: "35 kg" },
      { name: "Reverse lunge", scheme: "3 × 8", load: "BW" },
      { name: "Hip thrust", scheme: "3 × 12", load: "30 kg" },
    ],
    intensity: [55, 0, 60, 0, 50, 0, 0],
  },
  {
    id: "wk4",
    label: "Wk 04",
    phase: "Build",
    progress: 50,
    lifts: [
      { name: "Back squat", scheme: "4 × 6", load: "52 kg" },
      { name: "Romanian deadlift", scheme: "4 × 8", load: "45 kg" },
      { name: "Reverse lunge", scheme: "3 × 8", load: "2 × 8 kg" },
      { name: "Hip thrust", scheme: "4 × 10", load: "45 kg" },
    ],
    intensity: [70, 0, 78, 0, 72, 40, 0],
  },
  {
    id: "wk8",
    label: "Wk 08",
    phase: "Peak",
    progress: 100,
    lifts: [
      { name: "Back squat", scheme: "5 × 4", load: "65 kg" },
      { name: "Romanian deadlift", scheme: "4 × 6", load: "60 kg" },
      { name: "Reverse lunge", scheme: "4 × 6", load: "2 × 12 kg" },
      { name: "Hip thrust", scheme: "4 × 8", load: "70 kg" },
    ],
    intensity: [88, 0, 95, 0, 90, 45, 0],
  },
] as const;

const days = ["S", "M", "T", "W", "T", "F", "S"];
const RADIUS = 22;
const CIRC = 2 * Math.PI * RADIUS;

export function ProgrammePanel() {
  const [active, setActive] = useState<(typeof weeks)[number]["id"]>("wk4");
  const reduce = useReducedMotion();
  const week = weeks.find((w) => w.id === active) ?? weeks[1];
  const spring = { type: "spring", stiffness: 260, damping: 30 } as const;

  return (
    <div className="chamfer-lg bg-line p-px" aria-label="Sample eight-week strength programme">
      <div className="chamfer-lg bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="eyebrow">Sample block · Lower strength</span>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            {week.phase}
          </span>
        </div>

        <div className="p-5">
          <div role="tablist" aria-label="Programme checkpoint" className="grid grid-cols-3 gap-1 rounded-control bg-ink p-1">
            {weeks.map((w) => {
              const isActive = w.id === active;
              return (
                <button
                  key={w.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(w.id)}
                  className={cn(
                    "relative isolate h-9 font-display text-xs font-bold uppercase italic tracking-[0.08em] transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span layoutId="week-tab" aria-hidden className="absolute inset-0 -z-10 rounded-[3px] bg-lime" transition={reduce ? { duration: 0 } : spring} />
                  )}
                  {w.label}
                </button>
              );
            })}
          </div>

          <ul className="mt-5 divide-y divide-line border-y border-line">
            {week.lifts.map((lift, i) => (
              <li key={lift.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-2.5 text-sm">
                <span className="flex items-center gap-3 text-fg">
                  <span className="font-mono text-[10px] text-muted-2">0{i + 1}</span>
                  {lift.name}
                </span>
                <Flip value={lift.scheme} className="font-mono text-xs text-muted" />
                <Flip value={lift.load} className="w-16 text-right font-display text-sm font-bold italic text-lime" />
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-6">
            <div>
              <p className="eyebrow">Weekly intensity</p>
              <div className="mt-3 flex h-16 items-end gap-2">
                {week.intensity.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-12 w-full items-end rounded-[2px] bg-ink">
                      <motion.div
                        className={cn("w-full rounded-[2px]", v >= 85 ? "bg-lime" : v > 0 ? "bg-fg/70" : "bg-transparent")}
                        initial={false}
                        animate={{ height: `${Math.max(v, 4)}%` }}
                        transition={reduce ? { duration: 0 } : { ...spring, delay: i * 0.03 }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted-2">{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
                <circle cx="28" cy="28" r={RADIUS} stroke="currentColor" strokeWidth="4" className="text-ink" fill="none" />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={RADIUS}
                  stroke="#c8f531"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={CIRC}
                  initial={false}
                  animate={{ strokeDashoffset: CIRC * (1 - week.progress / 100) }}
                  transition={reduce ? { duration: 0 } : spring}
                  transform="rotate(-90 28 28)"
                />
              </svg>
              <div>
                <p className="eyebrow">Block</p>
                <p className="font-display text-xl font-bold italic text-fg">
                  <Flip value={`${week.progress}%`} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-line px-5 py-3">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-lime">Coach note · </span>
            Loads rise only when every rep looks clean. Jokes rise regardless. Your plan will look like this, written for you.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Swaps a value with a short rise so the eye catches what changed between weeks. */
function Flip({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block"
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
