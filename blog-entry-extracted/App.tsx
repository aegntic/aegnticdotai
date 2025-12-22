import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ArticleContent from './components/ArticleContent';
import RelatedArticles from './components/RelatedArticles';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-black transition-colors duration-300">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white dark:from-background-dark via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-[size:50px_50px] opacity-[0.05] bg-grid-pattern-light dark:bg-grid-pattern [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        
        {/* Floating Particles/Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-10"></div>
      </div>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative z-10 pt-28 pb-12 flex flex-col items-center">
        <Hero />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          <Sidebar />
          <ArticleContent />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 mt-20 mb-12">
           <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-primary/50 to-transparent"></div>
        </div>

        <RelatedArticles />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;