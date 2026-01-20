import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { addHabit, toggleHabitDay } from '../utils/discipline';
import ProgressRing from '../components/ProgressRing';
import Stats from './Stats';

const Dashboard = ({ user }) => {
  const [habits, setHabits] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [customHabit, setCustomHabit] = useState('');
  const [template, setTemplate] = useState('');
  const [target, setTarget] = useState(30);

  const templates = ["Cold Shower", "No Fap", "5AM Wakeup", "10km Run", "Deep Work"];

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setHabits(doc.data()?.habits || []);
    });
    return () => unsub();
  }, [user.uid]);

  const handleLockIn = async () => {
    const habitTitle = template || customHabit;
    if (!habitTitle) return alert("Select or Enter a Habit!");
    await addHabit(user.uid, habitTitle, target);
    setCustomHabit('');
    setTemplate('');
  };

  if (showStats) return <Stats user={user} onBack={() => setShowStats(false)} />;

  return (
    <div className="dashboard-container">
      <h1 className="brand-logo">IRON DISCIPLINE</h1>
      <p className="tagline">No Excuses. Forge Your Will.</p>
      <p className="quote">"Pain is weakness leaving the body."</p>

      <div className="habit-entry-card">
        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="">Select Masculine Template</option>
          {templates.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <input 
          type="text" 
          placeholder="Or custom habit title" 
          value={customHabit}
          onChange={(e) => setCustomHabit(e.target.value)}
        />

        <input 
          type="number" 
          value={target} 
          onChange={(e) => setTarget(e.target.value)} 
          placeholder="Days Target"
        />

        <button className="btn-primary" onClick={handleLockIn}>LOCK IN HABIT</button>
      </div>

      <div className="active-habits">
        {habits.map(h => (
          <div key={h.id} className="habit-card">
            <div>
              <h3>{h.name}</h3>
              <p>{h.completedDays.length}/{h.targetDays} ACTIVE</p>
              <button 
                className={`done-btn ${h.completedDays.includes(new Date().toDateString()) ? 'completed' : ''}`}
                onClick={() => toggleHabitDay(user.uid, h.id, new Date().toDateString())}
              >
                DONE TODAY
              </button>
            </div>
            <ProgressRing radius={40} stroke={5} progress={h.completedDays.length} target={h.targetDays} />
          </div>
        ))}
      </div>

      <button className="text-link" onClick={() => setShowStats(true)}>
        View Full Discipline Report →
      </button>
    </div>
  );
};

export default Dashboard;
