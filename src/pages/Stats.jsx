import { useEffect, useState } from "react"
import { initData } from "../utils/storage"
import { calculateDisciplineScore } from "../utils/discipline"

export default function Stats() {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(initData())
  }, [])

  if (!data) return null

  const daysUsed = Math.floor(
    (Date.now() - data.startDate) / (1000 * 60 * 60 * 24)
  )

  const accessLeft = data.accessDays - daysUsed
  const locked = accessLeft <= 0

  const score = calculateDisciplineScore(data.habits)

  return (
    <div className="container">
      <h1>STATS</h1>

      <div className="stats-grid">
        <div className="stat-box">
          <h2>{score}%</h2>
          <p>Discipline Score</p>
        </div>

        <div className="stat-box">
          <h2>{data.habits.length}</h2>
          <p>Total Habits</p>
        </div>

        <div className="stat-box">
          <h2>
            {data.habits.filter(h => h.status === "completed").length}
          </h2>
          <p>Completed</p>
        </div>
      </div>

      {locked && (
        <div className="paywall">
          <p>Your free access is over.</p>
          <a
            href="https://instagram.com/direct/new/?text=I%20want%20to%20purchase%20lifetime%20access%20for%20the%20discipline%20portal"
            target="_blank"
          >
            Unlock Lifetime Discipline ₹99
          </a>
        </div>
      )}

      <a href="/" className="link">Back</a>
    </div>
  )
}
