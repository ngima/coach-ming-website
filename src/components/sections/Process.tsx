"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { process } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The lime line draws as you scroll through the three steps, so the sequence
 * (consult → plan → train) is felt, not just read.
 */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="py-20 md:py-28">
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
        <ol ref={ref} className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <div aria-hidden className="absolute left-5 top-0 hidden h-full w-px bg-line md:left-0 md:top-6 md:block md:h-px md:w-full" />
          <motion.div
            aria-hidden
            style={{ scaleX: reduce ? 1 : progress }}
            className="absolute left-0 top-6 hidden h-px w-full origin-left bg-lime md:block"
          />
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.1} className="relative md:pt-14">
              <div className="flex items-center gap-4 md:absolute md:top-0 md:left-0">
                <span className="chamfer grid size-12 place-items-center bg-ink font-display text-sm font-bold italic text-lime ring-1 ring-line-strong">
                  {p.step}
                </span>
              </div>
              <h3 className="display mt-5 text-2xl text-fg md:mt-0">{p.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
