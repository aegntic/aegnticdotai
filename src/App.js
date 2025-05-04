import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import './App.css';

// Import components
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Terminal from './components/Terminal';
import QuantumGrid from './components/QuantumGrid';
import PreLoader from './components/PreLoader';
import AudioPlayer from './components/AudioPlayer';
import VisualizerToggle from './components/VisualizerToggle';

// Import sections
import Home from './sections/Home';
import Projects from './sections/Projects';
import Gallery from './sections/Gallery';
import Tools from './sections/Tools';
import Contact from './sections/Contact';

function App() {
  // State
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [visualizerMode, setVisualizerMode] = useState('grid'); // grid, wave, spiral
  const [glitchIntensity, setGlitchIntensity] = useState(0.2);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  
  // Refs
  const appRef = useRef(null);
  
  // Effects
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    // Set CSS variable for glitch intensity
    document.documentElement.style.setProperty('--glitch-intensity', glitchIntensity);
    
    return () => clearTimeout(timer);
  }, [glitchIntensity]);
  
  // Terminal commands handler
  const handleTerminalCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    
    switch(args[0]) {
      case 'help':
        return `Available commands:
- help: Show this help message
- clear: Clear terminal
- about: About AEGNTIC
- projects: List projects
- nav <section>: Navigate to section (home, projects, gallery, tools, contact)
- glitch <on|off|value>: Set glitch intensity (0-1)
- matrix: Easter egg`;
      case 'clear':
        return null; // Terminal component will handle clearing
      case 'about':
        return 'AEGNTIC - Quantum Tartarian Interface. A cutting-edge cyberpunk experience.';
      case 'projects':
        return 'Projects: Quantum Engine, Neural Interface, Synthetic Dreams, Digital Alchemy';
      case 'nav':
        if (args[1] && ['home', 'projects', 'gallery', 'tools', 'contact'].includes(args[1])) {
          setActiveSection(args[1]);
          return `Navigating to ${args[1]}...`;
        }
        return 'Usage: nav <section> (home, projects, gallery, tools, contact)';
      case 'glitch':
        if (args[1] === 'on') {
          setGlitchIntensity(0.6);
          return 'Glitch effect enabled';
        } else if (args[1] === 'off') {
          setGlitchIntensity(0);
          return 'Glitch effect disabled';
        } else if (args[1] && !isNaN(args[1])) {
          const value = Math.max(0, Math.min(1, parseFloat(args[1])));
          setGlitchIntensity(value);
          return `Glitch intensity set to ${value}`;
        }
        return 'Usage: glitch <on|off|value> (0-1)';
      case 'matrix':
        return 'Wake up, Neo...';
      default:
        return `Command not found: ${args[0]}. Type 'help' for available commands.`;
    }
  };
  
  // Handle section navigation
  const navigateTo = (section) => {
    setActiveSection(section);
    setNavOpen(false);
  };
  
  // Spring animations for section transitions
  const sectionSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 60 }
  });

  return (
    <div className="app" ref={appRef}>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <CustomCursor />
          
          <div className="noise-overlay"></div>
          
          <QuantumGrid mode={visualizerMode} />
          
          <header>
            <button 
              className="hamburger" 
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <div className="logo">
              AEG<span>NTIC</span>
            </div>
            
            <VisualizerToggle 
              currentMode={visualizerMode} 
              onChange={setVisualizerMode} 
            />
          </header>
          
          <Navigation 
            open={navOpen} 
            onClose={() => setNavOpen(false)}
            onNavigate={navigateTo}
            activeSection={activeSection}
          />
          
          <main className="content">
            <animated.div style={sectionSpring} className="section-container">
              {activeSection === 'home' && <Home />}
              {activeSection === 'projects' && <Projects />}
              {activeSection === 'gallery' && <Gallery />}
              {activeSection === 'tools' && <Tools />}
              {activeSection === 'contact' && <Contact />}
            </animated.div>
          </main>
          
          <footer>
            <AudioPlayer 
              playing={audioPlaying} 
              onToggle={() => setAudioPlaying(!audioPlaying)} 
            />
            
            <button 
              className="terminal-toggle" 
              onClick={() => setTerminalOpen(!terminalOpen)}
            >
              TERMINAL
            </button>
          </footer>
          
          <Terminal 
            open={terminalOpen} 
            onClose={() => setTerminalOpen(false)}
            onCommand={handleTerminalCommand}
          />
        </>
      )}
    </div>
  );
}

export default App;
