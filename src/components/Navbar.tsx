import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AeLogo from './AeLogo';
import Magnetic from './Magnetic';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            const sections = ['home', 'about', 'featured', 'projects', 'research', 'contact'];
            for (const section of [...sections].reverse()) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(section);
                    break;
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
        const el = document.getElementById(href.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
    };

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'
                }`}
        >
            {/* Logo — ae· mark + wordmark */}
            <Magnetic strength={0.15}>
                <a href="#home" onClick={scrollToTop} className="flex items-center gap-3 group cursor-pointer">
                    <AeLogo size={36} color="var(--color-accent-blue)" className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-display text-xl font-bold tracking-tight text-text-primary">
                        aegntic<span className="text-accent-blue">.ai</span>
                    </span>
                </a>
            </Magnetic>

            {/* Desktop Navigation — Magnetic Neumorphic Pills */}
            <div className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => {
                    const sectionId = link.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                        <Magnetic key={link.name} strength={0.2}>
                            <a
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`neu-pill text-xs font-display uppercase tracking-[0.15em] font-medium transition-all duration-200 !py-2 !px-5 ${isActive
                                    ? 'text-deep-space bg-accent-blue !shadow-none'
                                    : 'text-text-muted hover:text-text-primary'
                                    }`}
                            >
                                {link.name}
                            </a>
                        </Magnetic>
                    );
                })}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden neu-pill !p-2 text-text-muted hover:text-text-primary transition-colors"
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-deep-space shadow-neu py-6 px-6 flex flex-col gap-3 md:hidden">
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace('#', '');
                        const isActive = activeSection === sectionId;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`neu-pill text-center font-display text-sm uppercase tracking-widest font-medium ${isActive ? 'text-deep-space bg-accent-blue !shadow-none' : 'text-text-muted'
                                    }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
