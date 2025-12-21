/**
 * ComponentData - Component definitions and metadata
 * Contains all available components with their configurations and variations
 */

export const COMPONENT_DATA = {
    // Background Components
    'quantum-grid': {
        name: 'Quantum Grid',
        category: 'background',
        description: 'Interactive animated grid background with particle effects',
        tags: ['animation', 'background', 'interactive', 'particles'],
        className: 'QuantumGrid',
        variations: [
            {
                name: 'Standard',
                config: {
                    gridSize: 60,
                    particleCount: 50,
                    particleSpeed: 0.5,
                    mouseRadius: 150,
                    lineColor: 'rgba(0, 229, 255, 0.1)',
                    particleColor: '#00E5FF',
                    glowColor: 'rgba(0, 229, 255, 0.5)'
                }
            },
            {
                name: 'Minimal',
                config: {
                    gridSize: 80,
                    particleCount: 20,
                    particleSpeed: 0.3,
                    mouseRadius: 100,
                    lineColor: 'rgba(255, 255, 255, 0.05)',
                    particleColor: '#ffffff',
                    glowColor: 'rgba(255, 255, 255, 0.3)'
                }
            },
            {
                name: 'Intense',
                config: {
                    gridSize: 40,
                    particleCount: 100,
                    particleSpeed: 1.0,
                    mouseRadius: 200,
                    lineColor: 'rgba(255, 0, 100, 0.2)',
                    particleColor: '#ff0064',
                    glowColor: 'rgba(255, 0, 100, 0.7)'
                }
            }
        ],
        configSchema: {
            gridSize: { type: 'range', min: 20, max: 100, default: 60, label: 'Grid Size' },
            particleCount: { type: 'range', min: 10, max: 200, default: 50, label: 'Particle Count' },
            particleSpeed: { type: 'range', min: 0.1, max: 2, default: 0.5, step: 0.1, label: 'Particle Speed' },
            mouseRadius: { type: 'range', min: 50, max: 300, default: 150, label: 'Mouse Interaction Radius' },
            lineColor: { type: 'color', default: 'rgba(0, 229, 255, 0.1)', label: 'Grid Line Color' },
            particleColor: { type: 'color', default: '#00E5FF', label: 'Particle Color' },
            glowColor: { type: 'color', default: 'rgba(0, 229, 255, 0.5)', label: 'Glow Color' }
        }
    },

  
    'terminal': {
        name: 'Terminal',
        category: 'ui',
        description: 'Interactive terminal component with command history',
        tags: ['terminal', 'console', 'command-line', 'interactive'],
        className: 'Terminal',
        variations: [
            {
                name: 'Matrix',
                config: {
                    theme: 'matrix',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    textColor: '#00ff00',
                    borderColor: '#00ff00'
                }
            },
            {
                name: 'Cyberpunk',
                config: {
                    theme: 'cyberpunk',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    textColor: '#00E5FF',
                    borderColor: '#00E5FF'
                }
            },
            {
                name: 'Retro',
                config: {
                    theme: 'retro',
                    fontSize: 16,
                    fontFamily: 'Courier New',
                    backgroundColor: 'rgba(20, 20, 20, 0.95)',
                    textColor: '#ffffff',
                    borderColor: '#ffffff'
                }
            }
        ],
        configSchema: {
            theme: {
                type: 'select',
                options: ['matrix', 'cyberpunk', 'retro'],
                default: 'cyberpunk',
                label: 'Theme'
            },
            fontSize: { type: 'range', min: 10, max: 24, default: 14, label: 'Font Size' },
            fontFamily: {
                type: 'select',
                options: ['monospace', 'Courier New', 'Fira Code'],
                default: 'monospace',
                label: 'Font Family'
            },
            backgroundColor: { type: 'color', default: 'rgba(0, 0, 0, 0.95)', label: 'Background Color' },
            textColor: { type: 'color', default: '#00E5FF', label: 'Text Color' },
            borderColor: { type: 'color', default: '#00E5FF', label: 'Border Color' }
        }
    },

    // Interactive Components
    'custom-cursor': {
        name: 'Custom Cursor',
        category: 'interactive',
        description: 'Animated custom cursor with trail effects',
        tags: ['cursor', 'mouse', 'animation', 'effects'],
        className: 'CustomCursor',
        variations: [
            {
                name: 'Neon Circle',
                config: {
                    cursorType: 'circle',
                    size: 20,
                    color: '#00E5FF',
                    borderColor: '#00E5FF',
                    trailEnabled: true,
                    trailLength: 5
                }
            },
            {
                name: 'Minimal Dot',
                config: {
                    cursorType: 'dot',
                    size: 8,
                    color: '#ffffff',
                    borderColor: 'transparent',
                    trailEnabled: false,
                    trailLength: 0
                }
            },
            {
                name: 'Particle Trail',
                config: {
                    cursorType: 'particle',
                    size: 30,
                    color: '#ff0064',
                    borderColor: '#ff0064',
                    trailEnabled: true,
                    trailLength: 10
                }
            }
        ],
        configSchema: {
            cursorType: {
                type: 'select',
                options: ['circle', 'dot', 'particle'],
                default: 'circle',
                label: 'Cursor Type'
            },
            size: { type: 'range', min: 5, max: 50, default: 20, label: 'Size' },
            color: { type: 'color', default: '#00E5FF', label: 'Color' },
            borderColor: { type: 'color', default: '#00E5FF', label: 'Border Color' },
            trailEnabled: { type: 'checkbox', default: true, label: 'Enable Trail' },
            trailLength: { type: 'range', min: 0, max: 20, default: 5, label: 'Trail Length' }
        }
    },

    'visualizer-toggle': {
        name: 'Visualizer Toggle',
        category: 'interactive',
        description: 'Toggle control for visual effects and animations',
        tags: ['toggle', 'control', 'effects', 'settings'],
        className: 'VisualizerToggle',
        variations: [
            {
                name: 'Floating Button',
                config: {
                    position: 'fixed',
                    location: 'bottom-right',
                    style: 'floating',
                    size: 'medium',
                    color: '#00E5FF',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            {
                name: 'Header Toggle',
                config: {
                    position: 'static',
                    location: 'header',
                    style: 'switch',
                    size: 'small',
                    color: '#ffffff',
                    backgroundColor: 'transparent'
                }
            },
            {
                name: 'Sidebar Control',
                config: {
                    position: 'fixed',
                    location: 'right',
                    style: 'slider',
                    size: 'large',
                    color: '#ff0064',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }
            }
        ],
        configSchema: {
            position: {
                type: 'select',
                options: ['fixed', 'static'],
                default: 'fixed',
                label: 'Position'
            },
            location: {
                type: 'select',
                options: ['top-right', 'bottom-right', 'left', 'right', 'header'],
                default: 'bottom-right',
                label: 'Location'
            },
            style: {
                type: 'select',
                options: ['floating', 'switch', 'slider'],
                default: 'floating',
                label: 'Style'
            },
            size: {
                type: 'select',
                options: ['small', 'medium', 'large'],
                default: 'medium',
                label: 'Size'
            },
            color: { type: 'color', default: '#00E5FF', label: 'Color' },
            backgroundColor: { type: 'color', default: 'rgba(0, 0, 0, 0.8)', label: 'Background Color' }
        }
    },

    // Utility Components
    'preloader': {
        name: 'Preloader',
        category: 'utility',
        description: 'Loading screen with progress indicator',
        tags: ['loading', 'preloader', 'progress', 'animation'],
        className: 'PreLoader',
        variations: [
            {
                name: 'Minimal Spinner',
                config: {
                    type: 'spinner',
                    color: '#00E5FF',
                    backgroundColor: '#000000',
                    showProgress: false,
                    animation: 'spin'
                }
            },
            {
                name: 'Progress Bar',
                config: {
                    type: 'progress',
                    color: '#00E5FF',
                    backgroundColor: '#000000',
                    showProgress: true,
                    animation: 'slide'
                }
            },
            {
                name: 'Pulse Logo',
                config: {
                    type: 'logo',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    showProgress: true,
                    animation: 'pulse'
                }
            }
        ],
        configSchema: {
            type: {
                type: 'select',
                options: ['spinner', 'progress', 'logo'],
                default: 'progress',
                label: 'Preloader Type'
            },
            color: { type: 'color', default: '#00E5FF', label: 'Primary Color' },
            backgroundColor: { type: 'color', default: '#000000', label: 'Background Color' },
            showProgress: { type: 'checkbox', default: true, label: 'Show Progress' },
            animation: {
                type: 'select',
                options: ['spin', 'slide', 'pulse', 'fade'],
                default: 'slide',
                label: 'Animation Type'
            }
        }
    }
};

// Export categories for filtering
export const CATEGORIES = {
    all: { name: 'All Components', icon: 'apps' },
    background: { name: 'Backgrounds', icon: 'wallpaper' },
    ui: { name: 'UI Elements', icon: 'widgets' },
    interactive: { name: 'Interactive', icon: 'touch_app' },
    utility: { name: 'Utilities', icon: 'settings' }
};

// Export sort options
export const SORT_OPTIONS = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'category', label: 'Sort by Category' },
    { value: 'recent', label: 'Recently Added' }
];

// Helper functions
export function getComponentsByCategory(category) {
    if (category === 'all') return Object.values(COMPONENT_DATA);
    return Object.values(COMPONENT_DATA).filter(comp => comp.category === category);
}

export function searchComponents(query) {
    const lowercaseQuery = query.toLowerCase();
    return Object.values(COMPONENT_DATA).filter(comp =>
        comp.name.toLowerCase().includes(lowercaseQuery) ||
        comp.description.toLowerCase().includes(lowercaseQuery) ||
        comp.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
}

export function getComponentById(id) {
    return COMPONENT_DATA[id] || null;
}

export function getVariationName(componentId, variationIndex) {
    const component = getComponentById(componentId);
    return component?.variations[variationIndex]?.name || 'Default';
}