import React from 'react';
import { motion } from 'framer-motion';
import { Network, FlaskConical, GraduationCap, Building2, Globe2, ArrowRight, Shield, Database, Brain } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Editable, EditableIcon } from '../components/DevTools';

const Collaborations: React.FC = () => {
    const partners = [
        { name: 'MIT', focus: 'ZK Systems Research', icon: 'GraduationCap' },
        { name: 'ETH Zurich', focus: 'Cryptography Group', icon: 'FlaskConical' },
        { name: 'CMU', focus: 'AI & Privacy Lab', icon: 'Network' },
        { name: 'Stanford', focus: 'Security Lab', icon: 'Shield' },
        { name: 'NVIDIA', focus: 'Compute Optimization', icon: 'Building2' },
        { name: 'Cloudflare', focus: 'Edge Distribution', icon: 'Globe2' },
        { name: 'OpenLayer', focus: 'Data Verification', icon: 'Database' },
        { name: 'Sentience', focus: 'Agentic Research', icon: 'Brain' }
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
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Editable id="colabs-subtitle" as="span">Academic & Industry Network</Editable>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                            <Editable id="colabs-title-1" as="span">Ecosystem</Editable>{' '}
                            <span className="text-primary">
                                <Editable id="colabs-title-2" as="span">Collaborations</Editable>
                            </span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
                            <Editable id="colabs-desc" as="span">
                                We partner with world-class institutions and leading technology companies to push the boundaries of what's possible in autonomous systems research.
                            </Editable>
                        </p>
                    </ScrollReveal>
                </div>

                {/* Dynamic Partner Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {partners.map((partner, idx) => (
                        <ScrollReveal key={partner.name} delay={idx * 100}>
                            <div className="group h-full p-10 rounded-3xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-default flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                                    <EditableIcon id={`colabs-partner-${idx}-icon`} icon={partner.icon} size={32} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                    <Editable id={`colabs-partner-${idx}-name`} as="span">{partner.name}</Editable>
                                </h3>
                                <p className="text-gray-500 text-sm italic font-serif">
                                    <Editable id={`colabs-partner-${idx}-focus`} as="span">{partner.focus}</Editable>
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
                            <h2 className="text-3xl font-bold mb-6 relative z-10 tracking-tight">
                                <span className="font-serif"><Editable id="colabs-residency-title-1" as="span">Academic</Editable></span>{' '}
                                <span className="font-normal italic text-gray-300"><Editable id="colabs-residency-title-2" as="span">Residency</Editable></span>{' '}
                                <span className="text-primary"><Editable id="colabs-residency-title-3" as="span">Program</Editable></span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                                <Editable id="colabs-residency-desc" as="span">
                                    We host PhD researchers and post-doctoral fellows from our partner institutions for 12-month residencies focused on proprietary ZK-proof optimizations and agentic alignment theory.
                                </Editable>
                            </p>
                            <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn relative z-10">
                                <Editable id="colabs-residency-cta" as="span">Review Application Process</Editable> <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="h-full p-12 rounded-3xl bg-surface-dark/40 border border-white/5 relative overflow-hidden group">
                            <h2 className="text-3xl font-bold mb-6 relative z-10 tracking-tight">
                                <span className="font-serif"><Editable id="colabs-venture-title-1" as="span">Venture</Editable></span>{' '}
                                <span className="text-primary italic font-serif"><Editable id="colabs-venture-title-2" as="span">Partners</Editable></span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                                <Editable id="colabs-venture-desc" as="span">
                                    Supporting the next generation of founders building on the Aegntic protocol. We provide technical mentorship and compute credits for selected early-stage agentic initiatives.
                                </Editable>
                            </p>
                            <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/btn relative z-10">
                                <Editable id="colabs-venture-cta" as="span">Explore Portfolio</Editable> <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </motion.div>
    );
};

export default Collaborations;
