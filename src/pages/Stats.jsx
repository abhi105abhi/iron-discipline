import { useEffect, useState } from "react"
import { initData } from "../utils/storage"
import { calculateDisciplineScore } from "../utils/discipline"
import Heatmap from "../components/Heatmap"

export default function Stats() {
  const [data, setData] = useState(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const d = initData()
    setData(d)

    const target = calculateDisciplineScore(d.habits)
    let i = 0
    const t = setInterval(() => {
      i++
      setScore(i)
      if (i >= target) clearInterval(t)
    }, 25)
  }, [])

  if (!data) return null

  const totalHabits = data.habits.length
  const completedHabits = data.habits.filter(h => h.status === "completed").length

  const verdict =
    score >= 80
      ? "You are operating with discipline."
      : score >= 50
      ? "Inconsistent. Potential wasted."
      : "Below standard. Fix this."

  return (
    <div className="stats-container">
      {/* HEADER */}
      <div className="stats-header">
        <h1>DISCIPLINE REPORT</h1>
        <p>Actions don’t lie.</p>
      </div>

      {/* HERO SCORE */}
      <div className="score-section">
        <div className="score-number">{score}%</div>
        <div className="score-label">CURRENT DISCIPLINE</div>
        <div className="score-verdict">{verdict}</div>
      </div>

      {/* KEY METRICS */}
      <div className="metrics">
        <div>
          <span className="metric-number">{totalHabits}</span>
          <span className="metric-label">Habits Locked</span>
        </div>
        <div>
          <span className="metric-number">{completedHabits}</span>
          <span className="metric-label">Habits Completed</span>
        </div>
      </div>

      {/* CONSISTENCY */}
      <div className="section">
        <h2>CONSISTENCY (LAST 30 DAYS)</h2>
        <Heatmap habits={data.habits} />
      </div>

      <a href="/" className="back-link">Return</a>
    </div>
  )
        }
