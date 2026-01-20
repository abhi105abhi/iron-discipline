import React from 'react';

const BottomNav = ({ currentView, setView }) => {
  const tabs = [
    { id: 'forge', label: 'THE FORGE', icon: '🔥' },
    { id: 'stats', label: 'ANALYTICS', icon: '📊' },
    { id: 'profile', label: 'WARRIOR', icon: '🛡️' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`nav-item ${currentView === tab.id ? 'active' : ''}`}
          onClick={() => setView(tab.id)}
        >
          <span style={{fontSize: '20px'}}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
          
