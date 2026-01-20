import React from 'react';
import Heatmap from '../components/Heatmap';

const Stats = ({ user, habits, onBack }) => {
  const totalHabits = habits?.length || 0;
  const completedToday = habits?.filter(h => h.completedDays.includes(new Date().toDateString())).length || 0;

  return (
    <div className="stats-page">
      <button className="back-btn" onClick={onBack}>← BACK TO FORGE</button>
      <h1 className="stats-title">BATTLE STATS</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{totalHabits}</span>
          <span className="stat-label">Active Missions</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedToday}</span>
          <span className="stat-label">Wins Today</span>
        </div>
      </div>

      <div className="matrix-section">
        <Heatmap habits={habits || []} />
      </div>

      <div className="pro-tip">
        <h3>Warrior Status: {completedToday > 0 ? "ELITE" : "RECRUIT"}</h3>
        <p>Your consistency matrix is your real resume.</p>
      </div>
    </div>
  );
};

export default Stats;
