# CLAUDE.md

## Project Overview

Aegntic.ai — the site for Aegntic, an independent systems practice led by Mattae Cooper. It turns repeated work and ambitious product ideas into dependable AI agents, workflow automation, and internal tools. React 19 + Vite 7 + Tailwind 4 + TypeScript. Deployed to Cloudflare Pages via `wrangler pages deploy dist/`.

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
index.html          — production homepage; markup, styles, menu, and GSAP interactions
public/             — homepage images plus built static routes
src/                — React reference implementation; not mounted by index.html
functions/api/      — contact and subscription endpoints
```

When changing the live homepage, edit `index.html` and run `npm run build`. Preserve the menu, contact, and GSAP selectors and hooks. Keep the React reference aligned only where it is useful, but do not mistake it for the deployed page.

## Design Context

### Users
Founders and teams with repeated work, fragile hand-offs, or a product idea to make real. Developers and technical recruiters are a secondary audience. The portfolio is proof of execution: 127+ public repositories and shipped systems.

### Brand Personality
Quiet confidence. Restrained precision with editorial boldness. Precise, useful, independent.

### Aesthetic Direction
Hybrid: Apple-like restraint as foundation, karen.city editorial boldness for emphasis moments. Typography-first. Dark mode. Warm-tinted darks.

### Design Principles
1. **Composition over decoration** — layout, spacing, type hierarchy do the work
2. **Whitespace is structure** — tight within, generous between
3. **Typography carries the brand** — distinctive display + clean body, max 2 families
4. **Zero AI fingerprints** — no cyan-on-dark, glassmorphism, gradient text, sparklines
5. **Content is the interface** — real data, real projects, every word earns its place

## Positioning and Offer

- **Core promise:** Make the work that matters easier to do.
- **Plain-language process:** Find the leverage → build the useful version → make it dependable.
- **Services:** AI agents for real jobs; workflow automation; internal tools that fit.
- **Working model:** Clear scope, one accountable builder, a usable system handed over to the team.
- **Voice:** Direct and warm. Explain the concrete outcome before the technology. Avoid hype, opaque jargon, and generic claims about “transformation.”
- **Primary CTA:** “Start a project.”
- **Logo:** Use `/assets/ae-logo-sq-outline-blk-nbg.png` via `AeLogo.tsx`. It is the supplied black AE mark; do not substitute a text lockup.
- **Aegntic Skills:** `/skills/` is the public catalogue for the Codex plugin. Keep its 17 operational systems accurate to the installed `aegntic-skills` plugin; describe them as operating playbooks, never generic prompts.
