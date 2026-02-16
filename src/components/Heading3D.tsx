import React from 'react';

interface Heading3DProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
    children: React.ReactNode;
    className?: string;
    size?: 'large' | 'medium' | 'small';
}

/**
 * Heading3D - Renders text with 3D depth and SE corner wireframe gradient.
 * 
 * The wireframe effect is applied via CSS mask from the bottom-right (SE) corner,
 * covering approximately 33% of the text with a stroke-only overlay.
 */
const Heading3D: React.FC<Heading3DProps> = ({
    as: Tag = 'h2',
    children,
    className = '',
    size = 'medium'
}) => {
    const sizeClass = size === 'large'
        ? 'heading-3d--large'
        : size === 'small'
            ? 'heading-3d--small'
            : '';

    return (
        <span className={`heading-3d ${sizeClass} ${className}`}>
            {/* Solid text layer with 3D shadow */}
            <Tag className="heading-3d__solid">
                {children}
            </Tag>
            {/* Wireframe overlay layer - SE corner gradient */}
            <span
                className="heading-3d__wire"
                aria-hidden="true"
            >
                {children}
            </span>
        </span>
    );
};

export default Heading3D;
