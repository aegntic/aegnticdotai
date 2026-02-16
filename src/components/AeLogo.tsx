import React from 'react';

interface AeLogoProps {
    size?: number;
    color?: string;
    className?: string;
    animated?: boolean;
}

/**
 * AeLogo — The ae· brand mark.
 * Ultra-bold filled lowercase 'a' and 'e' ligature with two orbital dots.
 * Letters overlap in the center. Counters are small relative to the thick strokes.
 * Matches the actual brand: chunky, rounded, physical weight.
 */
const AeLogo: React.FC<AeLogoProps> = ({
    size = 40,
    color = 'currentColor',
    className = '',
    animated = false,
}) => {
    const height = Math.round(size * 0.68);

    return (
        <svg
            width={size}
            height={height}
            viewBox="0 0 136 90"
            fill={color}
            className={`ae-logo ${animated ? 'ae-logo--animated' : ''} ${className}`}
            role="img"
            aria-label="aegntic"
        >
            {/* 'a' — Ultra-bold bowl + vertical stem, with counter cutout */}
            <path
                fillRule="evenodd"
                d="
                    M 64 4 L 64 86 L 50 86
                    C 20 86 2 68 2 45
                    C 2 22 20 4 50 4
                    Z
                    M 36 28
                    C 25 28 18 35 18 45
                    C 18 55 25 62 36 62
                    C 47 62 50 55 50 45
                    C 50 35 47 28 36 28
                    Z
                "
            />

            {/* 'e' — Ultra-bold bowl with crossbar, counter cutout, opening at right */}
            <path
                fillRule="evenodd"
                d="
                    M 90 4
                    C 68 4 56 20 56 45
                    C 56 70 68 86 90 86
                    C 106 86 118 76 124 66
                    L 116 58
                    C 112 66 102 74 92 74
                    C 76 74 66 60 64 48
                    L 126 48
                    L 126 42
                    C 126 20 112 4 90 4
                    Z
                    M 90 16
                    C 104 16 114 26 116 38
                    L 70 38
                    C 72 24 80 16 90 16
                    Z
                "
            />

            {/* Orbital dot — large */}
            <circle cx="120" cy="78" r="5.5" className="ae-dot ae-dot--lg" />
            {/* Orbital dot — small */}
            <circle cx="130" cy="68" r="3" className="ae-dot ae-dot--sm" />
        </svg>
    );
};

export default AeLogo;
