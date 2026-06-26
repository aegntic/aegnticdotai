import React from 'react';
import { User, FileText, Mail, Github, Twitter } from 'lucide-react';
import AeLogo from './AeLogo';

interface NavbarProps {
    onOpenPanel: (panel: 'about' | 'research' | 'contact') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenPanel }) => {
    return (
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center py-5 px-6 md:px-12">
            <AeLogo size={24} className="opacity-40 hover:opacity-70 transition-opacity duration-300 cursor-pointer" />

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onOpenPanel('about')}
                    className="nav-link flex items-center gap-1.5"
                    title="About"
                >
                    <User size={14} />
                    <span className="hidden md:inline">About</span>
                </button>
                <button
                    onClick={() => onOpenPanel('research')}
                    className="nav-link flex items-center gap-1.5"
                    title="Research"
                >
                    <FileText size={14} />
                    <span className="hidden md:inline">Research</span>
                </button>
                <button
                    onClick={() => onOpenPanel('contact')}
                    className="nav-link flex items-center gap-1.5"
                    title="Contact"
                >
                    <Mail size={14} />
                    <span className="hidden md:inline">Contact</span>
                </button>
                <div className="w-px h-3 mx-2" style={{ background: 'var(--color-rule)' }} />
                <a href="https://github.com/aegntic" target="_blank" rel="noopener noreferrer" className="nav-link" title="GitHub">
                    <Github size={14} />
                </a>
                <a href="https://twitter.com/aegntic_ai" target="_blank" rel="noopener noreferrer" className="nav-link" title="Twitter">
                    <Twitter size={14} />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
