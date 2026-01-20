import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Local storage ki jagah Firebase se data fetch karne ka helper
export const getUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

// Premium status check karne ke liye helper
export const checkPremiumStatus = async (userId) => {
  const data = await getUserData(userId);
  return data?.isPremium || false;
};
