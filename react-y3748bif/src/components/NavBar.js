import React from 'react';

export default function NavBar({ active, setActive }) {
  const tabs = ['briefing', 'missions', 'coach', 'journal', 'meditation'];

  return (
    <div className="navbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`nav-item ${active === tab ? 'active' : ''}`}
          onClick={() => setActive(tab)}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}