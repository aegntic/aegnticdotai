import ScrollReveal from '../components/ScrollReveal';
import { BookOpen, ArrowRight } from 'lucide-react';

const Research: React.FC = () => {
    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/writing</span>
                        <h2 className="section-header mt-3">
                            Research <span className="text-accent-blue">& Thinking</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        Writing about what I'm learning while building. No ghostwritten
                        thought leadership — real observations from real work.
                    </p>
                </ScrollReveal>

                {/* Placeholder for future blog posts */}
                <div className="swiss-grid-tiles">
                    <ScrollReveal>
                        <div className="glass-card group h-full flex flex-col items-center justify-center py-16 text-center">
                            <BookOpen size={32} className="text-text-dim mb-6 group-hover:text-accent-blue transition-colors" />
                            <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                                Coming Soon
                            </h3>
                            <p className="text-sm text-text-muted max-w-md">
                                Real blog posts based on actual building experience.
                                Check back soon or follow on GitHub for updates.
                            </p>
                            <a
                                href="https://github.com/aegntic"
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-mono-label text-text-muted group-hover:text-accent-orange transition-colors mt-6"
                            >
                                Follow on GitHub <ArrowRight size={12} />
                            </a>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Stats */}
                <ScrollReveal delay={200}>
                    <div className="mt-24 glass-panel metal-surface !p-10 lg:!p-14 text-center">
                        <h3 className="text-headline font-bold mb-12">
                            By the <span className="text-accent-blue">Numbers</span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-16">
                            {[
                                { value: '184', label: 'Public Repos' },
                                { value: '2025', label: 'Started Building' },
                                { value: '5,600+', label: 'Total Commits' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-5xl font-display text-text-primary font-bold mb-2 hover:text-accent-blue transition-colors cursor-default">
                                        {stat.value}
                                    </div>
                                    <div className="text-mono-label text-text-dim">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Research;
