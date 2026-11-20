import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const root=new URL('../',import.meta.url).pathname;
const files=readdirSync(join(root,'public/content/blog')).filter(f=>f.startsWith('field-notes-'));
const read=path=>readFileSync(join(root,path),'utf8');
test('archive collection exposes each weekly article with separate context/publication dates',()=>{
 const collection=read('public/blog/field-notes/index.html');
 const dates=[];
 for(const file of files){
  const source=read(`public/content/blog/${file}`);
  const historical=source.match(/^retrospectiveDate: ['"]?(\d{4}-\d{2}-\d{2})['"]?/m)?.[1];
  const actual=source.match(/^pubDate: ['"]?(\d{4}-\d{2}-\d{2})['"]?/m)?.[1];
  assert.ok(historical&&actual,file);dates.push(historical);
  assert.ok(actual>=historical,file);
  const slug=file.replace(/\.md$/,'');
  assert.ok(collection.includes(`/blog/${slug}/`),file);
  const html=read(`public/blog/${slug}/index.html`);
  assert.ok(html.includes(`Week of <time datetime="${historical}">`),file);
  assert.ok(html.includes(`Published <time datetime="${actual}">`),file);
  const ld=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(ld.datePublished,actual,file);
  assert.equal(ld.dateModified,undefined,file);
  assert.ok(html.includes(`https://aegntic.ai/blog/${slug}/`),file);
  assert.match(html,/Retrospective/);
  assert.doesNotMatch(html,/chatgpt\.com\/c\/|private-provenance|claude\.ai\/chat\//);
 }
 assert.equal(new Set(dates).size,dates.length);
 const indexed=[...collection.matchAll(/Week of <time datetime="(\d{4}-\d{2}-\d{2})"/g)].map(m=>m[1]);
 assert.deepEqual(indexed,[...dates].sort().reverse());
});
test('weekly collection is discoverable without flooding the ordinary feed',()=>{
 const blog=read('public/blog/index.html');
 assert.ok(blog.includes('href="/blog/field-notes/"'));
 assert.ok(!blog.includes('href="/blog/field-notes-'));
 assert.match(read('public/sitemap.xml'),/https:\/\/aegntic.ai\/blog\/field-notes\//);
 for(const file of files)assert.ok(read('public/sitemap.xml').includes(`/blog/${file.replace(/\.md$/,'')}/`));
});
test('weekly source filenames match the represented date and avoid private artifacts',()=>{
 for(const file of files){const source=read(`public/content/blog/${file}`);const date=source.match(/^retrospectiveDate: ['"]?(\d{4}-\d{2}-\d{2})['"]?/m)?.[1];assert.equal(file,`field-notes-${date}.md`);assert.doesNotMatch(source,/chatgpt\.com\/c\/|private-provenance|claude\.ai\/chat\//);}
});

test('complete archive has one entry per week across the requested period',()=>{
 assert.equal(files.length,99);
 const dates=files.map(f=>f.slice(12,-3)).sort();
 for(let i=0;i<99;i++){const expected=new Date(Date.UTC(2024,11,30)+i*7*86400000).toISOString().slice(0,10);assert.equal(dates[i],expected);}
});
