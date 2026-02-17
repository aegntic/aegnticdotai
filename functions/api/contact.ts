import { PagesFunction } from '@cloudflare/workers-types';

interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    try {
        const { name, email, subject, message } = await request.json() as {
            name: string;
            email: string;
            subject: string;
            message: string;
        };

        if (!email || !message) {
            return new Response(JSON.stringify({ error: 'Email and message are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Insert new message
        await env.DB.prepare(
            'INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)'
        ).bind(name || '', email, subject || 'General Inquiry', message, Math.floor(Date.now() / 1000)).run();

        return new Response(JSON.stringify({ status: 'success' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Server error', details: error instanceof Error ? error.message : String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
