import React from 'react';
import { getYearlyDates } from '../utils/date';

const Heatmap = ({ habits }) => {
  const allDates = getYearlyDates();
  
  // Saare habits ki completed dates ko ek jagah jama karo
  const completedMap = {};
  habits.forEach(h => {
    h.completedDays.forEach(date => {
      completedMap[date] = (completedMap[date] || 0) + 1;
    });
  });

  return (
    <div className="heatmap-container">
      <h4>IRON CONSISTENCY (365 DAYS)</h4>
      <div className="heatmap-grid">
        {allDates.map(date => {
          const count = completedMap[date] || 0;
          let intensity = 'level-0';
          if (count > 0) intensity = 'level-1';
          if (count > 2) intensity = 'level-2';
          if (count > 4) intensity = 'level-3';
          
          return (
            <div 
              key={date} 
              className={`heatmap-cell ${intensity}`} 
              title={`${date}: ${count} habits done`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Heatmap;
  
