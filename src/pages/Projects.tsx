import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon3D from '../components/Icon3D';
import ScrollReveal from '../components/ScrollReveal';
import { Editable } from '../components/DevTools';

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
    stats?: {
        label: string;
        value: string;
    }[];
}

const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [blogContent, setBlogContent] = useState<BlogPost | null>(null);
    const [loadingBlog, setLoadingBlog] = useState(false);

    // Project data with blog mappings
    const projects: Project[] = [
        {
            id: 'cldcde',
            title: 'CLDCDE',
            tagline: 'The unofficial community hub for Claude Code extensions',
            description: 'A comprehensive ecosystem management platform with 200+ integrated tools, plugins, and agents. Features automatic discovery, health monitoring, and seamless integration across the Claude development environment.',
            wireframe: '/assets/projects/transparent/cldcde-wireframe_transparent.png',
            github: 'github.com/aegntic/cldcde',
            language: 'TypeScript',
            blogFile: 'why-we-built-aegntic.md',
            tags: ['MCP', 'Ecosystem', 'Developer Tools'],
            stats: [
                { label: 'Tools', value: '200+' },
                { label: 'Type', value: 'Hub' }
            ]
        },
        {
            id: 'tld-express',
            title: 'TLD.Express',
            tagline: 'AI-powered domain flipping automation platform',
            description: 'Domain flipping business automation platform powered by AI agent swarm. Automates domain discovery, valuation, acquisition, and monetization with intelligent market analysis.',
            wireframe: '/assets/projects/transparent/tld-express-wireframe_transparent.png',
            github: 'github.com/aegntic/tld',
            language: 'TypeScript',
            blogFile: 'aegntic-growth-story.md',
            tags: ['Business', 'Automation', 'AI Swarm'],
            stats: [
                { label: 'Agents', value: 'Swarm' },
                { label: 'Focus', value: 'Business' }
            ]
        },
        {
            id: 'prompt-prompter-dd',
            title: 'Prompt Prompter DD',
            tagline: 'Your Prompts Favourite Prompter',
            description: 'Intelligent prompt debugger with Datadog observability. AI that optimizes AI through advanced monitoring and analytics.',
            wireframe: '/assets/projects/transparent/prompt-prompter-dd-wireframe_transparent.png',
            github: 'github.com/aegntic/prompt-prompter-dd',
            language: 'TypeScript',
            blogFile: 'building-ai-agent-skills.md',
            tags: ['AI', 'Observability', 'Prompts'],
            stats: [
                { label: 'Focus', value: 'Observability' },
                { label: 'Type', value: 'Debugger' }
            ]
        },
        {
            id: 'unltd-cli',
            title: 'UNLTD-CLI',
            tagline: 'Choreographing the next wave of synthetic intelligence',
            description: 'Advanced command-line interface for AI-powered development workflows. CLI coder coordinating multi-agent systems and synthetic intelligence operations.',
            wireframe: '/assets/projects/transparent/unltd-cli-wireframe_transparent.png',
            github: 'github.com/aegntic/unltd-cli',
            language: 'TypeScript',
            blogFile: 'ultra-swarm-multi-agent-problem-solving.md',
            tags: ['CLI', 'AI Agents', 'Automation'],
            stats: [
                { label: 'Type', value: 'CLI Tool' },
                { label: 'Focus', value: 'AI Agents' }
            ]
        },
        {
            id: 'prompt-prompter',
            title: 'Prompt Prompter',
            tagline: 'Proof of prompt improvement',
            description: 'Experimental prompt optimization and refinement tools. Advanced sequential thinking and AI agent reasoning capabilities.',
            wireframe: '/assets/projects/transparent/prompt-prompter-wireframe_transparent.png',
            github: 'github.com/aegntic/prompt-prompter',
            language: 'TypeScript',
            blogFile: 'sequential-thinking-ai-agent-reasoning.md',
            tags: ['AI', 'Research', 'Prompts'],
            stats: [
                { label: 'Type', value: 'Research' },
                { label: 'Focus', value: 'Prompts' }
            ]
        },
        {
            id: 'os-wwwrong',
            title: 'OS WWWrong',
            tagline: 'Write the wwwrong prompt perfectly',
            description: 'Advanced prompt engineering studio for optimal AI interactions. Universal MCP discovery system and intelligent server management.',
            wireframe: '/assets/projects/transparent/os-wwwrong-wireframe_transparent.png',
            github: 'github.com/aegntic/os-wwwrong-prompt-studio',
            language: 'TypeScript',
            blogFile: 'birth-of-prologue-mcp-discovery.md',
            tags: ['MCP', 'Prompting', 'Tools'],
            stats: [
                { label: 'Type', value: 'Studio' },
                { label: 'Focus', value: 'Prompt Eng' }
            ]
        },
        {
            id: 'zkputer',
            title: 'ZKputer',
            tagline: 'The sovereign shadow trader',
            description: 'Zero-knowledge proof trading system with privacy-preserving transactions. MCP revolution orchestrating AI services.',
            wireframe: '/assets/projects/transparent/zkputer-wireframe_transparent.png',
            github: 'github.com/aegntic/zkputer',
            language: 'Rust',
            blogFile: 'mcp-revolution-orchestrating-ai-services.md',
            tags: ['ZK', 'DeFi', 'Privacy'],
            stats: [
                { label: 'Type', value: 'ZK' },
                { label: 'Focus', value: 'Trading' }
            ]
        }
    ];

    // Load blog content dynamically
    const loadBlogContent = async (blogFile: string) => {
        setLoadingBlog(true);
        try {
            const blogPath = `/src/content/blog/${blogFile}`;
            const response = await fetch(blogPath);

            if (!response.ok) {
                throw new Error('Blog post not found');
            }

            const markdown = await response.text();

            // Parse frontmatter
            const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
            if (!frontmatterMatch) {
                throw new Error('Invalid blog format');
            }

            const frontmatterText = frontmatterMatch[1];
            const content = frontmatterMatch[2];

            // Parse YAML frontmatter
            const parseYaml = (text: string) => {
                const lines = text.split('\n');
                const result: any = {};
                let currentKey: string | null = null;
                let inArray = false;

                lines.forEach(line => {
                    const match = line.match(/^(\w+):\s*(.*)$/);
                    if (match) {
                        currentKey = match[1];
                        if (match[2].startsWith('[')) {
                            result[currentKey] = JSON.parse(match[2]);
                            inArray = false;
                        } else if (match[2]) {
                            result[currentKey] = match[2].replace(/^['"]|['"]$/g, '');
                            inArray = false;
                        } else {
                            result[currentKey] = [];
                            inArray = true;
                        }
                    } else if (inArray && currentKey && line.trim().startsWith('-')) {
                        const value = line.trim().replace(/^-\s*/, '').replace(/^['"]|['"]$/g, '');
                        result[currentKey].push(value);
                    }
                });

                return result;
            };

            const frontmatter = parseYaml(frontmatterText);

            setBlogContent({
                title: frontmatter.title || '',
                description: frontmatter.description || '',
                pubDate: frontmatter.pubDate || '',
                tags: frontmatter.tags || [],
                content: content
            });
        } catch (error) {
            console.error('Failed to load blog:', error);
            setBlogContent(null);
        } finally {
            setLoadingBlog(false);
        }
    };

    const handleProjectClick = async (project: Project) => {
        setSelectedProject(project);
        if (project.blogFile) {
            await loadBlogContent(project.blogFile);
        }
    };

    const closeModal = () => {
        setSelectedProject(null);
        setBlogContent(null);
    };

    return (
        <div className="py-20 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header - Following Research page style */}
                <div className="text-right mb-24">
                    <ScrollReveal>
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Editable id="projects-subtitle" as="span">aegntic.development</Editable>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            <Editable id="projects-title-1" as="span">Shipped</Editable>{' '}
                            <span className="text-primary">
                                <Editable id="projects-title-2" as="span">Products</Editable>
                            </span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={400}>
                        <p className="max-w-3xl ml-auto text-gray-400 text-lg leading-relaxed">
                            <Editable id="projects-desc" as="span">
                                Production-ready software and infrastructure powering the next generation of AI agents. Hover to explore, click to dive deeper.
                            </Editable>
                        </p>
                    </ScrollReveal>
                </div>

                {/* Projects Grid - Minimal Wireframe Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project, idx) => (
                        <ScrollReveal key={project.id} delay={idx * 100}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative h-full p-8 rounded-3xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer flex flex-col items-center justify-between"
                                onClick={() => handleProjectClick(project)}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Corner accents */}
                                <motion.div
                                    className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                />

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Wireframe Image - Hero Element */}
                                <div className="relative mb-8 flex items-center justify-center">
                                    <motion.img
                                        src={project.wireframe}
                                        alt={project.title}
                                        className="w-full h-48 object-contain mix-blend-screen opacity-80 group-hover:opacity-100 transition-all duration-500"
                                        whileHover={{
                                            scale: 1.05,
                                            filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.15))'
                                        }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>

                                {/* Tagline - Left Justified */}
                                <motion.p
                                    className="text-gray-500 text-sm leading-relaxed mb-4 text-left w-full group-hover:text-gray-400 transition-colors"
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {project.tagline}
                                </motion.p>

                                {/* Title - Right Justified */}
                                <motion.h3
                                    className="text-2xl font-bold text-white mb-6 text-right w-full group-hover:text-primary transition-colors tracking-tight"
                                    whileHover={{ x: -3 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {project.title}
                                </motion.h3>

                                {/* Hover Reveal Content */}
                                <div className="w-full space-y-4">
                                    {/* Stats - Fade in on hover */}
                                    {project.stats && (
                                        <motion.div
                                            className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 opacity-0"
                                            whileHover={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {project.stats.map((stat, statIdx) => (
                                                <motion.div
                                                    key={statIdx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileHover={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.15 + statIdx * 0.05 }}
                                                    className="text-center"
                                                >
                                                    <div className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">
                                                        {stat.label}
                                                    </div>
                                                    <div className="text-lg font-mono text-white font-bold">
                                                        {stat.value}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* Tags - Stagger reveal */}
                                    <motion.div
                                        className="flex flex-wrap gap-2 justify-center opacity-0"
                                        whileHover={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {project.tags.map((tag, tagIdx) => (
                                            <motion.span
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileHover={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.25 + tagIdx * 0.05 }}
                                                className="px-2 py-1 bg-white/5 text-[9px] uppercase tracking-wider font-bold text-gray-500 rounded-sm group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>

                                    {/* "Sounds Interesting" Button - Slide up */}
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 text-primary text-[10px] uppercase tracking-[0.3em] font-bold rounded-lg group-hover:bg-primary group-hover:text-black transition-all duration-300"
                                    >
                                        <span>Sounds Interesting</span>
                                        <Icon3D icon="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* GitHub Connection Banner */}
                <ScrollReveal delay={200}>
                    <div className="mt-24 rounded-3xl bg-background-dark border border-white/5 p-12 lg:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-tech-grid opacity-10" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                                    <span className="font-serif">
                                        <Editable id="projects-gh-title-1" as="span">Explore on</Editable>
                                    </span>{' '}
                                    <span className="text-primary">
                                        <Editable id="projects-gh-title-2" as="span">GitHub</Editable>
                                    </span>
                                </h3>
                                <p className="text-gray-400 text-lg max-w-2xl">
                                    <Editable id="projects-gh-desc" as="span">
                                        All our projects are open source. Star us on GitHub to stay updated with the latest releases and contribute to the future of AI agent infrastructure.
                                    </Editable>
                                </p>
                            </div>
                            <a
                                href="https://github.com/aegntic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 px-10 py-5 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                            >
                                <Icon3D icon="Globe" size={20} />
                                github.com/aegntic
                                <Icon3D icon="ArrowRight" size={18} />
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Modal for Blog Article */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative max-w-4xl w-full max-h-[90vh] bg-surface-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 z-10 bg-surface-dark/95 backdrop-blur-sm border-b border-white/5 p-6 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-primary font-mono text-[10px] uppercase tracking-widest">
                                            {selectedProject.language}
                                        </span>
                                        <span className="text-gray-600 font-mono text-[10px] tracking-widest">
                                            {selectedProject.github}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                        {blogContent ? blogContent.title : selectedProject.title}
                                    </h2>
                                </div>
                                <motion.button
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeModal}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <Icon3D icon="X" size={20} className="text-gray-400" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                                {loadingBlog ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="text-gray-400">Loading article...</div>
                                    </div>
                                ) : blogContent ? (
                                    <article className="prose prose-invert prose-lg max-w-none">
                                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                            {blogContent.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                                            <div className="flex items-center gap-2">
                                                <Icon3D icon="Calendar" size={14} />
                                                <span>{blogContent.pubDate}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {blogContent.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-500 rounded-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="text-gray-300 leading-relaxed whitespace-pre-line font-light">
                                            {blogContent.content}
                                        </div>
                                    </article>
                                ) : (
                                    <div>
                                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                            {selectedProject.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-500 rounded-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={`https://${selectedProject.github}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-primary/90 transition-all"
                                        >
                                            <Icon3D icon="Globe" size={18} />
                                            View on GitHub
                                            <Icon3D icon="ArrowRight" size={16} />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-surface-dark/95 backdrop-blur-sm border-t border-white/5 p-4 flex justify-between items-center">
                                <button
                                    onClick={closeModal}
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Close
                                </button>
                                {selectedProject.github && (
                                    <a
                                        href={`https://${selectedProject.github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                                    >
                                        <Icon3D icon="Globe" size={14} />
                                        View Repository
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
