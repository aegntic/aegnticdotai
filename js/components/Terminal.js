/**
 * Terminal - Interactive terminal component with command support
 * Provides a retro-futuristic terminal interface
 */
class Terminal {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.terminalElement = null;
        this.outputElement = null;
        this.inputElement = null;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isOpen = false;

        // Default options
        this.options = {
            prompt: 'ae@foundation:~$',
            title: 'AE Foundation Terminal v1.0.3',
            welcomeMessage: 'Welcome to AE Foundation Terminal. Type "help" for available commands.',
            commands: {
                help: this.showHelp.bind(this),
                about: this.showAbout.bind(this),
                research: this.showResearch.bind(this),
                contact: this.showContact.bind(this),
                clear: this.clearTerminal.bind(this),
                status: this.showStatus.bind(this),
                matrix: this.runMatrix.bind(this),
                scan: this.runScan.bind(this)
            },
            ...options
        };

        this.init();
    }

    init() {
        this.createTerminal();
        this.setupEventListeners();
        this.print(this.options.welcomeMessage);
    }

    createTerminal() {
        const terminalHTML = `
            <div class="terminal-container fixed inset-0 z-50 hidden">
                <div class="terminal-overlay absolute inset-0 bg-black/80 backdrop-blur-sm" id="terminal-overlay"></div>
                <div class="terminal relative mx-auto mt-20 max-w-4xl h-[70vh] bg-black border border-primary/30 shadow-2xl">
                    <div class="terminal-header flex items-center justify-between px-4 py-2 bg-gradient-to-r from-black to-gray-900 border-b border-primary/20">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" id="terminal-close"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400"></div>
                            <span class="ml-4 text-xs font-mono text-primary">${this.options.title}</span>
                        </div>
                        <div class="text-xs font-mono text-white/50">AE OS</div>
                    </div>

                    <div class="terminal-body p-4 h-[calc(100%-60px)] overflow-y-auto font-mono text-sm" id="terminal-body">
                        <div class="terminal-output text-green-400 whitespace-pre-wrap" id="terminal-output"></div>
                        <div class="terminal-input-line flex items-center mt-2">
                            <span class="prompt text-primary mr-2">${this.options.prompt}</span>
                            <input type="text" class="terminal-input flex-1 bg-transparent outline-none text-green-400" id="terminal-input" autofocus>
                            <span class="cursor text-green-400 animate-pulse">_</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = terminalHTML;
        this.container.appendChild(tempDiv.firstElementChild);

        // Get references
        this.terminalElement = this.container.querySelector('.terminal-container');
        this.outputElement = this.container.querySelector('#terminal-output');
        this.inputElement = this.container.querySelector('#terminal-input');
        this.overlayElement = this.container.querySelector('#terminal-overlay');
        this.closeBtn = this.container.querySelector('#terminal-close');
    }

    setupEventListeners() {
        // Terminal input
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.inputElement.value);
                this.inputElement.value = '';
                this.historyIndex = -1;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            }
        });

        // Close terminal
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlayElement.addEventListener('click', () => this.close());

        // Global keyboard shortcut (Ctrl+~)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    executeCommand(input) {
        const command = input.trim().toLowerCase();

        // Print the command
        this.print(`${this.options.prompt} ${input}`, 'command');

        // Add to history
        if (command) {
            this.commandHistory.push(input);
        }

        // Execute command
        const [cmd, ...args] = command.split(' ');

        if (this.options.commands[cmd]) {
            this.options.commands[cmd](args);
        } else if (command) {
            this.print(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length - 1;
        }

        this.inputElement.value = this.commandHistory[this.historyIndex] || '';
    }

    autocomplete() {
        const input = this.inputElement.value.toLowerCase();
        const commands = Object.keys(this.options.commands);

        const matches = commands.filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.inputElement.value = matches[0];
        } else if (matches.length > 1) {
            this.print(`Possible commands: ${matches.join(', ')}`, 'info');
        }
    }

    print(text, type = 'output') {
        const line = document.createElement('div');
        line.textContent = text;

        // Set color based on type
        switch (type) {
            case 'command':
                line.style.color = '#00E5FF';
                break;
            case 'error':
                line.style.color = '#ff4444';
                break;
            case 'success':
                line.style.color = '#44ff44';
                break;
            case 'warning':
                line.style.color = '#ffaa00';
                break;
            case 'info':
                line.style.color = '#aaaaff';
                break;
            default:
                line.style.color = '#00ff00';
        }

        this.outputElement.appendChild(line);
        this.scrollToBottom();
    }

    printWithDelay(text, delay = 50) {
        const chars = text.split('');
        let index = 0;

        const typeChar = () => {
            if (index < chars.length) {
                this.outputElement.lastChild.textContent += chars[index];
                index++;
                this.scrollToBottom();
                setTimeout(typeChar, delay);
            }
        };

        this.print('', 'output');
        typeChar();
    }

    scrollToBottom() {
        this.outputElement.parentElement.scrollTop = this.outputElement.parentElement.scrollHeight;
    }

    clearTerminal() {
        this.outputElement.innerHTML = '';
    }

    showHelp() {
        const helpText = `
Available commands:
  help     - Show this help message
  about    - Display information about AE Foundation
  research - View current research areas
  contact  - Show contact information
  status   - Display system status
  clear    - Clear the terminal
  matrix   - Run matrix animation
  scan     - Perform network scan

Use Ctrl+~ to toggle terminal.
        `;
        this.print(helpText.trim());
    }

    showAbout() {
        const aboutText = `
AE Foundation - Established 2021

A research entity focused on foundational architecture for synthetic intelligence.
Our mission is to establish core principles and infrastructure for future technological
advancements through rigorous research and long-term vision.

Core Principles:
• Self-evolving systems
• Ethical design framework
• Foundational resilience
• Distributed intelligence

For more information, visit: https://aegntic.ai
        `;
        this.print(aboutText.trim());
    }

    showResearch() {
        const researchText = `
Current Research Areas:

1. Neural Architecture Evolution
   - Adaptive network topologies
   - Self-organizing systems
   - Quantum-inspired algorithms

2. Foundation Models
   - Core reasoning systems
   - Knowledge distillation
   - Transfer learning protocols

3. Ethical AI Frameworks
   - Value alignment
   - Transparency mechanisms
   - Governance structures

4. Resilient Computing
   - Fault-tolerant systems
   - Distributed consensus
   - Byzantine protocols
        `;
        this.print(researchText.trim());
    }

    showContact() {
        const contactText = `
AE Foundation Contact Information:

Website: https://aegntic.ai
Email: foundation@aegntic.ai

Global Hubs:
• Research Lab Alpha - San Francisco
• Research Lab Beta - London
• Research Lab Gamma - Tokyo
• Research Lab Delta - Zurich

Press Inquiries: press@aegntic.ai
Research Collaboration: research@aegntic.ai
        `;
        this.print(contactText.trim());
    }

    showStatus() {
        const statusText = `
SYSTEM STATUS
============
Uptime: ${Math.floor(Math.random() * 1000)} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}
CPU Load: ${(Math.random() * 100).toFixed(1)}%
Memory Usage: ${(Math.random() * 64).toFixed(1)}GB / 128GB
Network Status: ONLINE
Security Status: SECURE
Active Nodes: ${Math.floor(Math.random() * 1000) + 500}
Data Processed: ${(Math.random() * 1000).toFixed(2)} TB

All systems operational.
        `;
        this.print(statusText.trim());
    }

    runMatrix() {
        this.print('Initializing matrix simulation...', 'info');
        setTimeout(() => {
            this.print('[MATRIX] Activating neural network visualization...', 'success');
            setTimeout(() => {
                this.print('[MATRIX] System online. Enter any key to exit.', 'success');
                this.runMatrixAnimation();
            }, 1000);
        }, 500);
    }

    runMatrixAnimation() {
        const chars = '01';
        let lines = [];
        const lineHeight = 20;
        const columns = Math.floor(this.outputElement.offsetWidth / 10);

        for (let i = 0; i < columns; i++) {
            lines.push({
                x: i * 10,
                y: Math.random() * -500,
                speed: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';

            this.outputElement.parentElement.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = this.outputElement.offsetWidth;
            canvas.height = this.outputElement.offsetHeight;

            let animationId;
            const draw = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#00ff00';
                ctx.font = '10px monospace';

                lines.forEach(line => {
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(char, line.x, line.y);

                    line.y += lineHeight * line.speed;

                    if (line.y > canvas.height + 100) {
                        line.y = Math.random() * -500;
                    }
                });

                animationId = requestAnimationFrame(draw);
            };

            draw();

            // Stop on any key
            const stopMatrix = (e) => {
                cancelAnimationFrame(animationId);
                canvas.remove();
                document.removeEventListener('keydown', stopMatrix);
                this.print('[MATRIX] Simulation terminated.', 'warning');
            };

            setTimeout(() => {
                document.addEventListener('keydown', stopMatrix);
            }, 100);
        };

        animate();
    }

    runScan() {
        this.print('Initiating network scan...', 'info');

        const targets = [
            'node-001.foundation.local',
            'node-002.foundation.local',
            'research-hub.alpha',
            'data-sync.beta',
            'neural-net.gamma',
            'quantum-sim.delta'
        ];

        let index = 0;
        const scanNext = () => {
            if (index < targets.length) {
                const target = targets[index];
                this.print(`Scanning ${target}...`, 'info');

                setTimeout(() => {
                    const status = Math.random() > 0.1 ? 'ONLINE' : 'OFFLINE';
                    const latency = Math.floor(Math.random() * 50) + 10;
                    this.print(`  ✓ ${target} - Status: ${status}, Latency: ${latency}ms`, status === 'ONLINE' ? 'success' : 'error');
                    index++;
                    scanNext();
                }, 500);
            } else {
                this.print('Scan complete. All nodes accounted for.', 'success');
            }
        };

        scanNext();
    }

    open() {
        this.terminalElement.classList.remove('hidden');
        this.isOpen = true;
        this.inputElement.focus();
    }

    close() {
        this.terminalElement.classList.add('hidden');
        this.isOpen = false;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    destroy() {
        if (this.terminalElement && this.terminalElement.parentNode) {
            this.terminalElement.parentNode.removeChild(this.terminalElement);
        }
    }
}

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
    const terminals = document.querySelectorAll('[data-terminal]');
    terminals.forEach(container => {
        const options = container.dataset.terminal ?
            JSON.parse(container.dataset.terminal) : {};
        new Terminal(container, options);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Terminal;
}