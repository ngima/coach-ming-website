import type { Metadata } from "next";
import { services, site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, servicesSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Personal Training Packages in ${site.city}`,
  description: `1-to-1 personal training for everyone, ladies-only small group and online coaching in ${site.city} with ${site.brand} at ${site.gym}. What is included and who each programme is for.`,
  alternates: { canonical: "/services" },
  openGraph: { title: `Personal Training Packages in ${site.city} · ${site.brand}`, url: `${site.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <Container className="relative py-12 md:py-24">
          <SectionHeading
            as="h1"
            eyebrow={`Programmes · ${site.gym} · ${site.city}`}
            title={
              <>
                Personal training built for <span className="text-lime">your week</span>
              </>
            }
            text="Three formats, one standard. Every programme is written for you, coached by me at My-PT, and progressed every four weeks. Sessions are booked and billed through My-PT."
          />
        </Container>
      </section>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={i % 2 === 1 ? "scroll-mt-24 border-y border-line bg-surface" : "scroll-mt-24"}>
          <Container className="grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-24">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime">0{i + 1} · {s.cadence}</span>
              <h2 className="display mt-4 text-[2rem] text-fg md:text-[2.8rem]">{s.name}</h2>
              <p className="mt-3 text-lg font-medium text-lime">{s.tagline}</p>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">{s.description}</p>
              <p className="mt-5 text-sm text-muted">
                <span className="eyebrow">Best for · </span>
                {s.audience}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={whatsappUrl(`Hi ${site.nickname}, I'm interested in ${s.name}. Can we book a free consult?`)} external>
                  Ask about this
                </Button>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{s.booking}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="rounded-card border border-line bg-ink p-6 md:p-8">
              <p className="eyebrow">What is included</p>
              <ul className="mt-5 space-y-3.5">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex gap-3 text-sm leading-relaxed text-fg">
                    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0 text-lime">
                      <path d="M3 9.5 7 13l8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                    </svg>
                    {inc}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ))}

      <CTABand />
      <JsonLd data={graph(servicesSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]))} />
    </>
  );
}
