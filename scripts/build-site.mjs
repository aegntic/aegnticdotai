#!/usr/bin/env node
/**
 * Static site generator for aegntic.ai
 * Builds blog, research, projects, audits into public/ so Vite copies them to dist/.
 * Uses system pandoc for markdown. No new npm deps.
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

function shell({
  title,
  description,
  canonical,
  body,
  active = '',
  jsonLd = null,
}) {
  const nav = [
    ['/', 'Home', 'home'],
    ['/projects/', 'Projects', 'projects'],
    ['/research/', 'Research', 'research'],
    ['/blog/', 'Blog', 'blog'],
    ['/audits/', 'Audits', 'audits'],
  ]
    .map(([href, label, key]) => {
      const cur = key === active ? ' aria-current="page"' : '';
      return `<a href="${href}"${cur}>${label}</a>`;
    })
    .join('\n        ');

  const ld = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    : '';

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
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/site.css">
  ${ld}
</head>
<body>
  <nav class="nav">
    <a class="nav-logo" href="/"><img src="/ae-logo.webp" alt="aegntic"></a>
    <div class="nav-links">
      ${nav}
      <a class="nav-cta" href="mailto:hello@aegntic.com">Work with me</a>
    </div>
  </nav>
  ${body}
  <footer class="footer">
    <img src="/ae-logo.webp" alt="AEGNTIC" style="height:1.75rem;width:auto;opacity:.5;margin:0 auto">
    <div class="footer-links">
      <a href="/projects/">Projects</a>
      <a href="/research/">Research</a>
      <a href="/blog/">Blog</a>
      <a href="/audits/">Audits</a>
      <a href="https://github.com/aegntic" target="_blank" rel="noopener">GitHub</a>
      <a href="https://x.com/aegntic_ai" target="_blank" rel="noopener">X</a>
      <a href="mailto:hello@aegntic.com">Contact</a>
    </div>
    <div class="footer-copy">&copy; ${new Date().getFullYear()} Mattae Cooper · aegntic.ai</div>
  </footer>
</body>
</html>
`;
}

function loadPosts() {
  const files = readdirSync(BLOG_SRC).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(join(BLOG_SRC, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const title =
      meta.title ||
      body
        .split('\n')
        .find((l) => l.startsWith('# '))
        ?.slice(2)
        .trim() ||
      slug;
    const description = meta.description || '';
    const tags = parseTags(meta.tags || '');
    const date = parseDate(meta.pubDate || '');
    return { slug, title, description, tags, date, pubDate: meta.pubDate || '', body, raw };
  });
  posts.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
  return posts;
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

function buildBlog(posts) {
  // index
  const items = posts
    .map(
      (p) => `<a class="list-item" href="/blog/${esc(p.slug)}/" data-tags="${esc(p.tags.join(','))}">
  <div class="list-title">${esc(p.title)}</div>
  <p>${esc(p.description || p.title)}</p>
  <div class="list-meta">
    ${p.date ? `<span>${esc(formatDate(p.date))}</span>` : ''}
    ${p.tags
      .slice(0, 4)
      .map((t) => `<span class="tag">${esc(t)}</span>`)
      .join('')}
  </div>
</a>`,
    )
    .join('\n');

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
  const filters = [
    `<button type="button" class="filter active" data-filter="*">All</button>`,
    ...allTags
      .slice(0, 24)
      .map(
        (t) =>
          `<button type="button" class="filter" data-filter="${esc(t)}">${esc(t)}</button>`,
      ),
  ].join('\n      ');

  const indexBody = `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">Writing</div>
    <h1 class="page-title">Blog</h1>
    <p class="page-desc">${posts.length} posts on agents, MCP, architecture, shipping systems, and the Aegntic stack. Full text, no JS required.</p>
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
      const show = f === '*' || tags.includes(f);
      item.classList.toggle('hidden-by-filter', !show);
    });
  });
})();
</script>`;

  write(
    join(OUT, 'blog/index.html'),
    shell({
      title: 'Blog — aegntic.ai',
      description:
        'Writing from Mattae Cooper (@aegntic) on AI agents, MCP, architecture, and shipping production systems.',
      canonical: `${SITE}/blog/`,
      body: indexBody,
      active: 'blog',
    }),
  );

  for (const p of posts) {
    let html;
    try {
      html = mdToHtml(p.body);
    } catch (err) {
      console.error('pandoc failed for', p.slug, err.message);
      html = `<pre>${esc(p.body)}</pre>`;
    }
    // drop duplicate H1 if present
    html = html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');
    const body = `<main class="page">
  <a class="back" href="/blog/">← Blog</a>
  <article class="prose">
    <div class="eyebrow">${p.date ? esc(formatDate(p.date)) : 'Essay'}</div>
    <h1>${esc(p.title)}</h1>
    ${p.description ? `<p><em>${esc(p.description)}</em></p>` : ''}
    <div class="card-tags" style="margin:0 0 1.75rem">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    ${html}
  </article>
  <div class="cta-row">
    <a class="btn-ghost btn" href="/blog/">All posts</a>
    <a class="btn" href="mailto:hello@aegntic.com">Work with me</a>
  </div>
</main>`;
    write(
      join(OUT, `blog/${p.slug}/index.html`),
      shell({
        title: `${p.title} — aegntic.ai`,
        description: p.description || p.title,
        canonical: `${SITE}/blog/${p.slug}/`,
        body,
        active: 'blog',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description || p.title,
          datePublished: p.date ? p.date.toISOString().slice(0, 10) : undefined,
          author: {
            '@type': 'Person',
            name: 'Mattae Cooper',
            url: SITE,
          },
          mainEntityOfPage: `${SITE}/blog/${p.slug}/`,
        },
      }),
    );
  }
}

function buildResearch(posts) {
  // Research = technical archive; same posts, research framing. Prefer agent/MCP/architecture tags first.
  const weight = (p) => {
    const t = p.tags.map((x) => x.toLowerCase());
    let s = 0;
    if (t.some((x) => /mcp|agent|architecture|research|zk|privacy|security/.test(x))) s += 3;
    if (t.some((x) => /ai|llm|automation|pipeline/.test(x))) s += 1;
    return s;
  };
  const ordered = [...posts].sort((a, b) => weight(b) - weight(a) || (b.date - a.date));

  const featured = ordered[0];
  const rest = ordered.slice(1);

  const featuredHtml = featured
    ? `<a class="card" href="/blog/${esc(featured.slug)}/" style="margin-bottom:1.5rem">
  <div class="card-body">
    <div class="card-meta">Featured research</div>
    <div class="card-title" style="font-size:1.35rem">${esc(featured.title)}</div>
    <p class="card-sub">${esc(featured.description || '')}</p>
    <div class="card-tags">${featured.tags.slice(0, 5).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
  </div>
</a>`
    : '';

  const items = rest
    .map(
      (p) => `<a class="list-item" href="/blog/${esc(p.slug)}/">
  <div class="list-title">${esc(p.title)}</div>
  <p>${esc(p.description || p.title)}</p>
  <div class="list-meta">
    ${p.date ? `<span>${esc(formatDate(p.date))}</span>` : ''}
    ${p.tags.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
  </div>
</a>`,
    )
    .join('\n');

  const body = `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">aegntic.research</div>
    <h1 class="page-title">Research</h1>
    <p class="page-desc">Long-form notes on agents, MCP, architecture, privacy, and production systems. Canonical articles live under /blog/ — this index is the research directory.</p>
  </div>
  ${featuredHtml}
  <div class="list">${items}</div>
</main>`;

  write(
    join(OUT, 'research/index.html'),
    shell({
      title: 'Research — aegntic.ai',
      description:
        'Research directory: agents, MCP, architecture, privacy, and production AI systems by Mattae Cooper.',
      canonical: `${SITE}/research/`,
      body,
      active: 'research',
    }),
  );
}

function buildProjects(projects) {
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

  const indexBody = `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">Selected work</div>
    <h1 class="page-title">Projects</h1>
    <p class="page-desc">Shipped systems — production products, open-source operator tooling, and research surfaces. No demos-as-portfolio.</p>
  </div>
  <div class="grid grid-3">${cards}</div>
</main>`;

  write(
    join(OUT, 'projects/index.html'),
    shell({
      title: 'Projects — aegntic.ai',
      description:
        'Selected projects by Mattae Cooper (@aegntic): AE Audits, CLDCDE, clawREFORM, Prologue, and more.',
      canonical: `${SITE}/projects/`,
      body: indexBody,
      active: 'projects',
    }),
  );

  for (const p of projects) {
    const ctaHref = p.url || '/';
    const ctaLabel = p.external ? 'Open project' : 'View';
    const body = `<main class="page">
  <a class="back" href="/projects/">← Projects</a>
  <article class="prose">
    <span class="status-pill">${esc(p.status || 'Project')}</span>
    <h1>${esc(p.title)}</h1>
    <p><em>${esc(p.subtitle || '')}${p.subtitle ? ' — ' : ''}${esc(p.summary)}</em></p>
    <div class="card-tags" style="margin:0 0 1.5rem">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    ${p.image ? `<p><img src="${esc(p.image)}" alt="${esc(p.title)}" style="border-radius:1rem;border:1px solid var(--rule)"></p>` : ''}
    ${p.body
      .split(/\n\n+/)
      .map((para) => `<p>${esc(para).replace(/\n/g, '<br>')}</p>`)
      .join('\n')}
  </article>
  <div class="cta-row">
    <a class="btn" href="${esc(ctaHref)}"${p.external ? ' target="_blank" rel="noopener"' : ''}>${esc(ctaLabel)}</a>
    <a class="btn-ghost btn" href="/projects/">All projects</a>
    <a class="btn-ghost btn" href="mailto:hello@aegntic.com">Work with me</a>
  </div>
</main>`;
    write(
      join(OUT, `projects/${p.slug}/index.html`),
      shell({
        title: `${p.title} — aegntic.ai`,
        description: p.summary,
        canonical: `${SITE}/projects/${p.slug}/`,
        body,
        active: 'projects',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: p.title,
          description: p.summary,
          url: `${SITE}/projects/${p.slug}/`,
          author: { '@type': 'Person', name: 'Mattae Cooper' },
        },
      }),
    );
  }
}

function buildAudits() {
  const body = `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">Latest offer</div>
    <h1 class="page-title">AE Audits</h1>
    <p class="page-desc">Agent-native code and decision review. A structured adversarial council — 15 specialized lenses — before you commit capital, time, or reputation.</p>
  </div>
  <article class="prose">
    <h2>What you get</h2>
    <p>Not a lint pass. A decision-grade brief from multiple adversarial lenses: architecture, security, economics, operations, product risk, and more. Built for expensive bets where a single-model rubber stamp is not enough.</p>
    <h2>Pricing</h2>
    <ul>
      <li><strong>Async brief</strong> — from $490</li>
      <li><strong>Full council</strong> — $1,890</li>
      <li><strong>Strategic</strong> — from $4,200</li>
    </ul>
    <h2>Who it's for</h2>
    <p>Founders, operators, and eng leads shipping agent systems, infra bets, or high-stakes product calls who want structured pushback before lock-in.</p>
  </article>
  <div class="cta-row">
    <a class="btn" href="mailto:hello@aegntic.com?subject=AE%20Audits">Request an audit</a>
    <a class="btn-ghost btn" href="/projects/ae-audits/">Project page</a>
  </div>
</main>`;
  write(
    join(OUT, 'audits/index.html'),
    shell({
      title: 'AE Audits — agent-native code review — aegntic.ai',
      description:
        'AE Audits: agent-native code and decision review. Async brief from $490, full council $1,890, strategic from $4,200.',
      canonical: `${SITE}/audits/`,
      body,
      active: 'audits',
    }),
  );
}

function buildAbout() {
  const body = `<main class="page">
  <div class="hero-mini">
    <div class="eyebrow">aegntic</div>
    <h1 class="page-title">About</h1>
    <p class="page-desc">Mattae Cooper (@aegntic) — independent AI-agent engineer. Production systems, solo, end to end.</p>
  </div>
  <article class="prose">
    <p>I design, build, and ship AI-agent systems alone — architecture through deployment — in Rust, Go, TypeScript, and Python. Onchain trade execution, large Go backends on Postgres and AWS, edge products on Cloudflare Workers: real systems in production.</p>
    <p>No agency, no handoff. Custom agent builds, automation that removes manual work, and developer tooling for the Claude Code ecosystem. The proof is public.</p>
    <p><strong>Contact:</strong> <a href="mailto:hello@aegntic.com">hello@aegntic.com</a> · <a href="https://github.com/aegntic">GitHub</a> · <a href="https://x.com/aegntic_ai">X</a></p>
  </article>
</main>`;
  write(
    join(OUT, 'about/index.html'),
    shell({
      title: 'About — aegntic.ai',
      description:
        'Mattae Cooper (@aegntic) — independent AI-agent engineer who ships production systems solo, end to end.',
      canonical: `${SITE}/about/`,
      body,
      active: 'home',
    }),
  );
}

function buildSitemap(posts, projects) {
  const urls = [
    ['/', '1.0', 'weekly'],
    ['/projects/', '0.9', 'weekly'],
    ['/research/', '0.9', 'weekly'],
    ['/blog/', '0.9', 'weekly'],
    ['/audits/', '0.8', 'monthly'],
    ['/about/', '0.6', 'monthly'],
    ...projects.map((p) => [`/projects/${p.slug}/`, '0.7', 'monthly']),
    ...posts.map((p) => [`/blog/${p.slug}/`, '0.6', 'yearly']),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
`;
  writeFileSync(join(OUT, 'sitemap.xml'), xml);
}

function buildLlms(posts, projects) {
  const projectLines = projects
    .map((p) => `- ${p.title} — ${p.summary} (${SITE}/projects/${p.slug}/)`)
    .join('\n');
  const postLines = posts
    .slice(0, 40)
    .map((p) => `- ${p.title} (${SITE}/blog/${p.slug}/)`)
    .join('\n');
  const more =
    posts.length > 40 ? `\n- …and ${posts.length - 40} more at ${SITE}/blog/\n` : '\n';

  const txt = `# aegntic.ai

> Mattae Cooper (@aegntic) — independent AI-agent engineer who designs, builds, and ships production AI-agent systems solo, end to end. Available for hire.

## Services
- Custom AI-agent builds — architecture through production (Rust, Go, TypeScript, Python)
- Automation systems — workflows, integrations, backends in production
- Developer tooling — Claude Code ecosystem, MCP, CLIs
- AE Audits — agent-native adversarial review (${SITE}/audits/)

## Projects
${projectLines}

## Research & blog
Full archive: ${SITE}/research/ and ${SITE}/blog/
${postLines}${more}
## Contact
- Email: hello@aegntic.com
- GitHub: https://github.com/aegntic
- X: https://x.com/aegntic_ai
- About: ${SITE}/about/

## Site map
- Home: ${SITE}/
- Projects: ${SITE}/projects/
- Research: ${SITE}/research/
- Blog: ${SITE}/blog/
- Audits: ${SITE}/audits/
- robots: ${SITE}/robots.txt
- sitemap: ${SITE}/sitemap.xml
`;
  writeFileSync(join(OUT, 'llms.txt'), txt);
}

function ensureAssets() {
  // project wireframes already under public/assets
  // root portfolio images needed at absolute paths for nested pages
  const rootImgs = [
    'work-open-inventory.png',
    'work-cldcde.jpg',
    'work-clawreform.jpg',
    'work-veritas.png',
    'work-aetools.jpg',
    'work-prologue.jpg',
    'ae-logo.webp',
  ];
  for (const name of rootImgs) {
    const src = join(ROOT, name);
    const dest = join(OUT, name);
    if (existsSync(src) && !existsSync(dest)) {
      cpSync(src, dest);
    }
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
    // Cloudflare build images often lack pandoc. If pages were committed,
    // keep them and let vite copy public/ → dist/.
    if (existsSync(join(OUT, 'blog/index.html'))) {
      console.warn('pandoc missing — reusing committed public/{blog,projects,research,...}');
      process.exit(0);
    }
    console.error('pandoc required on PATH (or commit generated public pages)');
    process.exit(1);
  }

  const projects = JSON.parse(readFileSync(PROJECTS_SRC, 'utf8'));
  const posts = loadPosts();

  cleanGenerated();
  ensureAssets();
  buildBlog(posts);
  buildResearch(posts);
  buildProjects(projects);
  buildAudits();
  buildAbout();
  buildSitemap(posts, projects);
  buildLlms(posts, projects);

  // robots
  writeFileSync(
    join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
  );

  console.log(
    `built: ${posts.length} posts, ${projects.length} projects → public/{blog,research,projects,audits,about}`,
  );
}

main();
