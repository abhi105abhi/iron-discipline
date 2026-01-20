export function calculateDisciplineScore(habits) {
  if (habits.length === 0) return 0

  let totalTargets = 0
  let totalDone = 0

  habits.forEach(h => {
    totalTargets += h.targetDays
    totalDone += h.completedDays.length
  })

  return Math.round((totalDone / totalTargets) * 100)
}
