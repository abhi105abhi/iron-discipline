export default function ProgressRing({ value, size = 120 }) {
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-ring">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#222" strokeWidth="12" fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke="#dc2626" strokeWidth="12" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="progress-ring-text">{Math.round(value)}%</div>
    </div>
  );
}
