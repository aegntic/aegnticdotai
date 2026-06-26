import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface SubscribeFormProps {
    className?: string;
    variant?: 'default';
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({ className = '' }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'newsletter_form' }),
            });

            const data = await response.json() as { status?: string; error?: string };

            if (response.ok) {
                if (data.status === 'exists') {
                    setStatus('exists');
                } else {
                    setStatus('success');
                }
                localStorage.setItem('aegntic_newsletter_status', 'subscribed');
                setEmail('');
            } else {
                console.error('Subscription failed:', data.error);
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={`flex items-center gap-2 text-sm ${className}`} style={{ color: 'var(--color-text-primary)' }}>
                <Check size={14} />
                <span>Done.</span>
            </div>
        );
    }

    if (status === 'exists') {
        return (
            <div className={`text-sm ${className}`} style={{ color: 'var(--color-text-tertiary)' }}>
                Already in.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubscribe} className={`flex gap-3 ${className}`}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input flex-1"
                disabled={status === 'loading'}
                required
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary whitespace-nowrap disabled:opacity-50"
            >
                {status === 'loading' ? '...' : 'Subscribe'}
            </button>
        </form>
    );
};

export default SubscribeForm;
