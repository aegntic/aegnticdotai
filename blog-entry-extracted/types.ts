export interface ArticleStats {
  simulationTime: string;
  agentsDeployed: string;
  interactions: string;
}

export interface RelatedArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  active?: boolean;
}