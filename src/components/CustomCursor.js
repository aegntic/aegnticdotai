import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Add event listeners
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      detectHoverableElements();
    };

    // Handle mouse movement
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Handle mouse entering the window
    const onMouseEnter = () => {
      setVisible(true);
    };

    // Handle mouse leaving the window
    const onMouseLeave = () => {
      setVisible(false);
    };

    // Handle mouse down
    const onMouseDown = () => {
      document.documentElement.style.setProperty('--cursor-scale', '0.8');
    };

    // Handle mouse up
    const onMouseUp = () => {
      document.documentElement.style.setProperty('--cursor-scale', '1');
    };

    // Detect hoverable elements
    const detectHoverableElements = () => {
      const hoverableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      
      hoverableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setHovering(true);
        });
        
        element.addEventListener('mouseleave', () => {
          setHovering(false);
        });
      });
    };

    // Initialize
    addEventListeners();

    // Set CSS variable for cursor scale
    document.documentElement.style.setProperty('--cursor-scale', '1');

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Custom cursor styles
  const dotStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(var(--cursor-scale))`,
    opacity: visible ? 1 : 0,
  };

  const outlineStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(var(--cursor-scale))`,
    opacity: visible ? 1 : 0,
  };

  return (
    <>
      <div className="cursor-dot" style={dotStyle}></div>
      <div className={`cursor-outline ${hovering ? 'cursor-hover' : ''}`} style={outlineStyle}></div>
    </>
  );
};

export default CustomCursor;
