const express = require("express");
const Order = require("../models/Order");
const { sendEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/shiprocket", async (req, res) => {
  try {
    const { awb, current_status } = req.body;

    if (!awb) return res.sendStatus(200);

    const order = await Order.findOne({ trackingNumber: awb })
      .populate("user", "name email");

    if (!order) return res.sendStatus(200);

    if (current_status === "Delivered" && order.status !== "Delivered") {
      order.status = "Delivered";
      await order.save();

      await sendEmail({
        to: order.user.email,
        subject: "✅ Order Delivered – Shri Ji",
        html: `
          <h2>Your order has been delivered 🎉</h2>
          <p>Order ID: ${order._id}</p>
        `
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Shiprocket webhook error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
