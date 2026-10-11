import Link from "next/link";
import { services } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="py-14 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Programmes"
          title={
            <>
              Three ways to train in <span className="text-lime">Abu Dhabi</span>
            </>
          }
          text="Pick the format that fits your week. Every option is a real programme, coached properly and progressed on purpose."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.08}>
              <GlowCard className="h-full">
                <Link href={`/services#${s.id}`} className="flex h-full flex-col p-6 md:p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">0{i + 1}</span>
                  <h3 className="display mt-4 text-2xl text-fg">{s.name}</h3>
                  <p className="mt-2 text-sm font-medium text-lime">{s.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
                  <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                    <div>
                      <p className="eyebrow">From</p>
                      <p className="font-display text-xl font-bold italic text-fg">{s.from}</p>
                    </div>
                    <span className="nav-link inline-flex items-center gap-2 text-fg transition-colors group-hover/card:text-lime">
                      Details
                      <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 ease-out-expo group-hover/card:translate-x-1">
                        <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
