import React from "react";
import { Link } from "react-router-dom";
import { Users, Package, PlusCircle, ClipboardList } from "lucide-react";
import "../styles/Admin.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li>
            <Link to="/admin/manage-users" className="nav-link">
              <Users className="nav-icon" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-products" className="nav-link">
              <Package className="nav-icon" />
              <span>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/add-product" className="nav-link">
              <PlusCircle className="nav-icon" />
              <span>Add Product</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-orders" className="nav-link">
              <ClipboardList className="nav-icon" />
              <span>Manage Orders</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
