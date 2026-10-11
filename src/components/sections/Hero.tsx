import Image from "next/image";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const lines: { text: string; accent?: boolean }[] = [
  { text: "Your strongest" },
  { text: "self," },
  { text: "engineered.", accent: true },
];

/**
 * Headline lines settle upward by 0.18em, staggered 70ms, in CSS. They are
 * never hidden, so the LCP paint happens on the first frame. On phones the
 * hero is text and two buttons only; the portrait appears from the lg
 * breakpoint, where there is room for it without pushing the CTA down.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div aria-hidden className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-lime/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-6 pb-14 pt-10 md:px-8 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-24">
        <div>
          <div className="rise" style={{ "--d": "0s" } as React.CSSProperties}>
            <Eyebrow>
              <span className="sm:hidden">Personal trainer · {site.city}</span>
              <span className="hidden sm:inline">
                {site.role} · {site.gym} · {site.city}
              </span>
            </Eyebrow>
          </div>

          <h1 className="display mt-5 text-[clamp(2.9rem,8.5vw,5.6rem)] text-fg md:mt-6">
            {lines.map((l, i) => (
              <span key={l.text} className="block">
                <span
                  className={l.accent ? "rise-mask-skew inline-block text-lime" : "rise-mask inline-block"}
                  style={{ "--d": `${0.1 + i * 0.07}s` } as React.CSSProperties}
                >
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-muted md:mt-7 md:text-lg" style={{ "--d": "0.4s" } as React.CSSProperties}>
            1-to-1 personal training in {site.city} for everyone, from first-timers to seasoned lifters. Strength, fat loss and conditioning at {site.gym}, programmed with precision and delivered with care by {site.brand}. Serious programming, zero scary-coach energy.
          </p>

          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-9" style={{ "--d": "0.5s" } as React.CSSProperties}>
            <Button href={whatsappUrl()} external size="lg" className="w-full sm:w-auto">
              Book a free consult
            </Button>
            <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
              See programmes
            </Button>
          </div>

          <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:mt-10" style={{ "--d": "0.65s" } as React.CSSProperties}>
            {["First consult free", "All levels welcome", "Certified coach", "Bad puns included"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rotate-45 bg-lime" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise hidden lg:block" style={{ "--d": "0.3s" } as React.CSSProperties}>
          <div className="chamfer-lg relative ml-auto aspect-[4/5] w-full max-w-[440px] bg-line p-px">
            <div className="chamfer-lg relative h-full overflow-hidden bg-surface">
              <Image
                src="/images/coach-ming.jpg"
                alt={`${site.name} "${site.nickname}" ${site.surname}, ${site.role.toLowerCase()} at ${site.gym}, ${site.city}`}
                fill
                priority
                sizes="440px"
                className="object-cover object-top grayscale contrast-[1.15]"
              />
              <div aria-hidden className="absolute inset-0 bg-lime/25 mix-blend-multiply" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <p className="eyebrow">{site.role}</p>
                  <p className="mt-1 font-display text-xl font-bold uppercase italic text-fg">
                    {site.name} “{site.nickname}” {site.surname}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
                  <span aria-hidden className="size-1.5 rotate-45 bg-lime" />
                  Taking clients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
