# Coach Ming — Personal Trainer Website

Marketing site for Migma "Ming" Sherpa, female personal trainer at My-PT, Abu Dhabi.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Motion. Deploys to Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm test           # unit tests (vitest)
npm run lint
```

## Before launch — fill in the placeholders

Everything coach-specific lives in **`src/config/site.ts`**. Search the file for `TODO`:

| Field | What to put |
|---|---|
| `url` | The real domain (also update it in Vercel → Domains). Used for canonical URLs, sitemap and schema. |
| `whatsapp` | WhatsApp number, digits only with country code (e.g. `9715XXXXXXX`). Every "Book a free consult" button uses it. |
| `email`, `instagram`, `instagramHandle` | Real contact details. |
| `address`, `hours`, `languages` | Studio address, Google Maps link, coordinates, opening hours. |
| `credentials` | Exact certifications and awarding bodies. |
| `services[].from` | Real prices. The FAQ answer about pricing in the same file must match. |
| `testimonials` | **Sample quotes. Replace with real client words or empty the array** (the section hides itself when empty). |

Also:
- `src/app/about/page.tsx` — the "My story" paragraphs are a draft to personalise.
- Photos live in `public/images/`. `coach-ming.jpg` (About, 1200×1500) and `coach-ming-square.jpg` (home portrait, 480×480) are made from the supplied phone photo; swap in studio shots with the same filenames when available.

## Contact form email (optional)

The WhatsApp button is the primary lead channel and needs no setup. The contact form sends email through [Resend](https://resend.com) when these environment variables are set (see `.env.example`):

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Without them the form tells the visitor to use WhatsApp or email instead.

## Deploy — GitHub + Vercel

```bash
# 1. Push to GitHub (create an empty repo first, e.g. coach-ming-website)
git remote add origin git@github.com:<your-user>/coach-ming-website.git
git push -u origin main

# 2. Vercel: https://vercel.com/new → Import the repo → Framework "Next.js" → Deploy.
#    Add the env vars above under Settings → Environment Variables if using the form.
#    Add the custom domain under Settings → Domains, then set `site.url` to match.
```

Every push to `main` deploys to production; every pull request gets a preview URL.

## After launch — SEO checklist

1. Google Search Console: add the domain, submit `https://<domain>/sitemap.xml`.
2. Google Business Profile for "Coach Ming · Personal Trainer" at My-PT, Abu Dhabi, linking to the site. This is the single biggest local-search lever.
3. Test rich results: https://search.google.com/test/rich-results (Person, LocalBusiness, FAQ, Service schema are emitted).
4. Ask the first clients for Google reviews; then replace the sample testimonials.
5. Consider a `/blog` later for long-tail queries ("postnatal training Abu Dhabi", "ladies gym Reem Island").

## Project structure

```
src/
  config/site.ts          # all content and contact details
  app/                    # routes: / , /services , /about , /contact (+ sitemap, robots, OG image, icon, manifest)
  components/
    layout/               # Header, DesktopNav (grinder-spark hover), mobile menu, Footer, Logo (SVG mark + wordmark)
    sections/             # page sections (Hero, ProgrammePanel, Services, Why, Process, Testimonials, FAQ, CTABand)
    ui/                   # Button, Reveal, GlowCard, Accordion, Ticker, SectionHeading, Eyebrow, Container
    forms/ContactForm.tsx # client form → server action in app/contact/actions.ts
    seo/JsonLd.tsx
  lib/                    # seo.ts (schema builders), whatsapp.ts, cn.ts (+ tests)
docs/
  superpowers/specs/      # design spec and decision log
  REVIEW.md               # honest self-review with Lighthouse numbers
  screenshots/            # reference captures
scripts/screenshots.mjs   # Playwright capture of every page (node scripts/screenshots.mjs out-dir)
```
