import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowRight, X, Globe, Calendar } from 'lucide-react';

interface BlogPost {
    title: string;
    description: string;
    pubDate: string;
    tags: string[];
    content: string;
}

interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    wireframe: string;
    github: string;
    language: string;
    blogFile?: string;
    tags: string[];
    stats?: { label: string; value: string }[];
}

const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [blogContent, setBlogContent] = useState<BlogPost | null>(null);
    const [loadingBlog, setLoadingBlog] = useState(false);

    const projects: Project[] = [
        {
            id: 'cldcde', title: 'CLDCDE',
            tagline: 'The unofficial community hub for Claude Code extensions',
            description: 'A comprehensive ecosystem management platform with 200+ integrated tools, plugins, and agents.',
            wireframe: '/assets/projects/transparent/cldcde-wireframe_transparent.png',
            github: 'github.com/aegntic/cldcde', language: 'TypeScript',
            blogFile: 'why-we-built-aegntic.md',
            tags: ['MCP', 'Ecosystem', 'Developer Tools'],
            stats: [{ label: 'Tools', value: '200+' }, { label: 'Type', value: 'Hub' }],
        },
        {
            id: 'tld-express', title: 'TLD.Express',
            tagline: 'AI-powered domain flipping automation platform',
            description: 'Domain flipping business automation platform powered by AI agent swarm.',
            wireframe: '/assets/projects/transparent/tld-express-wireframe_transparent.png',
            github: 'github.com/aegntic/tld', language: 'TypeScript',
            blogFile: 'aegntic-growth-story.md',
            tags: ['Business', 'Automation', 'AI Swarm'],
            stats: [{ label: 'Agents', value: 'Swarm' }, { label: 'Focus', value: 'Business' }],
        },
        {
            id: 'prompt-prompter-dd', title: 'Prompt Prompter DD',
            tagline: 'Your Prompts Favourite Prompter',
            description: 'Intelligent prompt debugger with Datadog observability.',
            wireframe: '/assets/projects/transparent/prompt-prompter-dd-wireframe_transparent.png',
            github: 'github.com/aegntic/prompt-prompter-dd', language: 'TypeScript',
            blogFile: 'building-ai-agent-skills.md',
            tags: ['AI', 'Observability', 'Prompts'],
            stats: [{ label: 'Focus', value: 'Observability' }, { label: 'Type', value: 'Debugger' }],
        },
        {
            id: 'unltd-cli', title: 'UNLTD-CLI',
            tagline: 'Choreographing the next wave of synthetic intelligence',
            description: 'Advanced CLI for AI-powered development workflows.',
            wireframe: '/assets/projects/transparent/unltd-cli-wireframe_transparent.png',
            github: 'github.com/aegntic/unltd-cli', language: 'TypeScript',
            blogFile: 'ultra-swarm-multi-agent-problem-solving.md',
            tags: ['CLI', 'AI Agents', 'Automation'],
            stats: [{ label: 'Type', value: 'CLI Tool' }, { label: 'Focus', value: 'AI Agents' }],
        },
        {
            id: 'prompt-prompter', title: 'Prompt Prompter',
            tagline: 'Proof of prompt improvement',
            description: 'Experimental prompt optimization and refinement tools.',
            wireframe: '/assets/projects/transparent/prompt-prompter-wireframe_transparent.png',
            github: 'github.com/aegntic/prompt-prompter', language: 'TypeScript',
            blogFile: 'sequential-thinking-ai-agent-reasoning.md',
            tags: ['AI', 'Research', 'Prompts'],
            stats: [{ label: 'Type', value: 'Research' }, { label: 'Focus', value: 'Prompts' }],
        },
        {
            id: 'os-wwwrong', title: 'OS WWWrong',
            tagline: 'Write the wwwrong prompt perfectly',
            description: 'Advanced prompt engineering studio for optimal AI interactions.',
            wireframe: '/assets/projects/transparent/os-wwwrong-wireframe_transparent.png',
            github: 'github.com/aegntic/os-wwwrong-prompt-studio', language: 'TypeScript',
            blogFile: 'birth-of-prologue-mcp-discovery.md',
            tags: ['MCP', 'Prompting', 'Tools'],
            stats: [{ label: 'Type', value: 'Studio' }, { label: 'Focus', value: 'Prompt Eng' }],
        },
        {
            id: 'zkputer', title: 'ZKputer',
            tagline: 'The sovereign shadow trader',
            description: 'Zero-knowledge proof trading system with privacy-preserving transactions.',
            wireframe: '/assets/projects/transparent/zkputer-wireframe_transparent.png',
            github: 'github.com/aegntic/zkputer', language: 'Rust',
            blogFile: 'mcp-revolution-orchestrating-ai-services.md',
            tags: ['ZK', 'DeFi', 'Privacy'],
            stats: [{ label: 'Type', value: 'ZK' }, { label: 'Focus', value: 'Trading' }],
        },
    ];

    const loadBlogContent = async (project: Project) => {
        setLoadingBlog(true);
        // Blog content is embedded inline — no file fetch needed
        setBlogContent({
            title: project.title,
            description: project.description,
            pubDate: '2025',
            tags: project.tags,
            content: `${project.description}\n\nThis project is part of the Aegntic.ai ecosystem — an independent research foundation advancing the architecture of synthetic intelligence. Visit the GitHub repository to explore the source code, contribute, or report issues.\n\nBuilt with ${project.language}. Licensed under MIT.`,
        });
        setLoadingBlog(false);
    };

    const handleProjectClick = async (project: Project) => {
        setSelectedProject(project);
        if (project.blogFile) await loadBlogContent(project);
    };

    const closeModal = () => { setSelectedProject(null); setBlogContent(null); };

    return (
        <div className="py-24 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/Aegntic.Development</span>
                        <h2 className="section-header mt-3">
                            Shipped <span className="text-accent-orange">Products</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        Production-ready software and infrastructure powering the next generation of AI agents.
                    </p>
                </ScrollReveal>

                {/* Project Grid — Neumorphic Cards */}
                <div className="swiss-grid-tiles">
                    {projects.map((project, idx) => (
                        <ScrollReveal key={project.id} delay={idx * 80}>
                            <motion.div
                                className="glass-card group h-full flex flex-col cursor-pointer"
                                onClick={() => handleProjectClick(project)}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                {/* Wireframe Image */}
                                <div className="relative mb-6 flex items-center justify-center">
                                    <img
                                        src={project.wireframe}
                                        alt={project.title}
                                        className="w-full h-40 object-contain mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                {/* Tagline */}
                                <p className="text-sm text-text-muted leading-relaxed mb-3">
                                    {project.tagline}
                                </p>

                                {/* Title */}
                                <h3 className="font-display text-xl font-bold text-text-primary mb-4 tracking-tight group-hover:text-accent-blue transition-colors text-right">
                                    {project.title}
                                </h3>

                                {/* Stats */}
                                {project.stats && (
                                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 mb-4">
                                        {project.stats.map((stat, si) => (
                                            <div key={si} className="text-center">
                                                <div className="text-mono-label text-text-dim">{stat.label}</div>
                                                <div className="font-mono text-base text-text-primary font-bold">{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="data-badge !text-text-dim group-hover:!text-accent-blue transition-colors">{tag}</span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex items-center justify-center gap-2 mt-auto text-mono-label text-text-muted group-hover:text-accent-orange transition-colors">
                                    Sounds Interesting <ArrowRight size={12} />
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
                                    Explore on <span className="text-accent-blue">GitHub</span>
                                </h3>
                                <p className="text-text-muted text-lg max-w-2xl">
                                    All our projects are open source. Star us on GitHub to stay updated with the latest releases.
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
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary leading-tight">
                                        {blogContent ? blogContent.title : selectedProject.title}
                                    </h2>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={20} className="text-text-muted" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                                {loadingBlog ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="text-text-muted">Loading article...</div>
                                    </div>
                                ) : blogContent ? (
                                    <article className="prose prose-invert prose-lg max-w-none">
                                        <p className="text-text-muted text-lg leading-relaxed mb-8">{blogContent.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-text-dim mb-8">
                                            <div className="flex items-center gap-2"><Calendar size={14} /><span>{blogContent.pubDate}</span></div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {blogContent.tags.map(tag => (
                                                <span key={tag} className="data-badge">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="text-text-muted leading-relaxed whitespace-pre-line">{blogContent.content}</div>
                                    </article>
                                ) : (
                                    <div>
                                        <p className="text-text-muted text-lg leading-relaxed mb-8">{selectedProject.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="data-badge">{tag}</span>
                                            ))}
                                        </div>
                                        <a href={`https://${selectedProject.github}`} target="_blank" rel="noopener noreferrer"
                                            className="neu-pill-orange inline-flex items-center gap-3">
                                            <Globe size={18} /> View on GitHub <ArrowRight size={16} />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-surface border-t border-white/5 p-4 flex justify-between items-center">
                                <button onClick={closeModal} className="text-sm text-text-muted hover:text-text-primary transition-colors">Close</button>
                                {selectedProject.github && (
                                    <a href={`https://${selectedProject.github}`} target="_blank" rel="noopener noreferrer"
                                        className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors flex items-center gap-2">
                                        <Globe size={14} /> View Repository
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
