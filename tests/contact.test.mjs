import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {test} from 'node:test';
import ts from 'typescript';

// Transpile the real Pages handler with the project's existing TypeScript dependency.
// SQLite executes the actual migration/query text; only outbound email is replaced.
const source = readFileSync(new URL('../functions/api/contact.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext, target:ts.ScriptTarget.ES2022}}).outputText;
const {onRequestPost} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const valid = {
  name:'Local test', email:'local-test@example.com', service:'Agent build',
  message:'A labelled local enquiry. Do not send real email.', system_url:'https://example.com/system',
  source_path:'/agents/', offer_key:'agent-build', company:'', submission_id:'c05a8cb2-8db2-4a60-8f75-2156b91e691b'
};
const emailResponse = result => Response.json({success:true, errors:[], messages:[], result:{delivered:[], queued:[], permanent_bounces:[], ...result}});

function fixture(t, overrides = {}) {
  const sql = new DatabaseSync(':memory:');
  const migrationDir = new URL('../migrations/', import.meta.url);
  for (const name of readdirSync(migrationDir).filter(name => name.endsWith('.sql')).sort()) sql.exec(readFileSync(new URL(name, migrationDir), 'utf8'));
  t.after(() => sql.close());
  const DB = {prepare(query) {return {bind(...values) {return {async first() {return sql.prepare(query).get(...values) ?? null;}, async run() {
    const result = sql.prepare(query).run(...values);
    return {success:true, meta:{last_row_id:Number(result.lastInsertRowid), changes:Number(result.changes)}};
  }}}}}};
  const env = {DB, CONTACT_EMAIL_ENABLED:'true', CLOUDFLARE_ACCOUNT_ID:'a'.repeat(32), CLOUDFLARE_EMAIL_API_TOKEN:'local-test-token', ...overrides};
  t.mock.method(globalThis, 'fetch', async () => {throw new Error('Unexpected outbound request; real network is disabled in these tests');});
  const submit = (body = valid, headers = {}, url = 'https://aegntic.ai/api/contact') => onRequestPost({env, request:new Request(url, {method:'POST', headers:{'Content-Type':'application/json', Origin:new URL(url).origin, ...headers}, body:typeof body === 'string' ? body : JSON.stringify(body)})});
  return {sql, env, submit};
}

test('saves the full enquiry before notifying the fixed owner address', async t => {
  const {sql, submit} = fixture(t);
  let notification;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 1, 'email must follow durable storage');
    assert.equal(url, `https://api.cloudflare.com/client/v4/accounts/${'a'.repeat(32)}/email/sending/send`);
    assert.equal(options.headers.Authorization, 'Bearer local-test-token');
    notification = JSON.parse(options.body);
    return emailResponse({delivered:['hello@aegntic.ai']});
  });
  const response = await submit({...valid, subject:'Untrusted subject', to:'attacker@example.com', name:'  Local test  '});
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {status:'success'});
  const record = sql.prepare('SELECT * FROM messages').get();
  assert.equal(record.name, 'Local test');
  assert.equal(record.service, 'Agent build');
  assert.equal(record.subject, 'Agent build');
  assert.equal(record.source_path, '/agents/');
  assert.equal(record.system_url, 'https://example.com/system');
  assert.equal(record.offer_key, 'agent-build');
  assert.equal(record.status, 'new');
  assert.equal(record.notification_status, 'sent');
  assert.ok(record.created_at > 0);
  assert.equal(notification.to, 'hello@aegntic.ai');
  assert.deepEqual(notification.from, {address:'leads@aegntic.ai', name:'aegntic enquiries'});
  assert.equal(notification.reply_to, 'local-test@example.com');
  assert.match(notification.text, /A labelled local enquiry/);
});

const invalidCases = [
  ['missing name', {...valid, name:''}, 400],
  ['whitespace name', {...valid, name:'   '}, 400],
  ['oversized name', {...valid, name:'n'.repeat(101)}, 400],
  ['malformed email', {...valid, email:'not-an-email'}, 400],
  ['repeated local dots', {...valid, email:'a..b@example.com'}, 400],
  ['repeated domain dots', {...valid, email:'a@example..com'}, 400],
  ['recipient-list suffix', {...valid, email:'a@example.com,invalid'}, 400],
  ['invalid domain label', {...valid, email:'a@-example.com'}, 400],
  ['oversized local part', {...valid, email:`${'a'.repeat(65)}@example.com`}, 400],
  ['header injection', {...valid, email:'a@example.com\r\nBcc: b@example.com'}, 400],
  ['oversized email', {...valid, email:`${'a'.repeat(245)}@example.com`}, 400],
  ['email object', {...valid, email:{}}, 400],
  ['empty message', {...valid, message:''}, 400],
  ['short message', {...valid, message:'too short'}, 400],
  ['padded short message', {...valid, message:'       x       '}, 400],
  ['oversized message', {...valid, message:'x'.repeat(5001)}, 400],
  ['invalid service', {...valid, service:'Agent Failure Review'}, 400],
  ['missing service', {...valid, service:undefined}, 400],
  ['honeypot', {...valid, company:'robot inc'}, 400],
  ['unsafe system URL', {...valid, system_url:'javascript:alert(1)'}, 400],
  ['system credentials', {...valid, system_url:'https://user:secret@example.com/'}, 400],
  ['oversized system URL', {...valid, system_url:`https://example.com/${'x'.repeat(1000)}`}, 400],
  ['external source', {...valid, source_path:'https://attacker.example/'}, 400],
  ['protocol-relative source', {...valid, source_path:'//attacker.example/'}, 400],
  ['query in source', {...valid, source_path:'/agents/?email=person@example.com'}, 400],
  ['fragment in source', {...valid, source_path:'/agents/#person@example.com'}, 400],
  ['unknown offer', {...valid, offer_key:'secret-campaign'}, 400],
  ['mismatched offer', {...valid, offer_key:'internal-tool'}, 400],
  ['missing submission key', {...valid, submission_id:undefined}, 400],
  ['invalid submission key', {...valid, submission_id:'arbitrary-visitor-id'}, 400],
  ['JSON null', 'null', 400],
  ['JSON array', '[]', 400],
  ['malformed JSON', '{', 400],
  ['body over 32 KiB', JSON.stringify({...valid, padding:'x'.repeat(32768)}), 413]
];
for (const [name, body, expected] of invalidCases) test(`rejects ${name} without storing or notifying`, async t => {
  const {sql, submit} = fixture(t);
  const response = await submit(body);
  assert.equal(response.status, expected);
  assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 0);
  assert.equal(globalThis.fetch.mock.calls.length, 0);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
});

for (const [name, headers, expected] of [
  ['wrong content type', {'Content-Type':'text/plain'}, 415],
  ['wrong origin', {Origin:'https://attacker.example'}, 403],
  ['null origin', {Origin:'null'}, 403],
  ['missing origin', {Origin:''}, 403],
  ['cross-site metadata', {'Sec-Fetch-Site':'cross-site'}, 403],
  ['oversized declared body', {'Content-Length':'32769'}, 413]
]) test(`rejects ${name} before persistence`, async t => {
  const {sql, submit} = fixture(t);
  assert.equal((await submit(valid, headers)).status, expected);
  assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 0);
});

test('escapes user content in notification HTML while preserving the plain text enquiry', async t => {
  const {submit} = fixture(t);
  let notification;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {notification = JSON.parse(options.body);return emailResponse({queued:['hello@aegntic.ai']});});
  await submit({...valid, message:'<img src=x onerror=alert(1)> & project notes'});
  assert.ok(notification, 'notification must be attempted after storage');
  assert.doesNotMatch(notification.html, /<img/);
  assert.match(notification.html, /&lt;img/);
  assert.match(notification.text, /<img src=x onerror=alert\(1\)>/);
});

test('distinguishes queued mail from delivered mail', async t => {
  const {sql, submit} = fixture(t);
  t.mock.method(globalThis, 'fetch', async () => emailResponse({queued:['hello@aegntic.ai']}));
  assert.equal((await submit()).status, 200);
  assert.equal(sql.prepare('SELECT * FROM messages').get().notification_status, 'queued');
});

for (const [name, fail] of [
  ['HTTP failure', async () => Response.json({success:false, errors:[{code:10103, message:'private-provider-detail'}]}, {status:401})],
  ['network failure', async () => {throw new Error('private-provider-detail');}],
  ['permanent bounce', async () => emailResponse({permanent_bounces:['hello@aegntic.ai']})],
  ['empty delivery result', async () => emailResponse({})],
  ['unparseable response', async () => new Response('private-provider-detail')]
]) test(`keeps the enquiry and confirms receipt after ${name}`, async t => {
  const {sql, submit} = fixture(t);
  const logs = [];
  t.mock.method(console, 'error', (...args) => logs.push(args));
  t.mock.method(globalThis, 'fetch', fail);
  const response = await submit();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {status:'success'});
  assert.equal(sql.prepare('SELECT * FROM messages').get().notification_status, 'failed');
  assert.ok(logs.length > 0);
  assert.doesNotMatch(JSON.stringify(logs), /private-provider-detail|local-test@example.com|local-test-token/);
});

test('missing notification configuration retains the lead and records failure', async t => {
  const {sql, submit} = fixture(t, {CLOUDFLARE_EMAIL_API_TOKEN:undefined});
  t.mock.method(console, 'error', () => {});
  assert.equal((await submit()).status, 200);
  assert.equal(sql.prepare('SELECT * FROM messages').get().notification_status, 'failed');
  assert.equal(globalThis.fetch.mock.calls.length, 0);
});

test('local hosts cannot send email even if credentials are accidentally configured', async t => {
  const {sql, submit} = fixture(t);
  t.mock.method(console, 'error', () => {});
  assert.equal((await submit(valid, {}, 'http://127.0.0.1:8789/api/contact')).status, 200);
  assert.equal(sql.prepare('SELECT * FROM messages').get().notification_status, 'failed');
  assert.equal(globalThis.fetch.mock.calls.length, 0);
});

test('database failure returns a safe error and never attempts email', async t => {
  const {sql, submit} = fixture(t);
  sql.exec("CREATE TRIGGER fail_insert BEFORE INSERT ON messages BEGIN SELECT RAISE(FAIL, 'private-db-detail'); END;");
  const logs = [];
  t.mock.method(console, 'error', (...args) => logs.push(args));
  const response = await submit();
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /private-db-detail|details/);
  assert.doesNotMatch(JSON.stringify(logs), /private-db-detail/);
  assert.equal(globalThis.fetch.mock.calls.length, 0);
  assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 0);
});

test('notification-status write failure does not invalidate an already stored enquiry', async t => {
  const {sql, submit} = fixture(t);
  sql.exec("CREATE TRIGGER fail_update BEFORE UPDATE ON messages BEGIN SELECT RAISE(FAIL, 'private-db-detail'); END;");
  t.mock.method(console, 'error', () => {});
  t.mock.method(globalThis, 'fetch', async () => emailResponse({delivered:['hello@aegntic.ai']}));
  assert.equal((await submit()).status, 200);
  assert.equal(sql.prepare('SELECT * FROM messages').get().notification_status, 'pending');
});

test('the additive migration preserves historical content without inventing notification delivery', () => {
  const sql = new DatabaseSync(':memory:');
  try {
    sql.exec(readFileSync(new URL('../migrations/0002_create_messages.sql', import.meta.url), 'utf8'));
    sql.prepare('INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)').run('Existing', 'existing@example.com', 'Original subject', 'Original message', 1000);
    sql.exec(readFileSync(new URL('../migrations/0003_enquiry_context.sql', import.meta.url), 'utf8'));
    const record = sql.prepare('SELECT * FROM messages').get();
    assert.equal(record.id, 1);
    assert.equal(record.subject, 'Original subject');
    assert.equal(record.message, 'Original message');
    assert.equal(record.created_at, 1000);
    assert.equal(record.service, null);
    assert.equal(record.notification_status, 'not_requested');
  } finally {sql.close();}
});

for (const [service, offer] of [['Workflow automation','workflow-automation'], ['Internal tool','internal-tool'], ['Something else','something-else']]) {
  test(`accepts ${service} with an omitted optional URL and Unicode message`, async t => {
    const {sql, submit} = fixture(t);
    t.mock.method(globalThis, 'fetch', async () => emailResponse({delivered:['hello@aegntic.ai']}));
    const response = await submit({...valid, service, offer_key:offer, system_url:undefined, message:'请帮我连接这些工作流程，并保留明确的人工审核。'});
    assert.equal(response.status, 200);
    const record = sql.prepare('SELECT * FROM messages').get();
    assert.equal(record.service, service);
    assert.equal(record.system_url, '');
    assert.equal(record.message, '请帮我连接这些工作流程，并保留明确的人工审核。');
  });
}

test('the byte limit applies even when Content-Length understates the stream', async t => {
  const {sql, submit} = fixture(t);
  const response = await submit({...valid, padding:'界'.repeat(11000)}, {'Content-Length':'100'});
  assert.equal(response.status, 413);
  assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 0);
});

test('an email timeout confirms durable receipt within the browser retry window', async t => {
  const {sql, submit} = fixture(t);
  t.mock.method(console, 'error', () => {});
  t.mock.method(globalThis, 'fetch', (_url, options) => new Promise((resolve, reject) => {
    const late = setTimeout(() => resolve(emailResponse({delivered:['hello@aegntic.ai']})), 12000);
    options.signal.addEventListener('abort', () => {clearTimeout(late);reject(options.signal.reason);}, {once:true});
  }));
  const started = Date.now();
  assert.equal((await submit()).status, 200);
  assert.ok(Date.now() - started < 8000, 'notification must not consume the whole client timeout');
  assert.equal(sql.prepare('SELECT * FROM messages').get().notification_status, 'failed');
});

test('a retry of the same submission returns receipt without another row or email', async t => {
  const {sql, submit} = fixture(t);
  t.mock.method(globalThis, 'fetch', async () => emailResponse({delivered:['hello@aegntic.ai']}));
  assert.equal((await submit()).status, 200);
  assert.equal((await submit()).status, 200);
  assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 1);
  assert.equal(globalThis.fetch.mock.calls.length, 1);
});

test('a concurrent retry cannot double-send the same saved submission', async t => {
  const {sql, submit} = fixture(t);
  t.mock.method(globalThis, 'fetch', async () => emailResponse({queued:['hello@aegntic.ai']}));
  const replies = await Promise.all([submit(), submit()]);
  assert.deepEqual(replies.map(response => response.status), [200, 200]);
  assert.equal(sql.prepare('SELECT count(*) AS n FROM messages').get().n, 1);
  assert.equal(globalThis.fetch.mock.calls.length, 1);
});

test('the same submission key cannot acknowledge different message content', async t => {
  const {sql, submit} = fixture(t);
  t.mock.method(globalThis, 'fetch', async () => emailResponse({delivered:['hello@aegntic.ai']}));
  await submit();
  assert.equal((await submit({...valid, message:'This is a different project and must not be silently discarded.'})).status, 409);
  assert.equal(sql.prepare('SELECT * FROM messages').get().message, valid.message);
  assert.equal(globalThis.fetch.mock.calls.length, 1);
});
