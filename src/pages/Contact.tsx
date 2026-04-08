import ScrollReveal from '../components/ScrollReveal';
import Magnetic from '../components/Magnetic';
import SubscribeForm from '../components/SubscribeForm';
import { Mail, ArrowRight, Send, Github, Twitter } from 'lucide-react';
import { useState } from 'react';

const Contact: React.FC = () => {
    const contactMethods = [
        { type: 'GitHub', value: 'github.com/aegntic', label: 'Open Source', icon: '</>' },
        { type: 'Twitter', value: '@aegntic_ai', label: 'Updates', icon: 'X' },
        { type: 'Email', value: 'contact@aegntic.ai', label: 'Get in touch', icon: '@' },
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
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="section-label">/contact</span>
                        <h2 className="section-header mt-3">
                            Get in <span className="text-accent-orange">Touch</span>
                        </h2>
                        <div className="section-divider-accent mt-6" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <p className="text-body-lg max-w-3xl mb-16">
                        Interested in collaborating, using the tools, or just want to
                        talk about AI agents? Reach out.
                    </p>
                </ScrollReveal>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Contact Form */}
                    <ScrollReveal>
                        <div>
                            <h3 className="text-headline font-bold mb-8">
                                Send a <span className="text-accent-blue">message</span>
                            </h3>
                            {status === 'success' ? (
                                <div className="glass-panel border border-accent-blue/30 bg-accent-blue/5 p-8 text-center">
                                    <div className="text-accent-blue mb-4 flex justify-center"><Send size={32} /></div>
                                    <h4 className="text-lg font-bold text-text-primary mb-2">Message sent</h4>
                                    <p className="text-text-muted text-sm">I'll get back to you soon.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-xs text-accent-blue hover:text-accent-blue/80 underline"
                                    >
                                        Send another
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
                                            <option>Collaboration</option>
                                            <option>Using Your Tools</option>
                                            <option>Press/Media</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-mono-label text-text-dim block mb-2">Message</label>
                                        <textarea
                                            rows={6}
                                            placeholder="What's on your mind..."
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            disabled={status === 'loading'}
                                            className="w-full neu-inset px-6 py-4 text-sm outline-none text-text-primary placeholder:text-text-dim resize-none focus:border-accent-blue/50 transition-colors"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="text-red-400 text-xs font-mono">
                                            Something went wrong. Please try again.
                                        </div>
                                    )}

                                    <Magnetic strength={0.2}>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="neu-pill-orange w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === 'loading' ? 'Sending...' : <><Send size={16} /> Send Message</>}
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
                                Quick <span className="text-accent-blue">Links</span>
                            </h3>
                            <div className="space-y-4">
                                {contactMethods.map((method, idx) => (
                                    <Magnetic key={idx} strength={0.15}>
                                        <a href={
                                            method.type === 'GitHub' ? 'https://github.com/aegntic' :
                                            method.type === 'Twitter' ? 'https://twitter.com/aegntic_ai' :
                                            `mailto:${method.value}`
                                        } target={method.type !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                                            className="glass-card group block">
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
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Newsletter */}
                <ScrollReveal>
                    <div className="glass-panel metal-surface !p-10 lg:!p-16">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-headline font-bold mb-4">
                                    Stay <span className="text-accent-blue">Updated</span>
                                </h3>
                                <p className="text-text-muted">
                                    Get notified when new projects ship. No spam.
                                </p>
                            </div>
                            <SubscribeForm variant="blue" />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Contact;
