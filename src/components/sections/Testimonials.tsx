import { testimonials } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-y border-line bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client words"
          title={
            <>
              Results you can <span className="text-lime">feel</span>
            </>
          }
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.08} className="flex flex-col rounded-card border border-line bg-ink p-6 md:p-7">
              <svg aria-hidden width="28" height="22" viewBox="0 0 28 22" className="text-lime">
                <path d="M0 22V11.4C0 5 3.6 1.2 10.6 0l1.2 3.2C7.4 4.4 5.6 6.6 5.4 10H11v12H0Zm17 0V11.4C17 5 20.6 1.2 27.6 0l1.2 3.2C24.4 4.4 22.6 6.6 22.4 10H28v12H17Z" fill="currentColor" />
              </svg>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-fg">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="font-display text-sm font-bold uppercase italic tracking-wide text-fg">{t.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{t.detail}</p>
              </figcaption>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
