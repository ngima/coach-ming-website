import Link from "next/link";
import { nav, site } from "@/config/site";
import { isDemo } from "@/config/demo";
import { Logo } from "./Logo";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent" />
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12 md:px-8 md:py-16">
        <div className="col-span-2 space-y-5 md:col-span-1">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {site.role} at {site.gym}, {site.city}. Strength, fat loss and conditioning coaching for anyone who wants a plan that works.
          </p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-lime">
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {site.instagramHandle}
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="nav-link text-fg transition-colors hover:text-lime">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Find me</p>
          <address className="space-y-2.5 text-sm not-italic text-muted">
            <p className="text-fg">{site.gym}</p>
            <p>
              {site.address.street}
              <br />
              {site.address.area}, {site.address.city}
            </p>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-fg underline-offset-4 hover:text-lime hover:underline">
              Open in Maps
            </a>
          </address>
        </div>

        <div>
          <p className="eyebrow mb-4">Hours</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className="block text-fg">{h.days}</span>
                <span className="font-mono text-xs">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-6 py-5 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <span>
            © {year} {site.brand}. Personal site of a coach at {site.gym}, not the official {site.gym} website.
            {isDemo && <span className="text-lime"> Demo preview.</span>}
          </span>
          <span>{site.city} · {site.country}</span>
        </div>
      </div>
    </footer>
  );
}
