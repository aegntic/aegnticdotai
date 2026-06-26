import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';

const NewsletterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

    useEffect(() => {
        const hasInteracted = localStorage.getItem('aegntic_newsletter_status');
        if (hasInteracted) return;

        const timer = setTimeout(() => setIsOpen(true), 30000);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem('aegntic_newsletter_status', 'dismissed');
    };

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) return;

        setStatus('loading');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'popup' }),
            });

            const data = await response.json() as { status?: string; error?: string };

            if (response.ok) {
                if (data.status === 'exists') {
                    setStatus('exists');
                    localStorage.setItem('aegntic_newsletter_status', 'subscribed');
                } else {
                    setStatus('success');
                    localStorage.setItem('aegntic_newsletter_status', 'subscribed');
                }
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ backgroundColor: 'var(--color-modal-backdrop)', backdropFilter: 'blur(8px)' }}
                    onClick={handleDismiss}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md panel"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            <X size={18} />
                        </button>

                        <div className="p-8">
                            {status === 'success' || status === 'exists' ? (
                                <div className="text-center py-4">
                                    <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                                        {status === 'exists' ? 'Already in' : 'Done.'}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        {status === 'exists' ? 'This email is already subscribed.' : ''}
                                    </p>
                                    <button onClick={handleDismiss} className="btn-ghost mt-6 w-full">
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <span className="section-label block mb-2">Newsletter</span>
                                        <h3 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                                            Stay close
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                            New projects. No filler.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubscribe} className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={status === 'loading'}
                                                className="input pl-10"
                                                required
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <div className="text-xs" style={{ color: 'var(--color-accent)' }}>
                                                Something went wrong. Please retry.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="btn-primary w-full disabled:opacity-50"
                                        >
                                            {status === 'loading' ? '...' : 'Subscribe'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NewsletterModal;
