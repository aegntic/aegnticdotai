/**
 * ComponentGallery - Main gallery controller
 * Handles component display, filtering, comparison, and selection
 */

import { COMPONENT_DATA, CATEGORIES, getComponentsByCategory, searchComponents } from './ComponentData.js';
import { ConfigGenerator } from './ConfigGenerator.js';

class ComponentGallery {
    constructor() {
        this.components = COMPONENT_DATA;
        this.filteredComponents = Object.values(this.components);
        this.selectedComponents = [];
        this.comparisonComponents = [];
        this.currentView = 'grid';
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.searchQuery = '';
        this.activeComponent = null;
        this.activeVariation = 0;

        this.configGenerator = new ConfigGenerator();
        this.componentInstances = new Map();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderComponentGrid();
        this.updateActiveFilters();
    }

    setupEventListeners() {
        // Category filters
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.setActiveCategory(e.target.dataset.category);
            });
        });

        // Search input
        const searchInput = document.getElementById('search-components');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.applyFilters();
            });
        }

        // Sort dropdown
        const sortSelect = document.getElementById('sort-components');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFilters();
            });
        }

        // View toggle buttons
        const viewToggle = document.getElementById('view-toggle');
        const compareToggle = document.getElementById('compare-toggle');

        if (viewToggle) {
            viewToggle.addEventListener('click', () => this.setGridView());
        }

        if (compareToggle) {
            compareToggle.addEventListener('click', () => this.setComparisonView());
        }

        // Export button
        const exportBtn = document.getElementById('export-config');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.showExportModal());
        }

        // Modal close buttons
        document.querySelectorAll('[onclick*="closePreviewModal"]').forEach(btn => {
            btn.addEventListener('click', () => this.closePreviewModal());
        });

        document.querySelectorAll('[onclick*="closeExportModal"]').forEach(btn => {
            btn.addEventListener('click', () => this.closeExportModal());
        });

        // Comparison controls
        const clearComparison = document.getElementById('clear-comparison');
        const generateComparison = document.getElementById('generate-comparison');

        if (clearComparison) {
            clearComparison.addEventListener('click', () => this.clearComparison());
        }

        if (generateComparison) {
            generateComparison.addEventListener('click', () => this.generateComparisonReport());
        }

        // Preview modal controls
        const compareComponentBtn = document.getElementById('compare-component');
        const selectComponentBtn = document.getElementById('select-component');

        if (compareComponentBtn) {
            compareComponentBtn.addEventListener('click', () => this.addComponentToComparison());
        }

        if (selectComponentBtn) {
            selectComponentBtn.addEventListener('click', () => this.selectCurrentComponent());
        }

        // Export modal controls
        const exportFormat = document.getElementById('export-format');
        const copyConfig = document.getElementById('copy-config');
        const downloadConfig = document.getElementById('download-config');

        if (exportFormat) {
            exportFormat.addEventListener('change', () => this.updateExportPreview());
        }

        if (copyConfig) {
            copyConfig.addEventListener('click', () => this.copyConfiguration());
        }

        if (downloadConfig) {
            downloadConfig.addEventListener('click', () => this.downloadConfiguration());
        }
    }

    setActiveCategory(category) {
        this.currentCategory = category;
        this.applyFilters();

        // Update UI
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.classList.toggle('active', filter.dataset.category === category);
        });
    }

    applyFilters() {
        let components = this.currentCategory === 'all'
            ? Object.values(this.components)
            : getComponentsByCategory(this.currentCategory);

        // Apply search filter
        if (this.searchQuery) {
            components = searchComponents(this.searchQuery);
        }

        // Apply sorting
        switch (this.currentSort) {
            case 'name':
                components.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'category':
                components.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'recent':
                // For demo purposes, reverse the order
                components.reverse();
                break;
        }

        this.filteredComponents = components;
        this.renderComponentGrid();
        this.updateActiveFilters();
    }

    updateActiveFilters() {
        // Update active filters display
        const activeFiltersContainer = document.querySelector('.active-filters');
        if (activeFiltersContainer) {
            let filtersHTML = '';

            if (this.currentCategory !== 'all') {
                filtersHTML += `
                    <span class="filter-badge">
                        ${CATEGORIES[this.currentCategory].name}
                        <span class="filter-badge-remove" onclick="gallery.removeCategoryFilter()">×</span>
                    </span>
                `;
            }

            if (this.searchQuery) {
                filtersHTML += `
                    <span class="filter-badge">
                        Search: "${this.searchQuery}"
                        <span class="filter-badge-remove" onclick="gallery.clearSearch()">×</span>
                    </span>
                `;
            }

            activeFiltersContainer.innerHTML = filtersHTML;
        }

        // Show/hide empty state
        const emptyState = document.getElementById('empty-state');
        const componentGrid = document.getElementById('component-grid');

        if (this.filteredComponents.length === 0) {
            emptyState.classList.remove('hidden');
            componentGrid.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            componentGrid.classList.remove('hidden');
        }
    }

    renderComponentGrid() {
        const grid = document.getElementById('component-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.filteredComponents.forEach((component, index) => {
            const card = this.createComponentCard(component, index);
            grid.appendChild(card);
        });
    }

    createComponentCard(component, index) {
        const card = document.createElement('div');
        card.className = 'component-card';
        card.dataset.componentId = Object.keys(this.components).find(key => this.components[key] === component);
        card.style.animationDelay = `${index * 0.05}s`;

        const isSelected = this.selectedComponents.some(c => c.id === card.dataset.componentId);
        const isInComparison = this.comparisonComponents.some(c => c.id === card.dataset.componentId);

        card.innerHTML = `
            <div class="component-card-header">
                <div class="corner-tl"></div>
                <div class="corner-tr"></div>
                <div class="corner-bl"></div>
                <div class="corner-br"></div>

                ${isSelected ? '<div class="selected-indicator">✓</div>' : ''}
                ${isInComparison ? '<div class="comparison-indicator">In Compare</div>' : ''}

                <div class="component-demo-area">
                    <div class="w-full h-full flex items-center justify-center">
                        <span class="material-symbols-outlined text-4xl text-white/20">
                            ${this.getComponentIcon(component.category)}
                        </span>
                    </div>
                </div>
            </div>

            <div class="component-card-body">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-lg font-semibold text-white">${component.name}</h3>
                    <span class="component-category-badge ${component.category}">
                        ${CATEGORIES[component.category].name}
                    </span>
                </div>

                <p class="text-sm text-gray-400 mb-4 line-clamp-2">${component.description}</p>

                <div class="flex flex-wrap gap-1 mb-4">
                    ${component.tags.map(tag => `
                        <span class="px-2 py-1 text-[8px] font-mono bg-white/5 text-white/60 rounded">
                            #${tag}
                        </span>
                    `).join('')}
                </div>

                <div class="component-card-actions flex gap-2">
                    <button class="action-button" onclick="gallery.previewComponent('${card.dataset.componentId}')" title="Preview">
                        <span class="material-symbols-outlined text-sm">visibility</span>
                    </button>
                    <button class="action-button" onclick="gallery.addToComparison('${card.dataset.componentId}')" title="Compare">
                        <span class="material-symbols-outlined text-sm">compare</span>
                    </button>
                    <button class="action-button" onclick="gallery.selectComponent('${card.dataset.componentId}')" title="Select">
                        <span class="material-symbols-outlined text-sm">check</span>
                    </button>
                </div>
            </div>
        `;

        card.addEventListener('click', () => this.previewComponent(card.dataset.componentId));

        return card;
    }

    getComponentIcon(category) {
        const icons = {
            background: 'wallpaper',
            ui: 'widgets',
            interactive: 'touch_app',
            utility: 'settings'
        };
        return icons[category] || 'extension';
    }

    previewComponent(componentId) {
        this.activeComponent = componentId;
        this.activeVariation = 0;

        const component = this.components[componentId];
        if (!component) return;

        // Update modal content
        document.getElementById('preview-title').textContent = component.name;

        // Render preview
        this.renderComponentPreview(componentId);

        // Render configuration options
        this.renderConfigurationOptions(componentId);

        // Show modal
        document.getElementById('preview-modal').classList.remove('hidden');
    }

    renderComponentPreview(componentId) {
        const container = document.getElementById('preview-container');
        const component = this.components[componentId];
        const variation = component.variations[this.activeVariation];

        // Clean up previous instance
        this.cleanupComponentInstances();

        container.innerHTML = `
            <div class="component-preview-wrapper">
                <div class="preview-controls mb-4 flex gap-2 justify-center">
                    ${component.variations.map((v, i) => `
                        <button
                            class="px-3 py-1 text-xs border border-white/10 rounded ${
                                i === this.activeVariation
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : 'text-white/60 hover:text-white hover:border-white/30'
                                }"
                            onclick="gallery.setVariation(${i})"
                        >
                            ${v.name}
                        </button>
                    `).join('')}
                </div>
                <div id="live-component-demo" class="component-demo-area bg-black/60 border border-white/10 rounded-lg p-6 min-h-[300px]">
                    <!-- Live component will be rendered here -->
                </div>
                <div class="mt-4 text-center">
                    <h4 class="text-sm font-medium text-white/80">${component.name}</h4>
                    <p class="text-xs text-gray-400">${variation.name} variation</p>
                </div>
            </div>
        `;

        // Initialize the live component
        this.initializeLiveComponent(componentId);
    }

    initializeLiveComponent(componentId) {
        const component = this.components[componentId];
        const demoContainer = document.getElementById('live-component-demo');

        if (!demoContainer) return;

        const variation = component.variations[this.activeVariation];

        // Clear previous instances
        this.cleanupComponentInstances();

        try {
            switch (componentId) {
                case 'quantum-grid':
                    this.createQuantumGridDemo(demoContainer, variation.config);
                    break;

                case 'terminal':
                    this.createTerminalDemo(demoContainer, variation.config);
                    break;

                case 'custom-cursor':
                    this.createCustomCursorDemo(demoContainer, variation.config);
                    break;

                case 'preloader':
                    this.createPreloaderDemo(demoContainer, variation.config);
                    break;

                case 'visualizer-toggle':
                    this.createVisualizerToggleDemo(demoContainer, variation.config);
                    break;

                
                default:
                    this.createGenericDemo(demoContainer, component, variation);
                    break;
            }
        } catch (error) {
            console.error(`Failed to initialize component ${componentId}:`, error);
            demoContainer.innerHTML = `
                <div class="text-center">
                    <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
                    <p class="text-sm text-red-400">Failed to load component</p>
                    <p class="text-xs text-gray-400 mt-1">${error.message}</p>
                </div>
            `;
        }
    }

    createQuantumGridDemo(container, config) {
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'relative w-full h-64 bg-black rounded overflow-hidden';
        container.appendChild(canvasContainer);

        const instance = new QuantumGrid(canvasContainer, {
            gridSize: config.gridSize || 60,
            particleCount: config.particleCount || 20, // Reduced for demo
            particleSpeed: config.particleSpeed || 0.5,
            mouseRadius: config.mouseRadius || 100, // Reduced for demo
            lineColor: config.lineColor || 'rgba(0, 229, 255, 0.1)',
            particleColor: config.particleColor || '#00E5FF',
            glowColor: config.glowColor || 'rgba(0, 229, 255, 0.5)'
        });

        this.componentInstances.set('quantum-grid', instance);
    }

    createTerminalDemo(container, config) {
        const terminalContainer = document.createElement('div');
        terminalContainer.className = 'relative w-full h-64 bg-black rounded border border-primary/30';
        container.appendChild(terminalContainer);

        const instance = new Terminal(terminalContainer, {
            title: 'Demo Terminal',
            welcomeMessage: 'This is a demonstration of the Terminal component.\nType "help" to see available commands.',
            prompt: config.prompt || 'demo@terminal:~$',
            commands: {
                help: this.demoTerminalHelp.bind(this),
                about: this.demoTerminalAbout.bind(this),
                clear: () => this.clearTerminalDemo()
            }
        });

        this.componentInstances.set('terminal', instance);
    }

    createCustomCursorDemo(container, config) {
        const cursorDemo = document.createElement('div');
        cursorDemo.className = 'relative w-full h-64 bg-black rounded border border-white/10 flex items-center justify-center cursor-demo-area';
        cursorDemo.innerHTML = `
            <div class="text-center">
                <span class="material-symbols-outlined text-4xl text-white/40 mb-2">mouse</span>
                <p class="text-sm text-white/60">Move your mouse over this area to see the custom cursor</p>
                <div class="mt-4 space-x-4">
                    <button class="demo-button px-4 py-2 bg-primary/20 border border-primary/40 rounded text-primary hover:bg-primary/30">
                        Interactive Button
                    </button>
                    <a href="#" class="demo-link px-4 py-2 bg-white/10 border border-white/20 rounded text-white/80 hover:bg-white/20">
                        Demo Link
                    </a>
                </div>
            </div>
        `;
        container.appendChild(cursorDemo);

        // Initialize cursor with confined area
        const instance = new CustomCursor({
            size: config.size || 20,
            color: config.color || '#00E5FF',
            hoverColor: config.hoverColor || '#ffffff',
            clickColor: config.clickColor || '#ff00ff',
            trailLength: config.trailLength || 3, // Reduced for demo
            speed: 0.2
        });

        // Constrain cursor to demo area
        const setupCursorConstraint = () => {
            cursorDemo.addEventListener('mouseenter', () => {
                instance.show();
            });

            cursorDemo.addEventListener('mouseleave', () => {
                instance.hide();
            });
        };

        setTimeout(setupCursorConstraint, 100);

        this.componentInstances.set('custom-cursor', instance);
    }

    createPreloaderDemo(container, config) {
        const preloaderDemo = document.createElement('div');
        preloaderDemo.className = 'relative w-full h-64 bg-black rounded overflow-hidden';
        container.appendChild(preloaderDemo);

        const instance = new PreLoader({
            minLoadTime: 2000, // Shorter for demo
            maxLoadTime: 3000,
            bootMessages: [
                'Initializing demo preloader...',
                'Loading visual effects...',
                'Configuring animations...',
                'Demo ready.'
            ]
        });

        // Auto-restart demo after completion
        const restartDemo = () => {
            setTimeout(() => {
                if (document.getElementById('live-component-demo')) {
                    const newContainer = document.getElementById('live-component-demo');
                    newContainer.innerHTML = '';
                    this.createPreloaderDemo(newContainer, config);
                }
            }, 1000);
        };

        window.addEventListener('preloaderComplete', restartDemo);

        this.componentInstances.set('preloader', instance);
    }

    createVisualizerToggleDemo(container, config) {
        const toggleDemo = document.createElement('div');
        toggleDemo.className = 'relative w-full h-64 bg-black rounded';
        container.appendChild(toggleDemo);

        const instance = new VisualizerToggle(toggleDemo, {
            position: 'relative',
            features: {
                quantumGrid: true,
                audioPlayer: true,
                customCursor: true,
                animations: true,
                effects: true,
                terminal: true
            }
        });

        this.componentInstances.set('visualizer-toggle', instance);
    }

    
    createGenericDemo(container, component, variation) {
        container.innerHTML = `
            <div class="text-center">
                <div class="w-24 h-24 border border-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span class="material-symbols-outlined text-4xl text-white/40">
                        ${this.getComponentIcon(component.category)}
                    </span>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">${variation.name} Variation</h4>
                <p class="text-sm text-gray-400 mb-4">${component.description}</p>
                <div class="text-xs text-green-400 bg-black/40 p-3 rounded font-mono">
                    <div>Component Type: ${component.category}</div>
                    <div>Class: ${component.className}</div>
                    <div>Configurable: ${component.configSchema ? 'Yes' : 'No'}</div>
                </div>
            </div>
        `;
    }

    // Demo terminal commands
    demoTerminalHelp() {
        const output = document.querySelector('#terminal-output');
        if (output) {
            const line = document.createElement('div');
            line.style.color = '#aaaaff';
            line.innerHTML = `Demo Commands:
  help     - Show this help message
  about    - About this demo
  clear    - Clear the terminal

This is a demo terminal preview from the component gallery.`;
            output.appendChild(line);
        }
    }

    demoTerminalAbout() {
        const output = document.querySelector('#terminal-output');
        if (output) {
            const line = document.createElement('div');
            line.style.color = '#aaaaff';
            line.innerHTML = `Component Gallery Demo Terminal
Version: 1.0.0
Type: Interactive Component Preview

This demonstrates the Terminal component capabilities
including command processing, history, and formatting.
Full terminal supports additional commands and animations.`;
            output.appendChild(line);
            this.scrollToBottom();
        }
    }

    clearTerminalDemo() {
        const output = document.querySelector('#terminal-output');
        if (output) {
            output.innerHTML = '';
        }
    }

    setVariation(index) {
        this.activeVariation = index;
        this.renderComponentPreview(this.activeComponent);
        this.updateCodePreview();
        this.renderConfigurationOptions(this.activeComponent);
    }

    renderConfigurationOptions(componentId) {
        const container = document.getElementById('config-editor');
        const component = this.components[componentId];

        if (!component.configSchema) {
            container.innerHTML = '<p class="text-sm text-gray-400">No configurable options available</p>';
            return;
        }

        let html = '';

        Object.entries(component.configSchema).forEach(([key, schema]) => {
            const variation = component.variations[this.activeVariation];
            const value = variation.config[key];

            html += `
                <div class="config-option">
                    <label class="block text-sm font-medium text-white/80 mb-2">
                        ${schema.label}
                        ${schema.type === 'range' ? `<span class="range-value">${value}</span>` : ''}
                    </label>
            `;

            switch (schema.type) {
                case 'range':
                    html += `
                        <input
                            type="range"
                            min="${schema.min}"
                            max="${schema.max}"
                            step="${schema.step || 1}"
                            value="${value}"
                            data-key="${key}"
                            class="w-full"
                            oninput="gallery.updateConfigValue('${key}', this.value)"
                        >
                    `;
                    break;

                case 'color':
                    html += `
                        <div class="color-picker-wrapper">
                            <div class="color-preview" style="background-color: ${value}"></div>
                            <input
                                type="text"
                                value="${value}"
                                data-key="${key}"
                                class="color-input flex-1"
                                oninput="gallery.updateConfigValue('${key}', this.value)"
                            >
                        </div>
                    `;
                    break;

                case 'checkbox':
                    html += `
                        <label class="flex items-center gap-2">
                            <input
                                type="checkbox"
                                ${value ? 'checked' : ''}
                                data-key="${key}"
                                class="config-checkbox"
                                onchange="gallery.updateConfigValue('${key}', this.checked)"
                            >
                            <span class="text-sm text-white/60">Enable ${schema.label.toLowerCase()}</span>
                        </label>
                    `;
                    break;

                case 'select':
                    html += `
                        <select
                            data-key="${key}"
                            class="w-full"
                            onchange="gallery.updateConfigValue('${key}', this.value)"
                        >
                            ${schema.options.map(option => `
                                <option value="${option}" ${value === option ? 'selected' : ''}>
                                    ${option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            `).join('')}
                        </select>
                    `;
                    break;

                default:
                    html += `
                        <input
                            type="text"
                            value="${value}"
                            data-key="${key}"
                            oninput="gallery.updateConfigValue('${key}', this.value)"
                        >
                    `;
            }

            html += '</div>';
        });

        container.innerHTML = html;
        this.updateCodePreview();
    }

    updateConfigValue(key, value) {
        const component = this.components[this.activeComponent];
        component.variations[this.activeVariation].config[key] = value;

        // Update range value display
        if (component.configSchema[key].type === 'range') {
            const rangeValue = document.querySelector(`[data-key="${key}"] + .range-value`);
            if (rangeValue) rangeValue.textContent = value;
        }

        // Update color preview
        if (component.configSchema[key].type === 'color') {
            const colorPreview = document.querySelector(`[data-key="${key}"] + .color-preview`);
            if (colorPreview) colorPreview.style.backgroundColor = value;
        }

        this.updateCodePreview();
    }

    updateCodePreview() {
        const preview = document.getElementById('code-preview');
        if (!preview || !this.activeComponent) return;

        const component = this.components[this.activeComponent];
        const config = component.variations[this.activeVariation].config;

        preview.textContent = JSON.stringify(config, null, 2);
    }

    addToComparison(componentId) {
        if (this.comparisonComponents.length >= 2) {
            this.comparisonComponents.shift(); // Remove first component
        }

        if (!this.comparisonComponents.find(c => c.id === componentId)) {
            this.comparisonComponents.push({
                id: componentId,
                component: this.components[componentId],
                variation: 0
            });
        }

        this.renderComponentGrid();
    }

    setComparisonView() {
        this.currentView = 'comparison';
        document.getElementById('component-grid').parentElement.classList.add('hidden');
        document.getElementById('comparison-mode').classList.remove('hidden');
        this.renderComparisonView();
    }

    setGridView() {
        this.currentView = 'grid';
        document.getElementById('comparison-mode').classList.add('hidden');
        document.getElementById('component-grid').parentElement.classList.remove('hidden');
    }

    renderComparisonView() {
        const container = document.getElementById('comparison-container');
        container.innerHTML = '';

        // Create two comparison slots
        for (let i = 0; i < 2; i++) {
            const slot = document.createElement('div');
            slot.className = 'comparison-slot';

            if (this.comparisonComponents[i]) {
                slot.classList.add('filled');
                const comp = this.comparisonComponents[i];
                slot.innerHTML = `
                    <div class="remove-from-comparison" onclick="gallery.removeFromComparison(${i})">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </div>
                    <h3 class="text-lg font-semibold text-white mb-2">${comp.component.name}</h3>
                    <p class="text-sm text-gray-400">${comp.component.description}</p>
                    <div class="mt-4">
                        <h4 class="text-sm font-medium text-white/60 mb-2">Configuration:</h4>
                        <pre class="text-xs text-green-400 bg-black/40 p-2 rounded overflow-x-auto">
                            ${JSON.stringify(comp.component.variations[comp.variation].config, null, 2)}
                        </pre>
                    </div>
                `;
            } else {
                slot.innerHTML = `
                    <span class="material-symbols-outlined comparison-slot-empty-icon">add_circle</span>
                    <h3 class="comparison-slot-title">Slot ${i + 1}</h3>
                    <p class="comparison-slot-description">Click a component to add to comparison</p>
                `;
            }

            container.appendChild(slot);
        }
    }

    removeFromComparison(index) {
        this.comparisonComponents.splice(index, 1);
        this.renderComparisonView();
        this.renderComponentGrid();
    }

    clearComparison() {
        this.comparisonComponents = [];
        this.renderComparisonView();
        this.renderComponentGrid();
    }

    selectComponent(componentId) {
        const component = this.components[componentId];
        const selected = {
            id: componentId,
            name: component.name,
            config: component.variations[0].config
        };

        const existingIndex = this.selectedComponents.findIndex(c => c.id === componentId);
        if (existingIndex >= 0) {
            this.selectedComponents.splice(existingIndex, 1);
        } else {
            this.selectedComponents.push(selected);
        }

        this.renderComponentGrid();
    }

    selectCurrentComponent() {
        if (this.activeComponent) {
            const component = this.components[this.activeComponent];
            const selected = {
                id: this.activeComponent,
                name: component.name,
                config: component.variations[this.activeVariation].config,
                variation: this.activeVariation
            };

            const existingIndex = this.selectedComponents.findIndex(c => c.id === this.activeComponent);
            if (existingIndex >= 0) {
                this.selectedComponents[existingIndex] = selected;
            } else {
                this.selectedComponents.push(selected);
            }

            this.closePreviewModal();
            this.renderComponentGrid();
        }
    }

    showExportModal() {
        document.getElementById('export-modal').classList.remove('hidden');
        this.updateExportPreview();
    }

    updateExportPreview() {
        const format = document.getElementById('export-format').value;
        const output = document.getElementById('config-output');

        const config = this.configGenerator.generateConfiguration(
            this.selectedComponents,
            format
        );

        output.textContent = config;
        output.className = `code-preview ${format}`;
    }

    copyConfiguration() {
        const output = document.getElementById('config-output');
        navigator.clipboard.writeText(output.textContent).then(() => {
            // Show success feedback
            const btn = document.getElementById('copy-config');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined align-middle mr-1">check</span>Copied!';
            btn.classList.add('bg-green-500/20', 'border-green-500/50', 'text-green-500');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-500/20', 'border-green-500/50', 'text-green-500');
            }, 2000);
        });
    }

    downloadConfiguration() {
        const format = document.getElementById('export-format').value;
        const output = document.getElementById('config-output').textContent;

        const filename = `component-config.${format}`;
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    }

    generateComparisonReport() {
        if (this.comparisonComponents.length < 2) {
            alert('Please add at least two components to compare');
            return;
        }

        const report = this.configGenerator.generateComparisonReport(this.comparisonComponents);

        // Create modal or show report
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="this.parentElement.remove()"></div>
            <div class="relative h-full overflow-y-auto">
                <div class="container mx-auto px-6 py-20">
                    <div class="holo-card p-8 bg-black/80 max-w-4xl mx-auto">
                        <div class="corner-tl"></div>
                        <div class="corner-tr"></div>
                        <div class="corner-bl"></div>
                        <div class="corner-br"></div>

                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-white">Comparison Report</h2>
                            <button onclick="this.closest('.fixed').remove()" class="text-white/70 hover:text-white">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <pre class="code-preview text-sm">${report}</pre>

                        <div class="mt-6 flex gap-4">
                            <button onclick="navigator.clipboard.writeText(document.querySelector('.code-preview').textContent)"
                                    class="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary hover:bg-primary/20">
                                Copy Report
                            </button>
                            <button onclick="gallery.downloadComparisonReport()"
                                    class="px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent hover:bg-accent/20">
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    downloadComparisonReport() {
        const report = this.configGenerator.generateComparisonReport(this.comparisonComponents);
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'component-comparison-report.txt';
        a.click();

        URL.revokeObjectURL(url);
    }

    // Modal management
    closePreviewModal() {
        document.getElementById('preview-modal').classList.add('hidden');
        this.activeComponent = null;
        this.activeVariation = 0;

        // Clean up any component instances
        this.cleanupComponentInstances();
    }

    closeExportModal() {
        document.getElementById('export-modal').classList.add('hidden');
    }

    cleanupComponentInstances() {
        this.componentInstances.forEach(instance => {
            if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
            }
        });
        this.componentInstances.clear();
    }

    // Filter management
    removeCategoryFilter() {
        this.currentCategory = 'all';
        this.applyFilters();
    }

    clearSearch() {
        this.searchQuery = '';
        document.getElementById('search-components').value = '';
        this.applyFilters();
    }

    addComponentToComparison() {
        if (this.activeComponent) {
            this.addToComparison(this.activeComponent);
            this.closePreviewModal();
            this.setComparisonView();
        }
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new ComponentGallery();

    // Make methods globally accessible for onclick handlers
    window.closePreviewModal = () => window.gallery.closePreviewModal();
    window.closeExportModal = () => window.gallery.closeExportModal();
    window.removeCategoryFilter = () => window.gallery.removeCategoryFilter();
    window.clearSearch = () => window.gallery.clearSearch();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentGallery;
}