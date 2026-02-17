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

            <div className="preloader__wordmark">
                {/* Layer 1: Bold serif shadow text */}
                <div className={`preloader__serif ${phase !== 'enter' ? 'preloader__serif--shrink' : ''}`}>
                    {LETTERS_UPPER.map((letter, i) => (
                        <span
                            key={`serif-${i}`}
                            className="preloader__serif-letter"
                            style={{
                                animationDelay: `${i * 60}ms`,
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                {/* Layer 2: Glass lowercase overlay */}
                <div className={`preloader__glass ${phase === 'glass' || phase === 'exit' ? 'preloader__glass--active' : ''}`}>
                    {LETTERS_LOWER.map((letter, i) => (
                        <span
                            key={`glass-${i}`}
                            className="preloader__glass-letter"
                            style={{
                                animationDelay: `${i * 80 + 200}ms`,
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>

            {/* Tagline */}
            <div className={`preloader__tagline ${phase === 'glass' || phase === 'exit' ? 'preloader__tagline--visible' : ''}`}>
                <span>Adaptive Emergence</span>
            </div>
        </div>
    );
};

export default Preloader;
