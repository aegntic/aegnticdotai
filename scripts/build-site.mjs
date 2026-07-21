#!/usr/bin/env node
/**
 * Static site generator for aegntic.ai
 * Builds blog, projects, audits, about into public/.
 * Research is a 301 stub only (no second index).
 * Uses system pandoc. No new npm deps.
 */
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  existsSync,
  cpSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_SRC = join(ROOT, 'public/content/blog');
const PROJECTS_SRC = join(ROOT, 'content/projects.json');
const ALLOW_SRC = join(ROOT, 'content/blog-public.txt');
const OUT = join(ROOT, 'public');
const SITE = 'https://aegntic.ai';

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseTags(raw = '') {
  return [...String(raw).matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

function parseDate(s = '') {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDate(d) {
  if (!d) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { meta: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s+/, '');
  const meta = {};
  for (const line of fm.split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) {
      v = v.slice(1, -1);
    }
    meta[k] = v;
  }
  return { meta, body };
}

function mdToHtml(markdown) {
  return execFileSync(
    'pandoc',
    ['-f', 'markdown', '-t', 'html5', '--wrap=none'],
    { input: markdown, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
  );
}

function loadAllowlist() {
  if (!existsSync(ALLOW_SRC)) return null;
  return new Set(
    readFileSync(ALLOW_SRC, 'utf8')
      .split('\n')
      .map((l) => l.replace(/#.*$/, '').trim())
      .filter(Boolean),
  );
}

const MENU_ARROW = `<span class="menu-link-arrow"><svg viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M24.4 2L41.5 19.1L24.4 36.2M0 19.1H40.3" stroke="currentColor" stroke-width="4.9"/></svg></span>`;

function menuLink(href, label, key, active) {
  const cur = key === active ? ' aria-current="page"' : '';
  const ext = href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
  return `<a href="${href}" class="menu-link" onclick="closeMenu()"${cur}${ext}>${MENU_ARROW}<span>${label}</span></a>`;
}

function shell({ title, description, canonical, body, active = '', jsonLd = null, electricCta = false }) {
  const items = [
    ['/', 'Home', 'home'],
    ['/projects/', 'Work', 'projects'],
    ['/blog/', 'Notes', 'blog'],
    ['https://aedex.ing', 'aedex', 'aedex'],
    ['/about/', 'About', 'about'],
    ['#contact-home', 'Contact', 'contact'],
  ];
  // Contact on subpages goes home contact
  const menu = items
    .map(([href, label, key]) => {
      const h = key === 'contact' ? '/#contact' : href;
      const cur = key === active ? ' aria-current="page"' : '';
      const ext = h.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `            <a href="${h}" class="menu-link"${cur}${ext} onclick="closeMenu()">
                <span class="menu-link-arrow"><svg viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.4 2L41.5 19.1L24.4 36.2M0 19.1H40.3" stroke="currentColor" stroke-width="4.9"/></svg></span>
                <span>${label}</span>
            </a>`;
    })
    .join('\n');

  const ld = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    : '';

  const ctaClass = electricCta ? 'btn btn-electric' : 'btn';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta name="theme-color" content="#f0f6f8">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/og-aegntic-skeleton.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/site.css">
  ${ld}
</head>
<body>
  <nav class="nav">
    <a class="nav-logo" href="/"><img src="/ae-logo.webp" alt="aegntic"></a>
    <button type="button" class="nav-menu-btn" id="menuBtn" onclick="toggleMenu()" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">
      <span class="nav-menu-btn-icon" aria-hidden="true">
        <svg viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11.45" cy="3" r="2.55" fill="currentColor"/><circle cx="2.55" cy="3" r="2.55" fill="currentColor"/></svg>
      </span>
      <span class="nav-menu-btn-text">
        <span class="menu-label">Menu</span>
        <span class="menu-close">Close</span>
      </span>
    </button>
  </nav>
  <nav id="site-menu" aria-hidden="true">
    <div class="site-menu-inner">
${menu}
    </div>
  </nav>
  ${body}
  <footer class="footer">
    <div class="footer-marquee" aria-hidden="true">
      <div class="footer-marquee-inner">
        <span>Rust</span><span>Go</span><span>TypeScript</span><span>Python</span><span>Agents</span><span>aedex</span><span>MCP</span><span>Claude Code</span>
        <span>Rust</span><span>Go</span><span>TypeScript</span><span>Python</span><span>Agents</span><span>aedex</span><span>MCP</span><span>Claude Code</span>
      </div>
    </div>
    <img class="footer-logo" src="/ae-logo.webp" alt="AEGNTIC">
    <div class="footer-links">
      <a href="/projects/">Work</a>
      <a href="/blog/">Notes</a>
      <a href="https://aedex.ing" target="_blank" rel="noopener">aedex</a>
      <a href="/about/">About</a>
      <a href="/audits/">Audits</a>
      <a href="https://github.com/aegntic" target="_blank" rel="noopener">GitHub</a>
      <a href="https://x.com/aegntic_ai" target="_blank" rel="noopener">X</a>
      <a href="mailto:hello@aegntic.com">Contact</a>
    </div>
    <div class="footer-copy">&copy; ${new Date().getFullYear()} Mattae Cooper · aegntic.ai</div>
  </footer>
  <script>
    function toggleMenu(){
      const btn=document.getElementById('menuBtn');
      const menu=document.getElementById('site-menu');
      const open=menu.classList.toggle('open');
      menu.setAttribute('aria-hidden', open?'false':'true');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open?'true':'false');
    }
    function closeMenu(){
      const btn=document.getElementById('menuBtn');
      const menu=document.getElementById('site-menu');
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden','true');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
    document.addEventListener('click',e=>{
      const btn=document.getElementById('menuBtn');
      const menu=document.getElementById('site-menu');
      if(menu.classList.contains('open') && !btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMenu(); });
  </script>
</body>
</html>
`;
}


function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function cleanGenerated() {
  for (const dir of ['blog', 'research', 'projects', 'audits', 'about']) {
    const p = join(OUT, dir);
    if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  }
}

function loadPosts(allow) {
  const files = readdirSync(BLOG_SRC).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(join(BLOG_SRC, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const title =
      meta.title ||
      body.split('\n').find((l) => l.startsWith('# '))?.slice(2).trim() ||
      slug;
    const tags = parseTags(meta.tags || '');
    const date = parseDate(meta.pubDate || '');
    const listed = !allow || allow.has(slug);
    return {
      slug,
      title,
      description: meta.description || '',
      tags,
      date,
      body,
      listed,
    };
  });
  posts.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
  return posts;
}

function buildBlog(posts) {
  const listed = posts.filter((p) => p.listed);
  const items = listed
    .map(
      (p) => `<a class="list-item" href="/blog/${esc(p.slug)}/" data-tags="${esc(p.tags.join(','))}">
  <div class="list-title">${esc(p.title)}</div>
  <p>${esc(p.description || p.title)}</p>
  <div class="list-meta">
    ${p.date ? `<span>${esc(formatDate(p.date))}</span>` : ''}
    ${p.tags.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
  </div>
</a>`,
    )
    .join('\n');

  const allTags = [...new Set(listed.flatMap((p) => p.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
  const filters = [
    `<button type="button" class="filter active" data-filter="*">All</button>`,
    ...allTags
      .slice(0, 8)
      .map(
        (t) =>
          `<button type="button" class="filter" data-filter="${esc(t)}">${esc(t)}</button>`,
      ),
  ].join('\n      ');

  write(
    join(OUT, 'blog/index.html'),
    shell({
      title: 'Notes — aegntic.ai',
      description:
        'Selected notes on agents, MCP, systems, and shipping — Mattae Cooper (@aegntic).',
      canonical: `${SITE}/blog/`,
      active: 'blog',
      body: `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">Writing</div>
    <h1 class="page-title">Notes</h1>
    <p class="page-desc">${listed.length} selected notes. Full text, no JS required. Archive URLs may still resolve; this index is the public set only.</p>
  </div>
  <div class="filters" id="filters">${filters}</div>
  <div class="list" id="post-list">${items}</div>
</main>
<script>
(() => {
  const filters = document.getElementById('filters');
  const list = document.getElementById('post-list');
  if (!filters || !list) return;
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.getAttribute('data-filter');
    filters.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b === btn));
    list.querySelectorAll('.list-item').forEach((item) => {
      const tags = (item.getAttribute('data-tags') || '').split(',').filter(Boolean);
      item.classList.toggle('hidden-by-filter', !(f === '*' || tags.includes(f)));
    });
  });
})();
</script>`,
    }),
  );

  // Build HTML for all posts (keep old URLs alive) but only list allowlisted
  for (const p of posts) {
    let html;
    try {
      html = mdToHtml(p.body);
    } catch {
      html = `<pre>${esc(p.body)}</pre>`;
    }
    html = html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');
    const robots = p.listed ? '' : '<meta name="robots" content="noindex,follow">\n  ';
    const page = shell({
      title: `${p.title} — aegntic.ai`,
      description: p.description || p.title,
      canonical: `${SITE}/blog/${p.slug}/`,
      active: 'blog',
      jsonLd: p.listed
        ? {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description || p.title,
            datePublished: p.date ? p.date.toISOString().slice(0, 10) : undefined,
            author: { '@type': 'Person', name: 'Mattae Cooper', url: SITE },
            mainEntityOfPage: `${SITE}/blog/${p.slug}/`,
          }
        : null,
      body: `<main class="page">
  <a class="back" href="/blog/">← Notes</a>
  <article class="prose">
    <div class="eyebrow">${p.date ? esc(formatDate(p.date)) : 'Note'}</div>
    <h1>${esc(p.title)}</h1>
    ${p.description ? `<p><em>${esc(p.description)}</em></p>` : ''}
    <div class="card-tags" style="margin:0 0 1.75rem">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    ${html}
  </article>
  <div class="cta-row">
    <a class="btn-ghost btn" href="/blog/">All notes</a>
    <a class="btn" href="https://aedex.ing" target="_blank" rel="noopener">Open aedex</a>
  </div>
</main>`,
    });
    write(
      join(OUT, `blog/${p.slug}/index.html`),
      page.replace('<meta name="theme-color"', `${robots}<meta name="theme-color"`),
    );
  }
}

function buildResearchRedirect() {
  // Static HTML with meta refresh + link (CF _redirects also 301s)
  write(
    join(OUT, 'research/index.html'),
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Research moved — aegntic.ai</title>
  <meta http-equiv="refresh" content="0;url=/blog/">
  <link rel="canonical" href="${SITE}/blog/">
  <script>location.replace('/blog/');</script>
</head>
<body>
  <p>Research merged into <a href="/blog/">Notes</a>.</p>
</body>
</html>
`,
  );
}

function buildProjects(projects) {
  const publicList = projects.filter((p) => p.featured !== false || p.home);
  // show all remaining in projects.json as public (we already culled)
  const cards = projects
    .map(
      (p) => `<a class="card" href="/projects/${esc(p.slug)}/">
  <div class="card-img">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : ''}</div>
  <div class="card-body">
    <div class="card-meta">${esc(p.status || p.subtitle || 'Project')}</div>
    <div class="card-title">${esc(p.title)}</div>
    <p class="card-sub">${esc(p.summary)}</p>
    <div class="card-tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
  </div>
</a>`,
    )
    .join('\n');

  write(
    join(OUT, 'projects/index.html'),
    shell({
      title: 'Work — aegntic.ai',
      description:
        'Selected work: aedex, CLDCDE, clawREFORM, Prologue, Cognitive OS — Mattae Cooper.',
      canonical: `${SITE}/projects/`,
      active: 'projects',
      body: `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">Selected work</div>
    <h1 class="page-title">Work</h1>
    <p class="page-desc">Shipped systems and product surfaces. Primary focus: <a href="https://aedex.ing" style="color:var(--accent)">aedex</a>.</p>
  </div>
  <div class="grid grid-3">${cards}</div>
</main>`,
    }),
  );

  for (const p of projects) {
    const ctaHref = p.url || '/';
    const ctaLabel = p.external ? 'Open project' : 'View';
    write(
      join(OUT, `projects/${p.slug}/index.html`),
      shell({
        title: `${p.title} — aegntic.ai`,
        description: p.summary,
        canonical: `${SITE}/projects/${p.slug}/`,
        active: 'projects',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: p.title,
          description: p.summary,
          url: `${SITE}/projects/${p.slug}/`,
          author: { '@type': 'Person', name: 'Mattae Cooper' },
        },
        body: `<main class="page">
  <a class="back" href="/projects/">← Work</a>
  <article class="prose">
    <span class="status-pill">${esc(p.status || 'Project')}</span>
    <h1>${esc(p.title)}</h1>
    <p><em>${esc(p.subtitle || '')}${p.subtitle ? ' — ' : ''}${esc(p.summary)}</em></p>
    <div class="card-tags" style="margin:0 0 1.5rem">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    ${p.image ? `<p><img src="${esc(p.image)}" alt="${esc(p.title)}" style="border-radius:1rem;border:1px solid var(--rule)"></p>` : ''}
    ${p.body.split(/\n\n+/).map((para) => `<p>${esc(para).replace(/\n/g, '<br>')}</p>`).join('\n')}
  </article>
  <div class="cta-row">
    <a class="btn" href="${esc(ctaHref)}"${p.external ? ' target="_blank" rel="noopener"' : ''}>${esc(ctaLabel)}</a>
    <a class="btn-ghost btn" href="/projects/">All work</a>
  </div>
</main>`,
      }),
    );
  }
}

function buildAudits() {
  write(
    join(OUT, 'audits/index.html'),
    shell({
      title: 'AE Audits — aegntic.ai',
      description:
        'Agent-native decision review — available on request. Primary product focus is aedex.',
      canonical: `${SITE}/audits/`,
      active: 'about',
      body: `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">Selective offer</div>
    <h1 class="page-title">AE Audits</h1>
    <p class="page-desc">Still available for high-stakes decision review. Not the primary offer — that is <a href="https://aedex.ing" style="color:var(--accent)">aedex</a>.</p>
  </div>
  <article class="prose">
    <p>Structured adversarial review across specialized lenses before you lock capital, architecture, or reputation. Pricing and scope by conversation.</p>
    <p>If you need catalog-first agent tooling and data execution, start at aedex instead.</p>
  </article>
  <div class="cta-row">
    <a class="btn" href="mailto:hello@aegntic.com?subject=AE%20Audits">Request an audit</a>
    <a class="btn-ghost btn" href="https://aedex.ing" target="_blank" rel="noopener">Open aedex</a>
  </div>
</main>`,
    }),
  );
}

function buildAbout() {
  write(
    join(OUT, 'about/index.html'),
    shell({
      title: 'About — aegntic.ai',
      description:
        'Mattae Cooper (@aegntic) — independent AI-agent engineer. Building aedex and production agent systems.',
      canonical: `${SITE}/about/`,
      active: 'about',
      body: `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">aegntic</div>
    <h1 class="page-title">About</h1>
    <p class="page-desc">Mattae Cooper (@aegntic) — independent AI-agent engineer. Primary product: aedex.</p>
  </div>
  <article class="prose">
    <p>I design, build, and ship AI-agent systems — architecture through deployment — in Rust, Go, TypeScript, and Python. Current focus is <strong>aedex</strong>: a catalog-first data marketplace CLI and gateway for agents.</p>
    <p>Proof lives in public work:</p>
    <ul>
      <li><a href="https://aedex.ing">aedex</a> — agent data exchange</li>
      <li><a href="https://cldcde.cc">CLDCDE</a> — Claude Code ecosystem</li>
      <li><a href="/cognitive-os/">Cognitive OS</a> — multi-harness agent policy</li>
      <li><a href="https://github.com/aegntic">GitHub @aegntic</a></li>
    </ul>
    <p><strong>Contact:</strong> <a href="mailto:hello@aegntic.com">hello@aegntic.com</a> · <a href="https://x.com/aegntic_ai">X</a></p>
  </article>
</main>`,
    }),
  );
}

function buildSitemap(listedPosts, projects) {
  const urls = [
    ['/', '1.0', 'weekly'],
    ['/projects/', '0.9', 'weekly'],
    ['/blog/', '0.9', 'weekly'],
    ['/about/', '0.7', 'monthly'],
    ['/audits/', '0.5', 'monthly'],
    ['/cognitive-os/', '0.7', 'monthly'],
    ...projects.map((p) => [`/projects/${p.slug}/`, p.slug === 'aedex' ? '0.9' : '0.7', 'monthly']),
    ...listedPosts.map((p) => [`/blog/${p.slug}/`, '0.6', 'yearly']),
  ];
  writeFileSync(
    join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([loc, priority, changefreq]) => `  <url>
    <loc>${SITE}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
  );
}

function buildLlms(listedPosts, projects) {
  const projectLines = projects
    .map((p) => `- ${p.title} — ${p.summary} (${p.url || SITE + '/projects/' + p.slug + '/'})`)
    .join('\n');
  const postLines = listedPosts
    .map((p) => `- ${p.title} (${SITE}/blog/${p.slug}/)`)
    .join('\n');

  writeFileSync(
    join(OUT, 'llms.txt'),
    `# aegntic.ai

> Mattae Cooper (@aegntic) — independent AI-agent engineer. Primary product: aedex (catalog-first data marketplace CLI for agents).

## Primary product
- aedex — https://aedex.ing — discover, inspect, and run agent data tools. One CLI, one balance.

## Services
- Custom AI-agent builds (Rust, Go, TypeScript, Python)
- Automation infrastructure
- Developer / agent tooling (MCP, CLI, Claude Code ecosystem)
- AE Audits — selective decision review (not primary offer)

## Work
${projectLines}

## Notes (public index)
${postLines}

## Contact
- Email: hello@aegntic.com
- GitHub: https://github.com/aegntic
- X: https://x.com/aegntic_ai
- About: ${SITE}/about/

## Site map
- Home: ${SITE}/
- Work: ${SITE}/projects/
- Notes: ${SITE}/blog/
- aedex: https://aedex.ing
- Cognitive OS: ${SITE}/cognitive-os/
- sitemap: ${SITE}/sitemap.xml
`,
  );
}

function ensureAssets() {
  for (const name of [
    'work-open-inventory.png',
    'work-cldcde.jpg',
    'work-clawreform.jpg',
    'work-veritas.png',
    'work-aetools.jpg',
    'work-prologue.jpg',
    'ae-logo.webp',
  ]) {
    const src = join(ROOT, name);
    const dest = join(OUT, name);
    if (existsSync(src) && !existsSync(dest)) cpSync(src, dest);
  }
}

function main() {
  if (!existsSync(BLOG_SRC)) {
    console.error('Missing blog source:', BLOG_SRC);
    process.exit(1);
  }
  try {
    execFileSync('pandoc', ['-v'], { stdio: 'ignore' });
  } catch {
    if (existsSync(join(OUT, 'blog/index.html'))) {
      console.warn('pandoc missing — reusing committed public pages');
      process.exit(0);
    }
    console.error('pandoc required');
    process.exit(1);
  }

  const projects = JSON.parse(readFileSync(PROJECTS_SRC, 'utf8'));
  const allow = loadAllowlist();
  const posts = loadPosts(allow);
  const listed = posts.filter((p) => p.listed);

  cleanGenerated();
  ensureAssets();
  buildBlog(posts);
  buildResearchRedirect();
  buildProjects(projects);
  buildAudits();
  buildAbout();
  buildSitemap(listed, projects);
  buildLlms(listed, projects);

  writeFileSync(
    join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
  );

  console.log(
    `built: ${listed.length}/${posts.length} listed posts, ${projects.length} projects (aedex-first)`,
  );
}

main();
