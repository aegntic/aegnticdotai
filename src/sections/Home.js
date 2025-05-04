import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Home = () => {
  // Spring animation for title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 300
  });

  // Spring animation for subtitle
  const subtitleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 600
  });

  return (
    <div className="section active">
      <div className="hero">
        <div 
          className="hero-bg"
          style={{ 
            backgroundImage: 'url("https://source.unsplash.com/random/1920x1080/?futuristic,cyberpunk")' 
          }}
        ></div>
        <animated.h1 
          className="hero-title" 
          style={titleSpring}
        >
          <span className="glitch" data-text="QUANTUM TARTARIAN">
            QUANTUM TARTARIAN
          </span><br />
          <span className="glitch" data-text="INTERFACE">
            INTERFACE
          </span>
        </animated.h1>
        <animated.p 
          className="hero-subtitle" 
          style={subtitleSpring}
        >
          Navigate the digital nexus of quantum information space. 
          AEGNTIC provides unprecedented access to parallel data streams,
          enhanced by neural-mapped interfaces and holographic visualization.
        </animated.p>
      </div>
    </div>
  );
};

export default Home;
