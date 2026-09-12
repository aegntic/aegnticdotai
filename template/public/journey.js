(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const invitation = document.querySelector('.world-next');
  if (invitation && 'IntersectionObserver' in window) {
    let visible = false;
    const updatePulse = () => invitation.classList.toggle('is-visible', visible && !document.hidden);
    new IntersectionObserver(([entry]) => {visible = entry.isIntersecting;updatePulse();}).observe(invitation);
    document.addEventListener('visibilitychange', updatePulse);
  }
  const track = document.querySelector('.product-track');
  if (track) {
    const cards = [...track.querySelectorAll('.product-object')];
    const previous = document.querySelector('[data-gallery-prev]');
    const next = document.querySelector('[data-gallery-next]');
    const position = document.querySelector('.gallery-position');
    const step = () => cards[0]?.getBoundingClientRect().width || track.clientWidth;
    const move = (direction, keyboard = false) => track.scrollBy({left: direction * step(), behavior: keyboard || reduced.matches ? 'instant' : 'smooth'});
    const update = () => {
      const bounds = track.getBoundingClientRect();
      const visible = cards.flatMap((card, index) => {
        const rect = card.getBoundingClientRect();
        const overlap = Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left);
        return overlap >= rect.width * .5 ? [index + 1] : [];
      });
      const first = String(visible[0] || 1).padStart(2, '0');
      const last = String(visible.at(-1) || 1).padStart(2, '0');
      const label = `${first === last ? first : `${first}–${last}`} / ${String(cards.length).padStart(2, '0')}`;
      if (position.textContent !== label) position.textContent = label;
      previous.disabled = track.scrollLeft < 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    previous.addEventListener('click', event => move(-1, event.detail === 0));
    next.addEventListener('click', event => move(1, event.detail === 0));
    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') {
        track.scrollTo({left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'instant'});
      } else move(event.key === 'ArrowRight' ? 1 : -1, true);
    });
    track.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update, {passive: true});
    cards.forEach(card => card.addEventListener('toggle', () => {
      if (card.open) cards.filter(other => other !== card).forEach(other => { other.open = false; });
    }));
    update();
  }
  // Readable without GSAP; transforms never gate essential content.
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const motion = gsap.matchMedia();
  // Rebuild on rotation/breakpoint changes as well as motion-preference changes.
  ['(max-width:600px)', '(min-width:601px) and (max-width:820px) and (orientation:portrait)', '(min-width:601px) and (orientation:landscape)', '(min-width:821px) and (orientation:portrait)'].forEach(viewport => motion.add(`${viewport} and (prefers-reduced-motion: no-preference)`, () => {
    const mobile = matchMedia('(max-width:600px), (max-width:820px) and (orientation:portrait)').matches;
    if (document.querySelector('.journey-progress')) gsap.to('.journey-progress', {scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:true}});
    document.querySelectorAll('.world').forEach((world, index) => {
      const art = world.querySelector('.world-art, .contact-arm');
      const ghost = world.querySelector('.world-ghost');
      const heading = world.querySelector('[data-motion-title]');
      if (art) gsap.fromTo(art,{y:mobile ? 15 : 55},{y:mobile ? -15 : -65,ease:'none',scrollTrigger:{trigger:world,start:'top bottom',end:'bottom top',scrub:.75}});
      if (ghost) gsap.fromTo(ghost,{x:index % 2 ? -25 : 25},{x:index % 2 ? 25 : -25,ease:'none',scrollTrigger:{trigger:world,start:'top bottom',end:'bottom top',scrub:1}});
      if (heading) gsap.fromTo(heading,{y:mobile ? 12 : 28},{y:0,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 95%',end:'top 55%',scrub:.5}});
    });
  }));
})();
