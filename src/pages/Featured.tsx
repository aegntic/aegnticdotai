import ScrollReveal from '../components/ScrollReveal';
import { GitCommit, Star, Package, Rocket } from 'lucide-react';

const Featured: React.FC = () => {
    const milestones = [
        {
            date: 'Jan 2025',
            title: 'aegntic launches',
            desc: 'First commit. Started with a hypothesis: AI agents need better infrastructure, and nobody is building it fast enough.',
            tags: ['Origin'],
            icon: Rocket,
        },
        {
            date: 'Mar 2025',
            title: 'zeroclaw crosses 600 commits',
            desc: 'Fast, small, fully autonomous AI assistant infrastructure. The deepest commit history in the portfolio — proving the thesis with code, not slides.',
            tags: ['Infrastructure'],
            icon: GitCommit,
        },
        {
            date: 'Jun 2025',
            title: 'CLDCDE hits 9 stars',
            desc: 'The unofficial community hub for Claude Code extensions. 61 commits, 2 forks, and growing organically as the Claude Code ecosystem explodes.',
            tags: ['Community'],
            icon: Star,
        },
        {
            date: 'Jul 2025',
            title: 'worldmonitor at 1,600 commits',
            desc: 'Real-time global intelligence dashboard with AI-powered news aggregation and geopolitical monitoring. The most committed-to project in the portfolio.',
            tags: ['Real-time'],
            icon: Package,
        },
        {
            date: '2025',
            title: '184 repos, 5,600+ commits',
            desc: 'The cumulative output of 15 months of rapid prototyping across AI agents, ZK systems, developer tools, trading bots, and more. All open source.',
            tags: ['Velocity'],
            icon: GitCommit,
        },
    ];

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/milestones</span>
                        <h2 className="section-header mt-3">
                            Real <span className="text-accent-orange">Milestones</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        No fake partnerships. No fabricated funding rounds. Just the
                        actual commit history of someone building in public.
                    </p>
                </ScrollReveal>

                {/* Milestone Grid */}
                <div className="swiss-grid-tiles">
                    {milestones.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 100}>
                            <div className="glass-card group h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl neu-inset flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                                        <item.icon size={18} className="text-accent-blue" />
                                    </div>
                                    <div>
                                        <div className="text-mono-label text-accent-blue">{item.date}</div>
                                    </div>
                                </div>

                                <h3 className="font-display text-lg font-bold text-text-primary mb-4 tracking-tight group-hover:text-accent-blue transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
                                    {item.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="data-badge !text-text-dim">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;
