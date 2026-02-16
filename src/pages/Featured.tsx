import ScrollReveal from '../components/ScrollReveal';
import { Award, BookOpen, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const Featured: React.FC = () => {
    const updates = [
        {
            id: '01', date: '24.12.15', category: 'BREAKTHROUGH',
            title: 'Zero-Knowledge Agent Verification',
            desc: 'Successfully implemented SNARK-based verification for multi-agent decision trees, reducing verification overhead by 94%.',
            tags: ['ZK', 'Security'], icon: Award,
        },
        {
            id: '02', date: '24.12.08', category: 'PUBLICATION',
            title: 'Journal of Synthetic Intelligence',
            desc: 'Our paper on "Emergent Hierarchies in Generative Agent Societies" has been accepted for publication in the Q1 issue.',
            tags: ['Research', 'Academic'], icon: BookOpen,
        },
        {
            id: '03', date: '24.11.28', category: 'MILESTONE',
            title: '10,000 Agent Simulation',
            desc: 'Successfully scaled the Sandbox simulation environment to host 10,000 autonomous agents with real-time interaction capabilities.',
            tags: ['Scaling', 'Performance'], icon: TrendingUp,
        },
        {
            id: '04', date: '24.11.15', category: 'PARTNERSHIP',
            title: 'ETH Zurich Research Alliance',
            desc: 'Formalized strategic partnership with ETH Zurich\'s Cryptography Group for joint research on privacy-preserving agent communication.',
            tags: ['Partnership', 'Research'], icon: Calendar,
        },
        {
            id: '05', date: '24.10.30', category: 'RELEASE',
            title: 'Data Fabric V2 Public Beta',
            desc: 'Open beta launch of our immutable vector history storage system for long-term agent memory and experience replay.',
            tags: ['Product', 'Open Source'], icon: TrendingUp,
        },
        {
            id: '06', date: '24.10.12', category: 'FUNDING',
            title: 'Series B Funding Secured',
            desc: 'Aegntic.ai raises $85M to expand the physical infrastructure of the Data Fabric initiative globally.',
            tags: ['Business', 'Growth'], icon: Award,
        },
    ];

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/Aegntic.Update</span>
                        <h2 className="section-header mt-3">
                            Featured <span className="text-accent-orange">Updates</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        Track the latest breakthroughs, publications, and milestones from the Aegntic.ai research collective.
                    </p>
                </ScrollReveal>

                {/* Update Tile Grid */}
                <div className="swiss-grid-tiles">
                    {updates.map((update, idx) => (
                        <ScrollReveal key={update.id} delay={idx * 100}>
                            <div className="neu-card group h-full flex flex-col cursor-pointer">
                                {/* Header row */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl neu-inset flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                                        <update.icon size={18} className="text-accent-blue" />
                                    </div>
                                    <div>
                                        <div className="text-mono-label text-accent-blue">{update.category}</div>
                                        <div className="text-mono-label text-text-dim">{update.date}</div>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-lg font-bold text-text-primary mb-4 tracking-tight group-hover:text-accent-blue transition-colors">
                                    {update.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
                                    {update.desc}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {update.tags.map(tag => (
                                        <span key={tag} className="data-badge !text-text-dim">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-mono-label text-text-muted group-hover:text-accent-orange transition-colors mt-auto">
                                    Read More <ArrowRight size={12} />
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Newsletter — Asymmetric editorial */}
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal>
                        <div>
                            <h3 className="text-headline font-bold mb-6">
                                Stay <span className="text-accent-orange">Updated</span>
                            </h3>
                            <p className="text-body-lg mb-8">
                                Subscribe to our encrypted newsletter for weekly updates on research breakthroughs and ecosystem developments. No spam, just signal.
                            </p>
                            <div className="flex flex-col gap-4 max-w-md">
                                <input
                                    type="email"
                                    placeholder="ENTER_EMAIL"
                                    className="w-full neu-inset px-6 py-4 text-sm font-mono outline-none text-text-primary placeholder:text-text-dim"
                                />
                                <button className="neu-pill-orange flex items-center justify-center gap-3">
                                    Subscribe to Signal <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="aspect-square neu-raised flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-8xl font-display font-bold text-surface-raised">24</div>
                                <div className="text-mono-label text-text-dim mt-2">Updates This Year</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Featured;
