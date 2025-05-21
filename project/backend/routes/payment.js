// routes/payment.js
const express=require("express");
const Stripe=require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use env variable

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems, customerInfo } = req.body;

  try {
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // convert to paise
      },
      quantity: item.quantity || 1,
    }));

    // Optional: Add delivery fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 200, // ₹2 delivery charge in paise
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: customerInfo.email,
      success_url: `http://localhost:3000/orders`, // Update as per your frontend route
      // cancel_url: `http://localhost:3000/verify?success=false`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;