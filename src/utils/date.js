export function getWeekNumber(dateStr) {
  const date = new Date(dateStr);
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  const day = Math.floor(diff / 86400000);
  return Math.ceil((day + start.getDay() + 1) / 7);
}
