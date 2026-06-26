# CLAUDE.md

## Project Overview

Aegntic.ai — portfolio site for an independent AI agent builder. React 19 + Vite 7 + Tailwind 4 + TypeScript. Deployed to Cloudflare Pages via `wrangler pages deploy dist/`.

## Tech Stack

- React 19, TypeScript, Vite 7
- Tailwind CSS 4 (with `@theme` in global.css)
- Framer Motion (animations)
- Recharts (data visualizations)
- React Router 7
- Lucide React (icons)

## Build & Deploy

```bash
npm run dev       # dev server
npm run build     # production build → dist/
npx wrangler pages deploy dist/ --project-name=aegntic-ai
```

CI builds fail at `clone_repo` — GitHub integration needs re-authorization in Cloudflare dashboard. Direct deploy works fine.

## Site Structure

```
src/
  main.tsx          — entry point
  App.tsx           — router + layout
  styles/
    global.css      — design system (CSS vars, components, animations)
    wireframe.css   — typography utilities, grid, wireframe effects
    preloader.css   — loading screen
  components/
    Navbar.tsx      — fixed nav
    AeLogo.tsx      — logo component (img from /assets/visuals/hero-typography.png)
    Footer.tsx      — footer with watermark, links, stats
    Preloader.tsx   — loading animation
  pages/
    Home.tsx        — hero, stats, CTA
    About.tsx       — focus areas, velocity
    Projects.tsx    — 12 real GitHub projects
    Featured.tsx    — milestones from git history
    Research.tsx    — coming soon placeholder
    Contact.tsx     — form, quick links
```

## Design Context

### Users
Developers, founders, technical recruiters evaluating credibility. Portfolio as proof-of-work: 184 repos, 5,600+ commits.

### Brand Personality
Quiet confidence. Restrained precision with editorial boldness. Precise, Editorial, Independent.

### Aesthetic Direction
Hybrid: Apple-like restraint as foundation, karen.city editorial boldness for emphasis moments. Typography-first. Dark mode. Warm-tinted darks.

### Design Principles
1. **Composition over decoration** — layout, spacing, type hierarchy do the work
2. **Whitespace is structure** — tight within, generous between
3. **Typography carries the brand** — distinctive display + clean body, max 2 families
4. **Zero AI fingerprints** — no cyan-on-dark, glassmorphism, gradient text, sparklines
5. **Content is the interface** — real data, real projects, every word earns its place
