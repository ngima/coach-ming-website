# Self-review — Coach Ming website (2026-10-11)

Scores are my honest assessment after looking at the rendered pages (desktop 1440px and mobile 390px screenshots in `docs/screenshots/`), not a feature checklist. Lighthouse numbers are from the production build on localhost (Lighthouse 13, headless Chrome, default mobile simulation and the desktop preset).

## Lighthouse

| Page | Mobile perf | Desktop perf | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | 91 | 100 | 100 | 100 | 100 |
| Services | 90 | 100 | 100 | 100 | 100 |
| About | 90 | 100 | 100 | 100 | 100 |
| Contact | 89 | 100 | 100 | 100 | 100 |

Mobile LCP sits at 3.0–3.2 s under Lighthouse's simulated slow 4G; observed LCP on a real connection is well under 1 s. The remaining cost is three web-font files (Chakra Petch 700 italic, Geist, Geist Mono). CLS is 0 on every page. Single runs vary by ±3 points.

## Ratings (out of 10)

**Visual design — 8.** The lime-on-black system is consistent, the chamfered corners and engineering grid give the "mechanical" character the brief asked for, and lime is reserved for one action per view so the CTAs stay loud. The programme panel in the hero is a genuine content piece rather than decoration. What holds it back: there are no photographs of Ming, and a personal-trainer site ultimately sells a person. The About placeholder card is tidy but it is still a placeholder.

**Typography — 8.** Chakra Petch bold italic in all caps gives the nav and headings the speed cue; Geist keeps body copy quiet and readable; Geist Mono carries the data labels. Hierarchy is clear on both breakpoints. The hero headline is large enough to dominate without crowding the panel on desktop. Line lengths on About are at the upper end of comfortable on desktop.

**Usability / clarity — 8.5.** Within the first screen a visitor sees: who (female PT), where (My-PT, Abu Dhabi), what (strength, fat loss, postnatal), and how to act (WhatsApp, free consult). Services carry prices and "best for" lines so nobody has to guess. FAQ answers the local questions (ladies-only, pregnancy, cost). The mobile menu is opaque, large-target and closes on navigation. The contact form degrades gracefully when email is not configured. Deduction: the Ticker and the Process line draw attention but add no new information.

**Professionalism — 7.5.** Copy is specific and confident without hype. Nothing is fabricated as a credential, but testimonials are sample text and must be replaced; shipping them as-is would be dishonest. Prices and hours are placeholders.

**Micro-interactions — 8.** Each one has a job and is documented in the spec: nav underline (orientation), button arrow nudge and 0.98 press (affordance), card glow (links are cards), hero stagger (reading order, CSS so it never blocks LCP), programme panel flips and springs (progression made visible), FAQ height animation, route fade. All respect `prefers-reduced-motion`. Nothing loops forever except the ticker, which pauses on hover.

**SEO — 9.** Unique titles and descriptions per page, canonical URLs, Open Graph image generated from the brand, sitemap, robots, manifest, one H1 per page, semantic sections. JSON-LD graph: WebSite, LocalBusiness/HealthAndBeautyBusiness with geo and hours, Person with credentials, OfferCatalog with Service offers, FAQPage, BreadcrumbList, ProfilePage, ContactPage. Target phrases ("female personal trainer Abu Dhabi", "ladies-only personal training", "postnatal") appear in H1/H2s and body copy naturally. Missing: a real domain, Google Business Profile (off-site), and real reviews. A blog would extend long-tail reach later.

**Performance — 8.5.** Fully static pages, no client data fetching, three font files, no images yet, source maps on. Mobile stays at 89–91 only because of the font download in simulated slow 4G.

**Accessibility — 9.** 100 on every page; skip link, focus rings, aria on tabs/accordion/menu, contrast fixed in the footer, honeypot hidden from assistive tech.

**Code quality — 8.** One content file drives the whole site; sections are small server components with client islands only where state exists; pure logic (schema builders, WhatsApp URL) is unit-tested; lint and type-check are clean. The Button component's width handling is slightly hacky (`className.includes("w-full")`).

## What I would do next, in order

1. Confirm phone, email, address, prices, credentials; replace testimonials (`src/config/site.ts`).
2. Add 3–5 professional photos (About hero, Services, a hero portrait option).
3. Buy the domain, deploy to Vercel, set up Google Business Profile and Search Console.
4. Connect Resend for the form (optional; WhatsApp works today).
5. Arabic version via `next-intl` once the English copy is final.
