# Weekly retrospective archive

The field-notes collection is reconstructed writing, not evidence of historical publication. `retrospectiveDate` identifies the historical week; `pubDate` records actual publication. Update `pubDate` to the real publication date before first deployment if it differs from the draft value. Never backdate JSON-LD or add a `dateModified` merely because a build runs.

The main blog links to `/blog/field-notes/`, which browses the weekly collection by year and sorts the represented week. Each article is individually canonical and included in the sitemap. Ordinary article/research feeds do not flood with the retrospective batch.

## Isolated build

Some historical Markdown and committed article HTML already differ. The normal build retains its existing regeneration semantics. For this bounded archive addition use:

```
npm run build:archive
```

This updates only the blog index, retrospective pages, sitemap additions and archive discovery link in llms.txt before Vite packaging. It preserves existing article pages and unrelated pages. Do not deploy this archive through the normal build without reviewing its unrelated legacy-content drift. Neither command deploys.

## Verification

```
node --test tests/blog-dates.test.mjs tests/blog-archive.test.mjs
npm run build:archive
npx tsc --noEmit
```

The provenance ledger, raw chat exports and private source links are not website assets and must not be committed. Public articles retain cited public sources and visible reconstruction disclosures.
