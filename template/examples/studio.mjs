// A fictional example, with its own brand, content, links, artwork, type and palette.
// Replace all instructional copy and the example.com email before publishing.
import aegntic from '../project.mjs';

const link = (label, href = '#contact') => ({ label, href });
const image = { src: './assets/studio-study.svg', alt: 'An abstract blue circle suspended above a stepped geometric plinth', width: 1536, height: 1024 };
const sections = [
  { id: 'discover', label: 'DISCOVER', ghost: 'discover', title: ['Find the', 'right question.'], description: ['Introduce the problem your project addresses.', 'Explain why it matters in plain language.'], disclosure: { title: 'The starting point', description: 'Replace this with your approach to understanding a brief, a need or a problem.', link: link('Discuss the brief') }, link: link('Start a conversation') },
  { id: 'shape', label: 'SHAPE', ghost: 'shape', title: ['Give the idea', 'a clear form.'], description: ['Show how you approach the work.', 'Keep the detail specific and verifiable.'], disclosure: { title: 'The working process', description: 'Describe what someone can expect from the process. Add evidence from your own project.', link: link('Talk about the process') }, link: link('Explore the next step') },
  { id: 'make', label: 'MAKE', ghost: 'make', title: ['Make something', 'worth keeping.'], description: ['Describe the result in your own terms.', 'Use examples you can stand behind.'], disclosure: { title: 'The finished work', description: 'Replace this with the concrete outcome your work creates, and a useful next action.', link: link('Discuss an outcome') }, link: link('See selected work', '#products') },
];
const products = ['Project one', 'Project two', 'Project three'].map((name, index) => ({
  name, mark: { style: 'text', lines: [name] }, category: `Example 0${index + 1}`,
  description: 'Add a real project, its purpose, your role and a link to the work. This is placeholder content.',
  link: link('Ask about this project'),
}));

export default {
  ...aegntic,
  brand: { name: 'Studio example', label: 'Studio / example', home: '#hero', logo: '', dimensionalLogo: '', favicon: './assets/studio-study.svg', menuEyebrow: 'Studio / example configuration' },
  seo: { title: 'Studio example — reusable site template', description: 'A fictional studio configuration demonstrating how to adapt the aegntic layout to another project.', canonical: '', image: '', language: 'en' },
  theme: { ...aegntic.theme, paper: '#f3f6f8', ink: '#182c3c', muted: '#536977', line: '#c9d4dc', ghost: '#dce5eb', accent: '#245f89', accentBright: '#96caec', focus: '#245f89', surface: '#e7eef3', bodyFont: { family: 'Space Grotesk', src: './fonts/space-grotesk-latin.woff2' }, displayFont: { family: 'Inter', src: './fonts/inter-latin.woff2' } },
  hero: { label: 'EXAMPLE', ghost: 'studio', title: ['Good ideas.'], emphasis: 'Given shape.', description: ['A fictional studio. A starting point for your own work.'], image, next: link('Take a look', '#discover'), nextLabel: 'Explore the example', signature: 'Replace the copy. Make it yours.' },
  features: sections.map(section => ({ ...section, image })),
  products: { label: 'WORK', ghost: 'selected', title: ['A place for', 'your best work.'], description: ['Three example entries, ready to replace.'], image, items: products },
  contact: {
    label: 'CONTACT', eyebrow: 'Your name or team', title: ['What are', 'you working on?'],
    description: ['Set your own contact route below.', 'This example opens your email app.'], image,
    link: link('Say hello', 'mailto:hello@example.com'), routes: [],
    columns: [
      { label: 'The approach', links: [link('Discover', '#discover'), link('Shape', '#shape')] },
      { label: 'The work', links: [link('Make', '#make'), link('Selected work', '#products')] },
      { label: 'Get in touch', links: [link('hello@example.com', 'mailto:hello@example.com')] },
    ],
  },
  navigation: [
    { key: 'home', label: 'home', href: '#hero', kicker: 'Example configuration', title: 'Good ideas. Given shape.', footerDescription: 'Meet the example.', cards: [{ category: 'Start here', title: 'Make it yours', description: 'A different project using the same layout and components.', href: '#hero' }] },
    ...sections.map(section => ({ key: section.id, label: section.id, href: `#${section.id}`, kicker: 'Example approach', title: section.title.join(' '), footerDescription: section.disclosure.title, cards: [{ category: 'A starting point', title: section.disclosure.title, description: section.disclosure.description, href: `#${section.id}` }] })),
    { key: 'work', label: 'work', href: '#products', kicker: 'Example portfolio', title: 'A place for your best work.', footerDescription: 'Add real projects here.', cards: products.map(item => ({ category: item.category, title: item.name, description: item.description, href: '#products' })) },
    { key: 'contact', label: 'contact', href: '#contact', kicker: 'Begin a conversation', title: 'What are you working on?', footerDescription: 'Start a conversation.', cards: [{ category: 'Example address', title: 'Say hello', description: 'Replace hello@example.com with your own address before publishing.', href: 'mailto:hello@example.com' }] },
  ],
  menuLinks: [link('Selected work', '#products'), link('Contact', '#contact')],
  footer: { title: ['Good ideas.', 'Given shape.'], link: link('Say hello', 'mailto:hello@example.com'), secondary: [link('Approach', '#discover'), link('Selected work', '#products')], copyright: 'Fictional example. Replace before publishing.', finalLink: link('Back to the start', '#hero') },
};
