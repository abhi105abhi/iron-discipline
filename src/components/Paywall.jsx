import { useState } from "react";
import { initData, saveData } from "../utils/storage";

const UNLOCK_CODE = "IRON99"; // Change this code or provide unique ones to buyers after payment

export default function Paywall() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleUnlock = () => {
    if (code.toUpperCase() === UNLOCK_CODE) {
      const data = initData();
      data.lifetimeAccess = true;
      saveData(data);
      window.location.reload();
    } else {
      setMsg("Invalid code");
    }
  };

  const copyMsg = () => {
    navigator.clipboard.writeText("Hey, I want to purchase lifetime access to Iron Discipline for ₹99");
    alert("Message copied!");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "20px", background: "#000" }}>
      <h1 style={{ fontSize: "48px", letterSpacing: "6px", color: "#dc2626" }}>TRIAL EXPIRED</h1>
      <p style={{ fontSize: "20px", maxWidth: "600px" }}>Your 15-day trial is over. Unlock lifetime access for just ₹99 — one-time payment, forever.</p>
      <button onClick={copyMsg}>Copy Purchase Message</button>
      <a href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/" target="_blank" rel="noopener noreferrer">
        <button style={{ margin: "20px 0" }}>Open Instagram to DM</button>
      </a>
      <p>Already paid? Enter your access code:</p>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Access code" />
      <button onClick={handleUnlock}>Unlock Lifetime</button>
      <p style={{ color: "red" }}>{msg}</p>
    </div>
  );
}
