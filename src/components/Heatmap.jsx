import { lastNDays } from "../utils/date"

export default function Heatmap({ habits }) {
  const days = lastNDays(30)

  const countForDay = (day) =>
    habits.filter(h => h.completedDays.includes(day)).length

  return (
    <div className="heatmap">
      {days.map(d => {
        const count = countForDay(d)
        let level = "empty"
        if (count >= 3) level = "high"
        else if (count === 2) level = "mid"
        else if (count === 1) level = "low"

        return <div key={d} className={`heat ${level}`} />
      })}
    </div>
  )
}
