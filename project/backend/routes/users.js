// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Optional middleware if you want to secure the route
const verifyToken = require("../middleware/verifyToken");

// GET all users (remove verifyToken if you don't need auth)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide password field
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

module.exports = router;
