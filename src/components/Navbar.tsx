import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Network, X, Search, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Research', path: '/research' },
        { name: 'Ecosystem', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Colabs', path: '/colabs' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-background-dark/80 backdrop-blur-md border-b border-primary/10 py-3' : 'bg-transparent py-6'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                <Network className="text-primary w-6 h-6 animate-pulse-slow group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                    aegntic<span className="text-primary">.ai</span>
                </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `text-xs uppercase tracking-[0.2em] font-medium transition-colors relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="hidden md:flex items-center gap-2 px-6 py-2 text-xs uppercase tracking-widest font-bold text-black bg-primary hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 rounded-sm skew-x-[-10deg] active:scale-95 group">
                    <span className="skew-x-[10deg] flex items-center gap-2">
                        Access Lab
                        <Globe size={14} className="group-hover:rotate-45 transition-transform" />
                    </span>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white hover:text-primary transition-colors p-2"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 top-[60px] bg-background-dark/95 backdrop-blur-md md:hidden flex flex-col gap-8 p-8 transition-transform duration-300 z-40 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className="text-2xl uppercase tracking-widest text-gray-300 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.name}
                    </NavLink>
                ))}
                <button className="w-full py-4 text-sm uppercase tracking-widest font-bold text-black bg-primary rounded-sm mt-auto">
                    Access Lab
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
