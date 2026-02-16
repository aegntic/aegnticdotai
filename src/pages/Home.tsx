import ScrollReveal from '../components/ScrollReveal';
import AeLogo from '../components/AeLogo';
import { ArrowDown } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
            {/* Background — Giant ae· watermark for depth */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ opacity: 0.025 }}
            >
                <AeLogo size={900} color="#C0C0C0" />
            </div>

            {/* Subtle gradient overlay from bottom */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, var(--color-deep-space), transparent)',
                }}
            />

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Top label */}
                <ScrollReveal>
                    <div className="text-mono-label text-accent-blue mb-8">
                        REF: Independent Research Foundation <span className="text-text-dim/30 ml-2" title="Epoch 1">· epoch_0</span>
                    </div>
                </ScrollReveal>

                {/* Main headline — Oversized with silver/chrome styling */}
                <ScrollReveal delay={100}>
                    <h1 className="text-hero leading-[0.88]">
                        <span className="text-silver">AEGNTIC</span>
                        <span className="text-accent-blue">.AI</span>
                    </h1>
                </ScrollReveal>

                {/* Bronze accent divider */}
                <ScrollReveal delay={200}>
                    <div className="my-8" style={{
                        height: 2,
                        width: 60,
                        background: 'linear-gradient(90deg, var(--color-accent-orange), var(--color-accent-orange-muted))',
                    }} />
                </ScrollReveal>

                {/* Subtitle */}
                <ScrollReveal delay={300}>
                    <p className="text-subheadline text-text-muted max-w-2xl" style={{ fontStyle: 'italic' }}>
                        Adaptive Emergence — Guiding Networks
                        Toward Integrated Confluence
                    </p>
                </ScrollReveal>

                {/* CTA buttons */}
                <ScrollReveal delay={400}>
                    <div className="flex flex-wrap gap-4 mt-12">
                        <a href="#about" className="neu-pill-orange">
                            Initialize →
                        </a>
                        <a href="#research" className="neu-pill font-display text-xs uppercase tracking-[0.15em] font-semibold text-text-muted hover:text-text-primary">
                            Explore Data
                        </a>
                    </div>
                </ScrollReveal>

                {/* Data metrics strip — with chrome borders */}
                <ScrollReveal delay={500}>
                    <div className="flex flex-wrap gap-8 mt-20">
                        {[
                            { label: 'Platforms', value: '40+' },
                            { label: 'Compute', value: '14.2 PF' },
                            { label: 'Loss', value: '0.0042' },
                        ].map((stat, i) => (
                            <div key={stat.label} className="group cursor-default" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="text-mono-label text-text-dim mb-1 group-hover:text-accent-orange transition-colors">
                                    {stat.label}
                                </div>
                                <div className="font-display text-xl font-bold text-text-primary">
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
