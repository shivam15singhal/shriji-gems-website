import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./MyOrders.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

function MyOrders() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    axios
      .get(`${API_BASE}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setOrders(res.data.orders))
      .finally(() => setPageLoading(false));
  }, [user]);

  if (loading || pageLoading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2>My Orders</h2>
        <div className="orders-stats">

  <div className="stat-card">
    <h3>{orders.length}</h3>
    <p>Total Orders</p>
  </div>

  <div className="stat-card">
    <h3>
      ₹
      {orders
        .reduce((sum, order) => sum + order.totalAmount, 0)
        .toLocaleString()}
    </h3>
    <p>Total Spend</p>
  </div>

  <div className="stat-card">
    <h3>
      {
        orders.filter(
          (order) =>
            order.status?.toLowerCase() === "delivered"
        ).length
      }
    </h3>
    <p>Delivered Orders</p>
  </div>

</div>

        {orders.length === 0 ? (
          <p className="empty">You have not placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}
            onClick={() => navigate(`/orders/${order._id}`)}
            >
            
            <div className="order-header">

  <div className="order-header-left">
    <h3>
      Order #
      {order._id.slice(-6).toUpperCase()}
    </h3>

    <small>
      {new Date(
        order.createdAt
      ).toLocaleDateString()}
      {" • "}
      {order.items.length} Item
      {order.items.length > 1 ? "s" : ""}
    </small>
  </div>

  <span
    className={`status ${order.status.toLowerCase()}`}
  >
    {order.status}
  </span>

</div>

              <div className="order-meta">
                <span>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span>Payment: {order.paymentMethod}</span>
              </div>

              <div className="order-progress">

  <span
    className={
      order.status === "Placed"
        ? "active"
        : ""
    }
  >
    Placed
  </span>

  <span
    className={
      order.status === "Processing"
        ? "active"
        : ""
    }
  >
    Processing
  </span>

  <span
    className={
      order.status === "Shipped"
        ? "active"
        : ""
    }
  >
    Shipped
  </span>

  <span
    className={
      order.status === "Delivered"
        ? "active"
        : ""
    }
  >
    Delivered
  </span>

</div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item" key={i}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <small>
                        ₹{item.price} × {item.quantity}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span>Total</span>
                <strong>₹{order.totalAmount}</strong>
              </div>
              <button
  className="view-details-btn"
  onClick={() => navigate(`/orders/${order._id}`)}
>
  Track & View Details →
</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
