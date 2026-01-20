import React from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Auth = () => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Naya user hai, trial start date set karo
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: Date.now(),
          isPremium: false
        });
      }
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="brand-logo">SUDHAR JA</h1>
      <p className="tagline">No Excuses. Forge Your Will.</p>
      <button className="login-btn" onClick={signIn}>
        ENTER THE FORGE (Google Login)
      </button>
    </div>
  );
};

export default Auth;
    
