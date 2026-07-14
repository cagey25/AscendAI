import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Briefing from './components/Briefing';
import Missions from './components/Missions';
import Coach from './components/Coach';
import Journal from './components/Journal';
import Meditation from './components/Meditation';

export default function App() {
  const [active, setActive] = useState('briefing');

  const screens = {
    briefing: <Briefing />,
    missions: <Missions />,
    coach: <Coach />,
    journal: <Journal />,
    meditation: <Meditation />,
  };

  return (
    <div className="app-shell">
      <div className="screen">{screens[active]}</div>
      <NavBar active={active} setActive={setActive} />
    </div>
  );
}
