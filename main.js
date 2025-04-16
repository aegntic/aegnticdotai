import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Particles
const particleCount = 5000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// Create random particles
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 2000;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

  colors[i * 3] = 0.1 + Math.random() * 0.4; // R
  colors[i * 3 + 1] = 0.1 + Math.random() * 0.4; // G
  colors[i * 3 + 2] = 0.5 + Math.random() * 0.5; // B
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Particle material
const particleMaterial = new THREE.PointsMaterial({
  size: 2,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

// Create particle system
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Camera position
camera.position.z = 500;

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Rotate particles
  particleSystem.rotation.x += 0.0005;
  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
