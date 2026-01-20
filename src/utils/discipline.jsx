import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

export const addHabit = async (userId, habitName, targetDays) => {
  const userRef = doc(db, "users", userId);
  const newHabit = {
    id: Date.now().toString(),
    name: habitName.toUpperCase(),
    targetDays: parseInt(targetDays),
    completedDays: [],
    createdAt: new Date().toISOString(),
    isArchived: false
  };
  await updateDoc(userRef, {
    habits: arrayUnion(newHabit)
  });
};

export const toggleHabitDay = async (userId, habitId, date) => {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    const habits = snap.data().habits || [];
    const updatedHabits = habits.map(h => {
      if (h.id === habitId) {
        const isAlreadyDone = h.completedDays.includes(date);
        return {
          ...h,
          completedDays: isAlreadyDone 
            ? h.completedDays.filter(d => d !== date) 
            : [...h.completedDays, date]
        };
      }
      return h;
    });
    await updateDoc(userRef, { habits: updatedHabits });
  }
};

