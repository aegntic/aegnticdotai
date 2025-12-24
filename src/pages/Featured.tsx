import Icon3D from '../components/Icon3D';
import ScrollReveal from '../components/ScrollReveal';
import { Editable, EditableIcon } from '../components/DevTools';
import { motion } from 'framer-motion';

const Featured: React.FC = () => {
    const updates = [
        {
            id: '01',
            date: '24.12.15',
            category: 'BREAKTHROUGH',
            title: 'Zero-Knowledge Agent Verification',
            desc: 'Successfully implemented SNARK-based verification for multi-agent decision trees, reducing verification overhead by 94%.',
            tags: ['ZK', 'Security'],
            icon: 'Award'
        },
        {
            id: '02',
            date: '24.12.08',
            category: 'PUBLICATION',
            title: 'Journal of Synthetic Intelligence',
            desc: 'Our paper on "Emergent Hierarchies in Generative Agent Societies" has been accepted for publication in the Q1 issue.',
            tags: ['Research', 'Academic'],
            icon: 'BookOpen'
        },
        {
            id: '03',
            date: '24.11.28',
            category: 'MILESTONE',
            title: '10,000 Agent Simulation',
            desc: 'Successfully scaled the Sandbox simulation environment to host 10,000 autonomous agents with real-time interaction capabilities.',
            tags: ['Scaling', 'Performance'],
            icon: 'TrendingUp'
        },
        {
            id: '04',
            date: '24.11.15',
            category: 'PARTNERSHIP',
            title: 'ETH Zurich Research Alliance',
            desc: 'Formalized strategic partnership with ETH Zurich\'s Cryptography Group for joint research on privacy-preserving agent communication.',
            tags: ['Partnership', 'Research'],
            icon: 'Calendar'
        },
        {
            id: '05',
            date: '24.10.30',
            category: 'RELEASE',
            title: 'Data Fabric V2 Public Beta',
            desc: 'Open beta launch of our immutable vector history storage system for long-term agent memory and experience replay.',
            tags: ['Product', 'Open Source'],
            icon: 'TrendingUp'
        },
        {
            id: '06',
            date: '24.10.12',
            category: 'FUNDING',
            title: 'Series B Funding Secured',
            desc: 'Aegntic.ai raises $85M to expand the physical infrastructure of the Data Fabric initiative globally.',
            tags: ['Business', 'Growth'],
            icon: 'Award'
        }
    ];

    return (
        <div className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header - Right-justified Main Heading */}
                <div className="text-right mb-24">
                    <ScrollReveal>
                        <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                            <Editable id="featured-subtitle" as="span">aegntic.update</Editable>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            <Editable id="featured-heading-1" as="span">Featured</Editable>{' '}
                            <span className="text-primary">
                                <Editable id="featured-heading-2" as="span">Updates</Editable>
                            </span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={400}>
                        <p className="max-w-3xl ml-auto text-gray-400 text-lg leading-relaxed">
                            <Editable id="featured-description" as="span">
                                Track the latest breakthroughs, publications, and milestones from the Aegntic.ai research collective. From zero-knowledge proofs to multi-agent simulations at scale.
                            </Editable>
                        </p>
                    </ScrollReveal>
                </div>

                {/* Featured Update Grid - Left-aligned Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {updates.map((update, idx) => (
                        <ScrollReveal key={update.id} delay={idx * 100}>
                            <div className="group h-full p-8 rounded-2xl bg-surface-dark/40 border border-white/5 hover:border-primary/30 transition-all duration-500 flex flex-col items-start text-left cursor-pointer">
                                {/* Visual Corner Accents */}
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Category Badge */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                        <EditableIcon id={`featured-${update.id}-icon`} icon={update.icon as any} size={18} className="text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono tracking-widest text-primary/80">{update.category}</span>
                                        <span className="text-[10px] font-mono tracking-widest text-gray-600">{update.date}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
                                    {update.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {update.desc}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {update.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white/5 text-[9px] uppercase tracking-wider font-bold text-gray-400 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Link */}
                                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white group-hover:text-primary transition-colors mt-auto">
                                    Read More <Icon3D icon="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Newsletter Subscription - Asymmetrical Layout */}
                <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left-aligned Content */}
                    <ScrollReveal>
                        <div className="text-left">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                                <Editable id="featured-newsletter-heading" as="span">Stay Updated</Editable>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                <Editable id="featured-newsletter-desc" as="span">
                                    Subscribe to our encrypted newsletter for weekly updates on research breakthroughs, publication releases, and ecosystem developments. No spam, just signal.
                                </Editable>
                            </p>
                            <div className="flex flex-col gap-4 max-w-md">
                                <input
                                    type="email"
                                    placeholder="ENTER_EMAIL"
                                    className="w-full bg-surface-dark/60 border border-white/10 rounded-lg px-6 py-4 text-sm focus:border-primary/50 transition-colors outline-none font-mono"
                                />
                                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                                    Subscribe to Signal
                                    <Icon3D icon="ArrowRight" size={16} />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right-aligned Visual */}
                    <ScrollReveal delay={200}>
                        <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10 border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 bg-tech-grid opacity-20 animate-grid-move" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl font-bold text-primary/20 font-sans">24</div>
                                    <div className="text-2xl font-mono text-white/40">Updates This Year</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Featured;
