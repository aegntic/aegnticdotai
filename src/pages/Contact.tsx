import ScrollReveal from '../components/ScrollReveal';
import Magnetic from '../components/Magnetic';
import SubscribeForm from '../components/SubscribeForm';
import { Mail, ArrowRight, Send, Newspaper, Sparkles, Twitter, Github, Linkedin, Rss } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────────
   Wireframe landmark icons — SVG inline, one per city.
   Each is a single-stroke minimalist outline of the city's most iconic feature.
   ────────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react';


const LandmarkSydney = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {/* Opera House sails */}
        <path d="M 6 36 Q 14 10, 18 36" />
        <path d="M 14 36 Q 22 6, 26 36" />
        <path d="M 22 36 Q 30 12, 34 36" />
        <path d="M 30 36 Q 36 18, 40 36" />
        {/* Base */}
        <line x1="4" y1="36" x2="42" y2="36" />
        {/* Water */}
        <path d="M 2 42 Q 12 39, 24 42 Q 36 45, 46 42" strokeWidth="1" opacity="0.4" />
    </svg>
);

const LandmarkLondon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {/* Big Ben tower */}
        <rect x="17" y="10" width="14" height="28" rx="1" />
        {/* Clock face */}
        <circle cx="24" cy="20" r="4" />
        <line x1="24" y1="20" x2="24" y2="17" strokeWidth="1" />
        <line x1="24" y1="20" x2="26" y2="20" strokeWidth="1" />
        {/* Spire */}
        <line x1="24" y1="10" x2="24" y2="4" />
        <circle cx="24" cy="3" r="1" fill="currentColor" />
        {/* Base */}
        <line x1="14" y1="38" x2="34" y2="38" />
    </svg>
);

const LandmarkBerlin = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {/* Brandenburg Gate columns */}
        <line x1="10" y1="16" x2="10" y2="38" />
        <line x1="18" y1="16" x2="18" y2="38" />
        <line x1="24" y1="16" x2="24" y2="38" />
        <line x1="30" y1="16" x2="30" y2="38" />
        <line x1="38" y1="16" x2="38" y2="38" />
        {/* Top beam */}
        <rect x="8" y="12" width="32" height="4" rx="1" />
        {/* Quadriga (chariot on top) */}
        <path d="M 20 12 L 24 6 L 28 12" />
        {/* Base */}
        <line x1="6" y1="38" x2="42" y2="38" />
    </svg>
);

const LandmarkAmsterdam = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {/* Canal houses — stepped gables */}
        <path d="M 6 38 L 6 20 L 10 14 L 14 20 L 14 38" />
        <path d="M 16 38 L 16 18 L 20 12 L 24 18 L 24 38" />
        <path d="M 26 38 L 26 22 L 30 16 L 34 22 L 34 38" />
        <path d="M 36 38 L 36 20 L 40 14 L 44 20 L 44 38" />
        {/* Windows */}
        <rect x="8" y="24" width="4" height="4" rx="0.5" />
        <rect x="18" y="22" width="4" height="4" rx="0.5" />
        <rect x="28" y="26" width="4" height="4" rx="0.5" />
        <rect x="38" y="24" width="4" height="4" rx="0.5" />
        {/* Canal water */}
        <path d="M 2 42 Q 12 39, 24 42 Q 36 45, 46 42" strokeWidth="1" opacity="0.4" />
    </svg>
);

const LandmarkDublin = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        {/* Ha'penny Bridge arch */}
        <path d="M 4 32 Q 24 8, 44 32" />
        {/* Railings */}
        <line x1="12" y1="25" x2="12" y2="20" />
        <line x1="18" y1="20" x2="18" y2="15" />
        <line x1="24" y1="18" x2="24" y2="13" />
        <line x1="30" y1="20" x2="30" y2="15" />
        <line x1="36" y1="25" x2="36" y2="20" />
        {/* Bridge deck */}
        <line x1="4" y1="32" x2="44" y2="32" />
        {/* River Liffey */}
        <path d="M 2 38 Q 12 35, 24 38 Q 36 41, 46 38" strokeWidth="1" opacity="0.4" />
    </svg>
);

const Contact: React.FC = () => {
    const contactMethods = [
        { type: 'Email', value: 'contact@aegntic.ai', label: 'General Inquiries', icon: '✉' },
        { type: 'Twitter', value: '@aegntic_ai', label: 'Latest Updates', icon: '𝕏' },
        { type: 'LinkedIn', value: '/company/aegntic', label: 'Company News', icon: 'in' },
        { type: 'GitHub', value: '/aegntic', label: 'Open Source', icon: '</>' },
    ];

    const officeLocations = [
        { city: 'Sydney', country: 'Australia', focus: 'Headquarters', Landmark: LandmarkSydney },
        { city: 'London', country: 'United Kingdom', focus: 'Engineering', Landmark: LandmarkLondon },
        { city: 'Berlin', country: 'Germany', focus: 'Research', Landmark: LandmarkBerlin },
        { city: 'Amsterdam', country: 'Netherlands', focus: 'Infrastructure', Landmark: LandmarkAmsterdam },
        { city: 'Dublin', country: 'Ireland', focus: 'Operations', Landmark: LandmarkDublin },
    ];

    const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
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
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">{/* subtle AI pun */}/api/v1/connect</span>
                        <h2 className="section-header mt-3">
                            Connect with <span className="text-accent-orange">Aegntic</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        Whether you're interested in research partnerships, career opportunities,
                        or exploring our technology stack — our response time is better than most inference APIs.
                    </p>
                </ScrollReveal>

                {/* Contact Grid — Asymmetric editorial */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Contact Form */}
                    <ScrollReveal>
                        <div>
                            <h3 className="text-headline font-bold mb-8">
                                Send us a <span className="text-accent-blue">message</span>
                            </h3>
                            <p className="text-text-muted mb-8">
                                Fill out the form below. Our team processes requests faster than batch inference.
                            </p>
                            {status === 'success' ? (
                                <div className="glass-panel border border-accent-blue/30 bg-accent-blue/5 p-8 text-center">
                                    <div className="text-accent-blue mb-4 flex justify-center"><Send size={32} /></div>
                                    <h4 className="text-lg font-bold text-text-primary mb-2">Message Transmitted</h4>
                                    <p className="text-text-muted text-sm">Our neural network is processing your request. We'll be in touch shortly.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-xs text-accent-blue hover:text-accent-blue/80 underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-mono-label text-text-dim block mb-2">Name</label>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                disabled={status === 'loading'}
                                                className="w-full glass-inset px-6 py-4 text-sm outline-none text-text-primary placeholder:text-text-dim focus:border-accent-blue/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-mono-label text-text-dim block mb-2">Email</label>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                disabled={status === 'loading'}
                                                className="w-full glass-inset px-6 py-4 text-sm outline-none text-text-primary placeholder:text-text-dim focus:border-accent-blue/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-mono-label text-text-dim block mb-2">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                            disabled={status === 'loading'}
                                            className="w-full glass-inset px-6 py-4 text-sm outline-none text-text-primary focus:border-accent-blue/50 transition-colors"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Research Partnership</option>
                                            <option>Career Opportunity</option>
                                            <option>Press/Media</option>
                                            <option>Technical Support</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-mono-label text-text-dim block mb-2">Message</label>
                                        <textarea
                                            rows={6}
                                            placeholder="Tell us more..."
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            disabled={status === 'loading'}
                                            className="w-full neu-inset px-6 py-4 text-sm outline-none text-text-primary placeholder:text-text-dim resize-none focus:border-accent-blue/50 transition-colors"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="text-red-400 text-xs font-mono">
                                            Transmission failed. Please verify connection and retry.
                                        </div>
                                    )}

                                    <Magnetic strength={0.2}>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="neu-pill-orange w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === 'loading' ? 'Transmitting...' : <><Send size={16} /> Send Message</>}
                                        </button>
                                    </Magnetic>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Contact Methods */}
                    <ScrollReveal delay={200}>
                        <div>
                            <h3 className="text-headline font-bold mb-8 text-right">
                                Quick <span className="text-accent-blue">Connections</span>
                            </h3>
                            <div className="space-y-4">
                                {contactMethods.map((method, idx) => (
                                    <Magnetic key={idx} strength={0.15}>
                                        <div className="glass-card group cursor-pointer">
                                            <div className="flex items-center justify-end gap-4">
                                                <div className="text-right flex-grow">
                                                    <div className="text-mono-label text-text-dim mb-1">{method.label}</div>
                                                    <div className="font-mono text-text-primary group-hover:text-accent-blue transition-colors">
                                                        {method.value}
                                                    </div>
                                                </div>
                                                <div className="w-12 h-12 rounded-xl glass-inset flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                                                    <span className="text-accent-blue font-mono text-sm">{method.icon}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Global Offices — Cities with wireframe landmark icons */}
                <ScrollReveal>
                    <div className="glass-panel metal-surface !p-10 lg:!p-16 mb-24">
                        <div className="text-right mb-12">
                            <h3 className="text-headline font-bold mb-4">
                                Global <span className="text-accent-orange">Presence</span>
                            </h3>
                            <p className="text-text-muted">
                                Distributing compute across five time zones.
                                <span className="text-text-dim text-xs ml-2" title="We don't hallucinate our office locations">Zero hallucinations.</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {officeLocations.map((office, idx) => (
                                <ScrollReveal key={idx} delay={idx * 100}>
                                    <Magnetic strength={0.12}>
                                        <div className="glass-card group text-center py-8">
                                            <div className="text-accent-blue group-hover:text-accent-orange transition-colors duration-300 mb-4 flex justify-center opacity-60 group-hover:opacity-100">
                                                <office.Landmark />
                                            </div>
                                            <h4 className="font-display text-lg font-bold text-text-primary mb-1 tracking-tight">
                                                {office.city}
                                            </h4>
                                            <div className="text-mono-label text-accent-blue text-[9px]">{office.focus}</div>
                                        </div>
                                    </Magnetic>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Press & Media + Newsletter/Investor CTA blocks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Press & Media → Social Feeds */}
                    <ScrollReveal>
                        <Magnetic strength={0.1}>
                            <div className="glass-card h-full border-l-2 border-accent-orange">
                                <h3 className="text-headline font-bold mb-6">
                                    Press & <span className="text-accent-orange">Media</span>
                                </h3>
                                <p className="text-text-muted leading-relaxed mb-8">
                                    Latest announcements, research papers, and media coverage.
                                    Follow our feeds for real-time updates — no fine-tuning required.
                                </p>
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <a href="#" className="neu-pill !py-2 !px-4 flex items-center gap-2 text-text-muted hover:text-accent-orange transition-colors text-xs">
                                        <Twitter size={14} /> Twitter
                                    </a>
                                    <a href="#" className="neu-pill !py-2 !px-4 flex items-center gap-2 text-text-muted hover:text-accent-orange transition-colors text-xs">
                                        <Linkedin size={14} /> LinkedIn
                                    </a>
                                    <a href="#" className="neu-pill !py-2 !px-4 flex items-center gap-2 text-text-muted hover:text-accent-orange transition-colors text-xs">
                                        <Github size={14} /> GitHub
                                    </a>
                                    <a href="#" className="neu-pill !py-2 !px-4 flex items-center gap-2 text-text-muted hover:text-accent-orange transition-colors text-xs">
                                        <Rss size={14} /> Blog
                                    </a>
                                </div>
                                <a href="mailto:press@aegntic.ai" className="flex items-center gap-2 text-mono-label text-text-primary hover:text-accent-orange transition-colors">
                                    press@aegntic.ai <ArrowRight size={14} />
                                </a>
                            </div>
                        </Magnetic>
                    </ScrollReveal>

                    {/* Newsletter + Investor Opportunity */}
                    <ScrollReveal delay={200}>
                        <Magnetic strength={0.1}>
                            <div className="glass-card h-full border-l-2 border-accent-blue flex flex-col">
                                <h3 className="text-headline font-bold mb-6">
                                    Join the <span className="text-accent-blue">Signal</span>
                                </h3>
                                <p className="text-text-muted leading-relaxed mb-6">
                                    Subscribe for research updates, early access to tools, and investor briefings.
                                    Lower noise ratio than your average Transformer.
                                </p>
                                <div className="mb-auto">
                                    <SubscribeForm variant="blue" />
                                </div>
                                <div className="flex items-center gap-4 pt-4 border-t border-surface-raised mt-6">
                                    <a href="#" className="flex items-center gap-2 text-mono-label text-text-muted hover:text-accent-blue transition-colors">
                                        <Newspaper size={12} /> Investor Relations <ArrowRight size={12} />
                                    </a>
                                </div>
                            </div>
                        </Magnetic>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Contact;
