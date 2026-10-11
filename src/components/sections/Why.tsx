import { differentiators, site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Why() {
  return (
    <section className="border-y border-line bg-surface py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why train with me"
            title={
              <>
                Coaching with a <span className="text-lime">method</span>, not a mood
              </>
            }
            text={`I am a ${site.role.toLowerCase()} at ${site.gym} in ${site.city}. I started coaching because I know how it feels to walk into a gym and not know where to begin. My job is to make sure you never feel that again.`}
          />
          <Reveal delay={0.1} className="mt-8">
            <Button href="/about" variant="secondary">
              My story
            </Button>
          </Reveal>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.06} className="bg-surface p-6 md:p-7">
              <span className="font-mono text-[11px] tracking-[0.16em] text-lime">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase italic text-fg">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
