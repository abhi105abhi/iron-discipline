export default function Heatmap({ completedDaysAll }) {
  const days = [];
  for (let i = 104; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().slice(0, 10));
  }

  const counts = {};
  completedDaysAll.forEach(d => {
    counts[d] = (counts[d] || 0) + 1;
  });

  const max = Math.max(1, ...Object.values(counts));

  return (
    <div className="heatmap">
      {days.map(day => {
        const count = counts[day] || 0;
        const intensity = count === 0 ? "" : count < max / 3 ? "low" : count < max * 2 / 3 ? "mid" : "high";
        return <div key={day} className={`heat ${intensity}`} />;
      })}
    </div>
  );
}
