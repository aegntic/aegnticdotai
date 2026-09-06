import {readFileSync, readdirSync, existsSync, statSync} from 'node:fs';
import {resolve, relative, join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const files = readdirSync(dist, {recursive:true}).filter(p=>p.endsWith('.html'));
const redirects = new Map(readFileSync(join(dist,'_redirects'),'utf8').split('\n').filter(s=>s.trim()&&!s.startsWith('#')).map(s=>s.trim().split(/\s+/).slice(0,2)));
const decode = s => s.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
const external = new Map();
const errors = new Set();
let internal = 0;
function inspect(value, source) {
  if (/^(?:data:|mailto:|tel:|javascript:)/i.test(value)) return;
  const url = new URL(decode(value), 'https://aegntic.ai/'+source);
  if (!['aegntic.ai','www.aegntic.ai'].includes(url.hostname)) {
    if (url.protocol==='https:'||url.protocol==='http:') external.set(url.href,source);
    return;
  }
  internal++;
  let route = decodeURIComponent(url.pathname);
  const seen = new Set();
  while(redirects.has(route)) {
    if(seen.has(route)) {errors.add(`${source}: redirect loop ${route}`);return;}
    seen.add(route);route=redirects.get(route);
  }
  let file = join(dist, route);
  if (existsSync(file)&&statSync(file).isDirectory()) file=join(file,'index.html');
  if (!existsSync(file)&&existsSync(file+'.html')) file+='.html';
  if (!existsSync(file)) {errors.add(`${source} -> ${value}`);return;}
  if (url.hash && file.endsWith('.html')) {
    const id=decodeURIComponent(url.hash.slice(1));
    if (!id || id==='top' || id.startsWith(':~:text=')) return;
    const html=readFileSync(file,'utf8');
    const ids=[...html.matchAll(/\b(?:id|name)\s*=\s*["']([^"']+)["']/g)].map(m=>decode(m[1]));
    if(!ids.includes(id)) errors.add(`${source} -> ${value} (missing fragment)`);
  }
}
for(const file of files){
  const html=readFileSync(join(dist,file),'utf8');
  for(const m of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/g)) inspect(m[1],file);
  if(!/http-equiv="refresh"/i.test(html)) {
    for(const asset of ['/design-system.css','/premium-nav.css','/premium-nav.js','/shared-footer.css']) if(!html.includes(asset)) errors.add(`${file}: missing shared ${asset}`);
    if((html.match(/class="ae-site-footer"/g)||[]).length!==1) errors.add(`${file}: shared footer count`);
  }
}
// Include literal destinations in the dynamically mounted navigation.
for(const m of readFileSync(join(dist,'premium-nav.js'),'utf8').matchAll(/["']((?:https?:\/\/|\/(?!\/))[^"'<>\s]+)["']/g)) inspect(m[1],'index.html');
console.log(JSON.stringify({pages:files.length,internalReferences:internal,errors:[...errors],externalUrls:external.size},null,2));
if(process.argv.includes('--external')) {
  const queue=[...external.keys()];let cursor=0;
  const results=[];
  await Promise.all(Array.from({length:6},async()=>{
    while(cursor<queue.length){
      const url=queue[cursor++];
      try {
        const res=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'aegntic-site-link-check/1.0'}});
        await res.body?.cancel();
        results.push({url,status:res.status,final:res.url});
      } catch(e) {results.push({url,status:'unverified',reason:e.cause?.code||e.name});}
    }
  }));
  console.log(JSON.stringify({externalChecked:results.length,externalIssues:results.filter(r=>r.status!==200),externalPassed:results.filter(r=>r.status===200).length},null,2));
}
if(errors.size) process.exitCode=1;
