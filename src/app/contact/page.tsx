import type { Metadata } from "next";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Book a Free Consultation in ${site.city}`,
  description: `Contact ${site.brand}, ${site.role.toLowerCase()} at ${site.gym} ${site.city}. WhatsApp, email or send the form to book your free first consultation.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${site.brand}`, url: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <Container className="relative py-12 md:py-24">
          <SectionHeading
            as="h1"
            eyebrow={`Contact · ${site.gym} · ${site.city}`}
            title={
              <>
                Let us talk about <span className="text-lime">your goal</span>
              </>
            }
            text="Your first consultation is free and takes 15 minutes. Pick whichever channel is easiest for you."
          />
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="space-y-4">
            <Reveal className="chamfer-lg bg-lime p-px">
              <div className="chamfer-lg bg-lime p-7 text-ink">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">Fastest</p>
                <h2 className="display mt-2 text-3xl">WhatsApp</h2>
                <p className="mt-3 text-sm text-ink/80">Message me and I will reply personally, usually within a few hours.</p>
                <div className="mt-6">
                  <Button href={whatsappUrl()} external variant="inverse">
                    Open WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="rounded-card border border-line bg-surface p-7">
              <p className="eyebrow">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 block font-display text-xl font-bold italic text-fg hover:text-lime">{site.email}</a>
              <p className="eyebrow mt-6">Instagram</p>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 block font-display text-xl font-bold italic text-fg hover:text-lime">{site.instagramHandle}</a>
            </Reveal>

            <Reveal delay={0.16} className="rounded-card border border-line bg-surface p-7">
              <p className="eyebrow">Where I coach</p>
              <address className="mt-2 not-italic">
                <p className="font-display text-xl font-bold italic text-fg">{site.gym}</p>
                <p className="mt-1 text-sm text-muted">
                  {site.address.street}, {site.address.area}
                  <br />
                  {site.address.city}, {site.country}
                </p>
              </address>
              <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm text-muted">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="font-mono text-xs text-fg">{h.time}</span>
                  </li>
                ))}
              </ul>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="nav-link mt-5 inline-block text-lime underline-offset-4 hover:underline">
                Open in Maps →
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative rounded-card border border-line bg-surface p-6 md:p-8">
            <p className="eyebrow">Or send the form</p>
            <h2 className="display mt-2 text-3xl text-fg">Tell me what you are after</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
      <JsonLd data={graph({ "@type": "ContactPage", "@id": `${site.url}/contact#page`, url: `${site.url}/contact` }, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]))} />
    </>
  );
}
