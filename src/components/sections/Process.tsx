"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { process } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// One step: the badge fills, the line travels to the next badge, then a beat of rest.
const FILL_S = 0.45;
const TRAVEL_S = 1.0;
const REST_S = 0.4;
const STEP_S = FILL_S + TRAVEL_S + REST_S;
const START_S = 0.3;
const badgeAt = (i: number) => START_S + i * STEP_S;
const travelAt = (i: number) => badgeAt(i) + FILL_S;
const TRAVEL_EASE = [0.45, 0, 0.2, 1] as const;
const INK = "#0a0c0a";
const LIME = "#c8f531";

/**
 * The whole sequence runs from ONE trigger (the list entering the viewport)
 * and every element is a variant with its own delay, so the timeline is
 * coordinated and does not depend on per-element intersection (which is
 * unreliable for zero-width elements such as an un-drawn line).
 *
 * 01 fills → line travels → rest → 02 fills → line travels → rest → 03 fills
 * → line runs out. The fill is a wipe in the line's direction, the line has
 * a glowing lead point, and each badge settles with a soft glow. Once per visit.
 */
export function Process() {
  const reduce = useReducedMotion();
  const t = (delay: number, duration: number) => (reduce ? { delay: 0, duration: 0 } : { delay, duration });

  const step = (i: number): Variants => ({
    hidden: { opacity: 0, y: 14 },
    shown: { opacity: 1, y: 0, transition: { ...t(i * 0.08, 0.6), ease: [0.16, 1, 0.3, 1] } },
  });
  const line = (i: number): Variants => ({
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { ...t(travelAt(i), TRAVEL_S), ease: TRAVEL_EASE } },
  });
  const lead = (i: number): Variants => ({
    hidden: { left: "0%", opacity: 0 },
    shown: {
      left: ["0%", "0%", "100%", "100%"],
      opacity: [0, 1, 1, 0],
      transition: { ...t(travelAt(i), TRAVEL_S + 0.2), ease: TRAVEL_EASE, times: [0, 0.03, 0.85, 1] },
    },
  });
  const wipe = (i: number): Variants => ({
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { ...t(badgeAt(i), FILL_S), ease: [0.3, 0, 0.1, 1] } },
  });
  const digit = (i: number): Variants => ({
    hidden: { color: LIME },
    shown: { color: INK, transition: t(badgeAt(i) + FILL_S * 0.35, 0.25) },
  });
  const glow = (i: number): Variants => ({
    hidden: { boxShadow: "0 0 0 0 rgba(200,245,49,0)" },
    shown: {
      boxShadow: ["0 0 0 0 rgba(200,245,49,0)", "0 0 22px 4px rgba(200,245,49,.45)", "0 0 10px 0 rgba(200,245,49,.25)"],
      transition: { ...t(badgeAt(i) + FILL_S * 0.6, 0.9), times: [0, 0.35, 1], ease: "easeOut" },
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
          className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div aria-hidden className="absolute left-0 top-6 hidden h-px w-full bg-line md:block" />

          {process.map((p, i) => (
            <div
              key={`seg-${p.step}`}
              aria-hidden
              className="absolute top-6 hidden h-px md:block"
              style={{ left: `${(i / process.length) * 100}%`, width: `${100 / process.length}%` }}
            >
              <motion.span variants={line(i)} className="absolute inset-0 origin-left bg-lime" />
              {!reduce && (
                <motion.span
                  variants={lead(i)}
                  className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg shadow-[0_0_12px_4px_rgba(200,245,49,.75)]"
                />
              )}
            </div>
          ))}

          {process.map((p, i) => (
            <motion.li key={p.step} variants={step(i)} className="relative md:pt-14">
              <div className="flex items-center gap-4 md:absolute md:top-0 md:left-0">
                <motion.span
                  variants={glow(i)}
                  className="chamfer relative grid size-12 place-items-center overflow-hidden bg-ink font-display text-sm font-bold italic ring-1 ring-line-strong"
                >
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
