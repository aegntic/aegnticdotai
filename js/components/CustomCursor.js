/**
 * CustomCursor - Animated cursor with trailing effects
 * Creates a futuristic cursor with multiple layers and interactions
 */
class CustomCursor {
    constructor(options = {}) {
        // Default options
        this.options = {
            size: 20,
            trailLength: 5,
            color: '#00E5FF',
            hoverColor: '#ffffff',
            clickColor: '#ff00ff',
            speed: 0.15,
            ...options
        };

        this.cursor = null;
        this.trails = [];
        this.currentX = window.innerWidth / 2;
        this.currentY = window.innerHeight / 2;
        this.targetX = this.currentX;
        this.targetY = this.currentY;
        this.isHovering = false;
        this.isClicking = false;
        this.isActive = true;

        this.init();
    }

    init() {
        this.createCursor();
        this.createTrails();
        this.setupEventListeners();
        this.animate();
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: ${this.options.size}px;
            height: ${this.options.size}px;
            border: 2px solid ${this.options.color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease, border-color 0.3s ease;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
        `;

        // Add inner dot
        const innerDot = document.createElement('div');
        innerDot.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: ${this.options.color};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: background 0.3s ease;
        `;

        this.cursor.appendChild(innerDot);
        document.body.appendChild(this.cursor);
    }

    createTrails() {
        for (let i = 0; i < this.options.trailLength; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: ${this.options.size * (1 - i * 0.15)}px;
                height: ${this.options.size * (1 - i * 0.15)}px;
                border: 1px solid ${this.options.color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                opacity: ${1 - (i * 0.2)};
                transform: translate(-50%, -50%);
                mix-blend-mode: difference;
            `;
            document.body.appendChild(trail);
            this.trails.push({
                element: trail,
                x: this.currentX,
                y: this.currentY
            });
        }
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });

        // Touch support for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.targetX = e.touches[0].clientX;
                this.targetY = e.touches[0].clientY;
            }
        });

        // Hover effects
        document.addEventListener('mouseover', (e) => {
            const hoverable = e.target.closest('a, button, .nav-item, .team-card, .holo-card, input, select, textarea');
            if (hoverable) {
                this.setHovering(true);
                this.updateCursorForElement(hoverable);
            } else {
                this.setHovering(false);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const hoverable = e.target.closest('a, button, .nav-item, .team-card, .holo-card, input, select, textarea');
            if (hoverable) {
                this.setHovering(false);
            }
        });

        // Click effects
        document.addEventListener('mousedown', () => {
            this.setClicking(true);
        });

        document.addEventListener('mouseup', () => {
            this.setClicking(false);
        });

        // Hide on mouse leave
        document.addEventListener('mouseleave', () => {
            this.hide();
        });

        document.addEventListener('mouseenter', () => {
            this.show();
        });

        // Hide on touch devices
        if ('ontouchstart' in window) {
            this.hide();
        }

        // Keyboard navigation
        document.addEventListener('keydown', () => {
            this.hide();
        });
    }

    animate() {
        if (!this.isActive) return;

        // Smooth cursor movement
        this.currentX += (this.targetX - this.currentX) * this.options.speed;
        this.currentY += (this.targetY - this.currentY) * this.options.speed;

        // Update main cursor position
        this.cursor.style.left = `${this.currentX}px`;
        this.cursor.style.top = `${this.currentY}px`;

        // Update trails with lag
        this.trails.forEach((trail, index) => {
            const lag = 1 - (index * 0.2);
            const targetTrail = index === 0 ? this : this.trails[index - 1];

            trail.x += (targetTrail.x - trail.x) * (this.options.speed * lag);
            trail.y += (targetTrail.y - trail.y) * (this.options.speed * lag);

            trail.element.style.left = `${trail.x}px`;
            trail.element.style.top = `${trail.y}px`;
        });

        requestAnimationFrame(() => this.animate());
    }

    setHovering(hovering) {
        if (this.isHovering === hovering) return;

        this.isHovering = hovering;

        if (hovering) {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            this.cursor.style.borderColor = this.options.hoverColor;
            this.cursor.querySelector('div').style.background = this.options.hoverColor;
        } else {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            this.cursor.style.borderColor = this.options.color;
            this.cursor.querySelector('div').style.background = this.options.color;
        }
    }

    setClicking(clicking) {
        if (this.isClicking === clicking) return;

        this.isClicking = clicking;

        if (clicking) {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            this.cursor.style.borderColor = this.options.clickColor;
            this.createClickEffect();
        } else {
            this.cursor.style.transform = this.isHovering ?
                'translate(-50%, -50%) scale(1.5)' :
                'translate(-50%, -50%) scale(1)';
            this.cursor.style.borderColor = this.isHovering ?
                this.options.hoverColor :
                this.options.color;
        }
    }

    updateCursorForElement(element) {
        // Special cursor styles for different elements
        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            this.cursor.style.borderColor = '#00ff00';
        } else if (element.classList.contains('nav-item')) {
            this.cursor.style.borderColor = '#00ffff';
        } else if (element.classList.contains('team-card')) {
            this.cursor.style.borderColor = '#ff00ff';
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            this.cursor.style.borderColor = '#ffff00';
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }
    }

    createClickEffect() {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            left: ${this.currentX}px;
            top: ${this.currentY}px;
            width: 10px;
            height: 10px;
            border: 2px solid ${this.options.clickColor};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
            animation: cursorClickEffect 0.6s ease-out forwards;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cursorClickEffect {
                0% {
                    width: 10px;
                    height: 10px;
                    opacity: 1;
                }
                100% {
                    width: 50px;
                    height: 50px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(effect);

        // Remove effect after animation
        setTimeout(() => {
            effect.remove();
            style.remove();
        }, 600);
    }

    show() {
        this.cursor.style.display = 'block';
        this.trails.forEach(trail => {
            trail.element.style.display = 'block';
        });
    }

    hide() {
        this.cursor.style.display = 'none';
        this.trails.forEach(trail => {
            trail.element.style.display = 'none';
        });
    }

    toggle(enabled) {
        this.isActive = enabled;
        if (enabled) {
            this.show();
        } else {
            this.hide();
        }
    }

    destroy() {
        this.isActive = false;

        // Remove cursor and trails
        if (this.cursor) {
            this.cursor.remove();
        }

        this.trails.forEach(trail => {
            trail.element.remove();
        });

        // Remove event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('mouseover', this.handleMouseOver);
        document.removeEventListener('mouseout', this.handleMouseOut);
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-touch devices
    if (!('ontouchstart' in window)) {
        window.customCursor = new CustomCursor();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomCursor;
}