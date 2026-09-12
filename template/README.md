# aegntic site template

The refined aegntic.ai homepage, packaged for another project. It keeps the oversized typography, ghost labels, alternating artwork, expandable details, product gallery, full-screen menu and closing footer. All project content, links, artwork and theme settings live in `project.mjs`.

The build and preview use Node.js 20 or later and its built-in libraries. No install step, framework, external font service, animation CDN or runtime API is required.

## Create a project

1. Copy this entire `template` folder to a new project folder. Keep `public`, `examples`, and the small `.mjs` files together. The copied folder builds independently of the aegntic repository.
2. Edit `project.mjs`. Start with `brand`, `seo`, `contact` and `footer`, then replace the hero, three feature sections and products. The default is the aegntic preset, including real links to aegntic's other pages.
3. Put replacement images and fonts in `public/`. Update their `./` paths in the configuration. Delete unused original assets from your copy of `public/` once you have replaced their references.
4. Build and preview from your new folder:

```sh
node build.mjs
node serve.mjs
```

Open `http://127.0.0.1:4174`. After an edit, run the build again and refresh. Stop the preview with Control-C. You can also use `npm run build`, `npm run preview` and `npm run check`; there is nothing to install.

## Try a different project

The clearly labeled, fictional studio example changes the brand, copy, links, palette, font roles, product names and illustration. It demonstrates the same composition without the aegntic identity. Its copy and `hello@example.com` address are placeholders to replace.

```sh
node build.mjs --config examples/studio.mjs --out dist-studio
node serve.mjs dist-studio 4175
```

Open `http://127.0.0.1:4175`. To make it your main project, copy its settings into `project.mjs`; remove the import and spread of the original preset once you have made the example self-contained.

## Change the content and theme

| Configuration | What it controls |
| --- | --- |
| `brand` | Project name, displayed URL, logo, dimensional logo, favicon and menu label. Leave both logos empty to use the project name. |
| `seo` | Page title, description, language, canonical URL and share image. Set the final canonical URL before publishing. Leave it empty during drafts. |
| `theme` | Paper, ink, muted copy, borders, ghost lettering, accent, focus and menu surface colours; body and display fonts. Colours use six-digit hex values. |
| `hero` | Opening headline, highlighted line, copy, art, next-section link and signature. |
| `features` | Three alternating sections. Each has an ID, label, ghost word, heading, artwork, description, optional disclosure and next link. |
| `products` | Section content, artwork and expandable gallery entries. Add one or more items; the gallery updates its visible range automatically. |
| `contact` | Closing message, image, contact action, optional route links and supporting link columns. |
| `navigation` | Menu groups, destination links, preview cards and footer descriptions. Labels and cards are independent of the three feature positions. |
| `menuLinks`, `footer` | Supporting navigation, closing statement, copyright text and final link. |
| `motion` | Set `false` to disable decorative movement and smooth scrolling throughout the template. System reduced-motion preferences are always respected. |

Headlines and descriptions use arrays for intentional line breaks. Strings are escaped as text; adding HTML tags to the configuration will display the tags. Product marks support `text`, `echo`, `harvest`, `cognitive` and `skills`; use `text` and your own `lines` for new brands, or add a local mark `image`.

Links accept `https:`, `mailto:`, `tel:`, `#section` or `./local-file`. An item with `newTab: true` opens a new tab and includes an accessible notice. Local assets use `./`, which works both at a domain root and under a folder. Root-relative `/assets/...` links, unsafe protocols, traversal paths and embedded credentials are rejected. Use unique lowercase IDs, with letters, numbers and hyphens. Keep fixed `hero`, `products`, `contact` and `main` IDs reserved.

Keep headings short enough for the composition. Ghost words are decorative and are hidden from screen readers. Artwork needs a useful `alt` description, actual pixel `width` and `height`, and a local or HTTPS `src`. Use `alt: ''` for a purely decorative image. The original robot compositions are framed for these sections; replacement art may need positioning adjustments in `public/template-overrides.css`.

Fonts are self-hosted WOFF2 files. Add licensed replacements to `public/fonts/`, then set each font's `family` and `src`. The supplied Inter and Space Grotesk notices are included alongside the fonts, from their [Inter license](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) and [Space Grotesk license](https://github.com/google/fonts/blob/main/ofl/spacegrotesk/OFL.txt). Keep those notices if distributing the supplied fonts. The aegntic logo, robot images and brand copy are the aegntic preset; replace them for unrelated projects. This template does not grant a separate public license to that identity or artwork.

## Keep it aligned with the original

While this folder is inside the original repository, refresh the allowlisted shared styles, gallery runtime, images and fonts after polishing the source website:

```sh
node sync.mjs
node build.mjs
node check.mjs
```

From a separate copy you can supply the original website's `public` directory:

```sh
node sync.mjs /absolute/path/to/aegnticdotai-site/public
```

Sync reads the original directory and writes only its small allowlist into the template. It never edits the original. Shared CSS is marked as generated and maps source colours to configurable theme tokens. `project.mjs`, the example, renderer, menu and `public/template-overrides.css` are retained. Sync intentionally excludes the production navigation runtime, enquiry integration, API, analytics and other site pages. Its gallery behaviour comes directly from the current `journey.js`.

Use `public/template-overrides.css` for changes specific to a new project. Do not hand-edit generated `dist` files or synced CSS. A rebuild updates generated files and removes previously generated assets that were removed from `public`; unrelated files in the output are preserved. The builder rejects symlinks and refuses to overwrite an existing folder that lacks its own build manifest.

## Check and publish

```sh
node check.mjs
node build.mjs
```

The check builds both presets in an isolated temporary folder and verifies escaped content, URL rules, links, asset files, duplicate IDs, output boundaries and removal of stale generated assets. It does not replace a visual review. Review your own final copy at desktop, mobile and tablet sizes; try the keyboard menu, disclosures, product gallery and contact link.

Deploy the contents of `dist/` to any static host. A build service needs only `node build.mjs` and output directory `dist`. No serverless functions, secrets or environment variables are needed. Deploy from a clean output directory; the hidden `.aegntic-template-build` manifest is local build metadata and can be omitted when uploading. This task does not publish to the existing aegntic.ai deployment.

## What is included

1. A complete single-page composition, with configurable content and a separate fictional example. The other aegntic catalogue, article and project pages are not copied; the aegntic preset links to those live pages.
2. Native disclosures and a horizontally scrollable product gallery. Essential content remains readable without JavaScript; the menu fallback and footer provide navigation, and contact links still work.
3. The original menu appearance with first-tap links, keyboard focus containment, Escape-to-close, focus return and reduced-motion support. Lightweight native parallax replaces the original GSAP scroll motion so no animation library is required. Fine-grained timing may differ from the production site.
4. A direct contact URL. The default opens an email app; the example uses a clearly marked placeholder address. Add your own contact page or separately implement a real backend if you need a form. The template has no simulated submission or success state.
5. A light-paper theme and three feature positions. Dark themes, right-to-left layouts, additional page templates and complex content management require further design and implementation work.
