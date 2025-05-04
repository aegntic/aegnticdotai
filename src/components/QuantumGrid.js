import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const QuantumGrid = ({ mode = 'grid' }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const objectsRef = useRef([]);
  const timeRef = useRef(0);
  const frameIdRef = useRef(null);

  // Initialize Three.js scene
  const initScene = () => {
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Add objects based on current mode
    updateVisualization(mode);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Start animation loop
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  };

  // Animation loop
  const animate = () => {
    frameIdRef.current = requestAnimationFrame(animate);
    timeRef.current += 0.01;

    // Update objects based on current mode
    if (mode === 'grid') {
      animateGrid();
    } else if (mode === 'wave') {
      animateWave();
    } else if (mode === 'spiral') {
      animateSpiral();
    }

    // Render scene
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  // Create grid visualization
  const createGrid = () => {
    // Clear existing objects
    clearObjects();

    // Grid parameters
    const size = 100;
    const divisions = 50;
    
    // Create lines for grid
    for (let i = -size / 2; i <= size / 2; i += size / divisions) {
      // Horizontal lines
      const horizontalGeometry = new THREE.BufferGeometry();
      const horizontalPoints = [
        new THREE.Vector3(-size / 2, i, 0),
        new THREE.Vector3(size / 2, i, 0)
      ];
      horizontalGeometry.setFromPoints(horizontalPoints);
      
      const horizontalMaterial = new THREE.LineBasicMaterial({ 
        color: new THREE.Color('#00BFFF'),
        transparent: true,
        opacity: 0.3
      });
      
      const horizontalLine = new THREE.Line(horizontalGeometry, horizontalMaterial);
      sceneRef.current.add(horizontalLine);
      objectsRef.current.push(horizontalLine);
      
      // Vertical lines
      const verticalGeometry = new THREE.BufferGeometry();
      const verticalPoints = [
        new THREE.Vector3(i, -size / 2, 0),
        new THREE.Vector3(i, size / 2, 0)
      ];
      verticalGeometry.setFromPoints(verticalPoints);
      
      const verticalMaterial = new THREE.LineBasicMaterial({ 
        color: new THREE.Color('#00BFFF'),
        transparent: true,
        opacity: 0.3
      });
      
      const verticalLine = new THREE.Line(verticalGeometry, verticalMaterial);
      sceneRef.current.add(verticalLine);
      objectsRef.current.push(verticalLine);
    }
  };

  // Create wave visualization
  const createWave = () => {
    // Clear existing objects
    clearObjects();

    // Create dual sine wave
    const wavePointsCount = 100;
    const waveWidth = 80;
    const waveHeight = 30;
    
    // First wave
    const wave1Geometry = new THREE.BufferGeometry();
    const wave1Points = [];
    
    for (let i = 0; i <= wavePointsCount; i++) {
      const x = (i / wavePointsCount) * waveWidth - waveWidth / 2;
      const y = Math.sin(i * 0.2) * 5;
      wave1Points.push(new THREE.Vector3(x, y, 0));
    }
    
    wave1Geometry.setFromPoints(wave1Points);
    
    const wave1Material = new THREE.LineBasicMaterial({ 
      color: new THREE.Color('#F40009'),
      transparent: true,
      opacity: 0.8
    });
    
    const wave1Line = new THREE.Line(wave1Geometry, wave1Material);
    sceneRef.current.add(wave1Line);
    objectsRef.current.push(wave1Line);
    
    // Second wave
    const wave2Geometry = new THREE.BufferGeometry();
    const wave2Points = [];
    
    for (let i = 0; i <= wavePointsCount; i++) {
      const x = (i / wavePointsCount) * waveWidth - waveWidth / 2;
      const y = Math.cos(i * 0.3) * 5;
      wave2Points.push(new THREE.Vector3(x, y, 0));
    }
    
    wave2Geometry.setFromPoints(wave2Points);
    
    const wave2Material = new THREE.LineBasicMaterial({ 
      color: new THREE.Color('#7DFFE8'),
      transparent: true,
      opacity: 0.8
    });
    
    const wave2Line = new THREE.Line(wave2Geometry, wave2Material);
    sceneRef.current.add(wave2Line);
    objectsRef.current.push(wave2Line);
  };

  // Create spiral particle visualization
  const createSpiral = () => {
    // Clear existing objects
    clearObjects();

    // Create particles
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 40;
      
      particlePositions[i * 3] = Math.cos(angle) * radius;     // x
      particlePositions[i * 3 + 1] = Math.sin(angle) * radius; // y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      
      particleSizes[i] = Math.random() * 2 + 0.5;
      
      // Interpolate colors between red, blue, and turquoise
      if (i % 3 === 0) {
        // Red particles
        particleColors[i * 3] = 244/255;      // R
        particleColors[i * 3 + 1] = 0;        // G
        particleColors[i * 3 + 2] = 9/255;    // B
      } else if (i % 3 === 1) {
        // Blue particles
        particleColors[i * 3] = 0;            // R
        particleColors[i * 3 + 1] = 191/255;  // G
        particleColors[i * 3 + 2] = 255/255;  // B
      } else {
        // Turquoise particles
        particleColors[i * 3] = 125/255;      // R
        particleColors[i * 3 + 1] = 255/255;  // G
        particleColors[i * 3 + 2] = 232/255;  // B
      }
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    // Create particle shader material
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          
          // Spiral animation
          float angle = position.x * 0.05 + time * 0.5;
          vec3 pos = position;
          pos.x = position.x * cos(angle) - position.y * sin(angle);
          pos.y = position.x * sin(angle) + position.y * cos(angle);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          gl_FragColor = vec4(vColor, 1.0 - dist * 2.0);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    sceneRef.current.add(particles);
    objectsRef.current.push(particles);
  };

  // Animation functions
  const animateGrid = () => {
    if (objectsRef.current.length === 0) return;
    
    const time = timeRef.current;
    
    // Animate grid lines with sine wave effect
    for (let i = 0; i < objectsRef.current.length; i++) {
      const line = objectsRef.current[i];
      const positions = line.geometry.attributes.position.array;
      
      // Apply sine wave distortion
      for (let j = 0; j < positions.length; j += 3) {
        const initialX = positions[j];
        const initialY = positions[j + 1];
        
        // Different sine wave for horizontal and vertical lines
        if (i % 2 === 0) { // Horizontal lines
          positions[j + 2] = Math.sin(initialX * 0.1 + time) * 2;
        } else { // Vertical lines
          positions[j + 2] = Math.sin(initialY * 0.1 + time) * 2;
        }
      }
      
      line.geometry.attributes.position.needsUpdate = true;
    }
  };

  const animateWave = () => {
    if (objectsRef.current.length < 2) return;
    
    const time = timeRef.current;
    const wave1 = objectsRef.current[0];
    const wave2 = objectsRef.current[1];
    
    const wave1Positions = wave1.geometry.attributes.position.array;
    const wave2Positions = wave2.geometry.attributes.position.array;
    
    // Animate first wave
    for (let i = 0; i < wave1Positions.length; i += 3) {
      const x = wave1Positions[i];
      wave1Positions[i + 1] = Math.sin(x * 0.2 + time * 2) * 8;
    }
    
    // Animate second wave
    for (let i = 0; i < wave2Positions.length; i += 3) {
      const x = wave2Positions[i];
      wave2Positions[i + 1] = Math.cos(x * 0.3 - time * 3) * 6;
    }
    
    wave1.geometry.attributes.position.needsUpdate = true;
    wave2.geometry.attributes.position.needsUpdate = true;
  };

  const animateSpiral = () => {
    if (objectsRef.current.length === 0) return;
    
    const particles = objectsRef.current[0];
    
    // Update time uniform for spiral animation
    particles.material.uniforms.time.value = timeRef.current;
  };

  // Clear all objects from the scene
  const clearObjects = () => {
    objectsRef.current.forEach(obj => {
      sceneRef.current.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(material => material.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    
    objectsRef.current = [];
  };

  // Update visualization when mode changes
  const updateVisualization = (mode) => {
    if (mode === 'grid') {
      createGrid();
    } else if (mode === 'wave') {
      createWave();
    } else if (mode === 'spiral') {
      createSpiral();
    }
  };

  // Initialize scene on component mount
  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, []);

  // Update visualization when mode changes
  useEffect(() => {
    if (sceneRef.current) {
      updateVisualization(mode);
    }
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none'
      }}
    />
  );
};

export default QuantumGrid;
