import ScrollReveal from '../components/ScrollReveal';
import { ArrowDown } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
            {/* Ambient wireframe grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 207, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 207, 229, 0.02) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.4) 50%, transparent 90%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.4) 50%, transparent 90%)',
                }}
            />

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, var(--color-deep-space), transparent)',
                }}
            />

            {/* Hero Content */}
            <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                {/* Top label */}
                <ScrollReveal>
                    <div className="text-mono-label text-accent-blue mb-12 tracking-[0.25em] uppercase opacity-80">
                        Independent Builder <span className="text-text-dim/30 ml-2">· since 2025</span>
                    </div>
                </ScrollReveal>

                {/* Primary Visual */}
                <ScrollReveal delay={100}>
                    <div className="relative w-full max-w-5xl mx-auto mb-10 group">
                        <div className="absolute inset-0 bg-accent-blue/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
                        <img
                            src="/assets/visuals/hero-typography.png"
                            alt="AEGNTIC.AI"
                            className="relative w-full h-auto object-contain drop-shadow-2xl animate-float"
                            style={{
                                filter: 'drop-shadow(0 0 50px rgba(0, 207, 229, 0.15))'
                            }}
                        />
                    </div>
                </ScrollReveal>

                {/* Main heading */}
                <ScrollReveal delay={300}>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
                        <span className="text-chrome">Building at the edge of</span>{' '}
                        <span className="text-accent-blue italic font-serif block mt-2 md:inline md:mt-0">
                            what agents can do
                        </span>
                    </h2>
                </ScrollReveal>

                {/* Subtitle */}
                <ScrollReveal delay={450}>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto mt-8 leading-relaxed">
                        184 public repositories. 5,600+ commits in 15 months. Open source
                        AI agent infrastructure — from developer tools to autonomous systems,
                        built by one person shipping relentlessly.
                    </p>
                </ScrollReveal>

                {/* CTA buttons */}
                <ScrollReveal delay={550}>
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        <a href="#projects" className="neu-pill-orange">
                            Explore Work →
                        </a>
                        <a href="https://github.com/aegntic" target="_blank" rel="noopener noreferrer" className="neu-pill font-display text-xs uppercase tracking-[0.15em] font-semibold text-text-muted hover:text-text-primary">
                            GitHub
                        </a>
                    </div>
                </ScrollReveal>

                {/* Real metrics strip */}
                <ScrollReveal delay={650}>
                    <div className="flex flex-wrap justify-center gap-6 mt-24">
                        {[
                            { label: 'Repos', value: '184' },
                            { label: 'Commits', value: '5,600+' },
                            { label: 'Stars', value: '42' },
                        ].map((stat, i) => (
                            <div key={stat.label} className="glass-card !p-5 !rounded-2xl group cursor-default min-w-[140px]" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="text-mono-label text-text-dim mb-2 group-hover:text-accent-orange transition-colors relative z-10 text-xs">
                                    {stat.label}
                                </div>
                                <div className="font-display text-2xl font-bold text-text-primary relative z-10">
                                    {stat.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-breathe z-10">
                <ArrowDown size={20} className="text-text-dim" />
            </div>
        </div>
    );
};

export default Home;
