import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowRight, X, Globe, Star, GitFork } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    github: string;
    language: string;
    stars: number;
    forks: number;
    commits: number;
    tags: string[];
}

const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        {
            id: 'cldcde',
            title: 'CLDCDE',
            tagline: 'The community hub for Claude Code extensions',
            description: 'Unofficial community hub for Claude Code plugins, skills, extensions, MCP servers, and experimental tools. Open to all contributors.',
            github: 'github.com/aegntic/cldcde',
            language: 'TypeScript',
            stars: 9,
            forks: 2,
            commits: 61,
            tags: ['MCP', 'Ecosystem', 'Developer Tools'],
        },
        {
            id: 'google-labs-extension',
            title: 'Google Labs Extension',
            tagline: 'Google Suite AI tools for Agent Zero',
            description: 'Seamless integration with Google AI tools — Stitch, Whisk, Flow, MusicFX, ImageFX, VideoFX, TextFX.',
            github: 'github.com/aegntic/google-labs-extension',
            language: 'JavaScript',
            stars: 5,
            forks: 0,
            commits: 1,
            tags: ['AI', 'Google', 'Agent Zero'],
        },
        {
            id: 'claude-code-templates',
            title: 'Claude Code Templates',
            tagline: 'Battle-tested Claude Code configurations',
            description: 'Complete Claude Code configuration collection — agents, skills, hooks, commands, rules, MCPs. From an Anthropic hackathon winner.',
            github: 'github.com/aegntic/claude-code-templates',
            language: 'JavaScript',
            stars: 3,
            forks: 0,
            commits: 1,
            tags: ['Config', 'Templates', 'Claude'],
        },
        {
            id: 'clawreform',
            title: 'ClawReform',
            tagline: 'The Self-Evolving Agent Operating System',
            description: 'Open-source agent operating system written in Rust. Autonomous agents that adapt, learn, and improve over time.',
            github: 'github.com/aegntic/clawreform',
            language: 'Rust',
            stars: 2,
            forks: 1,
            commits: 83,
            tags: ['Rust', 'Agents', 'OS'],
        },
        {
            id: 'notebooklm-pro',
            title: 'NotebookLM Pro',
            tagline: 'Advanced conversational research with Gemini',
            description: 'NotebookLM Pro for Agent Zero — advanced conversational research with Gemini 2.5 Pro, 2.5 Flash, and Gemini 3 models.',
            github: 'github.com/aegntic/notebooklm-pro',
            language: 'JavaScript',
            stars: 2,
            forks: 0,
            commits: 1,
            tags: ['Research', 'Gemini', 'Agent Zero'],
        },
        {
            id: 'prologue',
            title: 'Prologue',
            tagline: 'Universal MCP discovery system',
            description: 'The intelligent MCP server discovery system. Find, validate, and install MCP servers from a unified registry.',
            github: 'github.com/aegntic/prologue',
            language: 'TypeScript',
            stars: 1,
            forks: 1,
            commits: 26,
            tags: ['MCP', 'Discovery', 'Registry'],
        },
        {
            id: 'prompt-prompter-dd',
            title: 'Prompt Prompter DD',
            tagline: 'Prompt debugging with Datadog observability',
            description: 'Your prompts favourite prompter — intelligent prompt debugger with Datadog-style observability. AI that optimizes AI.',
            github: 'github.com/aegntic/prompt-prompter-dd',
            language: 'TypeScript',
            stars: 2,
            forks: 1,
            commits: 22,
            tags: ['Prompts', 'Observability', 'AI'],
        },
        {
            id: 'aegnt-unltd',
            title: 'AEGNT-UNLTD',
            tagline: 'The Sovereign Strategist',
            description: 'Self-evolving cognitive hypervisor. Advanced CLI for orchestrating AI-powered development workflows and multi-agent planning.',
            github: 'github.com/aegntic/aegnt-unltd',
            language: 'Shell',
            stars: 2,
            forks: 0,
            commits: 6,
            tags: ['CLI', 'AI Agents', 'Strategy'],
        },
        {
            id: 'beads',
            title: 'Beads',
            tagline: 'Memory upgrade for your coding agent',
            description: 'Persistent memory layer for AI coding agents. The most committed-to project in the portfolio with 3,000+ commits.',
            github: 'github.com/aegntic/beads',
            language: 'N/A',
            stars: 1,
            forks: 0,
            commits: 3013,
            tags: ['Memory', 'Agents', 'Infrastructure'],
        },
        {
            id: 'worldmonitor',
            title: 'WorldMonitor',
            tagline: 'Real-time global intelligence dashboard',
            description: 'AI-powered news aggregation, geopolitical monitoring, and infrastructure tracking in a unified situational awareness interface. 1,600+ commits.',
            github: 'github.com/aegntic/worldmonitor',
            language: 'N/A',
            stars: 0,
            forks: 0,
            commits: 1605,
            tags: ['Dashboard', 'Monitoring', 'AI'],
        },
        {
            id: 'zeroclaw',
            title: 'ZeroClaw',
            tagline: 'Fully autonomous AI assistant infrastructure',
            description: 'Fast, small, and fully autonomous AI assistant infrastructure — deploy anywhere, swap anything. 636 commits of iteration.',
            github: 'github.com/aegntic/zeroclaw',
            language: 'N/A',
            stars: 1,
            forks: 0,
            commits: 636,
            tags: ['Infrastructure', 'Autonomous', 'Deploy'],
        },
        {
            id: 'rapt0r',
            title: 'Rapt0r',
            tagline: 'AI offensive/defensive security agent',
            description: 'Turns Claude Code into a general-purpose AI security agent. Adversarial thinking, attack/defense research and operations. 194 commits.',
            github: 'github.com/aegntic/rapt0r',
            language: 'N/A',
            stars: 2,
            forks: 0,
            commits: 194,
            tags: ['Security', 'Agent', 'Claude'],
        },
    ];

    const closeModal = () => { setSelectedProject(null); };

    return (
        <div className="py-24 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/projects</span>
                        <h2 className="section-header mt-3">
                            Open Source <span className="text-accent-orange">Portfolio</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        Real projects with real commit counts. Sorted by GitHub stars —
                        the projects the community found most useful.
                    </p>
                </ScrollReveal>

                {/* Project Grid */}
                <div className="swiss-grid-tiles">
                    {projects.map((project, idx) => (
                        <ScrollReveal key={project.id} delay={idx * 80}>
                            <motion.div
                                className="glass-card group h-full flex flex-col cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                {/* Stats header */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-mono-label text-accent-blue">{project.language}</span>
                                    <div className="flex items-center gap-3 text-mono-label text-text-dim">
                                        <span className="flex items-center gap-1"><Star size={12} />{project.stars}</span>
                                        <span className="flex items-center gap-1"><GitFork size={12} />{project.forks}</span>
                                    </div>
                                </div>

                                {/* Tagline */}
                                <p className="text-sm text-text-muted leading-relaxed mb-3">
                                    {project.tagline}
                                </p>

                                {/* Title */}
                                <h3 className="font-display text-xl font-bold text-text-primary mb-4 tracking-tight group-hover:text-accent-blue transition-colors text-right">
                                    {project.title}
                                </h3>

                                {/* Commit count */}
                                <div className="grid grid-cols-1 gap-4 pb-4 border-b border-white/5 mb-4">
                                    <div className="text-center">
                                        <div className="text-mono-label text-text-dim">Commits</div>
                                        <div className="font-mono text-base text-text-primary font-bold">
                                            {project.commits.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="data-badge !text-text-dim group-hover:!text-accent-blue transition-colors">{tag}</span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex items-center justify-center gap-2 mt-auto text-mono-label text-text-muted group-hover:text-accent-orange transition-colors">
                                    View Project <ArrowRight size={12} />
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* GitHub Banner */}
                <ScrollReveal delay={200}>
                    <div className="mt-24 glass-panel metal-surface !p-10 lg:!p-14">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-headline font-bold mb-4">
                                    All <span className="text-accent-blue">184 repos</span> on GitHub
                                </h3>
                                <p className="text-text-muted text-lg max-w-2xl">
                                    Every project is open source. Fork it, break it, fix it, ship it.
                                </p>
                            </div>
                            <a
                                href="https://github.com/aegntic"
                                target="_blank" rel="noopener noreferrer"
                                className="neu-pill-orange flex items-center gap-4 whitespace-nowrap"
                            >
                                <Globe size={18} /> github.com/aegntic <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-deep-space/80"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative max-w-4xl w-full max-h-[90vh] glass-panel !rounded-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 z-10 bg-surface border-b border-white/5 p-6 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-mono-label text-accent-blue">{selectedProject.language}</span>
                                        <span className="text-mono-label text-text-dim">{selectedProject.github}</span>
                                        <span className="flex items-center gap-1 text-text-dim"><Star size={12} />{selectedProject.stars}</span>
                                        <span className="flex items-center gap-1 text-text-dim"><GitFork size={12} />{selectedProject.forks}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={20} className="text-text-muted" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                                <p className="text-text-muted text-lg leading-relaxed mb-8">{selectedProject.description}</p>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="text-center glass-inset rounded-xl p-4">
                                        <div className="font-mono text-xl font-bold text-accent-blue">{selectedProject.commits.toLocaleString()}</div>
                                        <div className="text-mono-label text-text-dim text-xs mt-1">Commits</div>
                                    </div>
                                    <div className="text-center glass-inset rounded-xl p-4">
                                        <div className="font-mono text-xl font-bold text-accent-blue">{selectedProject.stars}</div>
                                        <div className="text-mono-label text-text-dim text-xs mt-1">Stars</div>
                                    </div>
                                    <div className="text-center glass-inset rounded-xl p-4">
                                        <div className="font-mono text-xl font-bold text-accent-blue">{selectedProject.forks}</div>
                                        <div className="text-mono-label text-text-dim text-xs mt-1">Forks</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="data-badge">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-surface border-t border-white/5 p-4 flex justify-between items-center">
                                <button onClick={closeModal} className="text-sm text-text-muted hover:text-text-primary transition-colors">Close</button>
                                <a href={`https://${selectedProject.github}`} target="_blank" rel="noopener noreferrer"
                                    className="neu-pill-orange inline-flex items-center gap-3">
                                    <Globe size={18} /> View on GitHub <ArrowRight size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
