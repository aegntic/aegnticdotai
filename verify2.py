#!/usr/bin/env python3
import pathlib, re, urllib.request, ssl, concurrent.futures as cf

DIST = pathlib.Path('/tmp/aegnticdotai-triad/dist')
BASE = 'https://aegntic.ai'
CTX = ssl.create_default_context()
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) Chrome/128.0 Safari/537.36'}
TAGLINE = 'Unlimited Insight.<br>Zero Knowledge.'

dist_pages = sorted(DIST.rglob('*.html'))
no_tagline = [str(p.relative_to(DIST)) for p in dist_pages if TAGLINE not in p.read_text(errors='replace')]
stubs = [str(p.relative_to(DIST)) for p in dist_pages if 'http-equiv="refresh"' in p.read_text(errors='replace')]
print(f'dist: {len(dist_pages)} html, missing_tagline={no_tagline}, refresh_stubs={stubs}')

urls = set(re.findall(r'<loc>\s*(.*?)\s*</loc>', urllib.request.urlopen(urllib.request.Request(BASE + '/sitemap.xml', headers=UA), timeout=20, context=CTX).read().decode()))
for p in dist_pages:
    parts = list(p.relative_to(DIST).parts)
    if parts[-1] == 'index.html':
        parts = parts[:-1]
    path = '/'.join(parts)
    urls.add(BASE + '/' + (path + '/' if path else ''))

def chk(u):
    try:
        b = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=25, context=CTX).read().decode('utf-8', 'replace')
        return u, TAGLINE in b or 'http-equiv' in b.lower()
    except Exception as e:
        return u, f'ERR {e}'

with cf.ThreadPoolExecutor(12) as ex:
    res = list(ex.map(chk, sorted(urls)))
bad = [r for r in res if r[1] is not True]
print(f'live tagline-or-stub: {len(res)} urls, failures={bad}')

css = urllib.request.urlopen(urllib.request.Request(BASE + '/shared-footer.css', headers=UA), timeout=20, context=CTX).read().decode()
m = re.search(r'\.ae-site-footer__triad\s*\{[^}]*\}', css)
print('LIVE triad rule:', m.group(0) if m else 'NOT FOUND')

try:
    r = urllib.request.urlopen(urllib.request.Request('https://aegntic.com/', headers=UA), timeout=15, context=CTX)
    body = r.read().decode('utf-8', 'replace')
    t = re.search(r'<title[^>]*>(.*?)</title>', body, re.S)
    title = re.sub(r'\s+', ' ', t.group(1)).strip()[:100] if t else 'none'
    markers = [k for k in ('afternic', 'dan.com', 'sedo', 'for sale', 'buy this domain') if k in body.lower()]
    print(f'aegntic.com: status={r.status} title={title!r} lander_markers={markers}')
except Exception as e:
    print('aegntic.com:', type(e).__name__, e)
