import React from 'react';

const ProgressRing = ({ radius, stroke, progress, target }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / target) * circumference;

  return (
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
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="white"
        dy=".3em"
        fontSize="14px"
        fontWeight="bold"
      >
        {Math.round((progress / target) * 100)}%
      </text>
    </svg>
  );
};

export default ProgressRing;
