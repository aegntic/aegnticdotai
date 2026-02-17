import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, Sparkles, Check, ShieldAlert } from 'lucide-react';
import Magnetic from './Magnetic';

interface SubscribeFormProps {
    className?: string;
    variant?: 'orange' | 'blue';
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({ className = '', variant = 'orange' }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const docRef = doc(db, 'subscribers', email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setStatus('exists');
                localStorage.setItem('aegntic_newsletter_status', 'subscribed');
            } else {
                await setDoc(docRef, {
                    email,
                    source: 'newsletter_form',
                    timestamp: serverTimestamp(),
                    status: 'active'
                });
                setStatus('success');
                setEmail('');
                localStorage.setItem('aegntic_newsletter_status', 'subscribed');
            }
        } catch (error) {
            console.error('Error adding subscriber:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        const bgClass = variant === 'orange' ? 'bg-accent-orange/5 border-accent-orange/30 text-accent-orange' : 'bg-accent-blue/5 border-accent-blue/30 text-accent-blue';
        return (
            <div className={`glass-inset px-6 py-4 font-mono text-sm border rounded-lg ${bgClass} ${className}`}>
                &gt; Transmission received. Welcome to the signal.
            </div>
        );
    }

    const buttonClass = variant === 'orange' ? 'neu-pill-orange' : 'neu-pill-blue';
    const focusClass = variant === 'orange' ? 'focus:border-accent-orange/50' : 'focus:border-accent-blue/50';

    return (
        <form onSubmit={handleSubscribe} className={`flex flex-col gap-4 ${className}`}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER_EMAIL"
                className={`w-full glass-inset px-6 py-4 text-sm font-mono outline-none text-text-primary placeholder:text-text-dim transition-colors ${focusClass}`}
                disabled={status === 'loading'}
            />
            {variant === 'orange' ? (
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`${buttonClass} flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {status === 'loading' ? 'Encrypting...' : <>Subscribe to Signal <ArrowRight size={16} /></>}
                </button>
            ) : (
                <Magnetic strength={0.25}>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`${buttonClass} !py-3 !px-6 flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {status === 'loading' ? 'Encrypting...' : <><Sparkles size={14} /> Subscribe</>}
                    </button>
                </Magnetic>
            )}

            {status === 'error' && (
                <div className="text-red-400 text-xs font-mono mt-2">
                    Error establishing connection. Please retry.
                </div>
            )}
        </form>
    );
};

export default SubscribeForm;
