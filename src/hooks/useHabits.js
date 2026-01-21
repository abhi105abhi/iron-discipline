import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { FirebaseService } from '../services/firebaseService';

export const useHabits = () => {
  const { user, habits, setHabits } = useStore();

  useEffect(() => {
    if (!user) return;
    const unsub = FirebaseService.subscribeToHabits(user.uid, (data) => {
      setHabits(data);
    });
    return unsub;
  }, [user, setHabits]);

  const toggleHabit = async (habitId) => {
    const today = new Date().toDateString();
    const updatedHabits = habits.map(h => {
      if (h.id === habitId) {
        const hasDate = h.completedDays.includes(today);
        return {
          ...h,
          completedDays: hasDate 
            ? h.completedDays.filter(d => d !== today) 
            : [...h.completedDays, today]
        };
      }
      return h;
    });
    await FirebaseService.syncHabits(user.uid, updatedHabits);
  };

  return { habits, toggleHabit };
};
