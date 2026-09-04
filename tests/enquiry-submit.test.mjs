import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

// Runs the complete browser script for request/state tests. This minimal DOM boundary
// supplies form fields, not layout/focus behavior (those require the browser checks).
const source = readFileSync(new URL('../public/enquiry.js', import.meta.url), 'utf8');
function surface(hostname = 'aegntic.ai') {
  const fields = Object.fromEntries(Object.entries({name:'Local test', email:'test@example.com', service:'Agent build', message:'A sufficiently detailed project brief.', system_url:'', company:'', source_path:'/agents/', offer_key:'agent-build'}).map(([name, value]) => [name, {
    value, required:['name','email','message'].includes(name), disabled:false, readOnly:false,
    checkValidity:() => true, removeAttribute(){}, setAttribute(){}, focus(){}, addEventListener(){}
  }]));
  const status = {textContent:''};
  const submit = {textContent:'Send enquiry', disabled:false};
  const handlers = {};
  const form = {elements:fields, querySelectorAll:() => [], addEventListener:(type, callback) => {handlers[type] = callback;}};
  const dialog = {setAttribute(){}, addEventListener(){}, querySelector:selector => ({form, '.ae-enquiry-status':status, '[type="submit"]':submit, '.ae-enquiry-close':{addEventListener(){}}})[selector]};
  const document = {getElementById:() => null, createElement:() => dialog, body:{append(){}}, addEventListener(){}};
  const requests = [];
  const replies = [];
  const context = {document, location:{hostname, protocol:'https:', pathname:'/agents/'}, crypto, AbortSignal, Event,
    fetch:async (_url, options) => {requests.push(JSON.parse(options.body));return replies.shift()();}};
  vm.runInNewContext(source, context);
  return {fields, requests, replies, status, submit:() => handlers.submit({preventDefault(){}})};
}

test('a failed request keeps the same per-submission key on unchanged retry', async () => {
  const form = surface();
  form.replies.push(() => {throw new Error('lost response');}, () => Response.json({status:'success'}));
  await form.submit();
  await form.submit();
  assert.equal(form.requests.length, 2);
  assert.match(form.requests[0].submission_id || '', /^[a-f0-9-]{36}$/);
  assert.equal(form.requests[1].submission_id, form.requests[0].submission_id);
});

test('editing a failed draft creates a new submission key', async () => {
  const form = surface();
  form.replies.push(() => {throw new Error('lost response');}, () => Response.json({status:'success'}));
  await form.submit();
  form.fields.message.value = 'An updated project with different context.';
  await form.submit();
  assert.notEqual(form.requests[0].submission_id, form.requests[1].submission_id);
});

test('in-flight fields cannot drift from the request being acknowledged', async () => {
  const form = surface();
  let finish;
  form.replies.push(() => new Promise(resolve => {finish = resolve;}));
  const pending = form.submit();
  assert.equal(form.fields.message.readOnly, true);
  assert.equal(form.fields.service.disabled, true);
  finish(Response.json({error:'temporarily unavailable'}, {status:503}));
  await pending;
  assert.equal(form.fields.message.readOnly, false);
  assert.equal(form.fields.service.disabled, false);
});

test('preview hosts never create or send a submission', async () => {
  const form = surface('127.0.0.1');
  await form.submit();
  assert.equal(form.requests.length, 0);
  assert.match(form.status.textContent, /Nothing was sent or saved/);
});
