import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import Paywall from './components/Paywall';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        let userData;
        if (!userSnap.exists()) {
          // New User Setup
          userData = {
            name: currentUser.displayName,
            email: currentUser.email,
            createdAt: Date.now(),
            isPremium: false
          };
          await setDoc(userRef, userData);
        } else {
          userData = userSnap.data();
        }

        // 15-Day Trial Logic
        const signupDate = userData.createdAt;
        const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;
        if (!userData.isPremium && (Date.now() - signupDate > fifteenDaysInMs)) {
          setIsExpired(true);
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loader">FORGING YOUR WILL...</div>;
  if (!user) return <Auth />;
  if (isExpired) return <Paywall />;

  return <Dashboard user={user} />;
}

export default App;
