import React, { useState } from 'react';
import { useStore } from './store/useStore';
import { useAuth } from './hooks/useAuth';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import BottomNav from './components/BottomNav';
import Paywall from './components/Paywall';
import './styles.css';

function App() {
  const { user, loading, isPremium } = useStore();
  const [view, setView] = useState('forge');
  
  // Auth and Profile Sync
  useAuth();

  if (loading) return <div className="loader">FORGING...</div>;
  if (!user) return <Auth />;

  return (
    <div className="app-shell">
      <div className="view-container">
        {view === 'forge' && <Dashboard />}
        {view === 'stats' && <Stats />}
        {view === 'profile' && (
          <div className="profile-view">
            <h1 className="brand-logo">WARRIOR</h1>
            <div className="profile-card">
              <p>EMAIL: {user.email}</p>
              <p>STATUS: <span className={isPremium ? 'gold' : 'red'}>
                {isPremium ? 'PREMIUM ACCESS' : 'TRIAL MODE'}
              </span></p>
            </div>
            <button onClick={() => window.location.reload()} className="btn-primary">SYNC DATA</button>
          </div>
        )}
      </div>
      <BottomNav currentView={view} setView={setView} />
    </div>
  );
}

export default App;
