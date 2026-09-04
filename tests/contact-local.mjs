// Opt-in integration check: local Wrangler only, using a disposable D1 directory.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {basename, resolve} from 'node:path';

const persistence = resolve(process.argv[2] || '');
assert.match(basename(persistence), /^aegntic-contact-local\.[a-zA-Z0-9]+$/, 'Use a fresh mktemp -d /tmp/aegntic-contact-local.XXXXXX directory');
assert.equal(persistence.startsWith('/tmp/'), true, 'This check must not operate on a normal development database');
const origin = 'http://127.0.0.1:8789';
const marker = `LOCAL ONLY ${crypto.randomUUID()}`;
const body = {name:'Local integration test', email:'local-test@example.com', service:'Workflow automation', offer_key:'workflow-automation', source_path:'/projects/', system_url:'https://example.com/local-test', message:`${marker}: verify durable receipt without sending email.`, company:'', submission_id:crypto.randomUUID()};
const query = sql => JSON.parse(execFileSync('npx', ['--yes', 'wrangler@4.129.0', 'd1', 'execute', 'aegntic-db', '--local', '--persist-to', persistence, '--command', sql, '--json'], {encoding:'utf8'}));
const post = (payload, headers = {}) => fetch(`${origin}/api/contact`, {method:'POST', headers:{Origin:origin, 'Content-Type':'application/json', ...headers}, body:typeof payload === 'string' ? payload : JSON.stringify(payload)});

for (const [label, payload, headers, expected] of [
  ['valid', body, {}, 200],
  ['safe retry', body, {}, 200],
  ['conflicting retry', {...body, message:'Different content using a previously saved key.'}, {}, 409],
  ['email', {...body, email:'invalid'}, {}, 400],
  ['name', {...body, name:''}, {}, 400],
  ['short message', {...body, message:'short'}, {}, 400],
  ['oversized field', {...body, message:'x'.repeat(5001)}, {}, 400],
  ['service', {...body, service:'Audit'}, {}, 400],
  ['honeypot', {...body, company:'spam'}, {}, 400],
  ['origin', body, {Origin:'https://attacker.example'}, 403],
  ['content type', body, {'Content-Type':'text/plain'}, 415],
  ['malformed JSON', '{', {}, 400],
  ['body bytes', {...body, padding:'x'.repeat(32768)}, {}, 413],
]) {
  const response = await post(payload, headers);
  assert.equal(response.status, expected, label);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  const data = await response.json();
  if (expected === 200) assert.deepEqual(data, {status:'success'});
  else assert.equal(typeof data.error, 'string');
  assert.equal(data.details, undefined);
  console.log(`PASS local HTTP ${label}: ${expected}`);
}

const records = query(`SELECT service, source_path, system_url, status, notification_status FROM messages WHERE message LIKE '${marker}%'`)[0].results;
assert.equal(records.length, 1, 'invalid requests must not add records');
assert.deepEqual(records[0], {service:'Workflow automation', source_path:'/projects/', system_url:'https://example.com/local-test', status:'new', notification_status:'failed'});
console.log('PASS local D1: one stored enquiry, correct context, no email sent');

query("CREATE TRIGGER local_contact_fail BEFORE INSERT ON messages BEGIN SELECT RAISE(FAIL, 'private-local-test-error'); END;");
try {
  const response = await post(body);
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /private-local-test-error|details/);
  console.log('PASS local D1 failure: safe 503, no false receipt');
} finally {
  // The trigger exists only inside the disposable test database.
  query('DROP TRIGGER local_contact_fail');
}
