import React from 'react';

const VisualizerToggle = ({ currentMode, onChange }) => {
  // Visualizer modes with icons
  const modes = [
    { id: 'grid', icon: '⊞', label: 'Grid Mode' },
    { id: 'wave', icon: '〰️', label: 'Wave Mode' },
    { id: 'spiral', icon: '⊹', label: 'Spiral Mode' }
  ];
  
  // Handle mode change
  const handleModeChange = (mode) => {
    if (mode !== currentMode) {
      onChange(mode);
    }
  };
  
  return (
    <div className="visualizer-toggles">
      {modes.map((mode) => (
        <button
          key={mode.id}
          className={`visualizer-button ${currentMode === mode.id ? 'active' : ''}`}
          onClick={() => handleModeChange(mode.id)}
          aria-label={mode.label}
          title={mode.label}
        >
          <span>{mode.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default VisualizerToggle;
