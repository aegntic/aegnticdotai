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
    const step = () => cards[0].getBoundingClientRect().width;
    const move = direction => track.scrollBy({left: direction * step(), behavior: reduced.matches ? 'instant' : 'smooth'});
    const update = () => {
      const current = Math.min(cards.length - 1, Math.round(track.scrollLeft / step()));
      position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      previous.disabled = track.scrollLeft < 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
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
  ['(max-width:600px)', '(min-width:601px)'].forEach(viewport => motion.add(`${viewport} and (prefers-reduced-motion: no-preference)`, () => {
    const mobile = matchMedia('(max-width:600px)').matches;
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
