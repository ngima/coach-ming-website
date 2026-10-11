"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { process } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const START_S = 0.3; // 01 fills
const FILL_S = 0.45;
const LINE_START_S = START_S + FILL_S * 0.6; // line leaves 01 while its fill is finishing
const LINE_S = 2.4; // one continuous travel from 01 to the end, constant speed
const BADGE_PX = 48;
const INK = "#0a0c0a";
const LIME = "#c8f531";
const N = process.length;

// When the lead point reaches badge i (fraction i/N along the line, a touch early so the
// fill starts as the point arrives rather than after).
const reachAt = (i: number) => (i === 0 ? START_S : LINE_START_S + (i / N - 0.02) * LINE_S);

/**
 * One trigger (the list entering the viewport), one timeline:
 * 01 fills → the line travels in a single continuous motion from 01 to the end,
 * and each badge fills the moment the lead point reaches it. Pending badges
 * carry a slow lime shimmer so they read as "up next". Once per visit.
 */
export function Process() {
  const reduce = useReducedMotion();
  const t = (delay: number, duration: number) => (reduce ? { delay: 0, duration: 0 } : { delay, duration });

  const step = (i: number): Variants => ({
    hidden: { opacity: 0, y: 14 },
    shown: { opacity: 1, y: 0, transition: { ...t(i * 0.08, 0.6), ease: [0.16, 1, 0.3, 1] } },
  });
  const line: Variants = {
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { ...t(LINE_START_S, LINE_S), ease: "linear" } },
  };
  const lead: Variants = {
    hidden: { left: "0%", opacity: 0 },
    shown: {
      left: ["0%", "0%", "100%", "100%"],
      opacity: [0, 1, 1, 0],
      transition: { ...t(LINE_START_S, LINE_S + 0.25), ease: "linear", times: [0, 0.02, LINE_S / (LINE_S + 0.25), 1] },
    },
  };
  const wipe = (i: number): Variants => ({
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { ...t(reachAt(i), FILL_S), ease: [0.3, 0, 0.1, 1] } },
  });
  const digit = (i: number): Variants => ({
    hidden: { color: LIME },
    shown: { color: INK, transition: t(reachAt(i) + FILL_S * 0.35, 0.25) },
  });
  const glow = (i: number): Variants => ({
    hidden: { boxShadow: "0 0 0 0 rgba(200,245,49,0)" },
    shown: {
      boxShadow: ["0 0 0 0 rgba(200,245,49,0)", "0 0 22px 4px rgba(200,245,49,.45)", "0 0 10px 0 rgba(200,245,49,.25)"],
      transition: { ...t(reachAt(i) + FILL_S * 0.6, 0.9), times: [0, 0.35, 1], ease: "easeOut" },
    },
  });

  return (
    <section className="py-14 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From first message to <span className="text-lime">first PR</span>
            </>
          }
          text="Three steps. No long forms, no hard sell. You will know exactly what the plan is before you commit to anything."
          align="center"
        />
        <motion.ol
          className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-0"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div aria-hidden className="absolute left-0 top-6 hidden h-px w-full bg-line md:block" />

          {/* one continuous line from 01's right edge to the end */}
          <div aria-hidden className="absolute top-6 hidden h-px md:block" style={{ left: BADGE_PX, right: 0 }}>
            <motion.span variants={line} className="absolute inset-0 origin-left bg-lime" />
            {!reduce && (
              <motion.span
                variants={lead}
                className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg shadow-[0_0_12px_4px_rgba(200,245,49,.75)]"
              />
            )}
          </div>

          {process.map((p, i) => (
            <motion.li key={p.step} variants={step(i)} className="relative md:pr-8 md:pt-14">
              <div className="flex items-center gap-4 md:absolute md:top-0 md:left-0">
                <motion.span
                  variants={glow(i)}
                  className="chamfer relative grid size-12 place-items-center overflow-hidden bg-ink font-display text-sm font-bold italic ring-1 ring-line-strong"
                >
                  {/* pending shimmer: a slow lime gloss until the fill covers it */}
                  {!reduce && <span aria-hidden className="badge-shimmer absolute inset-0" />}
                  <motion.span aria-hidden variants={wipe(i)} className="absolute inset-0 origin-left" style={{ backgroundColor: LIME }} />
                  <motion.span variants={digit(i)} className="relative">
                    {p.step}
                  </motion.span>
                </motion.span>
              </div>
              <h3 className="display mt-5 text-2xl text-fg md:mt-0">{p.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{p.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
