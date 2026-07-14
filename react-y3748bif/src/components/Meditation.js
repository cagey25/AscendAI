import React, { useState, useEffect } from 'react';

export default function Meditation() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [breathing, setBreathing] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
      setBreathing((b) => !b); // toggles circle scale for breathing effect
    }, 4000);
    return () => clearInterval(interval);
  }, [running]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div>
      <h1 className="screen-title">Mental Conditioning</h1>
      <div className={`meditation-circle ${breathing ? 'breathing' : ''}`}>
        {mins}:{secs.toString().padStart(2, '0')}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="save-btn" onClick={() => setRunning(!running)}>
          {running ? 'PAUSE' : 'START SESSION'}
        </button>
      </div>
    </div>
  );
}
