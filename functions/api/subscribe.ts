import type { D1Database, PagesFunction } from '@cloudflare/workers-types';

interface Env {
    DB: D1Database;
    CONTACT_EMAIL_ENABLED?: string;
    SUBSCRIBE_EMAIL_ENABLED?: string;
    CLOUDFLARE_ACCOUNT_ID?: string;
    CLOUDFLARE_EMAIL_API_TOKEN?: string;
}

const OWNER_EMAIL = 'hello@aegntic.ai';
const SENDER_ADDRESS = 'hello@aegntic.ai';
const LEADS_ADDRESS = 'leads@aegntic.ai';
const PRODUCTION_ORIGINS = ['https://don.aegntic.ai', 'https://aegntic.ai', 'https://www.aegntic.ai'];

function json(body: Record<string, string>, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}

function validEmail(email: string): boolean {
    if (!email || email.length > 254 || /[\u0000-\u001F\u007F\s]/.test(email)) return false;
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (!local || local.length > 64 || !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i.test(local)) {
        return false;
    }
    const labels = domain.split('.');
    return labels.length >= 2 && labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]!));
}

function canSendEmail(env: Env, origin: string): boolean {
    const enabled = env.SUBSCRIBE_EMAIL_ENABLED === 'true' || env.CONTACT_EMAIL_ENABLED === 'true';
    return (
        PRODUCTION_ORIGINS.includes(origin) &&
        enabled &&
        Boolean(env.CLOUDFLARE_EMAIL_API_TOKEN) &&
        /^[a-f0-9]{32}$/i.test(env.CLOUDFLARE_ACCOUNT_ID || '')
    );
}

async function sendEmail(
    env: Env,
    payload: {
        from: { address: string; name: string };
        to: string;
        reply_to: string;
        subject: string;
        text: string;
        html: string;
    }
): Promise<boolean> {
    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(4000),
            }
        );
        if (!res.ok) {
            console.error('[subscribe] email-http-failed', { status: res.status });
            return false;
        }
        return true;
    } catch {
        console.error('[subscribe] email-send-error');
        return false;
    }
}

async function notifySubscriberAndOwner(env: Env, email: string, source: string, origin: string): Promise<void> {
    if (!canSendEmail(env, origin)) {
        return;
    }

    const isDon = source.toLowerCase().includes('don');
    const welcomeSubject = isDon
        ? "You're on the Don-Bot Dec 1 drop (Slice 01 + setup guide)"
        : "You're on the aegntic build dispatch";

    const welcomeText = isDon
        ? [
              "You're in for the Don-Bot Slice 01 release on December 1.",
              '',
              'What arrives in your inbox when Slice 01 drops:',
              '- The runnable crash-proof agent starter (resumes from interrupted steps instead of burning tokens twice)',
              '- Quickstart setup guide and walkthrough',
              '- Release notes as Slices 02-05 ship in the open',
              '',
              'Follow the repo or preview the build anytime:',
              '- Repository: https://github.com/aegntic/don-bot',
              '- Build page: https://don.aegntic.ai/',
              '',
              "Quick question (just hit reply): what's the #1 multi-hour coding or ops task you wish you could hand off overnight?",
              '',
              'Mattae Cooper',
              'aegntic.ai',
          ].join('\n')
        : [
              "You're subscribed to aegntic release notes and build dispatches.",
              '',
              '- Site: https://aegntic.ai/',
              '- Don-Bot build: https://don.aegntic.ai/',
              '- GitHub: https://github.com/aegntic',
              '',
              'Hit reply anytime if there is a workflow you want to automate.',
              '',
              'Mattae Cooper',
              'aegntic.ai',
          ].join('\n');

    const welcomeHtml = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#111827;max-width:560px">
${welcomeText
    .split('\n\n')
    .map((block) => `<p style="margin:0 0 14px">${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('')}
</div>`;

    const ownerText = [
        'New Don-Bot / Build Dispatch signup',
        `Email: ${email}`,
        `Source: ${source}`,
        `Timestamp (UTC): ${new Date().toISOString()}`,
    ].join('\n');

    await Promise.all([
        sendEmail(env, {
            from: { address: SENDER_ADDRESS, name: 'Mattae · Don-Bot' },
            to: email,
            reply_to: OWNER_EMAIL,
            subject: welcomeSubject,
            text: welcomeText,
            html: welcomeHtml,
        }),
        sendEmail(env, {
            from: { address: LEADS_ADDRESS, name: 'aegntic signups' },
            to: OWNER_EMAIL,
            reply_to: email,
            subject: isDon ? 'New Don-Bot signup' : 'New build dispatch signup',
            text: ownerText,
            html: `<pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(ownerText)}</pre>`,
        }),
    ]);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const body = (await request.json().catch(() => null)) as { email?: unknown; source?: unknown } | null;
        const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
        const origin = new URL(request.url).origin;
        const rawSource = typeof body?.source === 'string' ? body.source.trim().slice(0, 64) : '';
        const cleanSource = rawSource && /^[a-z0-9._:/-]+$/i.test(rawSource)
            ? rawSource
            : origin === 'https://don.aegntic.ai'
                ? 'don.aegntic.ai'
                : 'website';

        if (!validEmail(rawEmail)) {
            return json({ error: 'Invalid email address' }, 400);
        }

        const existing = await env.DB.prepare('SELECT email FROM subscribers WHERE email = ?')
            .bind(rawEmail)
            .first();

        if (existing) {
            return json({ status: 'exists', message: 'Already subscribed' }, 200);
        }

        await env.DB.prepare(
            'INSERT INTO subscribers (email, source, status, created_at) VALUES (?, ?, ?, ?)'
        )
            .bind(rawEmail, cleanSource, 'active', Math.floor(Date.now() / 1000))
            .run();

        context.waitUntil(notifySubscriberAndOwner(env, rawEmail, cleanSource, origin));

        return json({ status: 'success', message: 'Subscribed successfully' }, 201);
    } catch {
        console.error('[subscribe] handler-failed');
        return json({ error: 'Internal Server Error' }, 500);
    }
};
