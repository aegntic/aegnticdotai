/**
 * Aegntic AI Foundation Website Test Suite
 * Comprehensive testing for website functionality
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class WebsiteTestSuite {
    constructor() {
        this.testResults = {
            fileStructure: { passed: 0, failed: 0, errors: [] },
            htmlValidation: { passed: 0, failed: 0, errors: [] },
            javascriptTests: { passed: 0, failed: 0, errors: [] },
            cssValidation: { passed: 0, failed: 0, errors: [] },
            accessibility: { passed: 0, failed: 0, errors: [] },
            responsive: { passed: 0, failed: 0, errors: [] }
        };
        this.projectRoot = __dirname + '/..';
    }

    async runAllTests() {
        console.log('🔍 Starting Aegntic AI Foundation Website Test Suite...\n');

        console.log('📁 Testing File Structure...');
        await this.testFileStructure();

        console.log('\n📄 Validating HTML Structure...');
        await this.testHTMLValidation();

        console.log('\n⚡ Testing JavaScript Functionality...');
        await this.testJavaScript();

        console.log('\n🎨 Validating CSS...');
        await this.testCSSValidation();

        console.log('\n♿ Testing Accessibility...');
        await this.testAccessibility();

        console.log('\n📱 Testing Responsive Design...');
        await this.testResponsive();

        this.generateReport();
    }

    async testFileStructure() {
        const requiredFiles = [
            'index.html',
            'components/navigation.html',
            'components/footer.html',
            'js/app.js',
            'css/styles.css',
            'css/components.css',
            'package.json',
            'tailwind.config.js',
            'postcss.config.js'
        ];

        requiredFiles.forEach(file => {
            const filePath = path.join(this.projectRoot, file);
            if (fs.existsSync(filePath)) {
                this.testResults.fileStructure.passed++;
                console.log(`  ✓ ${file} exists`);
            } else {
                this.testResults.fileStructure.failed++;
                this.testResults.fileStructure.errors.push(`Missing file: ${file}`);
                console.log(`  ✗ ${file} is missing`);
            }
        });

        // Check CSS file references
        const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');
        const cssReferences = ['css/styles.css', 'css/components.css'];

        cssReferences.forEach(cssFile => {
            if (indexContent.includes(cssFile)) {
                this.testResults.fileStructure.passed++;
                console.log(`  ✓ ${cssFile} is referenced in index.html`);
            } else {
                this.testResults.fileStructure.failed++;
                this.testResults.fileStructure.errors.push(`CSS file not referenced: ${cssFile}`);
                console.log(`  ✗ ${cssFile} is not referenced in index.html`);
            }
        });
    }

    async testHTMLValidation() {
        try {
            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const document = dom.window.document;

            // Test DOCTYPE
            if (document.doctype && document.doctype.name === 'html') {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Valid HTML5 DOCTYPE');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing or invalid DOCTYPE');
                console.log('  ✗ Missing or invalid DOCTYPE');
            }

            // Test meta tags
            const charset = document.querySelector('meta[charset]');
            if (charset && charset.getAttribute('charset') === 'utf-8') {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ UTF-8 charset meta tag present');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing UTF-8 charset meta tag');
                console.log('  ✗ Missing UTF-8 charset meta tag');
            }

            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Viewport meta tag present');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing viewport meta tag');
                console.log('  ✗ Missing viewport meta tag');
            }

            // Test for required elements
            const navigationContainer = document.getElementById('navigation');
            if (navigationContainer) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Navigation container element exists');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing navigation container element');
                console.log('  ✗ Missing navigation container element');
            }

            const footerContainer = document.getElementById('footer');
            if (footerContainer) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Footer container element exists');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing footer container element');
                console.log('  ✗ Missing footer container element');
            }

            // Test for accessibility attributes
            const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
            let hasAccessibleElements = true;

            interactiveElements.forEach(el => {
                if (!el.getAttribute('aria-label') &&
                    !el.getAttribute('aria-labelledby') &&
                    el.textContent.trim() === '') {
                    hasAccessibleElements = false;
                }
            });

            if (hasAccessibleElements) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Interactive elements have accessible labels');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Some interactive elements lack accessible labels');
                console.log('  ⚠ Some interactive elements lack accessible labels');
            }

        } catch (error) {
            this.testResults.htmlValidation.failed++;
            this.testResults.htmlValidation.errors.push(`HTML validation error: ${error.message}`);
            console.log(`  ✗ HTML validation error: ${error.message}`);
        }
    }

    async testJavaScript() {
        try {
            const appJSPath = path.join(this.projectRoot, 'js/app.js');
            const appContent = fs.readFileSync(appJSPath, 'utf8');

            // Test for essential classes
            if (appContent.includes('class AegnticSite')) {
                this.testResults.javascriptTests.passed++;
                console.log('  ✓ AegnticSite class defined');
            } else {
                this.testResults.javascriptTests.failed++;
                this.testResults.javascriptTests.errors.push('Missing AegnticSite class');
                console.log('  ✗ Missing AegnticSite class');
            }

            // Test for essential methods
            const essentialMethods = [
                'loadComponents',
                'setupNavigation',
                'setupMobileMenu',
                'setupTeamCarousel',
                'setupAnimations',
                'setupAccessibility'
            ];

            essentialMethods.forEach(method => {
                if (appContent.includes(method)) {
                    this.testResults.javascriptTests.passed++;
                    console.log(`  ✓ ${method} method defined`);
                } else {
                    this.testResults.javascriptTests.failed++;
                    this.testResults.javascriptTests.errors.push(`Missing method: ${method}`);
                    console.log(`  ✗ Missing method: ${method}`);
                }
            });

            // Test for event listeners
            const eventListeners = [
                'DOMContentLoaded',
                'click',
                'keydown',
                'popstate'
            ];

            eventListeners.forEach(event => {
                if (appContent.includes(`'${event}'`) || appContent.includes(`"${event}"`)) {
                    this.testResults.javascriptTests.passed++;
                    console.log(`  ✓ ${event} event listener present`);
                } else {
                    this.testResults.javascriptTests.failed++;
                    this.testResults.javascriptTests.errors.push(`Missing event listener: ${event}`);
                    console.log(`  ✗ Missing event listener: ${event}`);
                }
            });

            // Test for fetch calls (component loading)
            if (appContent.includes('fetch(')) {
                this.testResults.javascriptTests.passed++;
                console.log('  ✓ Fetch API used for component loading');
            } else {
                this.testResults.javascriptTests.failed++;
                this.testResults.javascriptTests.errors.push('Component loading not implemented');
                console.log('  ✗ Component loading not implemented');
            }

            // Test for error handling
            if (appContent.includes('try') && appContent.includes('catch')) {
                this.testResults.javascriptTests.passed++;
                console.log('  ✓ Error handling implemented');
            } else {
                this.testResults.javascriptTests.failed++;
                this.testResults.javascriptTests.errors.push('Missing error handling');
                console.log('  ✗ Missing error handling');
            }

        } catch (error) {
            this.testResults.javascriptTests.failed++;
            this.testResults.javascriptTests.errors.push(`JavaScript test error: ${error.message}`);
            console.log(`  ✗ JavaScript test error: ${error.message}`);
        }
    }

    async testCSSValidation() {
        try {
            const stylesPath = path.join(this.projectRoot, 'css/styles.css');
            const componentsPath = path.join(this.projectRoot, 'css/components.css');

            const stylesContent = fs.readFileSync(stylesPath, 'utf8');
            const componentsContent = fs.readFileSync(componentsPath, 'utf8');

            // Test for required CSS variables
            if (stylesContent.includes(':root') && stylesContent.includes('--primary-glow')) {
                this.testResults.cssValidation.passed++;
                console.log('  ✓ CSS root variables defined');
            } else {
                this.testResults.cssValidation.failed++;
                this.testResults.cssValidation.errors.push('Missing CSS root variables');
                console.log('  ✗ Missing CSS root variables');
            }

            // Test for required classes
            const requiredClasses = [
                'holo-card',
                'text-liquid-glass',
                'animate-float',
                'animate-pulse',
                'nav-item',
                'mobile-menu-overlay'
            ];

            requiredClasses.forEach(className => {
                if (stylesContent.includes(`.${className}`) || componentsContent.includes(`.${className}`)) {
                    this.testResults.cssValidation.passed++;
                    console.log(`  ✓ .${className} class defined`);
                } else {
                    this.testResults.cssValidation.failed++;
                    this.testResults.cssValidation.errors.push(`Missing class: .${className}`);
                    console.log(`  ✗ Missing class: .${className}`);
                }
            });

            // Test for responsive breakpoints
            if (stylesContent.includes('@media') || componentsContent.includes('@media')) {
                this.testResults.cssValidation.passed++;
                console.log('  ✓ Responsive media queries present');
            } else {
                this.testResults.cssValidation.failed++;
                this.testResults.cssValidation.errors.push('Missing responsive media queries');
                console.log('  ✗ Missing responsive media queries');
            }

            // Test for animation keyframes
            if (stylesContent.includes('@keyframes')) {
                this.testResults.cssValidation.passed++;
                console.log('  ✓ CSS animations defined');
            } else {
                this.testResults.cssValidation.failed++;
                this.testResults.cssValidation.errors.push('Missing CSS animations');
                console.log('  ✗ Missing CSS animations');
            }

        } catch (error) {
            this.testResults.cssValidation.failed++;
            this.testResults.cssValidation.errors.push(`CSS validation error: ${error.message}`);
            console.log(`  ✗ CSS validation error: ${error.message}`);
        }
    }

    async testAccessibility() {
        try {
            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const document = dom.window.document;

            // Test for proper heading hierarchy
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let hasProperHierarchy = true;
            let lastLevel = 0;

            headings.forEach(heading => {
                const level = parseInt(heading.tagName.substring(1));
                if (level - lastLevel > 1 && lastLevel !== 0) {
                    hasProperHierarchy = false;
                }
                lastLevel = level;
            });

            if (hasProperHierarchy && headings.length > 0) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Proper heading hierarchy');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Improper heading hierarchy or missing headings');
                console.log('  ✗ Improper heading hierarchy or missing headings');
            }

            // Test for alt text on images
            const images = document.querySelectorAll('img');
            let hasAltText = true;
            images.forEach(img => {
                if (!img.alt) {
                    hasAltText = false;
                }
            });

            if (images.length === 0 || hasAltText) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Images have alt text');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Missing alt text on images');
                console.log('  ✗ Missing alt text on images');
            }

            // Test for semantic HTML
            const semanticElements = ['header', 'main', 'footer', 'nav', 'section'];
            let hasSemanticElements = false;

            semanticElements.forEach(tag => {
                if (document.querySelector(tag)) {
                    hasSemanticElements = true;
                }
            });

            if (hasSemanticElements) {
                this.testResults.accessibility.passed++;
                console.log('  ✓ Semantic HTML elements used');
            } else {
                this.testResults.accessibility.failed++;
                this.testResults.accessibility.errors.push('Missing semantic HTML elements');
                console.log('  ✗ Missing semantic HTML elements');
            }

        } catch (error) {
            this.testResults.accessibility.failed++;
            this.testResults.accessibility.errors.push(`Accessibility test error: ${error.message}`);
            console.log(`  ✗ Accessibility test error: ${error.message}`);
        }
    }

    async testResponsive() {
        try {
            const stylesPath = path.join(this.projectRoot, 'css/styles.css');
            const componentsPath = path.join(this.projectRoot, 'css/components.css');

            const stylesContent = fs.readFileSync(stylesPath, 'utf8');
            const componentsContent = fs.readFileSync(componentsPath, 'utf8');

            // Test for viewport meta tag
            const dom = await JSDOM.fromFile(path.join(this.projectRoot, 'index.html'));
            const viewport = dom.window.document.querySelector('meta[name="viewport"]');

            if (viewport && viewport.getAttribute('content').includes('width=device-width')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Viewport meta tag configured for responsive design');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Viewport meta tag not properly configured');
                console.log('  ✗ Viewport meta tag not properly configured');
            }

            // Test for responsive breakpoints
            const breakpoints = ['@media (max-width: 768px)', '@media (max-width: 1024px)', '@media (min-width: 640px)'];
            let hasBreakpoints = false;

            breakpoints.forEach(bp => {
                if (stylesContent.includes(bp) || componentsContent.includes(bp)) {
                    hasBreakpoints = true;
                }
            });

            if (hasBreakpoints) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Responsive breakpoints defined');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Missing responsive breakpoints');
                console.log('  ✗ Missing responsive breakpoints');
            }

            // Test for flexible units
            const flexibleUnits = ['rem', 'em', '%', 'vw', 'vh'];
            let hasFlexibleUnits = false;

            flexibleUnits.forEach(unit => {
                if (stylesContent.includes(unit) || componentsContent.includes(unit)) {
                    hasFlexibleUnits = true;
                }
            });

            if (hasFlexibleUnits) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Flexible units used for responsive design');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('No flexible units found');
                console.log('  ✗ No flexible units found');
            }

            // Test for mobile-specific classes
            if (stylesContent.includes('mobile') || componentsContent.includes('mobile')) {
                this.testResults.responsive.passed++;
                console.log('  ✓ Mobile-specific classes defined');
            } else {
                this.testResults.responsive.failed++;
                this.testResults.responsive.errors.push('Missing mobile-specific classes');
                console.log('  ✗ Missing mobile-specific classes');
            }

        } catch (error) {
            this.testResults.responsive.failed++;
            this.testResults.responsive.errors.push(`Responsive test error: ${error.message}`);
            console.log(`  ✗ Responsive test error: ${error.message}`);
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST REPORT SUMMARY');
        console.log('='.repeat(60));

        const categories = [
            { name: 'File Structure', results: this.testResults.fileStructure },
            { name: 'HTML Validation', results: this.testResults.htmlValidation },
            { name: 'JavaScript Tests', results: this.testResults.javascriptTests },
            { name: 'CSS Validation', results: this.testResults.cssValidation },
            { name: 'Accessibility', results: this.testResults.accessibility },
            { name: 'Responsive Design', results: this.testResults.responsive }
        ];

        let totalPassed = 0;
        let totalFailed = 0;

        categories.forEach(category => {
            const percentage = category.results.passed / (category.results.passed + category.results.failed) * 100;
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

        const overallPercentage = totalPassed / (totalPassed + totalFailed) * 100;
        console.log('\n' + '-'.repeat(60));
        console.log(`OVERALL SCORE: ${overallPercentage.toFixed(1)}%`);
        console.log(`Total Tests: ${totalPassed + totalFailed}`);
        console.log(`Passed: ${totalPassed}`);
        console.log(`Failed: ${totalFailed}`);
        console.log('='.repeat(60));

        // Generate HTML report
        this.generateHTMLReport();
    }

    generateHTMLReport() {
        const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aegntic AI Foundation - Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #020205; color: #fff; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #00E5FF; font-size: 2.5em; margin-bottom: 20px; }
        h2 { color: #2979FF; font-size: 1.5em; margin-top: 30px; }
        .summary { background: rgba(5, 10, 20, 0.8); padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .category { background: rgba(5, 10, 20, 0.6); padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #00E5FF; }
        .pass { color: #4CAF50; }
        .fail { color: #f44336; }
        .score { font-size: 1.2em; font-weight: bold; }
        ul { list-style-type: none; padding-left: 0; }
        li { margin: 5px 0; }
        .error { color: #ff9800; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Test Report</h1>
        <div class="summary">
            <h2>Overall Score: <span class="score">${((this.testResults.fileStructure.passed + this.testResults.htmlValidation.passed + this.testResults.javascriptTests.passed + this.testResults.cssValidation.passed + this.testResults.accessibility.passed + this.testResults.responsive.passed) / ((this.testResults.fileStructure.passed + this.testResults.htmlValidation.passed + this.testResults.javascriptTests.passed + this.testResults.cssValidation.passed + this.testResults.accessibility.passed + this.testResults.responsive.passed) + (this.testResults.fileStructure.failed + this.testResults.htmlValidation.failed + this.testResults.javascriptTests.failed + this.testResults.cssValidation.failed + this.testResults.accessibility.failed + this.testResults.responsive.failed)) * 100).toFixed(1)}%</span></h2>
            <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>

        <h2>Test Categories</h2>
        <div class="category">
            <h3>📁 File Structure</h3>
            <p>Passed: <span class="pass">${this.testResults.fileStructure.passed}</span> | Failed: <span class="fail">${this.testResults.fileStructure.failed}</span></p>
            <ul>
                ${this.testResults.fileStructure.errors.map(e => `<li class="error">- ${e}</li>`).join('')}
            </ul>
        </div>

        <div class="category">
            <h3>📄 HTML Validation</h3>
            <p>Passed: <span class="pass">${this.testResults.htmlValidation.passed}</span> | Failed: <span class="fail">${this.testResults.htmlValidation.failed}</span></p>
            <ul>
                ${this.testResults.htmlValidation.errors.map(e => `<li class="error">- ${e}</li>`).join('')}
            </ul>
        </div>

        <div class="category">
            <h3>⚡ JavaScript Tests</h3>
            <p>Passed: <span class="pass">${this.testResults.javascriptTests.passed}</span> | Failed: <span class="fail">${this.testResults.javascriptTests.failed}</span></p>
            <ul>
                ${this.testResults.javascriptTests.errors.map(e => `<li class="error">- ${e}</li>`).join('')}
            </ul>
        </div>

        <div class="category">
            <h3>🎨 CSS Validation</h3>
            <p>Passed: <span class="pass">${this.testResults.cssValidation.passed}</span> | Failed: <span class="fail">${this.testResults.cssValidation.failed}</span></p>
            <ul>
                ${this.testResults.cssValidation.errors.map(e => `<li class="error">- ${e}</li>`).join('')}
            </ul>
        </div>

        <div class="category">
            <h3>♿ Accessibility</h3>
            <p>Passed: <span class="pass">${this.testResults.accessibility.passed}</span> | Failed: <span class="fail">${this.testResults.accessibility.failed}</span></p>
            <ul>
                ${this.testResults.accessibility.errors.map(e => `<li class="error">- ${e}</li>`).join('')}
            </ul>
        </div>

        <div class="category">
            <h3>📱 Responsive Design</h3>
            <p>Passed: <span class="pass">${this.testResults.responsive.passed}</span> | Failed: <span class="fail">${this.testResults.responsive.failed}</span></p>
            <ul>
                ${this.testResults.responsive.errors.map(e => `<li class="error">- ${e}</li>`).join('')}
            </ul>
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(this.projectRoot, 'test-report.html'), htmlReport);
        console.log('\n📄 HTML report generated: test-report.html');
    }
}

// Export for use in other files or direct execution
if (require.main === module) {
    const testSuite = new WebsiteTestSuite();
    testSuite.runAllTests().catch(console.error);
}

module.exports = WebsiteTestSuite;