import type { Metadata } from "next";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/sections/CTABand";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, personSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About ${site.brand} · ${site.role} at ${site.gym}`,
  description: `Meet ${site.name} "${site.nickname}" ${site.surname}, ${site.role.toLowerCase()} at ${site.gym} in ${site.city}. Her story, certifications and the coaching philosophy behind every programme.`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${site.brand}`, url: `${site.url}/about` },
};

const principles = [
  { k: "Precision", v: "Every block has a purpose. Sets, reps, rest and tempo are written down, not guessed on the day." },
  { k: "Patience", v: "We earn load with technique. Slow progress that sticks beats fast progress that injures." },
  { k: "Partnership", v: "You are the expert on your life; I am the expert on training. We build the plan together." },
  { k: "Play", v: "Hard sessions, light mood. If you are not laughing at least once per workout, I am doing it wrong." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <Container className="relative grid gap-12 py-16 md:grid-cols-[1fr_0.8fr] md:items-center md:py-24">
          <SectionHeading
            as="h1"
            eyebrow={`About · ${site.gym} · ${site.city}`}
            title={
              <>
                Hi, I am {site.name}, call me {site.nickname}. I coach people to <span className="text-lime">get strong</span>
              </>
            }
            text={`${site.role} at ${site.gym}. I believe strength is the most honest form of confidence, and that everyone deserves a coach who takes their goals seriously.`}
          />
          <Reveal delay={0.15} className="chamfer-lg relative aspect-[4/5] w-full max-w-md justify-self-center bg-line p-px md:justify-self-end">
            <div className="chamfer-lg relative h-full overflow-hidden bg-surface">
              <Image
                src="/images/coach-ming.jpg"
                alt={`${site.name} "${site.nickname}" ${site.surname}, ${site.role.toLowerCase()} at ${site.gym}, ${site.city}`}
                fill
                priority
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-cover object-top grayscale contrast-[1.15]"
              />
              {/* lime duotone + fade keep a casual photo consistent with the dark palette */}
              <div aria-hidden className="absolute inset-0 bg-lime/25 mix-blend-multiply" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow">{site.gym} · {site.city}</p>
                <p className="mt-1 font-display text-xl font-bold uppercase italic text-fg">{site.name} “{site.nickname}” {site.surname}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">My story</p>
            <h2 className="display mt-4 text-[2rem] text-fg md:text-[2.6rem]">
              From the back of the gym to the <span className="text-lime">front</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {/* TODO: personalise this story with the coach's real journey. */}
            <p>
              I did not grow up athletic. My first gym membership went unused for months because I was intimidated by the weights floor and unsure what to do. What changed everything was one coach who showed me how to squat properly. Within a year I was stronger than I had ever been, and I knew I wanted to give other people that same moment.
            </p>
            <p>
              I became certified, specialised in pre and postnatal training because so many women are told to “take it easy” instead of being shown how to train safely, and joined {site.gym} in {site.city} to coach full-time.
            </p>
            <p>
              Today I work with beginners, busy professionals, new mums and lifters chasing their next PR. Any gender, every level. Different goals, same standard: a clear plan, excellent technique and a coach who shows up for every session. You will work hard. You will also laugh, usually at my jokes, occasionally at my playlist.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-12 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Credentials</p>
              <h2 className="display mt-4 text-[2rem] text-fg md:text-[2.6rem]">Qualified, insured, <span className="text-lime">current</span></h2>
            </Reveal>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {site.credentials.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.06} className="flex items-center gap-5 py-4">
                  <span className="font-mono text-xs text-lime">0{i + 1}</span>
                  <span className="text-fg">{c}</span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">Languages: {site.languages.join(", ")}</p>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">How I coach</p>
              <h2 className="display mt-4 text-[2rem] text-fg md:text-[2.6rem]">Four <span className="text-lime">principles</span></h2>
            </Reveal>
            <ul className="mt-8 space-y-6">
              {principles.map((p, i) => (
                <Reveal as="li" key={p.k} delay={i * 0.08} className="grid grid-cols-[auto_1fr] gap-5">
                  <span className="chamfer grid size-12 shrink-0 place-items-center bg-ink font-display text-sm font-bold italic text-lime ring-1 ring-line-strong">
                    {p.k[0]}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase italic text-fg">{p.k}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.v}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-10">
              <Button href={whatsappUrl()} external>
                Say hello on WhatsApp
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand />
      <JsonLd
        data={graph(
          { "@type": "ProfilePage", "@id": `${site.url}/about#page`, mainEntity: personSchema() },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
        )}
      />
    </>
  );
}
