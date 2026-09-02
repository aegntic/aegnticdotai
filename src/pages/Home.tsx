import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Mail } from 'lucide-react';
import { featured } from '../data/projects';
import type { Project } from '../data/projects';

interface HomeProps {
    onSelectProject: (project: Project) => void;
    onOpenContact: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectProject, onOpenContact }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const ProjectCard = ({ project }: { project: Project }) => (
        <button
            onClick={() => onSelectProject(project)}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative overflow-hidden text-left cursor-pointer w-full"
            style={{
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-elevated)',
                aspectRatio: '16/9',
                transition: 'opacity 0.4s ease',
            }}
        >
            <img
                src={project.preview}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                    transform: hoveredId === project.id ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
                }}
                loading="lazy"
            />
            {/* Title overlay on hover */}
            <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{
                    background: hoveredId === project.id
                        ? 'linear-gradient(to top, rgba(26,26,24,0.6) 0%, transparent 60%)'
                        : 'linear-gradient(to top, rgba(26,26,24,0.3) 0%, transparent 40%)',
                    transition: 'background 0.5s ease',
                }}
            >
                <span style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                    lineHeight: 1.1,
                    color: '#f0f6f8',
                    letterSpacing: '-0.01em',
                }}>
                    {project.title}
                </span>
                <span className="flex items-center gap-1 mt-1" style={{
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(240,246,248,0.6)',
                    opacity: hoveredId === project.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                }}>
                    View <ArrowUpRight size={10} />
                </span>
            </div>
        </button>
    );

    return (
        <div className="flex-1 flex flex-col px-6 md:px-12 pt-32 md:pt-36 pb-12 relative">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-24 md:gap-36">

                {/* ============================================================
                    HERO — clear offer
                    ============================================================ */}
                <section>
                    <p className="text-label mb-4">Aegntic · independent systems practice</p>
                    <h1 style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(2.4rem, 7vw, 5rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-text-primary)',
                        maxWidth: '16ch',
                    }}>
                        Make the work that matters easier to do.
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
                        lineHeight: 1.4,
                        color: 'var(--color-text-secondary)',
                        maxWidth: '44ch',
                        marginTop: '1.5rem',
                    }}>
                        Aegntic designs and ships AI agents, automations, and internal tools for teams with real work to move through. Clear scope. One accountable builder. A system you can use.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <button onClick={onOpenContact} className="btn-primary">
                            Start a project <ArrowRight size={14} />
                        </button>
                        <a href="https://github.com/aegntic" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            Explore the work
                        </a>
                    </div>
                </section>

                {/* ============================================================
                    HOW IT WORKS — plain language, concrete result
                    ============================================================ */}
                <section>
                    <div className="flex items-baseline justify-between mb-10 flex-wrap gap-2">
                        <p className="text-label">How it works</p>
                        <p className="text-label" style={{ opacity: 0.5 }}>from friction to a working system</p>
                    </div>

                    <p style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(1.5rem, 3.4vw, 2.6rem)',
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                        color: 'var(--color-text-primary)',
                        maxWidth: '26ch',
                    }}>
                        Useful AI should make a task clearer, faster, or more reliable. If it does none of those, it is not the answer.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                        {[
                            { t: '01 — Find the leverage', d: 'We identify the repeated work, fragile hand-off, or product opportunity worth turning into a system.' },
                            { t: '02 — Build the useful version', d: 'I design, connect, and ship the smallest complete version that people can actually use.' },
                            { t: '03 — Make it dependable', d: 'The result is tested, documented, and built to live inside your team — not just impress in a demo.' },
                        ].map((item) => (
                            <div key={item.t} className="md:border-t pt-6" style={{ borderColor: 'var(--color-rule)' }}>
                                <p className="text-label mb-3">{item.t}</p>
                                <p style={{
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6,
                                    color: 'var(--color-text-secondary)',
                                }}>
                                    {item.d}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                        lineHeight: 1.45,
                        color: 'var(--color-text-secondary)',
                        maxWidth: '52ch',
                        marginTop: '3rem',
                    }}>
                        You get a practical partner from the first question through to a working release &mdash; not a maze of vague advice, prompts, and hand-offs.
                    </p>
                </section>

                {/* ============================================================
                    PROOF — real track record, real numbers only
                    ============================================================ */}
                <section>
                    <p className="text-label mb-10">Track record</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                        {[
                            { stat: '127+', label: 'Public repositories' },
                            { stat: 'Rust · Go', label: 'TS · Python' },
                            { stat: '9-crate', label: 'Trading engine, live' },
                            { stat: 'Cloudflare', label: 'Edge products shipped' },
                        ].map((item) => (
                            <div key={item.label} className="md:border-t pt-6" style={{ borderColor: 'var(--color-rule)' }}>
                                <div style={{
                                    fontFamily: 'var(--font-family-display)',
                                    fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                                    lineHeight: 1,
                                    letterSpacing: '-0.02em',
                                    color: 'var(--color-text-primary)',
                                }}>
                                    {item.stat}
                                </div>
                                <div className="text-label mt-3">{item.label}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                        lineHeight: 1.4,
                        color: 'var(--color-text-secondary)',
                        maxWidth: '52ch',
                        marginTop: '3rem',
                    }}>
                        Everything ships. Onchain trade execution, a large Go backend on Postgres and AWS, and edge products on Cloudflare Workers &mdash; all real, all in production.
                    </p>
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-tertiary)',
                        marginTop: '1.5rem',
                        lineHeight: 1.5,
                    }}>
                        Real client work delivered &mdash; web + identity systems for APAC AI.
                    </p>
                </section>

                {/* ============================================================
                    WHAT I DO — clear offers
                    ============================================================ */}
                <section>
                    <p className="text-label mb-10">What I do</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
                        {[
                            { num: '01', title: 'AI agents for real jobs', desc: 'Purpose-built agents that research, decide, draft, or coordinate within the way your team already works.' },
                            { num: '02', title: 'Workflow automation', desc: 'Connected systems that remove repetitive steps, reduce errors, and keep work moving without another dashboard.' },
                            { num: '03', title: 'Internal tools that fit', desc: 'Practical apps, developer tools, and infrastructure shaped around your team &mdash; not generic software you have to bend around.' },
                        ].map((item) => (
                            <div key={item.num} className="md:border-t pt-6" style={{ borderColor: 'var(--color-rule)' }}>
                                <span className="text-label block mb-6" style={{ opacity: 0.5 }}>{item.num}</span>
                                <h3 style={{
                                    fontFamily: 'var(--font-family-display)',
                                    fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                                    lineHeight: 1.2,
                                    letterSpacing: '-0.01em',
                                    marginBottom: '0.75rem',
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.85rem',
                                    lineHeight: 1.6,
                                    color: 'var(--color-text-secondary)',
                                    maxWidth: '28ch',
                                }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================================
                    SELECTED WORK — references the real Projects page
                    ============================================================ */}
                <section>
                    <div className="flex items-baseline justify-between mb-8">
                        <p className="text-label">Selected work</p>
                        <a href="https://github.com/aegntic" target="_blank" rel="noopener noreferrer" className="nav-link flex items-center gap-1">
                            All projects <ArrowUpRight size={12} />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {featured.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>

                {/* ============================================================
                    CTA — usable by a warm lead (e.g. Linda)
                    ============================================================ */}
                <section className="py-16 md:py-20 border-t" style={{ borderColor: 'var(--color-rule)' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(2rem, 6vw, 4rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-text-primary)',
                        maxWidth: '20ch',
                    }}>
                        Have work that should run better? Let&rsquo;s make it real.
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-family-display)',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                        lineHeight: 1.4,
                        color: 'var(--color-text-secondary)',
                        maxWidth: '48ch',
                        marginTop: '1.25rem',
                    }}>
                        Bring the process, the problem, or the ambition. We&rsquo;ll turn it into a clear, usable system.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <button onClick={onOpenContact} className="btn-primary">
                            Start a project <ArrowRight size={14} />
                        </button>
                        <a href="mailto:hello@aegntic.com" className="nav-link flex items-center gap-2">
                            <Mail size={14} /> hello@aegntic.com
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;
