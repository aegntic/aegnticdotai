# AE Foundation Website

A futuristic, minimalist website for AE Foundation - an independent research entity focused on foundational architecture for synthetic intelligence.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on all devices
- **Interactive Components**: Dynamic navigation, team carousel, and modal systems
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance Optimized**: Lazy loading, efficient animations, and minimal dependencies
- **Modern Stack**: Uses Tailwind CSS, custom components, and vanilla JavaScript

## 📁 Project Structure

```
aegnticdotai/
├── css/
│   ├── styles.css          # Main styles and typography
│   └── components.css      # Component-specific styles
├── js/
│   └── app.js             # Main application JavaScript
├── components/
│   ├── navigation.html    # Navigation component
│   └── footer.html        # Footer component
├── images/                # Image assets
├── assets/                # Other static assets
├── index.html            # Main HTML file
├── package.json          # Project configuration
└── README.md            # This file
```

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

This starts a development server at `http://localhost:3000` with CORS enabled.

### Production Build
```bash
npm run build
```

This will:
- Minify CSS with PostCSS and CSSO
- Minify JavaScript with Terser
- Optimize assets for production

### Code Quality
```bash
# Lint CSS
npm run lint:css

# Lint JavaScript
npm run lint:js

# Format code
npm run format
```

## 🎨 Design System

### Colors
- **Primary**: `#00E5FF` (Cyan)
- **Secondary**: `#2979FF` (Blue)
- **Accent**: `#00B0FF` (Light Blue)
- **Dark Background**: `#020205`
- **Panel Background**: `rgba(10, 20, 40, 0.4)`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Display Font**: Inter with tracking adjustments
- **Mono Font**: System monospace

### Components

#### Navigation
- Desktop: Fixed sidebar with orbital indicators
- Mobile: Slide-out overlay menu
- Active state with glowing orb animation

#### Holo Cards
- Glassmorphism effect with backdrop blur
- Corner decorations for technical aesthetic
- Hover effects with enhanced glow

#### Team Carousel
- Auto-rotating team member display
- Manual navigation controls
- Smooth transitions

## 🌐 Deployment

### Static Hosting
The site is designed for static hosting. Build the project and deploy the `dist/` folder to any static hosting service.

### Cloudflare Pages
```bash
# Build and deploy to Cloudflare Pages
npm run build
npx wrangler pages deploy ./dist --project-name=aegntic-ai
```

### GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run build
git add dist/
git commit -m "Build for deployment"
git subtree push --prefix dist origin gh-pages
```

### Netlify/Vercel
Connect your repository to Netlify or Vercel for automatic deployment on push.

## ♿ Accessibility

- Full keyboard navigation support
- Screen reader announcements for page changes
- ARIA labels and landmarks
- Focus management in modals
- High contrast support
- Reduced motion support

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📧 Contact

For inquiries about AE Foundation, visit [aegntic.ai](https://aegntic.ai).

---

*AE Foundation - Building the cornerstone of future synthetic intelligence systems*
