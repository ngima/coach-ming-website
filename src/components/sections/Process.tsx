"use client";

import { motion, useReducedMotion } from "motion/react";
import { process } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const DRAW_S = 1.4;

/**
 * When the steps scroll into view the lime line draws itself left to right
 * and each step badge lights up as the line reaches it. It plays once, on its
 * own clock, so the sequence (consult → plan → train) is felt, not scrubbed.
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
          <motion.div
            aria-hidden
            className="absolute left-0 top-6 hidden h-px w-full origin-left bg-lime shadow-[0_0_8px_rgba(200,245,49,.6)] md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: DRAW_S, ease: [0.65, 0, 0.35, 1] }}
          />
          {process.map((p, i) => {
            // light the badge as the line passes its position (0, 1/3, 2/3 of the width)
            const at = reduce ? 0 : 0.15 + (i / process.length) * DRAW_S;
            return (
              <Reveal as="li" key={p.step} delay={i * 0.1} className="relative md:pt-14">
                <div className="flex items-center gap-4 md:absolute md:top-0 md:left-0">
                  <motion.span
                    className="chamfer grid size-12 place-items-center font-display text-sm font-bold italic ring-1 ring-line-strong"
                    initial={reduce ? false : { backgroundColor: "#0a0c0a", color: "#c8f531" }}
                    whileInView={{ backgroundColor: "#c8f531", color: "#0a0c0a" }}
                    viewport={viewport}
                    transition={{ delay: at, duration: 0.25 }}
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
