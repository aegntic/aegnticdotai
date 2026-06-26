import { createCanvas } from 'canvas';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const W = 1280;
const H = 720;

// Palette
const BG = '#faf9f6';
const ELEVATED = '#f0eeea';
const RULE = '#ddd9d0';
const TEXT = '#1a1a18';
const TEXT_SEC = '#6b6860';
const TEXT_TER = '#a09a8e';
const ACCENT = '#1a1a18';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'assets', 'projects');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const save = (name, draw) => {
    const c = createCanvas(W, H);
    const ctx = c.getContext('2d');
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    draw(ctx);
    const buf = c.toBuffer('image/png');
    writeFileSync(join(OUT, name), buf);
    console.log(`  ✓ ${name}`);
};

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function drawCard(ctx, x, y, w, h, opts = {}) {
    const { label, sub, tag, filled } = opts;
    roundRect(ctx, x, y, w, h, 2);
    ctx.fillStyle = filled ? ELEVATED : 'transparent';
    ctx.fill();
    ctx.strokeStyle = RULE;
    ctx.lineWidth = 1;
    ctx.stroke();

    if (tag) {
        const tw = ctx.measureText(tag).width + 16;
        roundRect(ctx, x + 12, y + 12, tw, 20, 1);
        ctx.fillStyle = BG;
        ctx.fill();
        ctx.fillStyle = TEXT_TER;
        ctx.font = '500 9px system-ui, sans-serif';
        ctx.fillText(tag, x + 20, y + 26);
    }

    if (label) {
        ctx.fillStyle = TEXT;
        ctx.font = '400 14px Georgia, serif';
        ctx.fillText(label, x + 16, y + (sub ? 44 : h / 2 + 5));
    }

    if (sub) {
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 11px system-ui, sans-serif';
        ctx.fillText(sub, x + 16, y + 62);
    }
}

function drawBar(ctx, x, y, w, pct, color) {
    roundRect(ctx, x, y, w, 6, 2);
    ctx.fillStyle = ELEVATED;
    ctx.fill();
    if (pct > 0) {
        roundRect(ctx, x, y, w * pct, 6, 2);
        ctx.fillStyle = color || TEXT;
        ctx.fill();
    }
}

function drawDot(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color || TEXT_TER;
    ctx.fill();
}

function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color || RULE;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawArrow(ctx, x1, y1, x2, y2) {
    drawLine(ctx, x1, y1, x2, y2, TEXT_TER);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const s = 6;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - s * Math.cos(angle - 0.4), y2 - s * Math.sin(angle - 0.4));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - s * Math.cos(angle + 0.4), y2 - s * Math.sin(angle + 0.4));
    ctx.strokeStyle = TEXT_TER;
    ctx.lineWidth = 1;
    ctx.stroke();
}

// ── CLDCDE ──
save('cldcde-preview.png', (ctx) => {
    // Search bar
    roundRect(ctx, 80, 60, W - 160, 36, 2);
    ctx.strokeStyle = RULE; ctx.stroke();
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 11px system-ui, sans-serif';
    ctx.fillText('Search extensions...', 96, 83);
    drawDot(ctx, W - 120, 78, 4, TEXT_TER);

    // Plugin grid 3x2
    const plugins = [
        { n: 'clawreform-sync', t: 'Plugin' },
        { n: 'memory-hooks', t: 'Plugin' },
        { n: 'mcp-bridge', t: 'MCP' },
        { n: 'auto-deploy', t: 'Workflow' },
        { n: 'prologue-bind', t: 'Skill' },
        { n: 'audit-pack', t: 'Pack' },
    ];
    const cw = (W - 240) / 3;
    const ch = 180;
    plugins.forEach((p, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 80 + col * (cw + 20);
        const y = 130 + row * (ch + 20);
        drawCard(ctx, x, y, cw, ch, { label: p.n, tag: p.t });

        // Install button
        const bw = ctx.measureText('Install').width + 20;
        roundRect(ctx, x + cw - bw - 12, y + ch - 36, bw, 24, 2);
        ctx.strokeStyle = TEXT;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = TEXT;
        ctx.font = '600 9px system-ui, sans-serif';
        ctx.fillText('Install', x + cw - bw - 2, y + ch - 20);
    });

    // Stats bar at bottom
    ctx.fillStyle = TEXT_TER;
    ctx.font = '500 9px system-ui, sans-serif';
    ctx.fillText('25 PLUGINS', 80, H - 60);
    ctx.fillText('7 SKILLS', 200, H - 60);
    ctx.fillText('4 MCP', 300, H - 60);
    ctx.fillText('2 PACKS', 380, H - 60);
});

// ── ClawReform ──
save('clawreform-preview.png', (ctx) => {
    // Title
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('CLAWREFORM', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('146K LINES · 13 CRATES · RUST', 220, 60);

    // Layered architecture
    const layers = [
        { n: 'API Surface', w: 0.7, y: 120 },
        { n: 'Consensus Layer', w: 0.8, y: 210 },
        { n: 'Self-Rewrite Engine', w: 0.65, y: 300 },
        { n: 'Agent Runtime', w: 0.85, y: 390 },
        { n: 'Memory Substrate', w: 0.6, y: 480 },
        { n: 'Core Kernel', w: 0.5, y: 570 },
    ];
    const baseX = 160;
    const maxW = W - 320;

    layers.forEach((l, i) => {
        const w = maxW * l.w;
        const x = baseX + (maxW - w) / 2;
        roundRect(ctx, x, l.y, w, 60, 2);
        ctx.fillStyle = i % 2 === 0 ? ELEVATED : BG;
        ctx.fill();
        ctx.strokeStyle = RULE; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = TEXT;
        ctx.font = '400 12px system-ui, sans-serif';
        ctx.fillText(l.n, x + w / 2 - ctx.measureText(l.n).width / 2, l.y + 36);

        // Connecting line to next layer
        if (i < layers.length - 1) {
            drawArrow(ctx, W / 2, l.y + 60, W / 2, l.y + 60 + 30);
        }
    });

    // Side annotation
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('SIX-LAYER MEMORY', W - 200, 200);
    drawLine(ctx, W - 200, 206, W - 200, 560, RULE);
});

// ── Prologue ──
save('prologue-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('PROLOGUE', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('MEMORY ARCHITECTURE', 180, 60);

    // 4 nested tiers
    const tiers = [
        { n: 'Core', sub: 'Permanent identity, values, principles', w: 180, h: 80 },
        { n: 'Overview', sub: 'Project summary, key decisions, context', w: 260, h: 100 },
        { n: 'Project', sub: 'Active work, recent changes, patterns', w: 360, h: 120 },
        { n: 'Working', sub: 'Current session, scratch pad, immediate', w: 480, h: 140 },
    ];

    const baseX = 100;
    const baseY = 100;
    let curY = baseY;

    tiers.forEach((t, i) => {
        const x = baseX + (480 - t.w) / 2;
        const y = curY;
        roundRect(ctx, x, y, t.w, t.h, 3);
        ctx.fillStyle = i % 2 === 0 ? ELEVATED : BG;
        ctx.fill();
        ctx.strokeStyle = RULE; ctx.lineWidth = 1; ctx.stroke();

        // Dashed inner border
        if (i > 0) {
            ctx.setLineDash([4, 4]);
            roundRect(ctx, x + 8, y + 8, t.w - 16, t.h - 16, 2);
            ctx.strokeStyle = RULE; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.fillStyle = TEXT;
        ctx.font = '600 11px system-ui, sans-serif';
        ctx.fillText(t.n, x + 16, y + 26);
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 9px system-ui, sans-serif';
        ctx.fillText(t.sub, x + 16, y + 44);

        curY = y + t.h + 12;
    });

    // Compression arrows
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 9px system-ui, sans-serif';
    ctx.fillText('COMPRESSION', 620, 260);
    ctx.fillText('↓', 640, 290);
    ctx.fillText('EXPANSION', 620, 480);
    ctx.fillText('↑', 645, 510);
    drawLine(ctx, 630, 280, 630, 470, RULE);
});

// ── karen.city ──
save('karen-city-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('KAREN.CITY', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('DESIGN AUDIT ENGINE', 210, 60);

    // Left: website wireframe being audited
    const wx = 80, wy = 120, ww = 480, wh = 480;
    roundRect(ctx, wx, wy, ww, wh, 2);
    ctx.fillStyle = BG; ctx.fill();
    ctx.strokeStyle = RULE; ctx.lineWidth = 1; ctx.stroke();
    // Fake wireframe elements
    for (let i = 0; i < 5; i++) {
        roundRect(ctx, wx + 30, wy + 30 + i * 80, ww - 60, 14, 1);
        ctx.fillStyle = ELEVATED; ctx.fill();
        ctx.strokeStyle = RULE; ctx.stroke();
    }
    roundRect(ctx, wx + 30, wy + wh - 50, ww - 60, 30, 2);
    ctx.fillStyle = ELEVATED; ctx.fill();
    ctx.strokeStyle = TEXT; ctx.lineWidth = 1; ctx.stroke();

    // Divider
    drawLine(ctx, wx + ww + 40, wy + 40, wx + ww + 40, wy + wh - 40, RULE);

    // Right: audit results
    const rx = wx + ww + 80, ry = wy;
    const metrics = [
        { label: 'Typography', score: 0.85 },
        { label: 'Accessibility', score: 0.6 },
        { label: 'Brand', score: 0.9 },
        { label: 'UX', score: 0.7 },
    ];
    metrics.forEach((m, i) => {
        const y = ry + 40 + i * 100;
        ctx.fillStyle = TEXT;
        ctx.font = '400 11px system-ui, sans-serif';
        ctx.fillText(m.label, rx, y);
        drawBar(ctx, rx, y + 10, 300, m.score, m.score > 0.8 ? TEXT : TEXT_SEC);
        ctx.fillStyle = TEXT_TER;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(`${Math.round(m.score * 100)}`, rx + 310, y + 22);
    });
});

// ── prompt.fail ──
save('prompt-fail-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('PROMPT.FAIL', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('MULTI-LLM COMPARISON', 200, 60);

    // Model selector tabs
    const models = ['Claude', 'GPT-4', 'Gemini', 'LLaMA'];
    let tabX = 80;
    models.forEach((m, i) => {
        const tw = 90;
        roundRect(ctx, tabX, 110, tw, 28, 2);
        ctx.fillStyle = i === 0 ? TEXT : 'transparent';
        if (i === 0) {
            roundRect(ctx, tabX, 110, tw, 28, 2);
            ctx.fill();
        }
        ctx.strokeStyle = RULE; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = i === 0 ? BG : TEXT_TER;
        ctx.font = '500 10px system-ui, sans-serif';
        ctx.fillText(m, tabX + tw / 2 - ctx.measureText(m).width / 2, 128);
        tabX += tw + 8;
    });

    // Input area
    roundRect(ctx, 80, 160, W - 160, 50, 2);
    ctx.strokeStyle = RULE; ctx.stroke();
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 11px system-ui, sans-serif';
    ctx.fillText('Enter your prompt here...', 96, 190);

    // Output panels 2x2
    const pw = (W - 240) / 2;
    const ph = 380;
    for (let i = 0; i < 4; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 80 + col * (pw + 20);
        const y = 240 + row * (ph + 20);
        roundRect(ctx, x, y, pw, ph, 2);
        ctx.fillStyle = BG; ctx.fill();
        ctx.strokeStyle = RULE; ctx.stroke();

        // Fake text lines
        for (let j = 0; j < 4; j++) {
            roundRect(ctx, x + 16, y + 16 + j * 28, pw - 32 - j * 10, 8, 1);
            ctx.fillStyle = ELEVATED; ctx.fill();
        }

        // Model label
        ctx.fillStyle = TEXT_TER;
        ctx.font = '500 9px system-ui, sans-serif';
        ctx.fillText(models[i].toUpperCase(), x + 16, y + ph - 12);
    }
});

// ── zkputer ──
save('zkputer-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('ZKPUTER', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('ZK-VERIFIED AI TRADING', 210, 60);

    // Trade flow
    const steps = ['Input Signal', 'AI Decision', 'ZK Proof', 'Execution', 'Verification'];
    const stepW = (W - 240) / steps.length;
    steps.forEach((s, i) => {
        const x = 80 + i * (stepW + 16);
        const y = 130;
        roundRect(ctx, x, y, stepW, 70, 2);
        ctx.fillStyle = ELEVATED; ctx.fill();
        ctx.strokeStyle = RULE; ctx.stroke();
        ctx.fillStyle = TEXT;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(s, x + stepW / 2 - ctx.measureText(s).width / 2, y + 40);

        if (i < steps.length - 1) {
            drawArrow(ctx, x + stepW + 4, y + 35, x + stepW + 12, y + 35);
        }
    });

    // Proof visualization
    roundRect(ctx, 80, 260, W - 160, 200, 2);
    ctx.fillStyle = BG; ctx.fill();
    ctx.strokeStyle = RULE; ctx.stroke();

    // Circuit-like pattern
    const cx = W / 2, cy = 360;
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + 100 * Math.cos(angle);
        const y1 = cy + 60 * Math.sin(angle);
        const x2 = cx + 180 * Math.cos(angle);
        const y2 = cy + 110 * Math.sin(angle);
        drawLine(ctx, x1, y1, x2, y2, i % 2 === 0 ? TEXT : TEXT_TER);
        drawDot(ctx, x2, y2, 3, i % 2 === 0 ? TEXT : RULE);
    }
    drawDot(ctx, cx, cy, 5, TEXT);

    // Labels
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 9px system-ui, sans-serif';
    ctx.fillText('RISC ZERO ZKVM', 100, H - 60);
    ctx.fillText('COMPLIANT', 250, H - 60);
    ctx.fillText('TRUSTLESS', 380, H - 60);
});

// ── aegnt-27 ──
save('aegnt27-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('AEGNT-27', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('HUMAN AUTHENTICITY ENGINE', 200, 60);

    // Two columns: Human patterns vs AI detection
    const colW = (W - 200) / 2;

    // Human column
    roundRect(ctx, 80, 120, colW, 40, 2);
    ctx.fillStyle = TEXT; ctx.fill();
    ctx.fillStyle = BG;
    ctx.font = '500 11px system-ui, sans-serif';
    ctx.fillText('HUMAN PATTERNS', 96, 145);

    const patterns = [
        'Typo variation', 'Imperfect grammar', 'Context drift',
        'Voice inconsistency', 'Emotional markers', 'Temporal patterns',
        'Cognitive bias', 'Writing style', 'Topic coherence',
        'Structural noise', 'Citation patterns', 'Personal voice',
        'Semantic density', 'Rhythm variation', 'Error patterns',
    ];
    patterns.forEach((p, i) => {
        const y = 180 + i * 24;
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(`· ${p}`, 96, y);
    });

    // AI column
    const ax = 80 + colW + 40;
    roundRect(ctx, ax, 120, colW, 40, 2);
    ctx.fillStyle = TEXT_TER; ctx.fill();
    ctx.fillStyle = BG;
    ctx.font = '500 11px system-ui, sans-serif';
    ctx.fillText('DETECTION METRICS', ax + 16, 145);

    // Metrics
    const metrics = [
        { label: 'AI Detection Resistance', val: '98.2%' },
        { label: 'Processing Speed', val: '<2ms' },
        { label: 'Pattern Coverage', val: '27/27' },
        { label: 'False Positive Rate', val: '<0.5%' },
    ];
    metrics.forEach((m, i) => {
        const y = 180 + i * 56;
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(m.label, ax + 16, y);
        ctx.fillStyle = TEXT;
        ctx.font = '600 16px Georgia, serif';
        ctx.fillText(m.val, ax + 16, y + 22);
    });
});

// ── NotebookLM Pro ──
save('notebooklm-pro-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('NOTEBOOKLM PRO', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('CONVERSATIONAL RESEARCH WITH GEMINI', 260, 60);

    // Main layout: sidebar + chat
    const sbW = 240;
    const chatX = 80 + sbW + 20;

    // Sidebar
    roundRect(ctx, 80, 110, sbW, H - 170, 2);
    ctx.fillStyle = ELEVATED; ctx.fill();
    ctx.strokeStyle = RULE; ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = TEXT;
    ctx.font = '600 11px system-ui, sans-serif';
    ctx.fillText('Notebooks', 96, 140);
    const notebooks = ['ML Research', 'Agent Design', 'Crypto ZK', 'API Patterns'];
    notebooks.forEach((n, i) => {
        const y = 165 + i * 36;
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(n, 96, y);
        drawDot(ctx, 84, y - 4, 2, i === 0 ? TEXT : TEXT_TER);
    });

    // Sources section
    ctx.fillStyle = TEXT;
    ctx.font = '600 10px system-ui, sans-serif';
    ctx.fillText('Sources', 96, H - 130);
    for (let i = 0; i < 3; i++) {
        roundRect(ctx, 96, H - 120 + i * 24, 180, 14, 1);
        ctx.fillStyle = ELEVATED; ctx.fill();
    }

    // Chat area
    roundRect(ctx, chatX, 110, W - chatX - 80, H - 170, 2);
    ctx.strokeStyle = RULE; ctx.lineWidth = 1; ctx.stroke();

    // Chat messages
    const msgs = [
        { q: 'What are the key differences between RISC Zero and Groth16?', a: 'RISC Zero uses a RISC-V based zkVM...' },
        { q: 'How does this affect proving?', a: null },
    ];
    let my = 140;
    msgs.forEach((m) => {
        roundRect(ctx, chatX + 16, my, W - chatX - 112, 50, 6);
        ctx.fillStyle = ELEVATED; ctx.fill();
        ctx.strokeStyle = RULE; ctx.lineWidth = 0.5; ctx.stroke();
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(m.q.substring(0, 60) + '...', chatX + 32, my + 18);
        my += 70;
        if (m.a) {
            roundRect(ctx, chatX + 40, my, W - chatX - 140, 60, 6);
            ctx.fillStyle = BG; ctx.fill();
            ctx.strokeStyle = RULE; ctx.lineWidth = 0.5; ctx.stroke();
            ctx.fillStyle = TEXT_SEC;
            ctx.font = '400 10px system-ui, sans-serif';
            ctx.fillText(m.a.substring(0, 55) + '...', chatX + 56, my + 18);
            my += 80;
        }
    });
});

// ── Beads ──
save('beads-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('BEADS', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('MEMORY PERSISTENCE LAYER', 170, 60);

    // Connected node graph
    const nodes = [
        { x: 200, y: 200, label: 'Session 1' },
        { x: 400, y: 160, label: 'Session 2' },
        { x: 600, y: 240, label: 'Session 3' },
        { x: 800, y: 180, label: 'Session 4' },
        { x: 350, y: 380, label: 'Context A' },
        { x: 550, y: 420, label: 'Context B' },
        { x: 750, y: 380, label: 'Context C' },
        { x: W / 2, y: 560, label: 'Persistent Store' },
    ];

    // Connections
    const edges = [[0,1],[0,4],[1,2],[2,3],[1,5],[2,4],[2,5],[3,6],[4,5],[5,6],[4,7],[5,7],[6,7]];
    edges.forEach(([a, b]) => {
        drawLine(ctx, nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y, RULE);
    });

    // Nodes
    nodes.forEach((n, i) => {
        drawDot(ctx, n.x, n.y, 8, i === nodes.length - 1 ? TEXT : ELEVATED);
        if (i === nodes.length - 1) {
            // Larger persistent store
            roundRect(ctx, n.x - 60, n.y - 12, 120, 24, 3);
            ctx.fillStyle = TEXT; ctx.fill();
            ctx.strokeStyle = TEXT; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.fillStyle = i === nodes.length - 1 ? BG : TEXT_SEC;
        ctx.font = '400 9px system-ui, sans-serif';
        ctx.fillText(n.label, n.x + 14, n.y + 4);
    });

    // Timeline
    drawLine(ctx, 80, H - 80, W - 80, H - 80, RULE);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 9px system-ui, sans-serif';
    ctx.fillText('SESSION TIMELINE →', 80, H - 60);
});

// ── WorldMonitor ──
save('worldmonitor-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('WORLDMONITOR', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('GLOBAL INTELLIGENCE DASHBOARD', 280, 60);

    // Dashboard grid
    const cells = 8;
    const cols = 4;
    const cellW = (W - 180) / cols;
    const cellH = (H - 180) / 2;
    for (let i = 0; i < cells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 80 + col * (cellW + 8);
        const y = 110 + row * (cellH + 8);
        roundRect(ctx, x, y, cellW, cellH, 2);
        ctx.fillStyle = BG; ctx.fill();
        ctx.strokeStyle = RULE; ctx.stroke();

        // Mini chart bars
        const bars = 5 + Math.floor(Math.sin(i * 1.5) * 3);
        for (let b = 0; b < bars; b++) {
            const bh = 15 + Math.floor(Math.sin(i + b) * 20 + 15);
            drawBar(ctx, x + 12, y + cellH - 20 - b * 22, cellW - 24, bh / 80, TEXT_TER);
        }

        // Label
        ctx.fillStyle = TEXT_TER;
        ctx.font = '500 8px system-ui, sans-serif';
        ctx.fillText(`REGION ${i + 1}`, x + 12, y + 14);
    }

    // Alert indicators
    drawDot(ctx, W - 120, 80, 4, TEXT);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 9px system-ui, sans-serif';
    ctx.fillText('3 ACTIVE ALERTS', W - 170, 84);
});

// ── ZeroClaw ──
save('zeroclaw-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('ZEROCLAW', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('AUTONOMOUS AGENT INFRASTRUCTURE', 280, 60);

    // Infrastructure topology
    // Top: 3 agent nodes
    const agents = [
        { x: 200, y: 150, label: 'Agent A' },
        { x: W / 2, y: 130, label: 'Agent B' },
        { x: W - 200, y: 150, label: 'Agent C' },
    ];
    agents.forEach(a => {
        roundRect(ctx, a.x - 50, a.y - 20, 100, 40, 3);
        ctx.fillStyle = ELEVATED; ctx.fill();
        ctx.strokeStyle = TEXT; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = TEXT;
        ctx.font = '500 10px system-ui, sans-serif';
        ctx.fillText(a.label, a.x - 24, a.y + 4);
    });

    // Orchestrator
    roundRect(ctx, W / 2 - 70, 250, 140, 40, 3);
    ctx.fillStyle = TEXT; ctx.fill();
    ctx.strokeStyle = TEXT; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = BG;
    ctx.font = '600 11px system-ui, sans-serif';
    ctx.fillText('ORCHESTRATOR', W / 2 - 44, 274);

    // Connections
    agents.forEach(a => {
        drawArrow(ctx, a.x, a.y + 20, W / 2, 250);
        drawArrow(ctx, W / 2, 290, W / 2, 350);
    });

    // Task pipeline
    const pipeline = ['Queue', 'Execute', 'Verify', 'Archive'];
    const pw = 180;
    pipeline.forEach((p, i) => {
        const x = 160 + i * (pw + 30);
        const y = 360;
        roundRect(ctx, x, y, pw, 50, 2);
        ctx.fillStyle = ELEVATED; ctx.fill();
        ctx.strokeStyle = RULE; ctx.stroke();
        ctx.fillStyle = TEXT;
        ctx.font = '500 10px system-ui, sans-serif';
        ctx.fillText(p, x + pw / 2 - ctx.measureText(p).width / 2, y + 30);
        if (i < pipeline.length - 1) {
            drawArrow(ctx, x + pw + 4, y + 25, x + pw + 26, y + 25);
        }
    });

    // Zero human intervention badge
    roundRect(ctx, W - 260, H - 100, 180, 30, 2);
    ctx.fillStyle = TEXT; ctx.fill();
    ctx.fillStyle = BG;
    ctx.font = '500 9px system-ui, sans-serif';
    ctx.fillText('ZERO HUMAN INTERVENTION', W - 252, H - 80);
});

// ── Rapt0r ──
save('rapt0r-preview.png', (ctx) => {
    ctx.fillStyle = TEXT;
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillText('RAPT0R', 80, 60);
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 10px system-ui, sans-serif';
    ctx.fillText('OFFENSIVE / DEFENSIVE SECURITY AGENT', 290, 60);

    // Network scan visualization
    // Shield in center
    const cx = W / 2, cy = H / 2 - 20;
    roundRect(ctx, cx - 60, cy - 60, 120, 120, 3);
    ctx.strokeStyle = TEXT; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = TEXT_TER;
    ctx.font = '400 9px system-ui, sans-serif';
    ctx.fillText('SHIELD', cx - 18, cy + 4);

    // Scanning nodes around it
    const scanNodes = [
        { x: 140, y: 160 }, { x: 320, y: 140 }, { x: 520, y: 160 },
        { x: 680, y: 200 }, { x: 840, y: 160 }, { x: 1000, y: 140 },
        { x: 180, y: 400 }, { x: 380, y: 440 }, { x: 580, y: 420 },
        { x: 780, y: 400 }, { x: 960, y: 440 }, { x: 1140, y: 400 },
    ];
    scanNodes.forEach((n, i) => {
        const r = 6 + Math.sin(i) * 2;
        drawDot(ctx, n.x, n.y, r, i % 3 === 0 ? TEXT : i % 3 === 1 ? RULE : TEXT_TER);
        drawLine(ctx, cx, cy, n.x, n.y, RULE);
    });

    // Vulnerability tree on right
    const vx = W - 240, vy = 120;
    ctx.fillStyle = TEXT;
    ctx.font = '600 10px system-ui, sans-serif';
    ctx.fillText('VULNERABILITIES', vx, vy);
    const vulns = [
        { label: 'XSS (Critical)', pct: 0.8 },
        { label: 'SQLi (High)', pct: 0.6 },
        { label: 'CSRF (Medium)', pct: 0.4 },
        { label: 'Headers (Low)', pct: 0.3 },
    ];
    vulns.forEach((v, i) => {
        const y = vy + 30 + i * 50;
        ctx.fillStyle = TEXT_SEC;
        ctx.font = '400 10px system-ui, sans-serif';
        ctx.fillText(v.label, vx, y);
        drawBar(ctx, vx, y + 12, 160, v.pct, v.pct > 0.6 ? TEXT : TEXT_SEC);
    });
});

console.log('Generated 12 project preview images');
