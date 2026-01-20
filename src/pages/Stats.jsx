import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Heatmap from '../components/Heatmap';
import WeeklyReport from '../components/WeeklyReport';

const Stats = ({ user }) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setHabits(doc.data()?.habits || []);
    });
    return () => unsub();
  }, [user.uid]);

  // Discipline Score Logic (Consistency % + Total Streaks)
  const calculateScore = () => {
    if (habits.length === 0) return 0;
    const totalPossible = habits.reduce((acc, h) => acc + h.targetDays, 0);
    const totalDone = habits.reduce((acc, h) => acc + h.completedDays.length, 0);
    return Math.round((totalDone / totalPossible) * 100) || 0;
  };

  const score = calculateScore();

  return (
    <div className="stats-page">
      <header className="stats-header">
        <h1>BATTLE ANALYTICS</h1>
        <div className="score-circle">
          <span className="score-val">{score}</span>
          <span className="score-label">DISCIPLINE SCORE</span>
        </div>
      </header>

      <div className="stats-grid">
        <section className="stats-card">
          <WeeklyReport habits={habits} />
        </section>
        
        <section className="stats-card full-width">
          <Heatmap habits={habits} />
        </section>
      </div>

      <div className="rank-section">
        <h3>YOUR STATUS: {score > 80 ? 'IRON LORD' : score > 50 ? 'WARRIOR' : 'RECRUIT'}</h3>
        <p>Keep forging. Weakness is a choice.</p>
      </div>
    </div>
  );
};

export default Stats;
