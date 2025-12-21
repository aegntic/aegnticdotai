/**
 * PreLoader - Animated preloader with progress tracking
 * Creates a futuristic loading screen with system boot sequence
 */
class PreLoader {
    constructor(options = {}) {
        // Default options
        this.options = {
            minLoadTime: 2000,
            maxLoadTime: 5000,
            bootMessages: [
                'Initializing AE Foundation OS...',
                'Loading core modules...',
                'Establishing secure connection...',
                'Calibrating neural interfaces...',
                'Synchronizing quantum states...',
                'Optimizing performance metrics...',
                'System ready.'
            ],
            ...options
        };

        this.loaderElement = null;
        this.progressElement = null;
        this.messageElement = null;
        this.startTime = null;
        this.currentProgress = 0;
        this.isActive = false;

        this.init();
    }

    init() {
        this.createLoader();
        this.startTime = Date.now();
        this.isActive = true;
        this.startLoadingSequence();
    }

    createLoader() {
        const loaderHTML = `
            <div class="preloader fixed inset-0 z-[9999] bg-dark-bg flex items-center justify-center">
                <div class="relative max-w-2xl w-full mx-auto px-8">
                    <!-- Logo -->
                    <div class="text-center mb-12">
                        <div class="text-6xl font-bold text-white mb-4 leading-[0.85] tracking-tighter">
                            <span class="text-liquid-glass" data-text="ae.">ae.</span>
                        </div>
                        <div class="text-primary font-mono text-sm uppercase tracking-[0.3em]">Foundation OS</div>
                    </div>

                    <!-- Loading Animation -->
                    <div class="relative h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                        <div id="preloader-progress" class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out" style="width: 0%"></div>
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>

                    <!-- Boot Messages -->
                    <div class="space-y-2 font-mono text-xs">
                        <div class="flex items-center gap-2">
                            <span class="text-primary">&gt;</span>
                            <span id="preloader-message" class="text-green-400">Initializing system...</span>
                        </div>
                        <div class="text-white/30">
                            <span class="inline-block w-16">CPU:</span>
                            <span id="cpu-status" class="text-green-400">Initializing</span>
                        </div>
                        <div class="text-white/30">
                            <span class="inline-block w-16">MEM:</span>
                            <span id="mem-status" class="text-green-400">Checking</span>
                        </div>
                        <div class="text-white/30">
                            <span class="inline-block w-16">NET:</span>
                            <span id="net-status" class="text-green-400">Offline</span>
                        </div>
                    </div>

                    <!-- Visual Effects -->
                    <div class="absolute inset-0 pointer-events-none">
                        <div class="loading-orbit absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2">
                            <div class="absolute inset-0 border border-primary/10 rounded-full animate-spin-slow"></div>
                            <div class="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = loaderHTML;
        document.body.appendChild(tempDiv.firstElementChild);

        // Get references
        this.loaderElement = document.querySelector('.preloader');
        this.progressElement = document.getElementById('preloader-progress');
        this.messageElement = document.getElementById('preloader-message');
        this.cpuStatus = document.getElementById('cpu-status');
        this.memStatus = document.getElementById('mem-status');
        this.netStatus = document.getElementById('net-status');

        // Add shimmer animation
        const shimmerStyle = document.createElement('style');
        shimmerStyle.textContent = `
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-shimmer {
                animation: shimmer 2s infinite;
            }
            .animate-spin-slow {
                animation: spin-slow 4s linear infinite;
            }
        `;
        document.head.appendChild(shimmerStyle);
    }

    async startLoadingSequence() {
        const messages = this.options.bootMessages;
        const messageDelay = this.options.minLoadTime / messages.length;

        // Display boot messages
        for (let i = 0; i < messages.length; i++) {
            await this.displayMessage(messages[i], messageDelay);
            this.updateProgress((i + 1) / messages.length * 80);
        }

        // Update system statuses
        this.cpuStatus.textContent = 'Operational';
        this.cpuStatus.className = 'text-green-400';

        this.memStatus.textContent = `${Math.floor(Math.random() * 32 + 16)}GB Available`;
        this.memStatus.className = 'text-green-400';

        this.netStatus.textContent = 'Connected';
        this.netStatus.className = 'text-green-400';

        // Simulate final loading
        await this.simulateFinalLoad();

        // Complete loading
        this.complete();
    }

    displayMessage(message, delay) {
        return new Promise(resolve => {
            this.messageElement.style.opacity = '0';

            setTimeout(() => {
                this.messageElement.textContent = message;
                this.messageElement.style.opacity = '1';
                this.messageElement.style.transition = 'opacity 0.3s ease';
                resolve();
            }, 150);
        });
    }

    updateProgress(percent) {
        this.currentProgress = Math.min(100, percent);
        this.progressElement.style.width = `${this.currentProgress}%`;
    }

    simulateFinalLoad() {
        return new Promise(resolve => {
            const targetProgress = 100;
            const startProgress = this.currentProgress;
            const duration = this.options.maxLoadTime - (Date.now() - this.startTime);
            const startTime = Date.now();

            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progress = startProgress + (targetProgress - startProgress) * (elapsed / duration);

                if (progress < targetProgress && elapsed < duration) {
                    this.updateProgress(progress);
                    requestAnimationFrame(updateProgress);
                } else {
                    this.updateProgress(targetProgress);
                    resolve();
                }
            };

            updateProgress();
        });
    }

    complete() {
        // Ensure minimum load time
        const elapsed = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.options.minLoadTime - elapsed);

        setTimeout(() => {
            // Fade out effect
            this.loaderElement.style.transition = 'opacity 0.5s ease';
            this.loaderElement.style.opacity = '0';

            setTimeout(() => {
                this.destroy();
                // Dispatch completion event
                window.dispatchEvent(new CustomEvent('preloaderComplete'));
            }, 500);
        }, remainingTime);
    }

    destroy() {
        this.isActive = false;
        if (this.loaderElement && this.loaderElement.parentNode) {
            this.loaderElement.parentNode.removeChild(this.loaderElement);
        }
    }
}

// Auto-initialize if preloader is enabled
document.addEventListener('DOMContentLoaded', () => {
    // Check if preloader should be shown
    const showPreloader = !localStorage.getItem('preloaderShown') ||
                         localStorage.getItem('skipPreloader') !== 'true';

    if (showPreloader) {
        // Mark preloader as shown
        localStorage.setItem('preloaderShown', 'true');

        // Create and show preloader
        window.preloader = new PreLoader();

        // Listen for completion
        window.addEventListener('preloaderComplete', () => {
            console.log('Preloader complete - System ready');
        });
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PreLoader;
}