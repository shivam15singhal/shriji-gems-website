import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import "./AdminOrders.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function AdminOrders() {
  const { user, loading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || loading) return;

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .get(`${API_BASE}/api/orders/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setOrders(res.data.orders);
        setFilteredOrders(res.data.orders);
      })
      .catch(() => alert("Failed to load admin orders"));
  }, [user, loading, navigate]);

  /* SEARCH FILTER */

  useEffect(() => {

    if (!search) {
      setFilteredOrders(orders);
      return;
    }

    const data = orders.filter((order) =>
      order.user?.name?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredOrders(data);

  }, [search, orders]);

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  /* ORDER STATS */

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  return (
    <>
      <Navbar />

      <div className="admin-orders-page">

        <h2>📦 Admin Orders</h2>

        {/* STATS */}

        <div className="orders-stats">

          <div className="stat-card">
            <p>Total Orders</p>
            <h3>{totalOrders}</h3>
          </div>

          <div className="stat-card">
            <p>Revenue</p>
            <h3>₹{totalRevenue}</h3>
          </div>

          <div className="stat-card">
            <p>Delivered</p>
            <h3>{deliveredOrders}</h3>
          </div>

        </div>

        {/* SEARCH */}

        <div className="orders-search">

          <input
            type="text"
            placeholder="Search customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* TABLE */}

        <div className="admin-orders-table">

          <div className="table-head">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Payment</span>
          </div>

          {filteredOrders.map((order) => (

            <div
              key={order._id}
              className="table-row"
              onClick={() => navigate(`/orders/${order._id}`)}
            >

              <span className="order-id">
                #{order._id.slice(-6).toUpperCase()}
              </span>

              <span>{order.user?.name}</span>

              <span className="amount">
                ₹{order.totalAmount}
              </span>

              <span className={`status-pill ${order.status.toLowerCase()}`}>
                {order.status}
              </span>

              <span className="payment">
                {order.paymentMethod}
              </span>

            </div>

          ))}

          {filteredOrders.length === 0 && (
            <div className="empty-orders">
              No orders found
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default AdminOrders;