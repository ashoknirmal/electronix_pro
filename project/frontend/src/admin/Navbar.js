import React from "react";
import "../styles/Admin.css";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <span>Welcome, Admin</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
