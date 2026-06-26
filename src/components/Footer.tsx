import React from 'react';
import AeLogo from './AeLogo';

const Footer: React.FC = () => {
    return (
        <footer className="w-full py-8 px-6 md:px-12">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <AeLogo size={16} className="opacity-20" />
                    <span className="text-label">
                        &copy; 2025 aegntic
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="https://github.com/aegntic" target="_blank" rel="noopener noreferrer" className="nav-link">
                        GitHub
                    </a>
                    <a href="https://twitter.com/aegntic_ai" target="_blank" rel="noopener noreferrer" className="nav-link">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
