// Orders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-item" key={index}>
            <p><strong>Status: {order.status}</strong></p>
            {order.items.map((item, i) => (
              <div key={i}>
                <p>{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            ))}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
