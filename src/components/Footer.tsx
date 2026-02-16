import React from 'react';
import AeLogo from './AeLogo';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full bg-surface py-16 px-6 z-20 overflow-hidden">
            {/* Oversized embossed ae· logo — background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <AeLogo
                    size={600}
                    color="rgba(255,255,255,0.015)"
                    className="!filter-none"
                />
            </div>

            {/* Top divider */}
            <div className="section-divider mb-12" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
                {/* Brand + tagline */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <AeLogo size={32} color="var(--color-accent-blue)" />
                        <div>
                            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
                                aegntic<span className="text-accent-blue">.ai</span>
                            </span>
                            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-dim mt-1">
                                Independent Research Foundation
                            </div>
                        </div>
                    </div>

                    {/* Nav links */}
                    <div className="flex flex-wrap gap-6">
                        {['About', 'Research', 'Projects', 'Contact'].map((link) => (
                            <Magnetic key={link} strength={0.2}>
                                <a
                                    href={`#${link.toLowerCase()}`}
                                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim hover:text-accent-blue transition-colors"
                                >
                                    {link}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Compute Power', value: '14.2 PF' },
                        { label: 'Uptime', value: '99.97%', subtitle: 'better than your LLM provider' },
                        { label: 'Active Nodes', value: '200k+' },
                    ].map((stat) => (
                        <div key={stat.label} className="group cursor-default">
                            <div className="text-mono-label text-text-dim mb-1 group-hover:text-accent-blue transition-colors">
                                {stat.label}
                            </div>
                            <div className="text-xl font-display font-bold text-text-primary">
                                {stat.value}
                            </div>
                            {stat.subtitle && (
                                <div className="text-[8px] font-mono text-text-dim mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {stat.subtitle}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Status badge */}
                    <div className="col-span-2 md:col-span-1 flex items-center md:justify-end">
                        <div className="data-badge">
                            <span className="sr-only">Active</span>
                            ● Systems Operational
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-surface-raised pt-8 gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
                        © 2025 Aegntic AI Foundation
                        <span className="ml-4 text-text-dim/40" title="We trained on this footer">v2.0.0-rc.1</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {[
                            { name: 'Twitter', href: '#' },
                            { name: 'GitHub', href: '#' },
                            { name: 'LinkedIn', href: '#' },
                        ].map((link) => (
                            <Magnetic key={link.name} strength={0.3}>
                                <a
                                    href={link.href}
                                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim hover:text-accent-blue transition-colors"
                                >
                                    {link.name}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                {/* Easter egg footer note — visible only to those who look */}
                <div className="text-center">
                    <span className="font-mono text-[7px] text-text-dim/20 select-none" title="No models were harmed in the making of this website">
                        built with {'<'}attention{'>'} · temperature=0.7 · top_p=0.95
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
