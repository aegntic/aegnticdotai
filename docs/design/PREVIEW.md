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

- Six full-height worlds, four fresh category robot scenes, restored original landing mascot, vertical left labels, shared typography and short copy. The slender generated Access bot remains an unused study; the category scenes now follow the owner's preferred compact original proportions.
- Native product disclosures with explicit links, including live Echo.
- Four matching catalogue heroes, generated from a small explicit source file.
- A shared on-site enquiry dialog. Local and staging hosts cannot submit.
- Validated, D1-first enquiry handling with fixed-recipient notifications and safe same-draft retries. Locally tested; production authorization and delivery are not verified.
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

### Enquiry implementation evidence (2026-09-05)

`node --test tests/contact.test.mjs tests/enquiry-submit.test.mjs`: 65 tests, 65 pass, 0 fail. This includes malformed-address regressions found by the independent evaluator, actual four-second notification timeout, same/concurrent retry deduplication, conflict rejection, historical-row preservation, and frontend per-draft request identity/pending protection. The frontend test DOM is a request/state fixture, not a substitute for real browser focus tests.

Cloudflare-target TypeScript check: exit 0. All four migrations applied to a fresh disposable **local** D1 database through Wrangler. `node tests/contact-local.mjs <disposable-directory>` observed valid/safe-retry HTTP 200, conflicting retry 409, invalid fields 400, cross-origin 403, wrong content type 415, oversized bytes 413, exactly one matching D1 row with preserved context, and a safe 503 under an injected database-write failure. Preview origin blocked all real email.

Wrangler setup is pinned to 4.129.0 with npm-exec, not assumed to exist in the project's dependencies. A new empty tool cache successfully fetched/ran version 4.129.0. Runbook: `docs/ENQUIRY-DELIVERY.md`.

Rebuilt browser form: native modal remained on `/`; local submit reported `Preview checked. Nothing was sent or saved. Service: Something else. Source: /.` Mobile viewport/document/panel widths were all 390px. Public-link warning is associated with the URL field. Escape restored focus to Work with me. Sampled console logs were empty. Original mascot also inspected on desktop/mobile with native colours and no headline overlap.

### Mascot artwork refinement evidence (2026-09-05)

The four category scenes now use versioned `*-mascot-v2.webp` files; the original `/cta-float.webp` hero is unchanged. All four new scenes were visually inspected in the desktop preview and at 390 × 844. The inspection caught white image rectangles, Systems artwork too close to the disclosure, and mobile labels crossing the left-bleed robots. One CSS correction batch added an opaque blend backdrop, increased desktop copy clearance, moved mobile labels above the illustrations and kept complete image aspect ratios. The confirmation pass showed seamless paper backgrounds, intact rightmost Systems robot and separate artwork/headings on mobile.

Fresh computed mobile results: document width 390; all five world images loaded; each image filter `none` and object-fit `contain`; sampled console logs empty. Systems was additionally inspected at a 1920 × 1080 emulated viewport: document width 1906 (reserved scrollbar), containment retained and the rightmost subject whole. The mobile products catalogue uses the same new derivative, loads correctly and remains 390px wide. These are Chromium emulation checks, not real iOS/Android hardware or exhaustive browser coverage. Source/asset provenance and exact prompts are in `artwork-provenance.md` and `mascot-v2-prompts.md`.

Independent non-author artwork check found no concrete blocker, reran the static verifier successfully and confirmed homepage/generator/generated/dist references agree. The original hero and all four prior category assets are hash-identical to the previous commit. The reviewer checked artwork and source, not the browser screenshots described above.

### Responsive follow-through evidence (2026-09-05)

The 320 × 568 check exposed a real gap in the earlier 390px-only coverage: separate viewport-based positions put the Systems art box bottom at 447.64px and its heading at 369.20px. Products and the original hero also visibly crossed the headings, especially in reduced-motion mode. Mobile copy now follows the shared art top/height plus 24px rather than an unrelated viewport percentage. The original asset is unchanged. Landscape labels move above the left-bleed artwork. GSAP media registrations now rebuild when the 600px layout breakpoint changes; previously the initial mobile flag stayed cached after rotation.

Fresh browser results after the correction:

- Home's five non-contact worlds at 320 × 568 and 390 × 844: measured artwork-box-to-heading gap 24px with reduced motion, transforms `none`, no document-width overflow. Normal-motion Products gaps were 34.84px at 320 and 39px at 390.
- In-place 320 → 844 → 390 viewport changes: the fully passed hero's computed Y translation changed −15px → −65px → −15px without a page reload. Reduced motion removed all five artwork transforms.
- Landscape 844 × 390: Systems label at 80px, scene art inset 110px, intentional left bleed and intact rightmost subject. Menu opened the on-site native modal while preserving `/`; dialog width 610px, viewport-constrained height and scrollable form contents. Escape restored focus to Menu.
- All four catalogue heroes at both 320px and 390px: measured 24px gap, document width equal to viewport. At 390, all four images loaded, heading font was Space Grotesk, and each page had one Menu at x257.6 / y12.8 / 120 × 50px.
- At 320px, the products CTA opened a 320px-wide native modal on `/products/`, with Internal tool selected. No enquiry was submitted.

The independent evaluator reran syntax, static asset and diff checks and inspected the catalogue cascade and breakpoint registration. Its arithmetic confirmed a 24px reduced-motion gap and at least 9px art-box clearance under the maximum small-screen art movement. Browser evidence above was collected separately by the implementer. These remain Chromium emulation results, not real hardware/Safari validation. `npm run build`, `node --check public/journey.js`, `node scripts/verify-preview.mjs`, and `git diff --check` passed; Pandoc fallback remains as documented.

## Unfinished release gates

- Paid scroll-world video: exact scene-art approval, budget, camera and native portrait decision pending. No render submitted. [scroll-world-film.md](scroll-world-film.md) records freshly checked provider capabilities, current configuration-specific prices, six-scene handoffs, prompt candidates and real-media verification gates. A camera-only draft probe is quoted at 80 credits; it does not prove a seamless chain.
- The live form backend is still the old endpoint. The replacement frontend/API and migrations are implemented and tested locally; deploy them together only after current D1 bindings, sender onboarding, production secrets and mailbox delivery are verified. No end-to-end production lead claim yet.
- Edge rate-limit/spam protection needs an owner/operations decision. Origin checks alone are not abuse prevention. No Turnstile, IP records or new paid rules were silently added.
- No production enquiry has been submitted. A labelled test requires explicit confirmation.
- Partner and affiliate destinations were not supplied; do not invent relationships. The contact section offers partnership enquiries instead.
- Confirm final product marks and verify external destinations at release time.
- A full content-quality rewrite of archived articles is outside this visual pass; their factual claims were not audited.

Keep these gates distinct from the already-live image-colour repair. No broad redesign push or production deployment was performed during this preview pass.
