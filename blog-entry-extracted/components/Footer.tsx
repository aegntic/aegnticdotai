import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-light dark:bg-black border-t border-gray-200 dark:border-gray-800 relative z-20">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-900 dark:text-white">
              aegntic<span className="text-primary">.ai</span>
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 hover:text-primary transition-colors">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 hover:text-primary transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 hover:text-primary transition-colors">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-primary transition-colors">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="#" className="hover:underline">Aegntic.ai™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;