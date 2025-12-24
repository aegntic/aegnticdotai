import React from 'react';

interface Icon3DProps {
    icon: string;
    size?: number;
    className?: string;
}

/**
 * Icon3D - Renders a 3D isometric wireframe icon from the assets folder.
 * Falls back to a generic wireframe if the specific icon is not found.
 */
const Icon3D: React.FC<Icon3DProps> = ({ icon, size = 24, className = '' }) => {
    // Map Lucide icon names to 3D asset filenames
    const iconMap: Record<string, string> = {
        // Navigation / Core
        'Home': 'nav-home-3d.png',
        'About': 'nav-about-3d.png',
        'Laptop': 'icon-laptop-3d.png',
        'Package': 'icon-package-3d.png',
        'GitFork': 'icon-git-fork-3d.png',
        'Fingerprint': 'icon-fingerprint-3d.png',
        'Lock': 'icon-lock-3d.png',
        'Clock': 'icon-clock-3d.png',
        'Calendar': 'icon-calendar-3d.png',
        'Tag': 'icon-tag-3d.png',
        'BookOpen': 'icon-book-open-3d.png',

        // Social
        'Github': 'social-github-3d.png',
        'Linkedin': 'social-linkedin-3d.png',
        'Twitter': 'social-twitter-3d.png',
        'Mail': 'social-mail-3d.png',
        'MapPin': 'social-map-pin-3d.png',
    };

    const assetName = iconMap[icon] || 'icon-generic-3d.png';
    const assetPath = `/assets/icons/${assetName}`;

    return (
        <img
            src={assetPath}
            alt={icon}
            width={size}
            height={size}
            className={`select-none pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
            style={{
                width: size,
                height: size,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))'
            }}
            onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = '/assets/icons/icon-generic-3d.png';
            }}
        />
    );
};

export default Icon3D;
