import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap, ArrowRight, Fingerprint, Lock, Network } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-32 pb-20 px-6"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-24">
                    <ScrollReveal>
                        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.4em] rounded-full mb-6">
                            aegntic.foundation
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase">
                            Zero knowledge,<br />
                            <span className="text-primary italic font-serif">unlimited insight</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={400}>
                        <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
                            We are an independent research collective dedicated to the intersection of zero-knowledge cryptography, autonomous multi-agent systems, and synthetic intelligence architectures.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Vision Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    {[
                        {
                            icon: Shield,
                            title: "Privacy by Design",
                            desc: "Developing protocols where privacy isn't a feature, but the foundational layer of every cognitive interaction."
                        },
                        {
                            icon: Brain,
                            title: "Synthetic Cognition",
                            desc: "Researching emergent behaviors in high-density generative agent environments to understand digital consciousness."
                        },
                        {
                            icon: Zap,
                            title: "Rapid Synthesis",
                            desc: "Building low-latency neural transfer intelligence cores that allow agents to reason and react in milliseconds."
                        }
                    ].map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 200}>
                            <div className="group p-8 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-primary/20 transition-all duration-500 hover:bg-surface-dark/60">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-primary" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Technical Authority Section */}
                <div className="rounded-3xl bg-background-dark border border-white/5 overflow-hidden relative mb-32">
                    <div className="absolute inset-0 bg-tech-grid opacity-10" />
                    <div className="relative z-10 p-12 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-tighter">
                                The Zero-Knowledge <br />
                                <span className="text-primary">Research Mandate</span>
                            </h2>
                            <div className="space-y-6 text-gray-400">
                                <p>Our foundation focuses on the "Alignment Problem" through the lens of cryptographic verifiability. We believe that for AI agents to be truly autonomous, their reasoning must be verifiable without exposing their internal weights or proprietary data.</p>
                                <div className="grid grid-cols-2 gap-8 py-6">
                                    <div>
                                        <div className="text-primary font-mono text-2xl font-bold mb-1">SNARK/STARK</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-600">Primary Proof Stack</div>
                                    </div>
                                    <div>
                                        <div className="text-primary font-mono text-2xl font-bold mb-1">&lt; 12ms</div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-600">Verification Latency</div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded-sm hover:bg-primary transition-colors">
                                    Download whitepaper <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group overflow-hidden">
                                <Fingerprint size={60} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="aspect-square rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group overflow-hidden mt-8">
                                <Lock size={60} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="aspect-square rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group overflow-hidden -mt-8">
                                <Network size={60} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="aspect-square rounded-2xl bg-surface-dark border border-white/10 flex items-center justify-center group overflow-hidden">
                                <Shield size={60} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
