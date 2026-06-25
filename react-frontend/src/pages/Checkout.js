import React, { useEffect, useState } from "react";
import "./Checkout.css";
import Navbar from "../components/Navbar";
import { getCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
  loadCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  async function loadCart() {
    try {
      const data = await getCart();

      if (!data.items || data.items.length === 0) {
        await Swal.fire({
  icon: "warning",
  title: "Cart Empty",
  text: "Your cart is empty. Add some gemstones first.",
  confirmButtonColor: "#ff8fb3"
});

navigate("/cart");
        return;
      }

      setCart(data.items);

      let totalAmt = 0;
      let count = 0;

      data.items.forEach((item) => {
        totalAmt += item.price * item.quantity;
        count += item.quantity;
      });

      setTotal(totalAmt);
      setItemCount(count);
    } catch (err) {
      await Swal.fire({
  icon: "info",
  title: "Login Required",
  text: "Please login to continue checkout.",
  confirmButtonColor: "#ff8fb3"
});

navigate("/login");
    }
  }

  async function placeOrder(e) {
    e.preventDefault();

    if (!name || !address || !phone || !payment) {
     Swal.fire({
  icon: "warning",
  title: "Missing Information",
  text: "Please fill all shipping details.",
  confirmButtonColor: "#ff8fb3"
});
      return;
    }

    setIsProcessing(true);

    
    const orderItems = cart.map((item) => ({
      productId: item.productId || item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    /* =========================
       CASH ON DELIVERY
    ========================= */
    if (payment === "COD") {
      try {
        fetch(`${API_BASE}/api/orders/cod`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            items: orderItems,
            totalAmount: total,
            shippingDetails: {
              name,
              address,
              phone
            }
          })
        });

        const data = await res.json();

        if (data.success) {
         Swal.close();

await Swal.fire({
  icon: "success",
  title: "Order Placed!",
  text: "Your Cash on Delivery order has been placed successfully.",
  confirmButtonColor: "#16a34a"
});
          localStorage.removeItem("cart");
          navigate("/orders");
        } else {
          Swal.close();

Swal.fire({
  icon: "error",
  title: "Order Failed",
  text: data.message || "Failed to place COD order.",
  confirmButtonColor: "#dc2626"
});
        }
      } catch {
       Swal.close();

Swal.fire({
  icon: "error",
  title: "Order Failed",
  text: "Something went wrong while placing your order.",
  confirmButtonColor: "#dc2626"
});
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    /* =========================
       ONLINE PAYMENT (RAZORPAY)
    ========================= */
    try {
      const res = await fetch(`${API_BASE}/api/payment/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });

      const data = await res.json();
      if (!data.success) {
     Swal.close();

Swal.fire({
  icon: "error",
  title: "Payment Error",
  text: "Unable to create payment order.",
  confirmButtonColor: "#dc2626"
});
        setIsProcessing(false);
        return;
      }
      
      const options = {
        key: "rzp_test_RWS9wgdgbmkveM", // your test key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Shri Ji Gems",
        description: "Gem Purchase Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
             body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: orderItems,
                totalAmount: total,
                shippingDetails: {
                  name,
                  address,
                  phone
                }
              })
            });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            await Swal.fire({
  icon: "success",
  title: "Payment Successful",
  text: "Your order has been placed successfully.",
  confirmButtonColor: "#16a34a"
});
              localStorage.removeItem("cart");
              navigate("/orders"); // 🔥 My Orders
            } else {
             Swal.fire({
  icon: "error",
  title: "Verification Failed",
  text: "Payment verification failed.",
  confirmButtonColor: "#dc2626"
});
            }
          } catch (err) {
            // console.error(err);
           Swal.fire({
  icon: "error",
  title: "Payment Error",
  text: "Unable to verify payment.",
  confirmButtonColor: "#dc2626"
});
          }
        },

        prefill: {
          name,
          email: "customer@example.com",
          contact: phone
        },
        theme: { color: "#ffaad7" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      Swal.fire({
  icon: "error",
  title: "Payment Failed",
  text: "Unable to process payment.",
  confirmButtonColor: "#dc2626"
});
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="checkout-container">
        <h2>🧾 Checkout</h2>

        <div className="checkout-layout">
          {/* LEFT – FORM */}
          <form className="checkout-form" onSubmit={placeOrder}>
            <h3>Shipping Details</h3>

            <label>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <label>Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

            <label>Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />

            <label>Payment Method</label>
            <select value={payment} onChange={(e) => setPayment(e.target.value)}>
              <option value="">Select</option>
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>

            <button
              type="submit"
              className="place-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>

            <p className="secure-note">🔒 Secure & Encrypted Payment</p>
          </form>

          {/* RIGHT – SUMMARY */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;