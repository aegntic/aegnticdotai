import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'emergent', 'arch', 'ethical', 'conclusion'];
      
      // Get current scroll position with an offset for the navbar
      const scrollPosition = window.scrollY + 200;

      let current = activeSection;

      // Find the current section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            current = section;
          }
        }
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const navLinks = [
    { id: 'intro', label: 'Introduction' },
    { id: 'emergent', label: 'Emergent Behaviors' },
    { id: 'arch', label: 'Architecture Analysis' },
    { id: 'ethical', label: 'Ethical Implications' },
    { id: 'conclusion', label: 'Conclusion' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Height of sticky header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <aside className="lg:col-span-3 order-2 lg:order-1">
      <div className="sticky top-32 space-y-8">
        {/* Protocol Stats Card */}
        <div className="bg-white/60 dark:bg-surface-dark/50 backdrop-blur border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg transition-colors duration-300">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Protocol Stats</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Simulation Time</span>
              <span className="text-sm font-mono text-primary font-semibold">4,032 HRS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Agents Deployed</span>
              <span className="text-sm font-mono text-primary font-semibold">1,024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Interactions</span>
              <span className="text-sm font-mono text-primary font-semibold">1.2M+</span>
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
              <CheckCircle className="w-4 h-4" />
              Peer Reviewed
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {['#SocialSim', '#GenerativeAgents', '#Ethics', '#NeuralArch'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full text-xs text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary cursor-pointer transition-colors shadow-sm dark:shadow-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Table of Contents */}
        <div className="hidden lg:block">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Navigation</h4>
          <ul className="space-y-3 text-sm border-l border-gray-200 dark:border-gray-800 pl-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`block transition-all duration-300 ${
                    activeSection === link.id 
                      ? 'text-primary font-medium border-l-2 border-primary -ml-[17px] pl-4 translate-x-1' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;