const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");



const router = express.Router();

/* GET USER CART */
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("GET CART ERROR ❌", err);
    res.status(500).json({ message: "Failed to load cart" });
  }
});


/* ADD TO CART */
router.post("/add", auth, async (req, res) => {
  try {
    const {
      gemId,
      variantId,
      name,
      image,
      weight,
      quantity,
      price,
      buyType,
    } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

  const existingItem = cart.items.find(
  (item) =>
    item.gemId === gemId &&
    item.variantId === variantId &&
    Number(item.weight) === Number(weight) &&
    item.buyType === buyType
);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        gemId,
        variantId,
        name,
        image,
        weight,
        quantity,
        price,
        buyType,
        
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("ADD TO CART ERROR ❌", err);
    res.status(500).json({ message: "Add to cart failed" });
  }
});


/* UPDATE CART ITEM */
router.put("/update", auth, async (req, res) => {
  const { itemId, quantity } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.id(itemId);

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
});

/* REMOVE CART ITEM */
router.delete("/remove", auth, async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID required" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("REMOVE CART ERROR ❌", err);
    res.status(500).json({ message: "Remove failed" });
  }
});

module.exports = router;
