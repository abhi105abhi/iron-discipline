import React from 'react';

const Paywall = () => {
  // Replace YOUR_INSTAGRAM_USERNAME with your actual handle
  const instagramLink = "https://ig.me/m/abhi105abhi?text=Bhai%20SUDHAR%20JA%20ka%20lifetime%20access%20chahiye";

  return (
    <div className="paywall-container">
      <div className="lock-icon" style={{fontSize: '50px'}}>🛡️</div>
      <h1 className="brand-logo">TRIAL ENDED</h1>
      <p className="paywall-text">
        15 DAYS ARE UP. <br />
        ARE YOU A WARRIOR OR JUST A TOURIST?
      </p>
      <div className="price-tag">
        <span className="old-price">₹499</span>
        <span className="new-price">₹99</span>
        <p style={{fontSize: '14px', color: '#888'}}>ONLY FOR THE IRON-WILLED</p>
      </div>
      <a href={instagramLink} target="_blank" rel="noreferrer">
        <button className="btn-primary">ACTIVATE LIFETIME ACCESS</button>
      </a>
      <p className="footer-note" style={{marginTop: '20px', fontSize: '12px'}}>
        DM "LIFETIME" ON INSTAGRAM TO UNLOCK
      </p>
    </div>
  );
};

export default Paywall;
