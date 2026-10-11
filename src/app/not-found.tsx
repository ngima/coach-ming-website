import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const links = [
  { href: "/services", label: "Programmes", text: "1-to-1, ladies-only group, online." },
  { href: "/about", label: "About Ming", text: "Who is coaching you, and how." },
  { href: "/contact", label: "Contact", text: "WhatsApp, email, studio hours." },
];

/**
 * A dead end turned into an offer: the headline stays in character, the
 * primary action is the same free consult as everywhere else, and the three
 * main pages are one tap away. The curling dumbbell gives it a pulse.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <Container className="relative py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <svg aria-hidden viewBox="0 0 64 36" width="88" height="50" className="mx-auto mb-8 mt-3 overflow-visible text-lime">
            <g className="cursor-rep" style={{ animation: "cursor-rep 1.2s ease-in-out infinite" }} fill="currentColor">
              <rect x="22" y="15" width="20" height="6" rx="1" />
              <rect x="12" y="6" width="9" height="24" rx="1.6" />
              <rect x="43" y="6" width="9" height="24" rx="1.6" />
              <rect x="4" y="10" width="6" height="16" rx="1.2" />
              <rect x="54" y="10" width="6" height="16" rx="1.2" />
            </g>
          </svg>
          <Eyebrow className="justify-center">404 · Page not found</Eyebrow>
          <h1 className="display mt-4 text-[3rem] text-fg md:text-[5rem]">
            Missed <span className="text-lime">rep</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-muted md:text-lg">
            Happens to everyone. The page you wanted is not here, but your free first consult still is.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsappUrl(`Hi ${site.nickname}, I found a missing page on your site but I'd still like a free consult.`)} external size="lg" className="w-full sm:w-auto">
              Book a free consult
            </Button>
            <Button href="/" variant="secondary" size="lg" className="w-full sm:w-auto">
              Back home
            </Button>
          </div>
        </div>

        <ul className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group block h-full rounded-card border border-line bg-surface p-5 transition-colors hover:border-lime/60">
                <span className="nav-link flex items-center justify-between text-fg group-hover:text-lime">
                  {l.label}
                  <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                    <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </span>
                <span className="mt-2 block text-sm text-muted">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
