import React from 'react';
import { ArrowRight, Share2 } from 'lucide-react';
import { RelatedArticle } from '../types';

const articles: RelatedArticle[] = [
  {
    id: '1',
    category: 'Neural Arch',
    title: 'Neural Plasticity in LLMs',
    description: 'Self-correcting mechanisms that simulate biological adaptability in static weights.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMT7ljN0ho4MghYXa1mHD78J5arpM_56PC7S1wJfets8Mu0GX04P1chRQHxYS_WfNplAQCj1wF-ulEe7z962oT5ETHepZ7adcmDnhHfob94tToB3B0LUpQeu6Af5VF0A68aTx9kcTbfS-Qx3Fx3OWXSReXDgvAr-ldWXvWYkmD1Q8ERZF9CSdtUwW-cr_tHvi7p4103XL24UmXdqAxlQ1jmRHarKGXgO2p0iLZWi3eh55T_RVfqOiXuQMwTP2eV0_JRZNOAlHOkwHf',
    link: '#'
  },
  {
    id: '2',
    category: 'Security',
    title: 'Adversarial Robustness 2.0',
    description: 'New defense mechanisms against prompt injection using context filtering.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6mlIGzULKshCt3_jnUOqxmGtS-IUvGcG0z3dohT8ZCXnUqZShriK-P24e5lj8huQ9FtV05orW2wcoswPvom2j6tLM5z7Q5Oyd1AxgcSVjGB_tLbxgJSpMjUKGjybrekilcx3XmWX4pAgEEI0a4VbUvufd-BYePLG_r4tv5QucwACurI_6axJq8O8ZJwV7wtd2p25jbCe0iSesRByoRbY4vhh87eiMpY3D6_IioI7NHEhLpWS7O5F5lc_7-sUIcPLTsADKYUbBZvQ5',
    link: '#'
  },
  {
    id: '3',
    category: 'Hardware',
    title: 'Quantum Supremacy in AI',
    description: 'Reducing LLM training time by orders of magnitude with quantum pipelines.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh8mPzdi005d1yeS2ivD5fq9C071Hon4NQwt4Mt76lOy-rwl7UZ6Hg1YR1K_-xl-q9okeiaQz7owInOnpWFfrlgTyAb7dAJ74IZ8Rip6U4t2fM9lzZEoDvvs4tTza3w0wzP3SQZA7tfs5z7nqMbyfGTEuKr0Z-7d4BJtV-aw1uT6iN7sNKb23C9y9zhKLjhoj7ZQIEUyE3E8uXyZXC5ssz6a6SrqsTClweMFzTVzSM1-UPh9cNWzE9BDS-3pgBww0l1Duuy0u4FRMa',
    link: '#'
  }
];

const RelatedArticles: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 perspective-[1200px]">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Share2 className="text-primary w-8 h-8" />
          Related Transmissions
        </h2>
        <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors hidden sm:block">View All Logs</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <a
            key={article.id}
            href={article.link}
            className="group relative block h-full transform transition-all duration-500 hover:-translate-y-2 hover:rotate-x-[5deg] hover:z-10"
            style={{ transitionDelay: `${index * 100}ms`, transformStyle: 'preserve-3d' }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
            
            <div className="relative h-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col group-hover:border-primary/50 transition-colors">
              
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-wider">{article.category}</span>
                </div>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-90 dark:opacity-80 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-dark to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{article.description}</p>
                
                <div className="mt-auto flex items-center text-xs font-mono text-primary/80 group-hover:text-primary transition-colors">
                  <span className="tracking-widest">READ PROTOCOL</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>

              {/* Border Highlight */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-2xl pointer-events-none transition-all duration-300"></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;