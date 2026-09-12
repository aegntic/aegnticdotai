// Start here. Text is rendered as text, never HTML. Use arrays for deliberate line breaks.
// Local images/fonts live in public/; their URLs start with ./ and work at any deployment path.
const origin = 'https://aegntic.ai';
const link = (label, href, newTab = false) => ({ label, href, newTab });
const art = (src, alt, width = 1536, height = 1024) => ({ src, alt, width, height });
const card = (category, title, description, href) => ({ category, title, description, href });

export default {
  brand: {
    name: 'aegntic', label: 'aegntic.ai', home: '#hero',
    logo: './ae-logo.webp', dimensionalLogo: './assets/ae-logo-FINAL-nb.png',
    favicon: './favicon.png', menuEyebrow: 'aegntic / operating surface',
  },
  seo: {
    title: 'aegntic.ai : : Unlimited Insight, Zero Knowledge : : agentic solutions for an ai future.',
    description: 'AI agents, connected workflows and internal tools. Explore the work, use the tools, or build something with Mattae Cooper.',
    // Leave canonical empty until you have the final project URL.
    canonical: `${origin}/`, image: `${origin}/og-aegntic-skeleton.png`, language: 'en',
  },
  theme: {
    paper: '#f7f8f6', ink: '#111719', muted: '#687178', line: '#d9dcda', ghost: '#e4e7e4',
    accent: '#b73512', accentBright: '#ff6338', focus: '#165bcc', surface: '#eef1ef',
    // Replace these with your licensed WOFF2 files; no font service is required.
    bodyFont: { family: 'Inter', src: './fonts/inter-latin.woff2' },
    displayFont: { family: 'Space Grotesk', src: './fonts/space-grotesk-latin.woff2' },
  },
  motion: true,
  hero: {
    label: 'ACCESS', ghost: 'aegntic',
    title: ['Make the work', 'that matters'], emphasis: 'easier to do.',
    description: ['AI agents. Connected workflows. Tools you own.'],
    image: art('./cta-float.webp', 'The original aegntic mascot: a compact, camera-headed robot with a broad mechanical body', 512, 768),
    next: link('...lfg', '#manifesto'), nextLabel: 'Explore systems',
    signature: 'Unlimited Insight, Zero Knowledge',
  },
  // These three positions preserve the alternating original composition. Change the content and IDs freely.
  features: [
    {
      id: 'manifesto', label: 'SYSTEMS', ghost: 'systems', title: ['Make it', 'work together.'],
      description: ['Memory, tools and people.', 'Connected into a working system.'],
      image: art('./assets/worlds/systems-mascot-v2.webp', 'A cohort of compact aegntic mascots coordinating around an open mechanical core'),
      disclosure: { title: 'Cognitive OS', description: 'A specification for persistent agent memory, coordinated execution and verification.', link: link('Explore the system', `${origin}/cognitive-os/`) },
      link: link('All systems', `${origin}/systems/`),
    },
    {
      id: 'agents', label: 'AGENTS', ghost: 'agents', title: ['Give the work', 'an operator.'],
      description: ['An agent with a defined task,', 'the right tools and clear limits.'],
      image: art('./assets/worlds/agents.webp', 'A chrome, cube-headed robot inspecting a transparent tablet'),
      disclosure: { title: 'Echo', description: 'Keeps project evidence separate and prepares written updates for your approval.', link: link('Open Echo', 'https://echo.aegntic.ai/', true) },
      link: link('Build an agent', '#contact'),
    },
    {
      id: 'plugins', label: 'PLUGINS', ghost: 'plugins', title: ['Add a', 'new ability.'],
      description: ['Give the agent you already use', 'a repeatable way to do better work.'],
      image: art('./assets/worlds/plugins-mascot-v2.webp', 'Two compact aegntic mascots fitting a new module into an open mechanism'),
      disclosure: { title: 'aegntic skills', description: 'Installable workflows for research, design, building and verification.', link: link('Browse the skills', `${origin}/skills/`) },
      link: link('All plugins', `${origin}/plugins/`),
    },
  ],
  products: {
    label: 'PRODUCTS', ghost: 'products', title: ['Yours to', 'put to work.'],
    description: ['Choose a tool. See what it does.'],
    image: art('./assets/worlds/products-mascot-v2.webp', 'The compact aegntic mascot offering a completed mechanical module'),
    items: [
      { name: 'Echo', mark: { style: 'echo', lines: ['echo'], accent: '.' }, category: 'Project updates', description: 'Turn project evidence into written updates and proof reels, ready for your approval.', link: link('Open Echo', 'https://echo.aegntic.ai/', true) },
      { name: 'Tab Harvest', mark: { style: 'harvest', lines: ['tab', 'harvest'] }, category: 'Browser research', description: 'Turn open tabs, transcripts and linked sources into a connected knowledge graph.', link: link('View Tab Harvest', 'https://github.com/aegntic/tab-harvest', true) },
      { name: 'Cognitive OS', mark: { style: 'cognitive', lines: ['cognitive', 'OS'] }, category: 'Agent infrastructure', description: 'A shared specification for memory, verification and coordinated execution.', link: link('Read Cognitive OS', `${origin}/cognitive-os/`) },
      { name: 'aegntic skills', mark: { style: 'skills', lines: ['skills'], image: './ae-logo.webp' }, category: 'Repeatable workflows', description: 'Skills that give an agent a method for deciding, making and checking its work.', link: link('Explore the collection', `${origin}/skills/`) },
    ],
  },
  contact: {
    label: 'CONTACT', eyebrow: 'With Mattae Cooper', title: ['What should', 'work better?'],
    description: ['Bring the task, the tangled process', 'or the thing you want to build.'],
    image: art('./cta-reach-arm.png', ''),
    // The template has no enquiry backend. Replace this with your own email or contact page.
    link: link('Work with me', 'mailto:hello@aegntic.com'),
    routes: [link('Agent build', 'mailto:hello@aegntic.com?subject=Agent%20build'), link('Workflow automation', 'mailto:hello@aegntic.com?subject=Workflow%20automation'), link('Internal tool', 'mailto:hello@aegntic.com?subject=Internal%20tool')],
    columns: [
      { label: 'Elsewhere', links: [link('GitHub', 'https://github.com/aegntic'), link('X', 'https://x.com/aegntic_ai')] },
      { label: 'From the practice', links: [link('Research', `${origin}/research/`), link('Project index', `${origin}/projects/`)] },
      { label: 'Collaborate', links: [link('Partnership enquiries', 'mailto:hello@aegntic.com?subject=Partnership'), link('Privacy', `${origin}/privacy/`)] },
    ],
  },
  navigation: [
    { key: 'home', label: 'home', href: '#hero', kicker: 'The shortest route in', title: 'Start with the work.', footerDescription: 'Start with the work.', cards: [card('Position', 'Home', 'What aegntic builds, how it works, and the cleanest way to begin.', '#hero'), card('Proof', 'Selected systems', 'Production work you can open, inspect, and judge for yourself.', '#products'), card('Thinking', 'Research', 'Notes on agents, architecture, privacy, and production reality.', `${origin}/research/`)] },
    { key: 'systems', label: 'systems', href: '#manifesto', kicker: 'Infrastructure that remembers', title: 'Systems for durable work.', footerDescription: 'Connect the workflow.', cards: [card('Operating system', 'Cognitive OS', 'A multi-harness execution stack with memory, verification, and safety gates.', `${origin}/cognitive-os/`), card('Coordination', 'clawREFORM', 'A self-evolving agent operating system for coordinated work.', 'https://clawreform.com'), card('Memory', 'Prologue', 'Discovery and memory infrastructure that cuts repeat setup from the stack.', 'https://logue.pro')] },
    { key: 'agents', label: 'agents', href: '#agents', kicker: 'Purpose-built operators', title: 'Agents with a real job.', footerDescription: 'Give work an operator.', cards: [card('Project updates', 'Echo', 'Keeps project evidence separate and prepares updates for your approval.', 'https://echo.aegntic.ai/'), card('Evidence', 'veritas-operator', 'Coordinates retrieval, synthesis, and verification as one research pipeline.', `${origin}/projects/veritas-operator/`), card('Sovereign memory', 'obsidian-indexer', 'Turns local vaults into agent-readable, locally controlled memory.', `${origin}/projects/obsidian-indexer/`)] },
    { key: 'plugins', label: 'plugins', href: '#plugins', kicker: 'Capability, packaged', title: 'Install better judgment.', footerDescription: 'Add a new ability.', cards: [card('Workflows', 'aegntic Skills', 'Production playbooks for deciding, building, checking, and shipping.', `${origin}/skills/`), card('Research', 'Tab Harvest', 'Turns open browser work into structured intelligence and a knowledge graph.', 'https://github.com/aegntic/tab-harvest'), card('Visual tooling', 'mcp.graphics', 'A graphics-focused MCP surface for agent-driven visual production.', `${origin}/projects/mcp-graphics/`)] },
    { key: 'products', label: 'products', href: '#products', kicker: 'Clear things you can use', title: 'Products with an outcome.', footerDescription: 'Tools, ready to use.', cards: [card('Browser research', 'Tab Harvest', 'Open tabs and transcripts, connected into a knowledge graph.', 'https://github.com/aegntic/tab-harvest'), card('Developer ecosystem', 'CLDCDE', 'Tools, patterns, and infrastructure for agentic development.', 'https://cldcde.cc'), card('Failure intelligence', 'prompt.fail', 'A public surface for prompt failures and agent edge cases.', 'https://prompt.fail')] },
    { key: 'contact', label: 'contact', href: '#contact', kicker: 'One accountable builder', title: 'Bring the bottleneck.', footerDescription: 'Bring the next idea.', cards: [card('Build', 'Agent build', 'A purpose-built agent for a defined task.', '#contact'), card('Connect', 'Workflow automation', 'Connect repeated steps and fragile hand-offs.', '#contact'), card('Own', 'Internal tool', 'A focused tool shaped around your team.', '#contact')] },
  ],
  menuLinks: [link('Research', `${origin}/research/`), link('Writing', `${origin}/blog/`), link('GitHub', 'https://github.com/aegntic')],
  footer: {
    title: ['Unlimited Insight.', 'Zero Knowledge.'], link: link('Work with me', 'mailto:hello@aegntic.com'),
    secondary: [link('Research', `${origin}/research/`), link('Writing', `${origin}/blog/`), link('Projects', `${origin}/projects/`), link('Privacy', `${origin}/privacy/`)],
    copyright: '© 2026 Mattae Cooper', finalLink: link('GitHub', 'https://github.com/aegntic'),
  },
};
