import React from 'react';

interface AeLogoProps {
    size?: number;
    className?: string;
}

const AeLogo: React.FC<AeLogoProps> = ({
    size = 40,
    className = '',
}) => {
    return (
        <img
            src="/assets/visuals/hero-typography.png"
            alt="aegntic"
            width={size}
            height={size}
            className={className}
            style={{ objectFit: 'contain' }}
        />
    );
};

export default AeLogo;
