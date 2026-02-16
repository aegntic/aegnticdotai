import React, { useRef, useState, useCallback } from 'react';

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
    as?: React.ElementType;
}

/**
 * Magnetic — Wrapper that makes children magnetically attracted to the cursor.
 * Smooth spring-back on leave. Used on CTAs, nav pills, cards.
 */
const Magnetic: React.FC<MagneticProps> = ({
    children,
    strength = 0.3,
    className = '',
    as: Tag = 'div',
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        setStyle({
            transform: `translate(${dx}px, ${dy}px)`,
            transition: 'transform 0.15s ease-out',
        });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        setStyle({
            transform: 'translate(0, 0)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        });
    }, []);

    return (
        // @ts-ignore – dynamic tag
        <Tag
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={style}
        >
            {children}
        </Tag>
    );
};

export default Magnetic;
