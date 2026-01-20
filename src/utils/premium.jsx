import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Is function ko tab run karna jab user payment screenshot bhej de
export const activatePremium = async (userId) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      isPremium: true
    });
    alert("Warrior Status Activated!");
  } catch (err) {
    console.error("Activation Failed", err);
  }
};
