import React from 'react';

interface AeLoaderProps {
    size?: number;
    color?: string;
}

/**
 * AeLoader — Animated loading state using the ae· mark.
 * Outline draws in, then fills; dots orbit.
 */
const AeLoader: React.FC<AeLoaderProps> = ({ size = 64, color = 'var(--color-accent-blue, #00CFE5)' }) => {
    const height = Math.round(size * 0.65);

    return (
        <div className="ae-loader-wrap" style={{ width: size, height }}>
            <svg
                width={size}
                height={height}
                viewBox="0 0 120 76"
                fill="none"
                className="ae-loader"
            >
                {/* Outline draw-in */}
                <path
                    d="
            M 52 14
            A 30 30 0 1 1 52 58
            A 30 30 0 1 1 52 14
          "
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="ae-loader__outline"
                />
                {/* Counter circle */}
                <circle
                    cx="28" cy="40" r="13"
                    stroke={color}
                    strokeWidth="1.5"
                    className="ae-loader__counter"
                />
                {/* Crossbar */}
                <line
                    x1="54" y1="36" x2="103" y2="36"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="ae-loader__bar"
                />
                {/* Orbiting dots */}
                <circle cx="96" cy="64" r="5.5" fill={color} className="ae-loader__dot-lg" />
                <circle cx="107" cy="56" r="3" fill={color} className="ae-loader__dot-sm" />
            </svg>
        </div>
    );
};

export default AeLoader;
