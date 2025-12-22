import React from 'react';
import { User, Bookmark, Share2, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
        <a href="#" className="hover:text-primary transition-colors">Insights</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary">Research Protocol</span>
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white leading-tight">
        Frameworks from <br className="hidden md:block" />
        <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-primary dark:to-blue-600 dark:drop-shadow-[0_0_10px_rgba(0,224,255,0.3)] pr-2">
          AI superusers
        </span>
        <br className="hidden md:block" />
        actual R&D*
      </h1>

      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFLa1LBmgAhyY_HnS4HEnYah4Buw4bCvCt5zWUwv6ODhAy--wDW-Pa-i48CAdOIeu42RYENHtB_ZTOOg2HpiwvfKJUs20G6vpxKWMR7EYNQNoGy7rhSsovWzuxAc8GZTuWP3ggpYRxKYEiODutGOo4LddpW1KFCZ31Mlx6mI6L5l2WIjyEQYqyWpju-znRxInjRqU7Rvmuei44Qb-RwZVGWdZWTWKuQte_ScEHhUv_eg1LWLoDql5SPCWyyPpw4DJkcrh78vydNW6r"
          alt="Generative Agents Simulation"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

        {/* Info Bar */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 backdrop-blur-sm bg-black/20">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-primary/50 flex items-center justify-center">
                <User className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Dr. Elena Vosk</p>
                <p className="text-slate-300 text-xs">Chief AI Architect</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <p className="text-slate-300 text-xs uppercase tracking-wider mb-1">Published</p>
              <p className="text-white font-mono text-sm">OCT 12, 2023</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;