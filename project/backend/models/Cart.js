// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
