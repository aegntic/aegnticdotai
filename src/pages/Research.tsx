import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Play, BookOpen, Clock, Users, Network } from 'lucide-react';

import ScrollReveal from '../components/ScrollReveal';
import { Editable, EditableIcon } from '../components/DevTools';

const Research: React.FC = () => {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Zero Knowledge', 'Multi-Agent', 'Ecosystem', 'Security'];

    const nodes = [
        {
            id: '01',
            date: '24.10.12',
            category: 'NEWS',
            title: 'Series B Funding Secured',
            desc: 'Aegntic.ai raises $85M to expand the physical infrastructure of the Data Fabric initiative globally.',
            linkTitle: 'READ NODE',
            type: 'news'
        },
        {
            id: '02',
            date: '24.10.08',
            category: 'PODCAST',
            title: 'The Ethics of Synthesis',
            desc: 'CTO Elena Vosk discusses the moral imperatives of generative AI on the \'Future Minds\' broadcast.',
            linkTitle: 'LISTEN STREAM',
            type: 'audio'
        },
        {
            id: '03',
            date: '24.09.28',
            category: 'AWARD',
            title: 'Design Innovation of the Year',
            desc: 'Recognized by the International Digital Consortium for our breakthrough interface design \'Liquid Glass\'.',
            linkTitle: 'VIEW AWARD',
            type: 'award'
        },
        {
            id: '04',
            date: '24.09.15',
            category: 'VIDEO',
            title: 'Project: Deep Horizon',
            desc: 'A visual journey into our deep learning labs. See how we train models on exascale datasets.',
            linkTitle: 'WATCH LOG',
            type: 'video'
        },
        {
            id: '05',
            date: '24.08.30',
            category: 'OPINION',
            title: 'Architecting Sentience',
            desc: 'Our manifesto on why structure matters more than scale in the quest for Artificial General Intelligence.',
            linkTitle: 'DECIPHER TEXT',
            type: 'text'
        }
    ];

    return (
        <div
            className="py-20 px-6"
        >
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Editable id="research-subtitle" as="span">Central Intelligence Archive</Editable>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            <Editable id="research-title-1" as="span">aegntic</Editable>
                            <span className="text-primary">
                                <Editable id="research-title-2" as="span">.research</Editable>
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${filter === cat ? 'bg-primary border-primary text-black' : 'border-white/10 text-gray-400 hover:border-primary/50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Large Node */}
                <ScrollReveal>
                    <div className="relative w-full rounded-2xl bg-surface-dark/40 border border-white/5 overflow-hidden mb-12 group cursor-pointer hover:border-primary/20 transition-all duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-transparent to-transparent z-10" />
                                <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2078&auto=format&fit=crop" alt="Featured" className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000" />
                            </div>
                            <div className="p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-mono text-[10px] tracking-widest uppercase">PROTOCOL_07</span>
                                    <span className="text-gray-600 font-mono text-[10px] tracking-widest uppercase">24.12.20</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                                    <Editable id="research-featured-title" as="span">Frameworks from AI superusers actual R&D*</Editable>
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    <Editable id="research-featured-desc" as="span">
                                        We deployed 1,000 generative agents in a closed-loop social simulation. The emergent behaviors observed challenge our fundamental understanding of digital consciousness.
                                    </Editable>
                                </p>
                                <a href="#" className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn">
                                    Enter Repository <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Node Grid from Image 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nodes.map((node, idx) => (
                        <ScrollReveal key={node.id} delay={idx * 100}>
                            <div className="group h-full relative p-8 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 flex flex-col cursor-pointer">
                                {/* Visual Corner Accents */}
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-[10px] font-mono tracking-widest text-primary/60">NODE_{node.id} // {node.category}</div>
                                    <div className="text-[10px] font-mono tracking-widest text-gray-600">{node.date}</div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
                                    {node.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow">
                                    {node.desc}
                                </p>

                                {node.type === 'video' && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 mb-6 group/vid">
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 group-hover/vid:bg-black/20 transition-colors">
                                            <Play size={24} className="text-white opacity-50 group-hover/vid:opacity-100 group-hover/vid:scale-110 transition-all" />
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-30" />
                                    </div>
                                )}

                                {node.type === 'audio' && (
                                    <div className="relative h-10 rounded-lg bg-black/40 border border-white/5 mb-6 flex items-center px-4 gap-3">
                                        <Play size={14} className="text-primary" />
                                        <div className="flex-grow h-1 bg-white/5 rounded-full relative overflow-hidden">
                                            <div className="absolute top-0 left-0 h-full w-1/3 bg-primary" />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white group-hover:text-primary transition-colors">
                                    {node.linkTitle} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}

                    {/* Subscribe Card */}
                    <ScrollReveal delay={600}>
                        <div className="group h-full p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-tech-grid opacity-10 animate-grid-move" />
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 relative z-10">
                                <Network className="text-primary animate-pulse" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10 tracking-tight">Subscribe to Signal</h3>
                            <p className="text-gray-500 text-sm mb-8 relative z-10">
                                Get encrypted updates directly to your inbox.
                            </p>
                            <div className="w-full relative z-10 flex gap-2">
                                <input type="email" placeholder="ENTER_EMAIL" className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-[10px] uppercase tracking-widest focus:border-primary transition-colors outline-none font-mono" />
                                <button className="p-3 bg-primary text-black rounded-sm group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Research;
