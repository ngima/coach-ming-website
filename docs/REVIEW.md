# Site review — Coach Ming (2026-10-11, after cleanup pass)

Scores are my assessment of the rendered pages (desktop 1440px and mobile 390px captures in `docs/screenshots/`), not a feature checklist. Lighthouse is from the production build on localhost (Lighthouse 13, headless Chrome, default mobile simulation and the desktop preset). Single runs vary by ±3 points.

## Lighthouse

| Page | Mobile perf | Desktop perf | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | 91 | 100 | 100 | 100 | 100 |
| Services | 90 | 100 | 100 | 100 | 100 |
| About | 90 | 100 | 100 | 100 | 100 |
| Contact | 88 | 99 | 100 | 100 | 100 |

**Why mobile is not 100.** The hero paints on the first frame (observed LCP ≈ FCP ≈ 0.3 s on a real connection). The mobile number is Lighthouse's simulated slow 4G and 4× slower CPU, whose pessimistic model assumes any script that starts downloading before the paint may delay it. Blocking all JavaScript scores 100; blocking fonts changes almost nothing. Reaching 100 would mean shipping no React/Motion before first paint and no web fonts, which conflicts with the brief. Google's real-user thresholds (LCP ≤ 2.5 s, CLS ≤ 0.1) are met comfortably on real devices.

## Ratings (out of 10)

**Visual design — 8.5.** A consistent lime-on-black system; chamfered corners, engineering grid and all-caps italic Chakra Petch give the mechanical, fast character the brief asked for. Lime is spent on one action per view, so CTAs stay loud. The brand now has a real idea in it: the flexed-arm M, the dumbbell I in the wordmark, the dumbbell marker and cursor. Ming's portrait in the desktop hero and on About, treated as a lime duotone, puts a person on the site. What holds it back: the portrait is a phone photo; a studio shot would lift everything.

**Minimalism / focus — 8.5.** This pass removed the ticker, the sample programme panel, a fourth hero chip, a duplicate footer WhatsApp link and one redundant FAQ. Every remaining section has a distinct job: hero (who, where, act), programmes (what and price), why (method), how it works (process), client words (proof), FAQ (objections), CTA band (act). Remaining overlap: the About page's four principles and the home "Why" cards cover similar ground from different angles. Acceptable across two pages.

**Copy / directness — 8.5.** Sentences are short and concrete. Prices and "best for" lines are stated. The humour is light and specific (bad puns included, zero scary-coach energy, a Play principle) and never softens a claim. Positioning is now "everyone, any gender", with the ladies-only group and pre/postnatal expertise as options.

**Usability — 9.** First screen answers who, where, what and how to act on both breakpoints. Mobile: text-only hero, tighter spacing, two-column footer, and a sticky consult bar that glides in after the hero, respects the iOS home indicator, and covers the toolbar-collapse gap. Navigation now starts every page at the top with a crossfade; anchor links still land on their section. The 404 page turns a dead end into an offer with the three main pages one tap away.

**Micro-interactions — 9.** Each has a job and is documented in the spec: grinder nav (bites 75%, sparks, label vibration; click cuts through and holds as the active indicator), dumbbell cursor (grows and curls over clickable things, squashes on press, mouse-only), card glow (links are cards), hero settle (visible from first paint), how-it-works sequence (one trigger, one timeline, continuous line with lead point, badges fill as it passes), FAQ height animation, mobile bar entrance with hysteresis. All respect reduced motion except the deliberately confined nav sparks.

**SEO — 9.** Unique titles/descriptions, canonicals, generated OG image, sitemap, robots, manifest, one H1 per page, "personal trainer Abu Dhabi" in the title tag, hero copy and now the home programmes H2. JSON-LD graph: WebSite, LocalBusiness/HealthAndBeautyBusiness with geo and hours, Person with credentials, OfferCatalog with Service offers, FAQPage, BreadcrumbList, ProfilePage, ContactPage. Off-site work remains: real domain, Google Business Profile, Search Console, real reviews.

**Performance — 8.5.** Fully static pages, three font files, two small images, no client data fetching. Mobile 88–91 for the reasons above.

**Accessibility — 9.5.** 100 on every page. Skip link, focus rings, aria on tabs/accordion/menu, native cursor kept in text fields and on touch, reduced-motion honoured.

**Code quality — 9.** One content file drives the site. Sections are server components with client islands only where state exists. Dead code removed this pass (ticker, unused props and fields, misleading animation names, a duplicate effect). Pure logic is unit-tested; lint and type-check are clean.

**Professionalism — 8.** The structure, copy and interactions are at a studio level. The gap to a 9 is content you must supply: real phone, address, prices and credentials, and real client reviews in place of the three samples. Shipping sample reviews would be dishonest.

## What to do before launch, in order

1. Fill every `TODO` in `src/config/site.ts` (WhatsApp number, email, Instagram, address, hours, prices, credentials). Replace or empty `testimonials`.
2. Personalise the About story and confirm the "any age over 16" line in the FAQ.
3. Studio photos: a hero portrait and one or two training shots.
4. Import the GitHub repo in Vercel, add the domain, set `site.url`.
5. Google Business Profile and Search Console; submit the sitemap.
