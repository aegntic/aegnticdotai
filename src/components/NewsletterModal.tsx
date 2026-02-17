import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const NewsletterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

    useEffect(() => {
        // Check localStorage to see if user has already interacted
        const hasInteracted = localStorage.getItem('aegntic_newsletter_status');

        if (!hasInteracted) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 8000); // Trigger after 8 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem('aegntic_newsletter_status', 'dismissed');
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) return;

        setStatus('loading');

        try {
            // Reference the document using the email as the ID
            const docRef = doc(db, 'subscribers', email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setStatus('exists');
                localStorage.setItem('aegntic_newsletter_status', 'subscribed');
            } else {
                // Create new document
                await setDoc(docRef, {
                    email,
                    source: 'popup',
                    timestamp: serverTimestamp(),
                    status: 'active'
                });
                setStatus('success');
                localStorage.setItem('aegntic_newsletter_status', 'subscribed');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
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
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-deep-space/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md glass-panel metal-surface overflow-hidden shadow-2xl ring-1 ring-white/10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-text-dim hover:text-text-primary transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        {/* Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-white/50 to-accent-blue opacity-50" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="p-8 relative z-10">
                            {status === 'success' ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-blue">
                                        <Sparkles size={32} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Signal Received</h3>
                                    <p className="text-text-muted mb-6">
                                        You have successfully joined the Aegntic research collective. Verification complete.
                                    </p>
                                    <button
                                        onClick={handleDismiss}
                                        className="neu-pill !w-full justify-center"
                                    >
                                        Close Transmission
                                    </button>
                                </div>
                            ) : status === 'exists' ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-orange">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Already Connected</h3>
                                    <p className="text-text-muted mb-6">
                                        This frequency is already active. You are currently subscribed to our updates.
                                    </p>
                                    <button
                                        onClick={handleDismiss}
                                        className="neu-pill-orange !w-full justify-center"
                                    >
                                        Acknowledge
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <span className="text-mono-label text-accent-blue mb-2 block">/system/broadcast</span>
                                        <h3 className="text-3xl font-display font-bold text-text-primary mb-3">
                                            Join the <span className="text-accent-blue">Signal</span>
                                        </h3>
                                        <p className="text-text-muted leading-relaxed">
                                            Get significant updates, no spam, architectural breakdowns, and early access to new agent protocols.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubscribe} className="space-y-4">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-accent-blue transition-colors" size={18} />
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={status === 'loading'}
                                                className="w-full glass-inset pl-12 pr-4 py-4 text-sm outline-none text-text-primary placeholder:text-text-dim focus:border-accent-blue/50 transition-all"
                                                required
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <div className="text-red-400 text-xs font-mono">
                                                Connection failed. Please retry.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="neu-pill-orange w-full flex items-center justify-center gap-3 py-4 group"
                                        >
                                            {status === 'loading' ? (
                                                'Processing...'
                                            ) : (
                                                <>
                                                    YES, LETS GO <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-[10px] text-text-dim mt-4">
                                            Zero-knowledge privacy. No tracking pixels. Unsubscribe anytime.
                                        </p>
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
