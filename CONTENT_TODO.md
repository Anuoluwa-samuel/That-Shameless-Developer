# Content TODOs

Every placeholder is marked `TODO(ayomide):` in the source. Search for it to find them.

## Site-wide (`content/site.json`)

- [ ] Public contact email
- [ ] GitHub profile URL
- [ ] LinkedIn profile URL

## Leadership (`content/site.json`)

- [ ] Faculty President: years held and a one-line summary
- [ ] ACOMS Electoral Committee Chairman: session and a one-line summary

## Deployment

- [ ] GitHub repo name for the Keystatic admin (`NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`)
- [ ] Create the Keystatic GitHub App and set its env vars on Vercel

## Projects (`content/projects/*.mdx`, or edit in /keystatic)

- [ ] Every project: `date` (YYYY-MM) and screenshots/cover image with alt text
- [ ] ArenaPass: confirm your role (solo or team), repo URL, live URL if any
- [ ] Football E-Ticketing: PRD link or PDF, repo URL if any
- [ ] Dropout Risk: repo/demo URL, the dataset size and any further results you want cited
- [ ] YIT0 SHOT IT: I linked https://yit0shotit.com (with a zero); your brief said yitoshotit.vercel.app. Confirm which is canonical.
- [ ] Hero: confirm graduation status (the brief says 2024/2025 session; it is now late 2026)

## Case-study details I could not know (search `TODO(ayomide)` in `content/projects/`)

- [ ] ArenaPass: scope (solo or team), milestone reached so far
- [ ] Football E-Ticketing: confirm the Problem section matches your PRD; phase names of the 12-week plan; intended web stack; whether anything was built or piloted
- [ ] Dropout Risk: real-only test results (the 94.1% / 98.0% figures are on augmented data and the page says so); libraries and tooling used
- [ ] YIT0 SHOT IT: the 2.02 s and 0.97 s page-render figures come from your own measurement notes (Lagos, before/after moving Turso to Ireland). Confirm you are happy to publish them.

## About, CV and contact

- [ ] About story: one personal paragraph (placeholder is hidden until you replace it, in /keystatic > Site settings)
- [ ] Education: years attended, exact degree title, class of degree, graduation year
- [ ] Experience (CV): add internships/jobs, if any (empty today, so the section is hidden)
- [ ] Replace `public/cv.pdf` if you prefer your own layout. Otherwise run `npm run build && npm run cv:pdf` after editing content, to regenerate it from the web résumé.
- [ ] Resend: set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` on Vercel (until then the form shows the mailto fallback)

## SEO and deployment

- [ ] Production domain: set `NEXT_PUBLIC_SITE_URL` on Vercel (canonical URLs, sitemap, OG and JSON-LD all use it; locally it falls back to http://localhost:3000)
- [ ] Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` on Vercel
- [ ] Enable Web Analytics in the Vercel project (the `<Analytics />` component is already in place)
- [ ] Add GitHub/LinkedIn/email to Site settings: they feed the Person JSON-LD `sameAs`/`email` automatically once real
