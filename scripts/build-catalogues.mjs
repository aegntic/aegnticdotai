import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Small, explicit catalogue source. Existing public project pages remain the deep links.
const catalogues = [
  {key:'systems',number:'01',heading:'Make it<br>work together.',description:'Memory, tools and people. Connected into a working system.',service:'Workflow automation',cards:[
    ['Cognitive OS','Agent infrastructure','A specification for persistent memory, verification and coordinated execution.','/cognitive-os/'],
    ['Cognitive OS Engine','Memory engine','The executable memory tier, built in Rust.','https://github.com/aegntic/cognitive-os-engine'],
    ['clawREFORM','Coordination','A shared operating environment for multi-agent work.','https://clawreform.com'],
    ['Prologue','Discovery and memory','MCP discovery and memory infrastructure.','https://logue.pro']
  ]},
  {key:'agents',number:'02',heading:'Give the work<br>an operator.',description:'A defined task, the right tools and clear limits.',service:'Agent build',cards:[
    ['Echo','Project updates','Keeps project evidence separate and prepares updates for your approval.','https://echo.aegntic.ai/'],
    ['veritas-operator','Research','A pipeline for retrieval, synthesis and verification.','/projects/veritas-operator/'],
    ['obsidian-indexer','Local memory','Turns local vaults into agent-readable knowledge.','/projects/obsidian-indexer/'],
    ['Hermes Agent','General operator','An extensible agent with skills, tools and persistent context.','https://github.com/aegntic/hermes-agent']
  ]},
  {key:'plugins',number:'03',heading:'Add a<br>new ability.',description:'Repeatable workflows for the agent you already use.',service:'Something else',cards:[
    ['aegntic skills','Operating methods','Installable workflows for research, design, building and verification.','/skills/'],
    ['Tab Harvest','Browser research','Open tabs, transcripts and sources, connected into a knowledge graph.','https://github.com/aegntic/tab-harvest'],
    ['Compound Engineering','Development','Workflows for planning, implementation, review and recorded learning.','https://github.com/aegntic/compound-engineering'],
    ['aegntic MCP','Tool connections','Patterns for creating and managing MCP servers.','https://github.com/aegntic/aegntic-MCP']
  ]},
  {key:'products',number:'04',heading:'Yours to<br>put to work.',description:'Tools and systems you can open, inspect and use.',service:'Internal tool',cards:[
    ['Echo','Project updates','Turn separate project evidence into written updates and proof reels for approval.','https://echo.aegntic.ai/'],
    ['Tab Harvest','Browser research','Turn open tabs and transcripts into a connected knowledge graph.','https://github.com/aegntic/tab-harvest'],
    ['CLDCDE','Developer ecosystem','A home for Claude Code tooling, extensions and development patterns.','https://cldcde.cc'],
    ['prompt.fail','Failure cases','Explore prompt failures and agent edge cases.','https://prompt.fail'],
    ['tld.express','Domain research','Agent-assisted domain discovery and operations.','https://tld.express'],
    ['Cognitive OS','Agent infrastructure','Read the memory, verification and coordination specification.','/cognitive-os/']
  ]}
];
const esc = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');

export function buildCatalogues(outputDirectory) {
  for (const page of catalogues) {
    const title = page.key[0].toUpperCase() + page.key.slice(1);
    const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} : : aegntic.ai</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="https://aegntic.ai/${page.key}/"><link rel="stylesheet" href="/design-system.css"><link rel="stylesheet" href="/premium-nav.css"><link rel="stylesheet" href="/journey.css"><link rel="stylesheet" href="/catalog.css"><script src="/premium-nav.js" defer></script><script src="/vendor/gsap/3.13.0/gsap.min.js" defer></script><script src="/vendor/gsap/3.13.0/ScrollTrigger.min.js" defer></script><script src="/journey.js" defer></script></head>
<body class="journey-page"><a class="skip-link" href="#main">Skip to content</a><main id="main"><section class="world world-${page.key} catalog-scene"><div class="world-label"><span>${page.number}</span><span>/</span><span>${page.key.toUpperCase()}</span></div><div class="world-ghost" aria-hidden="true">${page.key}</div><div class="world-art"><img src="/assets/worlds/${page.key === 'agents' ? 'agents.webp' : `${page.key}-mascot-v2.webp`}" width="1536" height="1024" alt="" fetchpriority="high"></div><div class="world-copy"><h1 data-motion-title>${page.heading}</h1><p>${page.description}</p><a class="text-link" href="#collection">Browse ${page.key} ↓</a></div></section><div class="catalog-content"><section class="catalog-grid" id="collection" aria-label="${title}">${page.cards.map(([name,type,description,href])=>`<a class="catalog-card" href="${esc(href)}"${name==='Echo'?' id="echo"':''}><span class="catalog-card__meta">${esc(type)}</span><div><h2>${esc(name)}</h2><p>${esc(description)}</p></div></a>`).join('')}</section><section class="catalog-cta"><h2>Make it work<br>for your team.</h2><p>Bring the task and the constraints. We can work out the right shape.</p><a href="/#contact" data-enquiry="${page.service}">Work with me ↗</a></section><footer class="catalog-footer"><span>© 2026 aegntic</span><a href="/">Return to home ↗</a></footer></div></main></body></html>`;
    mkdirSync(join(outputDirectory,page.key), {recursive:true});
    writeFileSync(join(outputDirectory,page.key,'index.html'), html);
  }
}
