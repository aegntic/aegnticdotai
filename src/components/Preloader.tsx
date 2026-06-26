import React, { useState, useEffect, useCallback } from 'react';

const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'enter' | 'tagline' | 'exit'>('enter');
    const [visible, setVisible] = useState(true);

    const handleExit = useCallback(() => {
        setPhase('exit');
        setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 800);
    }, [onComplete]);

    useEffect(() => {
        const taglineTimer = setTimeout(() => setPhase('tagline'), 600);
        const exitTimer = setTimeout(handleExit, 2400);
        return () => {
            clearTimeout(taglineTimer);
            clearTimeout(exitTimer);
        };
    }, [handleExit]);

    if (!visible) return null;

    return (
        <div
            className={`preloader ${phase === 'exit' ? 'preloader--exit' : ''}`}
            aria-hidden="true"
        >
            <div className="preloader__brand">
                <img
                    src="/assets/visuals/hero-typography.png"
                    alt="AEGNTIC.AI"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className={`preloader__tagline ${phase === 'tagline' || phase === 'exit' ? 'preloader__tagline--visible' : ''}`}>
                <span>Adaptive Emergence</span>
            </div>
        </div>
    );
};

export default Preloader;
