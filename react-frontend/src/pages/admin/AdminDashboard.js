import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  return (

    <AdminLayout>

      <div className="dashboard-page">

        <h1 className="dashboard-title">Admin Dashboard</h1>

        <div className="dashboard-grid">

          {/* GEM MANAGER */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/admin/gems")}
          >
            <h3>Gem Manager</h3>
            <p>Manage gemstones, variants and inventory</p>
          </div>

          {/* ORDERS */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/admin/orders")}
          >
            <h3>Orders</h3>
            <p>View and manage customer orders</p>
          </div>

          {/* LEADS */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/admin/leads")}
          >
            <h3>Leads</h3>
            <p>Manage astrology consultation leads</p>
          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminDashboard;