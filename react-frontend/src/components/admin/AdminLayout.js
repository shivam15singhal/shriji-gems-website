import React from "react";
import { Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {

  return (

    <div className="admin-container">

      <aside className="admin-sidebar">

        <h2 className="admin-logo">GemAdmin</h2>

        <nav>

          <Link to="/admin/dashboard">Dashboard</Link>

          <Link to="/admin/gems">Products</Link>

          <Link to="/admin/orders">Orders</Link>

          <Link to="/admin/leads">Leads</Link>

        </nav>

      </aside>

      <div className="admin-main">

        <div className="admin-topbar">

          <input
            className="admin-search"
            placeholder="Search..."
          />

          <div className="admin-user">
            Admin
          </div>

        </div>

        <div className="admin-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AdminLayout;