interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const { email, source } = await request.json() as { email: string; source: string };

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email address' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check if email ALREADY exists
        const existing = await env.DB.prepare('SELECT email FROM subscribers WHERE email = ?').bind(email).first();

        if (existing) {
            return new Response(JSON.stringify({ status: 'exists', message: 'Already subscribed' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Insert new subscriber
        await env.DB.prepare(
            'INSERT INTO subscribers (email, source, status, created_at) VALUES (?, ?, ?, ?)'
        ).bind(email, source || 'website', 'active', Math.floor(Date.now() / 1000)).run();

        return new Response(JSON.stringify({ status: 'success', message: 'Subscribed successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Subscription error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
