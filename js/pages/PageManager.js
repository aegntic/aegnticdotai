/**
 * PageManager - Handles routing and page transitions
 * Manages content loading for different sections
 */
class PageManager {
    constructor(app) {
        this.app = app;
        this.pages = {
            home: null,
            about: null,
            research: null,
            components: null,
            contact: null
        };
        this.currentPage = 'about';
        this.contentContainer = null;
        this.isLoading = false;

        this.init();
    }

    init() {
        this.contentContainer = document.querySelector('.lg\\:pl-24');
        this.setupPageContent();
        this.loadPageContent('about');
    }

    setupPageContent() {
        // Store original about page content
        this.pages.about = this.contentContainer.innerHTML;
    }

    async loadPageContent(pageName) {
        if (this.isLoading) return;
        if (this.pages[pageName] && !this.pages[pageName].content) {
            this.isLoading = true;
            this.showLoadingState();

            try {
                const content = await this.generatePageContent(pageName);
                this.pages[pageName] = { content };
                this.transitionToPage(pageName);
            } catch (error) {
                console.error(`Failed to load page ${pageName}:`, error);
                this.showErrorState(pageName);
            } finally {
                this.isLoading = false;
            }
        } else if (this.pages[pageName]) {
            this.transitionToPage(pageName);
        }
    }

    async generatePageContent(pageName) {
        switch (pageName) {
            case 'home':
                return this.getHomeContent();
            case 'research':
                return this.getResearchContent();
            case 'components':
                return await this.getComponentsContent();
            case 'contact':
                return this.getContactContent();
            default:
                return this.pages.about;
        }
    }

    getHomeContent() {
        return `
        <div class="min-h-screen">
            <!-- Hero Section -->
            <section class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                <div class="absolute right-24 top-1/3 w-96 h-96 border border-primary/10 rounded-full animate-pulse-slow"></div>
                <div class="absolute right-32 top-[20%] w-[1px] h-3/4 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>

                <div class="relative z-10 max-w-6xl text-center">
                    <div class="inline-flex items-center gap-3 mb-8">
                        <div class="flex items-center gap-1">
                            <span class="w-1 h-1 bg-primary rounded-full"></span>
                            <span class="w-1 h-1 bg-primary/50 rounded-full"></span>
                            <span class="w-1 h-1 bg-primary/20 rounded-full"></span>
                        </div>
                        <span class="text-primary font-mono text-[10px] uppercase tracking-[0.3em]">Welcome To</span>
                    </div>

                    <h1 class="text-7xl md:text-9xl lg:text-[10rem] font-bold text-white mb-8 leading-[0.85] tracking-tighter">
                        <span class="text-liquid-glass" data-text="Future">Future</span><br>
                        <span class="text-white">Intelligence</span>
                    </h1>

                    <p class="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                        Pioneering the architectural foundations for synthetic intelligence through rigorous research,
                        ethical frameworks, and long-term vision for a technologically advanced future.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="btn btn-primary px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300" onclick="window.site.navigateToPage('research')">
                            Explore Research
                        </button>
                        <button class="btn px-8 py-3 border border-white/20 text-white hover:border-white/40 transition-all duration-300" onclick="window.site.navigateToPage('about')">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <!-- Quick Stats -->
            <section class="py-24 px-6 md:px-12 lg:px-24 bg-black/40">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div class="text-center">
                        <div class="text-5xl font-bold text-primary mb-2">2021</div>
                        <div class="text-sm font-mono text-gray-500">Founded</div>
                    </div>
                    <div class="text-center">
                        <div class="text-5xl font-bold text-secondary mb-2">120+</div>
                        <div class="text-sm font-mono text-gray-500">Publications</div>
                    </div>
                    <div class="text-center">
                        <div class="text-5xl font-bold text-accent mb-2">4</div>
                        <div class="text-sm font-mono text-gray-500">Global Hubs</div>
                    </div>
                    <div class="text-center">
                        <div class="text-5xl font-bold text-white mb-2">∞</div>
                        <div class="text-sm font-mono text-gray-500">Possibilities</div>
                    </div>
                </div>
            </section>

            <!-- Featured Projects -->
            <section class="py-24 px-6 md:px-12 lg:px-24">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-4xl font-bold text-white mb-12 text-center">
                        Featured <span class="text-primary">Initiatives</span>
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="holo-card p-8 group hover:border-primary/40 transition-all">
                            <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                            <div class="w-16 h-16 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <span class="material-symbols-outlined text-primary text-2xl">psychology</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-4">Neural Architecture</h3>
                            <p class="text-gray-400 mb-6">Developing self-organizing neural networks that evolve and adapt autonomously.</p>
                            <a href="#" class="text-primary font-mono text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                Learn More <span class="material-symbols-outlined text-sm">arrow_outward</span>
                            </a>
                        </div>

                        <div class="holo-card p-8 group hover:border-secondary/40 transition-all">
                            <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                            <div class="w-16 h-16 rounded-full border border-secondary/30 bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                <span class="material-symbols-outlined text-secondary text-2xl">security</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-4">Ethical Framework</h3>
                            <p class="text-gray-400 mb-6">Establishing governance structures for responsible AI development and deployment.</p>
                            <a href="#" class="text-secondary font-mono text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                Learn More <span class="material-symbols-outlined text-sm">arrow_outward</span>
                            </a>
                        </div>

                        <div class="holo-card p-8 group hover:border-accent/40 transition-all">
                            <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                            <div class="w-16 h-16 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                <span class="material-symbols-outlined text-accent text-2xl">hub</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-4">Distributed Systems</h3>
                            <p class="text-gray-400 mb-6">Building resilient, scalable infrastructure for next-generation computing.</p>
                            <a href="#" class="text-accent font-mono text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                                Learn More <span class="material-symbols-outlined text-sm">arrow_outward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>`;
    }

    getResearchContent() {
        return `
        <div class="min-h-screen py-24 px-6 md:px-12 lg:px-24">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-3 mb-6">
                        <div class="flex items-center gap-1">
                            <span class="w-1 h-1 bg-primary rounded-full"></span>
                            <span class="w-1 h-1 bg-primary/50 rounded-full"></span>
                            <span class="w-1 h-1 bg-primary/20 rounded-full"></span>
                        </div>
                        <span class="text-primary font-mono text-[10px] uppercase tracking-[0.3em]">Research Areas</span>
                    </div>

                    <h1 class="text-6xl font-bold text-white mb-8 leading-[0.85] tracking-tighter">
                        <span class="text-liquid-glass" data-text="Research">Research</span>
                    </h1>

                    <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                        Exploring the frontiers of synthetic intelligence through cutting-edge research and innovation.
                    </p>
                </div>

                <!-- Research Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div class="holo-card p-8 h-full">
                        <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-primary">memory</span>
                            </div>
                            <h3 class="text-xl font-bold text-white">Foundation Models</h3>
                        </div>
                        <p class="text-gray-400 mb-4">Developing core reasoning systems and knowledge architectures that form the basis of advanced AI.</p>
                        <ul class="text-sm text-gray-500 space-y-2">
                            <li>• Self-supervised learning protocols</li>
                            <li>• Multi-modal understanding</li>
                            <li>• Transfer learning optimization</li>
                        </ul>
                    </div>

                    <div class="holo-card p-8 h-full">
                        <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-secondary">architecture</span>
                            </div>
                            <h3 class="text-xl font-bold text-white">Neural Architecture</h3>
                        </div>
                        <p class="text-gray-400 mb-4">Designing adaptive network topologies that self-organize and optimize their structure.</p>
                        <ul class="text-sm text-gray-500 space-y-2">
                            <li>• Dynamic topology evolution</li>
                            <li>• Quantum-inspired algorithms</li>
                            <li>• Bio-inspired learning</li>
                        </ul>
                    </div>

                    <div class="holo-card p-8 h-full">
                        <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-accent">balance</span>
                            </div>
                            <h3 class="text-xl font-bold text-white">Ethical AI</h3>
                        </div>
                        <p class="text-gray-400 mb-4">Creating frameworks for value alignment and transparent decision-making in AI systems.</p>
                        <ul class="text-sm text-gray-500 space-y-2">
                            <li>• Value alignment protocols</li>
                            <li>• Explainable AI systems</li>
                            <li>• Governance structures</li>
                        </ul>
                    </div>

                    <div class="holo-card p-8 h-full">
                        <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-green-500">grid_4x4</span>
                            </div>
                            <h3 class="text-xl font-bold text-white">Resilient Computing</h3>
                        </div>
                        <p class="text-gray-400 mb-4">Building fault-tolerant systems that maintain operation under adverse conditions.</p>
                        <ul class="text-sm text-gray-500 space-y-2">
                            <li>• Byzantine fault tolerance</li>
                            <li>• Distributed consensus</li>
                            <li>• Self-healing systems</li>
                        </ul>
                    </div>
                </div>

                <!-- Recent Publications -->
                <div class="holo-card p-8">
                    <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                    <h3 class="text-2xl font-bold text-white mb-8">Recent Publications</h3>

                    <div class="space-y-6">
                        <div class="border-b border-white/5 pb-6">
                            <h4 class="text-lg font-semibold text-white mb-2">"Adaptive Neural Topologies for Self-Organizing Systems"</h4>
                            <p class="text-sm text-gray-500 mb-2">Dr. Aris Thorne, et al. • Nature Machine Intelligence • 2024</p>
                            <p class="text-sm text-gray-400">Novel approach to dynamic network architecture that enables autonomous optimization of neural structures based on task requirements.</p>
                        </div>

                        <div class="border-b border-white/5 pb-6">
                            <h4 class="text-lg font-semibold text-white mb-2">"Ethical Frameworks for Autonomous Decision-Making"</h4>
                            <p class="text-sm text-gray-500 mb-2">Elena Voss, et al. • AI Ethics Journal • 2024</p>
                            <p class="text-sm text-gray-400">Comprehensive governance model for ensuring value alignment in autonomous AI systems operating in complex environments.</p>
                        </div>

                        <div class="pb-6">
                            <h4 class="text-lg font-semibold text-white mb-2">"Quantum-Inspired Algorithms for Pattern Recognition"</h4>
                            <p class="text-sm text-gray-500 mb-2">Kaelen Xy, et al. • Physical Review A • 2023</p>
                            <p class="text-sm text-gray-400">Leveraging quantum mechanical principles to enhance pattern recognition capabilities in classical neural networks.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    async getComponentsContent() {
        try {
            const response = await fetch('pages/component-gallery.html');
            const content = await response.text();
            return content;
        } catch (error) {
            console.error('Failed to load component gallery:', error);
            return `
                <div class="flex items-center justify-center min-h-[60vh]">
                    <div class="text-center">
                        <span class="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                        <h2 class="text-2xl font-bold text-white mb-2">Failed to Load Component Gallery</h2>
                        <p class="text-gray-400">Unable to load the component gallery. Please try again.</p>
                    </div>
                </div>
            `;
        }
    }

    getContactContent() {
        return `
        <div class="min-h-screen py-24 px-6 md:px-12 lg:px-24">
            <div class="max-w-4xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-3 mb-6">
                        <div class="flex items-center gap-1">
                            <span class="w-1 h-1 bg-primary rounded-full"></span>
                            <span class="w-1 h-1 bg-primary/50 rounded-full"></span>
                            <span class="w-1 h-1 bg-primary/20 rounded-full"></span>
                        </div>
                        <span class="text-primary font-mono text-[10px] uppercase tracking-[0.3em]">Get In Touch</span>
                    </div>

                    <h1 class="text-6xl font-bold text-white mb-8 leading-[0.85] tracking-tighter">
                        <span class="text-liquid-glass" data-text="Contact">Contact</span>
                    </h1>

                    <p class="text-xl text-gray-400">
                        Connect with us to explore collaboration opportunities or learn more about our research.
                    </p>
                </div>

                <!-- Contact Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div class="holo-card p-8 h-full">
                        <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                        <h3 class="text-xl font-bold text-white mb-6">General Inquiries</h3>

                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-primary">email</span>
                                <div>
                                    <div class="text-sm text-white">Email</div>
                                    <div class="text-sm text-gray-400">foundation@aegntic.ai</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-primary">language</span>
                                <div>
                                    <div class="text-sm text-white">Website</div>
                                    <div class="text-sm text-gray-400">aegntic.ai</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-primary">location_on</span>
                                <div>
                                    <div class="text-sm text-white">Global HQ</div>
                                    <div class="text-sm text-gray-400">San Francisco, CA</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="holo-card p-8 h-full">
                        <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                        <h3 class="text-xl font-bold text-white mb-6">Research Collaboration</h3>

                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-secondary">school</span>
                                <div>
                                    <div class="text-sm text-white">Academic Partners</div>
                                    <div class="text-sm text-gray-400">research@aegntic.ai</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-secondary">business</span>
                                <div>
                                    <div class="text-sm text-white">Industry Partners</div>
                                    <div class="text-sm text-gray-400">partnerships@aegntic.ai</div>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-secondary">groups</span>
                                <div>
                                    <div class="text-sm text-white">Join Our Team</div>
                                    <div class="text-sm text-gray-400">careers@aegntic.ai</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="holo-card p-8">
                    <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                    <h3 class="text-2xl font-bold text-white mb-8">Send Message</h3>

                    <form class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-mono text-gray-400 mb-2">Name</label>
                                <input type="text" class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your name">
                            </div>
                            <div>
                                <label class="block text-sm font-mono text-gray-400 mb-2">Email</label>
                                <input type="email" class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors" placeholder="your@email.com">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-mono text-gray-400 mb-2">Subject</label>
                            <select class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary/50 transition-colors">
                                <option value="">Select a topic</option>
                                <option value="research">Research Collaboration</option>
                                <option value="partnership">Partnership Opportunity</option>
                                <option value="media">Media Inquiry</option>
                                <option value="general">General Question</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-mono text-gray-400 mb-2">Message</label>
                            <textarea rows="5" class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Your message..."></textarea>
                        </div>

                        <button type="submit" class="w-full md:w-auto px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>

                <!-- Global Hubs -->
                <div class="mt-16">
                    <h3 class="text-2xl font-bold text-white mb-8 text-center">Global Research Hubs</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <span class="material-symbols-outlined text-primary">location_on</span>
                            </div>
                            <h4 class="text-lg font-semibold text-white mb-2">San Francisco</h4>
                            <p class="text-sm text-gray-400">Research Lab Alpha</p>
                        </div>

                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full border border-secondary/30 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                                <span class="material-symbols-outlined text-secondary">location_on</span>
                            </div>
                            <h4 class="text-lg font-semibold text-white mb-2">London</h4>
                            <p class="text-sm text-gray-400">Research Lab Beta</p>
                        </div>

                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                <span class="material-symbols-outlined text-accent">location_on</span>
                            </div>
                            <h4 class="text-lg font-semibold text-white mb-2">Tokyo</h4>
                            <p class="text-sm text-gray-400">Research Lab Gamma</p>
                        </div>

                        <div class="text-center">
                            <div class="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                <span class="material-symbols-outlined text-green-500">location_on</span>
                            </div>
                            <h4 class="text-lg font-semibold text-white mb-2">Zurich</h4>
                            <p class="text-sm text-gray-400">Research Lab Delta</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    showLoadingState() {
        this.contentContainer.style.opacity = '0.5';
    }

    showErrorState(pageName) {
        this.contentContainer.innerHTML = `
            <div class="flex items-center justify-center min-h-[60vh]">
                <div class="text-center">
                    <span class="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                    <h2 class="text-2xl font-bold text-white mb-2">Failed to Load Page</h2>
                    <p class="text-gray-400">Unable to load the ${pageName} page. Please try again.</p>
                </div>
            </div>
        `;
    }

    transitionToPage(pageName) {
        const newContent = this.pages[pageName].content || this.pages.about;

        // Fade out
        this.contentContainer.style.transition = 'opacity 0.3s ease';
        this.contentContainer.style.opacity = '0';

        setTimeout(() => {
            // Update content
            this.contentContainer.innerHTML = newContent;

            // Reinitialize components for new content
            this.app.reinitializeComponents();

            // Fade in
            this.contentContainer.style.opacity = '1';

            this.currentPage = pageName;
        }, 300);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageManager;
}