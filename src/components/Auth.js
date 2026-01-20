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
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: Date.now(),
          isPremium: false,
          habits: []
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
      <button className="btn-primary" onClick={signIn}>
        ENTER THE FORGE (GOOGLE LOGIN)
      </button>
      <p className="footer-note" style={{marginTop: '20px', opacity: 0.5}}>
        "Discipline is the only way out."
      </p>
    </div>
  );
};

export default Auth;
    
