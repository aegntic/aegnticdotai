/**
 * Aegntic.ai Agentic Email Worker
 * Handles incoming mail, filters spam, and forwards to primary inbox.
 */

export default {
    async email(message, env, ctx) {
        const from = message.from;
        const to = message.to;
        const subject = message.headers.get("subject") || "(No Subject)";

        // 1. SPAM FILTERING (SPF, DKIM, DMARC)
        // Cloudflare adds authentication headers automatically.
        const spf = message.headers.get("x-test-spf") || "none";
        const dkim = message.headers.get("x-test-dkim") || "none";
        const dmarc = message.headers.get("x-test-dmarc") || "none";

        console.log(`[Aegntic Mail] Inbound: From: ${from} | To: ${to} | Subject: ${subject}`);
        console.log(`[Security] SPF: ${spf} | DKIM: ${dkim} | DMARC: ${dmarc}`);

        // If SPF and DKIM both fail, it's likely high-confidence spam.
        if (spf === "fail" && dkim === "fail") {
            console.warn(`[Blocked] Rejecting potential spam from ${from}`);
            message.setReject("Spam detected or authentication failed.");
            return;
        }

        // 2. AGENTIC HOOK (Placeholder)
        // Here is where you would call an AI API (like Gemini/Vertex AI) 
        // to analyze the 'message.raw' and generate an auto-summary or response.
        // Example: const analysis = await analyzeEmailWithAI(message.raw);

        // 3. SECURE FORWARDING
        // Change this to your actual personal email address!
        const DESTINATION_EMAIL = "your-personal-email@gmail.com";

        try {
            await message.forward(DESTINATION_EMAIL);
            console.log(`[Success] Forwarded email to ${DESTINATION_EMAIL}`);
        } catch (e) {
            console.error(`[Error] Forwarding failed: ${e.message}`);
            // Fallback: don't reject if forwarding fails initially
        }
    }
};
