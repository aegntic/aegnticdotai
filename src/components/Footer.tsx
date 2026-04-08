import React from 'react';
import AeLogo from './AeLogo';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full metal-surface py-16 px-6 z-20 overflow-hidden">
            {/* Oversized embossed ae logo — background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <AeLogo
                    size={600}
                    className="opacity-[0.03]"
                />
            </div>

            {/* Top divider */}
            <div className="section-divider mb-12" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
                {/* Brand + tagline */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <AeLogo size={32} />
                        <div>
                            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
                                aegntic<span className="text-accent-blue">.ai</span>
                            </span>
                            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-dim mt-1">
                                Independent Builder
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

                {/* Stats row — all real */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Repos', value: '184' },
                        { label: 'Commits', value: '5,600+' },
                        { label: 'Stars', value: '42' },
                    ].map((stat) => (
                        <div key={stat.label} className="group cursor-default">
                            <div className="text-mono-label text-text-dim mb-1 group-hover:text-accent-blue transition-colors">
                                {stat.label}
                            </div>
                            <div className="text-xl font-display font-bold text-text-primary">
                                {stat.value}
                            </div>
                        </div>
                    ))}

                    {/* Status */}
                    <div className="col-span-2 md:col-span-1 flex items-center md:justify-end">
                        <div className="data-badge">
                            <span className="sr-only">Active</span>
                            ● Building
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-surface-raised pt-8 gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
                        &copy; 2025 aegntic
                        <span className="ml-4 text-text-dim/40">v2.1.0</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {[
                            { name: 'Twitter', href: 'https://twitter.com/aegntic_ai' },
                            { name: 'GitHub', href: 'https://github.com/aegntic' },
                        ].map((link) => (
                            <Magnetic key={link.name} strength={0.3}>
                                <a
                                    href={link.href}
                                    target="_blank" rel="noopener noreferrer"
                                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim hover:text-accent-blue transition-colors"
                                >
                                    {link.name}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
