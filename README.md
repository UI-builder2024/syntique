# Syntique Technologies — website

The studio's experience site: a Next.js 16 app that shows how Syntique works, what it has shipped, and turns visitors into briefs.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Before launch (CONFIRM list)

| What | Where |
|---|---|
| Production domain | `src/lib/site.ts` → `url` (or `NEXT_PUBLIC_SITE_URL`) |
| Inbox shown on the site | `src/lib/site.ts` → `email` |
| WhatsApp number (optional) | `src/lib/site.ts` → `whatsapp` |
| "Now booking" chip and reply promise | `src/lib/site.ts` → `availability`, `replyPromise` |
| Budget bands in the brief form | `src/components/BriefBuilder.tsx` → `BUDGETS` |
| Client quotes (drafts only show in dev) | `src/lib/work.ts` → `TESTIMONIALS`, set `draft: false` |
| Project years for CareerView and CHF | `src/lib/work.ts` (left blank on purpose) |
| Lead delivery (see below) | environment variables |

## Where leads go

**Live setup:** production posts every brief to the Google Sheet "Syntique — Website Leads" (Leads tab) through the
Apps Script web app "Syntique Leads Webhook" (bound to that sheet, `@OnlyCurrentDoc`, set as `LEAD_WEBHOOK_URL` on Vercel).
Each row gets a Status dropdown (New → Replied → Call booked → Proposal sent → Won/Lost) and a Notes column.


`POST /api/lead` (the 4-step brief builder on the home, contact and service pages). Configure at least one destination in production, otherwise leads are only written to the server log:

```
RESEND_API_KEY=...            # email via Resend
LEAD_TO_EMAIL=you@studio.com  # comma-separated
LEAD_FROM_EMAIL="Syntique <leads@your-domain>"   # optional, must be a verified Resend domain
LEAD_WEBHOOK_URL=...          # optional: Slack / Zapier / Make / Google Apps Script / CRM
```

Each lead carries the page, referrer and any `utm_*` params, so campaign links can be attributed. In development every lead is also appended to `.leads/leads.jsonl`.

## Systems & packages

`/solutions` and `/solutions/<slug>`: Hospitality OS (restaurants), Club OS (sports), Talent OS (careers & gigs),
Content Engine (managed social) and Launchpad (websites). All copy, modules, add-ons, pain points and FAQs are in
`src/lib/solutions.ts`. Each package page has a live demo, a "tap what hurts" pain picker and a module configurator.
Whatever the visitor picks is sent with their brief (the sheet's "Building" column shows the package and modules; the
message starts with their pain points).

## Content

Everything editable lives in `src/lib/`:
- `work.ts` — case studies (copy, stats, stack, accent colour, screenshots in `public/work/<slug>/`)
- `services.ts` — services and FAQs (FAQs also emit FAQPage structured data)
- `site.ts` — company details and nav

Refresh client screenshots: `node scripts/capture.mjs [slug]` (uses the installed Chrome).

## Brand

`/brand` is the internal brand sheet (not indexed). `node scripts/export-brand.mjs` exports transparent logo PNGs, SVG marks, a social avatar and the automation still into `public/brand/`.

- Mark: an S drawn as one circuit trace between two nodes (`src/components/Logo.tsx`)
- Colours: Ink `#0B0B0F`, Paper `#F3F0E8`, Signal `#3D3BFF`, Volt `#D7FF3A`
- Type: Bricolage Grotesque, Instrument Serif italic, JetBrains Mono

## Marketing video

`/showreel` is a self-playing brand film built from the site's own assets (`?format=vertical` for Reels/Shorts).
`node scripts/record-showreel.mjs landscape|vertical` renders it frame-by-frame on a virtual clock to `marketing/showreel-*.mp4` (needs ffmpeg on PATH and the dev or prod server running).

## SEO

Per-page metadata and canonical URLs, generated OG image, `sitemap.xml`, `robots.txt`, JSON-LD (ProfessionalService with an offer catalog, FAQPage, CreativeWork per case study, Service per service page). All pages are statically prerendered.
