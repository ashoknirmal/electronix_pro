const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional: only if using auth
    required: false
  }
});

module.exports = mongoose.model("CartItem", cartItemSchema);
