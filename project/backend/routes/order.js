// routes/order.js
router.get("/", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });
  res.json(orders);
});
