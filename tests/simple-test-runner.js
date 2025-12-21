/**
 * Aegntic AI Foundation Website Test Runner
 * Simple testing without external dependencies
 */

const fs = require('fs');
const path = require('path');

class SimpleTestRunner {
    constructor() {
        this.testResults = {
            fileStructure: { passed: 0, failed: 0, errors: [] },
            htmlValidation: { passed: 0, failed: 0, errors: [] },
            javascriptTests: { passed: 0, failed: 0, errors: [] },
            cssValidation: { passed: 0, failed: 0, errors: [] },
            buildProcess: { passed: 0, failed: 0, errors: [] }
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

        console.log('\n🔧 Testing Build Process...');
        await this.testBuildProcess();

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
        try {
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
        } catch (error) {
            console.log(`  ⚠ Could not read index.html: ${error.message}`);
        }
    }

    async testHTMLValidation() {
        try {
            const indexContent = fs.readFileSync(path.join(this.projectRoot, 'index.html'), 'utf8');

            // Test DOCTYPE
            if (indexContent.includes('<!DOCTYPE html>')) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Valid HTML5 DOCTYPE');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing or invalid DOCTYPE');
                console.log('  ✗ Missing or invalid DOCTYPE');
            }

            // Test meta tags
            if (indexContent.includes('charset="utf-8"')) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ UTF-8 charset meta tag present');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing UTF-8 charset meta tag');
                console.log('  ✗ Missing UTF-8 charset meta tag');
            }

            if (indexContent.includes('name="viewport"')) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Viewport meta tag present');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing viewport meta tag');
                console.log('  ✗ Missing viewport meta tag');
            }

            // Test for required elements
            if (indexContent.includes('id="navigation"')) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Navigation container element exists');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing navigation container element');
                console.log('  ✗ Missing navigation container element');
            }

            if (indexContent.includes('id="footer"')) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ Footer container element exists');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('Missing footer container element');
                console.log('  ✗ Missing footer container element');
            }

            // Test for script tag
            if (indexContent.includes('js/app.js')) {
                this.testResults.htmlValidation.passed++;
                console.log('  ✓ JavaScript file is referenced');
            } else {
                this.testResults.htmlValidation.failed++;
                this.testResults.htmlValidation.errors.push('JavaScript file not referenced');
                console.log('  ✗ JavaScript file not referenced');
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
                'keydown'
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

    async testBuildProcess() {
        try {
            // Test package.json scripts
            const packagePath = path.join(this.projectRoot, 'package.json');
            const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

            const requiredScripts = ['start', 'dev', 'build', 'test'];
            requiredScripts.forEach(script => {
                if (packageContent.scripts && packageContent.scripts[script]) {
                    this.testResults.buildProcess.passed++;
                    console.log(`  ✓ "${script}" script defined in package.json`);
                } else {
                    this.testResults.buildProcess.failed++;
                    this.testResults.buildProcess.errors.push(`Missing script: ${script}`);
                    console.log(`  ✗ "${script}" script not defined in package.json`);
                }
            });

            // Test for required dev dependencies
            const requiredDeps = ['tailwindcss', 'postcss', 'autoprefixer'];
            requiredDeps.forEach(dep => {
                if (packageContent.devDependencies && packageContent.devDependencies[dep]) {
                    this.testResults.buildProcess.passed++;
                    console.log(`  ✓ ${dep} dependency present`);
                } else {
                    this.testResults.buildProcess.failed++;
                    this.testResults.buildProcess.errors.push(`Missing dependency: ${dep}`);
                    console.log(`  ✗ ${dep} dependency not present`);
                }
            });

            // Check if input.css exists for Tailwind
            const inputCssPath = path.join(this.projectRoot, 'css/input.css');
            if (fs.existsSync(inputCssPath)) {
                this.testResults.buildProcess.passed++;
                console.log('  ✓ Tailwind input CSS file exists');
            } else {
                this.testResults.buildProcess.failed++;
                this.testResults.buildProcess.errors.push('Missing Tailwind input CSS file');
                console.log('  ✗ Missing Tailwind input CSS file');
            }

            // Check Tailwind config
            const tailwindConfigPath = path.join(this.projectRoot, 'tailwind.config.js');
            if (fs.existsSync(tailwindConfigPath)) {
                const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
                if (tailwindConfig.includes('content:') || tailwindConfig.includes('content: [')) {
                    this.testResults.buildProcess.passed++;
                    console.log('  ✓ Tailwind content paths configured');
                } else {
                    this.testResults.buildProcess.failed++;
                    this.testResults.buildProcess.errors.push('Tailwind content paths not configured');
                    console.log('  ✗ Tailwind content paths not configured');
                }
            }

        } catch (error) {
            this.testResults.buildProcess.failed++;
            this.testResults.buildProcess.errors.push(`Build process test error: ${error.message}`);
            console.log(`  ✗ Build process test error: ${error.message}`);
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
            { name: 'Build Process', results: this.testResults.buildProcess }
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

        // Generate text report file
        const reportContent = this.generateTextReport(categories, overallPercentage, totalPassed, totalFailed);
        fs.writeFileSync(path.join(this.projectRoot, 'test-report.txt'), reportContent);
        console.log('\n📄 Text report generated: test-report.txt');
    }

    generateTextReport(categories, overallPercentage, totalPassed, totalFailed) {
        let report = 'AEGNTIC AI FOUNDATION - WEBSITE TEST REPORT\n';
        report += '='.repeat(50) + '\n\n';
        report += `Overall Score: ${overallPercentage.toFixed(1)}%\n`;
        report += `Total Tests: ${totalPassed + totalFailed}\n`;
        report += `Passed: ${totalPassed}\n`;
        report += `Failed: ${totalFailed}\n\n`;

        categories.forEach(category => {
            const percentage = category.results.passed / (category.results.passed + category.results.failed) * 100 || 0;
            report += `${category.name}:\n`;
            report += `  Passed: ${category.results.passed}\n`;
            report += `  Failed: ${category.results.failed}\n`;
            report += `  Score: ${percentage.toFixed(1)}%\n`;

            if (category.results.errors.length > 0) {
                report += '  Issues:\n';
                category.results.errors.forEach(error => {
                    report += `    - ${error}\n`;
                });
            }
            report += '\n';
        });

        report += `Generated on: ${new Date().toLocaleString()}\n`;

        return report;
    }
}

// Export for use in other files or direct execution
if (require.main === module) {
    const testRunner = new SimpleTestRunner();
    testRunner.runAllTests().catch(console.error);
}

module.exports = SimpleTestRunner;