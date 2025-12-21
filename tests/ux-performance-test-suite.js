/**
 * Comprehensive UX & Performance Test Suite for Aegntic.ai Foundation
 * Advanced testing for user experience, performance, accessibility, and responsive design
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class UXPerformanceTestSuite {
    constructor() {
        this.testResults = {
            userExperience: { passed: 0, failed: 0, warnings: [], errors: [] },
            performance: { passed: 0, failed: 0, warnings: [], errors: [], metrics: {} },
            accessibility: { passed: 0, failed: 0, warnings: [], errors: [] },
            responsive: { passed: 0, failed: 0, warnings: [], errors: [] },
            crossBrowser: { passed: 0, failed: 0, warnings: [], errors: [] },
            failureScenarios: { passed: 0, failed: 0, warnings: [], errors: [] }
        };
        this.projectRoot = __dirname + '/..';
        this.severityLevels = {
            CRITICAL: '🔴',
            HIGH: '🟠',
            MEDIUM: '🟡',
            LOW: '🟢'
        };
    }

    async runAllTests() {
        console.log('🚀 Starting Advanced UX & Performance Test Suite for Aegntic.ai Foundation...\n');

        console.log('👥 Testing User Experience...');
        await this.testUserExperience();

        console.log('\n⚡ Testing Performance...');
        await this.testPerformance();

        console.log('\n♿ Testing Advanced Accessibility...');
        await this.testAdvancedAccessibility();

        console.log('\n📱 Testing Responsive Design...');
        await this.testResponsiveDesign();

        console.log('\n🌐 Testing Cross-browser Compatibility...');
        await this.testCrossBrowserCompatibility();

        console.log('\n💥 Testing Failure Scenarios...');
        await this.testFailureScenarios();

        this.generateComprehensiveReport();
    }

    /**
     * USER EXPERIENCE TESTING
     */
    async testUserExperience() {
        try {
            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const document = dom.window.document;
            const appContent = fs.readFileSync(path.join(this.projectRoot, 'js/app.js'), 'utf8');
            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Test Navigation Usability
            console.log('  🔍 Testing Navigation Usability...');

            // Desktop navigation visibility
            const desktopNav = document.querySelector('.fixed.left-0.top-0.bottom-0');
            if (desktopNav) {
                this.testResults.userExperience.passed++;
                console.log('    ✓ Desktop navigation present and positioned correctly');
            } else {
                this.testResults.userExperience.failed++;
                this.testResults.userExperience.errors.push({
                    issue: 'Desktop navigation not found or improperly positioned',
                    severity: 'CRITICAL',
                    recommendation: 'Ensure desktop navigation uses fixed positioning on the left side'
                });
            }

            // Mobile navigation trigger
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            if (mobileMenuBtn) {
                this.testResults.userExperience.passed++;
                console.log('    ✓ Mobile menu button present');

                // Test touch target size (minimum 44px)
                const styles = this.getComputedStyles(mobileMenuBtn, cssContent);
                if (styles.width && parseInt(styles.width) >= 44 && styles.height && parseInt(styles.height) >= 44) {
                    this.testResults.userExperience.passed++;
                    console.log('    ✓ Mobile menu button meets touch target size requirements');
                } else {
                    this.testResults.userExperience.failed++;
                    this.testResults.userExperience.errors.push({
                        issue: 'Mobile menu button too small for touch interaction',
                        severity: 'HIGH',
                        recommendation: 'Increase touch target size to minimum 44x44px'
                    });
                }
            } else {
                this.testResults.userExperience.failed++;
                this.testResults.userExperience.errors.push({
                    issue: 'Mobile menu button not found',
                    severity: 'CRITICAL',
                    recommendation: 'Add mobile menu button with proper touch target size'
                });
            }

            // Test Visual Hierarchy and Readability
            console.log('  🔍 Testing Visual Hierarchy...');

            // Main heading presence and hierarchy
            const h1 = document.querySelector('h1');
            if (h1) {
                this.testResults.userExperience.passed++;

                // Check heading text contrast (simplified check for dark theme)
                const headingStyles = this.getComputedStyles(h1, cssContent);
                if (headingStyles.color && (headingStyles.color.includes('255') || headingStyles.color === 'white')) {
                    this.testResults.userExperience.passed++;
                    console.log('    ✓ Main heading has appropriate color for dark theme');
                } else {
                    this.testResults.userExperience.warnings.push({
                        issue: 'Main heading may have insufficient contrast',
                        severity: 'MEDIUM',
                        recommendation: 'Ensure heading colors provide sufficient contrast on dark background'
                    });
                }
            } else {
                this.testResults.userExperience.failed++;
                this.testResults.userExperience.errors.push({
                    issue: 'No main heading (h1) found on page',
                    severity: 'HIGH',
                    recommendation: 'Add descriptive h1 heading for page context'
                });
            }

            // Test Interactive Feedback
            console.log('  🔍 Testing Interactive Feedback...');

            // Hover effects for interactive elements
            const interactiveElements = document.querySelectorAll('button, a, .nav-item, .team-card');
            let hasHoverEffects = 0;

            interactiveElements.forEach(el => {
                const elStyles = this.getComputedStyles(el, cssContent);
                if (elStyles.transition && elStyles.transition.includes('transform')) {
                    hasHoverEffects++;
                }
            });

            if (hasHoverEffects > 0) {
                this.testResults.userExperience.passed++;
                console.log(`    ✓ Interactive elements have hover effects (${hasHoverEffects} elements)`);
            } else {
                this.testResults.userExperience.warnings.push({
                    issue: 'Limited hover feedback on interactive elements',
                    severity: 'MEDIUM',
                    recommendation: 'Add hover effects to improve user feedback'
                });
            }

            // Test Button States
            console.log('  🔍 Testing Button States...');

            const buttons = document.querySelectorAll('button');
            let hasProperButtonStyling = 0;

            buttons.forEach(button => {
                const btnStyles = this.getComputedStyles(button, cssContent);
                if (btnStyles.cursor && btnStyles.cursor === 'pointer') {
                    hasProperButtonStyling++;
                }
            });

            if (hasProperButtonStyling === buttons.length) {
                this.testResults.userExperience.passed++;
                console.log('    ✓ All buttons have proper cursor styling');
            } else {
                this.testResults.userExperience.warnings.push({
                    issue: 'Some buttons lack proper cursor styling',
                    severity: 'LOW',
                    recommendation: 'Add cursor: pointer to all interactive button elements'
                });
            }

            // Test Loading States
            console.log('  🔍 Testing Loading States...');

            if (cssContent.includes('.loading') || cssContent.includes('.preloader')) {
                this.testResults.userExperience.passed++;
                console.log('    ✓ Loading states implemented');

                // Check for loading animations
                if (cssContent.includes('@keyframes') && cssContent.includes('loading')) {
                    this.testResults.userExperience.passed++;
                    console.log('    ✓ Loading animations present');
                } else {
                    this.testResults.userExperience.warnings.push({
                        issue: 'Loading states lack visual feedback animations',
                        severity: 'MEDIUM',
                        recommendation: 'Add loading animations for better user feedback'
                    });
                }
            } else {
                this.testResults.userExperience.warnings.push({
                    issue: 'No loading states found',
                    severity: 'MEDIUM',
                    recommendation: 'Implement loading states for async operations'
                });
            }

        } catch (error) {
            this.testResults.userExperience.failed++;
            this.testResults.userExperience.errors.push({
                issue: `UX test execution error: ${error.message}`,
                severity: 'CRITICAL',
                recommendation: 'Review test suite and implementation'
            });
        }
    }

    /**
     * PERFORMANCE TESTING
     */
    async testPerformance() {
        try {
            console.log('  🔍 Analyzing Resource Loading...');

            // Test external dependencies
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const externalResources = [];

            // Count external CSS/JS resources
            const cssMatches = indexContent.match(/<link[^>]*href=["'][^"']*\/\/[^"']*["'][^>]*>/g) || [];
            const jsMatches = indexContent.match(/<script[^>]*src=["'][^"']*\/\/[^"']*["'][^>]*>/g) || [];

            externalResources.push(...cssMatches, ...jsMatches);

            this.testResults.performance.metrics.externalResources = externalResources.length;

            if (externalResources.length <= 3) {
                this.testResults.performance.passed++;
                console.log(`    ✓ Limited external dependencies (${externalResources.length} resources)`);
            } else {
                this.testResults.performance.warnings.push({
                    issue: `High number of external dependencies (${externalResources.length})`,
                    severity: 'MEDIUM',
                    recommendation: 'Consider self-hosting critical resources or reducing dependencies'
                });
            }

            // Test CSS optimization
            console.log('  🔍 Testing CSS Optimization...');

            const cssFiles = ['css/styles.css', 'css/components.css'];
            let totalCSSSize = 0;

            cssFiles.forEach(cssFile => {
                try {
                    const cssPath = path.join(this.projectRoot, cssFile);
                    if (fs.existsSync(cssPath)) {
                        const stats = fs.statSync(cssPath);
                        totalCSSSize += stats.size;
                    }
                } catch (e) {
                    console.log(`    ⚠ Could not analyze ${cssFile}`);
                }
            });

            this.testResults.performance.metrics.totalCSSSize = totalCSSSize;

            if (totalCSSSize < 50000) { // < 50KB
                this.testResults.performance.passed++;
                console.log(`    ✓ CSS size optimized (${(totalCSSSize/1024).toFixed(1)}KB)`);
            } else {
                this.testResults.performance.warnings.push({
                    issue: `Large CSS size (${(totalCSSSize/1024).toFixed(1)}KB)`,
                    severity: 'LOW',
                    recommendation: 'Consider CSS minification and unused CSS removal'
                });
            }

            // Test JavaScript optimization
            console.log('  🔍 Testing JavaScript Optimization...');

            try {
                const jsPath = path.join(this.projectRoot, 'js/app.js');
                const jsStats = fs.statSync(jsPath);
                this.testResults.performance.metrics.mainJSSize = jsStats.size;

                if (jsStats.size < 100000) { // < 100KB
                    this.testResults.performance.passed++;
                    console.log(`    ✓ Main JavaScript size optimized (${(jsStats.size/1024).toFixed(1)}KB)`);
                } else {
                    this.testResults.performance.warnings.push({
                        issue: `Large JavaScript file (${(jsStats.size/1024).toFixed(1)}KB)`,
                        severity: 'MEDIUM',
                        recommendation: 'Consider code splitting and minification'
                    });
                }
            } catch (e) {
                this.testResults.performance.errors.push({
                    issue: 'Could not analyze JavaScript file size',
                    severity: 'MEDIUM',
                    recommendation: 'Ensure app.js file exists and is accessible'
                });
            }

            // Test animation performance
            console.log('  🔍 Testing Animation Performance...');

            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');
            const animationProps = ['animation', 'transition', 'transform'];
            let hasGPUAcceleration = 0;

            animationProps.forEach(prop => {
                if (cssContent.includes(`${prop}:`) && cssContent.includes('translate3d') || cssContent.includes('will-change')) {
                    hasGPUAcceleration++;
                }
            });

            if (hasGPUAcceleration > 0) {
                this.testResults.performance.passed++;
                console.log(`    ✓ GPU acceleration used for animations (${hasGPUAcceleration} optimizations)`);
            } else {
                this.testResults.performance.warnings.push({
                    issue: 'No GPU acceleration detected for animations',
                    severity: 'MEDIUM',
                    recommendation: 'Add transform3d or will-change properties for better animation performance'
                });
            }

            // Test image optimization
            console.log('  🔍 Testing Image Optimization...');

            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const images = dom.window.document.querySelectorAll('img');

            if (images.length === 0) {
                this.testResults.performance.passed++;
                console.log('    ✓ No images to optimize (CSS-based design)');
            } else {
                let hasModernFormats = 0;
                let hasResponsiveImages = 0;

                images.forEach(img => {
                    if (img.src && (img.src.includes('.webp') || img.src.includes('.avif'))) {
                        hasModernFormats++;
                    }
                    if (img.srcset || img.sizes) {
                        hasResponsiveImages++;
                    }
                });

                if (hasModernFormats > 0) {
                    this.testResults.performance.passed++;
                    console.log(`    ✓ Modern image formats used (${hasModernFormats} images)`);
                }

                if (hasResponsiveImages > 0) {
                    this.testResults.performance.passed++;
                    console.log(`    ✓ Responsive images implemented (${hasResponsiveImages} images)`);
                }
            }

        } catch (error) {
            this.testResults.performance.failed++;
            this.testResults.performance.errors.push({
                issue: `Performance test execution error: ${error.message}`,
                severity: 'CRITICAL',
                recommendation: 'Review performance test implementation'
            });
        }
    }

    /**
     * ADVANCED ACCESSIBILITY TESTING
     */
    async testAdvancedAccessibility() {
        try {
            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const document = dom.window.document;
            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Test WCAG Color Contrast
            console.log('  🔍 Testing Color Contrast...');

            // Check for sufficient contrast ratios (simplified analysis)
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
            let hasHighContrastElements = 0;

            // Look for white/light text on dark backgrounds
            if (cssContent.includes('text-white') || cssContent.includes('color: white') || cssContent.includes('color: #fff')) {
                hasHighContrastElements++;
            }

            if (hasHighContrastElements > 0) {
                this.testResults.accessibility.passed++;
                console.log('    ✓ High contrast text elements detected for dark theme');
            } else {
                this.testResults.accessibility.warnings.push({
                    issue: 'Limited high contrast text elements',
                    severity: 'MEDIUM',
                    recommendation: 'Ensure text colors provide sufficient contrast (4.5:1 minimum)'
                });
            }

            // Test Keyboard Navigation
            console.log('  🔍 Testing Keyboard Navigation...');

            const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');

            if (focusableElements.length > 0) {
                this.testResults.accessibility.passed++;
                console.log(`    ✓ Focusable elements present (${focusableElements.length} elements)`);

                // Check for focus styles
                if (cssContent.includes(':focus') || cssContent.includes('focus:')) {
                    this.testResults.accessibility.passed++;
                    console.log('    ✓ Focus styles implemented');
                } else {
                    this.testResults.accessibility.warnings.push({
                        issue: 'No focus styles detected',
                        severity: 'HIGH',
                        recommendation: 'Add visible focus styles for keyboard navigation'
                    });
                }
            } else {
                this.testResults.accessibility.warnings.push({
                    issue: 'Limited focusable elements',
                    severity: 'MEDIUM',
                    recommendation: 'Ensure all interactive elements are keyboard accessible'
                });
            }

            // Test Screen Reader Support
            console.log('  🔍 Testing Screen Reader Support...');

            // ARIA landmarks
            const landmarks = document.querySelectorAll('header, main, nav, footer, section, article, aside');
            if (landmarks.length > 0) {
                this.testResults.accessibility.passed++;
                console.log(`    ✓ Semantic landmarks present (${landmarks.length} elements)`);
            } else {
                this.testResults.accessibility.warnings.push({
                    issue: 'Limited semantic landmarks',
                    severity: 'MEDIUM',
                    recommendation: 'Use semantic HTML elements for better screen reader support'
                });
            }

            // ARIA labels
            const interactiveElements = document.querySelectorAll('button, a');
            let hasARIALabels = 0;

            interactiveElements.forEach(el => {
                if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.textContent.trim()) {
                    hasARIALabels++;
                }
            });

            if (hasARIALabels > 0) {
                this.testResults.accessibility.passed++;
                console.log(`    ✓ ARIA labels on interactive elements (${hasARIALabels} elements)`);
            } else {
                this.testResults.accessibility.warnings.push({
                    issue: 'Missing ARIA labels on interactive elements',
                    severity: 'MEDIUM',
                    recommendation: 'Add aria-label or ensure text content is present'
                });
            }

            // Test Skip Navigation Links
            console.log('  🔍 Testing Skip Navigation...');

            const skipLinks = document.querySelectorAll('a[href^="#"], [aria-label*="skip"], [aria-label*="Skip"]');
            if (skipLinks.length > 0) {
                this.testResults.accessibility.passed++;
                console.log('    ✓ Skip navigation links present');
            } else {
                this.testResults.accessibility.warnings.push({
                    issue: 'No skip navigation links found',
                    severity: 'LOW',
                    recommendation: 'Add skip links for better keyboard navigation'
                });
            }

            // Test Form Accessibility
            console.log('  🔍 Testing Form Accessibility...');

            const inputs = document.querySelectorAll('input, select, textarea');
            let hasProperLabels = 0;

            inputs.forEach(input => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (label || input.getAttribute('aria-label') || input.getAttribute('title')) {
                    hasProperLabels++;
                }
            });

            if (inputs.length === 0 || hasProperLabels === inputs.length) {
                this.testResults.accessibility.passed++;
                console.log('    ✓ Form inputs have proper labels');
            } else {
                this.testResults.accessibility.warnings.push({
                    issue: 'Some form inputs lack proper labels',
                    severity: 'HIGH',
                    recommendation: 'Add labels or aria-label to all form inputs'
                });
            }

        } catch (error) {
            this.testResults.accessibility.failed++;
            this.testResults.accessibility.errors.push({
                issue: `Accessibility test execution error: ${error.message}`,
                severity: 'CRITICAL',
                recommendation: 'Review accessibility test implementation'
            });
        }
    }

    /**
     * RESPONSIVE DESIGN TESTING
     */
    async testResponsiveDesign() {
        try {
            console.log('  🔍 Testing Viewport Configuration...');

            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const viewport = dom.window.document.querySelector('meta[name="viewport"]');

            if (viewport) {
                const content = viewport.getAttribute('content');
                if (content && content.includes('width=device-width') && content.includes('initial-scale=1')) {
                    this.testResults.responsive.passed++;
                    console.log('    ✓ Viewport properly configured for responsive design');
                } else {
                    this.testResults.responsive.warnings.push({
                        issue: 'Viewport meta tag not optimally configured',
                        severity: 'HIGH',
                        recommendation: 'Use width=device-width and initial-scale=1 for optimal responsive behavior'
                    });
                }
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push({
                    issue: 'Viewport meta tag missing',
                    severity: 'CRITICAL',
                    recommendation: 'Add viewport meta tag for responsive design'
                });
            }

            // Test Responsive Breakpoints
            console.log('  🔍 Testing Responsive Breakpoints...');

            const cssFiles = ['css/styles.css', 'css/components.css'];
            let hasMobileBreakpoints = 0;
            let hasTabletBreakpoints = 0;
            let hasDesktopBreakpoints = 0;

            cssFiles.forEach(cssFile => {
                try {
                    const cssPath = path.join(this.projectRoot, cssFile);
                    const cssContent = fs.readFileSync(cssPath, 'utf8');

                    // Check for common breakpoint patterns
                    if (cssContent.includes('@media') && cssContent.includes('768px')) {
                        hasMobileBreakpoints++;
                    }
                    if (cssContent.includes('@media') && cssContent.includes('1024px')) {
                        hasTabletBreakpoints++;
                    }
                    if (cssContent.includes('@media') && (cssContent.includes('1200px') || cssContent.includes('1440px'))) {
                        hasDesktopBreakpoints++;
                    }
                } catch (e) {
                    console.log(`    ⚠ Could not analyze ${cssFile}`);
                }
            });

            if (hasMobileBreakpoints > 0) {
                this.testResults.responsive.passed++;
                console.log(`    ✓ Mobile breakpoints implemented`);
            } else {
                this.testResults.responsive.warnings.push({
                    issue: 'No mobile responsive breakpoints detected',
                    severity: 'HIGH',
                    recommendation: 'Implement mobile-first responsive breakpoints'
                });
            }

            if (hasTabletBreakpoints > 0) {
                this.testResults.responsive.passed++;
                console.log(`    ✓ Tablet breakpoints implemented`);
            }

            if (hasDesktopBreakpoints > 0) {
                this.testResults.responsive.passed++;
                console.log(`    ✓ Desktop breakpoints implemented`);
            }

            // Test Flexible Typography
            console.log('  🔍 Testing Flexible Typography...');

            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');
            const hasFluidTypography = cssContent.includes('clamp(') || cssContent.includes('min(') || cssContent.includes('max(');

            if (hasFluidTypography) {
                this.testResults.responsive.passed++;
                console.log('    ✓ Fluid typography implemented');
            } else {
                this.testResults.responsive.warnings.push({
                    issue: 'No fluid typography detected',
                    severity: 'MEDIUM',
                    recommendation: 'Use clamp(), min(), or max() for fluid typography'
                });
            }

            // Test Touch Interaction
            console.log('  🔍 Testing Touch Interaction...');

            const buttons = dom.window.document.querySelectorAll('button, .nav-item');
            let hasProperTouchTargets = 0;

            buttons.forEach(button => {
                // Simplified check for padding or size that would indicate good touch targets
                const classes = button.className || '';
                if (classes.includes('p-') || classes.includes('px-') || classes.includes('py-')) {
                    hasProperTouchTargets++;
                }
            });

            if (hasProperTouchTargets > 0) {
                this.testResults.responsive.passed++;
                console.log(`    ✓ Proper touch targets detected (${hasProperTouchTargets} elements)`);
            } else {
                this.testResults.responsive.warnings.push({
                    issue: 'Touch targets may be too small',
                    severity: 'MEDIUM',
                    recommendation: 'Ensure touch targets are at least 44x44px'
                });
            }

            // Test Responsive Images
            console.log('  🔍 Testing Responsive Images...');

            const images = dom.window.document.querySelectorAll('img');
            let hasResponsiveImages = 0;

            images.forEach(img => {
                if (img.srcset || img.sizes || img.getAttribute('loading')) {
                    hasResponsiveImages++;
                }
            });

            if (images.length === 0 || hasResponsiveImages > 0) {
                this.testResults.responsive.passed++;
                console.log('    ✓ Responsive image practices implemented');
            } else {
                this.testResults.responsive.warnings.push({
                    issue: 'Images lack responsive attributes',
                    severity: 'LOW',
                    recommendation: 'Add srcset, sizes, or loading attributes for responsive images'
                });
            }

        } catch (error) {
            this.testResults.responsive.failed++;
            this.testResults.responsive.errors.push({
                issue: `Responsive design test execution error: ${error.message}`,
                severity: 'CRITICAL',
                recommendation: 'Review responsive design test implementation'
            });
        }
    }

    /**
     * CROSS-BROWSER COMPATIBILITY TESTING
     */
    async testCrossBrowserCompatibility() {
        try {
            console.log('  🔍 Testing Modern CSS Features...');

            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Check for potentially unsupported CSS features
            const potentiallyUnsupportedFeatures = [
                'backdrop-filter:',
                'mix-blend-mode:',
                'conic-gradient',
                'grid-template-columns:',
                'scroll-behavior:'
            ];

            let hasFallbacks = 0;
            let potentiallyUnsupportedCount = 0;

            potentiallyUnsupportedFeatures.forEach(feature => {
                if (cssContent.includes(feature)) {
                    potentiallyUnsupportedCount++;

                    // Check for vendor prefixes or fallbacks
                    if (cssContent.includes('-webkit-') || cssContent.includes('-moz-') || cssContent.includes('-ms-')) {
                        hasFallbacks++;
                    }
                }
            });

            if (potentiallyUnsupportedCount === 0) {
                this.testResults.crossBrowser.passed++;
                console.log('    ✓ No potentially unsupported CSS features detected');
            } else {
                if (hasFallbacks > 0) {
                    this.testResults.crossBrowser.passed++;
                    console.log(`    ✓ Vendor prefixes/fallbacks for ${hasFallbacks} features`);
                } else {
                    this.testResults.crossBrowser.warnings.push({
                        issue: `${potentiallyUnsupportedCount} potentially unsupported CSS features without fallbacks`,
                        severity: 'MEDIUM',
                        recommendation: 'Add vendor prefixes or fallbacks for better browser support'
                    });
                }
            }

            // Test JavaScript Compatibility
            console.log('  🔍 Testing JavaScript Compatibility...');

            const jsContent = fs.readFileSync(path.join(this.projectRoot, 'js/app.js'), 'utf8');

            // Check for modern JavaScript features that might need polyfills
            const modernJSFeatures = [
                'async/await',
                'const ',
                'let ',
                '=>', // Arrow functions
                'fetch(',
                'Promise',
                'class ',
                'IntersectionObserver',
                'ResizeObserver'
            ];

            let hasModernFeatures = 0;
            modernJSFeatures.forEach(feature => {
                if (jsContent.includes(feature)) {
                    hasModernFeatures++;
                }
            });

            if (hasModernFeatures > 0) {
                this.testResults.crossBrowser.passed++;
                console.log(`    ✓ Modern JavaScript features used (${hasModernFeatures} features)`);

                // Check for error handling (important for older browsers)
                if (jsContent.includes('try') && jsContent.includes('catch')) {
                    this.testResults.crossBrowser.passed++;
                    console.log('    ✓ Error handling implemented for browser compatibility');
                } else {
                    this.testResults.crossBrowser.warnings.push({
                        issue: 'Limited error handling for modern JavaScript features',
                        severity: 'MEDIUM',
                        recommendation: 'Add try/catch blocks around modern JavaScript usage'
                    });
                }
            }

            // Test Feature Detection
            console.log('  🔍 Testing Feature Detection...');

            if (jsContent.includes('typeof') || jsContent.includes('in') || jsContent.includes('hasOwnProperty')) {
                this.testResults.crossBrowser.passed++;
                console.log('    ✓ Feature detection patterns detected');
            } else {
                this.testResults.crossBrowser.warnings.push({
                    issue: 'No feature detection patterns found',
                    severity: 'LOW',
                    recommendation: 'Add feature detection for better browser compatibility'
                });
            }

            // Test CSS Reset/Normalization
            console.log('  🔍 Testing CSS Reset...');

            const cssFiles = ['css/styles.css', 'css/components.css'];
            let hasResetOrNormalize = 0;

            cssFiles.forEach(cssFile => {
                try {
                    const cssPath = path.join(this.projectRoot, cssFile);
                    const content = fs.readFileSync(cssPath, 'utf8');

                    if (content.includes('*{') || content.includes('box-sizing:') || content.includes('margin: 0')) {
                        hasResetOrNormalize++;
                    }
                } catch (e) {
                    console.log(`    ⚠ Could not analyze ${cssFile}`);
                }
            });

            if (hasResetOrNormalize > 0) {
                this.testResults.crossBrowser.passed++;
                console.log('    ✓ CSS reset or normalization detected');
            } else {
                this.testResults.crossBrowser.warnings.push({
                    issue: 'No CSS reset or normalization detected',
                    severity: 'LOW',
                    recommendation: 'Consider adding CSS reset for cross-browser consistency'
                });
            }

        } catch (error) {
            this.testResults.crossBrowser.failed++;
            this.testResults.crossBrowser.errors.push({
                issue: `Cross-browser test execution error: ${error.message}`,
                severity: 'CRITICAL',
                recommendation: 'Review cross-browser test implementation'
            });
        }
    }

    /**
     * FAILURE SCENARIO TESTING
     */
    async testFailureScenarios() {
        try {
            console.log('  🔍 Testing Error Handling...');

            const jsContent = fs.readFileSync(path.join(this.projectRoot, 'js/app.js'), 'utf8');

            // Check for try-catch blocks
            const tryCatchCount = (jsContent.match(/try\s*{/g) || []).length;
            const catchCount = (jsContent.match(/catch\s*\(/g) || []).length;

            if (tryCatchCount > 0 && catchCount > 0) {
                this.testResults.failureScenarios.passed++;
                console.log(`    ✓ Error handling implemented (${tryCatchCount} try-catch blocks)`);
            } else {
                this.testResults.failureScenarios.warnings.push({
                    issue: 'Limited error handling',
                    severity: 'HIGH',
                    recommendation: 'Add try-catch blocks for critical operations'
                });
            }

            // Test Network Failure Handling
            console.log('  🔍 Testing Network Failure Handling...');

            if (jsContent.includes('fetch(')) {
                const fetchErrorHandling = jsContent.includes('.catch(') || jsContent.includes('catch(');

                if (fetchErrorHandling) {
                    this.testResults.failureScenarios.passed++;
                    console.log('    ✓ Network error handling implemented');
                } else {
                    this.testResults.failureScenarios.warnings.push({
                        issue: 'Fetch calls lack error handling',
                        severity: 'HIGH',
                        recommendation: 'Add .catch() blocks to fetch operations'
                    });
                }
            }

            // Test Component Loading Failure
            console.log('  🔍 Testing Component Loading Failure...');

            if (jsContent.includes('loadComponents')) {
                const componentErrorHandling = jsContent.includes('console.error') || jsContent.includes('try');

                if (componentErrorHandling) {
                    this.testResults.failureScenarios.passed++;
                    console.log('    ✓ Component loading error handling implemented');
                } else {
                    this.testResults.failureScenarios.warnings.push({
                        issue: 'Component loading may lack error handling',
                        severity: 'MEDIUM',
                        recommendation: 'Add error handling for component loading'
                    });
                }
            }

            // Test JavaScript Disabled Scenario
            console.log('  🔍 Testing JavaScript Disabled Scenario...');

            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const noscriptTags = dom.window.document.querySelectorAll('noscript');

            if (noscriptTags.length > 0) {
                this.testResults.failureScenarios.passed++;
                console.log(`    ✓ Noscript tags present (${noscriptTags.length} tags)`);
            } else {
                this.testResults.failureScenarios.warnings.push({
                    issue: 'No noscript tags found',
                    severity: 'MEDIUM',
                    recommendation: 'Add noscript content for JavaScript-disabled users'
                });
            }

            // Test CSS Loading Failure
            console.log('  🔍 Testing CSS Loading Failure...');

            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');

            // Check for critical CSS inline or fallback styles
            if (indexContent.includes('<style>') || indexContent.includes('style=')) {
                this.testResults.failureScenarios.passed++;
                console.log('    ✓ Inline styles or critical CSS detected');
            } else {
                this.testResults.failureScenarios.warnings.push({
                    issue: 'No inline critical CSS detected',
                    severity: 'LOW',
                    recommendation: 'Consider adding critical CSS inline for better loading performance'
                });
            }

            // Test Timeout Handling
            console.log('  🔍 Testing Timeout Handling...');

            if (jsContent.includes('setTimeout') || jsContent.includes('setInterval')) {
                const hasTimeoutCleanup = jsContent.includes('clearTimeout') || jsContent.includes('clearInterval');

                if (hasTimeoutCleanup) {
                    this.testResults.failureScenarios.passed++;
                    console.log('    ✓ Timeout cleanup implemented');
                } else {
                    this.testResults.failureScenarios.warnings.push({
                        issue: 'Timers may lack cleanup',
                        severity: 'MEDIUM',
                        recommendation: 'Add clearTimeout/clearInterval for timer cleanup'
                    });
                }
            }

        } catch (error) {
            this.testResults.failureScenarios.failed++;
            this.testResults.failureScenarios.errors.push({
                issue: `Failure scenario test execution error: ${error.message}`,
                severity: 'CRITICAL',
                recommendation: 'Review failure scenario test implementation'
            });
        }
    }

    /**
     * Helper method to get computed styles (simplified)
     */
    getComputedStyles(element, cssContent) {
        const classes = element.className || '';
        const styles = {};

        // This is a simplified version - in real testing you'd use a CSS parser
        if (classes.includes('w-')) {
            const match = classes.match(/w-(\d+)/);
            if (match) styles.width = match[1] + 'px';
        }
        if (classes.includes('h-')) {
            const match = classes.match(/h-(\d+)/);
            if (match) styles.height = match[1] + 'px';
        }
        if (classes.includes('text-white')) {
            styles.color = 'white';
        }
        if (classes.includes('cursor-pointer')) {
            styles.cursor = 'pointer';
        }

        return styles;
    }

    /**
     * Generate comprehensive test report
     */
    generateComprehensiveReport() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 COMPREHENSIVE UX & PERFORMANCE TEST REPORT');
        console.log('='.repeat(80));

        const categories = [
            { name: 'User Experience', results: this.testResults.userExperience },
            { name: 'Performance', results: this.testResults.performance },
            { name: 'Accessibility', results: this.testResults.accessibility },
            { name: 'Responsive Design', results: this.testResults.responsive },
            { name: 'Cross-browser Compatibility', results: this.testResults.crossBrowser },
            { name: 'Failure Scenarios', results: this.testResults.failureScenarios }
        ];

        let totalPassed = 0;
        let totalFailed = 0;
        let totalWarnings = 0;

        categories.forEach(category => {
            const passed = category.results.passed;
            const failed = category.results.failed;
            const warnings = category.results.warnings?.length || 0;
            const errors = category.results.errors?.length || 0;

            const total = passed + failed;
            const percentage = total > 0 ? (passed / total * 100) : 100;

            const status = percentage >= 90 && failed === 0 ? '✅ EXCELLENT' :
                          percentage >= 75 && failed <= 2 ? '⚠️  GOOD' :
                          '❌ NEEDS IMPROVEMENT';

            console.log(`\n${status} ${category.name}:`);
            console.log(`   Passed: ${passed} | Failed: ${failed} | Warnings: ${warnings} | Errors: ${errors}`);
            console.log(`   Success Rate: ${percentage.toFixed(1)}%`);

            if (category.results.metrics && Object.keys(category.results.metrics).length > 0) {
                console.log('   Metrics:');
                Object.entries(category.results.metrics).forEach(([key, value]) => {
                    console.log(`     - ${key}: ${value}`);
                });
            }

            // Show high severity issues first
            const criticalIssues = [...(category.results.errors || []), ...(category.results.warnings || [])]
                .filter(issue => issue.severity === 'CRITICAL')
                .slice(0, 3);

            if (criticalIssues.length > 0) {
                console.log('   🔴 Critical Issues:');
                criticalIssues.forEach(issue => {
                    console.log(`     - ${issue.issue}`);
                    console.log(`       Recommendation: ${issue.recommendation}`);
                });
            }

            totalPassed += passed;
            totalFailed += failed;
            totalWarnings += warnings;
        });

        const overallPercentage = (totalPassed / (totalPassed + totalFailed) * 100) || 100;

        console.log('\n' + '-'.repeat(80));
        console.log('🎯 OVERALL ASSESSMENT');
        console.log('-'.repeat(80));
        console.log(`Success Rate: ${overallPercentage.toFixed(1)}%`);
        console.log(`Tests Passed: ${totalPassed}`);
        console.log(`Tests Failed: ${totalFailed}`);
        console.log(`Warnings: ${totalWarnings}`);

        // Overall grade
        const grade = overallPercentage >= 95 ? 'A+' :
                     overallPercentage >= 90 ? 'A' :
                     overallPercentage >= 85 ? 'B+' :
                     overallPercentage >= 80 ? 'B' :
                     overallPercentage >= 75 ? 'C+' :
                     overallPercentage >= 70 ? 'C' : 'D';

        console.log(`Overall Grade: ${grade}`);

        console.log('\n' + '='.repeat(80));
        console.log('🔧 PRIORITY RECOMMENDATIONS');
        console.log('='.repeat(80));

        // Aggregate all critical and high severity issues
        const allIssues = [];
        categories.forEach(category => {
            [...(category.results.errors || []), ...(category.results.warnings || [])]
                .forEach(issue => {
                    allIssues.push({ ...issue, category: category.name });
                });
        });

        // Sort by severity
        allIssues.sort((a, b) => {
            const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
            return severityOrder[a.severity] - severityOrder[b.severity];
        });

        // Show top 10 recommendations
        allIssues.slice(0, 10).forEach((issue, index) => {
            const icon = this.severityLevels[issue.severity] || '⚪';
            console.log(`\n${index + 1}. ${icon} ${issue.category} - ${issue.severity}`);
            console.log(`   Issue: ${issue.issue}`);
            console.log(`   Fix: ${issue.recommendation}`);
        });

        // Generate detailed HTML report
        this.generateDetailedHTMLReport(allIssues, overallPercentage, grade);

        console.log('\n' + '='.repeat(80));
        console.log('📄 Reports generated:');
        console.log('  - ux-performance-report.html (detailed HTML report)');
        console.log('  - ux-performance-summary.json (machine-readable summary)');
        console.log('='.repeat(80));
    }

    /**
     * Generate detailed HTML report
     */
    generateDetailedHTMLReport(issues, overallPercentage, grade) {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aegntic.ai Foundation - UX & Performance Test Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #e0e0e0;
            background: #0a0a0a;
            background-image:
                linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%),
                radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.1) 0%, transparent 50%);
        }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; padding: 40px 0; }
        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #00E5FF, #ff00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header .subtitle { font-size: 1.2em; color: #888; }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .summary-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 229, 255, 0.1);
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .summary-card:hover {
            transform: translateY(-2px);
            border-color: rgba(0, 229, 255, 0.3);
        }
        .summary-card h3 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #00E5FF;
        }
        .summary-card .label { font-size: 1.1em; color: #888; text-transform: uppercase; letter-spacing: 1px; }
        .grade {
            font-size: 4em;
            font-weight: bold;
            background: linear-gradient(135deg, #4CAF50, #00E5FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .category-section {
            margin-bottom: 40px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .category-header {
            background: rgba(0, 229, 255, 0.1);
            padding: 20px 30px;
            border-bottom: 1px solid rgba(0, 229, 255, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .category-header h2 { font-size: 1.8em; color: #00E5FF; }
        .score { font-size: 1.5em; font-weight: bold; }
        .score.excellent { color: #4CAF50; }
        .score.good { color: #FFC107; }
        .score.poor { color: #f44336; }
        .category-content { padding: 30px; }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }
        .metric {
            background: rgba(255, 255, 255, 0.05);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .metric-value { font-size: 1.8em; font-weight: bold; color: #fff; }
        .metric-label { font-size: 0.9em; color: #888; margin-top: 5px; }
        .issues-list { margin-top: 20px; }
        .issue {
            background: rgba(255, 255, 255, 0.03);
            border-left: 4px solid #00E5FF;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 0 8px 8px 0;
            transition: transform 0.2s ease;
        }
        .issue:hover { transform: translateX(5px); }
        .issue.high { border-left-color: #f44336; }
        .issue.medium { border-left-color: #FFC107; }
        .issue.low { border-left-color: #4CAF50; }
        .issue-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .issue-title { font-weight: bold; font-size: 1.1em; color: #fff; }
        .issue-severity {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
        }
        .severity-critical { background: #f44336; }
        .severity-high { background: #FF5722; }
        .severity-medium { background: #FFC107; color: #000; }
        .severity-low { background: #4CAF50; }
        .issue-description { margin-bottom: 10px; color: #ccc; }
        .issue-recommendation {
            background: rgba(0, 229, 255, 0.1);
            padding: 12px;
            border-radius: 6px;
            font-size: 0.9em;
            border-left: 3px solid #00E5FF;
        }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin: 15px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00E5FF, #ff00ff);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        @media (max-width: 768px) {
            .container { padding: 15px; }
            .header h1 { font-size: 2em; }
            .summary-grid { grid-template-columns: 1fr; }
            .category-header { padding: 15px 20px; flex-direction: column; gap: 10px; }
            .category-content { padding: 20px; }
        }
        .corner-decoration {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 2px solid rgba(0, 229, 255, 0.5);
        }
        .corner-tl { top: 0; left: 0; border-bottom: none; border-right: none; }
        .corner-tr { top: 0; right: 0; border-bottom: none; border-left: none; }
        .corner-bl { bottom: 0; left: 0; border-top: none; border-right: none; }
        .corner-br { bottom: 0; right: 0; border-top: none; border-left: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>UX & Performance Test Report</h1>
            <div class="subtitle">Aegntic.ai Foundation Website</div>
            <div class="subtitle">Generated on ${new Date().toLocaleString()}</div>
        </div>

        <div class="summary-grid">
            <div class="summary-card">
                <div class="grade">${grade}</div>
                <div class="label">Overall Grade</div>
            </div>
            <div class="summary-card">
                <div class="metric-value">${overallPercentage.toFixed(1)}%</div>
                <div class="label">Success Rate</div>
            </div>
            <div class="summary-card">
                <div class="metric-value">${this.testResults.userExperience.passed + this.testResults.performance.passed + this.testResults.accessibility.passed + this.testResults.responsive.passed + this.testResults.crossBrowser.passed + this.testResults.failureScenarios.passed}</div>
                <div class="label">Tests Passed</div>
            </div>
            <div class="summary-card">
                <div class="metric-value">${issues.length}</div>
                <div class="label">Total Issues</div>
            </div>
        </div>

        <div class="category-section">
            <div class="category-header">
                <h2>User Experience</h2>
                <div class="score excellent">${((this.testResults.userExperience.passed / (this.testResults.userExperience.passed + this.testResults.userExperience.failed)) * 100).toFixed(1)}%</div>
            </div>
            <div class="category-content">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.testResults.userExperience.passed / (this.testResults.userExperience.passed + this.testResults.userExperience.failed)) * 100}%"></div>
                </div>
                <p>Navigation usability, visual hierarchy, interactive feedback, and loading states tested.</p>
            </div>
        </div>

        <div class="category-section">
            <div class="category-header">
                <h2>Performance</h2>
                <div class="score ${this.testResults.performance.failed === 0 ? 'excellent' : 'good'}">${((this.testResults.performance.passed / (this.testResults.performance.passed + this.testResults.performance.failed)) * 100).toFixed(1)}%</div>
            </div>
            <div class="category-content">
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-value">${this.testResults.performance.metrics.externalResources || 0}</div>
                        <div class="metric-label">External Resources</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${((this.testResults.performance.metrics.totalCSSSize || 0) / 1024).toFixed(1)}KB</div>
                        <div class="metric-label">CSS Size</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${((this.testResults.performance.metrics.mainJSSize || 0) / 1024).toFixed(1)}KB</div>
                        <div class="metric-label">JS Size</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.testResults.performance.passed / (this.testResults.performance.passed + this.testResults.performance.failed)) * 100}%"></div>
                </div>
                <p>Resource loading optimization, animation performance, and loading efficiency analyzed.</p>
            </div>
        </div>

        <div class="category-section">
            <div class="category-header">
                <h2>Accessibility</h2>
                <div class="score ${this.testResults.accessibility.failed === 0 ? 'excellent' : 'good'}">${((this.testResults.accessibility.passed / (this.testResults.accessibility.passed + this.testResults.accessibility.failed)) * 100).toFixed(1)}%</div>
            </div>
            <div class="category-content">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.testResults.accessibility.passed / (this.testResults.accessibility.passed + this.testResults.accessibility.failed)) * 100}%"></div>
                </div>
                <p>WCAG compliance, keyboard navigation, screen reader support, and color contrast tested.</p>
            </div>
        </div>

        <div class="category-section">
            <div class="category-header">
                <h2>Responsive Design</h2>
                <div class="score ${this.testResults.responsive.failed === 0 ? 'excellent' : 'good'}">${((this.testResults.responsive.passed / (this.testResults.responsive.passed + this.testResults.responsive.failed)) * 100).toFixed(1)}%</div>
            </div>
            <div class="category-content">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.testResults.responsive.passed / (this.testResults.responsive.passed + this.testResults.responsive.failed)) * 100}%"></div>
                </div>
                <p>Mobile, tablet, and desktop compatibility with proper breakpoints and touch interactions.</p>
            </div>
        </div>

        <div class="issues-list">
            <h2 style="font-size: 2em; color: #00E5FF; margin-bottom: 30px;">Priority Issues & Recommendations</h2>
            ${issues.slice(0, 15).map(issue => `
                <div class="issue ${issue.severity.toLowerCase()}">
                    <div class="corner-decoration corner-tl"></div>
                    <div class="corner-decoration corner-tr"></div>
                    <div class="corner-decoration corner-bl"></div>
                    <div class="corner-decoration corner-br"></div>
                    <div class="issue-header">
                        <div class="issue-title">${issue.category}: ${issue.issue}</div>
                        <div class="issue-severity severity-${issue.severity.toLowerCase()}">${issue.severity}</div>
                    </div>
                    <div class="issue-recommendation">
                        <strong>Recommendation:</strong> ${issue.recommendation}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(this.projectRoot, 'ux-performance-report.html'), htmlContent);

        // Generate JSON summary
        const jsonSummary = {
            metadata: {
                generatedOn: new Date().toISOString(),
                overallPercentage: overallPercentage,
                grade: grade,
                totalTests: this.testResults.userExperience.passed + this.testResults.performance.passed + this.testResults.accessibility.passed + this.testResults.responsive.passed + this.testResults.crossBrowser.passed + this.testResults.failureScenarios.passed + this.testResults.userExperience.failed + this.testResults.performance.failed + this.testResults.accessibility.failed + this.testResults.responsive.failed + this.testResults.crossBrowser.failed + this.testResults.failureScenarios.failed,
                totalIssues: issues.length
            },
            categories: {
                userExperience: {
                    passed: this.testResults.userExperience.passed,
                    failed: this.testResults.userExperience.failed,
                    warnings: this.testResults.userExperience.warnings.length,
                    errors: this.testResults.userExperience.errors.length
                },
                performance: {
                    passed: this.testResults.performance.passed,
                    failed: this.testResults.performance.failed,
                    warnings: this.testResults.performance.warnings.length,
                    errors: this.testResults.performance.errors.length,
                    metrics: this.testResults.performance.metrics
                },
                accessibility: {
                    passed: this.testResults.accessibility.passed,
                    failed: this.testResults.accessibility.failed,
                    warnings: this.testResults.accessibility.warnings.length,
                    errors: this.testResults.accessibility.errors.length
                },
                responsive: {
                    passed: this.testResults.responsive.passed,
                    failed: this.testResults.responsive.failed,
                    warnings: this.testResults.responsive.warnings.length,
                    errors: this.testResults.responsive.errors.length
                },
                crossBrowser: {
                    passed: this.testResults.crossBrowser.passed,
                    failed: this.testResults.crossBrowser.failed,
                    warnings: this.testResults.crossBrowser.warnings.length,
                    errors: this.testResults.crossBrowser.errors.length
                },
                failureScenarios: {
                    passed: this.testResults.failureScenarios.passed,
                    failed: this.testResults.failureScenarios.failed,
                    warnings: this.testResults.failureScenarios.warnings.length,
                    errors: this.testResults.failureScenarios.errors.length
                }
            },
            issues: issues
        };

        fs.writeFileSync(path.join(this.projectRoot, 'ux-performance-summary.json'), JSON.stringify(jsonSummary, null, 2));
    }
}

// Export for use in other files or direct execution
if (require.main === module) {
    const testSuite = new UXPerformanceTestSuite();
    testSuite.runAllTests().catch(console.error);
}

module.exports = UXPerformanceTestSuite;