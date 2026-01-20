import React from 'react';
import { getCurrentWeekDates } from '../utils/date';

const WeeklyReport = ({ habits }) => {
  const weekDates = getCurrentWeekDates();

  return (
    <div className="weekly-warrior-log">
      <h4 className="section-label">7-Day Battle Log</h4>
      <div className="week-strip">
        {weekDates.map(date => {
          const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const wins = habits.filter(h => h.completedDays.includes(date)).length;
          
          return (
            <div key={date} className={`week-day-box ${wins > 0 ? 'victorious' : ''}`}>
              <span className="day-name">{day}</span>
              <span className="win-count">{wins}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyReport;
