# Website polish and reusable template — 10 September 2026

The live aegntic.ai homepage and its matching source at `/home/ae/Projects/aegnticdotai-site` were inspected. Existing artwork, fonts, six-section journey, original Menu/Close control, logo treatment, and unpublished source changes were retained. Synced ChatGPT project references were not edited.

## Design changes

| Before | After | Why |
| --- | --- | --- |
| Mobile navigation was a horizontal strip with destinations outside the viewport | All six main destinations appear in a three-column grid with 44px targets | Make every route discoverable and easy to tap |
| Touch users sometimes needed one tap to preview and another to navigate | Main links navigate on the first tap; desktop previews remain | Match normal link behaviour |
| Short menu windows could clip the content | Menu content can scroll in short viewports | Keep navigation reachable in landscape and when zoomed |
| Tablet portrait used the desktop artwork/text overlap | Portrait layouts up to 820px place content below the artwork, with matching motion breakpoints | Give the text its own clear space |
| A 600px width cap wrapped the wide-screen hero into four lines | The hero retains its intended three lines at 1920px | Preserve the headline composition |
| Several descriptions and useful links were 11–12px | Hero support is 13px on phones and 14px on desktop; useful links and disclosures are 14px | Improve legibility while retaining quiet hierarchy |
| Product counter implied one active item even when three were visible, and never described the last view | Counter reports the visible range, e.g. `02–04 / 04` | Make controls and content agree |
| Keyboard carousel actions animated and Home/End could leave a focused card offscreen | Keyboard controls respond immediately; track shortcuts are scoped to the track itself | Preserve visible focus and predictable keyboard behaviour |
| Product opening shrank and tilted the mark with a slower 3D fold | A subtle 94% scale and 220ms reveal | Keep the response restrained and readable |
| Focus outlines were clipped at carousel edges; hover styles could stick on touch | Inset summary focus rings, explicit press states, and pointer-aware hover feedback | Make state visible across input methods |
| Repeated pixel scrolling rewrote the live counter even when the label stayed the same | Update only when the visible range changes | Avoid unnecessary accessibility announcements |
| “Open a mark” used internal design language | “Choose a tool. See what it does.” | Explain the action in ordinary language |

## Verification

1. Production build passed. Pandoc is not installed, so the existing committed article/research/project content is reused by the existing build process.
2. Asset validation passed for 93 HTML files and 672 local asset references. Internal-link validation passed for 8,933 references.
3. All 65 existing contact/enquiry tests passed. No live enquiry was submitted and the existing backend was not changed by this task.
4. Browser layout checks covered the homepage at widths 320, 390, 768, 1280 and 1920. No document overflow or broken loaded images was detected. Screenshots were inspected at phone, tablet and desktop sizes.
5. Nine additional primary/content routes were checked at 390px and 1280px: agents, plugins, products, skills, Cognitive OS, blog, research, projects and privacy. Each had one shared navigation, one shared footer, and no document overflow or broken loaded images. Systems received a separate visual and single-tap navigation check.
6. Browser interaction checks confirmed coarse-pointer navigation to Systems on one click, Escape returning focus to Menu, background interaction restored after closing, 44px mobile main navigation targets, carousel end-state ranges, and reduced-motion removal of artwork transforms and fold animation.
7. An independent code review found a carousel focus issue; its suggested event-target guard was applied. Browser review is representative Chromium testing, not a claim of physical-device or every-browser certification.

## Delivery

The standalone reusable homepage lives in `template/`. It has its own configuration, static builder, preview server, alternate project example, and documentation. It uses the refined visual system with original assets and locally hosted fonts. Backend/contact delivery must be configured for each project; production contact code and credentials are not bundled.

The polished production source remains local. This task did not publish to aegntic.ai or replace its production deployment.

## Template acceptance

Both the aegntic preset and fictional studio configuration build and pass the package checks. Browser checks confirmed layouts at 320, 390, 768 and 1280px, single-action section navigation with focus transfer, correct gallery ranges, and a working no-JavaScript navigation fallback. The short landscape menu scrolls within its available height. The standalone ZIP contains the source, configurable presets, original preset assets, self-hosted fonts and their notices, and the setup guide; generated build directories and production APIs are excluded.
