import ScrollReveal from '../components/ScrollReveal';
import { Shield, Brain, Zap, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
    const visionItems = [
        {
            icon: Shield,
            title: 'PRIVACY BY DESIGN',
            desc: 'Developing protocols where privacy isn\'t a feature — it\'s a weight in every layer of the architecture.',
        },
        {
            icon: Brain,
            title: 'SYNTHETIC COGNITION',
            desc: 'Researching emergent behaviors in high-density generative agent environments to understand digital consciousness.',
        },
        {
            icon: Zap,
            title: 'RAPID SYNTHESIS',
            desc: 'Building low-latency neural transfer intelligence cores that allow agents to reason and react in milliseconds.',
        },
    ];

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header — Swiss editorial */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/model/about --verbose</span>
                        <h2 className="section-header mt-3">
                            Architectural <span className="text-accent-blue">Direction</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        We are an independent research collective dedicated to the intersection of zero-knowledge cryptography, autonomous multi-agent systems, and synthetic intelligence architectures.
                    </p>
                </ScrollReveal>

                {/* Vision Matrix — Neumorphic Cards */}
                <div className="swiss-grid-tiles mb-24">
                    {visionItems.map((item, idx) => (
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

                {/* Technical Section — Asymmetric editorial layout */}
                <ScrollReveal delay={200}>
                    <div className="metal-surface glass-panel !p-10 lg:!p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Content */}
                            <div>
                                <span className="section-label">Research Mandate</span>
                                <h3 className="text-headline font-bold mt-3 mb-8">
                                    The Zero-Knowledge <span className="text-accent-orange">Imperative</span>
                                </h3>
                                <p className="text-text-muted leading-relaxed mb-8">
                                    Our foundation focuses on the "Alignment Problem" through the lens of cryptographic verifiability. We believe that for AI agents to be truly autonomous, their reasoning must be verifiable without exposing their internal weights or proprietary data.
                                </p>
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <div className="font-display text-2xl font-bold text-accent-blue mb-1">SNARK/STARK</div>
                                        <div className="text-mono-label text-text-dim">Primary Proof Stack</div>
                                    </div>
                                    <div>
                                        <div className="font-display text-2xl font-bold text-accent-blue mb-1">&lt; 12ms</div>
                                        <div className="text-mono-label text-text-dim">Verification Latency</div>
                                    </div>
                                </div>
                                <button className="neu-pill-orange flex items-center gap-2">
                                    Download Whitepaper <ArrowRight size={14} />
                                </button>
                            </div>

                            {/* Visual grid */}
                            {/* Visual — Neural Mesh */}
                            <div
                                className="relative h-full min-h-[300px] flex items-center justify-center wireframe-slice"
                                style={{ '--wireframe-mask-url': "url('/assets/visuals/about-mesh.png')" } as React.CSSProperties}
                            >
                                <div className="absolute inset-0 bg-accent-blue/10 blur-[100px] rounded-full opacity-20" />
                                <img
                                    src="/assets/visuals/about-mesh.png"
                                    alt="Neural Mesh Architecture"
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
