import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

// Stable content version prevents a cached menu stylesheet from surviving a release.
const assetVersions = ['premium-nav.css','premium-nav.js','journey.css','journey.js','shared-footer.css'].map(file => [file, createHash('sha256').update(readFileSync(new URL(`../public/${file}`, import.meta.url))).digest('hex').slice(0,12)]);

// One static, no-JavaScript footer for every public page.
export function sharedFooter() {
  return `<footer class="ae-site-footer" aria-label="aegntic footer">
  <div class="ae-site-footer__signature">
    <a class="ae-site-footer__mark" href="/" aria-label="aegntic home">
      <img class="ae-site-footer__flat" src="/ae-logo.webp" width="400" height="400" alt="" loading="lazy">
      <img class="ae-site-footer__chrome" src="/assets/ae-logo-FINAL-nb.png" width="1254" height="1254" alt="" loading="lazy">
    </a>
    <div class="ae-site-footer__voice"><p>Unlimited Insight.<br>Zero Knowledge.</p><a href="/#contact" data-enquiry="Something else">Work with me <span aria-hidden="true">↗</span></a></div>
  </div>
  <nav class="ae-site-footer__links" aria-label="Footer navigation"><a href="/">Home</a><a href="/systems/">Systems</a><a href="/agents/">Agents</a><a href="/plugins/">Plugins</a><a href="/products/">Products</a><a href="/research/">Research</a><a href="/projects/">Projects</a><a href="/privacy/">Privacy</a></nav>
  <div class="ae-site-footer__colophon"><span>aegntic.ai</span><span>© ${new Date().getFullYear()} Mattae Cooper</span><a href="https://github.com/aegntic">GitHub <span aria-hidden="true">↗</span></a></div>
</footer>`;
}

export function withSharedFooter(html) {
  if (/http-equiv="refresh"/i.test(html)) return html;
  // Incumbent pages have one page footer, never an article-level footer.
  html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '');
  if (!/href="\/shared-footer\.css(?:\?[^\"]*)?"/.test(html)) html = html.replace('</head>', '<link rel="stylesheet" href="/shared-footer.css">\n</head>');
  for (const [file, version] of assetVersions) {
    const pattern = new RegExp('((?:href|src)=")/' + file.replace('.', '\\.') + '(?:\\?[^\"]*)?"', 'g');
    html = html.replace(pattern, `$1/${file}?v=${version}"`);
  }
  return html.replace(/\s*<\/body>/, `\n${sharedFooter()}\n</body>`);
}
