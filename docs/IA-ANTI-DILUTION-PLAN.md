# aegntic.ai — Ruthless IA / Content Anti-Dilution Plan

**Status:** plan only — do not implement until greenlit  
**Repo:** `/home/ae/AE/aegnticdotai`  
**Live:** https://aegntic.ai  
**Date:** 2026-07-21  
**Evidence base:** local tree + `scripts/build-site.mjs` + live curl titles

---

## 1. Diagnosis (evidence)

1. **Home story is hire-focused; IA still pretends “lab/foundation.”**  
   Home H1: *“I build production AI-agent systems.”* Sections: hero → manifesto → Decision Audits promo → Selected work (6 cards) → 3 services → contact. Nav also ships **Research + Blog** as peers. Story = solo builder for hire + audits offer. Nav = content media brand. Mismatch.

2. **`/blog/` and `/research/` are 100% the same corpus.**  
   60 md sources in `/home/ae/AE/aegnticdotai/public/content/blog/`. Both indexes list all 60; research links **to `/blog/{slug}/`** (0 own article routes). Generator admits it: `buildResearch()` = same posts, resorted by tag weight (`scripts/build-site.mjs` ~L315–373). Two nav entries, one pile. Pure dilution.

3. **Projects inventory is padded with org-root GitHub and thin product skins.**  
   Source: `/home/ae/AE/aegnticdotai/content/projects.json` (12 items).  
   - **Real surfaces:** ae-audits (`/audits/`), cldcde, clawreform, prologue, cognitive-os, (maybe) prompt.fail / tld.express / mcp.graphics if actually alive.  
   - **Filler pattern:** `veritas-operator`, `obsidian-indexer`, `unltd-cli`, `zkputer` all `url: https://github.com/aegntic` (org root, not repos). Home work grid shows 6; full index dumps 12. Status labels (“Production”, “Open source”, “R&D”) inflate weak entries.

4. **Content archive already confessed once and re-bloated.**  
   Flagship post *why-we-deleted-125-blog-posts-and-started-over* sits next to ~17 generic howto stubs (typescript, RAG, streaming LLMs, prompt-engineering-fundamentals, …) at 300–600 words and ebook-factory / RIPSEC cluster that reads as content-biz, not agent-systems proof. Median ~718 words — volume over signal.

5. **Nav/footer sprawl + ghost/orphan routes.**  
   Subpage chrome: Home · Projects · Research · Blog · Audits (+ mailto). Home menu adds Services/Contact anchors; **About not in home nav**. Live orphans/noise: `/cognitive-os/` (not in primary nav), `/design-lab.html`, leftover `public/audits.html` (different title than `/audits/`), `public/cognitive-os.html` + raw. **`/colabs` returns HTTP 200 with homepage `<title>`** — fantasy route from SITEMAP.md leaking as soft 200, not clean 404.

6. **`SITEMAP.md` is fiction; real sitemap is honest but split-brain.**  
   `/home/ae/AE/aegnticdotai/SITEMAP.md` dreams: `aegntic.foundation`, `aegntic.research`, `/colabs`, “Research = main blog.”  
   Real: `/home/ae/AE/aegnticdotai/public/sitemap.xml` (~78 URLs) = home + projects + research + blog + audits + about + 12 project pages + 60 blog posts. Docs and live IA disagree; agents reading SITEMAP.md will rebuild the mess.

7. **Services are clear on home; productization is only Audits.**  
   Three services (custom agents / automation / tooling) are concrete. Only Audits has pricing + dedicated page. Everything else competes for attention as “projects” and “research” without a single primary conversion path.

8. **About is a stub; Cognitive OS is a second homepage personality.**  
   About ~555 chars of body — résumé blurb, no proof links. Cognitive OS is a long policy/OS doc with separate chrome — strong artifact, wrong as equal peer to hire site unless framed as *one* project/work proof.

---

## 2. Recommended IA

### Stays on aegntic.ai (canonical)

| Route | Role |
|-------|------|
| `/` | Hire + offer: who, proof, services, audits, CTA |
| `/projects/` | **Curated** shipped work only (≤6 featured, rest archive or kill) |
| `/projects/{slug}/` | Only for keep-tier projects |
| `/audits/` | Primary paid offer (merge any audits.html legacy → here) |
| `/blog/` **or** `/notes/` | Single writing index (pick one path; redirect the other) |
| `/about/` | Short bio + proof links + contact (wire into nav) |
| `/cognitive-os/` | Keep as **project/doc** linked from projects, not top-nav peer |
| `/privacy/` | Keep if legally needed |

### Merges

| From | Into |
|------|------|
| `/research/` | **Kill as separate nav destination.** 301 → `/blog/` (or keep `/research/` as **alias redirect only**, never a second full index). If you ever have *true* research (papers, benchmarks, numbered reports), reintroduce later as `/blog/?tag=research` or a **filtered** index with **hard subset**, not resort-of-all. |
| Blog + research dual links on home/footer | One “Writing” / “Notes” link |
| `ae-audits` project page + `/audits/` | Audits is canonical commercial page; project card points to `/audits/`, don’t maintain two pitches |
| Home work cards vs full projects | Same keep-list; home ⊆ projects keep-tier |

### Moves off (or delist)

| Asset | Action |
|-------|--------|
| Ebook factory / RIPSEC / angle-generation cluster | Off-site or unlisted archive — dilutes “production agent systems” brand |
| Generic howto SEO stubs | Kill or noindex; don’t rebuild |
| Domain skins with no story (tld.express, mcp.graphics if no real product narrative) | External only; drop from portfolio unless live demo + one paragraph of *why* |
| `design-lab.html`, `type-specimen.html`, `_sohub-shell-reference.html` | Dev-only; noindex or don’t deploy |
| `SITEMAP.md` fantasy (`/colabs`, subdomains) | Delete or rewrite to match `sitemap.xml` — **never** a second source of truth |
| Org-root GitHub “projects” | Either real repo URL + README proof, or remove |

### Nav (max 5 primary)

**Home · Work · Audits · Notes · About**  
(+ Contact as CTA, not a 6th content silo)

Drop: Research-as-peer, Blog+Research pair, Cognitive OS from primary nav.

Footer: same five + GitHub + X + email. No second sitemap of dreams.

---

## 3. Content kill / keep / curate

### Criteria (apply ruthlessly)

| Tier | Rule |
|------|------|
| **KEEP (public, linked)** | Proves *you* shipped agent/systems work; specific, non-generic; or is the commercial offer; or is canonical personal positioning. Prefer ≥800 words with concrete artifacts, or short+sharp case notes with links. |
| **CURATE (keep URL, demote)** | Decent but redundant — leave at `/blog/{slug}/` for inbound links, **remove from index default view** or tag `archive`. No home/nav promotion. |
| **KILL (unlist)** | Generic AI howto interchangeable with any blog; ebook marketing methodology; duplicate of a stronger post; <500 words of platitude; no longer represents current positioning. 301 to nearest keep or to `/blog/`. |

### Projects (`content/projects.json`)

| Action | Slugs |
|--------|--------|
| **KEEP + home work grid** | `ae-audits`, `cldcde`, `clawreform`, `prologue`, `cognitive-os` — plus at most one more with a *real* repo/live URL and non-generic body |
| **CURATE (index only, not home)** | `prompt-fail`, `tld-express`, `mcp-graphics` — only if live URL works and body states one concrete outcome; else kill |
| **KILL or fix-before-keep** | `veritas-operator`, `obsidian-indexer`, `unltd-cli`, `zkputer` while `url` is org root — fix to real repo **or** delete. zkputer R&D without artifact = kill from public portfolio |

**Target:** 5–7 projects max public. Home shows 4–5. No “Latest Alpha” on six things at once — one “Latest” max (Audits).

### Blog / research (60 posts) — by cluster, not every slug

| Cluster | Action | Why |
|---------|--------|-----|
| Ultra-swarm / multi-agent case studies | **KEEP 1–2 best** (protocol + one case); curate/kill rest as dupes | Real differentiation |
| MCP / Prologue / skills / agent infra | **KEEP 3–5 strongest**; merge titles that retell same story | On-brand |
| Mem:RE / local-first / privacy | **KEEP 1–2** | On-brand if concrete |
| FPEF / debugging / operator methodology | **KEEP 1** if unique | Useful proof of systems thinking |
| Journey / growth / why-we-built / deleted-125 | **KEEP 1 positioning** (`why-we-deleted…` or growth — not both as equals); curate rest | Brand history, not homepage feed |
| Ebook / RIPSEC / angle-generation / Agent Neo factory | **KILL from index** (CURATE URLs if SEO inbound) | Wrong business on this domain |
| Product cases (Codebuff, Crypto-Sight, Elastran, D3MO, PromptRequest, hackathon) | **CURATE or KILL** unless still representative; prefer one “ecosystem lessons” keep | Old portfolio noise |
| Generic howto (TS, Bun, RAG, streaming, prompt fundamentals, Supabase, testing AI, cost optimization, …) | **KILL index** aggressively | Commodity content; dilutes authority |
| Market hot-take (`415-billion-ai-developer-tools`) | **KILL or curate** | Dated SEO |

**Numeric target:** public index **12–18** posts max (from 60). Research route **gone** as separate list.  
**llms.txt:** list only keep-tier + services + audits + top projects — stop dumping 40+ posts.

### Audits / About / Cognitive OS

- **Audits:** keep; single canonical `/audits/`; retire `public/audits.html` via 301.  
- **About:** expand slightly with 3 proof links (GitHub, top project, one post) — still short.  
- **Cognitive OS:** project detail + deep link; not marketing nav item.

---

## 4. Homepage rewrite outline (section order only)

No visual redesign in this plan — order + message only.

1. **Hero** — one line: production AI-agent systems, solo, for hire.  
2. **Proof strip** — 3 numbers or 3 logos/links max (repos / live systems / languages) — not a second manifesto.  
3. **Offer: AE Audits** — one promo block (primary commercial).  
4. **Selected work** — 4–5 keep-tier cards only → `/projects/`.  
5. **Services** — same three (agents / automation / tooling); each one outcome sentence.  
6. **Writing (optional, 3 links)** — three keep-tier notes, single “All notes →” to `/blog/`. **No Research link.**  
7. **About one-liner + CTA** — contact form (keep existing `#contact` pattern).  
8. **Footer** — tight nav (Work · Audits · Notes · About) + social.

Delete from home: dual Blog+Research CTAs; “All projects · Blog · Research” triple; any foundation/ZK brand residue.

---

## 5. Phased execution (fewest files)

### P0 — Stop the bleeding (1–2 days, high leverage)

Touch ideally:

1. `/home/ae/AE/aegnticdotai/scripts/build-site.mjs`  
   - Stop emitting full research index of all posts (redirect page or hard subset ≤10 with explicit allowlist).  
   - Nav chrome: drop Research **or** rename single Writing link.  
   - Projects: read filtered list or `featured` flag.  
   - Regenerate sitemap + llms.txt from keep sets only.  
2. `/home/ae/AE/aegnticdotai/content/projects.json` — kill/fix filler; real URLs only.  
3. `/home/ae/AE/aegnticdotai/index.html` — nav + work links + remove Research peer + work grid = keep-tier only.  
4. `/home/ae/AE/aegnticdotai/public/_redirects` — ` /research/ → /blog/ 301` (if merge), ` /audits.html → /audits/ 301`, ensure unknown paths **404** (fix `/colabs` homepage 200 if SPA/fallback).  
5. Delete or quarantine `/home/ae/AE/aegnticdotai/SITEMAP.md` (replace with “see sitemap.xml + this plan”).  
6. `npm run build:pages` → commit generated `public/**` as today.

**P0 success:** one writing URL in nav; research not a duplicate warehouse; ≤7 projects; no fantasy routes 200-as-home.

### P1 — Content diet (no new features)

1. Tag frontmatter: `status: keep | archive | kill` **or** a single allowlist file `content/blog-public.txt` (lazier than tagging 60 files).  
2. Generator indexes only `keep` (+ optional `archive` page).  
3. 301 killed slugs only if external backlinks matter; else leave files unlinked.  
4. About page body: +proof links.  
5. llms.txt = keep-tier only.

**P1 success:** blog index ≤18; homepage writing teaser pulls from same allowlist.

### P2 — Polish / debt (only if still needed)

1. Remove deployed lab HTML (`design-lab`, type-specimen) from `public/` or robots noindex.  
2. Collapse leftover `cognitive-os.html` / raw duplicates (redirects already partial).  
3. True research later = **new** long-forms with `type: research` + different template — not a sort of the blog.  
4. Optional: rename `/blog/` → `/notes/` with 301s — only if brand wants “notes not blog.”

---

## 6. Explicit anti-dilution rules

1. **One canonical URL per idea.** No second index that lists the same items under a fancier name.  
2. **Nav ≤5 content destinations.** Contact is CTA, not a silo.  
3. **Projects must have a non-org-root URL and one falsifiable claim.** No GitHub org dump as “project.”  
4. **Home work ⊆ public projects ⊆ all repos.** Never the reverse.  
5. **Writing ships only if it proves current offer** (agents, systems, audits, operator tooling) or unique methodology. Commodity AI SEO = reject.  
6. **`sitemap.xml` is the only sitemap.** Delete conflicting markdown sitemaps or mark historical.  
7. **No soft-200 on unknown paths.** Unknown = 404. Fantasy routes in docs must not be live.  
8. **One “Latest” badge sitewide.**  
9. **llms.txt and footer match nav.** If it’s not worth a nav slot, don’t dump it to agents as peer surface.  
10. **New section requires killing an old one** (or explicit demotion). Growth of IA is zero-sum on this domain.  
11. **External product domains** earn a portfolio card only with live check + one-sentence outcome; else link from About/GitHub only.  
12. **Cognitive OS / long policy docs** are artifacts under Work — not alternate brand homes in primary nav.

---

## 7. Key file map

| Path | Role |
|------|------|
| `/home/ae/AE/aegnticdotai/index.html` | Home sections + menu |
| `/home/ae/AE/aegnticdotai/content/projects.json` | Project inventory |
| `/home/ae/AE/aegnticdotai/public/content/blog/*.md` | Writing source (60) |
| `/home/ae/AE/aegnticdotai/scripts/build-site.mjs` | Generates blog/research/projects/audits/about + sitemap + llms |
| `/home/ae/AE/aegnticdotai/public/_redirects` | CF redirects (must ship in dist) |
| `/home/ae/AE/aegnticdotai/public/sitemap.xml` | Real sitemap |
| `/home/ae/AE/aegnticdotai/public/llms.txt` | Agent summary (currently over-lists) |
| `/home/ae/AE/aegnticdotai/SITEMAP.md` | **Stale fiction — neutralize** |
| `/home/ae/AE/aegnticdotai/public/audits/` vs `audits.html` | Duplicate audits surfaces |
| `/home/ae/AE/aegnticdotai/public/cognitive-os/` | Keep as project artifact |

---

## 8. Decision defaults (if you don’t want a meeting)

- Merge research → blog (301).  
- Public projects = 5 keepers above.  
- Blog public index allowlist ~15; rest unlisted.  
- Nav: Home · Work · Audits · Notes · About.  
- P0 only until traffic/offer metrics say P1 depth is worth it.

**Lazier alternative to full curation:** P0 redirects + projects.json cull + nav trim only — leaves 60 posts live but stops dual-nav and filler projects. Do that first if time-boxed; P1 allowlist is the real quality fix.
