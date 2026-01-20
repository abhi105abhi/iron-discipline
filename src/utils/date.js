export function today() {
  return new Date().toISOString().slice(0, 10)
}

export function lastNDays(n) {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export function getWeekNumber(dateStr) {
  const d = new Date(dateStr)
  const first = new Date(d.getFullYear(), 0, 1)
  const diff = d - first
  return Math.ceil((diff / 86400000 + first.getDay() + 1) / 7)
}
