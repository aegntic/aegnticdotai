#!/usr/bin/env python3
"""Live sweep: confirm triad footer on aegntic.ai (+www, pages.dev), cross-check 90/93 page claim."""
import concurrent.futures as cf
import pathlib
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request

BASE = 'https://aegntic.ai'
DIST = pathlib.Path('/tmp/aegnticdotai-triad/dist')
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'}
CTX = ssl.create_default_context()
TRIAD_CLASS = 'ae-site-footer__triad'
TRIAD_TEXT = 'insight : : innovation : : integrity'


def get(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.status, r.read().decode('utf-8', 'replace'), r.geturl()
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode('utf-8', 'replace')
        except Exception:
            body = ''
        return e.code, body, url
    except Exception as e:
        return None, f'{type(e).__name__}: {e}', url


print('=== KEY SURFACES ===')
key_pages = [BASE + '/', 'https://www.aegntic.ai/', BASE + '/about/', BASE + '/agents/']
home = ''
for u in key_pages:
    s, b, fu = get(u)
    if u == BASE + '/':
        home = b
    print(f'{u} -> final={fu} status={s} triad_class={b.count(TRIAD_CLASS)} triad_text={b.count(TRIAD_TEXT)} bytes={len(b)}')

m = re.search(r'ae-site-footer__voice.*?</div>', home, re.S)
if m:
    print('=== VOICE BLOCK (collapsed) ===')
    print(re.sub(r'\s+', ' ', m.group(0))[:900])
else:
    print('=== VOICE BLOCK: NOT FOUND ===')

print('=== FOOTER CSS ===')
css_hrefs = re.findall(r'href="([^"]*shared-footer[^"]*)"', home)
print('hrefs in html:', css_hrefs)
for cu in css_hrefs:
    full = urllib.parse.urljoin(BASE + '/', cu)
    s, css, _ = get(full)
    print(f'{full} status={s} triad_rule={css.count(".ae-site-footer__triad")} color_505a61={css.count("#505a61")} bytes={len(css)}')

print('=== SITEMAP ===')
s, sm, _ = get(BASE + '/sitemap.xml')
locs = re.findall(r'<loc>\s*(.*?)\s*</loc>', sm)
print(f'sitemap status={s} urls={len(locs)}')

urls = set(locs)
print('=== DIST CROSS-CHECK ===')
if DIST.exists():
    dist_pages = sorted(DIST.rglob('*.html'))
    with_triad = [p for p in dist_pages if TRIAD_CLASS in p.read_text(errors='replace')]
    missing = [str(p.relative_to(DIST)) for p in dist_pages if TRIAD_CLASS not in p.read_text(errors='replace')]
    print(f'dist html total={len(dist_pages)} with_triad={len(with_triad)} without={len(missing)}')
    print('dist pages WITHOUT triad:', missing)
    for p in dist_pages:
        rel = p.relative_to(DIST)
        parts = list(rel.parts)
        if parts and parts[-1] == 'index.html':
            parts = parts[:-1]
        path = '/'.join(parts)
        urls.add(BASE + '/' + (path + '/' if path else ''))
else:
    print(f'WARN: dist not found at {DIST}')

urls = sorted(urls)


def check(u):
    s, b, _ = get(u)
    low = b.lower()
    return {'url': u, 'status': s, 'cls': TRIAD_CLASS in b, 'txt': TRIAD_TEXT in b,
            'stub': ('http-equiv' in low and 'refresh' in low), 'bytes': len(b)}


print(f'=== LIVE SWEEP ({len(urls)} urls) ===')
with cf.ThreadPoolExecutor(max_workers=12) as ex:
    results = list(ex.map(check, urls))

ok = [r for r in results if r['cls'] and r['txt']]
missing = [r for r in results if not (r['cls'] and r['txt'])]
expected = [r for r in missing if r['stub'] or r['status'] in (301, 302, 308)]
unexpected = [r for r in missing if not (r['stub'] or r['status'] in (301, 302, 308))]
print(f'checked={len(results)} with_triad={len(ok)} missing_total={len(missing)} '
      f'missing_expected_stubs={len(expected)} UNEXPECTED={len(unexpected)}')
for r in expected:
    print(f"  expected-miss: {r['url']} status={r['status']} stub={r['stub']}")
for r in unexpected:
    print(f"  UNEXPECTED: {r['url']} status={r['status']} cls={r['cls']} txt={r['txt']} bytes={r['bytes']}")

print('=== PAGES.DEV CANDIDATES ===')
for host in ['aegnticdotai.pages.dev', 'aegntic-ai.pages.dev', 'aegnticdotai-site.pages.dev',
             'aegntic.pages.dev', 'aegnticdotai-1.pages.dev']:
    s, b, fu = get('https://' + host + '/', timeout=15)
    title = ''
    tm = re.search(r'<title>(.*?)</title>', b, re.S)
    if tm:
        title = re.sub(r'\s+', ' ', tm.group(1)).strip()[:70]
    print(f'{host} status={s} triad_class={b.count(TRIAD_CLASS) if isinstance(b, str) else 0} title={title!r}')
