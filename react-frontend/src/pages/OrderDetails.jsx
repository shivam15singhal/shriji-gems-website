import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import OrderTimeline from "../components/OrderTimeline";
import { AuthContext } from "../context/AuthContext";
import "./OrderDetails.css";
import Swal from "sweetalert2";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const [trackingData, setTrackingData] = useState({
    courier: "",
    trackingNumber: "",
    trackingUrl: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API_BASE}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setOrder(res.data.order))
      .catch(() => navigate(-1))
      .finally(() => setLoading(false));
  }, [orderId, navigate]);

  if (loading) {
    return <div className="order-details-loading">Loading order...</div>;
  }

  if (!order) return null;

  return (
    <>
      <Navbar />

      <div className="order-details-page">
        <div className="order-details-container">

          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          {/* HEADER */}
          <div className="order-header">
            <div>
             <div className="order-title">

  <h2>Order Details</h2>

  <p>
    Thank you for your purchase.
    Your gemstone order is being processed.
  </p>

</div>
              <p className="order-id">#{order._id.slice(-8)}</p>
            </div>

            <span className={`status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          {/* ORDER INFO */}
          <div className="order-info">

  <div>
    <span>Order Date</span>
    <strong>
      {new Date(order.createdAt).toLocaleDateString()}
    </strong>
  </div>

  <div>
    <span>Payment Method</span>
    <strong>{order.paymentMethod}</strong>
  </div>

  <div>
    <span>Status</span>
    <strong>{order.status}</strong>
  </div>

  <div>
    <span>Total Amount</span>
    <strong>₹{order.totalAmount}</strong>
  </div>

</div>

<div className="address-card">

  <h3>Delivery Address</h3>

  <p>{order.shippingAddress?.name}</p>

  <p>{order.shippingAddress?.phone}</p>

  <p>{order.shippingAddress?.address}</p>

  <p>
    {order.shippingAddress?.city},
    {order.shippingAddress?.state}
  </p>

</div>

<div className="payment-summary">

  <h3>Payment Summary</h3>

  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{order.totalAmount}</span>
  </div>

  <div className="summary-row">
    <span>Shipping</span>
    <span>Free</span>
  </div>

  <div className="summary-row">
    <span>GST</span>
    <span>Included</span>
  </div>

  <hr />

  <div className="summary-row grand">
    <span>Total</span>
    <span>₹{order.totalAmount}</span>
  </div>

</div>



          <h3>Order Status</h3>
          <OrderTimeline status={order.status} />

<div className="delivery-estimate">
  <span>🚚 Estimated Delivery</span>

  <strong>
    {new Date(
      Date.now() +
      5 * 24 * 60 * 60 * 1000
    ).toLocaleDateString()}
  </strong>
</div>

          {/* ADMIN SHIPPING */}
          {user?.role === "admin" && ["Placed", "Processing"].includes(order.status) && (
            <div className="admin-tracking-box">
              <h4>Shipping</h4>

              <input
                type="text"
                placeholder="Courier Name"
                value={trackingData.courier}
                onChange={(e) =>
                  setTrackingData({ ...trackingData, courier: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Tracking Number"
                value={trackingData.trackingNumber}
                onChange={(e) =>
                  setTrackingData({
                    ...trackingData,
                    trackingNumber: e.target.value
                  })
                }
              />

              <button
                className="tracking-save-btn"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");

                    if (!trackingData.courier || !trackingData.trackingNumber) {
                     Swal.fire({
  icon: "warning",
  title: "Missing Information",
  text: "Courier name and tracking number are required.",
  confirmButtonColor: "#ff8fb3"
});
                      return;
                    }

                    const payload = {
                      courier: trackingData.courier,
                      trackingNumber: trackingData.trackingNumber
                    };

                    const res = await fetch(
                      `${API_BASE}/api/orders/${order._id}/tracking`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(payload)
                      }
                    );

                    const data = await res.json();
                    if (data.success) {
                      setOrder(data.order);
                     Swal.fire({
  icon: "success",
  title: "Order Shipped",
  text: "Tracking information has been saved.",
  confirmButtonColor: "#16a34a"
});
                    } else {
                      Swal.fire({
  icon: "error",
  title: "Shipping Failed",
  text: data.message,
  confirmButtonColor: "#ef4444"
});
                    }
                  } catch {
                    Swal.fire({
  icon: "error",
  title: "Shipping Failed",
  text: "Unable to ship this order.",
  confirmButtonColor: "#ef4444"
});
                  }
                }}
              >
                Ship Order
              </button>
            </div>
          )}

          {/* TRACKING DISPLAY */}
          {order.trackingNumber && (
            <div className="tracking-box">
              <h4>Delivery Tracking</h4>
              <p><strong>Courier:</strong> {order.courier}</p>
              <p><strong>Tracking ID:</strong> {order.trackingNumber}</p>

              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="track-link"
                >
                  Track Package →
                </a>
              )}
            </div>
          )}

          {/* ADMIN STATUS */}
          {user?.role === "admin" && order.status !== "Cancelled" && (
            <div className="admin-status-box">
              <label>Update Order Status</label>

              <select
                value={order.status}
                disabled={statusLoading}
                onChange={async (e) => {
                  const newStatus = e.target.value;

                  setStatusLoading(true);

                  try {
                    const token = localStorage.getItem("token");

                    const res = await fetch(
                      `${API_BASE}/api/orders/${order._id}/status`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ status: newStatus })
                      }
                    );

                    const data = await res.json();

                    if (data.success) {
                      setOrder(data.order);
                     Swal.fire({
  icon: "success",
  title: "Status Updated",
  text: `Order marked as ${newStatus}.`,
  timer: 1500,
  showConfirmButton: false
});
                    } else {
                      Swal.fire({
  icon: "error",
  title: "Update Failed",
  text: data.message,
  confirmButtonColor: "#ef4444"
});
                    }
                  } catch {
                    Swal.fire({
  icon: "error",
  title: "Update Failed",
  text: "Unable to update order status.",
  confirmButtonColor: "#ef4444"
});
                  }

                  setStatusLoading(false);
                }}
              >
                <option value="Placed">Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )}

          {/* ITEMS */}
          <h3>Items</h3>

          <div className="order-items">
            {order.items.map((item, i) => (
              <div className="order-item-card" key={i}>
             <img
  src={`${API_BASE}${item.image}`}
  alt={item.name}
/>

                <div className="item-details">

  <h4>{item.name}</h4>

  <div className="item-meta">

    {item.weight && (
      <span>{item.weight} Carat</span>
    )}

    {item.buyType && (
      <span>{item.buyType}</span>
    )}

    <span>Qty: {item.quantity}</span>

  </div>

  <p>
    ₹{item.price.toLocaleString()}
    {" × "}
    {item.quantity}
  </p>

</div>

                <div className="item-price">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total Amount</span>
            <strong>₹{order.totalAmount}</strong>
          </div>

          <button
            className="invoice-btn"
            onClick={() => {
              const token = localStorage.getItem("token");
              window.open(
                `${API_BASE}/api/orders/${order._id}/invoice?token=${token}`,
                "_blank"
              );
            }}
          >
            Download Invoice (PDF)
          </button>
          <button
  className="reorder-btn"
  onClick={() => navigate("/gemstones")}
>
  Buy Again
</button>
<div className="help-box">

  <h4>Need Help?</h4>

  <p>
    Our gemstone experts are available
    for assistance.
  </p>

  <a
    href="https://wa.me/919818307307"
    target="_blank"
    rel="noreferrer"
  >
    Contact Support
  </a>

</div>

          {["Placed", "Processing"].includes(order.status) && (
            <button
              className="cancel-btn"
              disabled={cancelling}
              onClick={async () => {
               const { value: reason } = await Swal.fire({
  title: "Cancel Order",
  input: "textarea",
  inputLabel: "Reason for cancellation",
  inputPlaceholder: "Enter your reason...",
  inputAttributes: {
    maxlength: 300
  },
  showCancelButton: true,
  confirmButtonText: "Cancel Order",
  confirmButtonColor: "#ef4444",
  cancelButtonColor: "#6b7280",
  inputValidator: (value) => {
    if (!value) {
      return "Please enter a cancellation reason";
    }
  }
});

if (!reason) return;

                setCancelling(true);

                try {
                  const token = localStorage.getItem("token");

                  const res = await fetch(
                    `${API_BASE}/api/orders/${order._id}/cancel`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify({ reason })
                    }
                  );

                  const data = await res.json();

                  if (data.success) {
                    setOrder(data.order);
                    Swal.fire({
  icon: "success",
  title: "Order Cancelled",
  text: "Your order has been cancelled successfully.",
  confirmButtonColor: "#16a34a"
});
                  } else {
                   Swal.fire({
  icon: "error",
  title: "Cancellation Failed",
  text: data.message,
  confirmButtonColor: "#ef4444"
});
                  }
                } catch {
                  Swal.fire({
  icon: "error",
  title: "Cancellation Failed",
  text: "Unable to cancel this order.",
  confirmButtonColor: "#ef4444"
});
                }

                setCancelling(false);
              }}
            >
              Cancel Order
            </button>
          )}

        </div>
      </div>
    </>
  );
}

export default OrderDetails;