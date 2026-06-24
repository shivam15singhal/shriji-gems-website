const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const {sendEmail} = require("../utils/sendEmail");
const generateInvoicePDF = require("../utils/generateInvoice");
const User = require("../models/User");



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "order_" + Math.floor(Math.random() * 10000),
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating Razorpay order" });
  }
});

// ✅ Verify payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      shippingDetails
    } = req.body;

    // 1️⃣ Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

      
    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }

    // 2️⃣ Get user from token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    // 3️⃣ SAVE ORDER IN DATABASE ✅
    const order = await Order.create({
      user: decoded.id,
      items,
      totalAmount,
      paymentMethod: "Razorpay",
      status: "Placed",
      // 🔥 IMPORTANT FOR REFUNDS
      razorpayPaymentId: razorpay_payment_id,
      refundStatus: "Not Applicable",

      // 📦 SHIPPING INFO
      shippingDetails
    });


    const user = await User.findById(decoded.id);

    const populatedOrder = {
  ...order.toObject(),
  user
};

const invoicePDF = await generateInvoicePDF(populatedOrder);

    try {
      await sendEmail({
        to: user.email,
        subject: "🧾 Order Confirmed – Shri Ji",
        html: `
          <h2>Thank you for your order, ${user.name}!</h2>
          <p>Your order <strong>${order._id}</strong> has been placed successfully.</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p>Please find your invoice attached.</p>
          <br/>
          <p>✨ Shri Ji Team</p>
        `,
        attachments: [
          {
            filename: `invoice-${order._id}.pdf`,
            content: invoicePDF,
            contentType: "application/pdf"
          },
        ],
      });
    } catch (emailErr) {
      console.error("Order email failed:", emailErr);
      // ❗ payment must NOT fail if email fails
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
});

module.exports = router;
