import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';

// Habit add karne ke liye
export const addHabit = async (userId, habitName, targetDays) => {
  const userRef = doc(db, "users", userId);
  const newHabit = {
    id: Date.now(),
    name: habitName,
    targetDays: parseInt(targetDays),
    completedDays: [],
    createdAt: new Date().toISOString(),
    status: 'ACTIVE'
  };
  await updateDoc(userRef, {
    habits: arrayUnion(newHabit)
  });
};

// Habit complete karne ka logic
export const toggleHabitDay = async (userId, habitId, date) => {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    const habits = snap.data().habits;
    const updatedHabits = habits.map(h => {
      if (h.id === habitId) {
        const hasDate = h.completedDays.includes(date);
        return {
          ...h,
          completedDays: hasDate 
            ? h.completedDays.filter(d => d !== date) 
            : [...h.completedDays, date]
        };
      }
      return h;
    });
    await updateDoc(userRef, { habits: updatedHabits });
  }
};
