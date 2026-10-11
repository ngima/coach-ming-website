import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProgrammePanel } from "@/components/sections/ProgrammePanel";

const lines: { text: string; accent?: boolean }[] = [
  { text: "Your strongest" },
  { text: "self," },
  { text: "engineered.", accent: true },
];

/**
 * Headline words rise from behind a clip mask, staggered 70ms, using CSS
 * animations so the LCP text paints before JavaScript hydrates. The stagger
 * sets reading order; the forward-slanted lime word carries the speed cue.
 * The right-hand panel is a sample training block: it shows, rather than
 * claims, that programmes are written down and progressed every four weeks.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-lime/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-6 pb-16 pt-12 md:px-8 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-24">
        <div>
          <div className="rise" style={{ "--d": "0s" } as React.CSSProperties}>
            <Eyebrow>
              {site.role} · {site.gym} · {site.city}
            </Eyebrow>
          </div>

          <h1 className="display mt-6 text-[clamp(2.9rem,8.5vw,5.6rem)] text-fg">
            {lines.map((l, i) => (
              <span key={l.text} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                <span
                  className={l.accent ? "rise-mask-skew inline-block text-lime" : "rise-mask inline-block"}
                  style={{ "--d": `${0.1 + i * 0.07}s` } as React.CSSProperties}
                >
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "0.4s" } as React.CSSProperties}>
            1-to-1 personal training for women in {site.city}. Strength, fat loss and postnatal coaching at {site.gym}, programmed with precision and delivered with care by {site.brand}.
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--d": "0.5s" } as React.CSSProperties}>
            <Button href={whatsappUrl()} external size="lg" className="w-full sm:w-auto">
              Book a free consult
            </Button>
            <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
              See programmes
            </Button>
          </div>

          <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted" style={{ "--d": "0.65s" } as React.CSSProperties}>
            {["First consult free", "Ladies-only option", "Certified coach"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rotate-45 bg-lime" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise" style={{ "--d": "0.3s" } as React.CSSProperties}>
          <ProgrammePanel />
        </div>
      </div>
    </section>
  );
}
