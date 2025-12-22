import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { Editable, EditableIcon } from '../components/DevTools';

const Home: React.FC = () => {
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 500], [0, 100]);
    const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center"
        >
            {/* Hero Section */}
            <section className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-4 py-20 min-h-[90vh]">

                {/* Dynamic Background Layer */}
                <div className="absolute inset-0 overflow-visible pointer-events-none select-none z-0">
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-tech-grid animate-grid-move opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-drift mix-blend-screen" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-drift delay-[2000ms] mix-blend-screen" />
                    <div className="glow-line top-[20%] border-b-[3px] border-primary/90 shadow-[0_20px_60px_rgba(0,240,255,0.2),inset_0_-2px_20px_rgba(0,240,255,0.5)] animate-[pulse_4s_ease-in-out_infinite]" />
                    <div className="glow-line bottom-[20%] border-t-[3px] border-primary/90 shadow-[0_-20px_60px_rgba(0,240,255,0.2),inset_0_2px_20px_rgba(0,240,255,0.5)] animate-[pulse_4s_ease-in-out_infinite_1s]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-primary/10 rounded-full blur-[100px]" />
                </div>

                {/* Hero Content */}
                <motion.div style={{ y: yParallax, opacity: opacityFade }} className="relative z-10 flex flex-col items-center text-center">

                    {/* Top Tagline */}
                    <ScrollReveal delay={100}>
                        <div className="mb-8 opacity-70 animate-[float_6s_ease-in-out_infinite]">
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary border-b border-primary/30 pb-2">
                                <Editable id="home-tagline" as="span">Independent Research Foundation</Editable>
                            </span>
                        </div>
                    </ScrollReveal>

                    {/* Main Title */}
                    <ScrollReveal delay={300}>
                        <div className="relative mb-4 group">
                            <h1 className="text-6xl md:text-8xl lg:text-[11.5rem] font-bold tracking-tighter leading-none text-metallic select-none relative z-10 font-sans">
                                <Editable id="home-title" as="span">aegntic.ai</Editable>
                            </h1>
                            <div
                                aria-hidden="true"
                                className="absolute top-[85%] left-0 w-full text-6xl md:text-8xl lg:text-[11.5rem] font-bold tracking-tighter leading-none text-gray-500/10 select-none scale-y-[-1] blur-[3px] reflection-mask pointer-events-none transform origin-top"
                            >
                                aegntic.ai
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Subtitle */}
                    <ScrollReveal delay={500}>
                        <div className="mt-16 md:mt-24 max-w-4xl mx-auto relative">
                            <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-xl" />
                            <p className="relative text-2xl md:text-4xl text-gray-200 leading-tight font-light">
                                <span className="font-serif italic text-gray-400 pr-2">
                                    <Editable id="home-subtitle-1-a" as="span">A</Editable>
                                    <Editable id="home-subtitle-1-daptive" as="span">daptive</Editable>
                                    {' '}
                                    <Editable id="home-subtitle-1-e" as="span">E</Editable>
                                    <Editable id="home-subtitle-1-mergence" as="span">mergence:</Editable>
                                </span>
                                <Editable id="home-subtitle-2" as="span">Guiding Networks Toward</Editable>{' '}
                                <span className="text-primary italic font-serif">
                                    <Editable id="home-subtitle-3" as="span">Integrated Confluence</Editable>
                                </span>
                            </p>
                            <p className="mt-6 text-xs md:text-sm text-primary/60 max-w-lg mx-auto font-mono tracking-wider">
                                <Editable id="home-acronym" as="span">[ AE-GNT-IC ]: Autonomous Entity Generation Network & Neural Transfer Intelligence Core.</Editable>
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Action Buttons */}
                    <ScrollReveal delay={700}>
                        <div className="mt-12 flex flex-col sm:flex-row gap-8 items-center justify-center">
                            <button className="group relative px-10 py-4 bg-transparent overflow-hidden text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:bg-primary/10">
                                <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-border-top"></span>
                                <span className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent animate-border-right" style={{ animationDelay: '0.5s' }}></span>
                                <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-primary to-transparent animate-border-bottom" style={{ animationDelay: '1s' }}></span>
                                <span className="absolute left-0 bottom-0 h-full w-[1px] bg-gradient-to-t from-transparent via-primary to-transparent animate-border-left" style={{ animationDelay: '1.5s' }}></span>
                                <span className="relative flex items-center gap-3 font-mono text-sm tracking-widest uppercase font-bold">
                                    <Editable id="home-btn-1" as="span">Initialize</Editable>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button className="group relative px-10 py-4 overflow-hidden text-gray-500 hover:text-white transition-colors">
                                <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-border-top opacity-50"></span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-l from-transparent via-gray-600 to-transparent animate-border-bottom opacity-50"></span>
                                <span className="relative flex items-center gap-3 font-mono text-sm tracking-widest uppercase">
                                    <div className="w-1.5 h-1.5 bg-gray-500 group-hover:bg-white rounded-full transition-colors" />
                                    <Editable id="home-btn-2" as="span">Explore Data</Editable>
                                </span>
                            </button>
                        </div>
                    </ScrollReveal>

                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/40 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-mono">Scroll</span>
                    <ChevronDown size={20} />
                </motion.div>
            </section>

            {/* Featured Research Preview Section */}
            <section className="w-full py-32 px-6 border-t border-white/5 relative bg-surface-dark/20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <ScrollReveal>
                        <div className="space-y-8">
                            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest rounded-full">
                                <Editable id="home-section-badge" as="span">Foundation Protocol</Editable>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                <Editable id="home-section-title-1" as="span">Advancing the architecture of</Editable>{' '}
                                <span className="text-primary italic font-serif">
                                    <Editable id="home-section-title-2" as="span">synthetic intelligence</Editable>
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                <Editable id="home-section-desc" as="span">
                                    Aegntic.ai provides the frameworks and neural transfer protocols necessary for the next generation of cognitive entities to operate across decentralized environments.
                                </Editable>
                            </p>
                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                        <EditableIcon id="home-feature-icon" icon="Database" size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1 text-xs tracking-widest">
                                            <Editable id="home-feature-title" as="span">Neural Transfer Intelligence Core</Editable>
                                        </h4>
                                        <p className="text-gray-500 text-sm">
                                            <Editable id="home-feature-desc" as="span">Efficient data serialization for low-latency agentic communication.</Editable>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-4 text-primary text-xs uppercase tracking-widest font-bold group">
                                <Editable id="home-browse-btn" as="span">Browse Publications</Editable>
                                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-blue-500/10 z-10 opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                            <div className="absolute inset-x-8 bottom-8 z-20">
                                <div className="backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-lg translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="text-[10px] text-primary uppercase tracking-widest mb-2 font-mono">
                                        <Editable id="home-artifact-label" as="span">Latest Artifact</Editable>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                                        <Editable id="home-artifact-title" as="span">Simulation Sandbox-7 Observations</Editable>
                                    </h3>
                                    <p className="text-gray-400 text-xs">
                                        <Editable id="home-artifact-desc" as="span">A 400-hour study on emergent trade behaviors in autonomous societies.</Editable>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
