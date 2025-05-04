import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ playing, onToggle }) => {
  const [time, setTime] = useState('00:00');
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element
    const audio = new Audio('/ambient-cyberpunk.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Clean up when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(error => {
          console.log('Audio playback failed:', error);
        });
        
        // Start timer for audio playback
        intervalRef.current = setInterval(() => {
          updateTimer();
        }, 1000);
      } else {
        audioRef.current.pause();
        
        // Stop timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playing]);

  // Update timer display
  const updateTimer = () => {
    if (audioRef.current) {
      const currentTime = Math.floor(audioRef.current.currentTime);
      const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
      const seconds = (currentTime % 60).toString().padStart(2, '0');
      setTime(`${minutes}:${seconds}`);
    }
  };

  // Format icon based on playing state
  const getIcon = () => {
    return playing ? '⏸️' : '▶️';
  };

  return (
    <div className="audio-player">
      <button 
        className="audio-toggle"
        onClick={onToggle}
        aria-label={playing ? 'Pause audio' : 'Play audio'}
      >
        {getIcon()}
      </button>
      <div className="audio-timecode">{time}</div>
    </div>
  );
};

export default AudioPlayer;
