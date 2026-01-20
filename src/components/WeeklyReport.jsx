import { getWeekNumber } from "../utils/date"

export default function WeeklyReport({ habits }) {
  const nowWeek = getWeekNumber(new Date().toISOString())

  let done = 0
  let total = 0

  habits.forEach(h => {
    h.completedDays.forEach(d => {
      if (getWeekNumber(d) === nowWeek) done++
    })
    total += 7
  })

  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="card">
      <h3>Weekly Report</h3>
      <p>{done} actions completed</p>
      <p>Consistency: {pct}%</p>
    </div>
  )
}
