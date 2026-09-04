/* One on-site enquiry surface for every page. Native dialog owns focus and inertness. */
(() => {
  if (document.getElementById('ae-enquiry')) return;
  const services = ['Agent build', 'Workflow automation', 'Internal tool', 'Something else'];
  const prompts = {
    'Agent build': 'What task should the agent handle, and where will it work?',
    'Workflow automation': 'Which steps repeat, and where do hand-offs get stuck?',
    'Internal tool': 'Who will use it, and what should it help them do?',
    'Something else': 'What is failing, about to ship, or worth exploring?'
  };
  const dialog = document.createElement('dialog');
  dialog.id = 'ae-enquiry';
  dialog.className = 'ae-enquiry';
  dialog.setAttribute('aria-labelledby', 'ae-enquiry-title');
  dialog.innerHTML = `<div class="ae-enquiry-inner"><button class="ae-enquiry-close" type="button" aria-label="Close enquiry">Close <span aria-hidden="true">×</span></button><p class="ae-enquiry-kicker">With Mattae Cooper</p><h2 id="ae-enquiry-title">Let's make<br>it work.</h2><p class="ae-enquiry-intro">A little context is enough to begin.</p><form id="ae-enquiry-form" novalidate><label for="ae-service">What do you need?</label><select id="ae-service" name="service">${services.map(service => `<option>${service}</option>`).join('')}</select><div class="ae-enquiry-row"><div><label for="ae-name">Name</label><input id="ae-name" name="name" autocomplete="name" maxlength="100" required></div><div><label for="ae-email">Work email</label><input id="ae-email" name="email" type="email" autocomplete="email" maxlength="254" required></div></div><label for="ae-system">Repository or system URL <span>optional</span></label><input id="ae-system" name="system_url" type="url" inputmode="url" maxlength="1000" placeholder="https://"><label id="ae-message-label" for="ae-message">What should work better?</label><textarea id="ae-message" name="message" rows="4" minlength="10" maxlength="5000" required></textarea><div class="ae-enquiry-hp" aria-hidden="true"><label for="ae-company">Leave empty</label><input id="ae-company" name="company" tabindex="-1" autocomplete="off"></div><input type="hidden" name="source_path"><input type="hidden" name="offer_key"><p class="ae-enquiry-status" role="status" aria-live="polite"></p><button type="submit" class="ae-enquiry-submit">Send enquiry <span aria-hidden="true">↗</span></button><p class="ae-enquiry-privacy">Your details are used to respond to this enquiry. <a href="/privacy/">Privacy</a></p><p class="ae-enquiry-fallback">Or email <a href="mailto:hello@aegntic.com">hello@aegntic.com</a></p></form></div>`;
  document.body.append(dialog);
  const form = dialog.querySelector('form');
  const service = form.elements.service;
  const message = form.elements.message;
  const status = dialog.querySelector('.ae-enquiry-status');
  const submit = dialog.querySelector('[type="submit"]');
  const isProduction = ['aegntic.ai', 'www.aegntic.ai'].includes(location.hostname) && location.protocol === 'https:';
  let opener;
  let pending = false;
  let sent = false;
  let draftStarted = false;
  function updatePrompt() {
    document.getElementById('ae-message-label').textContent = prompts[service.value];
    form.elements.offer_key.value = service.value.toLowerCase().replaceAll(' ', '-');
  }
  service.addEventListener('change', updatePrompt);
  form.addEventListener('input', () => {draftStarted = true;});
  function open(link) {
    if (dialog.open) return;
    opener = link || document.activeElement;
    const chosen = link?.dataset.enquiry;
    if (services.includes(chosen)) service.value = chosen;
    else if (!draftStarted) service.value = 'Something else';
    if (!draftStarted) form.elements.source_path.value = location.pathname;
    updatePrompt();
    document.dispatchEvent(new Event('ae:close-menu'));
    dialog.showModal();
    document.body.classList.add('ae-enquiry-open');
    if (!pending && !sent) status.textContent = isProduction ? '' : 'Local preview. No enquiry will be sent or saved.';
    service.focus({preventScroll:true});
  }
  dialog.querySelector('.ae-enquiry-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('ae-enquiry-open');
    const destination = opener?.closest('.ae-menu') ? document.querySelector('.ae-menu-trigger') : opener;
    destination?.focus({preventScroll:true});
  });
  // Explicit hooks first; existing on-site contact links and action email links migrate here too.
  document.addEventListener('click', event => {
    const link = event.target.closest('a,button');
    if (!link || link.closest('#ae-enquiry') || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute('href') || '';
    const text = link.textContent.trim();
    const contactLink = /^(\/?#contact|\/contact\/?(?:#.*)?)$/.test(href);
    const emailAction = href.startsWith('mailto:') && !text.includes('@');
    if (link.hasAttribute('data-enquiry') || contactLink || emailAction || /^work with me$/i.test(text)) {
      event.preventDefault();
      open(link);
    }
  });
  document.addEventListener('ae:open-enquiry', () => open(null));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || sent) return;
    status.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    const fields = [form.elements.name, form.elements.email, form.elements.system_url, message];
    const invalid = fields.find(field => !field.checkValidity() || (field.required && !field.value.trim()));
    if (invalid) {
      invalid.setAttribute('aria-invalid', 'true');
      status.textContent = invalid === message ? 'Tell us a little more (at least 10 characters).' : `Please check ${invalid === form.elements.name ? 'your name' : invalid === form.elements.email ? 'your email address' : 'the URL'}.`;
      invalid.focus();
      return;
    }
    if (!isProduction) {status.textContent = `Preview checked. Nothing was sent or saved. Service: ${service.value}. Source: ${form.elements.source_path.value}.`;return;}
    pending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    try {
      const response = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.elements.name.value.trim(),email:form.elements.email.value.trim(),subject:service.value,service:service.value,system_url:form.elements.system_url.value.trim(),message:message.value.trim(),company:form.elements.company.value,source_path:form.elements.source_path.value,offer_key:form.elements.offer_key.value}),signal:AbortSignal.timeout(15000)});
      const result = await response.json();
      if (!response.ok || result.status !== 'success') throw new Error('receipt-not-confirmed');
      sent = true;
      status.textContent = 'Received. Thank you for the context.';
      submit.textContent = 'Enquiry received';
      fields.forEach(field => {field.readOnly = true;});
      service.disabled = true;
    } catch {
      status.textContent = 'Receipt could not be confirmed. Your draft is still here. Please retry or use the email below.';
      submit.textContent = 'Retry enquiry';
      submit.disabled = false;
    } finally {pending = false;}
  });
})();
