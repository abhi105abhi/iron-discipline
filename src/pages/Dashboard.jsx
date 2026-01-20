import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initData, saveData } from "../utils/storage";
import ProgressRing from "../components/ProgressRing";
import Paywall from "../components/Paywall";

const templates = [
  { title: "Daily Gym", targetDays: 66 },
  { title: "Cold Shower", targetDays: 30 },
  { title: "No PMO", targetDays: 90 },
  { title: "5 AM Wakeup", targetDays: 30 },
  { title: "Meditation", targetDays: 21 },
  { title: "Reading 30min", targetDays: 30 },
  { title: "No Sugar", targetDays: 40 }
];

const quotes = [
  "Stay hard! — David Goggins",
  "Who's gonna carry the boats?",
  "Discipline is choosing between what you want now and what you want most.",
  "No excuses. Only iron will.",
  "Pain is weakness leaving the body.",
  "Suffer the pain of discipline or suffer the pain of regret."
];

function getCurrentStreak(completedDays) {
  if (completedDays.length === 0) return 0;
  const set = new Set(completedDays);
  let streak = 0;
  let date = new Date();
  while (true) {
    const str = date.toISOString().slice(0, 10);
    if (set.has(str)) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else break;
  }
  return streak;
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(30);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const loaded = initData();
    const daysSinceStart = Math.floor((new Date() - new Date(loaded.startDate)) / 86400000);
    if (daysSinceStart > 15 && !loaded.lifetimeAccess) {
      setIsExpired(true);
    }
    setData(loaded);
  }, []);

  if (!data) return null;
  if (isExpired) return <Paywall />;

  const addHabit = () => {
    if (!title) return;
    const newHabit = {
      id: Date.now(),
      title,
      targetDays: Number(target),
      completedDays: [],
      status: "active"
    };
    const updated = { ...data, habits: [...data.habits, newHabit] };
    setData(updated);
    saveData(updated);
    setTitle("");
    setTarget(30);
  };

  const markDone = (id) => {
    const today = new Date().toISOString().slice(0, 10);
    const habits = data.habits.map(h => {
      if (h.id !== id || h.completedDays.includes(today)) return h;
      const newDays = [...h.completedDays, today];
      return { ...h, completedDays: newDays, status: newDays.length >= h.targetDays ? "completed" : "active" };
    });
    const updated = { ...data, habits };
    setData(updated);
    saveData(updated);
  };

  const handleTemplate = (e) => {
    const tmpl = templates.find(t => t.title === e.target.value);
    if (tmpl) {
      setTitle(tmpl.title);
      setTarget(tmpl.targetDays);
    }
  };

  return (
    <div className="container">
      <h1>IRON DISCIPLINE</h1>
      <p className="subtitle">No Excuses. Forge Your Will.</p>
      <p className="quote">{quote}</p>

      <select onChange={handleTemplate} defaultValue="">
        <option value="" disabled>Select Masculine Template</option>
        {templates.map(t => <option key={t.title}>{t.title} ({t.targetDays} days)</option>)}
      </select>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Or custom habit title" />
      <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="Target days" />
      <button onClick={addHabit}>Lock In Habit</button>

      {data.habits.map(h => {
        const progress = Math.min(100, (h.completedDays.length / h.targetDays) * 100);
        const streak = getCurrentStreak(h.completedDays);
        return (
          <div key={h.id} className="habit-item">
            <h3>{h.title}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <ProgressRing value={progress} size={80} />
              <div>
                <p>{h.completedDays.length} / {h.targetDays} days</p>
                {streak > 0 && <p>🔥 Current streak: {streak} days</p>}
                <p>Status: {h.status.toUpperCase()}</p>
              </div>
            </div>
            {h.status === "active" && <button onClick={() => markDone(h.id)}>Mark Done Today</button>}
          </div>
        );
      })}

      <Link to="/stats" className="back-link">View Full Discipline Report →</Link>
    </div>
  );
}
