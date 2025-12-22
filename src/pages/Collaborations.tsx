import React from 'react';
import { motion } from 'framer-motion';
import { Network, FlaskConical, GraduationCap, Building2, Globe2, ArrowRight, Shield, Database, Brain } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Collaborations: React.FC = () => {
    const partners = [
        { name: 'MIT', focus: 'ZK Systems Research', icon: GraduationCap },
        { name: 'ETH Zurich', focus: 'Cryptography Group', icon: FlaskConical },
        { name: 'CMU', focus: 'AI & Privacy Lab', icon: Network },
        { name: 'Stanford', focus: 'Security Lab', icon: Shield },
        { name: 'NVIDIA', focus: 'Compute Optimization', icon: Building2 },
        { name: 'Cloudflare', focus: 'Edge Distribution', icon: Globe2 },
        { name: 'OpenLayer', focus: 'Data Verification', icon: Database },
        { name: 'Sentience', focus: 'Agentic Research', icon: Brain }
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
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Academic & Industry Network</div>
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">Ecosystem <span className="text-primary">Collaborations</span></h1>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
                            Progress happens in the collective. We partner with the world's leading academic institutions and technology pioneers to push the boundaries of what's possible in the synthetic intelligence space.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Dynamic Partner Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {partners.map((partner, idx) => (
                        <ScrollReveal key={partner.name} delay={idx * 100}>
                            <div className="group h-full p-10 rounded-3xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-default flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                                    <partner.icon className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight">{partner.name}</h3>
                                <p className="text-gray-500 text-sm italic font-serif">
                                    {partner.focus}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Global Impact Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
                    <ScrollReveal>
                        <div className="h-full p-12 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                            <h2 className="text-3xl font-bold mb-6 relative z-10 uppercase tracking-tight">Academic Residency <span className="text-primary">Program</span></h2>
                            <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                                We host PhD researchers and post-doctoral fellows from our partner institutions for 12-month residencies focused on proprietary ZK-proof optimizations and agentic alignment theory.
                            </p>
                            <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn relative z-10">
                                Review Application Process <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="h-full p-12 rounded-3xl bg-surface-dark/40 border border-white/5 relative overflow-hidden group">
                            <h2 className="text-3xl font-bold mb-6 relative z-10 uppercase tracking-tight">Venture <span className="text-primary italic font-serif">Partners</span></h2>
                            <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                                Supporting the next generation of founders building on the Aegntic protocol. We provide technical mentorship and compute credits for selected early-stage agentic initiatives.
                            </p>
                            <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn relative z-10">
                                Explore Portfolio <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </motion.div>
    );
};

export default Collaborations;
