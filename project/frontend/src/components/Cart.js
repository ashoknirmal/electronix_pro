import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Cart.css"; // Style accordingly
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch Cart Items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  // Delete Item
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Update Quantity
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${id}`, {
        quantity: newQuantity
      });
      setCartItems(cartItems.map(item =>
        item._id === id ? { ...item, quantity: response.data.quantity } : item
      ));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.quantity || 1) *
        (item.product?.discountPrice || item.product?.price || 0),
    0
  );

  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.product?.images?.[0]}
                  alt={item.product?.name}
                  width="60"
                />
              </td>
              <td>{item.product?.name}</td>
              <td>${item.product?.discountPrice || item.product?.price}</td>
              <td>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </td>
              <td>
                $
                {(
                  item.quantity *
                  (item.product?.discountPrice || item.product?.price || 0)
                ).toFixed(2)}
              </td>
              <td>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{ color: "red" }}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
      <div className="totals-box">
  <h3>Cart Totals</h3>
  <div className="totals-row">
    <span>Subtotal:</span>
    <span>${subtotal.toFixed(2)}</span>
  </div>
  <div className="totals-row">
    <span>Delivery Fee:</span>
    <span>${deliveryFee.toFixed(2)}</span>
  </div>
  <div className="totals-row total-final">
    <strong>Total:</strong>
    <strong>${total.toFixed(2)}</strong>
  </div>
  <Link to="/checkout">
  <button className="checkout-btn">Proceed to Checkout</button>
</Link>
</div>


        <div className="promo-code">
          <h4>If you have a promo code, enter it here</h4>
          <input type="text" placeholder="Promo code" />
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
