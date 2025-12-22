# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aegntic.ai is a portfolio website showcasing an independent research foundation focused on AI agent development and simulated societies. The project has undergone a significant architectural transition from React to vanilla JavaScript, with a recent codebase wipe and rebuild phase.

## Architecture & Technology Stack

### Current State (Post-Wipe)
- **Primary Architecture**: Transitioning from React to vanilla JavaScript
- **Existing Assets**:
  - `aegnticdotai-home/` - Contains a working React/TypeScript implementation
  - `blog-entry-extracted/` - Research article/blog entry template with advanced data visualizations
  - `aegntic.ai---blogentry.zip` - Source archive for blog entry style reference

### Blog Entry Architecture (Style Reference)
The blog entry represents the most complete implementation with the following architectural patterns:

**Component Structure:**
- `App.tsx` - Main application with theme switching and background ambience
- `components/Navbar.tsx` - Fixed navigation with mobile responsiveness
- `components/Hero.tsx` - Article header section
- `components/Sidebar.tsx` - Table of contents and metadata
- `components/ArticleContent.tsx` - Main article content with interactive data visualizations
- `components/RelatedArticles.tsx` - Content discovery
- `components/Footer.tsx` - Site footer
- `components/ScrollToTop.tsx` - UI enhancement

**Key Technical Patterns:**
- Theme switching with localStorage persistence
- Lucide React icons for UI elements
- Recharts library for data visualizations
- Tailwind CSS with custom dark theme
- Advanced CSS animations and gradients
- Responsive design with mobile-first approach

**Design System:**
```css
primary: "#00f0ff" (Neon Cyan)
background-dark: "#030305" (Deepest black/blue)
surface-dark: "#0a0a0c"
```

## Development Workflow

### Build Commands
Based on the existing React components:

```bash
# For React/TypeScript development (in aegnticdotai-home/ or blog-entry-extracted/)
npm install
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Key Files for Style Reference
1. **`aegnticdotai-home/index.html`** - Tailwind configuration and custom styles
2. **`blog-entry-extracted/App.tsx`** - Complete application structure
3. **`blog-entry-extracted/components/ArticleContent.tsx`** - Advanced component patterns with data visualization

## Site Architecture & Sitemap

**Focused 5-Page Structure:**

```
├── Home (/) - Hero page (✓ already in codebase)
├── About Us (/about) - aegntic.foundation
│   └── Tagline: "zero knowledge, unlimited insight"
├── Research (/research) - aegntic.research (main blog directory)
├── Projects (/projects) - Project showcase
└── Collaborations (/colabs) - Partner collaborations
```

**Component Patterns to Apply Across Site:**
- Fixed navigation with theme switching
- Hero sections with gradient backgrounds
- Sidebar navigation for content-heavy pages
- Interactive data visualizations for research content
- Responsive design with mobile menu
- Consistent dark/light theme support
- Floating particles and background ambience effects

## Code Style Guidelines

### TypeScript/React Patterns (from blog entry)
- Use functional components with TypeScript interfaces
- Implement responsive design with Tailwind CSS
- Apply consistent spacing and typography
- Use Lucide React for icons
- Implement theme switching with localStorage
- Add hover states and transitions for interactive elements

### CSS Architecture
- Custom Tailwind config with brand colors
- Advanced keyframe animations (float, shimmer, scan effects)
- Gradient overlays and backdrop blur effects
- Metallic text effects for branding
- Tech grid patterns for backgrounds

## Important Notes

- The codebase recently underwent a major wipe (commit: a9fce9d)
- Previous implementation was vanilla JavaScript, now transitioning back to React/TypeScript
- The blog entry represents the most current and complete style reference
- Focus on consistent dark theme with neon cyan accents
- Prioritize mobile responsiveness and accessibility
- Use data visualizations for research and analytics content

## Development Priorities

1. **Reverse engineer blog entry style** for all site pages
2. **Implement consistent component patterns** across the sitemap
3. **Maintain the sophisticated dark theme** with neon accents
4. **Apply the advanced CSS animations** and visual effects site-wide
5. **Ensure responsive design** works across all viewports