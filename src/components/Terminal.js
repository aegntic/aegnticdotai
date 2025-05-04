import React, { useState, useRef, useEffect } from 'react';

const Terminal = ({ open, onClose, onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'AEGNTIC Terminal v1.0' },
    { type: 'system', text: 'Type "help" for available commands' }
  ]);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  // Focus input when terminal is opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle key press (Enter to submit)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Process command
  const handleSubmit = () => {
    if (!input.trim()) return;

    // Add user input to history
    const newHistory = [...history, { type: 'user', text: `> ${input}` }];
    
    // Process command and get response
    const response = onCommand(input);
    
    // If command is 'clear', reset history
    if (input.toLowerCase().trim() === 'clear') {
      setHistory([
        { type: 'system', text: 'AEGNTIC Terminal v1.0' },
        { type: 'system', text: 'Type "help" for available commands' }
      ]);
    } else {
      // Add response to history if not null (for 'clear' command)
      if (response !== null) {
        if (input.toLowerCase().trim() === 'matrix') {
          // Special styling for matrix easter egg
          const matrixLines = Array.from({ length: 10 }, (_, i) => ({
            type: 'system',
            text: generateMatrixLine()
          }));
          setHistory([...newHistory, ...matrixLines]);
        } else {
          setHistory([...newHistory, { type: 'system', text: response }]);
        }
      } else {
        setHistory(newHistory);
      }
    }
    
    // Clear input
    setInput('');
  };

  // Generate a random line of Matrix-like characters
  const generateMatrixLine = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
    let line = '';
    const length = Math.floor(Math.random() * 30) + 10;
    
    for (let i = 0; i < length; i++) {
      line += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return line;
  };

  return (
    <div className={`terminal-container ${open ? 'open' : ''}`}>
      <div className="terminal-header">
        <div className="terminal-title">AEGNTIC TERMINAL</div>
        <button className="terminal-close" onClick={onClose}>×</button>
      </div>
      <div className="terminal-content" ref={historyRef}>
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="terminal-input-container">
        <span className="terminal-prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Terminal;
