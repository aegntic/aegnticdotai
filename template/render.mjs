export const escape = value => {
  if (typeof value !== 'string') throw new TypeError('Content values must be strings. Check project.mjs.');
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
};

export function safeURL(value, kind = 'link') {
  if (typeof value !== 'string' || !value || /[\s\\<>"'\u0000-\u001f\u007f]/.test(value)) throw new Error(`Invalid ${kind} URL: ${value}`);
  if (kind === 'link' && /^#[a-z][a-z0-9-]*$/i.test(value)) return value;
  if (/^\.\/[a-z0-9_./-]+(?:[?#][^\s<>"']*)?$/i.test(value) && !value.split(/[/?#]/).includes('..')) return value;
  try {
    const url = new URL(value);
    if (url.username || url.password) throw new Error('Credentials are not allowed in URLs.');
    if (url.protocol === 'https:' && url.hostname) return url.href;
    if (kind === 'link' && ['mailto:', 'tel:'].includes(url.protocol) && url.pathname) return url.href;
  } catch { /* Report one clear validation error below. */ }
  throw new Error(`Use https:, mailto:, tel:, #section or ./local-file for ${kind}: ${value}`);
}

const url = (value, kind) => escape(safeURL(value, kind));
const lines = values => {
  if (!Array.isArray(values) || !values.length) throw new Error('Headings and descriptions need at least one text line.');
  return values.map(escape).join('<br>');
};
const id = value => {
  if (!/^[a-z][a-z0-9-]*$/.test(value)) throw new Error(`Use a lowercase section/key ID, with letters, numbers and hyphens: ${value}`);
  return value;
};
const link = (item, className = '', arrow = true) => `<a${className ? ` class="${className}"` : ''} href="${url(item.href)}"${item.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(item.label)}${arrow ? ' <span aria-hidden="true">↗</span>' : ''}${item.newTab ? '<span class="sr-only"> in a new tab</span>' : ''}</a>`;
const image = (item, priority = false, extra = '') => {
  if (!item) return '';
  if (![item.width, item.height].every(value => Number.isInteger(value) && value > 0)) throw new Error('Images need positive integer width and height.');
  return `<img src="${url(item.src, 'asset')}" width="${item.width}" height="${item.height}" alt="${escape(item.alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'}${extra}>`;
};
const label = (number, text) => `<div class="world-label"><span>${escape(number)}</span><span>${number === 'END' ? '//' : '/'}</span><span>${escape(text)}</span></div>`;
const ghost = text => `<div class="world-ghost" aria-hidden="true">${escape(text)}</div>`;
const art = (item, className = 'world-art', priority = false) => item ? `<div class="${className}">${image(item, priority)}</div>` : '';

function renderHero(hero) {
  return `<section class="world world-access" id="hero" aria-labelledby="access-title">
    ${label('00', hero.label)}${ghost(hero.ghost)}${art(hero.image, 'access-art world-art', true)}
    <div class="access-copy world-copy"><h1 id="access-title" data-motion-title>${lines(hero.title)}${hero.emphasis ? `<br><span>${escape(hero.emphasis)}</span>` : ''}</h1><p>${lines(hero.description)}</p></div>
    <a class="world-next" href="${url(hero.next.href)}" aria-label="${escape(hero.nextLabel)}"><span>${escape(hero.next.label)}</span><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v17m-7-7 7 7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    <p class="access-signature">${escape(hero.signature)}</p></section>`;
}

function renderFeature(feature, index) {
  const key = id(feature.id);
  const disclosure = feature.disclosure;
  return `<section class="world world-${['systems', 'agents', 'plugins'][index]}" id="${key}" aria-labelledby="${key}-title">
    ${label(String(index + 1).padStart(2, '0'), feature.label)}${ghost(feature.ghost)}${art(feature.image)}
    <div class="world-copy"><h2 id="${key}-title" data-motion-title>${lines(feature.title)}</h2><p>${lines(feature.description)}</p>
      ${disclosure ? `<details class="world-disclosure"><summary>${escape(disclosure.title)} <span aria-hidden="true">+</span></summary><div class="disclosure-body"><p>${escape(disclosure.description)}</p>${link(disclosure.link)}</div></details>` : ''}
      ${link(feature.link, 'text-link')}
    </div></section>`;
}

function renderProduct(item) {
  const { mark } = item;
  if (!['text', 'echo', 'harvest', 'cognitive', 'skills'].includes(mark.style)) throw new Error(`Unknown product mark style: ${mark.style}`);
  const markImage = mark.image ? `<img src="${url(mark.image, 'asset')}" width="70" height="70" alt="">` : '';
  let wordmark = lines(mark.lines);
  if (mark.style === 'cognitive') wordmark = `${escape(mark.lines[0])}<span>${escape(mark.lines.slice(1).join(' '))}</span>`;
  if (mark.style === 'harvest') wordmark = `${escape(mark.lines[0])}<span class="harvest-lines" aria-hidden="true">▱</span><br>${escape(mark.lines.slice(1).join(' '))}`;
  return `<details class="product-object"><summary aria-label="${escape(item.name)} details"><span class="product-mark mark-${mark.style}">${markImage}${wordmark}${mark.accent ? `<span class="echo-point">${escape(mark.accent)}</span>` : ''}</span><span class="object-affordance" aria-hidden="true">+</span></summary>
    <div class="product-fold"><span class="micro">${escape(item.category)}</span><p>${escape(item.description)}</p>${link(item.link)}</div></details>`;
}

function renderProducts(products) {
  if (!products.items.length) throw new Error('Add at least one product; the gallery requires an item.');
  return `<section class="world world-products" id="products" aria-labelledby="products-title">
    ${label('04', products.label)}${ghost(products.ghost)}${art(products.image)}
    <div class="world-copy"><h2 id="products-title" data-motion-title>${lines(products.title)}</h2><p>${lines(products.description)}</p></div>
    <div class="product-gallery" aria-label="${escape(products.label)}"><div class="gallery-controls" hidden><span class="gallery-position" aria-live="polite">01 / ${String(products.items.length).padStart(2, '0')}</span><div><button type="button" data-gallery-prev aria-label="Previous product">←</button><button type="button" data-gallery-next aria-label="Next product">→</button></div></div>
    <div class="product-track" role="region" aria-roledescription="carousel" tabindex="0" aria-label="${escape(products.label)}; use arrow keys or swipe">${products.items.map(renderProduct).join('\n')}</div></div></section>`;
}

function renderContact(contact) {
  return `<section class="world world-contact" id="contact" aria-labelledby="contact-title">
    ${label('END', contact.label)}${art(contact.image, 'contact-arm')}
    <div class="world-copy"><p class="micro">${escape(contact.eyebrow)}</p><h2 id="contact-title" data-motion-title>${lines(contact.title)}</h2><p>${lines(contact.description)}</p>${link(contact.link, 'solid-link')}
    <div class="contact-routes" aria-label="Contact options">${contact.routes.map(item => link(item, '', false)).join('')}</div></div>
    <div class="contact-foot">${contact.columns.map(column => `<div><span class="micro">${escape(column.label)}</span>${column.links.map(item => link(item)).join('')}</div>`).join('')}</div></section>`;
}

function brandMark(brand, footer = false) {
  if (!brand.logo) return `<span class="template-wordmark">${escape(brand.name)}</span>`;
  const flat = `<img${footer ? ' class="ae-site-footer__flat"' : ''} src="${url(brand.logo, 'asset')}" width="400" height="400" alt=""${footer ? ' loading="lazy"' : ''}>`;
  const chrome = brand.dimensionalLogo ? `<img class="${footer ? 'ae-site-footer__chrome' : 'ae-mark-dimensional'}" src="${url(brand.dimensionalLogo, 'asset')}" width="1254" height="1254" alt=""${footer ? ' loading="lazy"' : ''}>` : '';
  return flat + chrome;
}

function renderMenu(config) {
  const { brand, navigation } = config;
  const panels = navigation.map(group => `<section class="ae-menu__panel" data-ae-panel="${id(group.key)}" aria-hidden="true" inert>
    <div class="ae-menu__panel-head"><div><span class="ae-menu__kicker">${escape(group.kicker)}</span><h2 class="ae-menu__title">${escape(group.title)}</h2></div><span class="ae-menu__count">${String(group.cards.length).padStart(2, '0')} selections</span></div>
    <div class="ae-menu__carousel" role="region" aria-roledescription="carousel" tabindex="0" aria-label="${escape(group.label)} selections">${group.cards.map(card => `<a class="ae-menu-card" href="${url(card.href)}"><span class="ae-menu-card__meta">${escape(card.category)}</span><span class="ae-menu-card__body"><h3>${escape(card.title)}</h3><p>${escape(card.description)}</p></span></a>`).join('')}</div><p class="ae-menu__hint">Swipe, scroll, or use the arrow keys</p></section>`).join('\n');
  return `<header class="ae-global-nav"><a class="ae-global-mark${brand.dimensionalLogo ? '' : ' template-flat-mark'}" href="${url(brand.home)}" aria-label="${escape(brand.name)} home">${brandMark(brand)}</a>
    <button class="ae-menu-trigger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="ae-command-menu" hidden><span class="ae-menu-trigger__label" aria-hidden="true"><span class="ae-menu-label">Menu</span><span class="ae-menu-close">Close</span></span><span class="ae-menu-trigger__disc" aria-hidden="true"></span></button></header>
    <nav class="ae-menu" id="ae-command-menu" aria-hidden="true" aria-label="Primary navigation" inert><div class="ae-menu__veil" data-ae-close></div><div class="ae-menu__shell"><div class="ae-menu__grid"><div class="ae-menu__index"><span class="ae-menu__eyebrow">${escape(brand.menuEyebrow)}</span><div class="ae-menu__list">${navigation.map(group => `<a class="ae-menu__link" href="${url(group.href)}" data-ae-menu-key="${id(group.key)}">/${escape(group.label)}</a>`).join('')}</div><div class="ae-menu__foot">${config.menuLinks.map(item => link(item, '', false)).join('')}</div></div><div class="ae-menu__stage" data-brand="${escape(brand.name)}">${panels}</div></div></div></nav>
    <nav class="template-fallback" aria-label="Page navigation">${navigation.map(group => link({ label: group.label, href: group.href }, '', false)).join('')}</nav>`;
}

function renderFooter(config) {
  const { brand, footer, navigation } = config;
  return `<footer class="ae-site-footer" aria-label="${escape(brand.name)} footer"><div class="ae-site-footer__signature">
    <a class="ae-site-footer__mark${brand.dimensionalLogo ? '' : ' template-flat-mark'}" href="${url(brand.home)}" aria-label="${escape(brand.name)} home">${brandMark(brand, true)}</a>
    <div class="ae-site-footer__voice"><p>${lines(footer.title)}</p>${link(footer.link)}</div></div>
    <div class="ae-footer-navigation"><nav class="ae-site-footer__links" aria-label="Footer navigation">${navigation.map(group => `<div class="ae-footer-item"><a class="ae-menu__link" data-footer-key="${id(group.key)}" aria-describedby="ae-footer-description-${id(group.key)}" href="${url(group.href)}">/${escape(group.label)}</a><span id="ae-footer-description-${id(group.key)}" class="ae-footer-description-accessible">${escape(group.footerDescription)}</span><span class="ae-footer-description" aria-hidden="true"></span></div>`).join('')}</nav></div>
    <nav class="ae-site-footer__secondary" aria-label="More from ${escape(brand.name)}">${footer.secondary.map(item => link(item, '', false)).join('')}</nav>
    <div class="ae-site-footer__colophon"><span>${escape(brand.label)}</span><span>${escape(footer.copyright)}</span>${link(footer.finalLink)}</div></footer>`;
}

export function renderSite(config) {
  if (config.features.length !== 3) throw new Error('This composition uses exactly three feature sections.');
  if (!config.navigation.length) throw new Error('Add at least one navigation group.');
  const ids = ['hero', 'products', 'contact', ...config.features.map(feature => id(feature.id))];
  if (new Set(ids).size !== ids.length) throw new Error('Section IDs must be unique, including hero, products and contact.');
  const keys = config.navigation.map(group => id(group.key));
  if (new Set(keys).size !== keys.length) throw new Error('Navigation keys must be unique.');
  const { seo } = config;
  const canonical = seo.canonical ? safeURL(seo.canonical, 'canonical') : '';
  if (canonical && !canonical.startsWith('https://')) throw new Error('The canonical URL must use https://.');
  const html = `<!doctype html>
<html lang="${escape(seo.language)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(seo.title)}</title><meta name="description" content="${escape(seo.description)}"><meta name="theme-color" content="${escape(config.theme.paper)}">
${canonical ? `<link rel="canonical" href="${escape(canonical)}"><meta property="og:url" content="${escape(canonical)}">` : ''}
<meta property="og:type" content="website"><meta property="og:title" content="${escape(seo.title)}"><meta property="og:description" content="${escape(seo.description)}">
${seo.image ? `<meta property="og:image" content="${url(canonical ? new URL(safeURL(seo.image, 'asset'), canonical).href : seo.image, 'asset')}">` : ''}
${config.brand.favicon ? `<link rel="icon" href="${url(config.brand.favicon, 'asset')}">` : ''}
<link rel="preload" href="${url(config.theme.displayFont.src, 'asset')}" as="font" type="font/woff2" crossorigin>
${['design-system.css', 'premium-nav.css', 'journey.css', 'shared-footer.css', 'theme.css', 'template-overrides.css'].map(file => `<link rel="stylesheet" href="./${file}">`).join('\n')}
<script src="./template-menu.js" defer></script><script src="./journey.js" defer></script>
</head><body class="journey-page" data-motion="${config.motion === true}"><a class="skip-link" href="#main">Skip to content</a>
${renderMenu(config)}<div class="journey-progress" aria-hidden="true"></div><main id="main" tabindex="-1">
${renderHero(config.hero)}${config.features.map(renderFeature).join('\n')}${renderProducts(config.products)}${renderContact(config.contact)}
</main>${renderFooter(config)}</body></html>\n`;
  const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const renderedIds = new Set(allIds);
  if (renderedIds.size !== allIds.length) throw new Error('The generated page has duplicate IDs. Choose different section or navigation keys.');
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) if (!renderedIds.has(target)) throw new Error(`Link points to a missing section: #${target}`);
  return html;
}

export function renderTheme(theme) {
  const colorNames = ['paper', 'ink', 'muted', 'line', 'ghost', 'accent', 'accentBright', 'focus', 'surface'];
  const declarations = colorNames.map(name => {
    if (!/^#[0-9a-f]{6}$/i.test(theme[name])) throw new Error(`Theme ${name} needs a six-digit hex colour.`);
    return `--template-${name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}:${theme[name]}`;
  });
  declarations.push('--ae-line:var(--template-line)', '--world-hover:var(--template-surface)');
  const fonts = ['body', 'display'].map(role => {
    const font = theme[`${role}Font`];
    if (!/^[a-z0-9 -]+$/i.test(font.family)) throw new Error('Use letters, numbers, spaces and hyphens in font family names.');
    declarations.push(`--ae-font-${role}:'${font.family}',sans-serif`);
    return `@font-face{font-family:'${font.family}';src:url('${safeURL(font.src, 'asset')}') format('woff2');font-style:normal;font-weight:400 700;font-display:swap}`;
  });
  return `${fonts.join('\n')}\n:root{${declarations.join(';')}}\n`;
}
