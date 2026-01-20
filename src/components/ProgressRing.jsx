import React from 'react';

const ProgressRing = ({ radius, stroke, progress, target }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (Math.min(progress, target) / target) * circumference;

  return (
    <div className="progress-ring-container">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#1a1a1a"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#cc0000"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="ring-text">
        <span className="percent">{Math.round((progress / target) * 100)}%</span>
      </div>
    </div>
  );
};

export default ProgressRing;
          
