import React from 'react';

const ConsistencyMatrix = ({ habits }) => {
  // Logic to show last 30 days intensity
  return (
    <div className="matrix-view">
      <h3>Last 30 Days Grit</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px'}}>
        {[...Array(30)].map((_, i) => (
          <div key={i} className="heatmap-cell level-2" style={{width: '30px', height: '30px'}}></div>
        ))}
      </div>
    </div>
  );
};

export default ConsistencyMatrix;
