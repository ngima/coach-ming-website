# Self-review — Coach Ming website (2026-10-11)

Scores are my honest assessment after looking at the rendered pages (desktop 1440px and mobile 390px screenshots in `docs/screenshots/`), not a feature checklist. Lighthouse numbers are from the production build on localhost (Lighthouse 13, headless Chrome, default mobile simulation and the desktop preset).

## Lighthouse

| Page | Mobile perf | Desktop perf | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | 88 | 100 | 100 | 100 | 100 |
| Services | 89 | 100 | 100 | 100 | 100 |
| About | 91 | 100 | 100 | 100 | 100 |
| Contact | 88 | 100 | 100 | 100 | 100 |

**Why mobile is not 100.** The page paints its hero on the first frame (observed LCP = FCP ≈ 0.3 s on a local run). The mobile score is Lighthouse's *simulated* slow 4G (1.6 Mbps, 150 ms RTT, 4× slower CPU), and its pessimistic model assumes any script that starts downloading before the paint may delay it. Two experiments on the home page pin it down: blocking all JavaScript gives 100 (LCP 1.8 s); blocking fonts alone changes almost nothing. Hitting 100 would require shipping no React/Motion before first paint and no web fonts, which conflicts with the brief. Google's real-user thresholds are LCP ≤ 2.5 s and CLS ≤ 0.1; this site is comfortably inside both on real devices. Single runs vary by ±3 points; home CLS is 0.02 (font swap on the italic display face).

## Ratings (out of 10)

**Visual design — 8.5.** The lime-on-black system is consistent, the chamfered corners and engineering grid give the "mechanical" character the brief asked for, and lime is reserved for one action per view so the CTAs stay loud. The logo now has an idea in it (flexed-arm M, dumbbell I). Ming's photo on About, treated as a lime duotone, finally puts a person on the site. What holds it back: the photo is a phone snapshot; a studio portrait in the home hero would lift the whole site.

**Typography — 8.** Chakra Petch bold italic in all caps gives the nav and headings the speed cue; Geist keeps body copy quiet and readable; Geist Mono carries the data labels. Hierarchy is clear on both breakpoints. The hero headline is large enough to dominate without crowding the panel on desktop. Line lengths on About are at the upper end of comfortable on desktop.

**Usability / clarity — 9.** Within the first screen a visitor sees: who (Ming, personal trainer), where (My-PT, Abu Dhabi), what (strength, fat loss, conditioning for everyone), and how to act (WhatsApp, free consult). On phones the hero is text and two buttons, the ticker is hidden, and a sticky consult bar follows once the hero scrolls away. Services carry prices and "best for" lines so nobody has to guess. FAQ answers the local questions (ladies-only, pregnancy, cost). The mobile menu is opaque, large-target and closes on navigation. The contact form degrades gracefully when email is not configured. Deduction: the Ticker and the Process line draw attention but add no new information.

**Professionalism — 8.** Copy is specific and confident, and the humour is light and in character (bad puns, "zero scary-coach energy", a "Play" principle) without softening the credentials or the method. Nothing is fabricated as a credential, but testimonials are sample text and must be replaced; shipping them as-is would be dishonest. Prices and hours are placeholders.

**Micro-interactions — 9.** Each one has a job and is documented in the spec: the angle-grinder nav (the line cuts across with sparks and a vibration, then holds as the active indicator: orientation with a brand wink), button arrow nudge and 0.98 press (affordance), card glow (links are cards), hero stagger (reading order, CSS so it never blocks LCP), programme panel flips and springs (progression made visible), FAQ height animation, route fade. All respect `prefers-reduced-motion`. Nothing loops forever except the ticker, which pauses on hover.

**SEO — 9.** Unique titles and descriptions per page, canonical URLs, Open Graph image generated from the brand, sitemap, robots, manifest, one H1 per page, semantic sections. JSON-LD graph: WebSite, LocalBusiness/HealthAndBeautyBusiness with geo and hours, Person with credentials, OfferCatalog with Service offers, FAQPage, BreadcrumbList, ProfilePage, ContactPage. Target phrases ("female personal trainer Abu Dhabi", "ladies-only personal training", "postnatal") appear in H1/H2s and body copy naturally. Missing: a real domain, Google Business Profile (off-site), and real reviews. A blog would extend long-tail reach later.

**Performance — 8.5.** Fully static pages, no client data fetching, three font files, no images yet, source maps on. Mobile stays at 89–91 only because of the font download in simulated slow 4G.

**Accessibility — 9.** 100 on every page; skip link, focus rings, aria on tabs/accordion/menu, contrast fixed in the footer, honeypot hidden from assistive tech.

**Code quality — 8.5.** One content file drives the whole site; sections are small server components with client islands only where state exists; pure logic (schema builders, WhatsApp URL) is unit-tested; lint and type-check are clean. Button is a plain server component with CSS-only feedback. The spark system is a small class drawing to one canvas, active only while a cursor is on the nav.

## What I would do next, in order

1. Confirm phone, email, address, prices, credentials; replace testimonials (`src/config/site.ts`).
2. Add 3–5 studio photos (home hero portrait, Services, About); the current ones are a phone photo with a duotone treatment.
3. Buy the domain, deploy to Vercel, set up Google Business Profile and Search Console.
4. Connect Resend for the form (optional; WhatsApp works today).
5. Arabic version via `next-intl` once the English copy is final.
