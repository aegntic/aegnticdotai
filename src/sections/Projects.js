import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Projects = () => {
  // Project data
  const projects = [
    {
      id: 1,
      title: 'Quantum Engine',
      description: 'Advanced computational system utilizing quantum principles for high-dimensional data processing.',
      image: 'https://source.unsplash.com/random/600x400/?quantum,technology',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Neural Interface',
      description: 'Direct brain-computer connection enabling intuitive control of digital systems via thought patterns.',
      image: 'https://source.unsplash.com/random/600x400/?neural,brain',
      status: 'Beta'
    },
    {
      id: 3,
      title: 'Synthetic Dreams',
      description: 'Visualization algorithm that renders subconscious thought patterns into immersive environments.',
      image: 'https://source.unsplash.com/random/600x400/?dream,surreal',
      status: 'Prototype'
    },
    {
      id: 4,
      title: 'Digital Alchemy',
      description: 'Transmutation of digital assets using non-linear computation models based on ancient principles.',
      image: 'https://source.unsplash.com/random/600x400/?alchemy,gold',
      status: 'Research'
    },
    {
      id: 5,
      title: 'Cybernetic Echo',
      description: 'Recursive system that amplifies and evolves data patterns through multilayered feedback loops.',
      image: 'https://source.unsplash.com/random/600x400/?echo,cyber',
      status: 'Concept'
    },
    {
      id: 6,
      title: 'Holographic Nexus',
      description: 'Spatial computing environment enabling physical interaction with volumetric data projections.',
      image: 'https://source.unsplash.com/random/600x400/?hologram,future',
      status: 'Development'
    }
  ];

  // Spring animation for section title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 300
  });

  // Project Card component
  const ProjectCard = ({ project, index }) => {
    // Spring animation for each card with staggered delay
    const cardSpring = useSpring({
      from: { opacity: 0, transform: 'translateY(50px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { tension: 200, friction: 20 },
      delay: 400 + (index * 100)
    });

    return (
      <animated.div 
        className="project-card"
        style={cardSpring}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-image"
        />
        <div className="project-info">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <span className="project-status">{project.status}</span>
        </div>
      </animated.div>
    );
  };

  return (
    <div className="section active">
      <animated.h2 
        style={{
          ...titleSpring,
          marginBottom: '40px',
          color: 'var(--color-primary)'
        }}
      >
        PROJECTS
      </animated.h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
