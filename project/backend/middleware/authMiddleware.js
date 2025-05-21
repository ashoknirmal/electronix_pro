// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent in "Bearer token" format

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Only admin can access this" });
    }
    req.user = decoded; // Pass the user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error });
  }
};

module.exports = verifyAdmin;
