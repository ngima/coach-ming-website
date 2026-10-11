"use client";

import { motion, useReducedMotion } from "motion/react";
import { process } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// One step: badge fills, the line travels to the next badge, then a beat of rest.
const FILL_S = 0.3;
const TRAVEL_S = 0.9;
const REST_S = 0.5;
const STEP_S = FILL_S + TRAVEL_S + REST_S;
const START_S = 0.15;
const badgeAt = (i: number) => START_S + i * STEP_S;
const travelAt = (i: number) => badgeAt(i) + FILL_S;

/**
 * When the steps scroll into view they play as a sequence on their own clock:
 * 01 fills → line travels → rest → 02 fills → line travels → rest → 03 fills
 * → line runs out. Once per visit, never scrubbed by scroll.
 */
export function Process() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.4 } as const;

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
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <div aria-hidden className="absolute left-0 top-6 hidden h-px w-full bg-line md:block" />
          {process.map((p, i) => (
            <motion.div
              key={`seg-${p.step}`}
              aria-hidden
              className="absolute top-6 hidden h-px origin-left bg-lime shadow-[0_0_8px_rgba(200,245,49,.6)] md:block"
              style={{ left: `${(i / process.length) * 100}%`, width: `${100 / process.length}%` }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewport}
              transition={{ delay: reduce ? 0 : travelAt(i), duration: TRAVEL_S, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}
          {process.map((p, i) => {
            const at = reduce ? 0 : badgeAt(i);
            return (
              <Reveal as="li" key={p.step} delay={i * 0.1} className="relative md:pt-14">
                <div className="flex items-center gap-4 md:absolute md:top-0 md:left-0">
                  <motion.span
                    className="chamfer grid size-12 place-items-center font-display text-sm font-bold italic ring-1 ring-line-strong"
                    initial={reduce ? false : { backgroundColor: "#0a0c0a", color: "#c8f531" }}
                    whileInView={{ backgroundColor: "#c8f531", color: "#0a0c0a" }}
                    viewport={viewport}
                    transition={{ delay: at, duration: FILL_S }}
                  >
                    {p.step}
                  </motion.span>
                </div>
                <h3 className="display mt-5 text-2xl text-fg md:mt-0">{p.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
