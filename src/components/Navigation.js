import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Navigation = ({ open, onClose, onNavigate, activeSection }) => {
  // Spring animation for navigation panel
  const navSpring = useSpring({
    transform: open ? 'translateX(0%)' : 'translateX(-100%)',
    config: { tension: 300, friction: 30 }
  });

  // Navigation links
  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'tools', label: 'TOOLS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  // Handle navigation
  const handleNavigation = (sectionId) => {
    onNavigate(sectionId);
  };

  return (
    <animated.div 
      className={`nav-container ${open ? 'open' : ''}`}
      style={navSpring}
    >
      <div className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.id}
            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            onClick={() => handleNavigation(link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </animated.div>
  );
};

export default Navigation;
