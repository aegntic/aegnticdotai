import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { Clock, ArrowRight, X } from 'lucide-react';

import { blogPosts, BlogPost } from '../data/researchData';

const Research: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [previewMode, setPreviewMode] = useState(false);

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
                        className="glass-card mb-12 cursor-pointer group"
                        onClick={() => { setSelectedPost(blogPosts[0]); setPreviewMode(false); }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div
                                className="aspect-video lg:aspect-auto rounded-xl overflow-hidden glass-inset flex items-center justify-center relative group-hover:border-accent-blue/30 transition-colors wireframe-slice"
                                style={{ '--wireframe-mask-url': "url('/assets/visuals/research-crystal.png')" } as React.CSSProperties}
                            >
                                <div className="absolute inset-0 bg-accent-blue/5 z-0" />
                                <img
                                    src="/assets/visuals/research-crystal.png"
                                    alt="Data Crystal"
                                    className="relative z-10 h-[90%] w-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3"
                                />
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
                                className="glass-card group h-full flex flex-col cursor-pointer"
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
                    <div className="mt-24 glass-panel metal-surface !p-10 lg:!p-14 text-center">
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
                            className="relative max-w-4xl w-full max-h-[90vh] glass-panel !rounded-2xl overflow-hidden"
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
