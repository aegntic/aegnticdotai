# Aegntic.ai - Focused Sitemap

## Primary Navigation Structure

```
├── Home (/) - Hero page (✓ already in codebase)
├── About Us (/about) - aegntic.foundation
│   └── Tagline: "zero knowledge, unlimited insight"
├── Research (/research) - aegntic.research (main blog directory)
├── Projects (/projects) - Project showcase
└── Collaborations (/colabs) - Partner collaborations
```

## Page Specifications

### Home (/)
**Status**: ✅ Already exists in codebase
**Content**: Hero page with research foundation overview
**Style**: Current hero design with advanced animations

### About Us (/about)
**URL**: `aegntic.foundation`
**Tagline**: "zero knowledge, unlimited insight"
**Content Structure**:
- Mission and vision
- Zero-knowledge proof expertise explanation
- Team introduction
- Foundation values and approach
**Style**: Apply blog entry sophistication with academic authority

### Research (/research)
**URL**: `aegntic.research`
**Purpose**: Main blog directory and research publications
**Content Structure**:
- Research article listing (blog directory)
- Category filtering
- Search functionality
- Featured publications
**Style**: Use blog entry components for article listings and detail pages

### Projects (/projects)
**Purpose**: Project showcase and portfolio
**Content Structure**:
- Featured projects grid
- Project detail pages
- Technology stack displays
- Progress metrics and visualizations
**Style**: Data-rich presentations using blog entry chart patterns

### Collaborations (/colabs)
**Purpose**: Partner collaborations and ecosystem
**Content Structure**:
- Partner showcase
- Joint projects
- Collaboration opportunities
- Community engagement
**Style**: Professional networking layout with trust indicators

## Component Reuse Strategy

**From Blog Entry:**
- `Navbar.tsx` - Updated navigation menu
- `ArticleContent.tsx` - Adapted for research articles
- `Sidebar.tsx` - For project/research navigation
- `RelatedArticles.tsx` - Adapted for related projects/colabs
- Data visualization components for project metrics
- Theme switching and responsive design patterns

**New Components Needed:**
- Project showcase cards
- Partner collaboration displays
- Team profile components
- Zero-knowledge concept visualizations

## Implementation Priority

1. **Update Navbar** - Add new navigation items
2. **Create About Us page** - Foundation messaging with tagline
3. **Build Research directory** - Blog-style article listings
4. **Develop Projects showcase** - Project cards and detail pages
5. **Create Colabs page** - Partner collaboration displays

## URL Structure

- Base domain: `aegnticdotai`
- About: `aegntic.foundation` (subdomain or branded section)
- Research: `aegntic.research` (subdomain or branded section)
- Projects: `/projects`
- Collaborations: `/colabs`