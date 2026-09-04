import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist = join(root,'dist');
const home = readFileSync(join(dist,'index.html'),'utf8');
assert.match(home, /<title>aegntic\.ai : : Unlimited Insight, Zero Knowledge : : agentic solutions for an ai future\.<\/title>/);
const labels = [...home.matchAll(/class="world-label">([\s\S]*?)<\/div>/g)].map(match=>match[1].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
assert.deepEqual(labels,['00 / ACCESS','01 / SYSTEMS','02 / AGENTS','03 / PLUGINS','04 / PRODUCTS','END // CONTACT']);
assert.match(home,/https:\/\/echo\.aegntic\.ai\//);
assert.doesNotMatch(home,/AE Audits|Chairman|15 specialized|Selected systems|The work exists/);
console.log('PASS homepage title, six ordered labels, Echo destination and retired copy');

const pages = [];
function walk(directory) {
  for (const entry of readdirSync(directory,{withFileTypes:true})) {
    const path = join(directory,entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) pages.push(path);
  }
}
walk(dist);
const missing = new Set();
const actionMail = [];
let assets = 0;
for (const page of pages) {
  const html = readFileSync(page,'utf8');
  assert.doesNotMatch(html,/<(?:nav class="nav"|header class="topbar")>/, relative(dist,page));
  assert.doesNotMatch(html,/\bAegntic\b/, relative(dist,page));
  const base = new URL(relative(dist,page),'https://preview.invalid/');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:data:|mailto:|tel:|javascript:|#)/.test(value)) continue;
    const url = new URL(value,base);
    if (url.origin !== 'https://preview.invalid') continue;
    const path = join(dist,decodeURIComponent(url.pathname));
    if (/\.(?:png|webp|jpe?g|svg|gif|woff2?|css|js|mp4|webm)$/i.test(url.pathname)) {
      assets++;
      if (!existsSync(path)) missing.add(`${relative(dist,page)} -> ${url.pathname}`);
    }
  }
  for (const match of html.matchAll(/<a\b[^>]*href="mailto:[^"]*"[^>]*>([\s\S]*?)<\/a>/g)) {
    if (!match[1].includes('@')) actionMail.push(relative(dist,page));
  }
}
assert.equal(missing.size,0,`Missing assets:\n${[...missing].join('\n')}`);
assert.equal(actionMail.length,0,`Action mail links: ${actionMail.join(', ')}`);
console.log(`PASS ${pages.length} HTML pages; ${assets} local asset references; 0 missing; 0 legacy navs; 0 mixed-case brand strings; 0 email action CTAs`);
for (const asset of ['premium-nav.js','enquiry.js','enquiry.css','assets/ae-logo-FINAL-nb.png']) assert.ok(existsSync(join(dist,asset)),asset);
console.log('PASS dynamic shell asset dependencies');
