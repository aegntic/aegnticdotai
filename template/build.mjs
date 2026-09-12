import { copyFile, lstat, mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderSite, renderTheme } from './render.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
if (args.length % 2 || args.some((arg, index) => index % 2 === 0 && !['--config', '--out'].includes(arg))) throw new Error('Usage: node build.mjs [--config project.mjs] [--out dist]');
const options = Object.fromEntries(Array.from({ length: args.length / 2 }, (_, index) => [args[index * 2], args[index * 2 + 1]]));
const configPath = resolve(root, options['--config'] || 'project.mjs');
const output = resolve(root, options['--out'] || 'dist');
const inside = relative(root, output);
if (!inside || inside.startsWith('..') || isAbsolute(inside) || ['public', 'examples'].includes(inside.split('/')[0])) throw new Error('Use a dedicated build output directory inside this template, such as dist or dist-studio.');
const marker = join(output, '.aegntic-template-build');
const safePath = value => typeof value === 'string' && value && !isAbsolute(value) && !/[\\\u0000]/.test(value) && value.split('/').every(part => part && part !== '.' && part !== '..');
async function rejectSymlinks(target) {
  let current = root;
  for (const part of relative(root, target).split('/')) {
    current = join(current, part);
    const entry = await lstat(current).catch(error => { if (error.code !== 'ENOENT') throw error; return null; });
    if (entry?.isSymbolicLink()) throw new Error(`Build paths cannot contain symlinks: ${current}`);
  }
}
await rejectSymlinks(output);
let previousFiles = [];
try {
  const existing = await readdir(output);
  if (existing.length && !existing.includes('.aegntic-template-build')) throw new Error('Output folder contains files from outside this builder. Choose a new --out directory.');
  if (existing.length) {
    await rejectSymlinks(marker);
    const previous = JSON.parse(await readFile(marker, 'utf8'));
    if (previous.version !== 1 || !Array.isArray(previous.files) || !previous.files.every(safePath)) throw new Error('Invalid build manifest. Choose a new --out directory.');
    previousFiles = previous.files;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }
const config = (await import(pathToFileURL(configPath).href)).default;
const html = renderSite(config);
const theme = renderTheme(config.theme);
// Verify all local markup assets before publishing a partial build.
const localAssets = new Set([...html.matchAll(/(?:src|href)="\.\/([^"?#]+)[^"\s]*"/g)].map(match => match[1]));
for (const asset of localAssets) {
  if (asset === 'theme.css') continue;
  const entry = await stat(join(root, 'public', asset)).catch(() => null);
  if (!entry?.isFile()) throw new Error(`Missing public/${asset}. Run node sync.mjs in the original repository, or add your project asset.`);
}
for (const font of [config.theme.bodyFont, config.theme.displayFont]) {
  if (font.src.startsWith('./')) await stat(join(root, 'public', font.src.slice(2)));
}
async function publicFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const file = prefix + entry.name;
    if (!safePath(file) || entry.isSymbolicLink()) throw new Error(`Public assets must be real files with safe paths: ${file}`);
    if (entry.isDirectory()) files.push(...await publicFiles(join(directory, entry.name), `${file}/`));
    else if (entry.isFile()) files.push(file);
  }
  return files;
}
const files = await publicFiles(join(root, 'public'));
const nextFiles = [...new Set([...files, 'index.html', 'theme.css'])];
for (const file of new Set([...previousFiles, ...nextFiles])) await rejectSymlinks(join(output, file));
await mkdir(output, { recursive: true });
for (const file of files) {
  await mkdir(dirname(join(output, file)), { recursive: true });
  await copyFile(join(root, 'public', file), join(output, file));
}
await writeFile(join(output, 'index.html'), html);
await writeFile(join(output, 'theme.css'), theme);
for (const file of previousFiles.filter(file => !nextFiles.includes(file))) {
  await unlink(join(output, file)).catch(error => { if (error.code !== 'ENOENT') throw error; });
}
await writeFile(marker, JSON.stringify({ version: 1, config: relative(root, configPath), files: nextFiles }, null, 2));
console.log(`Built ${config.brand.name}: ${relative(root, output)}/index.html`);
