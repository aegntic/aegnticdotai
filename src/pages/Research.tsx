import React, { useState } from 'react';
import Icon3D from '../components/Icon3D';
import ScrollReveal from '../components/ScrollReveal';
import { Editable, EditableIcon } from '../components/DevTools';
import { motion, AnimatePresence } from 'framer-motion';

const Research: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [previewMode, setPreviewMode] = useState(false);

    // Real blog posts from your local machine
    const blogPosts = [
        {
            id: '01',
            file: 'why-we-built-aegntic.md',
            date: 'Jan 15 2024',
            title: 'The AI Operating System: Why We Built Aegntic',
            desc: 'Our founding vision for an AI ecosystem that achieves 97% human authenticity while saving 10x development time. The journey from idea to a 40+ platform ecosystem.',
            category: 'Vision',
            tags: ['aegntic', 'AI', 'founding-story'],
            readTime: '8 min',
            content: `
# The AI Operating System: Why We Built Aegntic

Every day, millions of hours are lost. Developers spend 40% of their time on documentation. Enterprises lose $156 billion annually to repetitive tasks. And 73% of AI-generated content gets flagged as fake.

We founded Aegntic to solve these problems at their root.

## The Problems We Saw

### The Documentation Crisis
Remote work created an unprecedented documentation burden. Teams are distributed, context is lost, and institutional knowledge evaporates when people leave.

### The Authenticity Gap
AI-generated content has a trust problem. Detection tools can identify synthetic content with increasing accuracy.

### The Integration Nightmare
Every AI tool operates in isolation. Developers juggle a dozen different services.

## Our Vision: The AI Operating System

What if there was a unified ecosystem where documentation happens automatically, AI output achieves 97%+ human authenticity, and all your AI services orchestrate seamlessly?
            `
        },
        {
            id: '02',
            file: 'aegntic-growth-story.md',
            date: 'Dec 15 2024',
            title: 'From 0 to 40 Platforms: The Aegntic Growth Story',
            desc: 'The first year of building Aegntic. From a single idea to 40+ interconnected platforms. Lessons, mistakes, and what we would do differently.',
            category: 'Growth',
            tags: ['growth', 'ecosystem', 'lessons'],
            readTime: '12 min',
            content: `# From 0 to 40 Platforms

The journey began with a simple question: Why can't AI tools work together? Twelve months later, we have 40+ interconnected platforms...`
        },
        {
            id: '03',
            file: 'building-ai-agent-skills.md',
            date: 'Dec 19 2024',
            title: 'Building Reusable AI Agent Skills: A Complete Guide',
            desc: 'Learn how to create, structure, and manage reusable skills for AI agents. From emerging patterns to formalized capabilities.',
            category: 'AI Agents',
            tags: ['AI', 'agents', 'skills'],
            readTime: '10 min',
            content: `# Building Reusable AI Agent Skills

The future of AI isn't monolithic models—it's composable capabilities. Here's how we think about agent skills...`
        },
        {
            id: '04',
            file: 'ai-human-symbiosis.md',
            date: 'Dec 01 2024',
            title: 'AI-Human Symbiosis: The Path to Augmented Intelligence',
            desc: 'Not AI vs humans. AI with humans. Exploring the symbiotic relationship between artificial and human intelligence that defines the Aegntic approach.',
            category: 'Philosophy',
            tags: ['AI', 'philosophy', 'future'],
            readTime: '7 min',
            content: `# AI-Human Symbiosis

The AI discourse is often framed as competition. This framing misses the point. The future isn't AI vs. humans. It's AI with humans...`
        },
        {
            id: '05',
            file: 'building-40-platform-ai-ecosystem.md',
            date: 'Jul 20 2024',
            title: 'Building a 40+ Platform AI Ecosystem: Architecture Lessons',
            desc: 'How we scaled from one project to 40+ interconnected platforms. Modular architecture, shared infrastructure, and the principles that made it work.',
            category: 'Architecture',
            tags: ['architecture', 'scaling', 'ecosystem'],
            readTime: '15 min',
            content: `# Building a 40+ Platform AI Ecosystem

Scaling from one to forty platforms required rethinking everything about architecture...`
        },
        {
            id: '06',
            file: 'building-dailydoco-from-40-percent-time-waste-to-zero-effort-docs.md',
            date: 'Apr 28 2024',
            title: 'Building DailyDoco: From 40% Time Waste to Zero-Effort Docs',
            desc: 'The complete product story of DailyDoco, from 3am production crash to automated documentation that captures developer knowledge in real-time with 98% coverage.',
            category: 'Product',
            tags: ['documentation', 'automation', 'product'],
            readTime: '18 min',
            content: `# Building DailyDoco

It was 3am when production crashed. The documentation was six months out of date. We knew there had to be a better way...`
        },
        {
            id: '07',
            file: 'aegntic-mcp-standard-framework.md',
            date: 'Jul 30 2024',
            title: 'The Aegntic MCP Standard Framework: Production-Ready MCP Servers',
            desc: 'A comprehensive framework for building MCP servers with modern auth, cloud-first design, auto-documentation, and integrated analytics.',
            category: 'Framework',
            tags: ['MCP', 'framework', 'standards'],
            readTime: '14 min',
            content: `# The Aegntic MCP Standard Framework

Model Context Protocol is revolutionizing AI service integration. Here's our production-ready framework...`
        },
        {
            id: '08',
            file: 'claude-flow-enterprise-orchestration.md',
            date: 'Aug 10 2024',
            title: 'Claude-Flow: Enterprise AI Agent Orchestration',
            desc: 'Building an enterprise-grade system for coordinating multiple AI agents. Performance monitoring, swarm intelligence, and real-time dashboards.',
            category: 'Enterprise',
            tags: ['orchestration', 'enterprise', 'AI'],
            readTime: '16 min',
            content: `# Claude-Flow: Enterprise AI Agent Orchestration

Coordinating multiple AI agents at scale requires new patterns. Here's what we learned...`
        },
        {
            id: '09',
            file: '415-billion-ai-developer-tools.md',
            date: 'Sep 10 2024',
            title: 'The $415 Billion Opportunity: AI Developer Tools',
            desc: 'Market analysis of the AI developer tools landscape. From documentation automation to multi-model orchestration, where the value is being created.',
            category: 'Market',
            tags: ['market', 'AI', 'developer-tools'],
            readTime: '11 min',
            content: `# The $415 Billion Opportunity

AI developer tools represent one of the largest market opportunities in technology history...`
        },
        {
            id: '10',
            file: 'agent-neo-autonomous-ebook-generation.md',
            date: 'Apr 12 2024',
            title: 'Agent Neo: How We Automated Ebook Generation in 45 Minutes',
            desc: 'The complete workflow for autonomous dual-track ebook creation. From topic input to 2,300-word ebooks with quality scoring and visual generation prompts.',
            category: 'Automation',
            tags: ['automation', 'AI', 'ebooks'],
            readTime: '9 min',
            content: `# Agent Neo: Autonomous Ebook Generation

In 45 minutes, we built a system that generates complete ebooks. Here's the breakdown...`
        },
        {
            id: '11',
            file: 'birth-of-prologue-mcp-discovery.md',
            date: 'Oct 18 2024',
            title: 'The Birth of Prologue: Universal MCP Discovery System',
            desc: 'A personal journal entry on creating Prologue - the intelligent MCP server discovery system that reduced setup time from 3 hours to 8 minutes.',
            category: 'Tools',
            tags: ['MCP', 'discovery', 'tools'],
            readTime: '6 min',
            content: `# The Birth of Prologue

Setting up MCP servers was taking 3 hours. We built Prologue and reduced it to 8 minutes...`
        },
        {
            id: '12',
            file: 'philosophy-of-no-shortcuts.md',
            date: 'Nov 05 2024',
            title: 'The Philosophy of No Shortcuts: Building for the Long Term',
            desc: 'Why we take the hard path. The long-term thinking that guides Aegntic\'s approach to building sustainable AI infrastructure.',
            category: 'Philosophy',
            tags: ['philosophy', 'long-term', 'values'],
            readTime: '8 min',
            content: `# The Philosophy of No Shortcuts

Everyone wants the quick win. We chose the hard path. Here's why...`
        }
    ];

    const categories = ['All', 'Vision', 'AI Agents', 'Architecture', 'Enterprise', 'Framework', 'Product', 'Philosophy'];

    const filteredPosts = filter === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === filter);

    const displayedPosts = filteredPosts.slice(0, visibleCount);

    const handleCardClick = (post: any) => {
        setSelectedPost(post);
        setPreviewMode(true);
    };

    const handleReadArticle = (e: React.MouseEvent, post: any) => {
        e.stopPropagation();
        setSelectedPost(post);
        setPreviewMode(false);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setPreviewMode(false);
    };

    return (
        <div className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row-reverse md:items-end justify-between mb-16 gap-8 text-right">
                    <div>
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Editable id="research-subtitle" as="span">aegntic.research</Editable>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            <Editable id="research-title-1" as="span">Research</Editable>{' '}
                            <span className="text-primary">
                                <Editable id="research-title-2" as="span">& Blog</Editable>
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${filter === cat ? 'bg-primary border-primary text-black' : 'border-white/10 text-gray-400 hover:border-primary/50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                <ScrollReveal>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative w-full rounded-2xl bg-surface-dark/40 border border-white/5 overflow-hidden mb-12 group cursor-pointer hover:border-primary/20 transition-all duration-500"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10 z-10" />
                                <motion.img
                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
                                    alt="Featured"
                                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                />
                            </div>
                            <div className="p-12 flex flex-col justify-center items-end text-right">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-mono text-[10px] tracking-widest uppercase">{blogPosts[0].category}</span>
                                    <span className="text-gray-600 font-mono text-[10px] tracking-widest uppercase">{blogPosts[0].date}</span>
                                </div>
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight"
                                    whileHover={{ x: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {blogPosts[0].title}
                                </motion.h2>
                                <p className="text-gray-400 mb-8 leading-relaxed max-w-lg">
                                    {blogPosts[0].desc}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                                    <div className="flex items-center gap-2">
                                        <Icon3D icon="Clock" size={14} />
                                        <span>{blogPosts[0].readTime}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {blogPosts[0].tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-600">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <motion.button
                                    onClick={(e) => handleReadArticle(e, blogPosts[0])}
                                    className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn"
                                    whileHover={{ x: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Read Article <Icon3D icon="ArrowRight" size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </ScrollReveal>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedPosts.slice(1).map((post, idx) => (
                        <ScrollReveal key={post.id} delay={idx * 100}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                onClick={() => handleCardClick(post)}
                                className="group h-full relative p-8 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 flex flex-col cursor-pointer"
                            >
                                {/* Animated corner accents */}
                                <motion.div
                                    className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                />

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <div className="relative z-10 flex justify-between items-start mb-6">
                                    <motion.div
                                        className="text-[10px] font-mono tracking-widest text-primary/60 group-hover:text-primary transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {post.category}
                                    </motion.div>
                                    <div className="text-[10px] font-mono tracking-widest text-gray-600">{post.date}</div>
                                </div>

                                <motion.h3
                                    className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight"
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {post.title}
                                </motion.h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow group-hover:text-gray-400 transition-colors">
                                    {post.desc}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Icon3D icon="Clock" size={14} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.slice(0, 3).map((tag, tagIdx) => (
                                        <motion.span
                                            key={tag}
                                            className="px-2 py-1 bg-white/5 text-[9px] uppercase tracking-wider font-bold text-gray-500 rounded-sm group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ delay: tagIdx * 0.05 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                <motion.div
                                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white group-hover:text-primary transition-colors mt-auto"
                                    whileHover={{ x: 3 }}
                                >
                                    <span>Click to preview</span>
                                    <Icon3D icon="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredPosts.length && (
                    <ScrollReveal>
                        <div className="flex justify-center mt-12">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setVisibleCount(prev => Math.min(prev + 9, filteredPosts.length))}
                                className="group relative px-12 py-5 bg-surface-dark/40 border border-white/10 overflow-hidden text-white transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] hover:bg-primary/5"
                            >
                                <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-border-top"></span>
                                <span className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent animate-border-right" style={{ animationDelay: '0.5s' }}></span>
                                <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-primary to-transparent animate-border-bottom" style={{ animationDelay: '1s' }}></span>
                                <span className="absolute left-0 bottom-0 h-full w-[1px] bg-gradient-to-t from-transparent via-primary to-transparent animate-border-left" style={{ animationDelay: '1.5s' }}></span>
                                <span className="relative flex items-center gap-3 font-mono text-sm tracking-widest uppercase font-bold">
                                    Load More Articles
                                    <Icon3D icon="ArrowRight" size={16} className="group-hover:translate-x-2 transition-transform" />
                                </span>
                            </motion.button>
                        </div>
                    </ScrollReveal>
                )}

                {/* Stats Section */}
                <ScrollReveal delay={200}>
                    <div className="mt-24 rounded-3xl bg-background-dark border border-white/5 p-12 lg:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-tech-grid opacity-10" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">
                                <Editable id="research-stats-heading" as="span">Research</Editable>{' '}
                                <span className="text-primary">
                                    <Editable id="research-stats-heading-2" as="span">Archive</Editable>
                                </span>
                            </h3>
                            <div className="flex flex-wrap justify-center gap-16">
                                <div>
                                    <motion.div
                                        className="text-5xl font-mono text-white font-bold mb-2"
                                        whileHover={{ scale: 1.05, color: '#00f0ff' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {blogPosts.length}+
                                    </motion.div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-600">Articles Published</div>
                                </div>
                                <div>
                                    <motion.div
                                        className="text-5xl font-mono text-white font-bold mb-2"
                                        whileHover={{ scale: 1.05, color: '#00f0ff' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        2024
                                    </motion.div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-600">Year Founded</div>
                                </div>
                                <div>
                                    <motion.div
                                        className="text-5xl font-mono text-white font-bold mb-2"
                                        whileHover={{ scale: 1.05, color: '#00f0ff' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        40+
                                    </motion.div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-600">Platforms Built</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Modal for Preview/Full Article */}
            <AnimatePresence>
                {selectedPost && (
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
                                        <span className="text-primary font-mono text-[10px] uppercase tracking-widest">{selectedPost.category}</span>
                                        <span className="text-gray-600 font-mono text-[10px] tracking-widest">{selectedPost.date}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selectedPost.title}</h2>
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
                                {previewMode ? (
                                    <div>
                                        <p className="text-gray-400 text-lg leading-relaxed mb-8">{selectedPost.desc}</p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                                            <div className="flex items-center gap-2">
                                                <Icon3D icon="Clock" size={14} />
                                                <span>{selectedPost.readTime}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {selectedPost.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-500 rounded-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setPreviewMode(false)}
                                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-primary/90 transition-all"
                                        >
                                            Read Full Article
                                            <Icon3D icon="ArrowRight" size={16} />
                                        </motion.button>
                                    </div>
                                ) : (
                                    <article className="prose prose-invert prose-lg max-w-none">
                                        <div className="text-gray-300 leading-relaxed whitespace-pre-line font-light">
                                            {selectedPost.content}
                                        </div>
                                    </article>
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
                                {!previewMode && (
                                    <button
                                        onClick={() => setPreviewMode(true)}
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Back to Preview
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Research;
