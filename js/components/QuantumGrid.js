/**
 * QuantumGrid - Interactive animated grid background
 * Creates a dynamic, responsive grid with quantum-like effects
 */

class QuantumGrid {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.gridLines = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isAnimating = false;

        // Default options
        this.options = {
            gridSize: 60,
            particleCount: 50,
            particleSpeed: 0.5,
            mouseRadius: 150,
            lineColor: 'rgba(0, 229, 255, 0.1)',
            particleColor: '#00E5FF',
            glowColor: 'rgba(0, 229, 255, 0.5)',
            ...options
        };

        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.generateGridLines();
        this.generateParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';

        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Add visibility change listener to pause/resume animation
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    generateGridLines() {
        this.gridLines = [];
        const { gridSize } = this.options;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.gridLines.push({
                type: 'vertical',
                x: x,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.gridLines.push({
                type: 'horizontal',
                y: y,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    generateParticles() {
        this.particles = [];
        const { particleCount } = this.options;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.particleSpeed,
                vy: (Math.random() - 0.5) * this.options.particleSpeed,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.5,
                connections: []
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.options.mouseRadius) {
                const force = (1 - distance / this.options.mouseRadius) * 0.5;
                particle.vx -= (dx / distance) * force;
                particle.vy -= (dy / distance) * force;

                // Limit velocity
                const maxSpeed = 2;
                const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (currentSpeed > maxSpeed) {
                    particle.vx = (particle.vx / currentSpeed) * maxSpeed;
                    particle.vy = (particle.vy / currentSpeed) * maxSpeed;
                }
            }

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Reset speed if too slow
            if (Math.abs(particle.vx) < 0.01) particle.vx = (Math.random() - 0.5) * this.options.particleSpeed;
            if (Math.abs(particle.vy) < 0.01) particle.vy = (Math.random() - 0.5) * this.options.particleSpeed;
        });
    }

    findConnections() {
        // Clear connections
        this.particles.forEach(particle => {
            particle.connections = [];
        });

        // Find nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    p1.connections.push({
                        particle: p2,
                        distance: distance
                    });
                }
            }
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(2, 2, 5, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines
        this.ctx.strokeStyle = this.options.lineColor;
        this.ctx.lineWidth = 0.5;

        this.gridLines.forEach(line => {
            this.ctx.globalAlpha = line.opacity;
            this.ctx.beginPath();

            if (line.type === 'vertical') {
                this.ctx.moveTo(line.x, 0);
                this.ctx.lineTo(line.x, this.canvas.height);
            } else {
                this.ctx.moveTo(0, line.y);
                this.ctx.lineTo(this.canvas.width, line.y);
            }

            this.ctx.stroke();
        });

        // Draw connections
        this.particles.forEach(particle => {
            particle.connections.forEach(connection => {
                const opacity = 1 - (connection.distance / 100);
                this.ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.3})`;
                this.ctx.lineWidth = 0.5;

                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(connection.particle.x, connection.particle.y);
                this.ctx.stroke();
            });
        });

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.opacity;

            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 4
            );
            gradient.addColorStop(0, this.options.particleColor);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
            this.ctx.fill();

            // Core particle
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
    }

    animate() {
        if (!this.isAnimating) return;

        this.updateParticles();
        this.findConnections();
        this.draw();

        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isAnimating = true;
        this.animate();
    }

    pause() {
        this.isAnimating = false;
    }

    resume() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    destroy() {
        this.isAnimating = false;
        if (this.canvas && this.container.contains(this.canvas)) {
            this.container.removeChild(this.canvas);
        }

        // Remove event listeners
        window.removeEventListener('resize', this.resizeCanvas);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }

    // Public API methods
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };

        // Regenerate elements if needed
        if (newOptions.particleCount !== undefined) {
            this.generateParticles();
        }
    }

    setMousePosition(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
}

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
    const quantumGrids = document.querySelectorAll('[data-quantum-grid]');
    quantumGrids.forEach(container => {
        const options = container.dataset.quantumGrid ?
            JSON.parse(container.dataset.quantumGrid) : {};
        new QuantumGrid(container, options);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumGrid;
}