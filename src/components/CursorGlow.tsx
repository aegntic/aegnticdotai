import React, { useEffect, useRef } from 'react';

/**
 * CursorGlow — Subtle cyan glow that follows the cursor.
 * Lerped position for buttery smooth movement.
 */
const CursorGlow: React.FC = () => {
    const glowRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -200, y: -200 });
    const target = useRef({ x: -200, y: -200 });
    const raf = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            pos.current.x = lerp(pos.current.x, target.current.x, 0.08);
            pos.current.y = lerp(pos.current.y, target.current.y, 0.08);

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
            }
            raf.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMove);
        raf.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed top-0 left-0 z-0"
            style={{
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,207,229,0.06) 0%, transparent 70%)',
                willChange: 'transform',
            }}
        />
    );
};

export default CursorGlow;
