const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    /* ======================
       USER
    ====================== */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    /* ======================
       ORDER ITEMS
    ====================== */
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],

    /* ======================
       AMOUNT
    ====================== */
    totalAmount: {
      type: Number,
      required: true
    },

    /* ======================
       ORDER STATUS
    ====================== */
    status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed"
    },

    /* ======================
       PAYMENT
    ====================== */
    paymentMethod: {
      type: String,
      enum: ["Razorpay", "COD"],
      default: "Razorpay"
    },

    razorpayPaymentId: {
      type: String
    },

    refundStatus: {
      type: String,
      enum: ["Not Applicable", "Pending", "Completed"],
      default: "Not Applicable"
    },

    /* ======================
       CANCELLATION
    ====================== */
    cancelReason: {
      type: String
    },

    /* ======================
       SHIPPING DETAILS
    ====================== */
    shippingDetails: {
      name: String,
      address: String,
      phone: String,
      email: String
    },

    /* ======================
       DELIVERY TRACKING
    ====================== */
    courier: {
      type: String
    },

    trackingNumber: {
      type: String
    },

    trackingUrl: {
      type: String
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
