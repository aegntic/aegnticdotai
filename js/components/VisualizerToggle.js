/**
 * VisualizerToggle - Controls for toggling visual effects and animations
 * Provides UI controls for managing various visual features
 */
class VisualizerToggle {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.toggleElement = null;
        this.panelElement = null;
        this.isOpen = false;

        // Default options
        this.options = {
            position: 'top-left',
            features: {
                quantumGrid: true,
                audioPlayer: true,
                customCursor: true,
                animations: true,
                effects: true,
                terminal: true
            },
            ...options
        };

        this.featureStates = {
            quantumGrid: localStorage.getItem('quantumGrid') !== 'false',
            audioPlayer: localStorage.getItem('audioPlayer') !== 'false',
            customCursor: localStorage.getItem('customCursor') !== 'false',
            animations: localStorage.getItem('animations') !== 'false',
            effects: localStorage.getItem('effects') !== 'false',
            terminal: true // Always enabled
        };

        this.init();
    }

    init() {
        this.createToggleUI();
        this.setupEventListeners();
        this.loadSettings();
    }

    createToggleUI() {
        // Position classes
        const positionClasses = {
            'top-left': 'top-6 left-6',
            'top-right': 'top-6 right-6',
            'bottom-left': 'bottom-6 left-6',
            'bottom-right': 'bottom-6 right-6'
        };

        const toggleHTML = `
            <div class="visualizer-toggle fixed ${positionClasses[this.options.position]} z-30">
                <!-- Toggle Button -->
                <button id="viz-toggle-btn" class="w-12 h-12 rounded-full border border-primary/30 bg-black/60 backdrop-blur-md flex items-center justify-center hover:border-primary/60 transition-all duration-300 group">
                    <span class="material-symbols-outlined text-white/60 group-hover:text-primary text-xl">tune</span>
                </button>

                <!-- Control Panel -->
                <div id="viz-panel" class="absolute top-full mt-3 left-0 w-64 holo-card p-4 bg-black/80 backdrop-blur-md hidden">
                    <div class="corner-tl"></div>
                    <div class="corner-tr"></div>
                    <div class="corner-bl"></div>
                    <div class="corner-br"></div>

                    <div class="mb-4">
                        <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Visual Controls</h3>
                    </div>

                    <div class="space-y-3">
                        <!-- Quantum Grid -->
                        ${this.options.features.quantumGrid ? `
                        <div class="flex items-center justify-between">
                            <label class="text-xs text-white/70 font-mono">Quantum Grid</label>
                            <button class="viz-toggle-feature w-10 h-5 rounded-full bg-white/10 relative transition-colors duration-300" data-feature="quantumGrid">
                                <div class="viz-toggle-slider absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                            </button>
                        </div>
                        ` : ''}

                        <!-- Audio Player -->
                        ${this.options.features.audioPlayer ? `
                        <div class="flex items-center justify-between">
                            <label class="text-xs text-white/70 font-mono">Audio Player</label>
                            <button class="viz-toggle-feature w-10 h-5 rounded-full bg-white/10 relative transition-colors duration-300" data-feature="audioPlayer">
                                <div class="viz-toggle-slider absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                            </button>
                        </div>
                        ` : ''}

                        <!-- Custom Cursor -->
                        ${this.options.features.customCursor ? `
                        <div class="flex items-center justify-between">
                            <label class="text-xs text-white/70 font-mono">Custom Cursor</label>
                            <button class="viz-toggle-feature w-10 h-5 rounded-full bg-white/10 relative transition-colors duration-300" data-feature="customCursor">
                                <div class="viz-toggle-slider absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                            </button>
                        </div>
                        ` : ''}

                        <!-- Animations -->
                        ${this.options.features.animations ? `
                        <div class="flex items-center justify-between">
                            <label class="text-xs text-white/70 font-mono">Animations</label>
                            <button class="viz-toggle-feature w-10 h-5 rounded-full bg-white/10 relative transition-colors duration-300" data-feature="animations">
                                <div class="viz-toggle-slider absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                            </button>
                        </div>
                        ` : ''}

                        <!-- Visual Effects -->
                        ${this.options.features.effects ? `
                        <div class="flex items-center justify-between">
                            <label class="text-xs text-white/70 font-mono">Effects</label>
                            <button class="viz-toggle-feature w-10 h-5 rounded-full bg-white/10 relative transition-colors duration-300" data-feature="effects">
                                <div class="viz-toggle-slider absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                            </button>
                        </div>
                        ` : ''}

                        <!-- Terminal -->
                        ${this.options.features.terminal ? `
                        <div class="flex items-center justify-between">
                            <label class="text-xs text-white/70 font-mono">Terminal</label>
                            <button id="terminal-toggle" class="px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded hover:bg-primary/30 transition-colors">
                                Open
                            </button>
                        </div>
                        ` : ''}
                    </div>

                    <!-- System Stats -->
                    <div class="mt-4 pt-4 border-t border-white/10">
                        <div class="text-xs text-white/50 font-mono space-y-1">
                            <div class="flex justify-between">
                                <span>CPU Usage:</span>
                                <span id="cpu-usage">--%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Memory:</span>
                                <span id="mem-usage">-- MB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>FPS:</span>
                                <span id="fps-counter">60</span>
                            </div>
                        </div>
                    </div>

                    <!-- Reset Button -->
                    <div class="mt-4">
                        <button id="reset-settings" class="w-full px-3 py-1 bg-white/10 text-white/70 text-xs font-mono rounded hover:bg-white/20 transition-colors">
                            Reset to Defaults
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insert HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = toggleHTML;
        this.container.appendChild(tempDiv.firstElementChild);

        // Get references
        this.toggleBtn = document.getElementById('viz-toggle-btn');
        this.panelElement = document.getElementById('viz-panel');
        this.featureToggles = document.querySelectorAll('.viz-toggle-feature');
    }

    setupEventListeners() {
        // Toggle panel
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePanel();
        });

        // Feature toggles
        this.featureToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const feature = toggle.dataset.feature;
                this.toggleFeature(feature);
            });
        });

        // Terminal toggle
        const terminalToggle = document.getElementById('terminal-toggle');
        if (terminalToggle) {
            terminalToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTerminal();
            });
        }

        // Reset settings
        const resetBtn = document.getElementById('reset-settings');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.resetSettings();
            });
        }

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.panelElement.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                this.closePanel();
            }
        });

        // Update system stats
        this.startStatsMonitoring();
    }

    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        this.panelElement.classList.remove('hidden');
        this.panelElement.style.opacity = '0';
        this.panelElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            this.panelElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.panelElement.style.opacity = '1';
            this.panelElement.style.transform = 'translateY(0)';
        }, 10);

        this.isOpen = true;
        this.toggleBtn.querySelector('.material-symbols-outlined').textContent = 'close';
    }

    closePanel() {
        this.panelElement.style.opacity = '0';
        this.panelElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            this.panelElement.classList.add('hidden');
        }, 300);

        this.isOpen = false;
        this.toggleBtn.querySelector('.material-symbols-outlined').textContent = 'tune';
    }

    toggleFeature(feature) {
        this.featureStates[feature] = !this.featureStates[feature];
        localStorage.setItem(feature, this.featureStates[feature]);

        // Update UI
        this.updateFeatureToggle(feature);

        // Apply feature change
        this.applyFeatureChange(feature, this.featureStates[feature]);

        // Dispatch event
        window.dispatchEvent(new CustomEvent('visualizerFeatureChange', {
            detail: { feature, enabled: this.featureStates[feature] }
        }));
    }

    updateFeatureToggle(feature) {
        const toggle = document.querySelector(`[data-feature="${feature}"]`);
        if (!toggle) return;

        const slider = toggle.querySelector('.viz-toggle-slider');
        const isEnabled = this.featureStates[feature];

        if (isEnabled) {
            toggle.classList.add('bg-primary/30');
            toggle.classList.remove('bg-white/10');
            slider.style.transform = 'translateX(20px)';
        } else {
            toggle.classList.remove('bg-primary/30');
            toggle.classList.add('bg-white/10');
            slider.style.transform = 'translateX(0)';
        }
    }

    applyFeatureChange(feature, enabled) {
        switch (feature) {
            case 'quantumGrid':
                if (window.quantumGrid) {
                    window.quantumGrid.toggle(enabled);
                }
                break;

            case 'audioPlayer':
                if (window.audioPlayer) {
                    if (enabled && !window.audioPlayer.isPlaying) {
                        window.audioPlayer.play();
                    } else if (!enabled && window.audioPlayer.isPlaying) {
                        window.audioPlayer.stop();
                    }
                }
                break;

            case 'customCursor':
                if (window.customCursor) {
                    window.customCursor.toggle(enabled);
                }
                break;

            case 'animations':
                document.body.classList.toggle('no-animations', !enabled);
                break;

            case 'effects':
                document.body.classList.toggle('no-effects', !enabled);
                break;
        }
    }

    toggleTerminal() {
        if (window.terminal) {
            window.terminal.toggle();
        }
    }

    loadSettings() {
        // Apply saved settings
        Object.keys(this.featureStates).forEach(feature => {
            this.updateFeatureToggle(feature);
            this.applyFeatureChange(feature, this.featureStates[feature]);
        });
    }

    resetSettings() {
        // Reset to defaults
        Object.keys(this.featureStates).forEach(feature => {
            this.featureStates[feature] = true;
            localStorage.removeItem(feature);
            this.updateFeatureToggle(feature);
            this.applyFeatureChange(feature, true);
        });

        // Show feedback
        const resetBtn = document.getElementById('reset-settings');
        if (resetBtn) {
            const originalText = resetBtn.textContent;
            resetBtn.textContent = 'Reset Complete!';
            resetBtn.classList.add('bg-primary/20', 'text-primary');

            setTimeout(() => {
                resetBtn.textContent = originalText;
                resetBtn.classList.remove('bg-primary/20', 'text-primary');
            }, 2000);
        }
    }

    startStatsMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();

        const updateStats = () => {
            // FPS calculation
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - lastTime >= 1000) {
                const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
                const fpsElement = document.getElementById('fps-counter');
                if (fpsElement) {
                    fpsElement.textContent = fps;
                }
                frameCount = 0;
                lastTime = currentTime;
            }

            // Memory usage (if available)
            if (performance.memory) {
                const memUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
                const memElement = document.getElementById('mem-usage');
                if (memElement) {
                    memElement.textContent = `${memUsage} MB`;
                }
            }

            requestAnimationFrame(updateStats);
        };

        updateStats();
    }

    destroy() {
        if (this.container && this.container.querySelector('.visualizer-toggle')) {
            this.container.removeChild(this.container.querySelector('.visualizer-toggle'));
        }
    }
}

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
    const visualizerToggles = document.querySelectorAll('[data-visualizer-toggle]');
    visualizerToggles.forEach(container => {
        const options = container.dataset.visualizerToggle ?
            JSON.parse(container.dataset.visualizerToggle) : {};
        new VisualizerToggle(container, options);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisualizerToggle;
}