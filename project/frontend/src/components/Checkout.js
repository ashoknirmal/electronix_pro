import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Checkout.css";

const Checkout = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
  });

  const token = localStorage.getItem("token"); // ✅ Use the correct token key
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please log in to proceed to checkout.");
      window.location.href = "/login";
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, token]);

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum +
        (item.quantity || 1) * (item.product.discountPrice || item.product.price),
      0
    );
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const total = subtotal + deliveryFee;

    setTotals({ subtotal, deliveryFee, total });
  }, [cartItems]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormComplete = Object.values(form).every((val) => val.trim() !== "");

  const handlePayment = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to make a payment.");
      return;
    }

    try {
      const formattedItems = cartItems.map((item) => ({
        name: item.product.name,
        price: item.product.discountPrice || item.product.price,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        {
          cartItems: formattedItems,
          customerInfo: form,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        window.location.href = res.data.session_url;
      } else {
        alert("Stripe session creation failed.");
      }
    } catch (error) {
      console.error("Stripe redirect error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please log in before submitting your details.");
      return;
    }

    if (isFormComplete) {
      await handlePayment();
    } else {
      alert("Please fill in all fields before proceeding.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-form-section">
        <h2>Delivery Information</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="checkout-summary-section">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>₹{totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Fee:</span>
          <span>₹{totals.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>
        <button
          className="checkout-button"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default Checkout;
