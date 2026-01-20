import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { addHabit, toggleHabitDay } from '../utils/discipline';
import ProgressRing from '../components/ProgressRing';

const Dashboard = ({ user }) => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [target, setTarget] = useState(21);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setHabits(doc.data()?.habits || []);
    });
    return () => unsub();
  }, [user.uid]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newHabit) return;
    await addHabit(user.uid, newHabit, target);
    setNewHabit('');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>WARRIOR: {user.displayName}</h2>
        <p>FORGE YOUR DESTINY. NO EXCUSES.</p>
      </header>

      <form className="habit-form" onSubmit={handleAdd}>
        <input 
          type="text" 
          placeholder="ENTER NEW HABIT..." 
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="21">21 DAYS (Basic)</option>
          <option value="75">75 DAYS (Hardcore)</option>
          <option value="90">90 DAYS (Iron Will)</option>
        </select>
        <button type="submit" className="btn-primary">LOCK IT IN</button>
      </form>

      <div className="habit-grid">
        {habits.map(habit => (
          <div key={habit.id} className="habit-card">
            <div className="card-info">
              <h3>{habit.name}</h3>
              <p>{habit.completedDays.length} / {habit.targetDays} DAYS DONE</p>
              <button 
                className="done-btn" 
                onClick={() => toggleHabitDay(user.uid, habit.id, new Date().toDateString())}
              >
                {habit.completedDays.includes(new Date().toDateString()) ? 'COMPLETED' : 'MARK DONE'}
              </button>
            </div>
            <ProgressRing radius={50} stroke={6} progress={habit.completedDays.length} target={habit.targetDays} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
