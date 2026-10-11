import { faqs } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, graph } from "@/lib/seo";

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions women <span className="text-lime">ask me</span>
            </>
          }
          text="If yours is not here, message me on WhatsApp and I will answer personally."
        />
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </Container>
      <JsonLd data={graph(faqSchema())} />
    </section>
  );
}
