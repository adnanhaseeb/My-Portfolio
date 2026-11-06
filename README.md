# Adnan Haseeb | Portfolio

The personal portfolio of Adnan Haseeb, a software engineer working on Python backends, LLM document workflows and integrations. It is a single, fast page that presents real work from the CV: supplier finance automation for a B2B marketplace, clinical data reconciliation, and freelance projects, with a contact form that sends email straight from the browser. The site builds to plain static files, so it can be hosted anywhere.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with static export (`output: "export"`)
- TypeScript in strict mode
- Tailwind CSS v4 and shadcn/ui primitives
- `next-themes` for light and dark mode
- `motion` for scroll reveals, disabled under `prefers-reduced-motion`
- `lucide-react` icons
- `@emailjs/browser` for the contact form
- `sharp` (dev only) for image and icon generation

## Features

- Single page with About, Experience, Projects, Skills and Contact sections
- Floating navbar with active section highlighting and a mobile menu
- Light and dark themes that follow the system by default
- Code-drawn project illustrations instead of heavy screenshots
- Contact form with validation, loading and error states, and a mailto fallback
- Downloadable CV
- Full SEO metadata, Open Graph card, app icons, `robots.txt` and `sitemap.xml`, all generated at build time

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` before using the contact form:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for canonical links, Open Graph, robots and sitemap |

Without the EmailJS keys the form shows a notice and an email link instead of failing silently.

Open http://localhost:3000 to view the site.

## Build

```bash
npm run build
```

This writes a fully static site to `out/`. Upload that folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3, or a plain web server). Set `NEXT_PUBLIC_SITE_URL` to the final domain before building so the generated metadata points to the right place.

Other scripts:

```bash
npm run lint
npm run typecheck
```

## Editing content

All text on the site lives in `src/content/`, typed by `src/types/content.ts`. Components never hard code personal copy.

| File | Contents |
| --- | --- |
| `site.ts` | Name, title, contact links, CV path, site URL, SEO description, navigation |
| `profile.ts` | Hero headline, subtext, stats and the validation trace example |
| `services.ts` | The "What I build" cards |
| `experience.ts` | Work history and education |
| `projects.ts` | Project case studies |
| `skills.ts` | Skill groups |
| `contact.ts` | Contact section copy and form messages |

To replace the CV, overwrite `public/cv/Adnan_Haseeb_CV.pdf`.

## Images and icons

`scripts/generate-assets.mjs` produces every binary asset: the WebP profile photo and project screenshot, `favicon.ico`, `icon.png`, `apple-icon.png` and the Open Graph card (`opengraph-image.png` with its alt text). The card text is read from `src/content/`, so run the script again after changing the name, title or headline:

```bash
node scripts/generate-assets.mjs
```

It reads the source photos from `ASSET_SOURCE_DIR` (defaults to the original portfolio folder) and downloads the fonts from Google Fonts, so it needs network access.

## Project structure

```
My-Portfolio/
├── public/
│   ├── cv/                   Downloadable CV
│   └── images/
│       ├── profile/          adnan.webp
│       └── projects/         supercrypt.webp
├── scripts/
│   └── generate-assets.mjs   Image, icon and Open Graph generation
├── src/
│   ├── app/                  Layout, page, styles, icons, Open Graph image, robots, sitemap
│   ├── components/
│   │   ├── cards/            Card building blocks
│   │   ├── experience/       Timeline pieces
│   │   ├── forms/            Contact form
│   │   ├── illustrations/    Code-drawn project visuals
│   │   ├── layout/           Navbar, mobile menu, footer
│   │   ├── projects/         Project case study pieces
│   │   ├── providers/        Theme provider
│   │   ├── sections/         Page sections
│   │   ├── shared/           Reusable pieces such as headings and reveals
│   │   └── ui/               shadcn/ui primitives
│   ├── content/              All site text
│   ├── hooks/                Custom React hooks
│   ├── lib/                  Metadata, EmailJS and utilities
│   └── types/                Content types
├── docs/                     Design spec
├── .env.example
├── next.config.ts
└── package.json
```
