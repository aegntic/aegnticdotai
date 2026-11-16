import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/premium-nav.js', import.meta.url), 'utf8');
const controller = source.slice(source.indexOf('    // Blog reading'), source.lastIndexOf('\n  }'));
function fixture(path = '/blog/example/') {
  const element = tag => ({tagName:tag,children:[],offsetHeight:94,scrollTop:0,listeners:{},attrs:{},classList:{values:new Set(),contains(v){return this.values.has(v);},toggle(v,on){if(on){this.values.add(v);}else{this.values.delete(v);}},add(v){this.values.add(v);}},append(el){this.children.push(el);},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){this.listeners[k]=f;},contains(el){return this.children.includes(el);}});
  const nav=element('HEADER'),menu=element('NAV'),main=element('MAIN'),footer=element('FOOTER'),script=element('SCRIPT'),dialog=element('DIALOG'),trigger=element('BUTTON');
  nav.children.push(trigger);
  const body=element('BODY');body.children=[nav,menu,main,footer,script,dialog];
  let viewport, now=1000;
  const document={body,activeElement:null,documentElement:{style:{setProperty(){}}},querySelector:()=>nav,createElement:()=>viewport=element('DIV'),getElementById:()=>null};
  const window={scrollY:0,listeners:{},addEventListener(k,f){this.listeners[k]=f;}};
  trigger.getAttribute=()=>trigger.attrs.expanded||'false';
  const ctx={document,window,location:{pathname:path,hash:''},menu,trigger,reduced:{matches:false},performance:{now:()=>now},requestAnimationFrame:f=>{f();return 0;},ResizeObserver:class{observe(){}}};
  vm.runInNewContext(controller,ctx);
  const scroll=y=>{now+=300;(viewport||window)[viewport?'scrollTop':'scrollY']=y;(viewport||window).listeners.scroll();};
  return {nav,body,viewport,main,footer,dialog,script,trigger,document,scroll,hidden:()=>nav.classList.contains('is-hidden')};
}
test('all header controls hide down and return up; top is always available',()=>{const f=fixture();f.scroll(200);assert.ok(f.hidden());f.scroll(180);assert.ok(!f.hidden());f.scroll(250);assert.ok(f.hidden());f.scroll(0);assert.ok(!f.hidden());});
test('article and footer share separate viewport; dialogs remain outside',()=>{const f=fixture();assert.deepEqual(f.viewport.children,[f.main,f.footer]);assert.ok(!f.viewport.children.includes(f.dialog));assert.ok(!f.viewport.children.includes(f.script));});
test('open menu and keyboard focus keep header visible',()=>{const f=fixture();f.trigger.attrs.expanded='true';f.scroll(200);assert.ok(!f.hidden());f.trigger.attrs.expanded='false';f.document.activeElement=f.trigger;f.body.classList.add('ae-keyboard');f.scroll(300);assert.ok(!f.hidden());});
test('small scroll jitter does not toggle; nonblog window scroller is preserved',()=>{const f=fixture('/');assert.equal(f.viewport,undefined);f.scroll(200);assert.ok(f.hidden());f.scroll(197);assert.ok(f.hidden());f.scroll(190);assert.ok(!f.hidden());});
test('header and reading viewport use identical transition; reduced motion supported',()=>{const css=readFileSync(new URL('../public/premium-nav.css',import.meta.url),'utf8');assert.match(css,/transition:transform \.22s var\(--ae-ease\)/);assert.match(css,/transition:top \.22s var\(--ae-ease\)/);assert.match(css,/inset:var\(--ae-header-height\) 0 0/);assert.match(css,/\.ae-global-nav,\.ae-reading-viewport\{transition:none!important\}/);});
