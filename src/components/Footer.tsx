import React from 'react';
import { motion } from 'framer-motion';

interface StatProps {
    label: string;
    value: string;
}

const StatItem: React.FC<StatProps> = ({ label, value }) => (
    <div className="group cursor-default flex flex-col items-center md:items-start">
        <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-1 group-hover:text-primary transition-colors duration-300">
            {label}
        </div>
        <div className="text-lg md:text-xl font-mono text-gray-200 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all">
            {value}
        </div>
    </div>
);

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full border-t border-white/5 bg-black/40 backdrop-blur-sm py-8 px-6 z-20 overflow-hidden">
            {/* Footer Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatItem label="Compute Power" value="14.2 PF" />
                    <StatItem label="Efficiency" value="98.4%" />
                    <StatItem label="Active Nodes" value="200k+" />

                    {/* System Status */}
                    <div className="group cursor-default col-span-2 md:col-span-1 md:text-right md:ml-auto flex items-center h-full">
                        <div className="flex items-center gap-3 justify-center md:justify-end text-emerald-400 text-xs font-mono uppercase tracking-widest bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-900/50 hover:bg-emerald-950/50 transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Systems Operational
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 gap-4">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gray-600">
                        © 2024 Aegntic AI Foundation. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        {['Twitter', 'GitHub', 'LinkedIn', 'Support'].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
