import React from 'react';
import { getCurrentWeekDates } from '../utils/date';

const WeeklyReport = ({ habits }) => {
  const weekDates = getCurrentWeekDates();
  
  return (
    <div className="weekly-report">
      <h4>WEEKLY WARRIOR LOG</h4>
      <div className="week-grid">
        {weekDates.map(date => {
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const isDone = habits.some(h => h.completedDays.includes(date));
          
          return (
            <div key={date} className={`week-day ${isDone ? 'done' : ''}`}>
              <span>{dayName}</span>
              <div className="status-dot"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyReport;
