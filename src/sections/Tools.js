import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Tools = () => {
  // Tools data
  const tools = [
    {
      id: 1,
      title: 'Quantum Scanner',
      description: 'Analyze and interpret multi-dimensional data structures from parallel information streams.',
      emoji: '🔍',
      action: 'Access Scanner'
    },
    {
      id: 2,
      title: 'Neural Mapper',
      description: 'Visualize complex thought patterns and translate them into executable code or concepts.',
      emoji: '🧠',
      action: 'Map Thoughts'
    },
    {
      id: 3,
      title: 'Reality Engine',
      description: 'Generate immersive, interactive environments based on conceptual parameters and physical laws.',
      emoji: '🌌',
      action: 'Build Reality'
    },
    {
      id: 4,
      title: 'Data Alchemist',
      description: 'Transform raw information into valuable insights through algorithmic transmutation.',
      emoji: '⚗️',
      action: 'Transmute Data'
    },
    {
      id: 5,
      title: 'Temporal Analyzer',
      description: 'Track information flow across time, identifying causal relationships and predicting outcomes.',
      emoji: '⏱️',
      action: 'Analyze Time'
    },
    {
      id: 6,
      title: 'Chaos Oracle',
      description: 'Navigate complex system dynamics to extract order from apparent randomness.',
      emoji: '🔮',
      action: 'Consult Oracle'
    },
    {
      id: 7,
      title: 'Pattern Weaver',
      description: 'Generate emergent structures by identifying and enhancing subtle correlations.',
      emoji: '🕸️',
      action: 'Weave Patterns'
    },
    {
      id: 8,
      title: 'Cybernetic Forge',
      description: 'Create and modify digital tools using bio-inspired algorithms and interfaces.',
      emoji: '⚒️',
      action: 'Enter Forge'
    },
    {
      id: 9,
      title: 'Memory Vault',
      description: 'Securely store and holographically index critical information with quantum encryption.',
      emoji: '🔐',
      action: 'Access Vault'
    }
  ];

  // Spring animation for section title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 300
  });

  // Tool Card component
  const ToolCard = ({ tool, index }) => {
    // Spring animation for each card with staggered delay
    const cardSpring = useSpring({
      from: { opacity: 0, transform: 'translateY(50px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { tension: 200, friction: 20 },
      delay: 400 + (index * 100)
    });

    return (
      <animated.div 
        className="tool-card"
        style={cardSpring}
      >
        <div className="tool-icon">{tool.emoji}</div>
        <h3 className="tool-title">{tool.title}</h3>
        <p className="tool-description">{tool.description}</p>
        <button className="tool-button">{tool.action}</button>
      </animated.div>
    );
  };

  return (
    <div className="section active">
      <animated.h2 
        style={{
          ...titleSpring,
          marginBottom: '40px',
          color: 'var(--color-tertiary)'
        }}
      >
        TOOLS
      </animated.h2>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Tools;
