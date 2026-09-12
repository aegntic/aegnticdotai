import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = dirname(fileURLToPath(import.meta.url));
const requested = resolve(packageRoot, process.argv[2] || 'dist');
const root = await realpath(requested).catch(() => { throw new Error('Build first with node build.mjs, then preview a generated directory.'); });
await stat(join(root, '.aegntic-template-build')).catch(() => { throw new Error('Preview only serves a generated template directory.'); });
const port = Number(process.argv[3] || 4174);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Choose a port between 1024 and 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname.includes('\\') || pathname.split('/').some(part => part.startsWith('.'))) { response.writeHead(404); response.end('Not found'); return; }
    let target = resolve(root, `.${pathname}`);
    if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
    target = await realpath(target);
    const pathInside = relative(root, target);
    if (pathInside.startsWith('..') || isAbsolute(pathInside)) { response.writeHead(404); response.end('Not found'); return; }
    const data = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch (error) {
    const expected = ['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code) || error instanceof URIError;
    response.writeHead(expected ? 404 : 500);
    response.end(expected ? 'Not found' : 'Unable to serve this file');
    if (!expected) console.error('Preview request failed:', error.message);
  }
});
server.on('error', error => { console.error(`Preview unavailable: ${error.message}`); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Preview ${relative(packageRoot, root)} at http://127.0.0.1:${port}`));
