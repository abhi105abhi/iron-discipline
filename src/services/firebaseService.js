import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';

export const FirebaseService = {
  // User Profile Logic
  async getUserProfile(uid) {
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  },

  async createUserProfile(user) {
    const userRef = doc(db, "users", user.uid);
    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      createdAt: Date.now(),
      isPremium: false,
      habits: []
    };
    await setDoc(userRef, userData);
    return userData;
  },

  // Habits Logic
  subscribeToHabits(uid, callback) {
    return onSnapshot(doc(db, "users", uid), (doc) => {
      callback(doc.data()?.habits || []);
    });
  },

  async syncHabits(uid, updatedHabits) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { habits: updatedHabits });
  }
};
