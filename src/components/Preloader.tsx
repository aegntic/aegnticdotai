import React, { useState, useEffect, useCallback } from 'react';

/**
 * Preloader — Dual-layer "AEGNTIC.AI" reveal.
 * 
 * Layer 1 (back): Bold dark serif text — scales and fades in first.
 * Layer 2 (front): Clear liquid glass lowercase text — slides up with stagger.
 * 
 * After the sequence completes, the entire preloader lifts away.
 */

const LETTERS_UPPER = ['A', 'E', 'G', 'N', 'T', 'I', 'C', '.', 'A', 'I'];
const LETTERS_LOWER = ['a', 'e', 'g', 'n', 't', 'i', 'c', '.', 'a', 'i'];

const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'enter' | 'glass' | 'exit'>('enter');
    const [visible, setVisible] = useState(true);

    const handleExit = useCallback(() => {
        setPhase('exit');
        setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 900);
    }, [onComplete]);

    useEffect(() => {
        // Phase 1: serif text scales in (already starts via CSS)
        const glassTimer = setTimeout(() => setPhase('glass'), 800);
        // Phase 2: glass letters stagger up, hold, then exit
        const exitTimer = setTimeout(handleExit, 3200);
        return () => {
            clearTimeout(glassTimer);
            clearTimeout(exitTimer);
        };
    }, [handleExit]);

    if (!visible) return null;

    return (
        <div
            className={`preloader ${phase === 'exit' ? 'preloader--exit' : ''}`}
            aria-hidden="true"
        >
            {/* Ambient grid */}
            <div className="preloader__grid" />

            {/* Reflection surface */}
            <div className="preloader__reflection" />

            {/* Main Brand Asset — 3D Glass Typography */}
            <div className={`preloader__brand ${phase === 'enter' ? 'preloader__brand--enter' : ''}`}>
                <img
                    src="/assets/visuals/hero-typography.png"
                    alt="AEGNTIC.AI"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{
                        filter: 'drop-shadow(0 0 40px rgba(0, 207, 229, 0.3))'
                    }}
                />
            </div>

            {/* Tagline */}
            <div className={`preloader__tagline ${phase === 'glass' || phase === 'exit' ? 'preloader__tagline--visible' : ''}`}>
                <span>Adaptive Emergence</span>
            </div>
        </div>
    );
};

export default Preloader;
