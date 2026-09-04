(() => {
  const groups = {
    home: {
      href: '/', kicker: 'The shortest route in', title: 'Start with the work.',
      cards: [
        ['Position', 'Home', 'What aegntic builds, how it works, and the cleanest way to begin.', '/'],
        ['Proof', 'Selected systems', 'Production work you can open, inspect, and judge for yourself.', '/#work'],
        ['Thinking', 'Research', 'Notes on agents, architecture, privacy, and production reality.', '/research/']
      ]
    },
    systems: {
      href: '/systems/', kicker: 'Infrastructure that remembers', title: 'Systems for durable work.',
      cards: [
        ['Operating system', 'Cognitive OS', 'A multi-harness execution stack with memory, verification, and safety gates.', '/cognitive-os/'],
        ['Coordination', 'clawREFORM', 'A self-evolving agent operating system for coordinated work.', 'https://clawreform.com'],
        ['Memory', 'Prologue', 'Discovery and memory infrastructure that cuts repeat setup from the stack.', 'https://logue.pro']
      ]
    },
    agents: {
      href: '/agents/', kicker: 'Purpose-built operators', title: 'Agents with a real job.',
      cards: [
        ['Project updates', 'Echo', 'Keeps project evidence separate and prepares updates for your approval.', 'https://echo.aegntic.ai/'],
        ['Evidence', 'veritas-operator', 'Coordinates retrieval, synthesis, and verification as one research pipeline.', '/projects/veritas-operator/'],
        ['Sovereign memory', 'obsidian-indexer', 'Turns local vaults into agent-readable, locally controlled memory.', '/projects/obsidian-indexer/']
      ]
    },
    plugins: {
      href: '/plugins/', kicker: 'Capability, packaged', title: 'Install better judgment.',
      cards: [
        ['Workflows', 'aegntic Skills', 'Production playbooks for deciding, building, checking, and shipping.', '/skills/'],
        ['Research', 'Tab Harvest', 'Turns open browser work into structured intelligence and a knowledge graph.', 'https://github.com/aegntic/tab-harvest'],
        ['Visual tooling', 'mcp.graphics', 'A graphics-focused MCP surface for agent-driven visual production.', '/projects/mcp-graphics/']
      ]
    },
    products: {
      href: '/products/', kicker: 'Clear things you can use', title: 'Products with an outcome.',
      cards: [
        ['Browser research', 'Tab Harvest', 'Open tabs and transcripts, connected into a knowledge graph.', 'https://github.com/aegntic/tab-harvest'],
        ['Developer ecosystem', 'CLDCDE', 'Tools, patterns, and infrastructure for agentic development.', 'https://cldcde.cc'],
        ['Failure intelligence', 'prompt.fail', 'A public surface for prompt failures and agent edge cases.', 'https://prompt.fail']
      ]
    },
    contact: {
      href: '/#contact', kicker: 'One accountable builder', title: 'Bring the bottleneck.',
      cards: [
        ['Build', 'Agent build', 'A purpose-built agent for a defined task.', '/#contact', 'Agent build'],
        ['Connect', 'Workflow automation', 'Connect repeated steps and fragile hand-offs.', '/#contact', 'Workflow automation'],
        ['Own', 'Internal tool', 'A focused tool shaped around your team.', '/#contact', 'Internal tool']
      ]
    }
  };

  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const cardMarkup = card => `<a class="ae-menu-card" href="${esc(card[3])}"${card[4] ? ` data-enquiry="${esc(card[4])}"` : ''}><span class="ae-menu-card__meta">${esc(card[0])}</span><span class="ae-menu-card__body"><h3>${esc(card[1])}</h3><p>${esc(card[2])}</p></span></a>`;
  const panelMarkup = ([key, group]) => `<section class="ae-menu__panel" data-ae-panel="${key}" aria-hidden="true"><div class="ae-menu__panel-head"><div><span class="ae-menu__kicker">${esc(group.kicker)}</span><h2 class="ae-menu__title">${esc(group.title)}</h2></div><span class="ae-menu__count">${String(group.cards.length).padStart(2,'0')} selections</span></div><div class="ae-menu__carousel" role="region" aria-roledescription="carousel" tabindex="0" aria-label="${esc(key)} selections">${group.cards.map(cardMarkup).join('')}</div><p class="ae-menu__hint">Swipe, scroll, or use the arrow keys</p></section>`;

  function mount() {
    if (document.querySelector('.ae-global-nav')) return;
    const shell = document.createElement('div');
    shell.innerHTML = `<header class="ae-global-nav"><a class="ae-global-mark" href="/" aria-label="aegntic home"><img src="/ae-logo.webp" alt="aegntic"></a><button class="ae-menu-trigger" type="button" aria-expanded="false" aria-controls="ae-command-menu" data-magnetic><span class="ae-menu-trigger__label">Menu</span><span class="ae-menu-trigger__disc" aria-hidden="true"></span></button></header><nav class="ae-menu" id="ae-command-menu" aria-hidden="true" aria-label="Primary navigation"><div class="ae-menu__veil" data-ae-close></div><div class="ae-menu__shell"><div class="ae-menu__grid"><div class="ae-menu__index"><span class="ae-menu__eyebrow">aegntic / operating surface</span><div class="ae-menu__list">${Object.entries(groups).map(([key,group]) => `<a class="ae-menu__link" href="${group.href}" data-ae-menu-key="${key}">/${key}</a>`).join('')}</div><div class="ae-menu__foot"><a href="/research/">Research</a><a href="/blog/">Writing</a><a href="https://github.com/aegntic">GitHub</a></div></div><div class="ae-menu__stage">${Object.entries(groups).map(panelMarkup).join('')}</div></div></div></nav>`;
    document.body.prepend(...shell.childNodes);
    document.body.classList.add('ae-nav-mounted');
    document.querySelectorAll('body > .nav, body > #site-menu').forEach(el => el.setAttribute('aria-hidden','true'));

    const trigger = document.querySelector('.ae-menu-trigger');
    const label = trigger.querySelector('.ae-menu-trigger__label');
    const menu = document.getElementById('ae-command-menu');
    const links = [...menu.querySelectorAll('[data-ae-menu-key]')];
    const panels = [...menu.querySelectorAll('[data-ae-panel]')];
    const mark = document.querySelector('.ae-global-mark');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const inertBefore = new Map();
    menu.inert = true;
    mark.insertAdjacentHTML('beforeend', '<img class="ae-mark-dimensional" src="/assets/ae-logo-FINAL-nb.png" alt="" aria-hidden="true">');
    const motionButton = document.createElement('button');
    motionButton.type = 'button';
    motionButton.className = 'ae-motion-toggle';
    motionButton.textContent = 'Pause logo loop';
    motionButton.setAttribute('aria-pressed','false');
    menu.querySelector('.ae-menu__foot').append(motionButton);
    motionButton.addEventListener('click', () => {
      const paused = document.body.classList.toggle('ae-logo-paused');
      motionButton.setAttribute('aria-pressed',String(paused));
      motionButton.textContent = paused ? 'Resume logo loop' : 'Pause logo loop';
    });
    document.addEventListener('keydown', event => {if (event.key === 'Tab') document.body.classList.add('ae-keyboard');});
    document.addEventListener('pointerdown', () => document.body.classList.remove('ae-keyboard'));
    const enquiryScript = document.createElement('script');
    enquiryScript.src = '/enquiry.js';
    document.head.append(enquiryScript);
    const enquiryStyle = document.createElement('link');
    enquiryStyle.rel = 'stylesheet';
    enquiryStyle.href = '/enquiry.css';
    document.head.append(enquiryStyle);
    let active = 'home';
    let touchPreview = 'home';
    const path = location.pathname;
    const routeKey = /^\/(systems|cognitive-os)/.test(path)?'systems':path.startsWith('/agents')?'agents':/^\/(plugins|skills)/.test(path)?'plugins':/^\/(products|audits)/.test(path)?'products':path==='/'&&location.hash==='#contact'?'contact':'home';
    links.forEach(link => {if (link.dataset.aeMenuKey === routeKey) link.setAttribute('aria-current','page');});

    function activate(key) {
      if (!groups[key]) return;
      active = key;
      links.forEach(link => {
        const selected = link.dataset.aeMenuKey === key;
        link.classList.toggle('is-active', selected);
      });
      panels.forEach(panel => {
        const selected = panel.dataset.aePanel === key;
        panel.classList.toggle('is-active', selected);
        panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
        panel.inert = !selected;
        if (selected) panel.querySelector('.ae-menu__carousel').scrollLeft = 0;
      });
    }

    function setOpen(open) {
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('ae-menu-open', open);
      label.textContent = open ? 'Close' : 'Menu';
      menu.inert = !open;
      if (open) {
        [...document.body.children].filter(element => element !== menu && !element.classList.contains('ae-global-nav') && element.tagName !== 'SCRIPT' && element.tagName !== 'DIALOG').forEach(element => {
          inertBefore.set(element, element.inert);
          element.inert = true;
        });
        mark.classList.remove('is-retreated');
      } else {
        inertBefore.forEach((value, element) => { element.inert = value; });
        inertBefore.clear();
      }
      if (open) activate(active);
      if (open) touchPreview = active;
      if (open) links.find(link => link.dataset.aeMenuKey === active)?.focus({preventScroll:true});
    }

    document.addEventListener('ae:close-menu', () => setOpen(false));
    menu.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (link && !event.defaultPrevented) {setOpen(false);trigger.focus({preventScroll:true});}
    });

    trigger.addEventListener('click', () => setOpen(trigger.getAttribute('aria-expanded') !== 'true'));
    menu.querySelector('[data-ae-close]').addEventListener('click', () => {
      setOpen(false);
      trigger.focus({preventScroll:true});
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Tab' && trigger.getAttribute('aria-expanded') === 'true') {
        const focusable = [mark, trigger, ...menu.querySelectorAll('a,button,[tabindex="0"]')].filter(element => !element.closest('[inert]') && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
        const index = focusable.indexOf(document.activeElement);
        if (event.shiftKey && index <= 0) {event.preventDefault();focusable.at(-1).focus();}
        else if (!event.shiftKey && (index === focusable.length - 1 || index < 0)) {event.preventDefault();focusable[0].focus();}
      }
      if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        trigger.focus({preventScroll:true});
      }
    });
    links.forEach(link => {
      const key = link.dataset.aeMenuKey;
      link.addEventListener('mouseenter', () => activate(key));
      link.addEventListener('focus', () => activate(key));
      link.addEventListener('click', event => {
        if (!matchMedia('(hover:none), (pointer:coarse)').matches || touchPreview === key) return;
        event.preventDefault();
        touchPreview = key;
        activate(key);
      });
    });
    panels.forEach(panel => {
      const carousel = panel.querySelector('.ae-menu__carousel');
      carousel.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        carousel.scrollBy({left:(event.key === 'ArrowRight' ? 1 : -1) * carousel.clientWidth * .72,behavior:reduced.matches?'instant':'smooth'});
      });
    });

    const canMagnet = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches;
    if (canMagnet) {
      document.querySelectorAll('[data-magnetic]').forEach(element => {
        let tx=0,ty=0,x=0,y=0,raf=0;
        const tick=()=>{x+=(tx-x)*.13;y+=(ty-y)*.13;element.style.transform=`translate3d(${x}px,${y}px,0)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.08)raf=requestAnimationFrame(tick);else raf=0};
        element.addEventListener('pointermove', event => {const rect=element.getBoundingClientRect();tx=(event.clientX-rect.left-rect.width/2)*.18;ty=(event.clientY-rect.top-rect.height/2)*.22;if(!raf)raf=requestAnimationFrame(tick)});
        element.addEventListener('pointerleave',()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(tick)});
      });
    }

    activate(routeKey);
    label.textContent = 'Menu';

    // Measure against the fixed, untransformed logo footprint to prevent oscillation.
    let collisionFrame = 0;
    function avoidCopy() {
      collisionFrame = 0;
      if (mark.matches(':focus-within') || trigger.getAttribute('aria-expanded') === 'true') {mark.classList.remove('is-retreated');return;}
      const nav = document.querySelector('.ae-global-nav');
      const style = getComputedStyle(nav);
      const left = parseFloat(style.paddingLeft);
      const top = parseFloat(style.paddingTop);
      const bottom = top + mark.offsetHeight + 22;
      const right = left + mark.offsetWidth + 20;
      const collision = [...document.querySelectorAll('main h1,main h2,.world-ghost,.world-label')].some(element => {
        const rect = element.getBoundingClientRect();
        return rect.bottom > top - 15 && rect.top < bottom && rect.left < right && rect.right > left;
      });
      mark.classList.toggle('is-retreated', collision && scrollY > 40);
    }
    window.addEventListener('scroll', () => {if (!collisionFrame) collisionFrame = requestAnimationFrame(avoidCopy);}, {passive:true});
    window.addEventListener('resize', avoidCopy, {passive:true});
    mark.addEventListener('focus', () => mark.classList.remove('is-retreated'));
    avoidCopy();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true}); else mount();
})();
