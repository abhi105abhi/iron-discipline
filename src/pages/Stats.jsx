import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initData } from "../utils/storage";
import ProgressRing from "../components/ProgressRing";
import Heatmap from "../components/Heatmap";
import WeeklyReport from "../components/WeeklyReport";
import Paywall from "../components/Paywall";

function getCurrentStreak(completedDays) {
  // same as in Dashboard
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

export default function Stats() {
  const [data, setData] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

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

  const totalHabits = data.habits.length;
  const completedHabits = data.habits.filter(h => h.status === "completed").length;
  const avgProgress = totalHabits ? Math.round(data.habits.reduce((sum, h) => sum + Math.min(100, (h.completedDays.length / h.targetDays * 100)), 0) / totalHabits) : 0;
  const maxStreak = Math.max(0, ...data.habits.map(h => getCurrentStreak(h.completedDays)));

  const allCompletedDays = data.habits.flatMap(h => h.completedDays);

  const badges = [];
  if (completedHabits > 0) badges.push("🛡️ Iron Warrior");
  if (completedHabits >= 3) badges.push("⚔️ Spartan");
  if (maxStreak >= 30) badges.push("🔥 Unbreakable");
  if (maxStreak >= 100) badges.push("🏆 Legend");

  const verdict = avgProgress >= 80 ? "Elite Discipline" : avgProgress >= 50 ? "Forging Ahead" : "Time to Grind";

  return (
    <div className="container stats-container">
      <div className="stats-header">
        <h1>IRON DISCIPLINE REPORT</h1>
        <p>Actions don’t lie.</p>
      </div>

      <div className="score-section">
        <ProgressRing value={avgProgress} size={200} />
        <p className="score-verdict">{verdict}</p>
      </div>

      <div className="metrics">
        <div>
          <span className="metric-number">{totalHabits}</span>
          <span className="metric-label">Total Habits</span>
        </div>
        <div>
          <span className="metric-number">{completedHabits}</span>
          <span className="metric-label">Completed</span>
        </div>
        <div>
          <span className="metric-number">{maxStreak}</span>
          <span className="metric-label">Longest Streak</span>
        </div>
      </div>

      <WeeklyReport habits={data.habits} />

      <div className="section">
        <h2>ACHIEVEMENTS</h2>
        {badges.length === 0 ? <p>No badges yet. Keep grinding.</p> : badges.map(b => <p key={b} style={{ fontSize: "24px" }}>{b}</p>)}
      </div>

      <div className="section">
        <h2>CONSISTENCY MATRIX (LAST 105 DAYS)</h2>
        <Heatmap completedDaysAll={allCompletedDays} />
      </div>

      <Link to="/" className="back-link">← Back to Dashboard</Link>
    </div>
  );
    }
