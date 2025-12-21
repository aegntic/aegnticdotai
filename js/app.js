/**
 * Aegntic AI Foundation Website
 * Main Application JavaScript
 */

class AegnticSite {
    constructor() {
        this.currentPage = 'about';
        this.isMobileMenuOpen = false;
        this.teamMembers = [];
        this.currentTeamIndex = 0;
        this.quantumGrid = null;
        this.audioPlayer = null;
        this.terminal = null;
        this.visualizerToggle = null;
        this.pageManager = null;

        this.init();
    }

    init() {
        this.loadComponents();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupTeamCarousel();
        this.setupInteractions();
        this.setupAnimations();
        this.setupAccessibility();
        this.initializeVisualComponents();
        this.initializePageManager();
    }

    /**
     * Load HTML components
     */
    async loadComponents() {
        try {
            const navigationResponse = await fetch('components/navigation.html');
            const navigationHtml = await navigationResponse.text();
            document.getElementById('navigation').innerHTML = navigationHtml;

            const footerResponse = await fetch('components/footer.html');
            const footerHtml = await footerResponse.text();
            document.getElementById('footer').innerHTML = footerHtml;
        } catch (error) {
            console.error('Failed to load components:', error);
        }
    }

    /**
     * Setup desktop navigation
     */
    setupNavigation() {
        // Desktop navigation items
        document.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                const page = navItem.dataset.page;
                this.navigateToPage(page);
            }
        });

        // Footer navigation links
        document.addEventListener('click', (e) => {
            const footerLink = e.target.closest('.footer-link');
            if (footerLink && footerLink.dataset.page) {
                e.preventDefault();
                this.navigateToPage(footerLink.dataset.page);
            }
        });
    }

    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close mobile menu when clicking on navigation items
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const page = e.target.dataset.page;
                    this.navigateToPage(page);
                    this.closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen &&
                    !mobileMenu.contains(e.target) &&
                    !mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    /**
     * Setup team member carousel
     */
    setupTeamCarousel() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const teamCards = document.querySelectorAll('.team-card');

        if (teamCards.length > 0) {
            this.teamMembers = Array.from(teamCards);

            navButtons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    if (index === 0) {
                        this.navigateTeam(-1); // Previous
                    } else {
                        this.navigateTeam(1); // Next
                    }
                });
            });

            // Auto-rotate team members
            setInterval(() => {
                if (document.visibilityState === 'visible') {
                    this.navigateTeam(1);
                }
            }, 5000);
        }
    }

    /**
     * Setup interactive elements
     */
    setupInteractions() {
        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }

        // Legal links
        const privacyPolicy = document.getElementById('privacy-policy');
        const termsService = document.getElementById('terms-service');

        if (privacyPolicy) {
            privacyPolicy.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalModal('privacy');
            });
        }

        if (termsService) {
            termsService.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalModal('terms');
            });
        }

        // Add hover effects to interactive elements
        this.setupHoverEffects();
    }

    /**
     * Setup scroll animations
     */
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.holo-card, .team-card').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Initialize page manager
     */
    initializePageManager() {
        if (typeof PageManager !== 'undefined') {
            this.pageManager = new PageManager(this);
        }
    }

    /**
     * Reinitialize components after page change
     */
    reinitializeComponents() {
        // Re-setup team carousel if present
        this.setupTeamCarousel();

        // Re-setup animations for new content
        this.setupAnimations();

        // Re-setup hover effects
        this.setupHoverEffects();

        // Initialize component gallery if on components page
        if (this.currentPage === 'components') {
            this.initializeComponentGallery();
        }
    }

    /**
     * Initialize component gallery
     */
    initializeComponentGallery() {
        // Only initialize if not already initialized
        if (!window.componentGallery) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                if (typeof ComponentGallery !== 'undefined') {
                    window.componentGallery = new ComponentGallery();
                }
            }, 100);
        }
    }

    /**
     * Initialize visual components
     */
    initializeVisualComponents() {
        // Initialize Quantum Grid
        if (typeof QuantumGrid !== 'undefined') {
            this.quantumGrid = new QuantumGrid(document.body);
            window.quantumGrid = this.quantumGrid;
        }

        // Initialize Audio Player
        if (typeof AudioPlayer !== 'undefined') {
            this.audioPlayer = new AudioPlayer(document.body);
            window.audioPlayer = this.audioPlayer;
        }

        // Initialize Terminal
        if (typeof Terminal !== 'undefined') {
            this.terminal = new Terminal(document.body);
            window.terminal = this.terminal;
        }

        // Initialize Visualizer Toggle
        if (typeof VisualizerToggle !== 'undefined') {
            this.visualizerToggle = new VisualizerToggle(document.body);
            window.visualizerToggle = this.visualizerToggle;
        }

        // Listen for visualizer feature changes
        window.addEventListener('visualizerFeatureChange', (e) => {
            this.handleVisualizerChange(e.detail.feature, e.detail.enabled);
        });
    }

    /**
     * Handle visualizer feature changes
     */
    handleVisualizerChange(feature, enabled) {
        console.log(`Feature ${feature} is now ${enabled ? 'enabled' : 'disabled'}`);
        this.announce(`Visual effect ${feature} ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }

            if (e.key === 'Tab') {
                // Ensure focus stays within modal when open
                if (this.isMobileMenuOpen) {
                    const focusableElements = document.querySelectorAll('#mobile-menu button, #mobile-menu a');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });

        // Announce page changes to screen readers
        this.setupScreenReaderAnnouncements();
    }

    /**
     * Navigate to different pages
     */
    navigateToPage(page) {
        if (page === this.currentPage) return;

        // Update active states
        this.updateNavigationStates(page);

        // Use PageManager if available
        if (this.pageManager) {
            this.pageManager.loadPageContent(page);
        } else {
            // Fallback transition
            this.transitionToPage(page);
        }

        this.currentPage = page;

        // Update URL
        history.pushState({ page }, '', `#${page}`);
    }

    /**
     * Update navigation active states
     */
    updateNavigationStates(page) {
        // Update desktop navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.page === page) {
                item.classList.add('active');
                item.querySelector('.nav-item-dot')?.classList.remove('nav-item-dot');
                const orb = document.createElement('div');
                orb.className = 'nav-orb';
                item.querySelector('.nav-item-dot')?.replaceWith(orb);
            } else {
                item.classList.remove('active');
                item.querySelector('.nav-orb')?.classList.remove('nav-orb');
                const dot = document.createElement('div');
                dot.className = 'nav-item-dot';
                item.querySelector('.nav-orb')?.replaceWith(dot);
            }
        });

        // Update mobile navigation
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            if (item.dataset.page === page) {
                item.classList.add('text-primary');
                item.classList.remove('text-white/70');
            } else {
                item.classList.remove('text-primary');
                item.classList.add('text-white/70');
            }
        });
    }

    /**
     * Team carousel navigation
     */
    navigateTeam(direction) {
        if (this.teamMembers.length === 0) return;

        // Hide current team member
        this.teamMembers[this.currentTeamIndex].style.display = 'none';

        // Update index
        this.currentTeamIndex = (this.currentTeamIndex + direction + this.teamMembers.length) % this.teamMembers.length;

        // Show new team member
        this.teamMembers[this.currentTeamIndex].style.display = 'block';

        // Add animation
        this.teamMembers[this.currentTeamIndex].classList.add('animate-in');
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');

        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.add('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'close';
            document.body.style.overflow = 'hidden';
            this.isMobileMenuOpen = true;
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');

        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
            document.body.style.overflow = '';
            this.isMobileMenuOpen = false;
        }
    }

    /**
     * Show settings modal
     */
    showSettings() {
        this.showModal('settings', 'Settings', this.getSettingsContent());
    }

    /**
     * Show legal modal
     */
    showLegalModal(type) {
        const content = type === 'privacy' ? this.getPrivacyPolicyContent() : this.getTermsContent();
        const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
        this.showModal(type, title, content);
    }

    /**
     * Generic modal display
     */
    showModal(type, title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="holo-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                <div class="p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-white">${title}</h2>
                        <button class="modal-close text-white/50 hover:text-white transition-colors">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div class="text-gray-300 text-sm leading-relaxed">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal close
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    /**
     * Get settings content
     */
    getSettingsContent() {
        return `
            <div class="space-y-6">
                <div>
                    <h3 class="text-lg font-semibold text-white mb-3">Theme</h3>
                    <div class="flex gap-4">
                        <button class="btn btn-primary" onclick="site.setTheme('dark')">Dark Mode</button>
                        <button class="btn" onclick="site.setTheme('light')">Light Mode</button>
                    </div>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-white mb-3">Animations</h3>
                    <label class="flex items-center gap-3 text-sm">
                        <input type="checkbox" checked onchange="site.toggleAnimations(this.checked)">
                        <span>Enable animations</span>
                    </label>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-white mb-3">Performance</h3>
                    <label class="flex items-center gap-3 text-sm">
                        <input type="checkbox" checked onchange="site.toggleEffects(this.checked)">
                        <span>Enable visual effects</span>
                    </label>
                </div>
            </div>
        `;
    }

    /**
     * Get privacy policy content
     */
    getPrivacyPolicyContent() {
        return `
            <div class="space-y-4">
                <p><strong>Last updated:</strong> December 2024</p>
                <p>AE Foundation is committed to protecting your privacy and ensuring the security of your personal information.</p>
                <h3 class="text-lg font-semibold text-white mt-4">Information We Collect</h3>
                <p>We collect minimal information necessary to provide our services and improve our research.</p>
                <h3 class="text-lg font-semibold text-white mt-4">How We Use Your Information</h3>
                <p>Your information is used solely for research purposes and to enhance our foundation's services.</p>
                <h3 class="text-lg font-semibold text-white mt-4">Data Protection</h3>
                <p>We implement appropriate security measures to protect your personal information.</p>
                <p><em>This is a placeholder privacy policy. Please consult our full legal documentation for detailed information.</em></p>
            </div>
        `;
    }

    /**
     * Get terms of service content
     */
    getTermsContent() {
        return `
            <div class="space-y-4">
                <p><strong>Last updated:</strong> December 2024</p>
                <p>By using AE Foundation's services, you agree to these terms of service.</p>
                <h3 class="text-lg font-semibold text-white mt-4">Service Usage</h3>
                <p>Our services are provided for research and educational purposes.</p>
                <h3 class="text-lg font-semibold text-white mt-4">Intellectual Property</h3>
                <p>All content and research materials remain the property of AE Foundation.</p>
                <h3 class="text-lg font-semibold text-white mt-4">Limitation of Liability</h3>
                <p>AE Foundation is not liable for any damages arising from the use of our services.</p>
                <p><em>This is a placeholder terms of service. Please consult our full legal documentation for detailed information.</em></p>
            </div>
        `;
    }

    /**
     * Setup hover effects
     */
    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.holo-card, .team-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });

            card.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });
    }

    /**
     * Add hover effect to element
     */
    addHoverEffect(element) {
        element.style.transform = 'translateY(-2px)';
        element.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.2)';
    }

    /**
     * Remove hover effect from element
     */
    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    /**
     * Setup screen reader announcements
     */
    setupScreenReaderAnnouncements() {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.position = 'absolute';
        announcer.style.left = '-10000px';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.overflow = 'hidden';
        document.body.appendChild(announcer);

        this.announcer = announcer;
    }

    /**
     * Announce to screen readers
     */
    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    }

    /**
     * Theme setter
     */
    setTheme(theme) {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
        this.announce(`Theme changed to ${theme} mode`);
    }

    /**
     * Toggle animations
     */
    toggleAnimations(enabled) {
        if (enabled) {
            document.body.classList.remove('no-animations');
        } else {
            document.body.classList.add('no-animations');
        }
        localStorage.setItem('animations', enabled);
    }

    /**
     * Toggle visual effects
     */
    toggleEffects(enabled) {
        if (enabled) {
            document.body.classList.remove('no-effects');
        } else {
            document.body.classList.add('no-effects');
        }
        localStorage.setItem('effects', enabled);
    }

    /**
     * Page transition effect
     */
    transitionToPage(page) {
        const mainContent = document.querySelector('main, .lg\\:pl-24');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';

            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                this.announce(`Navigated to ${page} page`);
            }, 300);
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.site = new AegnticSite();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            window.site.navigateToPage(e.state.page);
        }
    });

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedAnimations = localStorage.getItem('animations') !== 'false';
    const savedEffects = localStorage.getItem('effects') !== 'false';

    if (window.site) {
        window.site.setTheme(savedTheme);
        window.site.toggleAnimations(savedAnimations);
        window.site.toggleEffects(savedEffects);
    }
});

// Add CSS for no-animations and no-effects classes
const noAnimationsCSS = `
.no-animations * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}
.no-effects .arch-grid,
.no-effects .bg-radial-fade,
.no-effects .holo-projection::before {
    display: none !important;
}
`;

const style = document.createElement('style');
style.textContent = noAnimationsCSS;
document.head.appendChild(style);