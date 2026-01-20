import React from 'react';
import { auth } from '../firebase';

const Navbar = ({ user }) => {
  return (
    <nav className="nav-bar" style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 30px', 
      background: '#111',
      borderBottom: '1px solid #333'
    }}>
      <div className="logo" style={{color: '#cc0000', fontWeight: 'bold'}}>SUDHAR JA</div>
      <div className="user-info" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <span style={{fontSize: '12px'}}>{user.displayName}</span>
        <button 
          onClick={() => auth.signOut()}
          style={{
            background: 'transparent', 
            color: '#888', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
