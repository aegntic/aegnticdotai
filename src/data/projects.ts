export interface Project {
    id: string;
    title: string;
    tagline: string;
    website: string;
    preview: string;
    tags: string[];
    description: string;
    fork?: boolean;
    secondary?: boolean;
}

export const projects: Project[] = [
    {
        id: 'cldcde',
        title: 'CLDCDE',
        tagline: 'The community hub for Claude Code extensions',
        website: 'https://cldcde.cc',
        preview: '/assets/projects/cldcde-preview.png',
        tags: ['Ecosystem', 'Developer Tools'],
        description: 'Central registry for Claude Code extensions, hooks, and workflows. Community-driven discovery and installation.',
    },
    {
        id: 'clawreform',
        title: 'ClawReform',
        tagline: 'The Self-Evolving Agent Operating System',
        website: 'https://clawreform.com',
        preview: '/assets/projects/clawreform-preview.png',
        tags: ['Rust', 'Agents', 'OS'],
        description: 'Rust-based agent operating system with six-layer memory substrate, self-rewrite engine, and collective consensus across agents. 146K lines across 13 crates.',
    },
    {
        id: 'prologue',
        title: 'Prologue',
        tagline: 'AI agent memory library — compression ladders and FPEF safety',
        website: 'https://logue.pro',
        preview: '/assets/projects/prologue-preview.png',
        tags: ['Memory', 'Agents', 'MCP'],
        description: 'Four-tier memory matrix with compression ladders. Working → Project → Overview → Core. Orchestrator handles automatic lifecycle management.',
    },
    {
        id: 'karen-city',
        title: 'karen.city',
        tagline: 'AI website autopsy — brutal honest design audits',
        website: 'https://karen.city',
        preview: '/assets/projects/karen-city-preview.png',
        tags: ['AI', 'Design', 'Audit'],
        description: 'Four AI personas roast your website on design, accessibility, brand coherence, and UX. No mercy.',
    },
    {
        id: 'prompt-fail',
        title: 'prompt.fail',
        tagline: 'Side-by-side AI comparison across Claude, GPT-4, Gemini, LLaMA',
        website: 'https://prompt.fail',
        preview: '/assets/projects/prompt-fail-preview.png',
        tags: ['AI', 'Comparison', 'Testing'],
        description: 'Neutral prompt execution across multiple LLMs. Compare outputs, measure performance, find the right model for the job.',
        secondary: true,
    },
    {
        id: 'zkputer',
        title: 'zkputer',
        tagline: 'ZK-verified AI trading via RISC Zero zkVM',
        website: 'https://zkputer.com',
        preview: '/assets/projects/zkputer-preview.png',
        tags: ['ZK', 'Trading', 'Crypto'],
        description: 'Cryptographic proofs for autonomous trading decisions. Every trade verifiable, compliant, and trustless.',
        secondary: true,
    },
    {
        id: 'notebooklm-pro',
        title: 'NotebookLM Pro',
        tagline: 'Advanced conversational research with Gemini',
        website: 'https://github.com/aegntic/notebooklm-pro',
        preview: '/assets/projects/notebooklm-pro-preview.png',
        tags: ['Research', 'Gemini'],
        description: 'MCP server for NotebookLM integration. Session-based research with Gemini, grounded on your notebooks.',
        secondary: true,
    },
    {
        id: 'beads',
        title: 'Beads',
        tagline: 'Memory upgrade for your coding agent',
        website: 'https://github.com/aegntic/beads',
        preview: '/assets/projects/beads-preview.png',
        tags: ['Memory', 'Agents'],
        description: 'Drop-in memory persistence layer for coding agents. Persistent context across sessions.',
        fork: true,
    },
    {
        id: 'worldmonitor',
        title: 'WorldMonitor',
        tagline: 'Real-time global intelligence dashboard',
        website: 'https://github.com/aegntic/worldmonitor',
        preview: '/assets/projects/worldmonitor-preview.png',
        tags: ['Dashboard', 'Monitoring'],
        description: 'Live monitoring of global events, trends, and signals. Real-time data aggregation.',
        fork: true,
    },
    {
        id: 'zeroclaw',
        title: 'ZeroClaw',
        tagline: 'Fully autonomous AI assistant infrastructure',
        website: 'https://github.com/aegntic/zeroclaw',
        preview: '/assets/projects/zeroclaw-preview.png',
        tags: ['Infrastructure', 'Autonomous'],
        description: 'Infrastructure for running fully autonomous AI assistants. Zero human intervention.',
        fork: true,
    },
    {
        id: 'rapt0r',
        title: 'Rapt0r',
        tagline: 'AI offensive/defensive security agent',
        website: 'https://github.com/aegntic/rapt0r',
        preview: '/assets/projects/rapt0r-preview.png',
        tags: ['Security', 'Agent'],
        description: 'Autonomous security agent for offensive and defensive operations. AI-powered vulnerability assessment.',
        fork: true,
    },
];

export const featured = projects.filter(p => !p.fork && !p.secondary);
export const secondary = projects.filter(p => p.secondary);
export const forks = projects.filter(p => p.fork);
