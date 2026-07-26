#!/usr/bin/env python3
"""Apply delight micro-interactions to aegntic.ai"""
from pathlib import Path
import re

# ============================================================
# 1. SITE.CSS - Add refined micro-interactions & easing
# ============================================================
css = Path('public/site.css').read_text()

# Update :root with refined easing tokens
css = css.replace(
    ':root{\n  --bg:#f0f6f8;\n  --bg-inset:#e7eef0;\n  --text:#11181c;\n  --text-dark:#0c1016;\n  --text-muted:#8b9296;\n  --accent:#00b39f;\n  --accent-electric:#1fb6ff;\n  --surface:#ffffff;\n  --surface-1:#0c1016;\n  --surface-2:#23272d;\n  --rule:rgba(17,24,28,0.08);\n  --rule-strong:rgba(17,24,28,0.12);\n  --shadow:0 18px 50px -24px rgba(12,16,22,0.28);\n  --radius-card:1.25rem;\n  --radius-pill:999px;\n  --ease:cubic-bezier(.22,.68,0,1);\n  --nav-h:4.5rem;\n  --page-pad:clamp(1.25rem,4vw,3.5rem);\n  --content:75rem; /* ~1200px */\n}',
    ':root{\n  --bg:#f0f6f8;\n  --bg-inset:#e7eef0;\n  --text:#11181c;\n  --text-dark:#0c1016;\n  --text-muted:#8b9296;\n  --accent:#00b39f;\n  --accent-electric:#1fb6ff;\n  --surface:#ffffff;\n  --surface-1:#0c1016;\n  --surface-2:#23272d;\n  --rule:rgba(17,24,28,0.08);\n  --rule-strong:rgba(17,24,28,0.12);\n  --shadow:0 18px 50px -24px rgba(12,16,22,0.28);\n  --radius-card:1.25rem;\n  --radius-pill:999px;\n  --ease:cubic-bezier(.22,.68,0,1);\n  --ease-spring:cubic-bezier(.22,.68,0,1);\n  --ease-overshoot:cubic-bezier(.22,.68,0,1.2);\n  --ease-strong:cubic-bezier(.22,.68,0,1.5);\n  --ease-gentle:cubic-bezier(.25,.46,.45,.94);\n  --ease-snap:cubic-bezier(.34,1.56,.64,1);\n  --nav-h:4.5rem;\n  --page-pad:clamp(1.25rem,4vw,3.5rem);\n  --content:75rem;\n}\n\n@media (prefers-reduced-motion: reduce){\n  :root{--ease-spring:ease;--ease-overshoot:ease;--ease-strong:ease;--ease-gentle:ease;--ease-snap:ease}\n  *, *::before, *::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important}\n}'
)

# Button micro-interactions
btn_delight = '''
/* ==== DELIGHT: Button micro-interactions ==== */
.btn, .ae-promo-cta, .cta-btn, .floating-cta, .contact-submit, .nav-back {
  position: relative;
  overflow: hidden;
  transition: transform 180ms var(--ease-spring), box-shadow 180ms var(--ease-spring), background-color 150ms ease;
}
.btn:hover, .ae-promo-cta:hover, .cta-btn:hover, .floating-cta:hover, .contact-submit:hover, .nav-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -12px rgba(12,16,22,0.35);
}
.btn:active, .ae-promo-cta:active, .cta-btn:active, .floating-cta:active, .contact-submit:active, .nav-back:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: 0 4px 16px -8px rgba(12,16,22,0.3);
  transition-duration: 60ms;
}

/* Ripple effect */
.btn::before, .ae-promo-cta::before, .cta-btn::before, .floating-cta::before, .contact-submit::before, .nav-back::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition: opacity 200ms var(--ease-spring), transform 400ms var(--ease-spring);
  pointer-events: none;
}
.btn:active::before, .ae-promo-cta:active::before, .cta-btn:active::before, .floating-cta:active::before, .contact-submit:active::before, .nav-back:active::before {
  opacity: 1;
  transform: scale(2.5);
  transition-duration: 0ms, 600ms;
}

/* Ghost button variant */
.btn-ghost {
  transition: transform 180ms var(--ease-spring), background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
.btn-ghost:hover {
  transform: translateY(-2px);
  background: rgba(12,16,22,0.04);
}
.btn-ghost:active {
  transform: translateY(1px) scale(0.99);
}
'''

css = css.replace('/* ==== NAV (unified with home) ==== */', btn_delight + '\n/* ==== NAV (unified with home) ==== */')

# Card hover delight
card_delight = '''
/* ==== DELIGHT: Card hover & reveal ==== */
.work-item, .service-card, .module-card, .insane-card, .card, .stack-card {
  transition: transform 350ms var(--ease-spring), box-shadow 350ms var(--ease-spring), border-color 200ms ease;
  will-change: transform, box-shadow;
}
.work-item:hover, .service-card:hover, .module-card:hover, .insane-card:hover, .card:hover, .stack-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
  border-color: var(--rule-strong);
}

/* Image scale on card hover */
.work-item-bg img, .card-img img, .module-visual img {
  transition: transform 650ms var(--ease-spring);
  will-change: transform;
}
.work-item:hover .work-item-bg img, .card:hover .card-img img, .module-card:hover .module-visual img {
  transform: scale(1.04);
}

/* Work item arrow slide */
.work-item-arrow {
  transition: transform 280ms var(--ease-snap), opacity 200ms var(--ease-spring);
  opacity: 0.8;
}
.work-item:hover .work-item-arrow {
  transform: translateX(6px);
  opacity: 1;
}

/* Service card tag pulse */
.service-tag {
  transition: transform 200ms var(--ease-snap), background-color 200ms ease, color 200ms ease;
}
.service-card:hover .service-tag {
  transform: scale(1.05);
}
'''

css = css.replace('/* ==== PAGE ==== */', card_delight + '\n/* ==== PAGE ==== */')

# Menu button refined delight
menu_delight = '''
/* ==== DELIGHT: Menu button spring ==== */
.nav-menu-btn {
  transition: transform 500ms var(--ease-overshoot), box-shadow 300ms var(--ease-spring);
}
.nav-menu-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 28px -10px rgba(12,16,22,0.55);
}
.nav-menu-btn:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}
.nav-menu-btn-icon {
  transition: transform 500ms var(--ease-overshoot);
}
.nav-menu-btn:hover .nav-menu-btn-icon {
  transform: rotate(90deg);
}
.nav-menu-btn.open .nav-menu-btn-icon {
  transform: rotate(-90deg);
}
'''

css = css.replace('/* dropdown */', menu_delight + '\n/* dropdown */')

# Link underline animation
link_delight = '''
/* ==== DELIGHT: Link underline sweep ==== */
a:not(.btn):not(.ae-promo-cta):not(.cta-btn):not(.floating-cta):not(.contact-submit):not(.nav-back):not(.menu-link):not(.nav-logo):not(.gh-trigger):not(.footer-links a) {
  position: relative;
}
a:not(.btn):not(.ae-promo-cta):not(.cta-btn):not(.floating-cta):not(.contact-submit):not(.nav-back):not(.menu-link):not(.nav-logo):not(.gh-trigger):not(.footer-links a)::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 280ms var(--ease-spring);
  opacity: 0.5;
}
a:not(.btn):not(.ae-promo-cta):not(.cta-btn):not(.floating-cta):not(.contact-submit):not(.nav-back):not(.menu-link):not(.nav-logo):not(.gh-trigger):not(.footer-links a):hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Footer links - subtle */
.footer-links a {
  position: relative;
  transition: color 180ms ease, opacity 180ms ease;
}
.footer-links a::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 250ms var(--ease-spring);
}
.footer-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
'''

css = css.replace('/* ==== FOOTER ==== */', link_delight + '\n/* ==== FOOTER ==== */')

# Form input focus delight
form_delight = '''
/* ==== DELIGHT: Form input focus ==== */
.contact-field input, .contact-field textarea {
  transition: border-color 180ms var(--ease-spring), box-shadow 180ms var(--ease-spring), background-color 180ms ease;
  border: 1px solid var(--rule);
}
.contact-field input:focus, .contact-field textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0,179,158,0.12);
  outline: none;
  background: var(--bg);
}
.contact-field label {
  transition: color 180ms var(--ease-spring), transform 180ms var(--ease-spring);
}
.contact-field:focus-within label {
  color: var(--accent);
  transform: translateY(-2px);
}

/* Submit button success state */
.contact-submit.success {
  animation: checkmark-draw 600ms var(--ease-snap) forwards;
}
@keyframes checkmark-draw {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); background: var(--accent); }
  100% { transform: scale(1); background: var(--accent); }
}
'''

css = css.replace('/* ==== FOOTER ==== */', form_delight + '\n/* ==== FOOTER ==== */')

# Loader personality
loader_delight = '''
/* ==== DELIGHT: Loader personality ==== */
.page-loader {
  transition: opacity 400ms var(--ease-spring), visibility 400ms;
}
.page-loader.done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.loader-text {
  position: relative;
}
.loader-text::after {
  content: "";
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin-left: 0.5rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
  vertical-align: -0.15em;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Loader messages - personality */
.loader-text[data-message]::before {
  content: attr(data-message);
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
  opacity: 0;
  animation: message-cycle 12s ease-in-out infinite;
}
@keyframes message-cycle {
  0%, 100% { opacity: 0; }
  10%, 90% { opacity: 1; }
}
'''

css = css.replace('/* ==== FOOTER ==== */', loader_delight + '\n/* ==== FOOTER ==== */')

# Prefooter strip hover depth
prefooter_delight = '''
/* ==== DELIGHT: Prefooter strip hover ==== */
.prefooter-img {
  transition: transform 500ms var(--ease-spring), box-shadow 400ms var(--ease-spring);
  cursor: pointer;
}
.prefooter-img:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 60px -20px rgba(12,16,22,0.35);
}
'''

css = css.replace('/* ==== FOOTER ==== */', prefooter_delight + '\n/* ==== FOOTER ==== */')

# Floating CTA magnetic pull
floating_delight = '''
/* ==== DELIGHT: Floating CTA magnetic ==== */
.floating-cta {
  transition: transform 400ms var(--ease-spring), box-shadow 300ms var(--ease-spring), opacity 300ms ease;
}
.floating-cta:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 16px 40px -12px rgba(12,16,22,0.4);
}
.floating-cta:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 80ms;
}
.floating-cta.visible {
  animation: cta-float-in 600ms var(--ease-snap) forwards;
}
@keyframes cta-float-in {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
'''

css = css.replace('/* ==== FOOTER ==== */', floating_delight + '\n/* ==== FOOTER ==== */')

# Reveal animation refinement
reveal_delight = '''
/* ==== DELIGHT: Reveal animations ==== */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms var(--ease-spring), transform 700ms var(--ease-spring);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger via CSS custom property */
.reveal[data-stagger] {
  transition-delay: calc(var(--stagger, 0) * 120ms);
}

/* Module card specific */
.module-card.reveal { transform: translateY(40px); }
.module-card.reveal.visible { transform: translateY(0); }

/* Insane card */
.insane-card.reveal { transform: translateY(40px) scale(0.98); }
.insane-card.reveal.visible { transform: translateY(0) scale(1); }
'''

css = css.replace('/* ==== FOOTER ==== */', reveal_delight + '\n/* ==== FOOTER ==== */')

# Footer marquee smooth infinite
marquee_delight = '''
/* ==== DELIGHT: Marquee seamless ==== */
.footer-marquee-inner {
  animation: marquee 35s linear infinite;
  will-change: transform;
}
.footer-marquee:hover .footer-marquee-inner {
  animation-play-state: paused;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
'''

css = css.replace('/* ==== FOOTER ==== */', marquee_delight + '\n/* ==== FOOTER ==== */')

Path('public/site.css').write_text(css)
print('site.css updated with delight')

# ============================================================
# 2. HOME INDEX.HTML - Add loader messages, data-stagger, etc.
# ============================================================
h = Path('index.html').read_text()

# Update loader with personality messages
h = h.replace(
    '<div class="page-loader" id="loader">\n        <span class="loader-text"><img src="ae-logo.webp" alt="AEGNTIC"></span>\n    </div>',
    '<div class="page-loader" id="loader">\n        <span class="loader-text" data-message="Initializing agent runtime..."><img src="ae-logo.webp" alt="AEGNTIC"></span>\n    </div>'
)

# Add console easter egg
console_egg = '''
<script>
// Console easter egg for curious developers
const messages = [
  "Hello! Building agent systems? Check out aedex.ing",
  "Cognitive OS: github.com/aegntic/cognitive-os",
  "One person. Production systems. No agency handoff.",
  "This site runs on vanilla HTML/CSS/JS + GSAP. No framework.",
];
console.log("%c" + messages[Math.floor(Math.random() * messages.length)], "color: #00b39f; font-size: 14px; font-weight: 500; font-family: 'Satoshi', sans-serif;");
console.log("%cHiring? Let's talk. hello@aegntic.com", "color: #8b9296; font-size: 12px;");
</script>
'''
h = h.replace('</body>', console_egg + '\n</body>')

# Add reduced motion check to GSAP
gsap_init = h.find('gsap.registerPlugin')
if gsap_init >= 0:
    insert_at = h.find('});', gsap_init)
    if insert_at > 0:
        reduced_motion_check = '''
        // Respect reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.globalTimeline.timeScale(0.001);
          document.documentElement.style.setProperty("--ease-spring", "ease");
          document.documentElement.style.setProperty("--ease-overshoot", "ease");
          document.documentElement.style.setProperty("--ease-strong", "ease");
        }
'''
        h = h[:insert_at+2] + reduced_motion_check + h[insert_at+2:]

Path('index.html').write_text(h)
print('index.html updated with delight')

# ============================================================
# 3. Contact form success handling
# ============================================================
h = Path('index.html').read_text()
contact_success_js = '''
        // Contact form success animation
        const submitBtn = document.getElementById("contactSubmit");
        const originalText = submitBtn?.textContent;
        if (submitBtn && !submitBtn.dataset.enhanced) {
          submitBtn.dataset.enhanced = "true";
          submitBtn.addEventListener("click", function(e) {
            const form = document.getElementById("contactForm");
            if (form && form.checkValidity()) {
              this.classList.add("success");
              this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto"><path d="M20 6L9 17l-5-5"/></svg>';
              this.style.width = "48px";
              this.style.padding = "1rem";
              setTimeout(() => {
                this.classList.remove("success");
                this.innerHTML = originalText;
                this.style.width = "";
                this.style.padding = "";
              }, 2000);
            }
          });
        }
'''
script_end = h.find('</script>', h.find('floating-cta'))
if script_end > 0:
    h = h[:script_end] + contact_success_js + h[script_end:]
    Path('index.html').write_text(h)
    print('contact success added')

# ============================================================
# 4. OPERATOR PAGE - Add reveal classes & stagger + GSAP
# ============================================================
op = Path('public/cognitive-operator/index.html').read_text()

# Add reveal classes to sections
op = op.replace('<section class="section-pad">', '<section class="section-pad reveal" data-stagger="0">')
op = op.replace('<div class="grid cols-3">', '<div class="grid cols-3" style="--stagger-base: 0;">')

# Add stagger to cards
card_idx = 0
def add_stagger(m):
    global card_idx
    s = f' class="card reveal-fade" data-stagger="{card_idx}"'
    card_idx += 1
    return s

op = re.sub(r'class="card reveal-fade"', lambda m: add_stagger(m), op)

# Add GSAP scroll reveal
if 'ScrollTrigger' not in op and 'gsap' not in op.lower():
    gsap_add = '''
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".reveal, .reveal-fade").forEach((el, i) => {
  const stagger = parseInt(el.dataset.stagger || "0", 10);
  gsap.fromTo(el, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: stagger * 0.12,
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
    });
});
</script>
'''
    op = op.replace('</body>', gsap_add + '\n</body>')

op = op.replace('</body>', console_egg + '\n</body>')
Path('public/cognitive-operator/index.html').write_text(op)
print('operator page updated')

# ============================================================
# 5. COS PAGE - Add reveal + console egg
# ============================================================
for cp in ['public/cognitive-os.html', 'public/cognitive-os/index.html']:
    cos = Path(cp).read_text()
    if 'reveal' not in cos and 'ScrollTrigger' not in cos:
        cos = cos.replace('<section class="section', '<section class="section reveal')
        cos = cos.replace('<article class="module-card">', '<article class="module-card reveal" data-stagger="0">')
        cos = cos.replace('<article class="insane-card">', '<article class="insane-card reveal" data-stagger="0">')
        cos = cos.replace('<div class="stack-card">', '<div class="stack-card reveal" data-stagger="0">')
        cos = cos.replace('</body>', '''
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".reveal").forEach((el, i) => {
  const stagger = parseInt(el.dataset.stagger || "0", 10);
  gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: stagger * 0.12,
    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
  });
});
</script>
''' + console_egg + '\n</body>')
        Path(cp).write_text(cos)
        print('cos', cp, 'updated')

print('\nAll delight applied!')