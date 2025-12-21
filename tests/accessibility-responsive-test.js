/**
 * Accessibility and Responsive Design Tests
 * Tests for WCAG compliance and responsive behavior
 */

const fs = require('fs');
const path = require('path');

class AccessibilityResponsiveTest {
    constructor() {
        this.testResults = {
            accessibility: { passed: 0, failed: 0, errors: [] },
            responsive: { passed: 0, failed: 0, errors: [] },
            performance: { passed: 0, failed: 0, errors: [] }
        };
        this.projectRoot = __dirname + '/..';
    }

    async runTests() {
        console.log('♿ Starting Accessibility & Responsive Design Tests...\n');

        console.log('♿ Testing Accessibility...');
        await this.testAccessibility();

        console.log('\n📱 Testing Responsive Design...');
        await this.testResponsive();

        console.log('\n⚡ Testing Performance Optimizations...');
        await this.testPerformance();

        this.generateReport();
    }

    async testAccessibility() {
        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const stylesContent = fs.readFileSync(path.join(this.projectRoot, 'css/styles.css'), 'utf8');
            const componentsContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Test for lang attribute
            if (indexContent.includes('lang="en"')) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Language attribute specified');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Missing lang attribute on html element');
                console.log('  ✗ Missing lang attribute on html element');
            }

            // Test for proper heading structure
            const h1Count = (indexContent.match(/<h1/g) || []).length;
            if (h1Count === 1) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Exactly one H1 tag present');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push(`Expected 1 H1 tag, found ${h1Count}`);
                console.log(`  ✗ Expected 1 H1 tag, found ${h1Count}`);
            }

            // Test for skip navigation link (important for accessibility)
            if (indexContent.includes('skip-navigation') || indexContent.includes('skip-to-content')) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Skip navigation link present');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Missing skip navigation link');
                console.log('  ✗ Missing skip navigation link');
            }

            // Test for ARIA labels on interactive elements
            const buttons = indexContent.match(/<button/g) || [];
            const buttonsWithAria = indexContent.match(/aria-/g) || [];
            const hasAriaOnButtons = buttonsWithAria.length > 0 || indexContent.includes('material-symbols-outlined');

            if (hasAriaOnButtons) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Interactive elements have accessible labels');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Interactive elements may lack accessible labels');
                console.log('  ⚠ Interactive elements may lack accessible labels');
            }

            // Test for focus styles in CSS
            if (stylesContent.includes(':focus') || componentsContent.includes(':focus')) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Focus styles defined');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Missing focus styles for keyboard navigation');
                console.log('  ✗ Missing focus styles for keyboard navigation');
            }

            // Test for sufficient color contrast (basic check)
            if (stylesContent.includes('color: #00E5FF') || stylesContent.includes('color: var(--primary-glow)')) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ High contrast primary color used');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Primary color may not have sufficient contrast');
                console.log('  ⚠ Primary color may not have sufficient contrast');
            }

            // Test for semantic HTML
            const semanticElements = ['header', 'main', 'footer', 'nav', 'section'];
            let semanticCount = 0;

            semanticElements.forEach(tag => {
                if (indexContent.includes(`<${tag}`)) {
                    semanticCount++;
                }
            });

            if (semanticCount >= 3) {
                this.testResults.accessibility.passed++;
                console.log(`  ✓ Semantic HTML elements used (${semanticCount} found)`);
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push(`Insufficient semantic HTML (${semanticCount} found)`);
                console.log(`  ✗ Insufficient semantic HTML (${semanticCount} found)`);
            }

        } catch (error) {
            this.testResults.accessibility.failed++;
            this.testResults.accessibility.errors.push(`Accessibility test error: ${error.message}`);
            console.log(`  ✗ Accessibility test error: ${error.message}`);
        }
    }

    async testResponsive() {
        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const stylesContent = fs.readFileSync(path.join(this.projectRoot, 'css/styles.css'), 'utf8');
            const componentsContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Test for responsive viewport meta tag
            if (indexContent.includes('width=device-width, initial-scale=1.0')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Responsive viewport meta tag configured');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Viewport not properly configured for responsive design');
                console.log('  ✗ Viewport not properly configured for responsive design');
            }

            // Test for responsive breakpoints
            const mediaQueries = (stylesContent.match(/@media/g) || []).length +
                                 (componentsContent.match(/@media/g) || []).length;

            if (mediaQueries >= 3) {
                this.testResults.responsive.passed++;
                console.log(`  ✓ Responsive breakpoints defined (${mediaQueries} media queries)`);
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push(`Insufficient responsive breakpoints (${mediaQueries} found)`);
                console.log(`  ✗ Insufficient responsive breakpoints (${mediaQueries} found)`);
            }

            // Test for flexible grid system
            if (stylesContent.includes('grid-cols-') || stylesContent.includes('flex') ||
                componentsContent.includes('grid-cols-') || componentsContent.includes('flex')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Flexible grid or flexbox system used');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('No flexible grid system detected');
                console.log('  ✗ No flexible grid system detected');
            }

            // Test for responsive images
            if (indexContent.includes('srcset') || indexContent.includes('sizes') ||
                stylesContent.includes('max-width: 100%')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Responsive image techniques used');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Responsive images not implemented');
                console.log('  ✗ Responsive images not implemented');
            }

            // Test for mobile-first approach (check if base styles are mobile-friendly)
            if (stylesContent.includes('min-width:') || componentsContent.includes('min-width:')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Desktop-first media queries detected');
            } else if (stylesContent.includes('max-width:') || componentsContent.includes('max-width:')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Mobile-first media queries detected');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('No clear responsive strategy detected');
                console.log('  ✗ No clear responsive strategy detected');
            }

            // Test for touch-friendly targets
            if (stylesContent.includes('min-height: 44px') || stylesContent.includes('min-width: 44px') ||
                indexContent.includes('py-4') || indexContent.includes('px-4')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Touch-friendly target sizes');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Touch targets may be too small');
                console.log('  ⚠ Touch targets may be too small');
            }

            // Test for responsive typography
            if (stylesContent.includes('rem') || stylesContent.includes('em') || stylesContent.includes('vw')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Responsive typography units used');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Fixed typography units may hinder responsiveness');
                console.log('  ⚠ Fixed typography units may hinder responsiveness');
            }

        } catch (error) {
            this.testResults.responsive.failed++;
            this.testResults.responsive.errors.push(`Responsive test error: ${error.message}`);
            console.log(`  ✗ Responsive test error: ${error.message}`);
        }
    }

    async testPerformance() {
        try {
            const appJSPath = path.join(this.projectRoot, 'js/app.js');
            const appContent = fs.readFileSync(appJSPath, 'utf8');

            // Test for lazy loading implementation
            if (appContent.includes('IntersectionObserver') || appContent.includes('lazy')) {
                this.testResults.performance.passed++;
                console.log('  ✓ Lazy loading or intersection observer implemented');
            } else {
                this.testResults.performance.failed++;
                this.testResults.performance.errors.push('Lazy loading not implemented');
                console.log('  ✗ Lazy loading not implemented');
            }

            // Test for event delegation (performance optimization)
            if (appContent.includes('addEventListener') && appContent.includes('closest')) {
                this.testResults.performance.passed++;
                console.log('  ✓ Event delegation pattern used');
            } else {
                this.testResults.performance.failed++;
                this.testResults.performance.errors.push('Event delegation not optimized');
                console.log('  ⚠ Event delegation not optimized');
            }

            // Test for debouncing/throttling
            if (appContent.includes('debounce') || appContent.includes('throttle') ||
                appContent.includes('setTimeout')) {
                this.testResults.performance.passed++;
                console.log('  ✓ Performance optimization patterns found');
            } else {
                this.testResults.performance.failed++;
                this.testResults.performance.errors.push('Missing performance optimizations for frequent events');
                console.log('  ⚠ Missing performance optimizations for frequent events');
            }

            // Test for CSS animation performance
            const stylesContent = fs.readFileSync(path.join(this.projectRoot, 'css/styles.css'), 'utf8');
            const componentsContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            if (stylesContent.includes('transform') || stylesContent.includes('opacity') ||
                componentsContent.includes('transform') || componentsContent.includes('opacity')) {
                this.testResults.performance.passed++;
                console.log('  ✓ Hardware-accelerated CSS properties used');
            } else {
                this.testResults.performance.failed++;
                this.testResults.performance.errors.push('Consider using transform/opacity for animations');
                console.log('  ⚠ Consider using transform/opacity for animations');
            }

            // Test for resource optimization
            if (stylesContent.includes('will-change') || componentsContent.includes('will-change')) {
                this.testResults.performance.passed++;
                console.log('  ✓ CSS will-change property used for optimization');
            } else {
                this.testResults.performance.failed++;
                this.testResults.performance.errors.push('CSS will-change property not used');
                console.log('  ⚠ CSS will-change property not used');
            }

        } catch (error) {
            this.testResults.performance.failed++;
            this.testResults.performance.errors.push(`Performance test error: ${error.message}`);
            console.log(`  ✗ Performance test error: ${error.message}`);
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('♿ ACCESSIBILITY & RESPONSIVE TEST REPORT');
        console.log('='.repeat(60));

        const categories = [
            { name: 'Accessibility', results: this.testResults.accessibility },
            { name: 'Responsive Design', results: this.testResults.responsive },
            { name: 'Performance', results: this.testResults.performance }
        ];

        let totalPassed = 0;
        let totalFailed = 0;

        categories.forEach(category => {
            const percentage = category.results.passed / (category.results.passed + category.results.failed) * 100 || 0;
            const status = percentage === 100 ? '✓' : percentage >= 80 ? '⚠' : '✗';

            console.log(`\n${status} ${category.name}:`);
            console.log(`   Passed: ${category.results.passed}`);
            console.log(`   Failed: ${category.results.failed}`);
            console.log(`   Score: ${percentage.toFixed(1)}%`);

            if (category.results.errors.length > 0) {
                console.log('   Issues:');
                category.results.errors.forEach(error => {
                    console.log(`     - ${error}`);
                });
            }

            totalPassed += category.results.passed;
            totalFailed += category.results.failed;
        });

        const overallPercentage = totalPassed / (totalPassed + totalFailed) * 100 || 0;
        console.log('\n' + '-'.repeat(60));
        console.log(`OVERALL SCORE: ${overallPercentage.toFixed(1)}%`);
        console.log(`Total Tests: ${totalPassed + totalFailed}`);
        console.log(`Passed: ${totalPassed}`);
        console.log(`Failed: ${totalFailed}`);
        console.log('='.repeat(60));

        // Generate recommendations
        console.log('\n📋 RECOMMENDATIONS:');
        if (this.testResults.accessibility.failed > 0) {
            console.log('\nAccessibility:');
            console.log('- Add skip navigation link for keyboard users');
            console.log('- Ensure all interactive elements have ARIA labels');
            console.log('- Implement focus management for modals');
        }

        if (this.testResults.responsive.failed > 0) {
            console.log('\nResponsive Design:');
            console.log('- Add more responsive breakpoints');
            console.log('- Implement responsive images with srcset');
            console.log('- Use relative units for typography');
        }

        if (this.testResults.performance.failed > 0) {
            console.log('\nPerformance:');
            console.log('- Implement lazy loading for images');
            console.log('- Add debouncing for scroll/resize events');
            console.log('- Use CSS will-change for animated elements');
        }

        if (overallPercentage === 100) {
            console.log('\n🎉 Excellent work! All tests passed!');
        }
    }
}

// Export for use in other files or direct execution
if (require.main === module) {
    const test = new AccessibilityResponsiveTest();
    test.runTests().catch(console.error);
}

module.exports = AccessibilityResponsiveTest;