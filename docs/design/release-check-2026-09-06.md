# Release check — 2026-09-06

The owner requested checking every page and link, preserving the footer logo as a feature, and publishing the current http://127.0.0.1:5187/ build. Publication is authorized; paid video rendering and a labelled production test enquiry remain separate approvals.

## Changes

| Before | After | Why |
| --- | --- | --- |
| Text-only home/catalogue footers, inconsistent legacy footers | One static footer with large chrome AE mark, flat-mark hover change, signature, enquiry and navigation | Preserve brand character and a usable closing moment everywhere |
| Subpixel desktop menu shift on legacy pages | Explicit viewport grid, content-versioned navigation CSS | Same position and dimensions; prevent a stale stylesheet hiding the correction |
| Three design/reference pages in the public build | Preserved under docs/design | Do not publish placeholder links or font experiments as site pages |
| mcp.graphics project CTA points to a DNS failure | On-site “Ask about this project” enquiry | Avoid a dead end without inventing a replacement destination |

The hero, mascot scenes, product disclosures, page bodies and existing colour correction are retained. The build generator and committed generated HTML both receive the shared footer. No new dependencies.

## Evidence

- `npm run build`: passed. Pandoc is unavailable; existing committed article/research/project bodies are reused, not regenerated from Markdown. The catalogue and shared shell are regenerated.
- `node scripts/verify-preview.mjs`: 93 HTML files, 672 local asset references, zero missing assets, legacy navigation, mixed-case brand strings or email action CTAs.
- `node scripts/verify-links.mjs`: 8,751 internal references pass, including fragments and explicit redirect destinations. All 90 non-retirement HTML files have the shared shell/footer. Three retirement pages redirect to products. Two Cognitive OS aliases are production redirects.
- External HTTP GET audit: 17 distinct URLs checked, 16 returned 200. X returned 404 to the checker and 403 to a separate fetch; preserve the supplied profile URL but mark it unverified. mcp.graphics failed DNS before its CTA was corrected.
- Browser DOM/computed-style checks: all 88 substantive routes (13 page types plus 75 articles/project details) checked at 1280 × 900 and 390 × 844. One global menu and one shared footer, Inter/Space Grotesk typography, no document horizontal overflow, no broken loaded images found. Static checks cover lazy asset existence; these checks are not claims of manual screenshot inspection of every article or physical-device testing.
- Representative desktop and mobile footer screenshots inspected, including Skills legacy styles. Chrome logo visible; no clipping or footer horizontal overflow. Original image files are used without filters or edited pixels.
- Footer enquiry opens on-site, selects Something else, and Escape restores focus to its trigger. No production or local visitor enquiry was submitted through the browser.
- Active mappings checked: home → home, Cognitive OS → systems, Skills → plugins, products → products. Reduced-motion menu transitions 0–0.01ms; footer transitions 0ms.
- Final fresh stylesheet check: home/Cognitive OS/privacy menu rectangles exactly [1097, 21.6, 120, 50] in the 1280px desktop test. Mobile page types consistently [257.6, 12.8, 120, 50]. Temporary emulation and cache overrides were cleared.
- Browser warning/error log sample: empty.
- `node --test tests/contact.test.mjs tests/enquiry-submit.test.mjs`: 65/65 passed, including notification failure, persistence failure, validation and retry safety.
- Cloudflare Workers TypeScript check passed. `git diff --check` passed. Shared footer regeneration checked for idempotence on home, Skills, Cognitive OS and blog index.

## Publication status: not deployed

Fresh `wrangler@4.129.0 whoami` failed: expired authorization could not be refreshed. An interactive OAuth flow was opened in Chrome and the owner was asked to sign in. The CLI timed out without a callback. No production database, secrets, deployment or GitHub branch was changed.

Resume with a fresh sign-in when the owner is present (the old OAuth link may have expired). Then verify the aegntic-ai Pages project, aegntic-db binding, pending additive migrations, Email Service sender/destination/secrets and acceptable existing edge protection using docs/ENQUIRY-DELIVERY.md. Deploy the paired frontend/API only after those gates; retain the previous deployment for rollback. Ask before a labelled production enquiry, then verify persistence and mailbox notification. Live route/redirect checks remain outstanding until an actual deployment exists.

The current GSAP/image journey is not a completed rendered scroll-world film. That separate work does not prevent publishing this reviewed version once deployment prerequisites are met.

## Follow-up: shared controls and back navigation

Owner browser comments supersede the autoplay logo direction: square chrome at rest, flat mark only on fine-pointer hover. Removed the obsolete logo-loop pause button. Restored the original SOHub disc rotation and clipped Menu/Close label slide from `98545de:index.html`, while retaining the shared overlay, magnetic response and stable footprint. Keyboard/reduced-motion label transitions are immediate. The homepage invitation now reads `...lfg` with three 1.6-second arrow pulses upon entering view; it stops offscreen/when hidden and stays still under reduced motion.

Added one shared header Back link on every subpage. Article details link to `/blog/`, project details to `/projects/`, other pages to `/`. These are explicit parent destinations, not browser-history actions. Existing content-level archive links remain intact. Shared stylesheet/script references are content-versioned so previously cached controls do not survive a build.

Verification: browser pass at 390 × 844 across all 88 substantive routes found one identical footer text variant, a back link on every subpage, no footer overflow or Back/Menu collision. A project-detail Back click navigated to `/projects/`. Square opacity 1 / flat opacity 0 at rest; no logo animation; SOHub label easing verified from computed style. Reduced-motion label duration 0.01ms. Build, 93-file asset check, internal-link check and JS syntax checks passed. Original hero and selected original Agents artwork were not changed. Publication remains uncompleted pending Cloudflare authorization/prerequisites.
