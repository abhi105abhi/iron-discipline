import React from 'react';

const Paywall = () => {
  const instagramLink = "https://ig.me/m/your_id?text=I%20want%20to%20purchase%20lifetime%20access%20for%20SUDHAR%20JA";

  return (
    <div className="paywall-container">
      <div className="lock-icon">🔒</div>
      <h1 className="brand-logo">TRIAL EXPIRED</h1>
      <p className="paywall-text">
        DISCIPLINE IS NOT FREE. YOU'VE USED YOUR 15 DAYS. <br />
        NOW PROVE YOU'RE SERIOUS ABOUT CHANGE.
      </p>
      <div className="price-tag">
        <span className="old-price">₹499</span>
        <span className="new-price">₹99</span>
        <p>LIFETIME ACCESS</p>
      </div>
      <a href={instagramLink} target="_blank" rel="noreferrer">
        <button className="btn-primary">ACTIVATE WARRIOR STATUS</button>
      </a>
      <p className="footer-note">DM "LIFETIME ACCESS" TO UPGRADE</p>
    </div>
  );
};

export default Paywall;
