import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Shield, Brain, Globe, Laptop, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Projects: React.FC = () => {
    const projects = [
        {
            id: '01',
            title: 'Neural Core Alpha',
            status: 'Live',
            latency: '< 2ms',
            throughput: '1.2M TPS',
            desc: 'High-performance neural transfer protocol for autonomous agents operating on edge devices.',
            tags: ['System', 'Real-time'],
            color: 'primary'
        },
        {
            id: '02',
            title: 'Ghost Protocol',
            status: 'Beta',
            latency: '< 50ms',
            throughput: '500k TPS',
            desc: 'Privacy-preserving communication layer using advanced recursive SNARKs for state verification.',
            tags: ['Privacy', 'ZK'],
            color: 'purple-500'
        },
        {
            id: '03',
            title: 'Sentient Grid',
            status: 'Stable',
            latency: '< 10ms',
            throughput: '2.5M TPS',
            desc: 'Dynamic load balancing engine for distributed GPU clusters used in large-scale simulation.',
            tags: ['Compute', 'Scaling'],
            color: 'blue-500'
        },
        {
            id: '04',
            title: 'Data Fabric V2',
            status: 'In Dev',
            latency: 'N/A',
            throughput: '10M+ Rows',
            desc: 'Immutable vector history storage for long-term agent memory and experience replay.',
            tags: ['Data', 'Memory'],
            color: 'emerald-500'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 px-6"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-24">
                    <ScrollReveal>
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Autonomous Entity Generation Network</div>
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">The <span className="text-primary">Ecosystem</span></h1>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
                            Discover the core technologies powering the Aegntic.ai ecosystem. From low-latency neural cores to globally distributed data fabrics, our infrastructure is built for the era of synthetic intelligence.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {projects.map((project, idx) => (
                        <ScrollReveal key={project.id} delay={idx * 150}>
                            <div className="group relative rounded-3xl bg-surface-dark/40 border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-500">
                                <div className={`h-3 bg-${project.color}`} style={{ backgroundColor: project.color === 'primary' ? '#00f0ff' : project.color }} />
                                <div className="p-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex gap-3">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-400 rounded-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-10 group-hover:text-gray-300 transition-colors">
                                        {project.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 mb-10 border-y border-white/5 py-8">
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">Global Latency</div>
                                            <div className="text-2xl font-mono text-white font-bold">{project.latency}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">Network Throughput</div>
                                            <div className="text-2xl font-mono text-white font-bold">{project.throughput}</div>
                                        </div>
                                    </div>

                                    <button className="w-full py-4 border border-white/10 hover:border-primary hover:bg-primary/5 text-[10px] uppercase tracking-[0.3em] font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                                        View Technical Specs
                                        <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Global Network Visual */}
                <ScrollReveal>
                    <div className="rounded-3xl bg-background-dark border border-white/5 p-12 lg:p-20 relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-tech-grid opacity-10" />
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">Globally Distributed <span className="text-primary italic font-serif">Intelligence</span></h2>
                            <p className="text-gray-500 text-lg mb-12 italic">"Scale is the only valid metric for digital life."</p>
                            <div className="flex flex-wrap justify-center gap-12">
                                {[
                                    { label: 'Cloud Regions', val: '24' },
                                    { label: 'Edge Nodes', val: '14,000+' },
                                    { label: 'Daily Simulations', val: '5.2M' },
                                    { label: 'Uptime Score', val: '99.99%' },
                                ].map(stat => (
                                    <div key={stat.label}>
                                        <div className="text-4xl font-mono text-white font-bold mb-2 group-hover:text-primary transition-colors">{stat.val}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </motion.div>
    );
};

export default Projects;
