import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Cart.css";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";


function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data.items || []);
    } catch {
      setCart([]);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(item) {
    try {
      await removeCartItem({
        itemId: item._id,
      });

      loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function updateQuantity(item, change) {
    const newQty = item.quantity + change;

    if (newQty < 1) {
      await removeItem(item);
      return;
    }

    try {
      await updateCartItem({
        itemId: item._id,
        quantity: newQty,
      });

      loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (err) {
      console.error(err);
    }
  }

  function getTotal() {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const dispatchDate = new Date();

  dispatchDate.setDate(
    dispatchDate.getDate() + 2
  );

  const formattedDispatchDate =
    dispatchDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  function proceedToBuy() {
    setIsProcessing(true);

    setTimeout(() => {
      window.location.href = "/checkout";
    }, 600);
  }

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2 className="cart-title">
          CART ({totalItems} ITEM
          {totalItems !== 1 ? "S" : ""})
        </h2>

        {loading ? (
          <p className="empty-cart">
            Loading Cart...
          </p>
        ) : cart.length === 0 ? (
          <div className="empty-cart-box">
            <h3>Your cart is empty 🛒</h3>

            <p>
              Discover our collection of
              certified gemstones.
            </p>

            <button
              className="browse-btn"
              onClick={() =>
                navigate("/gemstones")
              }
            >
              Browse Gemstones
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">

              <div className="cart-header">
                <span>Product</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Subtotal</span>
                <span></span>
              </div>

              {cart.map((item) => (
                <div
                  className="cart-row"
                  key={item._id}
                >
                  <div className="cart-product">
                    <img
  src={
    item.image
      ? item.image
      : "/images/gem-placeholder.png"
  }
  alt={item.name || "Gem"}
/>

                    <div className="cart-product-info">
                      <h3 className="product-title">
                        {item.name || "Gem"}

                        <span className="product-weight">
                          {" "}
                          •{" "}
                          {Number(
                            item.weight
                          ).toFixed(2)}{" "}
                          Carats
                        </span>
                      </h3>

                      
                      <p>
                        <strong>
                          Ring /
                          Pendant /
                          Bracelet:
                        </strong>{" "}
                        {item.buyType}
                      </p>

                    

                      <p className="dispatch-date">
                        <em>
                          Expected
                          Dispatch Date:{" "}
                          {
                            formattedDispatchDate
                          }
                        </em>
                      </p>
                    </div>
                  </div>

                  <div className="cart-price">
                    ₹
                    {item.price.toLocaleString()}
                  </div>

                  <div className="cart-qty">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item,
                          1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-subtotal">
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </div>

                  <div
                    className="cart-remove"
                    onClick={() =>
                      removeItem(item)
                    }
                  >
                    ✕
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2>
                Order Summary
              </h2>

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {getTotal().toLocaleString()}
                </span>
              </div>

              <div className="summary-row">
                <span>
                  Shipping
                </span>

                <span>
                  Free
                </span>
              </div>

              <div className="summary-row">
                <span>GST</span>

                <span>
                  Included
                </span>
              </div>

              <hr />

              <div className="summary-row grand">
                <span>Total</span>

                <span>
                  ₹
                  {getTotal().toLocaleString()}
                </span>
              </div>

              <button
                className="buy-btn"
                onClick={
                  proceedToBuy
                }
                disabled={
                  isProcessing
                }
              >
                {isProcessing
                  ? "Processing..."
                  : "CHECKOUT"}
              </button>

              <div className="cart-trust">
                <p>
                  🔒 Secure Checkout
                </p>

                <p>
                  🚚 Free Shipping
                </p>

                <p>
                  💎 Certified
                  Gemstones
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;