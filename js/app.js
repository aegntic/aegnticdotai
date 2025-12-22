// Aegntic.ai - Parallax Infinite Scroll Application
// Modern single-page site with advanced parallax effects

class AegnticParallaxApp {
    constructor() {
        this.isDark = true;
        this.currentSection = 'hero';
        this.sections = ['hero', 'about', 'research', 'projects', 'colabs'];
        this.scrollRevealElements = [];
        this.parallaxElements = [];

        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollReveal();
        this.setupParallaxEffects();
        this.setupSmoothScrolling();
        this.updateActiveNavigation();
    }

    setupTheme() {
        // Check saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
            this.isDark = false;
            document.documentElement.classList.remove('dark');
        } else {
            this.isDark = true;
            document.documentElement.classList.add('dark');
        }

        // Theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            this.updateThemeIcons();
        }
    }

    toggleTheme() {
        this.isDark = !this.isDark;

        if (this.isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        this.updateThemeIcons();
    }

    updateThemeIcons() {
        const themeIconDark = document.getElementById('theme-icon-dark');
        const themeIconLight = document.getElementById('theme-icon-light');

        if (themeIconDark && themeIconLight) {
            if (this.isDark) {
                themeIconDark.classList.remove('hidden');
                themeIconLight.classList.add('hidden');
            } else {
                themeIconDark.classList.add('hidden');
                themeIconLight.classList.remove('hidden');
            }
        }
    }

    setupNavigation() {
        // Handle navigation clicks with smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                this.scrollToSection(targetId);
            });
        });

        // Update active nav state on scroll
        window.addEventListener('scroll', () => this.updateActiveNavigation());
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                const isOpen = !mobileMenu.classList.contains('hidden');

                if (isOpen) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                } else {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('flex');
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        }
    }

    setupScrollReveal() {
        // Get all scroll-reveal elements
        this.scrollRevealElements = document.querySelectorAll('.scroll-reveal');

        // Initial check for elements in viewport
        this.checkScrollReveal();

        // Check on scroll
        window.addEventListener('scroll', () => this.checkScrollReveal());
    }

    checkScrollReveal() {
        this.scrollRevealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

            if (isVisible && !element.classList.contains('revealed')) {
                element.classList.add('revealed');
            }
        });
    }

    setupParallaxEffects() {
        // Get parallax elements
        this.parallaxElements = [
            {
                element: document.querySelector('.bg-tech-grid'),
                speed: 0.1
            },
            {
                element: document.querySelector('.animate-drift'),
                speed: 0.15
            }
        ].filter(item => item.element);

        // Apply parallax on scroll
        window.addEventListener('scroll', () => this.applyParallax());
    }

    applyParallax() {
        const scrollY = window.scrollY;

        this.parallaxElements.forEach(({ element, speed }) => {
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Apply parallax to hero section elements
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const heroElements = heroSection.querySelectorAll('.glow-line');
            heroElements.forEach((element, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = scrollY * speed;
                element.style.transform = `translateX(-50%) translateY(${yPos}px) scaleX(1.5)`;
            });
        }
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                // Add entrance animations to sections
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.8s ease-out, transform 0.6s ease-out';
            }
        });

        // Reveal sections as they come into view
        setTimeout(() => {
            this.checkScrollReveal();
        }, 100);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = 80; // Account for fixed navbar
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update current section
            this.currentSection = sectionId;
            this.updateActiveNavigation();
        }
    }

    updateActiveNavigation() {
        const scrollPosition = window.scrollY + 150;

        // Find current section based on scroll position
        let currentSection = 'hero';
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const { top, bottom } = section.getBoundingClientRect();
                const sectionTop = top + window.scrollY;
                const sectionBottom = bottom + window.scrollY;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });

        this.currentSection = currentSection;

        // Update navigation active states
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.remove('text-gray-400');
                link.classList.add('text-white');
            } else {
                link.classList.remove('text-white');
                link.classList.add('text-gray-400');
            }
        });
    }

    // Mobile menu close function
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
    }

    // Public method for global access
    scrollToSectionPublic(sectionId) {
        this.scrollToSection(sectionId);
    }

    closeMobileMenuPublic() {
        this.closeMobileMenu();
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AegnticParallaxApp();

    // Global functions for onclick handlers
    window.scrollToSection = (sectionId) => {
        if (window.app) {
            window.app.scrollToSectionPublic(sectionId);
        }
    };

    window.closeMobileMenu = () => {
        if (window.app) {
            window.app.closeMobileMenuPublic();
        }
    };

    // Add loading complete animation
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in';
    }, 100);
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for module compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AegnticParallaxApp;
}