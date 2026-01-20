// Last 365 days ki dates generate karne ke liye
export const getYearlyDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    dates.push(d.toDateString());
  }
  return dates;
};

// Current week ki dates
export const getCurrentWeekDates = () => {
  const week = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    week.push(d.toDateString());
  }
  return week;
};
