const express = require("express");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const { sendEmail } = require("../utils/sendemail");
const generateInvoicePDF = require("../utils/generateInvoice");
const User = require("../models/User");
const getTrackingUrl = require("../utils/trackingUrl");
const createShipment = require("../utils/createShipment");

const router = express.Router();

/* ======================
   AUTH MIDDLEWARE (INLINE)
====================== */
const getUserFromToken = (req) => {
  const token =
    req.headers.authorization?.split(" ")[1] ||
    req.query.token;

  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET);
};

/* ======================
   ADMIN – GET ALL ORDERS
====================== */
router.get("/admin/all", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ======================
   GET USER ORDERS
====================== */
router.get("/my-orders", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const orders = await Order.find({ user: decoded.id })
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

/* ======================
   CREATE COD ORDER
====================== */
router.post("/cod", async (req, res) => {
  
  try {
    const decoded = getUserFromToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

   const {
  items,
  totalAmount,
  shippingDetails
} = req.body;

const order = await Order.create({
  user: decoded.id,
  items,
  totalAmount,

  shippingDetails: {
    name: shippingDetails?.name,
    phone: shippingDetails?.phone,
    email: shippingDetails?.email,
    address: shippingDetails?.address
  },

  paymentMethod: "COD",
  status: "Placed",
  refundStatus: "Not Applicable"
});

    const user = await User.findById(decoded.id);

    // 🔥 Generate invoice
    const invoicePDF = await generateInvoicePDF({
      ...order.toObject(),
      user
    });

    // 🔥 SEND ORDER PLACED EMAIL
    await sendEmail({
      to: user.email,
      subject: "🧾 Order Confirmed – Shri Ji",
      html: `
        <h2>Thank you for your order, ${user.name}!</h2>
        <p>Your order <strong>${order._id}</strong> has been placed successfully.</p>
        <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
        <p>Payment Method: Cash on Delivery</p>
        <p>Please find your invoice attached.</p>
        <br/>
        <p>✨ Shri Ji Team</p>
      `,
      attachments: [
        {
          filename: `invoice-${order._id}.pdf`,
          content: invoicePDF,
          contentType: "application/pdf"
        }
      ]
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ======================
   GET SINGLE ORDER
====================== */
router.get("/:id", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    let order;

    if (decoded.role === "admin") {
      order = await Order.findById(req.params.id)
        .populate("user", "name email");
    } else {
      order = await Order.findOne({
        _id: req.params.id,
        user: decoded.id
      });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (err) {
    res.status(400).json({ message: "Invalid order id" });
  }
});

/* ======================
   DOWNLOAD INVOICE
====================== */
router.get("/:id/invoice", async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.query.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let order;

    if (decoded.role === "admin") {
      // ✅ ADMIN CAN DOWNLOAD ANY INVOICE
      order = await Order.findById(req.params.id)
        .populate("user", "name email");
    } else {
      // ✅ USER CAN DOWNLOAD ONLY THEIR INVOICE
      order = await Order.findOne({
        _id: req.params.id,
        user: decoded.id
      }).populate("user", "name email");
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    /* ======================
       GENERATE PDF
    ====================== */
  const pdfBuffer = await generateInvoicePDF(order);

res.setHeader(
  "Content-Type",
  "application/pdf"
);

res.setHeader(
  "Content-Disposition",
  `attachment; filename=invoice-${order._id}.pdf`
);

res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
}

);

/* ======================
   CANCEL ORDER
====================== */
router.put("/:id/cancel", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const { reason } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      user: decoded.id
    }).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["Placed", "Processing"].includes(order.status)) {
      return res.status(400).json({
        message: "Order cannot be cancelled at this stage"
      });
    }

    order.status = "Cancelled";
    order.cancelReason = reason || "User cancelled";

    if (order.paymentMethod === "Razorpay") {
      order.refundStatus = "Pending";
    } else {
      order.refundStatus = "Not Applicable";
    }

    await order.save();

    await sendEmail({
      to: order.user.email,
      subject: "❌ Order Cancelled – Shri Ji",
      html: `
        <p>Your order <strong>${order._id}</strong> has been cancelled.</p>
        <p>Reason: ${order.cancelReason}</p>
      `
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});

/* ======================
   ADMIN – UPDATE STATUS
====================== */
router.put("/:id/status", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { status } = req.body;
    const allowedStatuses = ["Placed", "Processing", "Shipped", "Delivered"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    /* ======================
       AUTO DELIVERY CONFIRMATION
    ====================== */
    if (status === "Delivered") {
      const invoicePDF = await generateInvoicePDF({
        ...order.toObject(),
        user: order.user
      });

      await sendEmail({
        to: order.user.email,
        subject: "✅ Order Delivered – Shri Ji",
        html: `
          <h2>Your Order Has Been Delivered 🎉</h2>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p>Your gemstone has been delivered successfully.</p>
          <p>Please find your invoice attached.</p>
          <br/>
          <p>✨ Thank you for choosing Shri Ji</p>
        `,
        attachments: [
          {
            filename: `invoice-${order._id}.pdf`,
            content: invoicePDF,
            contentType: "application/pdf"
          }
        ]
      });
    } else {
      // Normal status update email
      await sendEmail({
        to: order.user.email,
        subject: `📦 Order ${status} – Shri Ji`,
        html: `
          <p>Your order <strong>${order._id}</strong> is now <strong>${status}</strong>.</p>
        `
      });
    }


    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

/* ======================
   ADMIN – REFUND ORDER
====================== */
router.post("/:id/refund", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.paymentMethod !== "Razorpay") {
      return res.status(400).json({ message: "Refund not applicable" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    await razorpay.payments.refund(order.razorpayPaymentId, {
      amount: order.totalAmount * 100
    });

    order.refundStatus = "Completed";
    await order.save();

    await sendEmail({
      to: order.user.email,
      subject: "💸 Refund Completed – Shri Ji",
      html: `
        <p>Your refund for order <strong>${order._id}</strong> has been processed.</p>
        <p>Amount: ₹${order.totalAmount}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Refund failed" });
  }
});


/* ======================
   Track ORDER
====================== */


router.put("/:id/tracking", async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let courier, trackingNumber, trackingUrl;

    /* =================================================
       🔥 OPTION A — AUTO SHIPMENT (SHIPROCKET)
    ================================================= */
    if (req.body.useShiprocket) {
      const shipment = await createShipment(order);

      courier = shipment.courier_name;
      trackingNumber = shipment.awb_code;
      trackingUrl = shipment.tracking_url;
    }

    /* =================================================
       🔁 OPTION B — MANUAL TRACKING (FALLBACK)
    ================================================= */
    else {
      courier = req.body.courier;
      trackingNumber = req.body.trackingNumber;
      trackingUrl = getTrackingUrl(courier, trackingNumber);
    }

    // 🔥 SAVE TRACKING INFO
    order.courier = courier;
    order.trackingNumber = trackingNumber;
    order.trackingUrl = trackingUrl;
    order.status = "Shipped";

    await order.save();

    // 📧 EMAIL USER
    await sendEmail({
      to: order.user.email,
      subject: "🚚 Your Order Has Been Shipped – Shri Ji",
      html: `
        <h3>Your order is on the way!</h3>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Courier:</strong> ${courier}</p>
        <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
        ${
          trackingUrl
            ? `<p><a href="${trackingUrl}" target="_blank">👉 Track your order</a></p>`
            : ""
        }
        <br/>
        <p>✨ Shri Ji Team</p>
      `
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Tracking update failed:", err);
    res.status(500).json({ message: "Failed to update tracking" });
  }
});


module.exports = router;
