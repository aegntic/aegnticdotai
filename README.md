# aegntic.ai

Aegntic builds practical AI agents, dependable workflow automation, and focused
internal tools. The site is designed to make that offer legible quickly, show
the systems behind it, and give people a direct route to start a project.

## Current position

The primary offer has three accountable outcomes:

1. **Agent build** — a purpose-built agent deployed inside a real workflow,
   with an evaluation set, controls, runbook, and handover.
2. **Workflow automation** — a monitored process that removes repeated steps
   and fragile hand-offs, with a recovery path and ownership documentation.
3. **Internal tool** — focused operational software shaped around the team,
   including source access, deployment, and handover.

The public catalogue is organised into six top-level routes:

- `/home` — the main scroll-led story and service offer
- `/systems` — Cognitive OS, Cognitive OS Engine, clawREFORM, and Prologue
- `/agents` — Echo, veritas-operator, obsidian-indexer, and Hermes Agent
- `/plugins` — Aegntic Skills, Tab Harvest, Compound Engineering, and Aegntic MCP
- `/products` — AE Audits, CLDCDE, prompt.fail, and tld.express
- `/contact` — the project enquiry route on the homepage

Research, writing, project case studies, privacy, and specialist product pages
remain available as supporting evidence beneath that primary structure.

## Experience principles

- Preserve the recognisable landing-page hero, robot swarm, imagery, and rhythm.
- Use a warm-white industrial/editorial canvas rather than a teal interface.
- Keep copy short, concrete, and outcome-led.
- Use motion to maintain continuity through the page, not as decoration.
- Present robots as purposeful scene elements rather than repeated wallpaper.
- Maintain one typography system everywhere: Inter for body copy and Space
  Grotesk for display type, both served locally from `/public/fonts/`.
- Respect reduced-motion preferences and keep layouts usable without animation.

## Source architecture

- `index.html` — production homepage, service offer, contact form, and GSAP
  scroll choreography
- `public/premium-nav.js` and `public/premium-nav.css` — shared magnetic menu and
  short-form card carousels
- `public/design-system.css` — shared typography and interaction baseline
- `public/catalog.css` — shared layout for Systems, Agents, Plugins, and Products
- `public/{systems,agents,plugins,products}/` — primary catalogue pages
- `public/{projects,research,blog,skills,...}/` — evidence and specialist pages
- `scripts/build-site.mjs` — generated-content build and future shared-shell output
- `dist/` — deployable output created by Vite; do not edit it directly

The React code under `src/` is a reference implementation. The live homepage is
the handcrafted root `index.html`.

## Local development

```bash
npm install
npm run dev
```

Build the same output Cloudflare serves:

```bash
npm run build
```

The deploy directory is `dist`.

## Deployment

The canonical source is the `aegntic/aegnticdotai` GitHub repository. Cloudflare
Pages builds the production site from the repository using `npm run build` and
publishes `dist` to [aegntic.ai](https://aegntic.ai).

## Verification baseline

Before publishing:

- Run `npm run build` and `git diff --check`.
- Check desktop and phone widths for overflow.
- Open every primary route and representative project, research, blog, skills,
  audit, Cognitive OS, and privacy pages.
- Confirm both local fonts load and every image resolves after lazy loading.
- Exercise mouse, keyboard, touch-sized menu, reduced motion, and contact-form
  validation.
