import { useEffect, useState } from "react"
import { initData } from "../utils/storage"
import { calculateDisciplineScore } from "../utils/discipline"
import ProgressRing from "../components/ProgressRing"
import Heatmap from "../components/Heatmap"
import WeeklyReport from "../components/WeeklyReport"

export default function Stats() {
  const [data, setData] = useState(null)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const d = initData()
    setData(d)

    const target = calculateDisciplineScore(d.habits)
    let i = 0
    const timer = setInterval(() => {
      i++
      setAnimatedScore(i)
      if (i >= target) clearInterval(timer)
    }, 20)
  }, [])

  if (!data) return null

  const daysUsed =
    (Date.now() - data.startDate) / (1000 * 60 * 60 * 24)
  const locked = daysUsed > data.accessDays

  return (
    <div className="container">
      <h1>STATS</h1>

      <div className="center">
        <ProgressRing value={animatedScore} />
        <p>Discipline Score</p>
      </div>

      <WeeklyReport habits={data.habits} />

      <h3>Consistency</h3>
      <Heatmap habits={data.habits} />

      {locked && (
        <div className="paywall">
          <p>Free access over.</p>
          <a
            href="https://instagram.com/direct/new/?text=I%20want%20to%20purchase%20lifetime%20access%20for%20the%20discipline%20portal"
            target="_blank"
          >
            Unlock Lifetime ₹99
          </a>
        </div>
      )}

      <a href="/" className="link">Back</a>
    </div>
  )
}
