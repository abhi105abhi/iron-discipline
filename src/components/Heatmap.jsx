import React from 'react';
import { getYearlyDates } from '../utils/date';

const Heatmap = ({ habits }) => {
  const allDates = getYearlyDates();
  const completedMap = {};

  habits.forEach(h => {
    h.completedDays.forEach(date => {
      completedMap[date] = (completedMap[date] || 0) + 1;
    });
  });

  return (
    <div className="heatmap-section">
      <h4 className="section-label">Consistency Matrix</h4>
      <div className="heatmap-grid">
        {allDates.map(date => {
          const count = completedMap[date] || 0;
          let level = '0';
          if (count >= 1) level = '1';
          if (count >= 3) level = '2';
          if (count >= 5) level = '3';

          return (
            <div 
              key={date} 
              className={`heatmap-cell level-${level}`} 
              title={`${date}: ${count} habits conquered`}
            />
          );
        })}
      </div>
      <div className="heatmap-legend">
        <span>LESS</span>
        <div className="heatmap-cell level-0"></div>
        <div className="heatmap-cell level-1"></div>
        <div className="heatmap-cell level-2"></div>
        <div className="heatmap-cell level-3"></div>
        <span>MORE</span>
      </div>
    </div>
  );
};

export default Heatmap;
