import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import BottomNav from './components/BottomNav';
import Paywall from './components/Paywall';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('forge');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loader">FORGING...</div>;
  if (!user) return <Auth />;

  return (
    <>
      <div className="view-container">
        {view === 'forge' && <Dashboard user={user} />}
        {view === 'stats' && <Stats user={user} />}
        {view === 'profile' && (
          <div className="profile-view">
            <h1 className="brand-logo">WARRIOR</h1>
            <p>{user.displayName}</p>
            <button onClick={() => auth.signOut()} className="btn-primary">ABANDON MISSIONS (LOGOUT)</button>
          </div>
        )}
      </div>
      <BottomNav currentView={view} setView={setView} />
    </>
  );
}

export default App;
