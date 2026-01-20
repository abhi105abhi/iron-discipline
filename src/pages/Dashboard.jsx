import { useEffect, useState } from "react"
import { initData, saveData } from "../utils/storage"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [title, setTitle] = useState("")
  const [target, setTarget] = useState(21)

  useEffect(() => {
    setData(initData())
  }, [])

  if (!data) return null

  const addHabit = () => {
    if (!title) return

    const newHabit = {
      id: Date.now(),
      title,
      targetDays: target,
      completedDays: [],
      startDate: new Date().toISOString(),
      status: "active"
    }

    const updated = { ...data, habits: [...data.habits, newHabit] }
    setData(updated)
    saveData(updated)
    setTitle("")
  }

  const markDone = (id) => {
    const today = new Date().toISOString().slice(0, 10)

    const habits = data.habits.map(h => {
      if (h.id !== id) return h
      if (h.completedDays.includes(today)) return h

      const updatedDays = [...h.completedDays, today]
      const status =
        updatedDays.length >= h.targetDays ? "completed" : "active"

      return { ...h, completedDays: updatedDays, status }
    })

    const updated = { ...data, habits }
    setData(updated)
    saveData(updated)
  }

  return (
    <div className="container">
      <h1>IRON</h1>
      <p>No motivation. Only consistency.</p>

      <div className="card">
        <input
          placeholder="Habit name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <select value={target} onChange={e => setTarget(+e.target.value)}>
          <option value={7}>7 days</option>
          <option value={15}>15 days</option>
          <option value={21}>21 days</option>
          <option value={30}>30 days</option>
          <option value={60}>60 days</option>
        </select>
        <button onClick={addHabit}>Lock Habit</button>
      </div>

      {data.habits.map(h => (
        <div key={h.id} className="habit">
          <strong>{h.title}</strong>
          <span>{h.completedDays.length}/{h.targetDays}</span>
          <span className={h.status}>{h.status.toUpperCase()}</span>
          {h.status === "active" && (
            <button onClick={() => markDone(h.id)}>Done Today</button>
          )}
        </div>
      ))}

      <a href="/stats" className="link">View Stats</a>
    </div>
  )
}
