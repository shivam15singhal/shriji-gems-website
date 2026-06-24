require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

/* ================= STATIC FILES ================= */

app.use(express.static(path.join(__dirname, "Public")));
app.use("/uploads", express.static("uploads"));

/* ================= DATABASE ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ================= ROUTES ================= */

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/payments");
const cartRoutes = require("./routes/cart");
const gemRoutes = require("./routes/gemRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", gemRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/webhook", require("./routes/shiprocketWebhook"));

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* ================= 404 HANDLER ================= */

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* ================= SERVER ================= */

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});