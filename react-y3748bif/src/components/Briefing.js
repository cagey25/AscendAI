import React, { useState, useEffect } from 'react';

const missionText = `RECRUIT, IT'S TIME.

Your orders are simple:
Complete your missions.
Level up. Become unstoppable.

No excuses. No shortcuts.
Discipline builds dominance.`;

export default function Briefing() {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < missionText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + missionText[index]);
        setIndex(index + 1);
        playTick();
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  function playTick() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 600;
    gain.gain.value = 0.02;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  }

  return (
    <div style={{ position: 'relative', minHeight: '500px' }}>
      <div className="hero-bg"></div>

      <div className="hero-content">
        <h1 className="screen-title">Mission Briefing</h1>

        <div className="briefing-letter">
          {displayedText}
          {index < missionText.length && (
            <span className="cursor-blink">&nbsp;</span>
          )}
        </div>

        {index >= missionText.length && (
          <div className="opponent-quote">
            <h2>YOUR NEXT OPPONENT IS YOU.</h2>
            <p>YESTERDAY WAS YOUR WARM UP.</p>
          </div>
        )}
      </div>
    </div>
  );
}
