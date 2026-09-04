# Enquiry delivery

Local implementation, not a verified production rollout. The frontend and API ship together. The old production form's four-field payload does not meet this API's new contract; do not deploy the endpoint alone.

## Contract and ownership

`public/enquiry.js` owns the shared dialog. `functions/api/contact.ts` validates and stores a submission, then attempts one notification. Migrations `0003_enquiry_context.sql` and `0004_enquiry_retry_key.sql` add context and safe-retry fields without changing existing content. A normal site maintainer can operate these files without a new framework or service abstraction.

The business purpose is to retain enquiries and their context for a useful reply. No increase in conversions is claimed. The handler does not add browsing analytics, tracking cookies, persistent visitor IDs, IP addresses or user-agent records. Anonymous funnel events from the earlier proposal are not implemented in this pass.

Required JSON fields:

| Field | Constraint |
| --- | --- |
| `name` | 1–100 characters after trimming; raw input at most 100 |
| `email` | ASCII/punycode address, at most 254 characters; local part at most 64; no empty dot segments or invalid domain labels. Syntax checking does not verify mailbox ownership. |
| `service` | Agent build / Workflow automation / Internal tool / Something else |
| `message` | 10–5,000 characters after trimming; raw input at most 5,000 |
| `system_url` | Optional HTTP(S) URL, at most 1,000 characters, no embedded credentials |
| `source_path` | Internal path only, at most 240 characters; no query, fragment, encoded path or external URL |
| `offer_key` | The selected service in lowercase kebab-case; must match `service` |
| `company` | Honeypot; omitted or empty |
| `submission_id` | Random UUID v4 for this draft only; unchanged retries reuse it |

The body is limited to 32 KiB by counting actual bytes, not trusting Content-Length. The request must be JSON and have an Origin equal to the receiving origin. Cross-site Fetch Metadata is rejected. The server derives the subject from the service; submitted recipient/subject overrides have no effect. Origin checks and a honeypot are not a complete bot/rate-limit solution. No Turnstile was requested.

## Durable receipt

1. Validate; invalid submissions do not touch D1 or email.
2. Insert the complete enquiry with `status=new`, `notification_status=pending`.
3. Attempt email only for the exact HTTPS production origins, with explicit email enablement and configured credentials. Local/staging origins never send.
4. Mark `sent` when the provider reports immediate delivery, `queued` when accepted for later delivery, or `failed` on rejection, timeout, missing configuration or preview mode.
5. Return `{ "status": "success" }` because D1 holds the enquiry. This does not assert email delivery.

Email uses a fixed sender `leads@aegntic.ai`, fixed recipient `hello@aegntic.com`, and the validated visitor email as Reply-To. User content is escaped in the HTML part, preserved in the plain-text part. The request has a four-second timeout; there is no automatic retry after an ambiguous provider response. Logs contain reason codes, internal lead ID, and HTTP/status values—not enquiry content, credentials or raw errors.

If the status update fails after storage, the visitor still receives confirmation; `pending` remains a reconciliation signal. If initial persistence fails, return a safe 503 and never attempt email. The browser keeps a random submission key in page memory for an unchanged draft. D1 enforces uniqueness; repeated or concurrent submissions with the same key and content return the saved receipt without another row or email. Reusing the key for different content returns 409. Editing a failed draft creates a new key. The key is not reused across unrelated enquiries or stored in browser storage; it is not a visitor identifier. A SHA-256 content checksum protects against silently acknowledging a different payload. Closing/reloading the page loses the in-memory key, so this is retry safety within the open form, not global content deduplication.

## Local checks

Requirements: Node 26+ for the test-only built-in SQLite module and the project's existing TypeScript dependency (`npm ci`). Wrangler is not a project dependency. Use the pinned npm-exec command below; it downloads Wrangler 4.129.0 into npm's tool cache when missing, without altering package.json or requiring a global install. Initial setup needs network access. No production secrets are required.

```sh
npm ci
npx --yes wrangler@4.129.0 --version
node --test tests/contact.test.mjs tests/enquiry-submit.test.mjs
npx --no-install tsc --noEmit --skipLibCheck --target ES2022 --module ESNext --moduleResolution bundler --lib ES2022 --types @cloudflare/workers-types functions/api/contact.ts
npm run build
```

The server suite invokes the real handler and runs real SQLite migrations and queries. Only the external email request is replaced. The frontend request tests execute the complete script with a minimal test-only DOM boundary and replaced fetch; they verify payload/state handling, not visual layout, focus semantics or live deliverability. Those remain separate browser/production checks.

For a local Cloudflare-runtime check, create an isolated database and keep its printed path:

```sh
mktemp -d /tmp/aegntic-contact-local.XXXXXX
```

Replace `TEST_DIRECTORY` below with that exact path. Do not use `--remote` or a normal development/production database. The integration script intentionally rejects non-temporary paths and uses only port 8789.

```sh
npx --yes wrangler@4.129.0 d1 migrations apply aegntic-db --local --persist-to TEST_DIRECTORY
npx --yes wrangler@4.129.0 pages dev dist --ip 127.0.0.1 --port 8789 --persist-to TEST_DIRECTORY --binding CONTACT_EMAIL_ENABLED=false
```

In another terminal:

```sh
node tests/contact-local.mjs TEST_DIRECTORY
```

This stores a labelled synthetic local enquiry, tests invalid HTTP requests, inspects the D1 record, and temporarily creates/removes a failure trigger inside that disposable database. It sends no email. The normal HTML preview still refuses to POST even to this local API; the integration script is deliberately opt-in.

## Production gates—not completed

1. Owner approves the visual/form release. Do not push the redesign to main as an authentication workaround.
2. Restore Cloudflare authorization; verify `aegntic-ai` Pages bindings and `aegntic-db` D1 target against current account state.
3. Verify sender-domain onboarding and the intended receiving mailbox/destination. Inspect Email Service domain settings; do not enable DNS or assume destination approval implicitly.
4. Apply both additive migrations to the verified production database before deploying the paired frontend/API. Keep the previous Pages deployment available for rollback; old messages are not rewritten.
5. Configure server-only Pages values: `CLOUDFLARE_ACCOUNT_ID`, encrypted secret `CLOUDFLARE_EMAIL_API_TOKEN` with minimum email-send permission, and `CONTACT_EMAIL_ENABLED=true` for production only. Never put the token in HTML, client env variables or committed files.
6. Deploy, then request explicit confirmation before one labelled production enquiry. Confirm the D1 record and actual mailbox notification; a `queued` API response alone is not proof of inbox receipt.

Operational protection also needs a release decision: same-origin checks can be spoofed by non-browser clients. Existing Cloudflare edge rate-limit/WAF settings are unverified while authorization is unavailable. Do not claim spam resistance or silently add IP storage, Turnstile or new paid rules; confirm the acceptable edge protection with the owner before public release.

Official API contract: [Cloudflare Email Service REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/). `from` uses `address`, Reply-To uses `reply_to`, and responses distinguish delivered, queued and permanent bounces. Checked 2026-09-05. Pages uses REST here, not a native email binding.

## Reconciliation

These are operator queries, not an admin dashboard. Use only an authorized D1 session. Start with metadata to avoid unnecessarily displaying personal data:

```sql
SELECT id, service, source_path, status, notification_status,
       datetime(created_at, 'unixepoch') AS submitted_at
FROM messages
WHERE notification_status IN ('failed', 'pending', 'queued')
ORDER BY created_at DESC;
```

`failed` means notification receipt was not confirmed, not necessarily that no email left the provider. `queued` is not final delivery. Inspect Email Service logs/mailbox before any manual resend; an ambiguous timeout may already have sent the message. There is no unattended retry worker in this version. Existing rows are marked `not_requested` and are not silently emailed.

Enquiry counts—not visitors:

```sql
SELECT service, count(*) AS enquiries
FROM messages
WHERE service IS NOT NULL
GROUP BY service;
```

Privacy text describes the new enquiry fields and email copy. Confirm the site's broader retention and legal-policy commitments before release; this implementation does not add automatic deletion, a legal compliance certification, or an unsubscribe system.
