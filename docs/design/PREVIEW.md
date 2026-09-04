# Local six-world preview

Branch: `design/six-world-journey`, based on live colour repair `af681dc`. The redesign is not deployed.

## Run from a clean checkout

```sh
npm ci
npm run build
node scripts/verify-preview.mjs
npm run preview -- --host 127.0.0.1 --port 5187
```

The site generator supports committed generated pages when Pandoc is unavailable. In that path, the four catalogues and retired-offer destinations are regenerated and the shared shell is normalized; existing blog/research/project bodies are reused. Install Pandoc only when intentionally regenerating those article bodies. Do not describe the fallback as a full article regeneration.

## What changed locally

- Six full-height worlds, five fresh robot scenes, vertical left labels, shared typography and short copy.
- Native product disclosures with explicit links, including live Echo.
- Four matching catalogue heroes, generated from a small explicit source file.
- A shared on-site enquiry dialog. Local and staging hosts cannot submit.
- One menu, fixed 120 × 50 px trigger, correct category mapping, keyboard/touch behavior and logo loop controls.
- Retired audit pages redirect to products; navigation, catalogue, sitemap and llms references removed.
- Preserved original artwork. Existing blog/research article content remains unchanged apart from brand casing and shell/action links.

The separately served blank-slate concept is an outcome-first working brief. It is not part of the production build. Its product descriptions are illustrative, not performance claims.

## Fresh evidence

`npm run build`: Vite succeeds; generator reports `pandoc missing — reusing committed public/{blog,projects,research,...}`.

`node scripts/verify-preview.mjs`:

```text
PASS homepage title, six ordered labels, Echo destination and retired copy
PASS 96 HTML pages; 493 local asset references; 0 missing; 0 legacy navs; 0 mixed-case brand strings; 0 email action CTAs
PASS dynamic shell asset dependencies
```

`git diff --check`: exit 0 after normalization. `node --check` on all three interaction modules: exit 0. Independent evaluator initially found contact-card preselection, route-current and focus-restoration issues; fixes were implemented and a second check requested.

Browser checks at 390 × 844: home, systems, agents, plugins, products, projects, research, skills, Cognitive OS and privacy each have one menu, 120 × 50 px footprint, and document width 390 (no horizontal document overflow). Mobile hero and systems screenshots were inspected, including the full rightmost robot. Browser screenshot capture needed the host's 1.25 display scale accounted for; layout measurements use CSS pixels.

Desktop checks at 1070px: the same menu dimensions and heading family on nine routes. An older Cognitive OS scrollbar style caused a five-pixel menu shift; the root scrollbar policy was unified and a fresh browser check confirmed its menu at the same left 887.2px / top 21.6px / 120 × 50px rectangle as home. Mobile menu: left 257.6px / top 12.8px / 120 × 50px.

Independent second pass: all six original findings resolved; 95 public HTML pages present in dist; all four catalogues match the source output. No remaining findings in the bounded interaction review. Reduced-motion browser check: art transform `none`, heading transform `none`, heading opacity `1`, logo animation `none`. Native product disclosure opens one card at a time without changing the URL. All seven homepage image instances loaded after scrolling, with computed filter `none`.

Actual browser interactions verified: keyboard category previews, Workflow automation preselection from its menu card, inline missing-name validation, local-only form receipt, Escape closing and focus restoration to Menu. Sampled browser console log was empty. This is not exhaustive assistive-technology testing.

Secondary-page form check reported `Preview checked. Nothing was sent or saved. Service: Something else. Source: /projects/.` while the URL remained `/projects/`. Cross-page background checks exposed older blue-grey body tokens on research, projects, skills and Cognitive OS; the shared design system now owns the body paper token.

## Unfinished release gates

- Paid scroll-world video: budget, camera and native portrait decision pending. No render submitted.
- Production form backend is still the old endpoint. It does not yet persist the new service/source/system URL fields as dedicated records or send the planned lead notification. Do not release the form as a verified end-to-end lead pipeline.
- Existing legacy enquiry endpoints still need server validation and failure-path testing before any broad production release.
- No production enquiry has been submitted. A labelled test requires explicit confirmation.
- Partner and affiliate destinations were not supplied; do not invent relationships. The contact section offers partnership enquiries instead.
- Confirm final product marks and verify external destinations at release time.
- A full content-quality rewrite of archived articles is outside this visual pass; their factual claims were not audited.

Keep these gates distinct from the already-live image-colour repair. No broad redesign push or production deployment was performed during this preview pass.
