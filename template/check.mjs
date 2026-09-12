import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import project from './project.mjs';
import example from './examples/studio.mjs';
import { renderSite, renderTheme, safeURL } from './render.mjs';

const root = dirname(fileURLToPath(import.meta.url));
for (const value of ['javascript:alert(1)', 'data:text/html,test', '//evil.test', './assets/../private', 'https://user:secret@example.com', './x\\y', '#bad\nvalue', 'https://example.com/"onload="x']) {
  assert.throws(() => safeURL(value), undefined, `Reject unsafe URL: ${value}`);
}
for (const value of ['#hero', './assets/studio-study.svg', 'https://example.com/', 'mailto:hello@example.com', 'tel:+61234567890']) assert.equal(typeof safeURL(value), 'string');
assert.throws(() => renderTheme({ ...project.theme, paper: 'red;display:none' }));
const escaped = renderSite({ ...project, hero: { ...project.hero, title: ['<script>alert("x")</script>'] } });
assert.ok(escaped.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'));
assert.ok(!escaped.includes('<script>alert('));
assert.throws(() => renderSite({ ...project, products: { ...project.products, items: [] } }));
assert.throws(() => renderSite({ ...project, hero: { ...project.hero, next: { label: 'Bad', href: '#missing-section' } } }));
assert.throws(() => renderSite({ ...project, features: [{ ...project.features[0], id: 'main' }, ...project.features.slice(1)] }));
for (const config of [project, example]) {
  const html = renderSite(config);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/class="world-disclosure"/g) || []).length, 3);
  assert.equal((html.match(/class="product-object"/g) || []).length, config.products.items.length);
  assert.ok(!/<form\b|\/api\/|enquiry\.js|https:[^"\s]+\.js/.test(html));
  assert.ok(html.includes('aria-controls="ae-command-menu"'));
  assert.ok(renderTheme(config.theme).includes(config.theme.paper));
}
assert.ok(!renderSite(example).includes('https://aegntic.ai'));

// Exercise the actual builder in an isolated, disposable package. Source files are never changed.
const sandbox = await mkdtemp(join(root, '.check-'));
const runBuild = (...args) => execFileSync(process.execPath, [join(sandbox, 'build.mjs'), ...args], { encoding: 'utf8' });
try {
  for (const file of ['build.mjs', 'render.mjs', 'project.mjs', 'examples', 'public']) await cp(join(root, file), join(sandbox, file), { recursive: true });
  runBuild();
  runBuild('--config', 'examples/studio.mjs', '--out', 'dist-studio');
  for (const directory of ['dist', 'dist-studio']) {
    const html = await readFile(join(sandbox, directory, 'index.html'), 'utf8');
    for (const [, asset] of html.matchAll(/(?:src|href)="\.\/([^"?#]+)[^"\s]*"/g)) assert.ok((await stat(join(sandbox, directory, asset))).isFile());
  }
  await writeFile(join(sandbox, 'public', 'stale-check.txt'), 'Temporary generated asset');
  runBuild();
  assert.ok((await stat(join(sandbox, 'dist', 'stale-check.txt'))).isFile());
  await unlink(join(sandbox, 'public', 'stale-check.txt'));
  await writeFile(join(sandbox, 'dist', 'user-owned.txt'), 'Preserve this unrelated output file');
  runBuild();
  await assert.rejects(stat(join(sandbox, 'dist', 'stale-check.txt')), { code: 'ENOENT' });
  assert.equal(await readFile(join(sandbox, 'dist', 'user-owned.txt'), 'utf8'), 'Preserve this unrelated output file');
  const invalidOutput = ['--out', '../outside'];
  assert.throws(() => execFileSync(process.execPath, [join(sandbox, 'build.mjs'), ...invalidOutput], { stdio: 'pipe' }));
  console.log('Passed: both builds, content/asset checks, escaping, unsafe URLs, duplicate IDs, missing anchors, output boundaries and stale asset removal.');
} finally {
  // Only this check's own fresh directory is disposable.
  await rm(sandbox, { recursive: true, force: true });
}
