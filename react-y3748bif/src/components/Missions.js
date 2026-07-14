import React, { useState } from 'react';

const initialMissions = [
  {
    id: 1,
    name: 'Combat Training',
    desc: 'Workout for at least 45 min',
    xp: 150,
    done: false,
  },
  {
    id: 2,
    name: 'Intel Acquisition',
    desc: 'Read or listen for 30 min',
    xp: 100,
    done: false,
  },
  {
    id: 3,
    name: 'Mental Conditioning',
    desc: 'Meditate for 10 min',
    xp: 75,
    done: false,
  },
  {
    id: 4,
    name: 'Recovery Protocol',
    desc: 'Sleep 7-8 hours',
    xp: 125,
    done: false,
  },
];

export default function Missions() {
  const [missions, setMissions] = useState(initialMissions);

  function toggleMission(id) {
    setMissions(
      missions.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  }

  return (
    <div>
      <h1 className="screen-title">Today's Missions</h1>
      {missions.map((m) => (
        <div
          key={m.id}
          className={`mission ${m.done ? 'done' : ''}`}
          onClick={() => toggleMission(m.id)}
        >
          <div>
            <div className="mission-name">{m.name}</div>
            <div className="mission-xp">
              {m.desc} · {m.xp} XP
            </div>
          </div>
          <div className="check">✓</div>
        </div>
      ))}
    </div>
  );
}
