# Personal Trainer Website — Design Spec (2026-10-11)

## Understanding (what was asked vs. what I assumed)

**Stated by the client**
- Professional website for a female personal trainer starting her career at My-PT, Abu Dhabi.
- Futuristic, clean, inviting and easy to understand. Lime-on-black palette (reference image: FitPilot).
- 3D exercise movements as a visual hook.
- SEO optimised; the site must bring in customers (lead generation).
- "Mechanical" typography; menus in ALL CAPS italic to signal speed/motivation.
- Hosting on Vercel, GitHub for version control.
- Framework open, but transitions and micro-interactions must be intentional, not decorative.

**Confirmed mid-build by the client**
- Coach: **Migma Sherpa**, known as **Ming**. Brand: "Coach Ming".
- The 3D exercise figure was built, reviewed and then **removed** at the client's request (see "Decision log").

**Assumed (change in `src/config/site.ts`)**
- Phone, Instagram, exact gym address, credentials and prices are placeholders flagged with `TODO` in the config.
- Primary conversion in the UAE market is **WhatsApp**, so it is the primary CTA everywhere; the contact form is secondary.
- Audience: women in Abu Dhabi (expats and locals) wanting strength, fat loss, postnatal and beginner-friendly coaching. Ladies-only option is a strong local differentiator.
- Languages: English only for v1 (Arabic can be added later via i18n routing).

**Success criteria**
1. A visitor understands within 5 seconds who the coach is, where, and how to book.
2. Lighthouse ≥ 90 on Performance/SEO/Accessibility/Best Practices for the home page on desktop; mobile performance ≥ 80 (3D is the known cost).
3. Rich results eligible: Person, LocalBusiness, Service, FAQ schema.
4. Every animation has a job: orientation, affordance, hierarchy or delight tied to the brand (speed/strength).

## Stack decision

**Next.js 16 (App Router) + TypeScript + Tailwind v4 + Motion (Framer Motion).**
- Next.js: first-class on Vercel, static generation for SEO, Metadata API, `next/og` for OG images, `next/font` for zero-layout-shift fonts.
- Motion: layout animations (`layoutId` nav indicator), scroll-linked reveals, `useReducedMotion`.
- Hero visual: Ming's portrait (lime duotone) from the lg breakpoint; on phones the hero is text and two buttons only.

Alternatives considered: Astro (great SEO, weaker for rich interactive 3D islands + transitions); Remix/React Router (fine, but Vercel + OG + fonts are smoother on Next). Mixamo/GLB characters (better realism, but licensing/attribution and 2–5 MB payloads hurt mobile performance).

## Visual system

- **Palette**: Black `#0A0C0A`, surface `#111411`, surface-2 `#171B17`, border `rgba(255,255,255,.08)`, lime `#C8F531`, lime-dim `#9FCB1E`, text `#F4F7EE`, muted `#A5AD9B`. Lime is used for one action per viewport, highlights and the 3D figure; it is never a background except the final CTA band and the footer edge.
- **Type**: Chakra Petch (display, nav, eyebrows — squared, mechanical, has true italics) + Geist Sans (body) + Geist Mono (data, labels). Nav items: uppercase, italic, letter-spaced 0.08em. Headings: uppercase italic with a 12° forward slant on the lime word for the "speed" cue.
- **Shape**: 4px radius on controls, 16px on cards. Corner-cut ("chamfer") on primary buttons via clip-path to echo the mechanical theme.
- **Grid**: 12-col, max 1200px, 24px gutter mobile, 32px desktop.

## Information architecture (SEO-led)

| Route | Intent / target query | Notes |
|---|---|---|
| `/` | "personal trainer Abu Dhabi", "female personal trainer Abu Dhabi" | Hero, proof strip, services, 3D method, about teaser, process, testimonials, FAQ, CTA |
| `/services` | "personal training packages Abu Dhabi", "ladies personal trainer Abu Dhabi" | Each service as its own section with Service schema |
| `/about` | "[name] personal trainer My-PT" | Story, credentials, philosophy; Person schema |
| `/contact` | "book personal trainer Abu Dhabi" | WhatsApp, form, location, hours; LocalBusiness schema |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | | Generated |

## Micro-interaction inventory (each with its job)

| Interaction | Job |
|---|---|
| Nav "angle-grinder" hover: the lime line cuts left-to-right with sparks off the tip and a 0.4s label vibration; click bursts and leaves the full line as the active state | Orientation plus a brand moment: the site is "engineered", and Ming's humour shows in the UI |
| Primary button: arrow nudges 4px on hover, 0.98 scale on press | Affordance + tactile confirmation |
| Service cards: lime border glow tracks cursor | Signals card is a link, not static text |
| Hero headline: words rise behind a clip mask, staggered 60ms | Hierarchy: read order, "speed" feel |
| Stats count up once in view | Draws attention to proof |
| Page transitions: 240ms fade + 12px rise | Continuity between routes without delay |
| FAQ accordion: height animates, chevron rotates | Expectation of expansion |
| `prefers-reduced-motion`: all of the above become instant/static | Accessibility |

## Lead capture
- WhatsApp deep link with pre-filled message (primary).
- Contact form → server action → Resend (if `RESEND_API_KEY` is set) → graceful message otherwise. Honeypot for spam.

## Testing & verification
- Vitest for pure logic (pose interpolation, schema builders, WhatsApp URL builder).
- `next build` + `next lint` clean.
- Playwright screenshots at 390px and 1440px for visual review.
- Lighthouse run on the production build; results recorded in `docs/REVIEW.md`.

## Decision log

- **2026-10-11 · 3D figure removed.** A procedural React Three Fiber mannequin with four keyframed exercises (squat, push-up, RDL, lunge) was built and reviewed. It worked and read clearly, but the look was "competent 3D" rather than premium, and it cost the mobile home page ~2 s of main-thread time (Lighthouse mobile 52 vs 87–91 for the other pages). The client agreed it was not the right idea. Replaced with the programme panel; `three`, `@react-three/fiber` and `@react-three/drei` were uninstalled. The figure code was removed before the first project commit, so it is not in git history.
- **Hero entrance in CSS, not JS.** The headline is the LCP element on mobile; animating it with Motion made it wait for hydration. CSS keyframes with a `--d` stagger variable paint as soon as styles load.
- **One display-font cut.** Chakra Petch is only ever used bold-italic, so the site ships one file (700 italic) instead of six.
- **Logo (client asked for more creativity).** Mark: chamfered lime plate with an italic "M" whose outer legs are drawn as two flexed arms. Wordmark: the "I" in MING is an upright dumbbell. Both are inline SVG, so they stay crisp and cost no image request.
- **Tone.** The client said Ming has a strong sense of humour and is a very good coach. Copy now carries light, specific jokes (bad puns included, "Serious programming, zero scary-coach energy", a "Play" principle, a FAQ about whether she is strict) without touching the professional claims.
- **Photo.** The supplied casual photo is used on About (duotone lime + grayscale + bottom fade keeps it consistent with the palette) and as a small portrait on the home "Why" section. A studio portrait would still improve the hero.
- **Route transition only on client navigations.** `template.tsx` used to animate on first load, which serialised `opacity:0` into the HTML and hid the whole page until hydration (mobile LCP +2 s). It now animates only after the first mount.
- **Mobile Lighthouse ceiling.** With JavaScript blocked the home page scores 100 (LCP 1.8 s simulated). The remaining gap to 100 is Lighthouse's pessimistic slow-4G model counting every script that starts before the paint. Reaching 100 would mean shipping no React/Motion before first paint and no web fonts, which conflicts with the brief; real-device LCP is well under 1 s.
- **2026-10-11 · Sample programme panel removed; mobile pass.** The client found the panel unnecessary and noisy on phones. Hero now uses the portrait on desktop only. Mobile: ticker hidden, section padding reduced, footer in two columns, and a sticky WhatsApp bar appears after the hero scrolls away so the conversion step is always reachable with a thumb.
