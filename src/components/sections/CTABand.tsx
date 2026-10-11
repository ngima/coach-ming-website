import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-lime text-ink">
      <div aria-hidden className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#0a0c0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0c0a_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto grid w-full max-w-[1200px] gap-8 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:px-8 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">Start this week</p>
          <h2 className="display mt-3 text-[2.4rem] leading-[0.92] md:text-[4rem]">
            Ready?
            <br />
            Your first consult is free.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4 md:items-end">
          <Button href={whatsappUrl()} external variant="inverse" size="lg">
            WhatsApp {site.nickname}
          </Button>
          <p className="max-w-xs text-sm text-ink/70 md:text-right">
            Replies within 24 hours. Sessions at {site.gym}, {site.city}, or online.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
