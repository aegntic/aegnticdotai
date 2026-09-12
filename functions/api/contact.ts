import type { D1Database, PagesFunction } from '@cloudflare/workers-types';

interface Env {
    DB: D1Database;
    CONTACT_EMAIL_ENABLED?: string;
    CLOUDFLARE_ACCOUNT_ID?: string;
    CLOUDFLARE_EMAIL_API_TOKEN?: string;
}

interface Enquiry {
    name: string;
    email: string;
    service: string;
    message: string;
    system_url: string;
    source_path: string;
    offer_key: string;
    submission_id: string;
}

const MAX_BYTES = 32768;
const RECIPIENT = 'hello@aegntic.ai';
const OFFERS: Record<string, string> = {
    'Agent build': 'agent-build',
    'Workflow automation': 'workflow-automation',
    'Internal tool': 'internal-tool',
    'Something else': 'something-else',
};
type NotificationStatus = 'sent' | 'queued' | 'failed';

function json(body: Record<string, string>, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
}

function validEmail(email: string): boolean {
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (!local || local.length > 64 || !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i.test(local)) return false;
    const labels = domain.split('.');
    return labels.length >= 2 && labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

function validate(input: unknown): Enquiry | null {
    if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
    const data = input as Record<string, unknown>;
    const limits: Record<string, [number, number]> = {
        name: [1, 100], email: [3, 254], service: [1, 40], message: [10, 5000],
        system_url: [0, 1000], source_path: [1, 240], offer_key: [1, 40],
        submission_id: [36, 36],
    };
    const fields: Record<string, string> = {};
    for (const [key, [min, max]] of Object.entries(limits)) {
        const value = data[key] ?? (key === 'system_url' ? '' : null);
        if (typeof value !== 'string' || value.length > max) return null;
        fields[key] = value.trim();
        if (fields[key].length < min || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)) return null;
    }
    if (data.company !== undefined && (typeof data.company !== 'string' || data.company.trim())) return null;
    if (!Object.hasOwn(OFFERS, fields.service) || fields.offer_key !== OFFERS[fields.service]) return null;
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(fields.submission_id)) return null;
    if (/[\r\n\t]/.test(fields.name) || !validEmail(fields.email)) return null;
    // Context contains an internal route only, never a URL, query string or fragment.
    if (!/^\/(?:[a-z0-9_-]+\/)*[a-z0-9_.-]*$/i.test(fields.source_path) || fields.source_path.includes('..')) return null;
    if (fields.system_url) {
        try {
            const url = new URL(fields.system_url);
            if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || /\s/.test(fields.system_url)) return null;
        } catch { return null; }
    }
    return fields as unknown as Enquiry;
}

async function readBody(request: Request): Promise<string | null> {
    if (Number(request.headers.get('Content-Length')) > MAX_BYTES) return null;
    if (!request.body) return '';
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > MAX_BYTES) {
                await reader.cancel();
                return null;
            }
            chunks.push(value);
        }
    } finally { reader.releaseLock(); }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(bytes);
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));
}

async function notifyOwner(env: Env, enquiry: Enquiry, id: number, origin: string): Promise<NotificationStatus> {
    // Preview bindings must never send real email, even if secrets were copied accidentally.
    if (!['https://aegntic.ai', 'https://www.aegntic.ai'].includes(origin) || env.CONTACT_EMAIL_ENABLED !== 'true' ||
        !env.CLOUDFLARE_EMAIL_API_TOKEN || !/^[a-f0-9]{32}$/i.test(env.CLOUDFLARE_ACCOUNT_ID || '')) {
        console.error('[contact] notification-unconfigured-or-preview', { id });
        return 'failed';
    }
    const text = [
        `Enquiry #${id}: ${enquiry.service}`, `Name: ${enquiry.name}`, `Reply to: ${enquiry.email}`,
        `Source: ${enquiry.source_path}`, `System: ${enquiry.system_url || 'Not supplied'}`, '', enquiry.message,
    ].join('\n');
    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: { address: 'leads@aegntic.ai', name: 'aegntic enquiries' }, to: RECIPIENT,
                reply_to: enquiry.email, subject: `Enquiry #${id}: ${enquiry.service}`,
                text, html: `<pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(text)}</pre>`,
            }),
            signal: AbortSignal.timeout(4000),
        });
        if (!response.ok) {
            console.error('[contact] notification-http-failed', { id, status: response.status });
            return 'failed';
        }
        const data = await response.json() as { success?: boolean; result?: { delivered?: unknown; queued?: unknown; permanent_bounces?: unknown } };
        const hasRecipient = (list: unknown) => Array.isArray(list) && list.includes(RECIPIENT);
        if (data.success && !hasRecipient(data.result?.permanent_bounces)) {
            if (hasRecipient(data.result?.delivered)) return 'sent';
            if (hasRecipient(data.result?.queued)) return 'queued';
        }
        console.error('[contact] notification-not-accepted', { id });
    } catch {
        // Never log request content, addresses, credentials or raw provider/database errors.
        console.error('[contact] notification-unconfirmed', { id });
    }
    return 'failed';
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    const origin = new URL(request.url).origin;
    if (request.headers.get('Origin') !== origin || request.headers.get('Sec-Fetch-Site') === 'cross-site') {
        return json({ error: 'Please submit this form from the site.' }, 403);
    }
    if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
        return json({ error: 'JSON content is required.' }, 415);
    }
    let enquiry: Enquiry | null;
    try {
        const body = await readBody(request);
        if (body === null) return json({ error: 'The enquiry is too large.' }, 413);
        enquiry = validate(JSON.parse(body));
    } catch { return json({ error: 'The enquiry could not be read.' }, 400); }
    if (!enquiry) return json({ error: 'Please check the enquiry fields.' }, 400);

    let id: number;
    try {
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(enquiry)));
        const payloadHash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
        const result = await env.DB.prepare(
            'INSERT INTO messages (name, email, subject, message, created_at, service, source_path, system_url, offer_key, status, notification_status, submission_id, payload_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(submission_id) DO NOTHING'
        ).bind(enquiry.name, enquiry.email, enquiry.service, enquiry.message, Math.floor(Date.now() / 1000),
            enquiry.service, enquiry.source_path, enquiry.system_url, enquiry.offer_key, 'new', 'pending', enquiry.submission_id, payloadHash).run();
        if (!result.success) throw new Error('write-failed');
        if (result.meta.changes === 0) {
            const existing = await env.DB.prepare('SELECT payload_hash FROM messages WHERE submission_id = ?').bind(enquiry.submission_id).first<{ payload_hash: string }>();
            if (!existing) throw new Error('receipt-not-found');
            return existing.payload_hash === payloadHash ? json({ status: 'success' }) : json({ error: 'This submission key belongs to another draft. Please update the form and retry.' }, 409);
        }
        id = result.meta.last_row_id;
    } catch {
        console.error('[contact] persistence-failed');
        return json({ error: 'Receipt could not be confirmed. Please keep your draft and try again.' }, 503);
    }

    const notification = await notifyOwner(env, enquiry, id, origin);
    try {
        const result = await env.DB.prepare('UPDATE messages SET notification_status = ? WHERE id = ?').bind(notification, id).run();
        if (!result.success || result.meta.changes !== 1) throw new Error('status-write-failed');
    } catch { console.error('[contact] notification-status-write-failed', { id, status: notification }); }
    // Receipt means the enquiry is stored, not that an email was delivered.
    return json({ status: 'success' });
};
