import React, { useState, useEffect } from 'react';

const PreLoader = () => {
  const [visibleLogs, setVisibleLogs] = useState([]);
  
  // System log messages
  const systemLogs = [
    { type: 'system', text: 'AEGNTIC OS v3.7.2 - Quantum Tartarian Interface' },
    { type: 'system', text: 'Initializing virtual environment...' },
    { type: 'system', text: 'Loading memory modules... [OK]' },
    { type: 'system', text: 'Establishing quantum neural network...' },
    { type: 'system', text: 'Synchronizing with central mainframe...' },
    { type: 'error', text: 'WARNING: Detected unauthorized network probe!' },
    { type: 'system', text: 'Activating defensive countermeasures...' },
    { type: 'system', text: 'Adaptive firewall protocols engaged.' },
    { type: 'success', text: 'Quantum encryption initialized successfully.' },
    { type: 'system', text: 'Entering digital space. Please stand by...' }
  ];

  // Simulates typewriter effect for logs
  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < systemLogs.length) {
        setVisibleLogs(prev => [...prev, systemLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader">
      <div className="preloader-logs">
        {visibleLogs.map((log, index) => (
          <div 
            key={index} 
            className={`preloader-log ${log.type}`}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {`[${log.type.toUpperCase()}] ${log.text}`}
          </div>
        ))}
      </div>
      <div className="preloader-progress">
        <div className="preloader-bar"></div>
      </div>
    </div>
  );
};

export default PreLoader;
