import React from 'react';

const BottomNav = ({ setView }) => {
  return (
    <div className="bottom-nav">
      <button onClick={() => setView('forge')} className="nav-item">🔥 FORGE</button>
      <button onClick={() => setView('stats')} className="nav-item">📊 STATS</button>
      <button onClick={() => setView('profile')} className="nav-item">👤 WARRIOR</button>
    </div>
  );
};

export default BottomNav;
