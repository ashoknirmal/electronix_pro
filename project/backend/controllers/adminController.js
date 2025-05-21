const express = require("express");
const router = express.Router();
const { getAdminData } = require("../controllers/adminController"); // Destructure the function

router.get("/", getAdminData); // ✅ Pass a function

module.exports = router;
