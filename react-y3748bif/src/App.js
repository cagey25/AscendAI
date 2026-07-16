import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Briefing from './components/Briefing';
import Missions from './components/Missions';
import Coach from './components/Coach';
import Journal from './components/Journal';
import Meditation from './components/Meditation';

export default function App() {
  const [active, setActive] = useState('briefing');
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const screens = {
    briefing: <Briefing />,
    missions: <Missions />,
    coach: <Coach />,
    journal: <Journal />,
    meditation: <Meditation />,
  };

  if (checkingAuth) {
    return <div className="app-shell"><p style={{ padding: 24 }}>Loading...</p></div>;
  }

  if (!user) {
    return <div className="app-shell"><Login /></div>;
  }

  return (
    <div className="app-shell">
      <div className="screen">{screens[active]}</div>
      <NavBar active={active} setActive={setActive} />
    </div>
  );
}