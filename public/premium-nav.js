(() => {
  const groups = {
    home: {
      href: '/', kicker: 'The shortest route in', title: 'Start with the work.',
      cards: [
        ['Position', 'Home', 'What Aegntic builds, how it works, and the cleanest way to begin.', '/'],
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
        ['File intelligence', 'Echo', 'Classifies and routes artifacts inside large agent workflows.', '/agents/#echo'],
        ['Evidence', 'veritas-operator', 'Coordinates retrieval, synthesis, and verification as one research pipeline.', '/projects/veritas-operator/'],
        ['Sovereign memory', 'obsidian-indexer', 'Turns local vaults into agent-readable, locally controlled memory.', '/projects/obsidian-indexer/']
      ]
    },
    plugins: {
      href: '/plugins/', kicker: 'Capability, packaged', title: 'Install better judgment.',
      cards: [
        ['96 systems', 'Aegntic Skills', 'Production playbooks for deciding, building, checking, and shipping.', '/skills/'],
        ['Research', 'Tab Harvest', 'Turns open browser work into structured intelligence and a knowledge graph.', 'https://github.com/aegntic/tab-harvest'],
        ['Visual tooling', 'mcp.graphics', 'A graphics-focused MCP surface for agent-driven visual production.', '/projects/mcp-graphics/']
      ]
    },
    products: {
      href: '/products/', kicker: 'Clear things you can use', title: 'Products with an outcome.',
      cards: [
        ['Decision product', 'AE Audits', 'Fifteen adversarial lenses before an expensive decision becomes a mistake.', '/audits/'],
        ['Developer ecosystem', 'CLDCDE', 'Tools, patterns, and infrastructure for agentic development.', 'https://cldcde.cc'],
        ['Failure intelligence', 'prompt.fail', 'A public surface for prompt failures and agent edge cases.', 'https://prompt.fail']
      ]
    },
    contact: {
      href: '/#contact', kicker: 'One accountable builder', title: 'Bring the bottleneck.',
      cards: [
        ['Build', 'Agent build', 'A purpose-built agent deployed inside a real workflow and handed over.', '/#services'],
        ['Connect', 'Workflow automation', 'A dependable process that removes repeat steps and fragile hand-offs.', '/#services'],
        ['Own', 'Internal tool', 'A focused operational product shaped around your team—and owned by you.', '/#contact']
      ]
    }
  };

  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const cardMarkup = card => `<a class="ae-menu-card" href="${esc(card[3])}"><span class="ae-menu-card__meta">${esc(card[0])}</span><span class="ae-menu-card__body"><h3>${esc(card[1])}</h3><p>${esc(card[2])}</p></span></a>`;
  const panelMarkup = ([key, group]) => `<section class="ae-menu__panel" data-ae-panel="${key}" aria-hidden="true"><div class="ae-menu__panel-head"><div><span class="ae-menu__kicker">${esc(group.kicker)}</span><h2 class="ae-menu__title">${esc(group.title)}</h2></div><span class="ae-menu__count">${String(group.cards.length).padStart(2,'0')} selections</span></div><div class="ae-menu__carousel" tabindex="0" aria-label="${esc(key)} selections">${group.cards.map(cardMarkup).join('')}</div><p class="ae-menu__hint">Drag, swipe, or use the arrow keys</p></section>`;

  function mount() {
    if (document.querySelector('.ae-global-nav')) return;
    const shell = document.createElement('div');
    shell.innerHTML = `<header class="ae-global-nav"><a class="ae-global-mark" href="/" aria-label="Aegntic home"><img src="/ae-logo.webp" alt="aegntic"></a><button class="ae-menu-trigger" type="button" aria-expanded="false" aria-controls="ae-command-menu" data-magnetic><span class="ae-menu-trigger__label">Explore</span><span class="ae-menu-trigger__disc" aria-hidden="true"></span></button></header><nav class="ae-menu" id="ae-command-menu" aria-hidden="true" aria-label="Primary navigation"><div class="ae-menu__veil" data-ae-close></div><div class="ae-menu__shell"><div class="ae-menu__grid"><div class="ae-menu__index"><span class="ae-menu__eyebrow">Aegntic / operating surface</span><div class="ae-menu__list">${Object.entries(groups).map(([key,group]) => `<a class="ae-menu__link" href="${group.href}" data-ae-menu-key="${key}">/${key}</a>`).join('')}</div><div class="ae-menu__foot"><a href="/research/">Research</a><a href="/blog/">Writing</a><a href="https://github.com/aegntic">GitHub</a></div></div><div class="ae-menu__stage">${Object.entries(groups).map(panelMarkup).join('')}</div></div></div></nav>`;
    document.body.prepend(...shell.childNodes);
    document.body.classList.add('ae-nav-mounted');
    document.querySelectorAll('body > .nav, body > #site-menu').forEach(el => el.setAttribute('aria-hidden','true'));

    const trigger = document.querySelector('.ae-menu-trigger');
    const label = trigger.querySelector('.ae-menu-trigger__label');
    const menu = document.getElementById('ae-command-menu');
    const links = [...menu.querySelectorAll('[data-ae-menu-key]')];
    const panels = [...menu.querySelectorAll('[data-ae-panel]')];
    let active = 'home';
    let touchPreview = 'home';

    function activate(key) {
      if (!groups[key]) return;
      active = key;
      links.forEach(link => {
        const selected = link.dataset.aeMenuKey === key;
        link.classList.toggle('is-active', selected);
        if (selected) link.setAttribute('aria-current','true'); else link.removeAttribute('aria-current');
      });
      panels.forEach(panel => {
        const selected = panel.dataset.aePanel === key;
        panel.classList.toggle('is-active', selected);
        panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
        if (selected) panel.querySelector('.ae-menu__carousel').scrollLeft = 0;
      });
    }

    function setOpen(open) {
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('ae-menu-open', open);
      label.textContent = open ? 'Close' : 'Explore';
      if (open) activate(active);
      if (open) touchPreview = active;
    }

    trigger.addEventListener('click', () => setOpen(trigger.getAttribute('aria-expanded') !== 'true'));
    menu.querySelector('[data-ae-close]').addEventListener('click', () => {
      setOpen(false);
      trigger.focus({preventScroll:true});
    });
    document.addEventListener('keydown', event => {
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
        carousel.scrollBy({left:(event.key === 'ArrowRight' ? 1 : -1) * carousel.clientWidth * .72,behavior:'smooth'});
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

    activate(location.pathname.startsWith('/systems')?'systems':location.pathname.startsWith('/agents')?'agents':location.pathname.startsWith('/plugins')?'plugins':location.pathname.startsWith('/products')?'products':'home');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true}); else mount();
})();
