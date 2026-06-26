import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import ProjectOverlay from './components/ProjectOverlay';
import PanelOverlay from './components/PanelOverlay';
import NewsletterModal from './components/NewsletterModal';
import SubscribeForm from './components/SubscribeForm';
import type { Project } from './data/projects';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [activePanel, setActivePanel] = useState<'about' | 'research' | 'contact' | null>(null);

    // Lock body scroll when any overlay is open
    useEffect(() => {
        const isOpen = activeProject !== null || activePanel !== null;
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [activeProject, activePanel]);

    // Close overlays on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (activeProject) { setActiveProject(null); return; }
                if (activePanel) { setActivePanel(null); return; }
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [activeProject, activePanel]);

    const handleOpenPanel = (panel: 'about' | 'research' | 'contact') => {
        setActivePanel(panel);
    };

    // About content
    const aboutContent = (
        <div>
            <p style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                maxWidth: '34ch',
                marginBottom: 'clamp(3rem, 6vw, 6rem)',
            }}>
                I&rsquo;m Mattae Cooper. I ship production AI-agent systems &mdash; solo, end to end.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24">
                {[
                    { num: '01', title: 'How I work', desc: 'One engineer, the whole system. Architecture, build, deployment. Rust, Go, TypeScript, Python &mdash; whichever the job needs.' },
                    { num: '02', title: 'What I ship', desc: 'Custom AI-agent builds, automation systems, and developer tooling. Real systems in production &mdash; not demos.' },
                    { num: '03', title: 'The proof', desc: '127+ public repositories. A 9-crate Rust trading engine, a large Go backend on Postgres and AWS, edge products on Cloudflare Workers.' },
                ].map(item => (
                    <div key={item.num} className="md:border-t pt-6" style={{ borderColor: '#ddd9d0' }}>
                        <span className="text-label block mb-6" style={{ opacity: 0.5 }}>{item.num}</span>
                        <h3 style={{
                            fontFamily: 'var(--font-family-display)',
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
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

            <div className="py-12 border-t border-b" style={{ borderColor: '#ddd9d0' }}>
                <p style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    maxWidth: '40ch',
                }}>
                    Systems over labor. I build the thing that runs, then hand it over.
                </p>
            </div>
        </div>
    );

    // Research content
    const researchContent = (
        <div>
            <div className="mb-16">
                <p style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                    maxWidth: '46ch',
                    marginBottom: '1.5rem',
                }}>
                    I build in the open. The work is the research.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', maxWidth: '48ch' }}>
                    No published papers to point at yet. Instead, the proof is public &mdash; 127+ repositories, shipped systems, and the commits behind them. Read the code; that is where the thinking lives.
                </p>
            </div>

            <div className="pt-10 border-t" style={{ borderColor: '#ddd9d0' }}>
                <a
                    href="https://github.com/aegntic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-8 group"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="tag">Open source</span>
                        <span className="text-label">github.com/aegntic</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                        The repositories <ArrowUpRight size={14} className="inline" />
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', maxWidth: '44ch', lineHeight: 1.5 }}>
                        Every project, every system, in the open. Start there.
                    </p>
                </a>
            </div>
        </div>
    );

    // Contact content
    const contactContent = (
        <div>
            <h2 style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
            }}>
                Contact
            </h2>

            <p style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                lineHeight: 1.4,
                color: 'var(--color-text-secondary)',
                maxWidth: '40ch',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}>
                Tell me what you&rsquo;re building. I&rsquo;ll scope it, quote it, and build it myself.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 md:gap-20">
                <ContactForm />
                <div className="md:border-l md:pl-16" style={{ borderColor: '#ddd9d0' }}>
                    <div className="mb-16">
                        <span className="text-label block mb-8">Elsewhere</span>
                        <div className="space-y-6">
                            {[
                                { type: 'GitHub', value: 'github.com/aegntic', href: 'https://github.com/aegntic' },
                                { type: 'Twitter', value: '@aegntic_ai', href: 'https://twitter.com/aegntic_ai' },
                                { type: 'Email', value: 'hello@aegntic.com', href: 'mailto:hello@aegntic.com' },
                            ].map((method, idx) => (
                                <a key={idx} href={method.href} target={method.type !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" className="group block">
                                    <div className="text-sm mb-1" style={{ color: 'var(--color-text-tertiary)' }}>{method.type}</div>
                                    <div className="link-arrow text-sm">{method.value}</div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t" style={{ borderColor: '#ddd9d0' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Occasional notes on what I&rsquo;m building.
                        </p>
                        <SubscribeForm />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col w-full" style={{ backgroundColor: '#faf9f6' }}>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <NewsletterModal />
            <div className={`flex flex-col min-h-screen transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <Navbar onOpenPanel={handleOpenPanel} />
                <main className="flex-grow flex flex-col">
                    <Home
                        onSelectProject={setActiveProject}
                        onOpenContact={() => handleOpenPanel('contact')}
                    />
                </main>
                <Footer />
            </div>

            {/* Project overlay */}
            <ProjectOverlay
                project={activeProject!}
                isOpen={activeProject !== null}
                onClose={() => setActiveProject(null)}
            />

            {/* Panel overlays */}
            <PanelOverlay
                title={activePanel === 'about' ? 'About' : activePanel === 'research' ? 'Research' : 'Contact'}
                isOpen={activePanel !== null}
                onClose={() => setActivePanel(null)}
            >
                {activePanel === 'about' && aboutContent}
                {activePanel === 'research' && researchContent}
                {activePanel === 'contact' && contactContent}
            </PanelOverlay>
        </div>
    );
};

// Contact form extracted as a sub-component to keep App cleaner
const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.message) return;
        setStatus('loading');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12">
                <p style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Sent.</p>
                <button onClick={() => setStatus('idle')} className="text-sm nav-link">Again</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="text-label block mb-2">Name</label>
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={status === 'loading'} className="input" />
                </div>
                <div>
                    <label className="text-label block mb-2">Email</label>
                    <input type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} disabled={status === 'loading'} className="input" />
                </div>
            </div>
            <div>
                <label className="text-label block mb-2">Message</label>
                <textarea rows={5} placeholder="What's on your mind..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} disabled={status === 'loading'} className="input resize-none" />
            </div>
            {status === 'error' && <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Try again.</div>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-50">
                {status === 'loading' ? '...' : 'Send'}
            </button>
        </form>
    );
};

export default App;
