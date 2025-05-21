import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/Admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-widgets">
          <div className="card">👤 Total Users: 150</div>
          <div className="card">📦 Total Products: 85</div>
          <div className="card">🛒 Total Orders: 230</div>
        </div>
        <div className="charts">
          <h3>Dashboard Analytics</h3>
          {/* Replace with charts from Recharts or Chart.js */}
          <div className="chart-placeholder">[Graph Visualization]</div>
        </div>
      </div>
    </div>
  );
}
