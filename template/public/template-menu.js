(() => {
  const menu = document.querySelector('.ae-menu');
  const trigger = document.querySelector('.ae-menu-trigger');
  const mark = document.querySelector('.ae-global-mark');
  const links = [...menu.querySelectorAll('[data-ae-menu-key]')];
  const panels = [...menu.querySelectorAll('[data-ae-panel]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const inertBefore = new Map();
  let active = links[0].dataset.aeMenuKey;
  let returnFocus = trigger;
  let isOpen = false;
  document.body.classList.add('ae-nav-mounted', 'ae-enhanced');
  trigger.hidden = false;
  document.querySelector('.gallery-controls').hidden = false;

  function activate(key) {
    active = key;
    links.forEach(link => link.classList.toggle('is-active', link.dataset.aeMenuKey === key));
    panels.forEach(panel => {
      const selected = panel.dataset.aePanel === key;
      panel.classList.toggle('is-active', selected);
      panel.setAttribute('aria-hidden', String(!selected));
      panel.inert = !selected;
    });
  }

  function setOpen(open, restoreFocus = true) {
    if (isOpen === open) return;
    isOpen = open;
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    document.body.classList.toggle('ae-menu-open', open);
    if (open) {
      returnFocus = document.activeElement;
      [...document.body.children].filter(element => element !== menu && !element.classList.contains('ae-global-nav') && element.tagName !== 'SCRIPT').forEach(element => {
        inertBefore.set(element, element.inert);
        element.inert = true;
      });
      mark.classList.remove('is-retreated');
      activate(active);
      links.find(link => link.dataset.aeMenuKey === active).focus({ preventScroll: true });
    } else {
      inertBefore.forEach((value, element) => { element.inert = value; });
      inertBefore.clear();
      if (restoreFocus) (returnFocus?.isConnected ? returnFocus : trigger).focus({ preventScroll: true });
    }
  }

  function trapFocus(event) {
    if (!isOpen || event.key !== 'Tab') return;
    const focusable = [mark, trigger, ...menu.querySelectorAll('a,button,[tabindex="0"]')]
      .filter(element => !element.closest('[inert]') && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) { event.preventDefault(); focusable.at(-1).focus(); }
    else if (!event.shiftKey && (index === focusable.length - 1 || index < 0)) { event.preventDefault(); focusable[0].focus(); }
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Tab') document.body.classList.add('ae-keyboard');
    if (event.key === 'Escape') setOpen(false);
    trapFocus(event);
  });
  document.addEventListener('pointerdown', () => document.body.classList.remove('ae-keyboard'));
  trigger.addEventListener('click', () => setOpen(!isOpen));
  menu.querySelector('[data-ae-close]').addEventListener('click', () => setOpen(false));
  links.forEach(link => {
    link.addEventListener('mouseenter', () => activate(link.dataset.aeMenuKey));
    link.addEventListener('focus', () => activate(link.dataset.aeMenuKey));
  });
  // Every anchor follows its destination on the first tap. Local links also transfer keyboard focus.
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = anchor.getAttribute('href');
    if (isOpen) setOpen(false);
    if (!href?.startsWith('#')) return;
    const destination = document.getElementById(href.slice(1));
    if (!destination) return;
    destination.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => destination.focus({ preventScroll: true }));
  });
  panels.forEach(panel => panel.querySelector('.ae-menu__carousel').addEventListener('keydown', event => {
    if (event.target !== event.currentTarget) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const carousel = event.currentTarget;
    if (event.key === 'Home' || event.key === 'End') carousel.scrollTo({ left: event.key === 'Home' ? 0 : carousel.scrollWidth, behavior: 'instant' });
    else carousel.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * carousel.clientWidth * .72, behavior: 'instant' });
  }));
  activate(active);

  const footerLinks = [...document.querySelectorAll('[data-footer-key]')];
  const footer = document.querySelector('.ae-footer-navigation');
  let currentFooter = footerLinks[0];
  function highlightFooter(selected) {
    footerLinks.forEach(link => {
      const selectedLink = selected === link;
      link.classList.toggle('is-active', selectedLink);
      link.parentElement.querySelector('.ae-footer-description').textContent = selectedLink
        ? document.getElementById(link.getAttribute('aria-describedby')).textContent : '';
    });
  }
  function updateCurrent() {
    const hash = location.hash || '#hero';
    const current = links.find(link => link.getAttribute('href') === hash);
    links.forEach(link => { if (link === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    footerLinks.forEach(link => { if (link.getAttribute('href') === hash) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    currentFooter = footerLinks.find(link => link.getAttribute('href') === hash) || footerLinks[0];
    if (current) activate(current.dataset.aeMenuKey);
    highlightFooter(currentFooter);
  }
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => highlightFooter(link));
    link.addEventListener('focus', () => highlightFooter(link));
  });
  footer.addEventListener('mouseleave', () => highlightFooter(footerLinks.find(link => link === document.activeElement) || currentFooter));
  footer.addEventListener('focusout', event => { if (!footer.contains(event.relatedTarget)) highlightFooter(currentFooter); });
  window.addEventListener('hashchange', updateCurrent);
  updateCurrent();

  // Lightweight native parallax. Content is already visible; there is no animation library or CDN.
  const worlds = [...document.querySelectorAll('.world')].map((element, index) => ({ element, index, art: element.querySelector('.world-art, .contact-arm'), ghost: element.querySelector('.world-ghost') }));
  const progress = document.querySelector('.journey-progress');
  let frame = 0;
  function paint() {
    frame = 0;
    const enabled = document.body.dataset.motion === 'true' && !reduced.matches;
    const mobile = matchMedia('(max-width:600px), (max-width:820px) and (orientation:portrait)').matches;
    worlds.forEach(world => {
      const bounds = world.element.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
      if (world.art) world.art.style.transform = enabled ? `translateY(${(mobile ? 15 : 55) - ratio * (mobile ? 30 : 120)}px)` : '';
      if (world.ghost) world.ghost.style.transform = enabled ? `translateX(${(world.index % 2 ? -1 : 1) * (25 - ratio * 50)}px)` : '';
    });
    progress.style.transform = enabled ? `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})` : '';
    const navStyle = getComputedStyle(document.querySelector('.ae-global-nav'));
    const left = parseFloat(navStyle.paddingLeft);
    const top = parseFloat(navStyle.paddingTop);
    const collision = [...document.querySelectorAll('main h1,main h2,.world-ghost,.world-label')].some(element => {
      const box = element.getBoundingClientRect();
      return box.bottom > top - 15 && box.top < top + mark.offsetHeight + 22 && box.left < left + mark.offsetWidth + 20 && box.right > left;
    });
    mark.classList.toggle('is-retreated', collision && scrollY > 40 && !isOpen && !mark.matches(':focus-within'));
  }
  const schedule = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  mark.addEventListener('focus', () => mark.classList.remove('is-retreated'));
  schedule();
})();
