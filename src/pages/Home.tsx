import ScrollReveal from '../components/ScrollReveal';
import Heading3D from '../components/Heading3D';
import AeLogo from '../components/AeLogo';
import { ArrowDown } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
            {/* Background — Giant ae· watermark with glass opacity */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ opacity: 0.02 }}
            >
                <AeLogo size={900} color="#C0C0C0" />
            </div>

            {/* Ambient wireframe grid — 27% opacity from SE corner */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 207, 229, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 207, 229, 0.02) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'linear-gradient(to bottom left, transparent 40%, rgba(0,0,0,0.27) 70%, rgba(0,0,0,0.12) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom left, transparent 40%, rgba(0,0,0,0.27) 70%, rgba(0,0,0,0.12) 100%)',
                }}
            />



            {/* Hero Visual — Glass Sculpture (with 27% Wireframe Breach) */}
            <div
                className="absolute right-[-10%] top-[40%] -translate-y-1/2 w-[70%] h-[90%] pointer-events-none z-0 wireframe-slice"
                style={{ '--wireframe-mask-url': "url('/assets/visuals/hero-sculpture.png')" } as React.CSSProperties}
            >
                <img
                    src="/assets/visuals/hero-sculpture.png"
                    alt="Abstract Glass Neural Sculpture"
                    className="w-full h-full object-contain animate-float-slow opacity-40 mix-blend-screen"
                />
            </div>

            {/* Bottom gradient fade */}
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

                {/* Primary heading — chrome/glass treatment */}
                <ScrollReveal delay={100}>
                    <Heading3D as="h1" size="large">
                        <span className="glass-heading">AEGNTIC</span>
                        <span className="text-accent-blue">.AI</span>
                    </Heading3D>
                </ScrollReveal>

                {/* Bronze accent divider */}
                <ScrollReveal delay={200}>
                    <div className="my-8" style={{
                        height: 2,
                        width: 60,
                        background: 'linear-gradient(90deg, var(--color-accent-orange), var(--color-accent-orange-muted))',
                    }} />
                </ScrollReveal>

                {/* Vogue heading — Advancing the architecture */}
                <ScrollReveal delay={250}>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-left max-w-3xl">
                        <span className="text-chrome">Advancing the architecture of</span>{' '}
                        <span className="text-accent-blue italic font-serif">
                            synthetic intelligence
                        </span>
                    </h2>
                </ScrollReveal>

                {/* Subtitle */}
                <ScrollReveal delay={350}>
                    <p className="text-lg text-text-muted max-w-2xl mt-6 leading-relaxed">
                        Aegntic.ai provides the frameworks and neural transfer protocols
                        necessary for the next generation of cognitive entities to operate
                        across decentralized environments.
                    </p>
                </ScrollReveal>

                {/* CTA buttons — glass treatment */}
                <ScrollReveal delay={450}>
                    <div className="flex flex-wrap gap-4 mt-12">
                        <a href="#about" className="neu-pill-orange">
                            Initialize →
                        </a>
                        <a href="#research" className="neu-pill font-display text-xs uppercase tracking-[0.15em] font-semibold text-text-muted hover:text-text-primary">
                            Explore Data
                        </a>
                    </div>
                </ScrollReveal>

                {/* Data metrics strip — glass inset badges */}
                <ScrollReveal delay={550}>
                    <div className="flex flex-wrap gap-6 mt-20">
                        {[
                            { label: 'Platforms', value: '40+' },
                            { label: 'Compute', value: '14.2 PF' },
                            { label: 'Loss', value: '0.0042' },
                        ].map((stat, i) => (
                            <div key={stat.label} className="glass-card !p-4 !rounded-2xl group cursor-default" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="text-mono-label text-text-dim mb-1 group-hover:text-accent-orange transition-colors relative z-10">
                                    {stat.label}
                                </div>
                                <div className="font-display text-xl font-bold text-text-primary relative z-10">
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
