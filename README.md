# Ayomide Ogunyemi: developer portfolio

Personal portfolio for Ogunyemi Samuel Ayomide ("Tubayox"): full-stack and applied ML engineer.
Statically generated, no database. Content lives in files and is edited through a git-backed admin.

**Stack:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 with CSS-variable tokens ·
MDX case studies validated with Zod · Keystatic admin · Resend contact form · Vercel + Vercel Analytics.

## Setup

```bash
npm install
cp .env.example .env.local      # all variables are optional for local development
npm run dev                     # http://localhost:3000
```

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Dev server, including the admin at `/keystatic` |
| `npm run build`     | Production build (validates every content file) |
| `npm run start`     | Serve the production build                      |
| `npm run typecheck` | `tsc --noEmit`                                  |
| `npm run lint`      | ESLint (no `any`)                               |
| `npm run format`    | Prettier (`format:check` to verify)             |
| `npm run cv:pdf`    | Regenerate `public/cv.pdf` from the `/cv` page  |

## Environment variables

| Variable                                 | Needed for                                                                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                   | Canonical URLs, sitemap, OG images and JSON-LD. **Set to the live domain.**                                                                       |
| `RESEND_API_KEY`                         | Sending contact-form email. Without it the form shows a mailto fallback.                                                                          |
| `CONTACT_TO_EMAIL`                       | Where contact messages are delivered                                                                                                              |
| `CONTACT_FROM_EMAIL`                     | Verified Resend sender, e.g. `Portfolio <hello@yourdomain.com>`                                                                                   |
| `NEXT_PUBLIC_CMS_REPO`                   | `owner/repo` the production admin commits to                                                                                                      |
| `KEYSTATIC_GITHUB_CLIENT_ID` / `_SECRET` | GitHub App credentials for the admin (see below)                                                                                                  |
| `KEYSTATIC_SECRET`                       | Session secret for the admin                                                                                                                      |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`  | Optional. Only used for an "install the app" button. Vercel warns about this name (it contains `KEY`), so you can leave it out of the deployment. |

## Content and the admin

All content is in `content/`:

- `content/site.json`: name, positioning, links, skills, leadership, education, story, "how I work"
- `content/projects/*.mdx`: one case study per file
- `content/notes/*.mdx`: reserved for a future `/notes` section (feeds `/rss.xml`)

Edit it in the admin at **`/keystatic`** (locally it writes files on disk; in production it commits to
GitHub, which triggers a redeploy), or edit the files by hand. Either way the build validates
everything, so a bad edit fails the build instead of shipping.

Anything you have not supplied yet is marked `TODO(ayomide):`. Those placeholders are hidden on the
public site. The full list is in [`CONTENT_TODO.md`](CONTENT_TODO.md).

### Add a project

1. Open `/keystatic` → **Projects** → **Create entry**, or add `content/projects/<slug>.mdx` by hand.
2. Fill in the frontmatter (below) and write the body with these `##` sections, **in this order**:
   Overview, Problem, My role, Architecture, Key decisions & trade-offs, Results, What I'd do next,
   Stack, Links. The build fails if one is missing or out of order.
3. Optional: paste Mermaid source into `diagram`. It is rendered to inline SVG at build time and
   follows the light/dark theme.

No component changes are ever needed.

```yaml
title: string
summary: string # max 160 chars, used on cards and in meta tags
status: shipped | live | in-development | case-study
tags: [Full-stack | ML | Design]
featured: boolean # the first 3 featured (by order) appear on the home page
order: number # lower comes first
date: "YYYY-MM" # a TODO placeholder is allowed and simply hidden
role: string
stack: [string]
metrics: # only real, supplied numbers
  - { label: string, value: string }
links:
  - { label: string, href: string, kind: live | repo | docs }
cover: path # optional; coverAlt is its alt text
diagram: mermaid source # optional
```

The schema lives in `lib/schema.ts` (Zod) and is mirrored for the admin form in `keystatic.config.ts`.

### Production admin (one-time GitHub App setup)

The admin needs a GitHub App so it can commit on your behalf. Only GitHub users with write access to
the repository can save changes.

1. In `.env.local` set `NEXT_PUBLIC_CMS_REPO=owner/repo` and `NEXT_PUBLIC_CMS_STORAGE=github`.
2. Run `npm run dev`, open `/keystatic` and follow the **Create GitHub App** prompt. Keystatic writes the
   credentials to your local env file.
3. Copy `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and
   into the Vercel project's environment variables, together with `NEXT_PUBLIC_CMS_REPO`. Skip
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`: it is optional, and Vercel warns about it.
4. Install the GitHub App on the repository, then visit `https://<your-domain>/keystatic`.

## CV

`/cv` is the web résumé, built from the same content as the rest of the site. `public/cv.pdf` is
generated from it with headless Chrome: after editing content run `npm run build && npm run cv:pdf`
and commit the PDF. You can also replace `public/cv.pdf` with your own file.

## Contact form

A server action (`app/(site)/contact/actions.ts`) validates input with Zod, checks a honeypot field,
rate-limits to 3 messages per 10 minutes per IP, and sends through Resend. If Resend is not configured
or fails, the visitor sees their message kept in the form plus a prefilled `mailto:` link.

The rate limiter (`lib/ratelimit.ts`) is in memory, so each serverless instance counts separately. That
blunts casual abuse. For a strict global limit, back `hit()` with a shared store such as Upstash Redis.

## SEO

Per-page metadata and canonical URLs (`lib/seo.ts`), `Person` JSON-LD on the home page and
`CreativeWork` on each case study (`lib/jsonld.ts`), generated 1200×630 share images (`next/og`),
`/sitemap.xml`, `/robots.txt` (the admin and API are disallowed) and `/rss.xml`.

## Deployment (Vercel)

1. Import the GitHub repository into Vercel (framework preset: Next.js).
2. Add the environment variables above. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Enable **Web Analytics** in the project settings (the `<Analytics />` component only renders on Vercel).
4. Deploy. Every commit to `main`, including commits made by the admin, redeploys the site.

## Design notes

Near-black background, off-white text, one electric-blue accent for links, focus states and key
numbers, plus a light theme (the toggle remembers the choice). Fraunces for display, Inter for text,
JetBrains Mono for metadata. Tokens are CSS variables in `app/globals.css`; the type scale is fixed
there. Motion is limited to what carries meaning and honours `prefers-reduced-motion`.
