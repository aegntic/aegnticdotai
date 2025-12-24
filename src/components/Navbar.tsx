import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Icon3D from './Icon3D';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Detect active section - updated for new 6-section architecture
            const sections = ['home', 'about', 'featured', 'projects', 'research', 'contact'];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Featured', href: '#featured' },
        { name: 'Projects', href: '#projects' },
        { name: 'Research', href: '#research' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMobileMenuOpen(false);
    };

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-background-dark/80 backdrop-blur-md border-b border-primary/10 py-3' : 'bg-transparent py-6'}`}>
            {/* Logo */}
            <a href="#home" onClick={scrollToTop} className="flex items-center gap-2 group cursor-pointer">
                <Icon3D icon="Network" size={24} className="text-primary animate-pulse-slow group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                    aegntic<span className="text-primary">.ai</span>
                </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => {
                    const sectionId = link.href.replace('#', '');
                    const isActive = activeSection === sectionId;

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        </a>
                    );
                })}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-background-dark/95 backdrop-blur-md border-b border-white/5 py-8 px-6 flex flex-col gap-6 md:hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-lg font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
