// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerEmail: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
