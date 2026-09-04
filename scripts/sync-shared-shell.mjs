import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Normalize committed and freshly generated static pages identically, even without Pandoc.
// Original artwork and article bodies are retained; only retired offers and shell markup move.
export function syncSharedShell(outputDirectory) {
  function visit(directory) {
    for (const entry of readdirSync(directory, {withFileTypes:true})) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {visit(path);continue;}
      if (!entry.name.endsWith('.html')) continue;
      const source = readFileSync(path,'utf8');
      let html = source
        .replace(/\bAegntic\b/g,'aegntic')
        .replace(/<nav class="nav">[\s\S]*?<\/nav>/g,'')
        .replace(/<header class="topbar">[\s\S]*?<\/header>/g,'')
        .replace(/<a\b(?=[^>]*href="\/(?:audits\/|projects\/ae-audits\/)")[^>]*>[\s\S]*?<\/a>/g,'')
        .replace(/AE Audits, /g,'')
        .replace(/<a\b([^>]*?)href="mailto:[^"]*"([^>]*)>([\s\S]*?)<\/a>/g,(match,before,after,label)=> label.includes('@') ? match : `<a ${before}href="/#contact" data-enquiry="Something else"${after}>${label}</a>`)
        .replace(/^[\t ]+$/gm,'');
      if (path.includes('cognitive-os') && !/<main\b/.test(html)) {
        html = html.replace(/<body([^>]*)>/,'<body$1>\n<main id="main">').replace(/<footer\b/,'</main>\n<footer');
      }
      if (html !== source) writeFileSync(path,html);
    }
  }
  visit(outputDirectory);
  const sitemapPath = join(outputDirectory,'sitemap.xml');
  if (existsSync(sitemapPath)) {
    const source = readFileSync(sitemapPath,'utf8');
    const updated = source.replace(/\s*<url>\s*<loc>https:\/\/aegntic\.ai\/(?:audits\/|projects\/ae-audits\/)<\/loc>[\s\S]*?<\/url>/g,'');
    if (source !== updated) writeFileSync(sitemapPath,updated);
  }
  const llmsPath = join(outputDirectory,'llms.txt');
  if (existsSync(llmsPath)) {
    const source = readFileSync(llmsPath,'utf8');
    const updated = source.split('\n').filter(line=> !/\/audits\/|\/projects\/ae-audits\//.test(line)).join('\n').replace(/\bAegntic\b/g,'aegntic');
    if (source !== updated) writeFileSync(llmsPath,updated);
  }
}
