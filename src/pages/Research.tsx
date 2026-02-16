import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { Clock, ArrowRight, X } from 'lucide-react';

const Research: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [previewMode, setPreviewMode] = useState(false);

    const blogPosts = [
        {
            id: '01', date: 'Jan 15 2024', category: 'Vision', readTime: '8 min',
            title: 'The AI Operating System: Why We Built Aegntic',
            desc: 'Our founding vision for an AI ecosystem that achieves 97% human authenticity while saving 10x development time.',
            tags: ['aegntic', 'AI', 'founding-story'],
            content: `# The AI Operating System: Why We Built Aegntic\n\nEvery day, millions of hours are lost. Developers spend 40% of their time on documentation...`,
        },
        {
            id: '02', date: 'Dec 15 2024', category: 'Growth', readTime: '12 min',
            title: 'From 0 to 40 Platforms: The Aegntic Growth Story',
            desc: 'The first year of building Aegntic. From a single idea to 40+ interconnected platforms.',
            tags: ['growth', 'ecosystem', 'lessons'],
            content: `# From 0 to 40 Platforms\n\nThe journey began with a simple question: Why can't AI tools work together?`,
        },
        {
            id: '03', date: 'Dec 19 2024', category: 'AI Agents', readTime: '10 min',
            title: 'Building Reusable AI Agent Skills: A Complete Guide',
            desc: 'Learn how to create, structure, and manage reusable skills for AI agents.',
            tags: ['AI', 'agents', 'skills'],
            content: `# Building Reusable AI Agent Skills\n\nThe future of AI isn't monolithic models—it's composable capabilities.`,
        },
        {
            id: '04', date: 'Dec 01 2024', category: 'Philosophy', readTime: '7 min',
            title: 'AI-Human Symbiosis: The Path to Augmented Intelligence',
            desc: 'Not AI vs humans. AI with humans. Exploring the symbiotic relationship.',
            tags: ['AI', 'philosophy', 'future'],
            content: `# AI-Human Symbiosis\n\nThe AI discourse is often framed as competition. This framing misses the point.`,
        },
        {
            id: '05', date: 'Jul 20 2024', category: 'Architecture', readTime: '15 min',
            title: 'Building a 40+ Platform AI Ecosystem: Architecture Lessons',
            desc: 'How we scaled from one project to 40+ interconnected platforms.',
            tags: ['architecture', 'scaling', 'ecosystem'],
            content: `# Building a 40+ Platform AI Ecosystem\n\nScaling from one to forty platforms required rethinking everything.`,
        },
        {
            id: '06', date: 'Apr 28 2024', category: 'Product', readTime: '18 min',
            title: 'Building DailyDoco: From 40% Time Waste to Zero-Effort Docs',
            desc: 'The complete product story of DailyDoco, from 3am production crash to automated documentation.',
            tags: ['documentation', 'automation', 'product'],
            content: `# Building DailyDoco\n\nIt was 3am when production crashed. The documentation was six months out of date.`,
        },
        {
            id: '07', date: 'Jul 30 2024', category: 'Framework', readTime: '14 min',
            title: 'The Aegntic MCP Standard Framework',
            desc: 'A comprehensive framework for building MCP servers with modern auth and cloud-first design.',
            tags: ['MCP', 'framework', 'standards'],
            content: `# The Aegntic MCP Standard Framework\n\nModel Context Protocol is revolutionizing AI service integration.`,
        },
        {
            id: '08', date: 'Aug 10 2024', category: 'Enterprise', readTime: '16 min',
            title: 'Claude-Flow: Enterprise AI Agent Orchestration',
            desc: 'Building an enterprise-grade system for coordinating multiple AI agents.',
            tags: ['orchestration', 'enterprise', 'AI'],
            content: `# Claude-Flow\n\nCoordinating multiple AI agents at scale requires new patterns.`,
        },
        {
            id: '09', date: 'Sep 10 2024', category: 'Market', readTime: '11 min',
            title: 'The $415 Billion Opportunity: AI Developer Tools',
            desc: 'Market analysis of the AI developer tools landscape.',
            tags: ['market', 'AI', 'developer-tools'],
            content: `# The $415 Billion Opportunity\n\nAI developer tools represent one of the largest market opportunities.`,
        },
        {
            id: '10', date: 'Apr 12 2024', category: 'Automation', readTime: '9 min',
            title: 'Agent Neo: Automated Ebook Generation in 45 Minutes',
            desc: 'The complete workflow for autonomous dual-track ebook creation.',
            tags: ['automation', 'AI', 'ebooks'],
            content: `# Agent Neo\n\nIn 45 minutes, we built a system that generates complete ebooks.`,
        },
        {
            id: '11', date: 'Oct 18 2024', category: 'Tools', readTime: '6 min',
            title: 'The Birth of Prologue: Universal MCP Discovery System',
            desc: 'A personal journal entry on creating Prologue — the intelligent MCP server discovery system.',
            tags: ['MCP', 'discovery', 'tools'],
            content: `# The Birth of Prologue\n\nSetting up MCP servers was taking 3 hours. We built Prologue and reduced it to 8 minutes.`,
        },
        {
            id: '12', date: 'Nov 05 2024', category: 'Philosophy', readTime: '8 min',
            title: 'The Philosophy of No Shortcuts',
            desc: 'Why we take the hard path. The long-term thinking that guides Aegntic.',
            tags: ['philosophy', 'long-term', 'values'],
            content: `# The Philosophy of No Shortcuts\n\nEveryone wants the quick win. We chose the hard path.`,
        },
    ];

    const categories = ['All', 'Vision', 'AI Agents', 'Architecture', 'Enterprise', 'Framework', 'Product', 'Philosophy'];
    const filteredPosts = filter === 'All' ? blogPosts : blogPosts.filter(p => p.category === filter);
    const displayedPosts = filteredPosts.slice(0, visibleCount);

    const closeModal = () => { setSelectedPost(null); setPreviewMode(false); };

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <ScrollReveal>
                        <div>
                            <span className="section-label">/train/research --papers</span>
                            <h2 className="section-header mt-3">
                                Research <span className="text-accent-blue">& Blog</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`neu-pill !py-2 !px-4 !text-[10px] !tracking-widest ${filter === cat
                                    ? '!bg-accent-blue !text-deep-space !shadow-none'
                                    : ''
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                <ScrollReveal>
                    <div
                        className="neu-card mb-12 cursor-pointer group"
                        onClick={() => { setSelectedPost(blogPosts[0]); setPreviewMode(false); }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="aspect-video lg:aspect-auto rounded-xl overflow-hidden neu-inset flex items-center justify-center">
                                <span className="font-display text-6xl font-bold text-surface-raised">01</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-mono-label text-accent-blue">{blogPosts[0].category}</span>
                                    <span className="text-mono-label text-text-dim">{blogPosts[0].date}</span>
                                </div>
                                <h3 className="text-headline font-bold mb-6 group-hover:text-accent-blue transition-colors">
                                    {blogPosts[0].title}
                                </h3>
                                <p className="text-text-muted leading-relaxed mb-8 max-w-lg">
                                    {blogPosts[0].desc}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-text-dim mb-6">
                                    <div className="flex items-center gap-2"><Clock size={14} /><span>{blogPosts[0].readTime}</span></div>
                                    <div className="flex gap-2">
                                        {blogPosts[0].tags.map(tag => (
                                            <span key={tag} className="text-mono-label text-text-dim">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-mono-label text-text-muted group-hover:text-accent-orange transition-colors">
                                    Read Article <ArrowRight size={12} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Blog Grid */}
                <div className="swiss-grid-tiles">
                    {displayedPosts.slice(1).map((post, idx) => (
                        <ScrollReveal key={post.id} delay={idx * 80}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.25 }}
                                onClick={() => { setSelectedPost(post); setPreviewMode(true); }}
                                className="neu-card group h-full flex flex-col cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-mono-label text-accent-blue group-hover:text-accent-orange transition-colors">{post.category}</span>
                                    <span className="text-mono-label text-text-dim">{post.date}</span>
                                </div>

                                <h3 className="font-display text-lg font-bold text-text-primary mb-4 tracking-tight group-hover:text-accent-blue transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
                                    {post.desc}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-text-dim mb-4">
                                    <Clock size={14} /> {post.readTime}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="data-badge !text-text-dim group-hover:!text-accent-blue transition-colors">{tag}</span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-mono-label text-text-muted group-hover:text-accent-orange transition-colors mt-auto">
                                    Click to preview <ArrowRight size={12} />
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < filteredPosts.length && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setVisibleCount(prev => Math.min(prev + 9, filteredPosts.length))}
                            className="neu-pill-orange flex items-center gap-3"
                        >
                            Load More Articles <ArrowRight size={16} />
                        </button>
                    </div>
                )}

                {/* Stats Section */}
                <ScrollReveal delay={200}>
                    <div className="mt-24 neu-raised p-10 lg:p-14 text-center">
                        <h3 className="text-headline font-bold mb-12">
                            Research <span className="text-accent-blue">Archive</span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-16">
                            {[
                                { value: `${blogPosts.length}+`, label: 'Articles Published' },
                                { value: '2024', label: 'Year Founded' },
                                { value: '40+', label: 'Platforms Built' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-5xl font-display text-text-primary font-bold mb-2 hover:text-accent-blue transition-colors cursor-default">
                                        {stat.value}
                                    </div>
                                    <div className="text-mono-label text-text-dim">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-deep-space/80"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative max-w-4xl w-full max-h-[90vh] neu-raised overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="sticky top-0 z-10 bg-surface border-b border-white/5 p-6 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-mono-label text-accent-blue">{selectedPost.category}</span>
                                        <span className="text-mono-label text-text-dim">{selectedPost.date}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">{selectedPost.title}</h2>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={20} className="text-text-muted" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                                {previewMode ? (
                                    <div>
                                        <p className="text-text-muted text-lg leading-relaxed mb-8">{selectedPost.desc}</p>
                                        <div className="flex items-center gap-2 text-sm text-text-dim mb-8"><Clock size={14} />{selectedPost.readTime}</div>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {selectedPost.tags.map((tag: string) => (
                                                <span key={tag} className="data-badge">{tag}</span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setPreviewMode(false)}
                                            className="neu-pill-orange w-full flex items-center justify-center gap-3"
                                        >
                                            Read Full Article <ArrowRight size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <article className="prose prose-invert prose-lg max-w-none">
                                        <div className="text-text-muted leading-relaxed whitespace-pre-line">{selectedPost.content}</div>
                                    </article>
                                )}
                            </div>

                            <div className="sticky bottom-0 bg-surface border-t border-white/5 p-4 flex justify-between items-center">
                                <button onClick={closeModal} className="text-sm text-text-muted hover:text-text-primary transition-colors">Close</button>
                                {!previewMode && (
                                    <button onClick={() => setPreviewMode(true)} className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
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
