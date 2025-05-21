const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

// GET all cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

// GET cart total
router.get("/total", async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");

    let subtotal = 0;
    for (const item of cartItems) {
      const price = item.product.price || 0;
      subtotal += price * item.quantity;
    }

    const deliveryFee = 2.00;
    const total = subtotal + deliveryFee;

    res.json({
      subtotal: subtotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate cart total" });
  }
});

// ADD an item to the cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const newCartItem = new CartItem({
      product: productId,
      quantity: quantity || 1,
    });
    const savedItem = await newCartItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

// DELETE an item from the cart
router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item from cart" });
  }
});

// ✅ UPDATE quantity of a cart item
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const updatedItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    ).populate("product");

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart item quantity" });
  }
});

module.exports = router;
