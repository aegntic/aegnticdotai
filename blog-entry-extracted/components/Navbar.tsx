import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-1 group">
          <span className="self-center text-2xl font-bold whitespace-nowrap tracking-tighter text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
            aegntic<span className="text-primary">.ai</span>
          </span>
        </a>

        {/* Right Side Buttons (Desktop) */}
        <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            type="button"
            className="text-white dark:text-black bg-slate-900 dark:bg-primary hover:bg-slate-700 dark:hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center transition-all shadow-lg dark:shadow-[0_0_15px_rgba(0,224,255,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,224,255,0.6)]"
          >
            Join Research
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-surface-dark md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="#" className="block py-2 px-3 text-slate-700 dark:text-white rounded hover:text-primary md:p-0 transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-slate-700 dark:text-white rounded hover:text-primary md:p-0 transition-colors">Research</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-primary rounded md:p-0" aria-current="page">Insights</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-slate-700 dark:text-white rounded hover:text-primary md:p-0 transition-colors">Ecosystem</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;