// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model("User", UserSchema);

// // models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google accounts
    googleId: { type: String }, // To store Google user ID
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model("User", UserSchema);
