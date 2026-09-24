/*!
 * aegntic join popup v3 — "pop ups are still a thing.."
 * Centered modal, blurred backdrop, aegntic logo chip.
 * Opens after scrolling 1/3 of the page (or immediately on #join from the
 * QR artwork). Join arrow appears only on a full valid email. Success:
 * "welcome to aegntic.labs". On signup or outside tap it genie-minimizes
 * into the menu hamburger.
 *
 *  <script>window.AEGNTIC_JOIN_ENDPOINT = "https://formspree.io/f/xxx";</script>  (optional)
 *  <script>window.AEGNTIC_MENU_SELECTOR = ".my-hamburger";</script>               (optional)
 *  <script src="/aegntic-join-popup.js"></script>
 *
 * window.AegnticJoin.open() / .close() to drive it manually.
 */
(function () {
  "use strict";

  var ENDPOINT = window.AEGNTIC_JOIN_ENDPOINT || "";
  var STORE_KEY = "aegntic-joined";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var css = [
    ".aj3-scrim{position:fixed;inset:0;z-index:2147483000;background:rgba(24,19,23,.38);backdrop-filter:blur(14px) saturate(1.1);-webkit-backdrop-filter:blur(14px) saturate(1.1);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease}",
    ".aj3-scrim.aj3-on{opacity:1}",
    ".aj3-card{width:min(348px,calc(100vw - 36px));background:linear-gradient(168deg,#fffdfa,#f6f1ee);border:1px solid rgba(255,150,92,.5);border-radius:22px;padding:26px 24px 22px;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#2b252a;box-shadow:0 26px 80px rgba(40,20,10,.3),0 0 0 1px rgba(255,255,255,.65) inset,0 0 46px rgba(255,150,92,.16);transform:translateY(14px) scale(.95);opacity:0;transition:transform .32s cubic-bezier(.2,.9,.3,1.15),opacity .28s ease;transform-origin:center center;will-change:transform}",
    ".aj3-scrim.aj3-on .aj3-card{transform:none;opacity:1}",
    "",
    ".aj3-logo{display:block;width:96px;height:96px;margin:0 auto 14px;filter:drop-shadow(0 3px 9px rgba(40,25,15,.22))}",
    "",
    "",
    "",
    ".aj3-head{font-size:15.5px;font-weight:700;letter-spacing:-.01em;line-height:1.3;margin:0 0 6px;text-align:center}",
    ".aj3-ask{font-size:12.5px;line-height:1.5;color:#6d6168;margin:0 0 14px;text-align:center}",
    ".aj3-ask b{color:#2b252a}",
    ".aj3-row{display:flex;align-items:center;gap:8px}",
    ".aj3-input{flex:1;min-width:0;border:1.5px solid #e8dedb;border-radius:12px;padding:12px 13px;font-size:14.5px;background:#fff;color:#2b252a;outline:none;transition:border-color .15s,box-shadow .15s}",
    ".aj3-input::placeholder{color:#b9aca7;font-size:13px}",
    ".aj3-input:focus{border-color:#ff8a4c;box-shadow:0 0 0 3px rgba(255,138,76,.18)}",
    ".aj3-input.aj3-bad{border-color:#e8836a;box-shadow:0 0 0 3px rgba(232,131,106,.14)}",
    ".aj3-go{flex:0 0 auto;width:40px;height:40px;border:0;border-radius:12px;cursor:pointer;background:linear-gradient(135deg,#ff9a5c,#f2692c);box-shadow:0 5px 16px rgba(242,105,44,.4);display:flex;align-items:center;justify-content:center;padding:0;opacity:0;transform:translateX(-8px) scale(.8);pointer-events:none;transition:opacity .18s ease,transform .18s cubic-bezier(.2,.9,.3,1.3)}",
    ".aj3-go.aj3-ready{opacity:1;transform:none;pointer-events:auto}",
    ".aj3-go:hover{filter:brightness(1.06)}",
    ".aj3-go svg{width:17px;height:17px;display:block}",
    ".aj3-go .aj3-spin{display:none}",
    ".aj3-go.aj3-busy .aj3-arrow{display:none}",
    ".aj3-go.aj3-busy .aj3-spin{display:block;animation:aj3spin .7s linear infinite}",
    "@keyframes aj3spin{to{transform:rotate(360deg)}}",
    ".aj3-done{display:none;align-items:center;justify-content:center;gap:9px;margin-top:15px;padding:13px;border-radius:13px;background:rgba(255,150,92,.1);border:1px solid rgba(255,150,92,.35);font-size:14.5px;font-weight:700;color:#3f3430}",
    ".aj3-done .aj3-check{flex:0 0 auto;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#ff9a5c,#f2692c);display:flex;align-items:center;justify-content:center;box-shadow:0 0 14px rgba(255,138,76,.5)}",
    ".aj3-done .aj3-check svg{width:12px;height:12px}",
    ".aj3-hint{margin-top:10px;text-align:right;font-size:9.5px;line-height:1.3;letter-spacing:.02em;color:#b3a5aa;font-weight:600}",
    ".aj3-pulse{animation:aj3pulse .22s ease .35s 1}",
    "@keyframes aj3pulse{0%{transform:none}45%{transform:scale(1.18)}100%{transform:none}}"
  ].join("\n");

  function menuEl() {
    var sels = [window.AEGNTIC_MENU_SELECTOR, "[data-aj-menu]", ".hamburger", "#menu-toggle",
      "[aria-label*='menu' i]", "nav button"].filter(Boolean);
    for (var i = 0; i < sels.length; i++) {
      try { var el = document.querySelector(sels[i]); if (el) return el; } catch (_) {}
    }
    return null;
  }

  function build() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    var scrim = document.createElement("div");
    scrim.className = "aj3-scrim";
    scrim.innerHTML =
      '<div class="aj3-card" role="dialog" aria-modal="true" aria-label="join aegntic labs">' +
      '  <img class="aj3-logo" src="/ae-logo.png" alt="aegntic logo" />' +
      '  <h2 class="aj3-head">pop ups are still a thing..</h2>' +
      '  <p class="aj3-ask">Drop your email to <b>join aegntic.labs</b> — early access, agent drops, zero spam.</p>' +
      '  <div class="aj3-form">' +
      '    <div class="aj3-row">' +
      '      <input class="aj3-input" type="email" name="email" autocomplete="email" spellcheck="false" placeholder="you@domain.com" aria-label="your email" />' +
      '      <button class="aj3-go" type="button" aria-label="join">' +
      '        <svg class="aj3-arrow" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 5.5 19.5 12 13 18.5"/></svg>' +
      '        <svg class="aj3-spin" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg>' +
      "      </button>" +
      "    </div>" +
      '    <div class="aj3-done">' +
      '      <span class="aj3-check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg></span>' +
      "      <span>welcome to aegntic.labs</span>" +
      "    </div>" +
      '    <div class="aj3-hint">tap to<br>cont.</div>' +
      "  </div>" +
      "</div>";
    document.body.appendChild(scrim);

    var card = scrim.querySelector(".aj3-card");
    var input = scrim.querySelector(".aj3-input");
    var go = scrim.querySelector(".aj3-go");
    var done = scrim.querySelector(".aj3-done");
    var open = false, closing = false;

    /* join arrow appears only on a full, valid email */
    input.addEventListener("input", function () {
      input.classList.remove("aj3-bad");
      go.classList.toggle("aj3-ready", EMAIL_RE.test(input.value.trim()));
    });

    /* genie minimization into the hamburger */
    function genie() {
      if (closing) return;
      closing = true;
      scrim.style.transition = "opacity .4s ease";
      scrim.style.opacity = "0";
      var m = menuEl();
      var cr = card.getBoundingClientRect();
      var cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
      var tx = (window.innerWidth - 40) - cx, ty = 36 - cy, sc = 0.07, sy = 0.025;
      if (m) {
        var mr = m.getBoundingClientRect();
        tx = (mr.left + mr.width / 2) - cx;
        ty = (mr.top + mr.height / 2) - cy;
        sc = Math.max(0.06, mr.width / cr.width);
      }
      card.animate([
        { transform: "none", opacity: 1, borderRadius: "22px" },
        { transform: "translate(" + (tx * 0.45) + "px," + (ty * 0.5) + "px) scale(" + (sc * 2.4) + "," + (sy * 3.4) + ") skewY(-5deg)", opacity: 1, borderRadius: "26px", offset: 0.55 },
        { transform: "translate(" + tx + "px," + ty + "px) scale(" + sc + "," + sy + ") skewY(-9deg)", opacity: 0.85, borderRadius: "40px" },
        { transform: "translate(" + tx + "px," + ty + "px) scale(" + sc * 0.4 + "," + sy * 0.4 + ") skewY(-9deg)", opacity: 0, borderRadius: "50%" }
      ], { duration: 480, easing: "cubic-bezier(.5,0,.85,.4)" }).onfinish = function () {
        scrim.style.display = "none";
        if (m) m.classList.add("aj3-pulse");
      };
    }

    function submit() {
      if (!EMAIL_RE.test(input.value.trim())) {
        input.classList.add("aj3-bad");
        input.focus();
        return;
      }
      go.classList.add("aj3-busy");
      var email = input.value.trim();
      try { localStorage.setItem(STORE_KEY, email); } catch (_) {}
      var finish = function () {
        scrim.querySelector(".aj3-row").style.display = "none";
        done.style.display = "flex";
        setTimeout(genie, 950);
      };
      if (ENDPOINT) {
        fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: email, source: "qr-artwork" })
        }).catch(function () {}).finally(finish);
      } else {
        console.log("[aegntic-join] email captured:", email);
        finish();
      }
    }
    go.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });

    /* outside tap → genie; Escape too */
    scrim.addEventListener("pointerdown", function (e) {
      if (open && !closing && e.target === scrim) genie();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open && !closing) genie();
    });

    function show() {
      if (open) return;
      open = true;
      requestAnimationFrame(function () {
        scrim.classList.add("aj3-on");
        setTimeout(function () { input.focus(); }, 320);
      });
    }
    window.AegnticJoin = { open: show, close: genie };
    return show;
  }

  function joined() {
    try { return !!localStorage.getItem(STORE_KEY); } catch (_) { return false; }
  }

  function boot() {
    if (document.body === null) { setTimeout(boot, 60); return; }
    var show = build();
    var fired = false;

    function maybeShow() {
      if (fired || joined()) return;
      fired = true;
      setTimeout(show, 300);
    }

    var demo = new URLSearchParams(location.search).has("demo");

    if (location.hash === "#join" && (!joined() || demo)) {
      setTimeout(show, 350);                    /* QR scans: open at once */
    } else if (demo) {
      setTimeout(show, 350);                    /* demo replay */
    } else {
      /* organic traffic: open after scrolling 1/3 of the page */
      var onScroll = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && window.scrollY / max >= 1 / 3) {
          window.removeEventListener("scroll", onScroll);
          maybeShow();
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      /* page too short to scroll: fall back to a timed open */
      if (document.documentElement.scrollHeight - window.innerHeight <= 0) {
        setTimeout(maybeShow, 2500);
      }
    }

    if (location.hash === "#join") history.replaceState(null, "", location.pathname + location.search);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
