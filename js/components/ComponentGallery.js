/**
 * Component Gallery System
 * Handles component display, filtering, preview, comparison, and export functionality
 */

class ComponentGallery {
    constructor() {
        this.components = [];
        this.selectedComponents = new Set();
        this.currentCategory = 'all';
        this.comparisonMode = false;
        this.previewModal = null;
        this.comparisonModal = null;
        this.exportModal = null;

        this.init();
    }

    init() {
        this.loadComponents();
        this.setupEventListeners();
        this.initializeModals();
        this.renderComponents();
    }

    /**
     * Load component definitions
     */
    loadComponents() {
        // Define component library
        this.components = [
            // UI Elements
            {
                id: 'btn-primary',
                name: 'Primary Button',
                category: 'ui',
                description: 'Main call-to-action button with hover effects',
                tags: ['button', 'primary', 'interactive'],
                preview: this.getButtonPreview('primary'),
                code: this.getButtonCode('primary'),
                dependencies: [],
                customizable: true
            },
            {
                id: 'btn-secondary',
                name: 'Secondary Button',
                category: 'ui',
                description: 'Secondary action button with subtle styling',
                tags: ['button', 'secondary', 'interactive'],
                preview: this.getButtonPreview('secondary'),
                code: this.getButtonCode('secondary'),
                dependencies: [],
                customizable: true
            },
            {
                id: 'card-component',
                name: 'Holo Card',
                category: 'ui',
                description: 'Futuristic card with holographic borders',
                tags: ['card', 'container', 'holo'],
                preview: this.getCardPreview(),
                code: this.getCardCode(),
                dependencies: ['css/components.css'],
                customizable: true
            },
            {
                id: 'badge-component',
                name: 'Status Badge',
                category: 'ui',
                description: 'Status indicator with different variants',
                tags: ['badge', 'status', 'indicator'],
                preview: this.getBadgePreview(),
                code: this.getBadgeCode(),
                dependencies: [],
                customizable: true
            },

            // Form Elements
            {
                id: 'input-field',
                name: 'Input Field',
                category: 'forms',
                description: 'Stylized text input with focus effects',
                tags: ['input', 'form', 'text'],
                preview: this.getInputPreview(),
                code: this.getInputCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'checkbox-component',
                name: 'Custom Checkbox',
                category: 'forms',
                description: 'Custom styled checkbox with animations',
                tags: ['checkbox', 'form', 'selection'],
                preview: this.getCheckboxPreview(),
                code: this.getCheckboxCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'radio-component',
                name: 'Custom Radio Button',
                category: 'forms',
                description: 'Custom styled radio button group',
                tags: ['radio', 'form', 'selection'],
                preview: this.getRadioPreview(),
                code: this.getRadioCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'dropdown-component',
                name: 'Custom Dropdown',
                category: 'forms',
                description: 'Stylized select dropdown with custom styling',
                tags: ['dropdown', 'select', 'form'],
                preview: this.getDropdownPreview(),
                code: this.getDropdownCode(),
                dependencies: [],
                customizable: true
            },

            // Navigation
            {
                id: 'nav-tabs',
                name: 'Navigation Tabs',
                category: 'navigation',
                description: 'Tabbed navigation with active states',
                tags: ['navigation', 'tabs', 'menu'],
                preview: this.getTabsPreview(),
                code: this.getTabsCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'breadcrumb-nav',
                name: 'Breadcrumb Navigation',
                category: 'navigation',
                description: 'Hierarchical navigation path',
                tags: ['navigation', 'breadcrumb', 'path'],
                preview: this.getBreadcrumbPreview(),
                code: this.getBreadcrumbCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'sidebar-nav',
                name: 'Sidebar Navigation',
                category: 'navigation',
                description: 'Vertical sidebar navigation menu',
                tags: ['navigation', 'sidebar', 'vertical'],
                preview: this.getSidebarPreview(),
                code: this.getSidebarCode(),
                dependencies: [],
                customizable: true
            },

            // Media Components
            {
                id: 'audio-player',
                name: 'Audio Player',
                category: 'media',
                description: 'Futuristic audio player with controls',
                tags: ['audio', 'player', 'media'],
                preview: this.getAudioPlayerPreview(),
                code: this.getAudioPlayerCode(),
                dependencies: ['js/components/AudioPlayer.js'],
                customizable: true
            },
            {
                id: 'video-player',
                name: 'Video Player',
                category: 'media',
                description: 'Custom video player with futuristic controls',
                tags: ['video', 'player', 'media'],
                preview: this.getVideoPlayerPreview(),
                code: this.getVideoPlayerCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'image-gallery',
                name: 'Image Gallery',
                category: 'media',
                description: 'Grid-based image gallery with lightbox',
                tags: ['gallery', 'images', 'media'],
                preview: this.getGalleryPreview(),
                code: this.getGalleryCode(),
                dependencies: [],
                customizable: true
            },

            // Feedback Components
            {
                id: 'toast-notification',
                name: 'Toast Notification',
                category: 'feedback',
                description: 'Slide-in notification with auto-dismiss',
                tags: ['notification', 'toast', 'feedback'],
                preview: this.getToastPreview(),
                code: this.getToastCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'modal-dialog',
                name: 'Modal Dialog',
                category: 'feedback',
                description: 'Overlay modal with backdrop blur',
                tags: ['modal', 'dialog', 'overlay'],
                preview: this.getModalPreview(),
                code: this.getModalCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'progress-bar',
                name: 'Progress Bar',
                category: 'feedback',
                description: 'Animated progress indicator',
                tags: ['progress', 'bar', 'indicator'],
                preview: this.getProgressPreview(),
                code: this.getProgressCode(),
                dependencies: [],
                customizable: true
            },
            {
                id: 'loading-spinner',
                name: 'Loading Spinner',
                category: 'feedback',
                description: 'Animated loading indicator',
                tags: ['loading', 'spinner', 'animation'],
                preview: this.getSpinnerPreview(),
                code: this.getSpinnerCode(),
                dependencies: [],
                customizable: true
            }
        ];
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);
            });
        });

        // Control buttons
        document.getElementById('comparison-mode')?.addEventListener('click', () => {
            this.toggleComparisonMode();
        });

        document.getElementById('select-all')?.addEventListener('click', () => {
            this.selectAllComponents();
        });

        document.getElementById('clear-selection')?.addEventListener('click', () => {
            this.clearSelection();
        });

        document.getElementById('export-config')?.addEventListener('click', () => {
            this.showExportModal();
        });

        document.getElementById('share-config')?.addEventListener('click', () => {
            this.shareConfiguration();
        });
    }

    /**
     * Initialize modals
     */
    initializeModals() {
        this.previewModal = document.getElementById('preview-modal');
        this.comparisonModal = document.getElementById('comparison-modal');
        this.exportModal = document.getElementById('export-modal');
    }

    /**
     * Render components in the grid
     */
    renderComponents() {
        const grid = document.getElementById('component-grid');
        const loadingState = document.getElementById('loading-state');
        const emptyState = document.getElementById('empty-state');

        // Show loading state
        if (loadingState) loadingState.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');

        // Filter components by category
        const filteredComponents = this.currentCategory === 'all'
            ? this.components
            : this.components.filter(comp => comp.category === this.currentCategory);

        // Simulate loading delay
        setTimeout(() => {
            if (loadingState) loadingState.classList.add('hidden');

            if (filteredComponents.length === 0) {
                if (emptyState) emptyState.classList.remove('hidden');
                if (grid) grid.innerHTML = '';
                return;
            }

            if (grid) {
                grid.innerHTML = filteredComponents.map(component => this.renderComponentCard(component)).join('');
                this.attachComponentEventListeners();
            }
        }, 300);
    }

    /**
     * Render individual component card
     */
    renderComponentCard(component) {
        const isSelected = this.selectedComponents.has(component.id);
        const comparisonClass = this.comparisonMode ? 'comparison-mode' : '';

        return `
            <div class="component-card ${comparisonClass}" data-component-id="${component.id}">
                <div class="holo-card p-4 h-full flex flex-col group cursor-pointer">
                    <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>

                    <!-- Selection Checkbox (visible in comparison mode) -->
                    ${this.comparisonMode ? `
                        <div class="absolute top-2 right-2 z-10">
                            <input type="checkbox"
                                   class="component-checkbox"
                                   data-component-id="${component.id}"
                                   ${isSelected ? 'checked' : ''}
                                   onclick="event.stopPropagation()">
                        </div>
                    ` : ''}

                    <!-- Preview Area -->
                    <div class="bg-black/40 rounded-lg p-6 mb-4 min-h-[120px] flex items-center justify-center preview-container">
                        ${component.preview}
                    </div>

                    <!-- Component Info -->
                    <div class="flex-1">
                        <div class="flex items-start justify-between mb-2">
                            <h3 class="text-white font-semibold text-sm">${component.name}</h3>
                            <span class="text-xs font-mono text-primary/70">${component.category}</span>
                        </div>

                        <p class="text-gray-400 text-xs mb-3 line-clamp-2">${component.description}</p>

                        <div class="flex flex-wrap gap-1 mb-3">
                            ${component.tags.map(tag => `
                                <span class="text-xs px-2 py-1 bg-primary/10 text-primary/60 rounded-full font-mono">
                                    ${tag}
                                </span>
                            `).join('')}
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2 mt-auto">
                            <button class="action-btn preview-btn" data-component-id="${component.id}" title="Preview">
                                <span class="material-symbols-outlined text-xs">visibility</span>
                            </button>
                            <button class="action-btn code-btn" data-component-id="${component.id}" title="View Code">
                                <span class="material-symbols-outlined text-xs">code</span>
                            </button>
                            ${component.customizable ? `
                                <button class="action-btn customize-btn" data-component-id="${component.id}" title="Customize">
                                    <span class="material-symbols-outlined text-xs">tune</span>
                                </button>
                            ` : ''}
                            <button class="action-btn add-btn" data-component-id="${component.id}" title="Add to Selection">
                                <span class="material-symbols-outlined text-xs">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners to component cards
     */
    attachComponentEventListeners() {
        // Preview buttons
        document.querySelectorAll('.preview-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const componentId = e.currentTarget.dataset.componentId;
                this.showPreview(componentId);
            });
        });

        // Code buttons
        document.querySelectorAll('.code-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const componentId = e.currentTarget.dataset.componentId;
                this.showCode(componentId);
            });
        });

        // Customize buttons
        document.querySelectorAll('.customize-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const componentId = e.currentTarget.dataset.componentId;
                this.customizeComponent(componentId);
            });
        });

        // Add buttons
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const componentId = e.currentTarget.dataset.componentId;
                this.toggleSelection(componentId);
            });
        });

        // Component checkboxes
        document.querySelectorAll('.component-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const componentId = e.target.dataset.componentId;
                if (e.target.checked) {
                    this.selectedComponents.add(componentId);
                } else {
                    this.selectedComponents.delete(componentId);
                }
            });
        });

        // Card click for preview
        document.querySelectorAll('.component-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.action-btn') && !e.target.closest('.component-checkbox')) {
                    const componentId = card.dataset.componentId;
                    this.showPreview(componentId);
                }
            });
        });
    }

    /**
     * Filter components by category
     */
    filterByCategory(category) {
        this.currentCategory = category;

        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        // Re-render components
        this.renderComponents();
    }

    /**
     * Toggle comparison mode
     */
    toggleComparisonMode() {
        this.comparisonMode = !this.comparisonMode;
        const btn = document.getElementById('comparison-mode');

        if (btn) {
            btn.classList.toggle('active', this.comparisonMode);
        }

        this.renderComponents();

        if (this.comparisonMode) {
            this.showNotification('Comparison mode enabled. Select components to compare.');
        } else {
            this.selectedComponents.clear();
            this.showNotification('Comparison mode disabled.');
        }
    }

    /**
     * Select all visible components
     */
    selectAllComponents() {
        const filteredComponents = this.currentCategory === 'all'
            ? this.components
            : this.components.filter(comp => comp.category === this.currentCategory);

        filteredComponents.forEach(component => {
            this.selectedComponents.add(component.id);
        });

        this.renderComponents();
        this.showNotification(`Selected ${filteredComponents.length} components.`);
    }

    /**
     * Clear component selection
     */
    clearSelection() {
        this.selectedComponents.clear();
        this.renderComponents();
        this.showNotification('Selection cleared.');
    }

    /**
     * Toggle component selection
     */
    toggleSelection(componentId) {
        if (this.selectedComponents.has(componentId)) {
            this.selectedComponents.delete(componentId);
            this.showNotification('Component removed from selection.');
        } else {
            this.selectedComponents.add(componentId);
            this.showNotification('Component added to selection.');
        }

        // Re-render if in comparison mode
        if (this.comparisonMode) {
            this.renderComponents();
        }
    }

    /**
     * Show component preview
     */
    showPreview(componentId) {
        const component = this.components.find(c => c.id === componentId);
        if (!component) return;

        const modal = this.previewModal;
        if (!modal) return;

        // Set title
        document.getElementById('preview-title').textContent = component.name;

        // Set preview content
        document.getElementById('preview-content').innerHTML = `
            <div class="w-full max-w-2xl">
                <div class="holo-card p-8">
                    <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                    <div class="bg-black/40 rounded-lg p-8">
                        ${component.preview}
                    </div>
                </div>
            </div>
        `;

        // Set details
        document.getElementById('preview-details').innerHTML = `
            <div class="space-y-4">
                <div>
                    <h5 class="text-xs font-mono text-primary mb-1">CATEGORY</h5>
                    <p class="text-white">${component.category.toUpperCase()}</p>
                </div>
                <div>
                    <h5 class="text-xs font-mono text-primary mb-1">DESCRIPTION</h5>
                    <p class="text-gray-300">${component.description}</p>
                </div>
                <div>
                    <h5 class="text-xs font-mono text-primary mb-1">TAGS</h5>
                    <div class="flex flex-wrap gap-1">
                        ${component.tags.map(tag => `
                            <span class="text-xs px-2 py-1 bg-primary/10 text-primary/60 rounded-full font-mono">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
                ${component.dependencies.length > 0 ? `
                    <div>
                        <h5 class="text-xs font-mono text-primary mb-1">DEPENDENCIES</h5>
                        <div class="space-y-1">
                            ${component.dependencies.map(dep => `
                                <p class="text-xs text-gray-400 font-mono">${dep}</p>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                <div>
                    <h5 class="text-xs font-mono text-primary mb-1">CUSTOMIZABLE</h5>
                    <p class="text-white">${component.customizable ? 'Yes' : 'No'}</p>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    /**
     * Close preview modal
     */
    closePreview() {
        if (this.previewModal) {
            this.previewModal.classList.add('hidden');
        }
    }

    /**
     * Show component code
     */
    showCode(componentId) {
        const component = this.components.find(c => c.id === componentId);
        if (!component) return;

        // Create code modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="holo-card max-w-4xl w-full max-h-[80vh] overflow-hidden">
                <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                <div class="p-6 h-full flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-white">${component.name} - Code</h3>
                        <button class="modal-close text-white/50 hover:text-white" onclick="this.closest('.fixed').remove()">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div class="flex-1 bg-black/60 rounded-lg p-4 overflow-auto">
                        <pre class="text-sm text-gray-300"><code>${this.escapeHtml(component.code)}</code></pre>
                    </div>
                    <div class="flex gap-3 mt-4">
                        <button onclick="navigator.clipboard.writeText('${this.escapeHtml(component.code)}')" class="btn btn-primary">
                            <span class="material-symbols-outlined">content_copy</span>
                            Copy Code
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Show comparison view
     */
    showComparison() {
        if (this.selectedComponents.size < 2) {
            this.showNotification('Please select at least 2 components to compare.');
            return;
        }

        const modal = this.comparisonModal;
        if (!modal) return;

        const selectedComponents = Array.from(this.selectedComponents).map(id =>
            this.components.find(c => c.id === id)
        );

        const comparisonContent = document.getElementById('comparison-content');
        if (comparisonContent) {
            comparisonContent.innerHTML = selectedComponents.map(component => `
                <div class="holo-card h-full flex flex-col">
                    <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                    <div class="p-4 border-b border-white/10">
                        <h4 class="text-lg font-semibold text-white">${component.name}</h4>
                        <p class="text-xs text-gray-400">${component.category}</p>
                    </div>
                    <div class="flex-1 p-4 overflow-auto">
                        <div class="bg-black/40 rounded-lg p-4 mb-4">
                            ${component.preview}
                        </div>
                        <div class="text-sm space-y-2">
                            <p><strong>Description:</strong> ${component.description}</p>
                            <p><strong>Customizable:</strong> ${component.customizable ? 'Yes' : 'No'}</p>
                            <p><strong>Dependencies:</strong> ${component.dependencies.length || 'None'}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        modal.classList.remove('hidden');
    }

    /**
     * Close comparison modal
     */
    closeComparison() {
        if (this.comparisonModal) {
            this.comparisonModal.classList.add('hidden');
        }
    }

    /**
     * Show export modal
     */
    showExportModal() {
        if (this.selectedComponents.size === 0) {
            this.showNotification('Please select components to export.');
            return;
        }

        if (this.exportModal) {
            this.exportModal.classList.remove('hidden');
        }
    }

    /**
     * Close export modal
     */
    closeExport() {
        if (this.exportModal) {
            this.exportModal.classList.add('hidden');
        }
    }

    /**
     * Perform export
     */
    performExport() {
        const format = document.getElementById('export-format')?.value || 'json';
        const selectedComponents = Array.from(this.selectedComponents).map(id =>
            this.components.find(c => c.id === id)
        );

        let exportData;
        let filename;
        let mimeType;

        switch (format) {
            case 'json':
                exportData = JSON.stringify({
                    components: selectedComponents.map(comp => ({
                        id: comp.id,
                        name: comp.name,
                        code: comp.code,
                        dependencies: comp.dependencies
                    })),
                    timestamp: new Date().toISOString()
                }, null, 2);
                filename = 'component-export.json';
                mimeType = 'application/json';
                break;
            case 'html':
                exportData = this.generateHTMLExport(selectedComponents);
                filename = 'component-export.html';
                mimeType = 'text/html';
                break;
            case 'css':
                exportData = this.generateCSSExport(selectedComponents);
                filename = 'component-export.css';
                mimeType = 'text/css';
                break;
            case 'js':
                exportData = this.generateJSExport(selectedComponents);
                filename = 'component-export.js';
                mimeType = 'application/javascript';
                break;
        }

        this.downloadFile(exportData, filename, mimeType);
        this.closeExport();
        this.showNotification(`Exported ${selectedComponents.length} components as ${filename}`);
    }

    /**
     * Copy to clipboard
     */
    copyToClipboard() {
        const selectedComponents = Array.from(this.selectedComponents).map(id =>
            this.components.find(c => c.id === id)
        );

        const exportData = JSON.stringify({
            components: selectedComponents.map(comp => ({
                id: comp.id,
                name: comp.name,
                code: comp.code,
                dependencies: comp.dependencies
            }))
        }, null, 2);

        navigator.clipboard.writeText(exportData).then(() => {
            this.showNotification('Configuration copied to clipboard!');
        });
    }

    /**
     * Share configuration
     */
    shareConfiguration() {
        if (this.selectedComponents.size === 0) {
            this.showNotification('Please select components to share.');
            return;
        }

        const selectedComponents = Array.from(this.selectedComponents);
        const shareUrl = `${window.location.origin}${window.location.pathname}?components=${selectedComponents.join(',')}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            this.showNotification('Share link copied to clipboard!');
        });
    }

    /**
     * Download file
     */
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Show notification
     */
    showNotification(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 z-50 holo-card px-4 py-3 text-white text-sm animate-slide-in';
        toast.innerHTML = `
            <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
            ${message}
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('animate-slide-out');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    /**
     * Utility functions
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Component preview generators
    getButtonPreview(variant) {
        return `<button class="btn btn-${variant}">Click Me</button>`;
    }

    getButtonCode(variant) {
        return `<button class="btn btn-${variant}">Click Me</button>`;
    }

    getCardPreview() {
        return `
            <div class="holo-card p-4">
                <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
                <h3 class="text-white font-bold mb-2">Card Title</h3>
                <p class="text-gray-400 text-sm">This is a holographic card component with corner accents.</p>
            </div>
        `;
    }

    getCardCode() {
        return `<div class="holo-card p-4">
    <div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>
    <h3 class="text-white font-bold mb-2">Card Title</h3>
    <p class="text-gray-400 text-sm">Card content goes here.</p>
</div>`;
    }

    getBadgePreview() {
        return `
            <div class="flex gap-2">
                <span class="badge badge-success">Success</span>
                <span class="badge badge-warning">Warning</span>
                <span class="badge badge-error">Error</span>
            </div>
        `;
    }

    getBadgeCode() {
        return `<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>`;
    }

    getInputPreview() {
        return `<input type="text" class="input-field" placeholder="Enter text here...">`;
    }

    getInputCode() {
        return `<input type="text" class="input-field" placeholder="Enter text here...">`;
    }

    getCheckboxPreview() {
        return `
            <div class="space-y-2">
                <label class="checkbox-label">
                    <input type="checkbox" class="custom-checkbox">
                    <span>Option 1</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" class="custom-checkbox" checked>
                    <span>Option 2</span>
                </label>
            </div>
        `;
    }

    getCheckboxCode() {
        return `<label class="checkbox-label">
    <input type="checkbox" class="custom-checkbox">
    <span>Option</span>
</label>`;
    }

    getRadioPreview() {
        return `
            <div class="space-y-2">
                <label class="radio-label">
                    <input type="radio" name="example" class="custom-radio" checked>
                    <span>Option 1</span>
                </label>
                <label class="radio-label">
                    <input type="radio" name="example" class="custom-radio">
                    <span>Option 2</span>
                </label>
            </div>
        `;
    }

    getRadioCode() {
        return `<label class="radio-label">
    <input type="radio" name="example" class="custom-radio" checked>
    <span>Option</span>
</label>`;
    }

    getDropdownPreview() {
        return `
            <select class="custom-dropdown">
                <option>Choose an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>
        `;
    }

    getDropdownCode() {
        return `<select class="custom-dropdown">
    <option>Choose an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
</select>`;
    }

    getTabsPreview() {
        return `
            <div class="nav-tabs">
                <button class="tab active">Tab 1</button>
                <button class="tab">Tab 2</button>
                <button class="tab">Tab 3</button>
            </div>
        `;
    }

    getTabsCode() {
        return `<div class="nav-tabs">
    <button class="tab active">Tab 1</button>
    <button class="tab">Tab 2</button>
    <button class="tab">Tab 3</button>
</div>`;
    }

    getBreadcrumbPreview() {
        return `
            <nav class="breadcrumb">
                <a href="#" class="breadcrumb-link">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link">Components</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">Gallery</span>
            </nav>
        `;
    }

    getBreadcrumbCode() {
        return `<nav class="breadcrumb">
    <a href="#" class="breadcrumb-link">Home</a>
    <span class="breadcrumb-separator">/</span>
    <a href="#" class="breadcrumb-link">Components</a>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-current">Gallery</span>
</nav>`;
    }

    getSidebarPreview() {
        return `
            <nav class="sidebar-nav">
                <a href="#" class="sidebar-item active">
                    <span class="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </a>
                <a href="#" class="sidebar-item">
                    <span class="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </a>
            </nav>
        `;
    }

    getSidebarCode() {
        return `<nav class="sidebar-nav">
    <a href="#" class="sidebar-item active">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Dashboard</span>
    </a>
    <a href="#" class="sidebar-item">
        <span class="material-symbols-outlined">settings</span>
        <span>Settings</span>
    </a>
</nav>`;
    }

    getAudioPlayerPreview() {
        return `
            <div class="audio-player">
                <button class="play-btn">
                    <span class="material-symbols-outlined">play_arrow</span>
                </button>
                <div class="audio-info">
                    <div class="track-name">Sample Track</div>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                </div>
            </div>
        `;
    }

    getAudioPlayerCode() {
        return `<div class="audio-player">
    <button class="play-btn">
        <span class="material-symbols-outlined">play_arrow</span>
    </button>
    <div class="audio-info">
        <div class="track-name">Track Name</div>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
    </div>
</div>`;
    }

    getVideoPlayerPreview() {
        return `
            <div class="video-player">
                <div class="video-placeholder">
                    <span class="material-symbols-outlined">play_circle</span>
                </div>
                <div class="video-controls">
                    <button class="control-btn">
                        <span class="material-symbols-outlined">play_arrow</span>
                    </button>
                    <div class="video-progress">
                        <div class="progress"></div>
                    </div>
                </div>
            </div>
        `;
    }

    getVideoPlayerCode() {
        return `<div class="video-player">
    <div class="video-placeholder">
        <span class="material-symbols-outlined">play_circle</span>
    </div>
    <div class="video-controls">
        <button class="control-btn">
            <span class="material-symbols-outlined">play_arrow</span>
        </button>
        <div class="video-progress">
            <div class="progress"></div>
        </div>
    </div>
</div>`;
    }

    getGalleryPreview() {
        return `
            <div class="image-gallery">
                <div class="gallery-grid">
                    <div class="gallery-item">IMG</div>
                    <div class="gallery-item">IMG</div>
                    <div class="gallery-item">IMG</div>
                    <div class="gallery-item">IMG</div>
                </div>
            </div>
        `;
    }

    getGalleryCode() {
        return `<div class="image-gallery">
    <div class="gallery-grid">
        <div class="gallery-item">IMG</div>
        <div class="gallery-item">IMG</div>
        <div class="gallery-item">IMG</div>
        <div class="gallery-item">IMG</div>
    </div>
</div>`;
    }

    getToastPreview() {
        return `
            <div class="toast-notification">
                <span class="material-symbols-outlined">check_circle</span>
                <span>Success! Operation completed.</span>
            </div>
        `;
    }

    getToastCode() {
        return `<div class="toast-notification">
    <span class="material-symbols-outlined">check_circle</span>
    <span>Success! Operation completed.</span>
</div>`;
    }

    getModalPreview() {
        return `
            <div class="modal-dialog">
                <div class="modal-header">
                    <h3>Modal Title</h3>
                    <button class="modal-close">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal content goes here...</p>
                </div>
            </div>
        `;
    }

    getModalCode() {
        return `<div class="modal-dialog">
    <div class="modal-header">
        <h3>Modal Title</h3>
        <button class="modal-close">
            <span class="material-symbols-outlined">close</span>
        </button>
    </div>
    <div class="modal-body">
        <p>Modal content goes here...</p>
    </div>
</div>`;
    }

    getProgressPreview() {
        return `
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress" style="width: 65%"></div>
                </div>
                <span class="progress-text">65%</span>
            </div>
        `;
    }

    getProgressCode() {
        return `<div class="progress-bar-container">
    <div class="progress-bar">
        <div class="progress" style="width: 65%"></div>
    </div>
    <span class="progress-text">65%</span>
</div>`;
    }

    getSpinnerPreview() {
        return `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <span>Loading...</span>
            </div>
        `;
    }

    getSpinnerCode() {
        return `<div class="loading-spinner">
    <div class="spinner"></div>
    <span>Loading...</span>
</div>`;
    }

    // Export generation methods
    generateHTMLExport(components) {
        const componentHTML = components.map(comp => comp.code).join('\n');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Export</title>
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="bg-dark-bg text-gray-200">
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold text-white mb-6">Exported Components</h1>
        ${componentHTML}
    </div>
</body>
</html>`;
    }

    generateCSSExport(components) {
        // Generate CSS for selected components
        return `/* Component Export CSS */
/* Generated on ${new Date().toISOString()} */

/* Base component styles */
.btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #00e5ff;
    color: #000;
}

.btn-secondary {
    background: transparent;
    color: #00e5ff;
    border: 1px solid #00e5ff;
}

.holo-card {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.corner-tl, .corner-tr, .corner-bl, .corner-br {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid #00e5ff;
}

.corner-tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
.corner-tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
.corner-bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
.corner-br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

/* Additional component-specific styles */
`;
    }

    generateJSExport(components) {
        // Generate JavaScript for selected components
        const componentFunctions = components.map(comp => {
            if (comp.id === 'audio-player') {
                return this.getAudioPlayerJS();
            }
            return '';
        }).filter(Boolean).join('\n\n');

        return `// Component Export JavaScript
// Generated on ${new Date().toISOString()}

${componentFunctions}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    console.log('Components initialized');
});
`;
    }

    getAudioPlayerJS() {
        return `// Audio Player Component
class AudioPlayer {
    constructor(container) {
        this.container = container;
        this.isPlaying = false;
        this.initializePlayer();
    }

    initializePlayer() {
        // Audio player initialization code
        const playBtn = this.container.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        // Toggle play/pause state
    }
}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.componentGallery = new ComponentGallery();
});