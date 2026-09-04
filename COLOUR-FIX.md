# Image colour restoration

## Scope

Restore original image colour only. Keep the live layout, image files, navigation,
and scroll animation unchanged. Section redesigns belong in separate HTML previews.

## Confirmed cause

Live browser inspection on 2026-09-05 found:

- Robot cohort: `saturate(0.68) contrast(1.04)`.
- Contact arm: `grayscale(1) contrast(1.08)`, opacity 0.82.
- Both bottom images: `grayscale(0.8) saturate(0.25)`, opacity 0.86.
- Shared catalogue/article CSS also reduced image saturation.

The source changes remove these filters and the two image-opacity reductions.
The intentional monochrome logo treatments remain unchanged.

## Acceptance and evidence

1. No grayscale or saturation-reduction filter remains in homepage/shared image
   styles. The one-off Node assertion failed before the patch and passes after it.
2. Existing assets and animation hooks are unchanged: seven CSS declarations
   changed across `index.html` and `public/site.css`.
3. `npx vite build` passes; it preserves committed generated pages. The full
   generator requires Pandoc, which is not installed here.
4. Local browser computed styles confirm `filter: none` on the cohort, contact arm,
   both bottom images, and the sampled project thumbnails. All four main image
   assets loaded. Desktop screenshot confirms the blue accents are restored.
5. Production must be checked after deployment before reporting a live fix.

The optional skill design detector failed to start because its module does not
export `parseAnyColor`; no detector success is claimed. Browser viewport override
did not take effect in this runtime, so mobile rendering is not yet verified.

## Deployment

Source recovered from canonical GitHub `main` at `8f472e9` into a persistent
workspace; the previous temporary checkout no longer exists.
Cloudflare authorization is expired and cannot refresh. A Pages-scoped sign-in
was opened. Nothing has been deployed by this task yet.

Keep any design experiments outside the deployment folder. Do not deploy the
broader redesign as part of this colour fix.
