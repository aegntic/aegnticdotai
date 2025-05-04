import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Gallery = () => {
  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      title: 'Quantum Visualization Alpha',
      image: 'https://source.unsplash.com/random/800x600/?quantum,abstract',
      type: 'regular'
    },
    {
      id: 2,
      title: 'Neural Network Pathways',
      image: 'https://source.unsplash.com/random/800x1200/?neural,network',
      type: 'tall'
    },
    {
      id: 3,
      title: 'Digital Consciousness Mapping',
      image: 'https://source.unsplash.com/random/1200x600/?digital,mind',
      type: 'wide'
    },
    {
      id: 4,
      title: 'Synthetic Reality Construct',
      image: 'https://source.unsplash.com/random/800x600/?synthetic,reality',
      type: 'regular'
    },
    {
      id: 5,
      title: 'Non-Euclidean Data Space',
      image: 'https://source.unsplash.com/random/800x600/?geometry,abstract',
      type: 'regular'
    },
    {
      id: 6,
      title: 'Holographic Memory Fragment',
      image: 'https://source.unsplash.com/random/1200x600/?hologram,light',
      type: 'wide'
    },
    {
      id: 7,
      title: 'Cybernetic Enhancement Prototype',
      image: 'https://source.unsplash.com/random/800x1200/?cybernetic,tech',
      type: 'tall'
    },
    {
      id: 8,
      title: 'Quantum Entanglement Visualization',
      image: 'https://source.unsplash.com/random/800x600/?quantum,particles',
      type: 'regular'
    }
  ];

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Spring animation for section title
  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 300
  });

  // Spring animation for modal
  const modalSpring = useSpring({
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 20 }
  });

  // Open modal with selected image
  const openModal = (item) => {
    setCurrentImage(item);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Gallery Item component
  const GalleryItem = ({ item, index }) => {
    // Spring animation for each item with staggered delay
    const itemSpring = useSpring({
      from: { opacity: 0, transform: 'translateY(50px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { tension: 200, friction: 20 },
      delay: 400 + (index * 100)
    });

    return (
      <animated.div 
        className={`gallery-item ${item.type}`}
        style={itemSpring}
        onClick={() => openModal(item)}
      >
        <img 
          src={item.image} 
          alt={item.title} 
          className="gallery-image"
        />
        <div className="gallery-caption">
          <h3>{item.title}</h3>
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
          color: 'var(--color-secondary)'
        }}
      >
        GALLERY
      </animated.h2>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Modal */}
      <animated.div 
        className={`gallery-modal ${modalOpen ? 'active' : ''}`}
        style={modalSpring}
        onClick={closeModal}
      >
        {currentImage && (
          <>
            <img 
              src={currentImage.image} 
              alt={currentImage.title} 
              className="modal-image"
            />
            <button 
              className="modal-close"
              onClick={closeModal}
            >
              ×
            </button>
          </>
        )}
      </animated.div>
    </div>
  );
};

export default Gallery;
