/**
 * Simple UX Testing Suite - No External Dependencies
 * Tests for user experience, accessibility, and responsive design
 */

const fs = require('fs');
const path = require('path');

class SimpleUXTest {
    constructor() {
        this.results = {
            navigation: { passed: 0, failed: 0, issues: [] },
            accessibility: { passed: 0, failed: 0, issues: [] },
            responsive: { passed: 0, failed: 0, issues: [] },
            performance: { passed: 0, failed: 0, issues: [] },
            usability: { passed: 0, failed: 0, issues: [] }
        };
        this.projectRoot = __dirname + '/..';
    }

    async runAllTests() {
        console.log('🚀 Starting Simple UX Testing Suite for Aegntic.ai Foundation...\n');

        await this.testNavigation();
        await this.testAccessibility();
        await this.testResponsive();
        await this.testPerformance();
        await this.testUsability();

        this.generateReport();
    }

    async testNavigation() {
        console.log('🧭 Testing Navigation Usability...');

        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const navContent = fs.readFileSync(path.join(this.projectRoot, 'components/navigation.html'), 'utf8');

            // Desktop navigation
            if (navContent.includes('fixed left-0 top-0 bottom-0')) {
                this.results.navigation.passed++;
                console.log('  ✓ Desktop navigation properly positioned');
            } else {
                this.results.navigation.failed++;
                this.results.navigation.issues.push('Desktop navigation positioning unclear');
            }

            // Mobile menu button
            if (indexContent.includes('mobile-menu-btn')) {
                this.results.navigation.passed++;
                console.log('  ✓ Mobile menu button present');
            } else {
                this.results.navigation.failed++;
                this.results.navigation.issues.push('Mobile menu button missing');
            }

            // Navigation items
            const navItems = (navContent.match(/data-page=/g) || []).length;
            if (navItems >= 4) {
                this.results.navigation.passed++;
                console.log(`  ✓ Sufficient navigation items (${navItems} found)`);
            } else {
                this.results.navigation.failed++;
                this.results.navigation.issues.push(`Insufficient navigation items (${navItems} found)`);
            }

            // Mobile menu overlay
            if (navContent.includes('mobile-menu-overlay')) {
                this.results.navigation.passed++;
                console.log('  ✓ Mobile menu overlay present');
            } else {
                this.results.navigation.failed++;
                this.results.navigation.issues.push('Mobile menu overlay missing');
            }

        } catch (error) {
            this.results.navigation.failed++;
            this.results.navigation.issues.push(`Navigation test error: ${error.message}`);
        }
    }

    async testAccessibility() {
        console.log('\n♿ Testing Accessibility...');

        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Language attribute
            if (indexContent.includes('lang="en"')) {
                this.results.accessibility.passed++;
                console.log('  ✓ Language attribute present');
            } else {
                this.results.accessibility.failed++;
                this.results.accessibility.issues.push('Missing language attribute');
            }

            // Skip navigation link
            if (indexContent.includes('skip') || indexContent.includes('Skip')) {
                this.results.accessibility.passed++;
                console.log('  ✓ Skip navigation link found');
            } else {
                this.results.accessibility.failed++;
                this.results.accessibility.issues.push('Missing skip navigation link');
            }

            // Focus styles
            if (cssContent.includes(':focus')) {
                this.results.accessibility.passed++;
                console.log('  ✓ Focus styles defined');
            } else {
                this.results.accessibility.failed++;
                this.results.accessibility.issues.push('Missing focus styles');
            }

            // Semantic HTML
            const semanticTags = ['header', 'main', 'nav', 'section', 'footer'];
            let semanticCount = 0;
            semanticTags.forEach(tag => {
                if (indexContent.includes(`<${tag}`)) semanticCount++;
            });

            if (semanticCount >= 3) {
                this.results.accessibility.passed++;
                console.log(`  ✓ Semantic HTML used (${semanticCount} elements)`);
            } else {
                this.results.accessibility.failed++;
                this.results.accessibility.issues.push(`Insufficient semantic HTML (${semanticCount} elements)`);
            }

            // ARIA labels
            if (indexContent.includes('aria-') || indexContent.includes('material-symbols')) {
                this.results.accessibility.passed++;
                console.log('  ✓ ARIA labels or accessible icons present');
            } else {
                this.results.accessibility.failed++;
                this.results.accessibility.issues.push('Missing ARIA labels on interactive elements');
            }

        } catch (error) {
            this.results.accessibility.failed++;
            this.results.accessibility.issues.push(`Accessibility test error: ${error.message}`);
        }
    }

    async testResponsive() {
        console.log('\n📱 Testing Responsive Design...');

        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Viewport meta tag
            if (indexContent.includes('width=device-width')) {
                this.results.responsive.passed++;
                console.log('  ✓ Viewport meta tag configured');
            } else {
                this.results.responsive.failed++;
                this.results.responsive.issues.push('Viewport meta tag not configured');
            }

            // Media queries
            const mediaQueryCount = (cssContent.match(/@media/g) || []).length;
            if (mediaQueryCount >= 2) {
                this.results.responsive.passed++;
                console.log(`  ✓ Media queries present (${mediaQueryCount} found)`);
            } else {
                this.results.responsive.failed++;
                this.results.responsive.issues.push(`Insufficient media queries (${mediaQueryCount} found)`);
            }

            // Flexible units
            if (cssContent.includes('rem') || cssContent.includes('em') || cssContent.includes('%')) {
                this.results.responsive.passed++;
                console.log('  ✓ Flexible units used');
            } else {
                this.results.responsive.failed++;
                this.results.responsive.issues.push('No flexible units detected');
            }

            // Touch-friendly targets
            if (indexContent.includes('py-') || indexContent.includes('px-') || indexContent.includes('p-')) {
                this.results.responsive.passed++;
                console.log('  ✓ Touch-friendly padding detected');
            } else {
                this.results.responsive.failed++;
                this.results.responsive.issues.push('Touch targets may be too small');
            }

            // Responsive images
            if (indexContent.includes('max-width: 100%') || cssContent.includes('max-width: 100%')) {
                this.results.responsive.passed++;
                console.log('  ✓ Responsive image techniques used');
            } else {
                this.results.responsive.failed++;
                this.results.responsive.issues.push('Responsive images not implemented');
            }

        } catch (error) {
            this.results.responsive.failed++;
            this.results.responsive.issues.push(`Responsive test error: ${error.message}`);
        }
    }

    async testPerformance() {
        console.log('\n⚡ Testing Performance...');

        try {
            const jsContent = fs.readFileSync(path.join(this.projectRoot, 'js/app.js'), 'utf8');
            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');

            // Error handling
            if (jsContent.includes('try') && jsContent.includes('catch')) {
                this.results.performance.passed++;
                console.log('  ✓ Error handling implemented');
            } else {
                this.results.performance.failed++;
                this.results.performance.issues.push('Missing error handling');
            }

            // Lazy loading
            if (jsContent.includes('IntersectionObserver') || jsContent.includes('lazy')) {
                this.results.performance.passed++;
                console.log('  ✓ Lazy loading implemented');
            } else {
                this.results.performance.failed++;
                this.results.performance.issues.push('Lazy loading not implemented');
            }

            // Event delegation
            if (jsContent.includes('addEventListener') && jsContent.includes('closest')) {
                this.results.performance.passed++;
                console.log('  ✓ Event delegation used');
            } else {
                this.results.performance.failed++;
                this.results.performance.issues.push('Event delegation not optimized');
            }

            // Hardware acceleration
            if (cssContent.includes('transform') || cssContent.includes('opacity')) {
                this.results.performance.passed++;
                console.log('  ✓ Hardware-accelerated CSS properties used');
            } else {
                this.results.performance.failed++;
                this.results.performance.issues.push('Consider using transform/opacity for animations');
            }

            // will-change property
            if (cssContent.includes('will-change')) {
                this.results.performance.passed++;
                console.log('  ✓ CSS will-change optimization used');
            } else {
                this.results.performance.failed++;
                this.results.performance.issues.push('CSS will-change property not used');
            }

        } catch (error) {
            this.results.performance.failed++;
            this.results.performance.issues.push(`Performance test error: ${error.message}`);
        }
    }

    async testUsability() {
        console.log('\n👥 Testing Usability...');

        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
            const jsContent = fs.readFileSync(path.join(this.projectRoot, 'js/app.js'), 'utf8');

            // Clear heading hierarchy
            const h1Count = (indexContent.match(/<h1/g) || []).length;
            if (h1Count === 1) {
                this.results.usability.passed++;
                console.log('  ✓ Single H1 tag present');
            } else {
                this.results.usability.failed++;
                this.results.usability.issues.push(`${h1Count} H1 tags found (expected 1)`);
            }

            // Loading states
            if (jsContent.includes('loading') || indexContent.includes('preloader')) {
                this.results.usability.passed++;
                console.log('  ✓ Loading states implemented');
            } else {
                this.results.usability.failed++;
                this.results.usability.issues.push('Loading states not implemented');
            }

            // Interactive feedback
            const cssContent = fs.readFileSync(path.join(this.projectRoot, 'css/components.css'), 'utf8');
            if (cssContent.includes('hover') || cssContent.includes('transition')) {
                this.results.usability.passed++;
                console.log('  ✓ Interactive feedback present');
            } else {
                this.results.usability.failed++;
                this.results.usability.issues.push('Missing interactive feedback');
            }

            // Button styling
            if (cssContent.includes('cursor: pointer') || indexContent.includes('cursor-pointer')) {
                this.results.usability.passed++;
                console.log('  ✓ Button cursor styling present');
            } else {
                this.results.usability.failed++;
                this.results.usability.issues.push('Buttons may lack proper cursor styling');
            }

            // Color contrast (basic check)
            if (cssContent.includes('text-white') || cssContent.includes('color: white')) {
                this.results.usability.passed++;
                console.log('  ✓ High contrast text colors used');
            } else {
                this.results.usability.failed++;
                this.results.usability.issues.push('Text colors may have insufficient contrast');
            }

        } catch (error) {
            this.results.usability.failed++;
            this.results.usability.issues.push(`Usability test error: ${error.message}`);
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(70));
        console.log('📊 SIMPLE UX TESTING REPORT');
        console.log('='.repeat(70));

        const categories = [
            { name: 'Navigation', results: this.results.navigation },
            { name: 'Accessibility', results: this.results.accessibility },
            { name: 'Responsive Design', results: this.results.responsive },
            { name: 'Performance', results: this.results.performance },
            { name: 'Usability', results: this.results.usability }
        ];

        let totalPassed = 0;
        let totalFailed = 0;
        let allIssues = [];

        categories.forEach(category => {
            const percentage = category.results.passed / (category.results.passed + category.results.failed) * 100 || 0;
            const status = percentage >= 90 ? '✅ EXCELLENT' :
                          percentage >= 75 ? '⚠️  GOOD' :
                          '❌ NEEDS WORK';

            console.log(`\n${status} ${category.name}:`);
            console.log(`   Score: ${percentage.toFixed(1)}% (${category.results.passed}/${category.results.passed + category.results.failed})`);

            if (category.results.issues.length > 0) {
                console.log('   Issues:');
                category.results.issues.forEach(issue => {
                    console.log(`     - ${issue}`);
                    allIssues.push({ category: category.name, issue: issue });
                });
            }

            totalPassed += category.results.passed;
            totalFailed += category.results.failed;
        });

        const overallPercentage = totalPassed / (totalPassed + totalFailed) * 100 || 0;
        const grade = overallPercentage >= 90 ? 'A' :
                     overallPercentage >= 80 ? 'B' :
                     overallPercentage >= 70 ? 'C' :
                     overallPercentage >= 60 ? 'D' : 'F';

        console.log('\n' + '-'.repeat(70));
        console.log('🎯 OVERALL RESULTS');
        console.log('-'.repeat(70));
        console.log(`Overall Score: ${overallPercentage.toFixed(1)}%`);
        console.log(`Grade: ${grade}`);
        console.log(`Total Tests: ${totalPassed + totalFailed}`);
        console.log(`Passed: ${totalPassed}`);
        console.log(`Failed: ${totalFailed}`);
        console.log(`Issues Found: ${allIssues.length}`);

        if (allIssues.length > 0) {
            console.log('\n🔧 PRIORITY FIXES:');
            console.log('1. ' + allIssues.find(i => i.issue.includes('skip'))?.issue || 'All critical issues addressed');
            console.log('2. ' + allIssues.find(i => i.issue.includes('media queries'))?.issue || 'Responsive improvements needed');
            console.log('3. ' + allIssues.find(i => i.issue.includes('focus'))?.issue || 'Accessibility enhancements required');
        }

        console.log('\n📋 Quick Recommendations:');
        if (overallPercentage < 80) {
            console.log('- Focus on critical accessibility and responsive issues');
            console.log('- Add missing navigation and usability features');
        }
        console.log('- Implement loading states and error handling');
        console.log('- Optimize performance with CSS will-change');
        console.log('- Test on real devices and browsers');

        console.log('\n' + '='.repeat(70));
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const test = new SimpleUXTest();
    test.runAllTests().catch(console.error);
}

module.exports = SimpleUXTest;