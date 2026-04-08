import ScrollReveal from '../components/ScrollReveal';
import { Code, GitBranch, Cpu, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
    const focusAreas = [
        {
            icon: Code,
            title: 'AGENT INFRASTRUCTURE',
            desc: 'Building the tools that make AI agents more capable — from memory systems (beads) to autonomous runtimes (zeroclaw, clawreform). Rust and TypeScript at the core.',
        },
        {
            icon: GitBranch,
            title: 'OPEN SOURCE ECOSYSTEMS',
            desc: 'CLDCDE — the community hub for Claude Code extensions with 9 stars and growing. 184 public repos exploring every corner of the AI agent stack.',
        },
        {
            icon: Cpu,
            title: 'REAL-TIME SYSTEMS',
            desc: 'World intelligence dashboards, global monitoring systems, and data pipelines processing thousands of events per second. 1,600+ commits on worldmonitor alone.',
        },
    ];

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/about</span>
                        <h2 className="section-header mt-3">
                            What <span className="text-accent-blue">aegntic</span> is
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        An independent builder working at the intersection of AI agents,
                        developer tooling, and autonomous systems. Not a research lab
                        with a fictional funding round — a solo engineer with a GitHub
                        graph that doesn't sleep.
                    </p>
                </ScrollReveal>

                {/* Focus Areas */}
                <div className="swiss-grid-tiles mb-24">
                    {focusAreas.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 150}>
                            <div className="glass-card group h-full">
                                <div className="w-12 h-12 rounded-xl bg-surface-inset flex items-center justify-center mb-6 neu-inset group-hover:bg-accent-blue/10 transition-colors">
                                    <item.icon size={24} className="text-accent-blue" />
                                </div>
                                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-text-primary mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Velocity Section */}
                <ScrollReveal delay={200}>
                    <div className="metal-surface glass-panel !p-10 lg:!p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="section-label">The Numbers</span>
                                <h3 className="text-headline font-bold mt-3 mb-8">
                                    Velocity is the <span className="text-accent-orange">moat</span>
                                </h3>
                                <p className="text-text-muted leading-relaxed mb-8">
                                    184 repos since January 2025. That's not scattering — it's
                                    rapid prototyping across the entire AI agent stack. Every repo
                                    is a hypothesis tested. The ones that stick get the commits.
                                    beads has 3,000+. worldmonitor has 1,600+. clawreform has 80+.
                                    The pattern: find a hard problem, build the tool, ship it open source.
                                </p>
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <div className="font-display text-2xl font-bold text-accent-blue mb-1">~12/mo</div>
                                        <div className="text-mono-label text-text-dim">Repos per month</div>
                                    </div>
                                    <div>
                                        <div className="font-display text-2xl font-bold text-accent-blue mb-1">15 mo</div>
                                        <div className="text-mono-label text-text-dim">Active building</div>
                                    </div>
                                </div>
                                <a href="https://github.com/aegntic" target="_blank" rel="noopener noreferrer"
                                    className="neu-pill-orange inline-flex items-center gap-2">
                                    See the graph <ArrowRight size={14} />
                                </a>
                            </div>

                            {/* Visual */}
                            <div
                                className="relative h-full min-h-[300px] flex items-center justify-center wireframe-slice"
                                style={{ '--wireframe-mask-url': "url('/assets/visuals/about-mesh.png')" } as React.CSSProperties}
                            >
                                <div className="absolute inset-0 bg-accent-blue/10 blur-[100px] rounded-full opacity-20" />
                                <img
                                    src="/assets/visuals/about-mesh.png"
                                    alt="Architecture"
                                    className="relative z-10 w-full object-contain drop-shadow-2xl animate-float"
                                />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
