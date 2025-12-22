# Aegntic.ai - Independent Research Foundation

> Zero knowledge, unlimited insight

A modern, responsive website showcasing the Aegntic Foundation's research in zero-knowledge cryptography, AI systems, and decentralized technologies.

## 🌟 Features

- **Dark/Light Theme Toggle** - Smooth theme switching with localStorage persistence
- **Modular SPA Architecture** - Single-page application with client-side routing
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Advanced Animations** - Custom CSS animations and visual effects
- **Cloudflare Pages Ready** - Optimized for static site deployment
- **SEO Optimized** - Meta tags and semantic HTML structure

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aegnticdotai.git
   cd aegnticdotai
   ```

2. **Start the development server**
   ```bash
   npm run dev
   # or
   python3 -m http.server 8080
   ```

3. **Open your browser**
   Navigate to `http://localhost:8080`

### Deployment

#### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `/`
4. Deploy!

The `_redirects` file ensures proper SPA routing on Cloudflare Pages.

## 📁 Project Structure

```
aegnticdotai/
├── index.html              # Main HTML file with navigation
├── js/
│   └── app.js             # Main application logic and routing
├── pages/
│   ├── home.html          # Home page with hero section
│   ├── about.html         # About aegntic.foundation
│   ├── research.html      # aegntic.research blog directory
│   ├── projects.html      # Project showcase
│   └── colabs.html        # Collaborations page
├── _redirects             # Cloudflare Pages routing config
├── package.json           # Project metadata
└── README.md             # This file
```

## 🎨 Design System

- **Primary Color**: `#00f0ff` (Neon Cyan)
- **Background Dark**: `#030305` (Deepest black/blue)
- **Surface Dark**: `#0a0a0c`
- **Typography**: Inter (sans-serif), Playfair Display (serif), JetBrains Mono (monospace)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Vanilla JavaScript** - No framework dependencies
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Font Awesome** - Icons and visual elements

## 📱 Pages Overview

### Home (`/`)
Hero page showcasing the foundation's mission and research focus areas with advanced visual effects.

### About (`/about`)
Information about aegntic.foundation with the tagline "zero knowledge, unlimited insight".

### Research (`/research`)
aegntic.research - Blog directory showcasing research papers and publications with filtering capabilities.

### Projects (`/projects`)
Project showcase displaying active and completed research projects with metrics and GitHub links.

### Collaborations (`/colabs`)
Partner collaboration page highlighting industry and academic partnerships.

## 🔧 Configuration

### Adding New Pages

1. Create a new HTML file in the `pages/` directory
2. Add the page route to the `pages` object in `js/app.js`
3. Update the navigation menu in `index.html`

### Customizing Theme

Modify the Tailwind configuration in `index.html`:

```javascript
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00f0ff", // Change primary color
        // ... other customizations
      }
    }
  }
}
```

## 🌐 Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## 📞 Contact

- Website: [aegntic.ai](https://aegntic.ai)
- Research: [aegntic.research](https://aegntic.research)
- Foundation: [aegntic.foundation](https://aegntic.foundation)

---

**Zero knowledge, unlimited insight** © 2024 Aegntic Foundation