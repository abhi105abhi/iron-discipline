const KEY = "iron_data"

export function getData() {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : null
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function initData() {
  const existing = getData()
  if (existing) return existing

  const startDate = Date.now()

  const fresh = {
    startDate,
    habits: [],
    accessDays: 15
  }

  saveData(fresh)
  return fresh
}
