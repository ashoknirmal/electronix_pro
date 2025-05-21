// routes/webhook.js
import express from "express";
import Stripe from "stripe";
import Order from "../models/Order.js";
import dotenv from 'dotenv';
dotenv.config(); 
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });

    const items = lineItems.data.map(item => ({
      name: item.description,
      price: item.amount_total / 100,
      quantity: item.quantity
    }));

    const newOrder = new Order({
      customerEmail: session.customer_email,
      items,
      status: "paid"
    });

    await newOrder.save();
    console.log("✅ Order saved:", newOrder);
  }

  res.status(200).json({ received: true });
});

export default router;
