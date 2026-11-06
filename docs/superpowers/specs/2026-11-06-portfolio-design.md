# Portfolio Website: Design Spec

**Date:** 2026-11-06
**Owner:** Adnan Haseeb
**Repo:** github.com/adnanhaseeb/My-Portfolio
**Status:** Approved design, awaiting spec review

## 1. Goal

A single-page personal portfolio that presents Adnan Haseeb as a Python backend and AI engineer to recruiters and clients. It must:

- show only real, verifiable content taken from the CV and LinkedIn profile (no placeholder testimonials, logos or invented numbers);
- load fast on mobile (no 3D, no WebGL);
- work fully on phones, including navigation;
- be hostable anywhere, because the host is not chosen yet.

## 2. Visual direction

An original design in the style of modern AI SaaS landing pages (reference feel: the Orbit AI SaaS kit). Nothing is copied from that product: no code, assets, copy or exact layouts.

- **Font:** Inter, loaded with `next/font`.
- **Light theme:** white background, soft blurred violet and blue glow shapes behind the hero, zinc text.
- **Dark theme:** near-black background (`zinc-950`), the same glows at lower opacity.
- **Accent:** a blue-to-violet gradient (`#2563eb` → `#7c3aed`) used on headline keywords, the primary button and focus rings.
- **Surfaces:** rounded-2xl cards, 1px borders, light shadow in light mode, subtle border glow in dark mode.
- **Navbar:** floating, pill-shaped and centered, with a backdrop blur once the page scrolls.
- **Motion:** fade-and-rise reveal on scroll (Motion library), all disabled under `prefers-reduced-motion`.

## 3. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js (latest stable, App Router), static export (`output: "export"`) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui (button, card, input, textarea, sheet, badge, sonner) |
| Theme | `next-themes`, default follows the system, toggle in navbar |
| Animation | `motion` (Framer Motion) |
| Icons | `lucide-react` |
| Contact form | `@emailjs/browser`, client-side, keys from `NEXT_PUBLIC_*` env vars |
| Images | `next/image` with `unoptimized: true` (required by static export); assets pre-compressed to WebP |

Static export plus client-side EmailJS means the built `out/` folder runs on Vercel, Netlify, GitHub Pages or any static host without changes.

## 4. Folder structure

```
My-Portfolio/
├── public/
│   ├── cv/Adnan_Haseeb_CV.pdf
│   ├── images/
│   │   ├── profile/adnan.webp
│   │   └── projects/supercrypt.webp
│   └── icons/                  favicon.ico, icon.png, apple-icon.png
├── src/
│   ├── app/                    layout.tsx, page.tsx, globals.css, not-found.tsx
│   ├── components/
│   │   ├── layout/             Navbar, MobileMenu, Footer
│   │   ├── sections/           Hero, Services, Experience, Projects, Skills, Contact
│   │   ├── shared/             SectionHeading, ThemeToggle, Reveal, StatCard, GradientText
│   │   ├── illustrations/      BrkzFlow, ClinFocusPipeline (code-drawn SVG/JSX visuals)
│   │   ├── providers/          ThemeProvider
│   │   └── ui/                 shadcn/ui generated primitives
│   ├── content/                site.ts, profile.ts, services.ts, experience.ts, projects.ts, skills.ts
│   ├── hooks/                  useContactForm.ts, useScrolled.ts
│   ├── lib/                    utils.ts, emailjs.ts
│   └── types/                  content.ts
├── docs/superpowers/specs/
├── .env.example
└── next.config.ts, tsconfig.json, eslint.config.mjs, components.json, postcss.config.mjs
```

Rules:

- Components never hard-code personal text; all copy comes from `src/content/*`.
- One component per file; file name equals component name (PascalCase); hooks are camelCase with a `use` prefix.
- The `@/` path alias points to `src/`.

## 5. Code conventions

- No single-line comments (`//`, or one-line `{/* */}` in JSX) in any code file. Code should explain itself; if a comment is unavoidable, use a block or JSDoc comment.
- No `any`. Content objects are typed by `src/types/content.ts`.
- Server Components by default; `"use client"` only where state, effects or browser APIs are needed (ThemeToggle, Navbar scroll state, MobileMenu, Reveal, Contact form).
- Commit messages contain no co-author or tool attribution lines.

## 6. Page sections

Single route `/` with anchor sections. Nav links: About, Experience, Projects, Skills, Contact.

### 6.1 Navbar (`layout/Navbar`)
- Left: "AH" gradient mark + "Adnan Haseeb".
- Center (≥ md): pill containing the 5 anchor links, active link highlighted while its section is in view.
- Right: ThemeToggle, "Download CV" button (`/cv/Adnan_Haseeb_CV.pdf`, `download` attribute).
- Below md: links and CV button move into a shadcn Sheet opened by a menu button.
- Becomes blurred and bordered after 10px of scroll.

### 6.2 Hero (`sections/Hero`, id `about`)
- Small pill badge with avatar: "Open to AI & backend roles".
- Headline: "Building **reliable AI systems** that reach production" (bold part in gradient).
- Subtext: "Software engineer working on Python backends, LLM document workflows and integrations, with validation and tests around every AI output."
- Buttons: "View projects" (primary, scrolls to `#projects`), "Download CV" (outline).
- Stat strip, 4 StatCards, figures taken verbatim from the CV:
  - "~12%": supplier invoices with misread IDs caught before the ERP
  - "4.1 → <1 min": rule run time after content-based caching
  - "276": collected fields matched to schema
  - "3+ yrs": freelance development on Fiverr

### 6.3 What I do (`sections/Services`)
Heading "What I build". Six cards (icon, title, one-sentence description):
1. AI document extraction: LLM extraction with structured output and deterministic validation.
2. Reconciliation pipelines: matching statements, invoices and datasets against a source of truth.
3. Integrations: Microsoft 365 Graph API and Entra ID, Zoho Books, WhatsApp Cloud API, webhooks.
4. Backend APIs: FastAPI, Django, Spring Boot and Node.js services with REST APIs.
5. Cloud & DevOps: GCP (GKE, Pub/Sub), AWS EC2, Docker, nginx, systemd, GitHub Actions.
6. Reliability: feature flags, kill switches, idempotent processing and tests on every change.

### 6.4 Experience (`sections/Experience`, id `experience`)
Vertical timeline, newest first:
1. **StechAI, Associate Software Engineer**, Jan 2026 to Present, Lahore. Two sub-blocks with the CV's bullets:
   - BRKZ (Saudi B2B marketplace), supplier finance automation: 4 bullets + stack chips.
   - ClinFocus, clinical data reconciliation: 4 bullets + stack chips.
2. **Fiverr, Freelance Software Developer**, Mar 2023 to Present, Remote. 1 to 2 bullets.
3. **Education:** BS Computer Science, Arid Agriculture University Rawalpindi (Burewala Campus), 2021 to 2025, CGPA 3.46 / 4.0.

### 6.5 Projects (`sections/Projects`, id `projects`)
Three case-study cards. Each: visual, title, one-line context, "Problem", "What I built" (2 to 3 bullets), "Outcome", stack chips.
1. **BRKZ supplier finance automation:** visual `illustrations/BrkzFlow` (invoice → LLM extraction → validation → PO match → ERP).
2. **ClinFocus clinical data reconciliation:** visual `illustrations/ClinFocusPipeline` (the five stages: schema match, dataset extraction, reconcile, rule eligibility, review).
3. **SuperCrypt:** screenshot `supercrypt.webp`. Django + Python ML crypto price prediction, Dockerized.

Client projects contain no confidential data beyond what is already in the public CV.

### 6.6 Skills (`sections/Skills`, id `skills`)
Seven groups from the CV, each a card of chips: Finance & data workflows; AI / LLM; Integrations; Backend & frontend; Data & ML; Cloud & DevOps; Reliability & testing.

### 6.7 Contact (`sections/Contact`, id `contact`)
- Gradient-bordered panel. Left: heading "Let's build something reliable", short line, email `adnann.haseeb@gmail.com` (mailto), LinkedIn link.
- Right: form with name, email, message (all required, email validated).
- States: idle → sending (button disabled, spinner) → success toast and reset, or error toast with "email me directly" fallback link.
- If EmailJS env vars are missing, the form shows an inline notice and the mailto fallback instead of failing silently.

### 6.8 Footer (`layout/Footer`)
"© {year} Adnan Haseeb", email and LinkedIn icon links (real `<a>` elements, `target="_blank"`, `rel="noopener noreferrer"`), "Back to top".

## 7. Content data

- `site.ts`: name, title ("Software Engineer · Python Backend · AI & LLMs"), location ("Lahore, Pakistan"), email, LinkedIn URL, GitHub URL (`null` until confirmed; hidden when null), CV path, SEO description.
- Phone number is not published.
- Types in `types/content.ts`: `SiteConfig`, `Stat`, `Service`, `ExperienceItem`, `ProjectBlock`, `Project`, `SkillGroup`.

## 8. SEO, accessibility, performance

- Metadata API: title, description, Open Graph and Twitter tags, canonical URL from `site.ts`.
- One `<h1>` (hero); each section uses `<h2>`.
- Every interactive element is a real `<a>` or `<button>`, keyboard reachable, with visible focus rings.
- Colour contrast meets WCAG AA in both themes.
- Targets: Lighthouse Performance ≥ 90 on mobile, Accessibility ≥ 95; first-load transfer under 1 MB; no image over 200 KB.

## 9. Error handling

- Contact form: network/EmailJS errors surface as a toast with a mailto fallback; errors are not swallowed.
- Missing env vars: detected in `lib/emailjs.ts`, shown inline in the form.
- Unknown routes: `not-found.tsx` with a link home.

## 10. Verification

1. `npm run lint` and `tsc --noEmit` pass with zero warnings.
2. `npm run build` produces `out/` without errors.
3. Browser check (Playwright) of the built site at 375px and 1280px in light and dark themes: no console errors, no horizontal scroll, mobile menu opens and links scroll to sections, CV downloads, theme persists on reload.
4. Contact form tested for success and failure paths (failure by pointing at an invalid service ID).
5. Grep confirms no `//` comments in `src/`.

## 11. Out of scope

Blog, CMS, testimonials, analytics, multi-language support, 3D graphics.
